import { asset } from "$fresh/runtime.ts";

export interface Props {
  phone?: number;
}

function WhatsApp({ phone }: Props) {
  if (!phone) {
    return null;
  }

  return (
    <a
      href={`https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`}
      class="fixed bottom-6 right-6 z-30"
      aria-label="Chat on WhatsApp"
    >
      <img
        class="object-cover"
        src={asset("/image/logo_whatsapp.svg")}
        width={60}
        height={60}
        alt="Logo do Whatsapp"
        loading="lazy"
      />
    </a>
  );
}

export default WhatsApp;
