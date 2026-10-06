"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Button } from "@/components/ui/Button";
import { Textarea, Input } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import { Send, CheckCircle2, Clock } from "lucide-react";

export default function ClientMessagesPage() {
  const { messages, addContactMessage, currentUser } = useApp();
  const { showToast } = useToast();

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const clientMessages = messages.filter(
    (m) => m.senderEmail.toLowerCase() === currentUser.email.toLowerCase() || m.id === "msg-001"
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !content.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      addContactMessage({
        senderName: currentUser.name,
        senderEmail: currentUser.email,
        phone: currentUser.phone,
        subject,
        message: content,
      });
      setSubject("");
      setContent("");
      showToast("Message transmis à votre coordinateur de compte.", "success");
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">Messages & Support</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Échangez avec nos transitaires et obtenez des réponses rapides à vos questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Messages List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
            Historique de vos échanges ({clientMessages.length})
          </h2>

          {clientMessages.length === 0 ? (
            <div className="bg-white rounded-2xl border border-zinc-200 p-8 text-center text-zinc-400 text-sm">
              Aucun message envoyé pour le moment.
            </div>
          ) : (
            clientMessages.map((msg) => (
              <div
                key={msg.id}
                className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-xs hover:border-red-200 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {msg.date} à {msg.time}
                  </span>
                  {msg.replied ? (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Répondu
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      En cours de traitement
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-[#09090B]">{msg.subject}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed bg-zinc-50/80 p-3.5 rounded-xl border border-zinc-100">
                  {msg.message}
                </p>

                {msg.replied && (
                  <div className="bg-[#FEF2F2] p-3.5 rounded-xl border border-red-100 text-xs text-zinc-800">
                    <p className="font-bold text-[#DC2626] mb-1">
                      Réponse Hervé Logistics Support :
                    </p>
                    <p>
                      Bonjour, votre demande a bien été prise en charge. Notre équipe portuaire a validé la réservation. Le numéro de bordereau est disponible dans votre dashboard.
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* New message form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-zinc-200 p-6 shadow-xs">
          <h2 className="text-base font-bold text-[#09090B] mb-1">Nouveau message</h2>
          <p className="text-xs text-zinc-500 mb-5">
            Votre message sera immédiatement notifié à la console d&apos;administration.
          </p>

          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <Input
                label="Objet du message"
                placeholder="Ex: Demande d'enlèvement Douala"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div>
              <Textarea
                label="Message"
                placeholder="Détaillez votre question ou besoin..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isSending}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Envoyer au support
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
