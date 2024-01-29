import Icon from "$store/components/ui/Icon.tsx";

export default function PromptDelivery() {
  return (
    <div class="flex items-center gap-2">
      <input
        aria-label="filtrar por prontas entregas"
        type="checkbox"
        class="rounded-md w-[13px] h-[13px]"
      />
      <Icon id="Clock" width={32} height={25} fill="none" />
      <span class="leading-[22px] text-[#555] text-base">Pronta Entrega</span>
    </div>
  );
}
