import { SendEventOnView } from "$store/components/Analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { Product } from "apps/commerce/types.ts";

import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";

import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";

export interface Props {
  relatedProducts: Product[];
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

export default function Similars({ relatedProducts }: Props) {
  const id = useId();

  return (
    <div class="w-full flex flex-col gap-3 relative">
      <span class="leading-5 text-sm">Outras cores:</span>

      <div
        id={id}
        class="grid grid-cols-[48px_1fr_48px]"
      >
        <Slider class="carousel carousel-center sm:carousel-end gap-2 col-span-full row-start-2 row-end-5">
          {relatedProducts?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[72px]"
            >
              <a
                href={product.url && relative(product.url)}
                aria-label="view product"
                class="grid grid-cols-1 grid-rows-1 w-full"
                rel="prefetch"
              >
                <Image
                  src={product?.image?.[0]?.url ?? ""}
                  alt={product?.image?.[0]?.alternateName ?? ""}
                  width={72}
                  height={72}
                  preload={false}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </Slider.Item>
          ))}
        </Slider>

        <>
          <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
            <Slider.PrevButton class="absolute right-[80%] disabled:opacity-50">
              <Icon size={20} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
            <Slider.NextButton class="absolute left-[80%] disabled:opacity-50">
              <Icon
                size={20}
                id="ChevronLeft"
                strokeWidth={3}
                class="rotate-180"
              />
            </Slider.NextButton>
          </div>
        </>
        <SliderJS rootId={id} />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: "view_similars_colors_on_pdp",
              items: relatedProducts.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...(useOffer(product.offers)),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}
