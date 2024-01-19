import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton, SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useEffect, useState } from "preact/hooks";
import { asset } from "$fresh/runtime.ts";
import NavItem from "./NavItem.tsx";

export interface Props {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
}

export default function Subnavbar({ items, searchbar, logo }: Props) {
  const [scrollingMode, setScrollingMode] = useState(self.window.scrollY > 0);

  if (self.window.scrollY > 0) {
    const alert = document.getElementById("alert-slider")!;
    const desktopNavbar = document.getElementById("desktop-navbar")!;

    desktopNavbar.classList.remove("lg:flex");
    alert.classList.add("hidden");
  }

  function handleScroll() {
    const alert = document.getElementById("alert-slider")!;
    const desktopNavbar = document.getElementById("desktop-navbar")!;

    if (self.window.scrollY > 0) {
      setScrollingMode(true);
      alert.classList.add("hidden");
      desktopNavbar.classList.remove("lg:flex");
    } else {
      setScrollingMode(false);
      alert.classList.remove("hidden");
      desktopNavbar.classList.add("lg:flex");
    }
  }

  useEffect(() => {
    globalThis.addEventListener("scroll", handleScroll);
  });

  return (
    <>
      {scrollingMode && (
        <div class="hidden lg:flex flex-col justify-center items-center w-full">
          <div class="flex justify-between items-center max-w-[85%] gap-2.5 w-full">
            <div class="flex">
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

            <div class="flex-auto flex items-center justify-center gap-1 w-full">
              {items.map((item) => (
                <NavItem item={item} scrollingMode={true} />
              ))}
            </div>

            <div class="w-full lg:max-w-[500px]">
              <Searchbar searchbar={searchbar} />
            </div>

            <div>
              <CartButtonVTEX />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
