"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

const CreateBudget = ({ refreshData }) => {
  const [auth] = useAuth();
  const [emoji, setEmoji] = useState("😊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState("");

  const userId = auth.user?.id;

  const handleCreateBudget = async () => {
    try {
      const response = await axios.post("/api/budget", {
        name: budgetName,
        amount,
        emoji,
        userId,
      });

      if (response.data.success) {
        toast(response.data.message);
        setBudgetName("");
        setAmount("");
        refreshData();
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="bg-slate-100 p-10 rounded-md flex flex-col items-center border-2 border-dashed cursor-pointer hover:shadow-md h-[170px]">
            <h2 className="text-3xl font-bold">+</h2>
            <h1>Create New Budget</h1>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <Button
                variant="outline"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                className="text-xl"
              >
                {emoji}
              </Button>
              {openEmojiPicker && (
                <div className="absolute z-20">
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setEmoji(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              )}
              <div className="mt-2">
                <h2 className="text-lg text-black font-semibold my-1">
                  Budget Name
                </h2>
                <Input
                  value={budgetName}
                  placeholder="e.g. Home Decor"
                  onChange={(e) => setBudgetName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-lg text-black font-semibold my-1">
                  Budget Amount
                </h2>
                <Input
                  value={amount}
                  placeholder="e.g. $5000"
                  type="number"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="w-full mt-5"
                disabled={!(budgetName && amount)}
                onClick={handleCreateBudget}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default CreateBudget;
