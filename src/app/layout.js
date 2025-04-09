import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/auth";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Budget Buddy – Simple Budget & Expense Tracker",
  description:
    "Manage your finances effortlessly with Budget Buddy. Track expenses, set budgets, and gain actionable insights into your spending habits to achieve financial control.",
  keywords: [
    "budget tracker",
    "expense tracker",
    "personal finance",
    "budget management",
    "finance tool",
    "Budget Buddy",
  ].join(", "),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={outfit.className}>{children}</body>
        <Toaster />
      </AuthProvider>
    </html>
  );
}
