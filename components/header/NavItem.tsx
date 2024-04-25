import type { SiteNavigationElement } from "apps/commerce/types.ts";
import { headerHeight } from "./constants.ts";

function NavItem(
  { item, scrollingMode = false, hasCampaignTimer }: {
    item: SiteNavigationElement;
    scrollingMode?: boolean;
    hasCampaignTimer?: boolean;
  },
) {
  const { url, name, children } = item;

  const navItemHeight = hasCampaignTimer ? "290px" : headerHeight;

  return (
    <li class="group flex items-center">
      <a
        href={url}
        class="flex items-center justify-center px-4 py-3 group-hover:bg-firebrick transition-all duration-300 w-[140px]"
      >
        <span class="group-hover:text-white text-sm leading-[22px] transition-all duration-300">
          {name}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start gap-1 border-t border-b-2 border-base-200 w-screen py-4"
            style={{
              top: "0px",
              left: "0px",
              marginTop: scrollingMode ? "58px" : navItemHeight,
            }}
          >
            <ul class="flex flex-col items-start gap-0.5 text-[#555]">
              {children.map((node) => (
                <div class="flex flex-row w-full h-full group/one ml-12">
                  <li class="flex items-center justify-between py-1 z-10 px-3 h-full w-[250px]">
                    <a class="no-underline w-full" href={node.url}>
                      <span class="group-hover/one:text-firebrick text-sm leading-[22px] w-full">
                        {node.name}
                      </span>
                    </a>
                  </li>

                  <div
                    class="absolute invisible hover:visible group-hover/one:visible flex flex-col gap-1.5 h-full px-3 pl-12 py-6"
                    style={{ top: "0px", left: "300px" }}
                  >
                    <div class="flex flex-col leading-none">
                      <span class="text-firebrick text-lg leading-[22px] w-full">
                        {node.name}
                      </span>

                      <a class="no-underline mt-2.5" href={node.url}>
                        <span class="text-[14px] leading-[19px] font-semibold hover:opacity-80 transition-opacity duration-150">
                          Ver Tudo
                        </span>
                      </a>
                    </div>

                    <ul class="flex flex-col flex-wrap gap-y-1.5 gap-x-12 my-3 max-h-[140px]">
                      {node.children?.map((leaf) => (
                        <li>
                          <a class="no-underline" href={leaf.url}>
                            <span class="text-[14px] leading-[19px] font-normal hover:text-firebrick">
                              {leaf.name}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
