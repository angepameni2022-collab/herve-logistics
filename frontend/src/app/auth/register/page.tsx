"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Phone, Building2, MapPin, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useApp } from "@/context/AppContext";

export default function RegisterPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { registerClientAccount } = useApp();

  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("+82 ");
  const [address, setAddress] = useState("Séoul, Corée du Sud");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: { [key: string]: string } = {};

    if (!fullName.trim()) errs.fullName = "Veuillez renseigner votre nom complet.";
    if (!phone.trim() || phone.length < 6) errs.phone = "Veuillez renseigner un numéro de téléphone valide.";
    if (!email.trim() || !email.includes("@")) errs.email = "Veuillez saisir une adresse email valide.";
    if (!password || password.length < 6) errs.password = "Le mot de passe doit comporter au moins 6 caractères.";
    if (password !== confirmPassword) errs.confirmPassword = "Les mots de passe ne correspondent pas.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      registerClientAccount({
        fullName,
        email,
        phone,
        company: company || "Client Fret & Transit",
        address,
      });

      setIsLoading(false);
      setIsSuccess(true);
      showToast("Compte client créé avec succès !", "success");
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] relative">
      <div className="absolute top-0 left-0 right-0 h-84 bg-[#09090B] border-b border-zinc-800 -z-0" />

      <div className="relative z-10 w-full max-w-xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-[#DC2626] flex items-center justify-center text-white shadow-xl shadow-red-600/30 group-hover:scale-105 transition-transform">
              <span className="text-base font-black tracking-tighter flex items-center gap-0.5">
                HL <span className="text-xs">▶</span>
              </span>
            </div>
            <div className="text-left">
              <span className="text-2xl font-black text-white tracking-tight leading-none block">
                HERVÉ <span className="text-[#DC2626]">LOGISTICS</span>
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Transit Maritime & Aérien International · Corée du Sud
              </span>
            </div>
          </Link>
        </div>

        {/* Card Formulaire */}
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl p-7 sm:p-10">
          {/* Badge Inscription Obligatoire */}
          <div className="mb-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#DC2626] text-xs font-bold mb-3">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>INSCRIPTION OBLIGATOIRE POUR EXPÉDIER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">
              Créer mon compte client
            </h1>
            <p className="text-sm text-zinc-600 mt-2 leading-relaxed">
              Pour toute prise en charge de vos marchandises, l&apos;enregistrement de vos coordonnées est obligatoire afin que nos équipes logistiques puissent vous attribuer votre <strong>code de suivi officiel</strong>.
            </p>
          </div>

          {isSuccess ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-emerald-950 mb-2">
                Compte client enregistré avec succès !
              </h3>
              <p className="text-sm text-emerald-800 mb-6 leading-relaxed">
                Bienvenue <strong>{fullName}</strong>. Vous pouvez maintenant soumettre les informations de votre expédition pour recevoir immédiatement votre code de suivi <strong>HL-2026-XXXXXX</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/dashboard/new-request" className="flex-1">
                  <Button variant="primary" size="lg" className="w-full bg-[#DC2626] hover:bg-[#B91C1C]" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Déposer mes marchandises & Obtenir mon code
                  </Button>
                </Link>
                <Link href="/dashboard" className="sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full">
                    Tableau de bord
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Nom complet / Représentant *"
                    placeholder="Jean Dupont / Kim Min-Jun"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    leftIcon={<User className="w-4 h-4 text-zinc-400" />}
                    error={errors.fullName}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Entreprise ou Particulier"
                    placeholder="Société d'Import / Particulier"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    leftIcon={<Building2 className="w-4 h-4 text-zinc-400" />}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Téléphone (avec indicatif) *"
                    placeholder="+82 10-1234-5678 ou +237..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    leftIcon={<Phone className="w-4 h-4 text-zinc-400" />}
                    error={errors.phone}
                    required
                  />
                </div>
                <div>
                  <Input
                    label="Pays / Ville de résidence"
                    placeholder="Séoul, Corée du Sud / Douala..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    leftIcon={<MapPin className="w-4 h-4 text-zinc-400" />}
                  />
                </div>
              </div>

              <div>
                <Input
                  label="Adresse Email *"
                  type="email"
                  placeholder="contact@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-4 h-4 text-zinc-400" />}
                  error={errors.email}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Input
                    label="Mot de passe *"
                    type="password"
                    placeholder="Minimum 6 caractères"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    leftIcon={<Lock className="w-4 h-4 text-zinc-400" />}
                    error={errors.password}
                    required
                  />
                </div>

                <div>
                  <Input
                    label="Confirmer le mot de passe *"
                    type="password"
                    placeholder="Répétez le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    leftIcon={<Lock className="w-4 h-4 text-zinc-400" />}
                    error={errors.confirmPassword}
                    required
                  />
                </div>
              </div>

              <div className="pt-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-black"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  S&apos;inscrire & Déclarer mes informations
                </Button>
              </div>
            </form>
          )}

          <p className="mt-8 text-center text-xs text-zinc-500">
            Vous avez déjà un compte client ?{" "}
            <Link href="/auth/login" className="font-bold text-[#DC2626] hover:underline">
              Se connecter
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center text-xs text-zinc-400 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Données sécurisées par Hervé Logistics Korea Co., Ltd. (Séoul)</span>
        </div>
      </div>
    </div>
  );
}
