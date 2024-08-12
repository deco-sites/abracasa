import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Navbar from "./Navbar.tsx";
import { FnContext } from "deco/types.ts";
import { useScript } from "deco/hooks/useScript.ts";
import { SectionProps } from "deco/mod.ts";

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
  isHomePage,
}: SectionProps<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  function handleScroll() {
    document.addEventListener("scroll", () => {
      const scrollY = globalThis.scrollY;
      const header = document.getElementById("nav");

      const isHome = document.location.pathname === "/";

      if (!isHome) return;

      if (scrollY > 0) {
        header?.classList.remove(
          "text-white",
          "xl:hover:text-gray-dark",
          "overlay",
        );
        header?.classList.add("bg-base-100", "text-gray-dark");
        header?.setAttribute("data-scrolling", "true");
      } else {
        header?.classList.remove("bg-base-100", "text-gray-dark");
        header?.classList.add(
          "text-white",
          "xl:hover:text-gray-dark",
          "overlay",
        );
        header?.setAttribute("data-scrolling", "false");
      }
    });
  }

  return (
    <>
      <header class={!isHomePage ? "h-[105px] xl:h-[126px]" : ""}>
        <Drawers
          menu={{ items }}
          platform={platform}
        >
          <div
            data-scrolling={isHomePage ? "false" : "true"}
            id="nav"
            class={`fixed w-full z-[9999999] transition duration-200 ease-in group/nav ${
              isHomePage
                ? "overlay xl:hover:bg-base-100 xl:hover:text-gray-dark text-white"
                : "bg-base-100 text-gray-dark border-b"
            }`}
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

export const loader = (props: Props, req: Request, ctx: FnContext) => {
  const url = new URL(req.url);

  return {
    ...props,
    device: ctx.device,
    isHomePage: url.pathname === "/" || url.pathname === "/home-teste",
  };
};

export default Header;
