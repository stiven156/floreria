"use client";

import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import type { StoreSettings } from "@/lib/types";

export function WhatsAppFab({ settings }: { settings: StoreSettings }) {
  const msg = `Hola ${settings.storeName} 🌸, me gustaría hacer un pedido.`;
  return (
    <a
      href={whatsappUrl(settings.whatsappNumber, msg)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="animate-float fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
