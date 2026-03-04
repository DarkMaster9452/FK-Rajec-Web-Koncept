"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type AttendanceStatus = "PRESENT" | "ABSENT" | "EXCUSED";

interface Props {
  playerId: string;
  trainingId: string;
  currentStatus: AttendanceStatus;
}

const options: { value: AttendanceStatus; label: string; icon: React.ReactNode; color: string }[] = [
  { value: "PRESENT", label: "Prítomný", icon: <CheckCircle className="w-4 h-4" />, color: "text-green-600" },
  { value: "ABSENT", label: "Neprítomný", icon: <XCircle className="w-4 h-4" />, color: "text-red-600" },
  { value: "EXCUSED", label: "Ospravedlnený", icon: <AlertCircle className="w-4 h-4" />, color: "text-yellow-600" },
];

export function AttendanceToggle({ playerId, trainingId, currentStatus }: Props) {
  const [status, setStatus] = useState<AttendanceStatus>(currentStatus);
  const current = options.find((o) => o.value === status)!;

  const handleChange = (newStatus: AttendanceStatus) => {
    setStatus(newStatus);
    toast.success("Dochádzka aktualizovaná");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={`gap-1.5 ${current.color}`}>
          {current.icon}
          {current.label}
          <ChevronDown className="w-3.5 h-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            className={`gap-2 ${opt.color}`}
            onClick={() => handleChange(opt.value)}
          >
            {opt.icon}
            {opt.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
