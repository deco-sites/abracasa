import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Navbar from "./Navbar.tsx";
import { FnContext } from "deco/types.ts";
import { useScript } from "deco/hooks/useScript.ts";

export type TAlert = HTMLWidget;

export interface Props {
  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
}

function Header({
  searchbar,
  navItems,
  logo,
  device,
}: ReturnType<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  function handleScroll() {
    document.addEventListener("scroll", () => {
      const scrollY = globalThis.scrollY;
      const header = document.getElementById("nav");

      if (scrollY > 0) {
        header?.classList.remove("text-white", "xl:hover:text-gray-dark");
        header?.classList.add("bg-base-100", "text-gray-dark");
        header?.setAttribute("data-scrolling", "true");
      } else {
        header?.classList.remove("bg-base-100", "text-gray-dark");
        header?.classList.add("text-white", "xl:hover:text-gray-dark");
        header?.setAttribute("data-scrolling", "false");
      }
    });
  }

  return (
    <>
      <header>
        <Drawers
          menu={{ items }}
          platform={platform}
        >
          <div
            data-scrolling="false"
            id="nav"
            class="xl:hover:bg-base-100 fixed w-full z-[9999999] shadow-inner-custom xl:hover:shadow-none text-white xl:hover:text-gray-dark transition duration-200 ease-in group/nav"
          >
            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar }}
              logo={logo}
              device={device}
            />
          </div>
        </Drawers>
      </header>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(handleScroll) }}
      />
    </>
  );
}

export const loader = (props: Props, _req: Request, ctx: FnContext) => {
  return {
    ...props,
    device: ctx.device,
  };
};

export default Header;
