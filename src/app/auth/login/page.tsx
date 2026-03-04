"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);

    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      toast.error("Nesprávny email alebo heslo");
    } else {
      toast.success("Prihlásenie úspešné");
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-black via-[#1a0000] to-brand-black" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-red" />

      <div className="relative w-full max-w-md px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-brand-red rounded-sm flex items-center justify-center">
              <span className="font-heading text-white text-2xl">FK</span>
            </div>
            <h1 className="font-heading text-white text-3xl tracking-widest">FK RAJEC</h1>
            <p className="text-white/40 text-xs tracking-wider">PRIHLÁSENIE DO KLUBOVÉHO PORTÁLU</p>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-sm p-8 backdrop-blur-sm">
          <h2 className="font-heading text-white text-2xl mb-6 tracking-wider">PRIHLÁSIŤ SA</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-white/70 text-xs tracking-wider uppercase">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  name="email"
                  type="email"
                  placeholder="vas@email.sk"
                  required
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-brand-red focus:ring-brand-red"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white/70 text-xs tracking-wider uppercase">Heslo</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-brand-red focus:ring-brand-red"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red hover:bg-red-700 text-white font-semibold tracking-wider h-11"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Prihlasujem...</>
              ) : (
                "PRIHLÁSIŤ SA"
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-xs text-white/30">
            Prístup len pre členov FK Rajec.
            <br />
            Kontaktujte správcu pre vytvorenie účtu.
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-white/40 hover:text-white text-sm transition-colors">
            ← Späť na hlavnú stránku
          </Link>
        </div>
      </div>
    </div>
  );
}
