import Image from "apps/website/components/Image.tsx";
import { MenuProps } from "deco-sites/abracasa/components/header/Header.tsx";

function NavItem({ item }: { item: MenuProps }) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  const hasChildren = children?.some(
    (node) => node.children && node.children.length > 0
  );

  return (
    <li  class="group flex items-center">
      <a
        href={url}
        class="flex items-center justify-center h-[118px] group-data-[scrolling='true']/nav:h-[75px]"
      >
        <span class="flex items-center justify-center group-hover:text-firebrick text-sm leading-[22px] tracking-[0.12em] h-full font-medium">
          {name}
        </span>
      </a>

      {children && children.length > 0 && (
        <div
          class="absolute hidden hover:flex group-hover:flex bg-base-100 z-50 items-start border-t border-b-2 border-base-200 w-screen py-4 px-8 gap-16 mt-[120px] group-data-[scrolling='true']/nav:mt-[75px]"
          style={{
            top: "0px",
            left: "0px",
          }}
        >
          {image?.url && (
            <Image
              src={image.url}
              alt={image.alternateName}
              width={320}
              height={320}
              loading="lazy"
              class="rounded-lg"
            />
          )}

          <ul
            class={`flex ${item.activeStyle? "w-full justify-center !flex-row flex-nowrap !gap-x-[13px]" : ""} 
              ${
              !hasChildren
                ? "flex-col flex-wrap gap-x-[90px] max-h-[270px]"
                : "flex-wrap flex-col gap-8 h-[400px] py-2 justify-between flex-1"
            }`}
          >
            {children.map((node) => (
              <li class={`${node.activeStyle? "flex justify-center max-w-[261px]" : ""}`}>
                <div class={"flex flex-col"}>
                  <a
                    href={node.url}
                    class={`text-gray-dark text-sm
                      ${node.activeStyle ? "flex flex-col items-center" : ""}
                      ${
                      hasChildren
                        ? "font-semibold"
                        : "hover:text-firebrick transition-colors duration-100 ease-in tracking-[0.5px] leading-[180%]"
                    }`}
                  >
                    {node.itemMenuImage && (
                      <img class="max-w-[31px] max-h-[20px]" src={node.itemMenuImage} alt={node.name} />
                    )}
                    <span class={`${node.activeStyle? "mt-[15px] mb-2 text-black font-normal text-base leading-[22.4px] tracking-[0.5px] text-center align-middle" : ""}`} >{node.name}</span>
                    <p class={`${node.activeStyle? "font-normal text-[#A7A7A7] text-[11px] leading-[16.8px] text-center align-middle" : ""}`}>{node.description}</p>
                  </a>

                  {hasChildren && (
                    <a
                      href={node.url}
                      class="text-gray-light text-xs font-semibold"
                    >
                      + Ver tudo
                    </a>
                  )}
                </div>

                <ul class="flex flex-col gap-1 mt-2">
                  {node.children?.map((leaf) => (
                    <li>
                      <a
                        class="text-gray-dark hover:text-firebrick transition-colors duration-100 ease-in"
                        href={leaf.url}
                      >
                        <span class="text-[13px] tracking-[0.5px] leading-[180%]">
                          {leaf.name}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

export default NavItem;
