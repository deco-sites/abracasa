import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import LoginElement from "$store/islands/LoginElement.tsx";
import { Device } from "apps/website/matchers/device.ts";
import SellbieCashback from "$store/islands/Cashback.tsx";

function Navbar(
  { items, searchbar, logo, device }: {
    items: SiteNavigationElement[];
    searchbar?: SearchbarProps;
    logo?: { src: string; alt: string };
    device: Device;
  },
) {
  const platform = usePlatform();
  const isDesktop = device === "desktop";

  return (
    <>
      {/* Mobile Version */}
      {!isDesktop && (
        <>
          <div
            id="mobile-navbar"
            class="xl:hidden flex flex-row justify-between items-center w-full px-4 gap-2 h-[105px] group-data-[scrolling='true']/nav:h-[56px]"
          >
            {logo && (
              <>
                <a
                  id="mobile-navbar-anchor"
                  href="/"
                  class="inline-flex group-data-[scrolling='true']/nav:hidden max-h-[80px] max-w-[80px] w-full h-full py-0.5"
                  aria-label="Store logo"
                >
                  <Image
                    id="mobile-navbar-image"
                    src={logo.src}
                    alt={logo.alt}
                    width={80}
                    height={16}
                    class="w-full h-full object-cover"
                  />
                </a>

                <a
                  id="mobile-navbar-anchor-minimized"
                  href="/"
                  class="hidden group-data-[scrolling='true']/nav:inline-flex max-h-[40px] max-w-[40px] w-full h-full py-0.5"
                  aria-label="Store minimized logo"
                >
                  <img
                    src="/image/minimized-icon.jpg"
                    alt="Logo Abracasa Minificada"
                    width={40}
                    height={40}
                    class="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              </>
            )}

            <SearchButton />
            <SellbieCashback />
            {platform === "vtex" && <CartButtonVTEX />}
            <MenuButton />
          </div>

          <Searchbar searchbar={searchbar} type="mobile" />
        </>
      )}

      {/* Desktop Version */}
      {isDesktop && (
        <div
          id="desktop-navbar"
          class="hidden xl:flex flex-col justify-center items-center w-full py-1 group-data-[scrolling='true']/nav:py-0"
        >
          <div class="flex justify-between items-center max-w-[95%] gap-7 w-full">
            <div class="flex-none w-[75px]">
              {logo && (
                <a
                  href="/"
                  aria-label="Store logo"
                  class="block w-[75px]"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={75}
                    height={75}
                    class="block group-data-[scrolling='true']/nav:hidden"
                  />

                  <img
                    src="/image/minimized-icon.jpg"
                    alt="Logo Abracasa Minificada"
                    loading="lazy"
                    decoding="async"
                    width={40}
                    height={40}
                    class="hidden group-data-[scrolling='true']/nav:block"
                  />
                </a>
              )}
            </div>

            <ul class="flex-auto flex items-center justify-center gap-10 px-4">
              {items.map((item) => <NavItem item={item} />)}
            </ul>

            <div class="w-full max-w-[50%]">
              <Searchbar searchbar={searchbar} />
            </div>

            <div class="flex items-center justify-between gap-7 w-full">
              <a
                class="inline-flex items-center gap-1 text-xs"
                href="/institucional/nossas-lojas"
                aria-label="Log in"
              >
                <Icon
                  id="OurStores"
                  width={32}
                  height={32}
                  alt="Store icon"
                />
                <span class="tracking-[0.05em]">Lojas</span>
              </a>

              <SellbieCashback />

              {platform === "vtex" && <CartButtonVTEX />}

              <LoginElement />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
