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
import Subnavbar from "$store/islands/Header/Subnavbar.tsx";
import { navbarHeight } from "./constants.ts";
import { Device } from "deco/utils/device.ts";

function Navbar({ items, searchbar, logo, device }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
  device: Device;
}) {
  const platform = usePlatform();
  const isDesktop = device === "desktop";

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="lg:hidden flex flex-row justify-between items-center border-b border-base-200 w-full px-4 gap-2"
      >
        {logo && (
          <a
            href="/"
            class="inline-flex"
            style={{ minHeight: "80px" }}
            aria-label="Store logo"
          >
            <Image src={logo.src} alt={logo.alt} width={80} height={16} />
          </a>
        )}

        <SearchButton />
        {platform === "vtex" && <CartButtonVTEX />}
        <MenuButton />
      </div>

      {/* Desktop Version */}
      {isDesktop && (
        <div
          id="desktop-navbar"
          class="hidden lg:flex flex-col justify-center items-center w-full"
        >
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

            <div class="w-full lg:max-w-[600px]">
              <Searchbar searchbar={searchbar} />
            </div>

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
      )}

      <Subnavbar items={items} searchbar={searchbar} logo={logo} />
    </>
  );
}

export default Navbar;
