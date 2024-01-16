import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useState } from "preact/hooks";

import type { Props as BtnProps } from "$store/components/product/AddToCartButton/common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  productID: string;
}

const useAddToCart = ({ productID, seller, eventParams }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();
  const { addItems } = useCart();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await addItems({
        orderItems: [{
          id: productID,
          seller: seller,
          quantity: 1,
        }],
      });

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button
      {...btnProps}
      class="btn btn-block bg-transparent uppercase border border-dimgray rounded-none hover:bg-dimgray text-dimgray hover:text-white font-normal leading-[15px] text-[13px] cursor-pointer"
    >
      Adicionar ao carrinho
    </Button>
  );
}

export default AddToCartButton;
