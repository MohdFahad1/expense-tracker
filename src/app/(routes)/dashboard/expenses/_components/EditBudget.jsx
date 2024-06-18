"use client";

import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

const EditBudget = ({ budgetData }) => {
  const [emojiIcon, setEmojiIcon] = useState(budgetData?.emoji);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [budgetName, setBudgetName] = useState(budgetData?.name);
  const [amount, setAmount] = useState(budgetData?.amount);

  useEffect(() => {
    if (budgetData) {
      setEmojiIcon(budgetData.emoji);
      setBudgetName(budgetData.name);
      setAmount(budgetData.amount);
    }
  }, [budgetData]);

  const handleUpdateBudget = async () => {
    try {
      const response = await axios.put("/api/updatebudget", {
        name: budgetName,
        amount,
        emoji: emojiIcon,
        budgetId: budgetData._id,
        userId: budgetData.userId,
      });

      if (response.status === 200) {
        toast(response.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-1">
            <PenBox /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <Button
                variant="outline"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                className="text-xl"
              >
                {emojiIcon}
              </Button>
              {openEmojiPicker && (
                <div className="absolute z-20">
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
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
                  placeholder="e.g. Home Decor"
                  onChange={(e) => setBudgetName(e.target.value)}
                  value={budgetName}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-lg text-black font-semibold my-1">
                  Budget Amount
                </h2>
                <Input
                  placeholder="e.g. $5000"
                  type="number"
                  onChange={(e) => setAmount(Number(e.target.value))}
                  value={amount}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="w-full mt-5"
                disabled={!(budgetName && amount)}
                onClick={handleUpdateBudget}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;
