import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren } from "preact";
import { lazy, Suspense } from "preact/compat";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Searchbar = lazy(() => import("$store/components/search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = (
  { title, onClose, children, isMinicart = false, isMenu = false }: {
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
    <div class="flex justify-between items-center px-4 py-3">
      <h1>
        {title}
      </h1>
      {onClose && (
        <Button hasBtnClass={false} onClick={onClose}>
          <Icon
            id={(isMinicart || isMenu) ? "ChevronRight" : "XMark"}
            size={24}
            strokeWidth={2}
          />
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

function Drawers({ menu, searchbar, children, platform }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer } = useUI();

  return (
    <Drawer
      class={displayMenu.value ? "drawer-end" : ""}
      open={displayMenu.value || displaySearchDrawer.value}
      onClose={() => {
        displayMenu.value = false;
        displaySearchDrawer.value = false;
      }}
      aside={
        <Aside
          onClose={() => {
            displayMenu.value = false;
            displaySearchDrawer.value = false;
          }}
          isMenu={displayMenu.value ? true : false}
          title={displayMenu.value
            ? (
              <p class="flex flex-col text-[#555] text-sm leading-4">
                <span>Olá, seja bem vindo à</span>
                <span class="text-firebrick font-bold leading-[30px] text-[22px]">
                  Abra Casa
                </span>
              </p>
            )
            : <span>Buscar</span>}
        >
          {displayMenu.value && <Menu {...menu} />}
          {searchbar && displaySearchDrawer.value && (
            <div class="w-screen">
              <Searchbar {...searchbar} />
            </div>
          )}
        </Aside>
      }
    >
      <Drawer // right drawer
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
