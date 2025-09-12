import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useState, useEffect } from "preact/hooks";

export interface Props {
  hoursToShowPopupAgain?: number;
  popup: {
    source: ImageWidget;
    description: string;
    link: string;
    target: "_self" | "_blank";
  };
}

const setPopupCookie = (name: string, value: string, hours: number) => {
  const date = new Date();
  if (hours > 0) {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
  } else {
    date.setTime(date.getTime() + 30 * 60 * 1000);
  }
  const expires = hours > 0 ? "expires=" + date.toUTCString() : "";
  document.cookie = `${name}=${value || ""};${expires};path=/`;
};

const getPopupCookie = (name: string) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

export default function CampaignPopup({
  popup,
  hoursToShowPopupAgain = 72,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostra o modal só se não tiver o cookie
    const cookie = getPopupCookie("modal-popup");
    if (!cookie) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setPopupCookie("modal-popup", "closed", hoursToShowPopupAgain);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      id="modal"
      class="fixed inset-0 z-[99999999999] flex items-center justify-center"
    >
      <div
        id="modal-overlay"
        class="absolute inset-0 bg-black opacity-50"
        onClick={handleClose}
      />

      <div class="relative w-[90%] sm:w-[400px] h-[400px]">
        <a href={popup.link} class="w-full h-full" target={popup.target}>
          <Image
            src={popup.source}
            alt={popup.description}
            width={400}
            height={400}
            loading="lazy"
          />
        </a>

        <button
          id="close-modal-btn"
          class="absolute top-2 right-2 text-white bg-black rounded-full p-2 hover:bg-gray-800 transition-all duration-200"
          onClick={handleClose}
        >
          <Icon id="XMark" size={20} strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}
