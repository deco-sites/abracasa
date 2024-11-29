import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Navbar from "./Navbar.tsx";
import { type FnContext, type SectionProps } from "@deco/deco";
import { useScript } from "@deco/deco/hooks";
export type TAlert = HTMLWidget;
import type { Props as CampaignTimerProps } from "$store/components/header/CampaignTimer.tsx";
import CampaignTimer from "$store/components/header/CampaignTimer.tsx";
export interface Props {
    campaignTimer?: CampaignTimerProps;
    /** @title Search Bar */
    searchbar?: Omit<SearchbarProps, "platform">;
    /**
     * @title Navigation items
     * @description Navigation items used both on mobile and desktop menus
     */
    navItems?: SiteNavigationElement[] | null;
    /** @title Logo */
    logo?: {
        src: ImageWidget;
        alt: string;
    };
}
function Header({ campaignTimer, searchbar, navItems, logo, device, isHomePage, }: SectionProps<typeof loader>) {
    const platform = usePlatform();
    const items = navItems ?? [];
    function handleScroll() {
        const header = document.getElementById("nav");
        const isHome = ["/", "/home-teste"].includes(document.location.pathname);
        document.addEventListener("scroll", () => {
            const scrollY = globalThis.scrollY > 0;
            if (!isHome) {
                header?.classList.add("bg-base-100", "text-gray-dark");
                header?.classList.remove("text-white", "overlay", "xl:hover:text-gray-dark");
            }
            else {
                header?.classList.toggle("bg-base-100", scrollY);
                header?.classList.toggle("text-gray-dark", scrollY);
                header?.classList.toggle("text-white", !scrollY);
                header?.classList.toggle("xl:hover:text-gray-dark", !scrollY);
                header?.classList.toggle("overlay", !scrollY);
            }
            header?.classList.toggle("top-0", scrollY);
            header?.setAttribute("data-scrolling", scrollY.toString());
        });
    }
    return (<>
        {campaignTimer && <CampaignTimer {...campaignTimer} />}
        <header class={!isHomePage ? "h-24 xl:h-[126px]" : ""}>
            <Drawers menu={{ items }} platform={platform}>
                <div data-scrolling="false" data-isHome={isHomePage ? "true" : "false"} id="nav" class={`font-sans fixed w-full z-[9999999] transition duration-200 ease-in group/nav data-[scrolling='true']:h-[56px] data-[scrolling='true']:xl:h-[75px] ${isHomePage
                    ? "overlay xl:hover:bg-base-100 xl:hover:text-gray-dark text-white"
                    : "bg-base-100 text-gray-dark border-b"}`}>
                    <Navbar items={items} searchbar={searchbar && { ...searchbar }} logo={logo} device={device} />
                </div>
            </Drawers>
        </header>

        <script type="module" dangerouslySetInnerHTML={{ __html: useScript(handleScroll) }} />
    </>);
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
