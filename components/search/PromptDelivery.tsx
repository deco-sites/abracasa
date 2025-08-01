import { useSignal } from "@preact/signals";


export default function PromptDelivery() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const prontaEntregaAtivo = urlSearchParams.has("prontaEntrega");
  const atelieAtivo = urlSearchParams.has("addAtelie");

  const enabled = useSignal(prontaEntregaAtivo || urlSearchParams.has("addAtelieEntrega"));

  const updateUrlParams = (ativaProntaEntrega: boolean) => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;

    searchParams.delete("add");
    searchParams.delete("addAtelie");
    searchParams.delete("addAtelieEntrega");
    searchParams.delete("prontaEntrega");

    if (ativaProntaEntrega && atelieAtivo) {
      searchParams.set("addAtelieEntrega", "true");
    } else if (ativaProntaEntrega) {
      searchParams.set("prontaEntrega", "true");
    } else if (atelieAtivo) {
      searchParams.set("addAtelie", "atelieCasa");
    }

    window.location.href = `${url.pathname}?${searchParams.toString()}`;
  };

  const handleClick = () => {
    updateUrlParams(!enabled.value);
  };
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
