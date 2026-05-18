import { SITE_NAME, SITE_PHONE, SITE_URL } from "@/lib/constants";

const phone = SITE_PHONE.replace(/\D/g, "");
const message = `Hi ${SITE_NAME}! I need more info about ${SITE_NAME} ${SITE_URL}/`;
const href = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;

export default function WhatsAppButton() {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        backgroundColor: "#25D366",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.477 2.027 7.788L0 32l8.424-2.01A15.938 15.938 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.76-1.843l-.485-.288-5.003 1.194 1.228-4.869-.317-.5A13.253 13.253 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.274-9.878c-.398-.2-2.355-1.162-2.72-1.294-.366-.133-.632-.2-.898.2-.266.398-1.031 1.294-1.264 1.56-.232.267-.465.3-.863.1-.398-.2-1.681-.62-3.202-1.977-1.183-1.057-1.982-2.363-2.214-2.761-.232-.398-.025-.613.175-.811.18-.178.398-.465.598-.698.2-.233.266-.398.398-.664.133-.267.067-.498-.033-.698-.1-.2-.898-2.163-1.23-2.96-.325-.78-.655-.674-.898-.686l-.765-.013c-.266 0-.698.1-.1064.498-.366.398-1.397 1.364-1.397 3.328s1.43 3.86 1.63 4.127c.199.266 2.815 4.3 6.822 6.03.954.412 1.698.658 2.279.843.957.305 1.828.262 2.517.159.767-.115 2.355-.963 2.688-1.894.333-.93.333-1.727.233-1.894-.1-.167-.366-.267-.764-.465z" />
      </svg>
    </a>
  );
}
