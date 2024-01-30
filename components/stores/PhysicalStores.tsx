import { useUI } from "$store/sdk/useUI.ts";

import StoreInfo from "./StoreInfo.tsx";
import Button from "$store/components/ui/Button.tsx";

import type { StoreInfo as StoreInfoProps } from "$store/components/stores/StoreInfo.tsx";

interface Props {
  filteredStores: StoreInfoProps[];
}

function PhysicalStores({ filteredStores }: Props) {
  const { displayPhysicalStores } = useUI();

  if (filteredStores === null) {
    return <div class="mt-6 px-6">Carregando...</div>;
  }

  if (filteredStores.length === 0) {
    return <span class="loading loading-spinner loading-lg"></span>;
  }

  if (filteredStores.length === 0) {
    return (
      <div class="flex flex-col justify-center items-center h-full gap-6 px-6">
        <span class="font-medium text-xl text-center">
          Não há lojas físicas disponíveis para este produto.
        </span>
        <Button
          class="btn-outline"
          onClick={() => {
            displayPhysicalStores.value = false;
          }}
        >
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <ul
      role="list"
      class="mt-6 px-6 flex-grow overflow-y-auto flex flex-col gap-6"
    >
      {filteredStores?.map((store, index) => (
        <li key={index} class="border-b border-lavender pb-4">
          <StoreInfo {...store} />
        </li>
      ))}
    </ul>
  );
}

export default PhysicalStores;
