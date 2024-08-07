import Image from "apps/website/components/Image.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

function NavItem(
  { item }: { item: SiteNavigationElement },
) {
  const { url, name, children } = item;
  const image = item?.image?.[0];

  const hasChildren = children?.some((node) =>
    node.children && node.children.length > 0
  );

  return (
    <li class="group flex items-center">
      <a
        href={url}
        class="flex items-center justify-center h-[118px]"
      >
        <span class="flex items-center justify-center group-hover:text-firebrick text-sm leading-[22px] h-full">
          {name}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-50 items-start border-t border-b-2 border-base-200 w-screen py-4 px-8 gap-16"
            style={{
              top: "0px",
              left: "0px",
              marginTop: "120px",
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
              class={`flex ${
                !hasChildren
                  ? "flex-col flex-wrap gap-y-2 gap-x-[90px] max-h-[270px]"
                  : "flex-wrap gap-12 container"
              }`}
            >
              {children.map((node) => (
                <li>
                  <div class="flex flex-col">
                    <a
                      href={node.url}
                      class={`text-gray-dark text-sm ${
                        hasChildren
                          ? "font-semibold"
                          : "font-normal hover:text-firebrick transition-colors duration-100 ease-in"
                      }`}
                    >
                      <span>{node.name}</span>
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
                    {node.children?.slice(0, 4)?.map((leaf) => (
                      <li>
                        <a
                          class="text-gray-dark hover:text-firebrick transition-colors duration-100 ease-in text-sm"
                          href={leaf.url}
                        >
                          <span class="text-xs">{leaf.name}</span>
                        </a>
                      </li>
                    ))}

                    {node.children && node.children.length > 4 && (
                      <li>
                        <a
                          href={node.url}
                          class="text-gray-dark font-bold text-xs"
                        >
                          + Ver tudo
                        </a>
                      </li>
                    )}
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
