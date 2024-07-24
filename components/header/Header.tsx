import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { Props as CampaignTimerProps } from "$store/components/header/CampaignTimer.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import CampaignTimer from "./CampaignTimer.tsx";
import { FnContext } from "deco/types.ts";

export type TAlert = HTMLWidget;

export interface Props {
  campaignTimer?: CampaignTimerProps;

  alerts?: TAlert[];

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
  campaignTimer,
  alerts,
  searchbar,
  navItems,
  logo,
  device,
}: ReturnType<typeof loader>) {
  const platform = usePlatform();
  const items = navItems ?? [];

  const hasCampaignTimer = !!(
    campaignTimer &&
    campaignTimer.text !== undefined &&
    campaignTimer.image !== undefined &&
    !campaignTimer.hiddenCampaignTimer &&
    (
      (campaignTimer.expiresAt &&
        new Date(campaignTimer.expiresAt) > new Date()) ||
      !campaignTimer.expiresAt
    )
  );

  return (
    <>
      <header
        class={`${
          hasCampaignTimer ? "h-[250px] xl:h-[290px]" : "h-[140px] xl:h-[180px]"
        }`}
      >
        <Drawers
          menu={{ items }}
          platform={platform}
        >
          <div class="bg-base-100 fixed w-full z-[9999999]">
            {hasCampaignTimer && <CampaignTimer {...campaignTimer} />}

            {alerts && alerts.length > 0 && <Alert alerts={alerts} />}

            <Navbar
              items={items}
              searchbar={searchbar && { ...searchbar }}
              logo={logo}
              device={device}
              hasCampaignTimer={hasCampaignTimer}
            />
          </div>
        </Drawers>
      </header>
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
