import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useEffect, useState } from "preact/hooks";
import NavItem from "./NavItem.tsx";
import { Device } from "deco/utils/device.ts";

export interface Props {
  items: SiteNavigationElement[];
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
  device: Device;
}

export default function Subnavbar({ items, searchbar, logo, device }: Props) {
  const [scrollingMode, setScrollingMode] = useState(self.window.scrollY > 0);

  if (self.window.scrollY > 0) {
    const timer = document.getElementById("campaign-timer");
    const alert = document.getElementById("alert-slider");
    const desktopNavbar = document.getElementById("desktop-navbar");

    desktopNavbar?.classList?.remove("lg:flex");
    timer?.classList?.remove("hidden");
    alert?.classList?.add("hidden");
  }

  useEffect(() => {
    const window_ = window;

    function handleScroll() {
      const timer = document.getElementById("campaign-timer");
      const alert = document.getElementById("alert-slider");
      const desktopNavbar = document.getElementById("desktop-navbar");

      if (self.window.scrollY > 0) {
        setScrollingMode(true);
        alert?.classList.add("hidden");
        timer?.classList.add("hidden");
        desktopNavbar?.classList.remove("lg:flex");
      } else {
        setScrollingMode(false);
        alert?.classList.remove("hidden");
        timer?.classList.remove("hidden");
        desktopNavbar?.classList.add("lg:flex");
      }
    }

    window_.addEventListener("scroll", handleScroll);
    return () => window_.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      {scrollingMode && device === "desktop" && (
        <div class="hidden lg:flex flex-col justify-center items-center w-full">
          <div class="flex justify-between items-center max-w-[85%] gap-2.5 w-full">
            <div class="flex">
              {logo && (
                <a
                  href="/"
                  aria-label="Store logo"
                  class="block px-4 py-3 w-[80px] xl:w-[160px]"
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
