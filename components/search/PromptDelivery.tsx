import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export default function PromptDelivery() {
  const enabled = useSignal(false);

  const getCurrentUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      prontaEntrega: params.has("add") || params.has("addAtelieEntrega"),
      atelie: params.has("addAtelie") || params.has("addAtelieEntrega"),
    };
  };

  const updateUrlParams = (ativaProntaEntrega: boolean, atelieAtivo: boolean) => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    urlSearchParams.delete("add");
    urlSearchParams.delete("addAtelie");
    urlSearchParams.delete("addAtelieEntrega");

    if (ativaProntaEntrega && atelieAtivo) {
      urlSearchParams.set("addAtelieEntrega", "true");
    } else {
      if (ativaProntaEntrega) {
        urlSearchParams.set("add", "prontaEntrega");
      }
      if (atelieAtivo) {
        urlSearchParams.set("addAtelie", "atelieCadabra");
      }
    }

    window.location.search = urlSearchParams.toString();
  };

  const handleClick = () => {
    const { prontaEntrega, atelie } = getCurrentUrlParams();
    updateUrlParams(!prontaEntrega, atelie);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      enabled.value = params.has("add") || params.has("addAtelieEntrega");
    }
  }, []);

  return (
    <div class="w-full flex items-center justify-between gap-2 bg-[#f2f2f2] py-[11px] px-3 lg:px-[13px] lg:py-[13px] max-w-[169px] rounded">
      <span class="leading-[22px] text-[#555555] text-[14px] lg:text-[13px] font-sans">
        Pronta Entrega
      </span>

      <button
        onClick={handleClick}
        aria-label="Toggle Pronta Entrega"
        class={`w-[38px] h-5 flex items-center rounded-full transition-all duration-300 ${
          enabled.value ? "bg-[#4E4D4D] p-1" : "bg-[#B4B4B4] p-0.5"
        }`}
      >
        <div
          class={`h-4 w-4 bg-white rounded-full shadow-md transform transition-all duration-300 ${
            enabled.value ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
