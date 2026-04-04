import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "1234567890"; // Replace with your WhatsApp number (with country code, no + or spaces)
const DEFAULT_MESSAGE = encodeURIComponent("Hi! I'm interested in Lumière candles");

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${DEFAULT_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
