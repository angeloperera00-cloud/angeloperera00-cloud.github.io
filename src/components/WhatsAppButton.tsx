const WHATSAPP_NUMBER = "1234567890";
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
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004S24.826 0 16.004 0zm9.302 22.602c-.388 1.094-1.938 2.002-3.17 2.266-.844.18-1.946.322-5.656-1.216-4.748-1.966-7.804-6.778-8.038-7.094-.226-.316-1.9-2.53-1.9-4.826s1.2-3.426 1.628-3.894c.388-.426.912-.614 1.216-.614.148 0 .28.008.4.014.428.018.642.044.924.716.354.838 1.216 2.962 1.322 3.178.108.216.216.508.068.796-.14.296-.264.428-.48.676-.216.248-.422.438-.638.706-.198.234-.42.484-.178.912.242.428 1.076 1.776 2.312 2.878 1.59 1.416 2.928 1.854 3.344 2.06.316.156.694.132.944-.132.318-.338.71-.898 1.108-1.452.284-.396.642-.446.99-.298.354.14 2.242 1.058 2.626 1.25.384.194.642.288.736.45.092.162.092.938-.296 2.032z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
