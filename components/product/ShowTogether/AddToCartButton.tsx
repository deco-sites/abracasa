import Button from "deco-sites/abracasa/components/ui/Button.tsx";
import { sendEvent } from "deco-sites/abracasa/sdk/analytics.tsx";
import { useCallback } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import { useUI } from "deco-sites/abracasa/sdk/useUI.ts";

interface Options {
  sku: string;
  seller?: string;
  price: number;
  discount: number;
  quantity: number;
  /**
   * sku name
   */
  name: string;
  productGroupId: string;
}

export interface Props {
  products: Options[];
}

const useAddToCart = ({ items }: { items: Options[] }) => {
  const isAddingToCart = useSignal(false);
  const { displayCart } = useUI();
  const { addItems } = useCart();

  const onClick = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        isAddingToCart.value = true;
        const orderItems = items.map(({ sku, seller, quantity }) => ({
          id: sku,
          seller: seller!,
          quantity,
        }));
        await addItems({ orderItems });

        items.forEach(
          ({ productGroupId, quantity, price, discount, name, sku }) => {
            sendEvent({
              name: "add_to_cart",
              params: {
                items: [
                  {
                    item_id: productGroupId,
                    quantity,
                    price,
                    discount,
                    item_name: name,
                    item_variant: sku,
                  },
                ],
              },
            });
          },
        );

        displayCart.value = true;
      } finally {
        isAddingToCart.value = false;
      }
    },
    [items],
  );

  return { onClick, loading: isAddingToCart.value };
};

export default function AddToCartButton({ products }: Props) {
  if (!products || products.length === 0) return null;

  const items = useAddToCart({
    items: products,
  });

  return (
    <Button
      data-deco="add-to-cart"
      {...items}
      class="w-full h-[41px] min-h-min bg-firebrick hover:bg-firebrick/90 text-white text-sm border-transparent hover:border-transparent rounded-md mt-2 transition-all duration-150 ease-in-out"
    >
      COMPRAR JUNTO
    </Button>
  );
}
