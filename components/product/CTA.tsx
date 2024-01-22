import Image from "apps/website/components/Image.tsx";
import { formatPrice } from "$store/sdk/format.ts";

import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";

import type { Props as BtnProps } from "$store/components/product/AddToCartButton/common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
  price?: number;
  listPrice?: number;
  priceCurrency?: string;
  installments?: string;
  name: string;
  content?: {
    image: string;
    alt: string;
  };
}

export default function CTA(
  {
    eventParams,
    productID,
    seller,
    content,
    listPrice,
    price,
    priceCurrency,
    installments,
    name,
  }: Props,
) {
  function handleScrollOnPDP() {
    self.addEventListener("scroll", () => {
      const scrollY = self.scrollY;
      const ctaContent = document.getElementById("cta-content");

      if (scrollY > 1120) {
        ctaContent?.classList.remove("opacity-0");
        ctaContent?.classList.add("opacity-100");
      } else {
        ctaContent?.classList.add("opacity-0");
        ctaContent?.classList.remove("opacity-100");
      }
    });
  }

  return (
    <>
      <div
        id="cta-content"
        class="opacity-0 z-40 py-2 px-3 w-full h-auto lg:h-[100px] fixed bottom-0 left-0 bg-base-100 shadow-2xl border-t border-solid border-[#d9d9d9] transition-all ease-in duration-300"
      >
        <div class="flex items-center justify-between lg:max-w-[90%] xl:max-w-[80%] mx-auto gap-4">
          <aside class="flex items-center gap-4">
            {content && (
              <Image
                src={content.image}
                width={88}
                height={88}
                alt={content.alt}
                class="hidden lg:block"
                loading="lazy"
              />
            )}

            <span class="hidden lg:block lg:max-w-[280px]">{name}</span>

            <div class="flex flex-col md:flex-row md:items-end md:gap-3">
              <div class="flex flex-col">
                <span class="line-through text-xs">
                  {formatPrice(listPrice, priceCurrency)}
                </span>
                <span class="font-bold text-lg">
                  {formatPrice(price, priceCurrency)}
                </span>
              </div>

              <span class="text-xs md:text-base">
                {installments?.replace("sem juros", "")}
              </span>
            </div>
          </aside>

          <div class="md:min-w-[35%]">
            <AddToCartButtonVTEX
              eventParams={eventParams}
              productID={productID}
              seller={seller}
            />
          </div>
        </div>
      </div>

      <script
        defer
        dangerouslySetInnerHTML={{
          __html: `(${handleScrollOnPDP.toString()})()`,
        }}
      />
    </>
  );
}
