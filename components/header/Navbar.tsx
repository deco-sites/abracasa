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
import LoginElement from "$store/islands/LoginElement.tsx";
import { Device } from "apps/website/matchers/device.ts";
import SellbieCashback from "deco-sites/abracasa/components/ui/Cashback.tsx";

function Navbar({ items, searchbar, logo, hasCampaignTimer, device }: {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
  hasCampaignTimer?: boolean;
  device: Device;
}) {
  const platform = usePlatform();
  const isDesktop = device === "desktop";

  return (
    <>
      {/* Mobile Version */}
      {!isDesktop && (
        <>
          <div
            id="mobile-navbar"
            class="lg:hidden flex flex-row justify-between items-center border-b border-base-200 w-full px-4 gap-2 h-[105px]"
          >
            {logo && (
              <>
                <a
                  id="mobile-navbar-anchor"
                  href="/"
                  class="inline-flex max-h-[80px] max-w-[80px] w-full h-full py-0.5"
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
                  class="hidden max-h-[40px] max-w-[40px] w-full h-full py-0.5"
                  aria-label="Store minimized logo"
                >
                  <img
                    src="/image/minimized-icon.jpg"
                    alt="Logo Abracasa Minificada"
                    width={40}
                    height={40}
                    class="w-full h-full object-cover"
                    loading="lazy"
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
                href="/institucional/nossas-lojas"
                aria-label="Log in"
              >
                <img
                  src={asset("/image/store.svg")}
                  width={32}
                  height={32}
                  alt="Store icon"
                  class="group-hover:text-firebrick"
                />
                <span>nossas lojas</span>
              </a>

              <a
                class="inline-flex items-center gap-1 group text-xs"
                href="/wishlist"
                aria-label="Wishlist"
              >
                <Icon
                  id="Heart"
                  size={30}
                  strokeWidth={0.75}
                  fill="none"
                  class="group-hover:text-firebrick"
                />
                <span>favoritos</span>
              </a>

              <SellbieCashback />

              <div class="inline-flex items-center gap-1 group text-xs">
                <img
                  src={asset("/image/user.svg")}
                  width={32}
                  height={32}
                  alt="User icon"
                  class="group-hover:text-firebrick"
                />
                <LoginElement />
              </div>

              {platform === "vtex" && <CartButtonVTEX />}
            </div>
          </div>
          <ul class="flex-auto flex items-center justify-center border-t border-base-200 gap-2.5 w-full">
            {items.map((item) => (
              <NavItem item={item} hasCampaignTimer={hasCampaignTimer} />
            ))}
          </ul>
        </div>
      )}

      <Subnavbar
        items={items}
        searchbar={searchbar}
        device={device}
      />
    </>
  );
}

export default Navbar;
