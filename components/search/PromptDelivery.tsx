import Icon from "$store/components/ui/Icon.tsx";

const SORT_QUERY_PARAM = "readyDelivery";

const applySort = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  if (!window.location.href.includes("readyDelivery")) {
    urlSearchParams.set(SORT_QUERY_PARAM, "true");
  } else {
    urlSearchParams.delete(SORT_QUERY_PARAM);
  }

  window.location.search = urlSearchParams.toString();
};

export default function PromptDelivery() {
  return (
    <button
      aria-label="filtrar por prontas entregas"
      onClick={applySort}
      class="flex items-center gap-2"
    >
      <div
        type="checkbox"
        class="appearance-none hidden"
      />
      <div class="w-[13px] h-[13px] border border-gray-400 rounded-sm flex justify-center items-center">
        <div
          class={`${
            self?.location?.href?.includes("readyDelivery") && "bg-[#555]"
          } w-[13px] h-[13px] rounded-sm`}
        />
      </div>
      <Icon id="Clock" width={32} height={25} fill="none" />
      <span class="leading-[22px] text-[#555] text-base">Pronta Entrega</span>
    </button>
  );
}
