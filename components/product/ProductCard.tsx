import { asset } from "$fresh/runtime.ts";
import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import AddToCartButton from "$store/islands/Shelf/AddToCartButton.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
  isPLP?: boolean;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 252;
const HEIGHT = 252;

function ProductCard(
  { product, preload, itemListName, layout, index, isPLP = false }: Props,
) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const description = product.description || isVariantOf?.description;
  const [front, second] = images ?? [];
  const back = images?.find((item) => item.name === "dois") ?? second;
  const { listPrice, price, seller, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";

  const skuSelector = variants.map(([value, link]) => (
    <li>
      <a href={link}>
        <Avatar
          variant={link === url ? "active" : link ? "default" : "disabled"}
          content={value}
        />
      </a>
    </li>
  ));

  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
    quantity: 1,
    index,
  });

  const cta = (
    <AddToCartButton
      seller={seller!}
      productID={productID}
      eventParams={{ items: [eventItem] }}
    />
  );

  return (
    <div
      id={id}
      class={`card card-compact group w-full border border-[#D9D9D9] rounded-none ${align === "center" ? "text-center" : "text-start"
        } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
        ${l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
        }
      ${isPLP && "min-h-full"}
      `}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure
        class="relative overflow-hidden"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        {/* Flags */}
        <div
          class={`inline-flex items-center scrollbar-none overflow-x-auto gap-[2px] lg:gap-1.5 absolute top-2 z-10 max-w-full ${l?.elementsPositions?.favoriteIcon === "Top left"
              ? "right-1 md:right-2"
              : "left-1 md:left-2 pr-2 sm:pr-0"
            }`}
        >
          {additionalProperty.find((item) => item.value === "Pronta Entrega") &&
            (
              <div class="flex items-center justify-center bg-dimgray rounded-[1.9px] lg:rounded-[3.29px] text-[11px] leading-[12.57px] text-white py-3 px-[4.61px] lg:min-w-[96px] text-nowrap h-[18.54px]">
                pronta entrega
              </div>
            )}

          {additionalProperty.find((item) => item.value === "Exclusivo") && (
            <div class="flex items-center justify-center bg-white rounded-[1.9px] lg:rounded-[3.29px] text-[11px] leading-[12.57px] text-dimgray py-3 px-[4.61px] lg:min-w-[61px] text-nowrap h-[18.54px]">
              exclusivo
            </div>
          )}

          {product.isSimilarTo && product.isSimilarTo.length > 0 && (
            <div class="flex items-center justify-center bg-white rounded-[1.9px] lg:rounded-[3.29px] text-[11px] leading-[12.57px] text-dimgray py-3 px-[4.61px] lg:min-w-[66px] text-nowrap h-[18.54px]">
              +{product.isSimilarTo.length} cores
            </div>
          )}
        </div>
        {additionalProperty?.some((property) =>
          property.value?.includes("Atelie Casa")
        ) && (
            <div class="absolute flex flex-col gap-1 z-10 bottom-2 left-1.5">
              <img
                src={asset("/image/logo_atelie_abracasa.svg")}
                width={18}
                height={18}
                alt="Logo Ateliê Cadabra"
                loading="lazy"
              />
            </div>
          )}
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 w-full"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full w-full ${l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125"
                : ""
              }`}
            sizes="(max-width: 640px) 50vw, 20vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
              <Image
                src={back?.url ?? front.url!}
                alt={back?.alternateName ?? front.alternateName}
                width={WIDTH}
                height={HEIGHT}
                class="block bg-base-100 col-span-full row-span-full transition-opacity w-full opacity-0 group-hover:opacity-100"
                sizes="(max-width: 640px) 50vw, 20vw"
                loading="lazy"
                decoding="async"
              />
            )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "lg:hidden"
            }`}
        >
          {/* SKU Selector */}
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )}
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-2 gap-3 lg:gap-4">
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
            <>
              {l?.hide?.skuSelector ? "" : (
                <ul
                  class={`flex items-center gap-2 w-full overflow-auto p-3 ${align === "center" ? "justify-center" : "justify-start"
                    } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                >
                  {skuSelector}
                </ul>
              )}
            </>
          )}

        {l?.hide?.productName && l?.hide?.productDescription ? "" : (
          <a
            href={url && relative(url)}
            class="flex flex-col gap-0 lg:px-1.5"
          >
            {l?.hide?.productName ? "" : (
              <h2
                class="text-[13.44px] text-black leading-[18.48px] tracking-[0.84px]"
                dangerouslySetInnerHTML={{
                  __html: isVariantOf?.name ?? name ?? "",
                }}
              />
            )}
            {l?.hide?.productDescription ? "" : (
              <div
                class="truncate text-sm lg:text-sm text-neutral"
                dangerouslySetInnerHTML={{ __html: description ?? "" }}
              />
            )}
          </a>
        )}

        <a
          href={url && relative(url)}
          class="flex items-center justify-between w-full h-full gap-2 lg:px-1.5"
        >
          <div class="flex flex-col w-full">
            {l?.hide?.allPrices
              ? ""
              : (
                <div class="flex flex-col leading-[15px]">
                  <div
                    class={`flex flex-col gap-0 ${l?.basics?.oldPriceSize === "Normal"
                        ? "lg:flex-row lg:gap-2"
                        : ""
                      } ${align === "center" ? "justify-center" : "justify-start"
                      }`}
                  >
                    <div class="flex justify-between items-center">
                      {(listPrice ?? 0) > (price ?? 0) && (
                        <div
                          class={`line-through text-[#A4A2A2] text-xs ${l?.basics?.oldPriceSize === "Normal"
                              ? "lg:text-xl"
                              : ""
                            }`}
                        >
                          {formatPrice(listPrice, offers?.priceCurrency)}
                        </div>
                      )}
                      {(listPrice ?? 0) > (price ?? 0) && (
                        <span class="text-[#E31010] font-semibold text-[10px] lg:hidden">
                          R$ {Math.round((listPrice ?? 0) - (price ?? 0))} OFF
                        </span>
                      )}
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="text-black font-bold text-sm my-[9px] lg:my-0">
                        {formatPrice(price, offers?.priceCurrency)}
                      </div>
                      <div class="flex items-center gap-[6px]">
                        {(listPrice ?? 0) > (price ?? 0) && (
                          <span class="text-[#E31010] font-semibold text-[10px] hidden lg:block">
                            R$ {Math.round((listPrice ?? 0) - (price ?? 0))} OFF
                          </span>
                        )}
                        {((listPrice ?? 0) - (price ?? 0) > 0) && (
                          <div class="flex items-center justify-center bg-[#E31010] rounded text-xs font-bold leading-[18px] text-white p-2 w-10 h-[18px]">
                            -{Math.round(
                              ((listPrice! - price!) * 100) / listPrice!,
                            )}%
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {installments && (
                    <p class="flex text-xs leading-[15px] text-black">
                      {installments?.replace("sem juros", "s/ juros").replace(
                        ".",
                        ",",
                      )}
                    </p>
                  )}
                </div>
              )}
          </div>

          {/* Discount Flags */}
        </a>

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide?.skuSelector ? "" : (
              <ul
                class={`flex items-center gap-2 w-full ${align === "center" ? "justify-center" : "justify-start"
                  } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
              >
                {skuSelector}
              </ul>
            )}
          </>
        )}

        {!l?.hide?.cta
          ? (
            <div
              class={`flex-auto flex items-end ${l?.onMouseOver?.showCta ? "lg:hidden" : ""
                }`}
            >
              {cta}
            </div>
          )
          : ""}
      </div>
    </div>
  );
}

export default ProductCard;
