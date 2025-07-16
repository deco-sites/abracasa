import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useState } from "preact/hooks";
import type { AddToCartParams } from "apps/commerce/types.ts";
import type { Props as BtnProps } from "$store/components/product/AddToCartButton/common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
  eventParams: AddToCartParams;
  skuId: string;
  url?: string; 
}

function AddToCartRedirectButton({
  seller,
  productID,
  eventParams,
  skuId,
  url,
}: Props) {

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    sendEvent({
      name: "add_to_cart",
      params: eventParams,
    });


    setTimeout(() => {
      window.location.href =
        url ??
        `/checkout/cart/add?sku=${skuId}&qty=1&seller=${seller}&redirect=true&sc=1`;
    }, 200);
  };

  return (
    <Button
      onClick={handleClick}
      data-deco="add-to-cart"
      class="flex items-center justify-center h-[66px] w-full bg-dimgray hover:bg-black/70 font-bold text-white uppercase text-[18px] leading-[25px]"
    >
      Comprar
    </Button>
  );
}

export default AddToCartRedirectButton;
