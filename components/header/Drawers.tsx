import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));

export interface Props {
  menu: MenuProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  { onClose, children, isMinicart = false, isMenu = false }: {
    title: ComponentChildren;
    onClose?: () => void;
    children: ComponentChildren;
    isMinicart?: boolean;
    isMenu?: boolean;
  },
) => (
  <div
    class={`bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y max-w-[100%] ${
      isMenu && "w-[75%]"
    } ${isMinicart && "lg:w-[300px]"}`}
  >
    <div class="flex justify-end items-center px-4 py-3 h-[59px] bg-[#FBFBFB]">
      {onClose && (
        <Button class="text-[#585858] font-normal" hasBtnClass={false} onClick={onClose}>
          X
        </Button>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, children, platform }: Props) {
  const { displayCart, displayMenu } = useUI();

  return (
    <Drawer
      class="drawer-end"
      open={displayMenu.value}
      onClose={() => {
        displayMenu.value = false;
      }}
      aside={
        <Aside
          onClose={() => {
            displayMenu.value = false;
          }}
          isMenu={displayMenu.value}
          title={displayMenu.value
            ? (
              <p class="flex flex-col text-dimgray text-sm leading-4">
                <span>Olá, seja bem vindo à</span>
                <span class="text-firebrick font-bold leading-[30px] text-[22px]">
                  Abra Casa
                </span>
              </p>
            )
            : <span>Buscar</span>}
        >
          {displayMenu.value && <Menu {...menu} />}
        </Aside>
      }
    >
      <Drawer
        class="drawer-end"
        open={displayCart.value !== false}
        onClose={() => displayCart.value = false}
        aside={
          <Aside
            isMinicart={true}
            title={
              <span class="text-base leading-5 text-[#212121] uppercase">
                Meu Carrinho
              </span>
            }
            onClose={() => displayCart.value = false}
          >
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
