"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { ContactMessage } from "@/data/messages";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import {
  Clock,
  CheckCircle2,
  Archive,
  CornerUpLeft,
  Eye,
  Send,
} from "lucide-react";

export default function AdminMessagesPage() {
  const { messages, markMessageRead, archiveMessage, replyMessage } = useApp();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<"all" | "unread" | "archived">("all");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [replyTarget, setReplyTarget] = useState<ContactMessage | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSendingReply, setIsSendingReply] = useState(false);

  const filteredMessages = messages.filter((m) => {
    if (activeTab === "unread") return !m.read && !m.archived;
    if (activeTab === "archived") return m.archived;
    return !m.archived;
  });

  const handleRead = (msg: ContactMessage) => {
    markMessageRead(msg.id);
    setSelectedMessage(msg);
  };

  const handleOpenReply = (msg: ContactMessage) => {
    setReplyTarget(msg);
    setReplyText(`Bonjour ${msg.senderName},\n\nNous faisons suite à votre demande concernant "${msg.subject}". Nos équipes logistiques ont bien pris en compte votre besoin.`);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyTarget || !replyText.trim()) return;

    setIsSendingReply(true);
    setTimeout(() => {
      setIsSendingReply(false);
      replyMessage(replyTarget.id, replyText);
      showToast(`Réponse envoyée avec succès à ${replyTarget.senderEmail}`, "success");
      setReplyTarget(null);
    }, 600);
  };

  const handleArchive = (id: string) => {
    archiveMessage(id);
    showToast("Message archivé.", "info");
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09090B]">
            Messagerie & Demandes de contact
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Traitement des sollicitations clients, cotations de fret et demandes de renseignements.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-zinc-200 shadow-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === "all" ? "bg-[#DC2626] text-white" : "text-zinc-600 hover:text-[#09090B]"
            }`}
          >
            Boîte de réception ({messages.filter((m) => !m.archived).length})
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === "unread" ? "bg-[#DC2626] text-white" : "text-zinc-600 hover:text-[#09090B]"
            }`}
          >
            Non lus ({messages.filter((m) => !m.read && !m.archived).length})
          </button>
          <button
            onClick={() => setActiveTab("archived")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === "archived" ? "bg-[#DC2626] text-white" : "text-zinc-600 hover:text-[#09090B]"
            }`}
          >
            Archivés ({messages.filter((m) => m.archived).length})
          </button>
        </div>
      </div>

      {/* Messages sous forme de cartes */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-200 p-12 text-center text-zinc-400 text-sm">
            Aucun message dans cette boîte.
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-xs transition-all ${
                !msg.read
                  ? "border-red-300 ring-2 ring-red-50"
                  : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] border border-red-200 text-[#DC2626] font-bold flex items-center justify-center text-sm">
                    {msg.senderName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-[#09090B]">{msg.senderName}</h2>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-[#DC2626]" title="Non lu" />
                      )}
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{msg.senderEmail}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {msg.date} à {msg.time}
                  </span>
                </div>
              </div>

              {/* Subject & Message Content */}
              <div className="mb-4">
                <h3 className="text-sm font-bold text-[#09090B] mb-1">{msg.subject}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                  {msg.message}
                </p>
              </div>

              {/* Actions : Lire, Répondre, Archiver */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100">
                <div className="flex items-center gap-2">
                  {msg.replied && (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Réponse transmise
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Action : Lire */}
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<Eye className="w-3.5 h-3.5" />}
                    onClick={() => handleRead(msg)}
                  >
                    Lire
                  </Button>

                  {/* Action : Répondre */}
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={<CornerUpLeft className="w-3.5 h-3.5" />}
                    onClick={() => handleOpenReply(msg)}
                  >
                    Répondre
                  </Button>

                  {/* Action : Archiver */}
                  {!msg.archived && (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Archive className="w-3.5 h-3.5" />}
                      onClick={() => handleArchive(msg.id)}
                    >
                      Archiver
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Détail / Lire */}
      <Modal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title={selectedMessage?.subject || "Message client"}
        description={`De : ${selectedMessage?.senderName} (${selectedMessage?.senderEmail})`}
        maxWidth="lg"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setSelectedMessage(null)}>
              Fermer
            </Button>
            {selectedMessage && (
              <Button
                variant="primary"
                size="sm"
                leftIcon={<CornerUpLeft className="w-3.5 h-3.5" />}
                onClick={() => {
                  const m = selectedMessage;
                  setSelectedMessage(null);
                  handleOpenReply(m);
                }}
              >
                Répondre
              </Button>
            )}
          </>
        }
      >
        {selectedMessage && (
          <div className="space-y-4 text-sm">
            <div className="p-3 bg-zinc-50 rounded-xl text-xs space-y-1">
              <p>
                <strong>Date :</strong> {selectedMessage.date} à {selectedMessage.time}
              </p>
              {selectedMessage.phone && (
                <p>
                  <strong>Téléphone :</strong> {selectedMessage.phone}
                </p>
              )}
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 leading-relaxed text-zinc-700 bg-white">
              {selectedMessage.message}
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Répondre */}
      <Modal
        isOpen={!!replyTarget}
        onClose={() => setReplyTarget(null)}
        title={`Répondre à ${replyTarget?.senderName}`}
        description={`Email : ${replyTarget?.senderEmail}`}
        maxWidth="lg"
      >
        <form onSubmit={handleSendReply} className="space-y-4">
          <div>
            <Textarea
              label="Votre réponse"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={6}
              required
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-zinc-100">
            <Button variant="outline" size="sm" type="button" onClick={() => setReplyTarget(null)}>
              Annuler
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              isLoading={isSendingReply}
              rightIcon={<Send className="w-3.5 h-3.5" />}
            >
              Envoyer la réponse
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
