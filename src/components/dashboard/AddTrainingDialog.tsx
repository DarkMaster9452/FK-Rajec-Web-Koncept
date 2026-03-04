"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

export function AddTrainingDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));

    setLoading(false);
    setOpen(false);
    toast.success("Tréning bol pridaný! Hráči boli notifikovaní.", {
      description: "Oznámenie bolo odoslané všetkým hráčom.",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-red hover:bg-red-700 text-white gap-2">
          <Plus className="w-4 h-4" />
          Pridať tréning
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Nový tréning</DialogTitle>
          <DialogDescription>
            Vytvorte nový tréning. Hráči dostanú automatické oznámenie.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label>Názov tréningu</Label>
            <Input name="title" placeholder="napr. Kondičný tréning" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Dátum</Label>
              <Input name="date" type="date" required />
            </div>
            <div className="space-y-1.5">
              <Label>Čas</Label>
              <Input name="time" type="time" defaultValue="17:30" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Miesto</Label>
              <Input name="location" placeholder="Štadión FK Rajec" required />
            </div>
            <div className="space-y-1.5">
              <Label>Trvanie (min)</Label>
              <Input name="duration" type="number" defaultValue="90" min="15" max="240" required />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Popis (voliteľný)</Label>
            <Textarea name="description" placeholder="Popis tréningu, zameranie..." rows={3} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Zrušiť
            </Button>
            <Button type="submit" disabled={loading} className="bg-brand-red hover:bg-red-700 text-white">
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" />Ukladám...</>
              ) : (
                "Pridať tréning"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
