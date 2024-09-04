import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/abracasa/components/ui/Icon.tsx";
import { useScript } from "deco/hooks/useScript.ts";
import { getCookies } from "std/http/cookie.ts";

export interface Props {
  /**
   * @description Example: 24 hours -> 1 day. 72 hours -> 2 days. Default: 72.
   */
  hoursToShowPopupAgain?: number;
  popup: {
    source: ImageWidget;
    description: string;
    link: string;
    target: "_self" | "_blank";
  };
}

export default function CampaignPopup(props: Props) {
  if (!props || !props.popup) return null;

  const { popup, hoursToShowPopupAgain = 72 } = props;

  const handleCloseModal = (name: string, value: string, hours: number) => {
    document.addEventListener("DOMContentLoaded", () => {
      const modalBtn = document.getElementById("close-modal-btn");

      function setCookie() {
        const date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // Convert hours to milliseconds
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "") + ";" + expires +
          ";path=/";
      }

      modalBtn?.addEventListener("click", () => {
        setCookie();
        document.getElementById("modal")?.classList.add("hidden");
      });
    });
  };

  return (
    <>
      <div
        id="modal"
        className="fixed inset-0 z-[99999999999] flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black opacity-50" />

        <div className="relative w-[90%] sm:w-[400px] h-[400px]">
          <a href={popup.link} className="w-full h-full">
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
            className="absolute top-2 right-2 text-white bg-black rounded-full p-2 hover:bg-gray-800 transition-all duration-200"
          >
            <Icon id="XMark" size={20} strokeWidth={1} />
          </button>
        </div>
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            handleCloseModal,
            "modal-popup",
            "closed",
            hoursToShowPopupAgain,
          ),
        }}
      />
    </>
  );
}

export const loader = (props: Props, req: Request) => {
  const cookies = getCookies(req.headers);
  const cookie = cookies["modal-popup"];

  if (cookie) return;

  return {
    ...props,
  };
};
