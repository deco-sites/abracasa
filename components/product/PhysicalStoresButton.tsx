import { IS_BROWSER } from "$fresh/runtime.ts";

import Drawer from "$store/components/ui/Drawer.tsx";
import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import PhysicalStores from "$store/components/stores/PhysicalStores.tsx";

import { useUI } from "$store/sdk/useUI.ts";
import { useStores } from "$store/hooks/stores/getStores.ts";

import type { StoreInfo } from "$store/components/stores/StoreInfo.tsx";

export interface Props {
  refId: string;
}

export default function PhysicalStoresButton({ refId }: Props) {
  const { displayPhysicalStores } = useUI();
  let isActive = false;
  let availablesStores: StoreInfo[] = [];

  if (IS_BROWSER) {
    const { filteredStores } = useStores({ refId: String(refId) });

    if (filteredStores.length !== 0) {
      isActive = true;
    }

    availablesStores = filteredStores;
  }

  return (
    <Drawer
      loading="lazy"
      open={displayPhysicalStores.value}
      onClose={() => displayPhysicalStores.value = false}
      class="drawer-end"
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full overflow-y-hidden">
            <div class="flex justify-end items-center">
              <Button
                class="btn btn-ghost"
                onClick={() => displayPhysicalStores.value = false}
              >
                <Icon id="XMark" size={32} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex flex-col flex-grow overflow-auto gap-2">
              <div class="flex border-b border-black max-w-[90%] w-full pb-4 mx-auto">
                <h1 class="text-2xl leading-[33px] text-[#212121]">
                  Este produto está exposto nas lojas:
                </h1>
              </div>
              <PhysicalStores filteredStores={availablesStores} />
            </div>
          </div>
        </>
      }
    >
      {isActive && (
        <button
          onClick={() => {
            displayPhysicalStores.value = true;
          }}
          aria-label="physical stores"
          class="px-3 py-1 leading-3 text-[13px] w-[280px] h-10 flex items-center bg-[#E7E7E7CC] text-black gap-1.5"
        >
          <Icon id="PhysicalStores" width={16} height={14} loading="lazy" />

          <span>Lojas físicas com este produto</span>
        </button>
      )}
    </Drawer>
  );
}
