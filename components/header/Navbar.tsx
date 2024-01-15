import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { asset } from "$fresh/runtime.ts";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";

function Navbar({ items, searchbar, logo }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}) {
  const platform = usePlatform();

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <MenuButton />

        {logo && (
          <a
            href="/"
            class="flex-grow inline-flex items-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={80} height={16} />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          {platform === "vtex" && <CartButtonVTEX />}
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-col justify-center items-center w-full">
        <div class="flex justify-between items-center max-w-[85%] gap-2.5 w-full">
          <div class="flex-none w-44">
            {logo && (
              <a
                href="/"
                aria-label="Store logo"
                class="block px-4 py-3 w-[160px]"
              >
                <Image src={logo.src} alt={logo.alt} width={80} height={16} />
              </a>
            )}
          </div>

          <Searchbar searchbar={searchbar} />

          <div class="flex items-center justify-between max-w-[45%] w-full gap-4">
            <a
              class="inline-flex items-center gap-1 group text-xs"
              href="/nossas-lojas"
              aria-label="Log in"
            >
              <img
                src={asset("/image/store.svg")}
                width={24}
                height={24}
                alt="Store icon"
                class="group-hover:text-firebrick"
              />
              <span>nossas lojas</span>
            </a>

            <a
              class="inline-flex items-center gap-1 group text-xs"
              href="/login"
              aria-label="Log in"
            >
              <img
                src={asset("/image/user.svg")}
                width={24}
                height={24}
                alt="User icon"
                class="group-hover:text-firebrick"
              />
              <span>
                entrar <br /> meus pedidos
              </span>
            </a>

            <a
              class="inline-flex items-center gap-1 group text-xs"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <Icon
                id="Heart"
                size={24}
                strokeWidth={0.75}
                fill="none"
                class="group-hover:text-firebrick"
              />
              <span>favoritos</span>
            </a>

            {platform === "vtex" && <CartButtonVTEX />}
          </div>
        </div>
        <div class="flex-auto flex items-center justify-center border-t border-base-200 gap-2.5 w-full">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
