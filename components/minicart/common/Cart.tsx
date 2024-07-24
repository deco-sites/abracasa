import Button from "$store/components/ui/Button.tsx";
import { asset } from "$fresh/runtime.ts";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useState } from "preact/hooks";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import Shipping from "./Shipping.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon?: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;
  const [shippingValue, setShippingValue] = useState<number | null>(null);

  return (
    <div
      class="flex flex-col overflow-hidden"
      style={{ minWidth: "calc(min(100vw, 300px))", maxWidth: "300px" }}
    >
      {isEmtpy
        ? (
          <div class="flex flex-col items-center justify-center gap-6 max-w-[75%] mx-auto mt-12">
            <img
              src={asset("/image/cart.svg")}
              width={30}
              height={30}
              alt="Cart icon"
              loading="lazy"
            />

            <span class="font-bold text-sm leading-[15px] text-center">
              Carrinho vazio, continue navegando e adicione produtos aqui!
            </span>

            <Button
              class="btn-outline uppercase text-xs leading-4 font-normal"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Continuar comprando
            </Button>
          </div>
        )
        : (
          <>
            {/* Cart Items */}
            <ul
              role="list"
              class="mt-6 px-6 flex-grow overflow-y-auto flex flex-col gap-6 w-full"
            >
              {items.map((item, index) => (
                <li key={index} class="border-b pb-2.5 last:border-none">
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="flex flex-col w-full z-10">
              {/* Subtotal */}
              <div class="w-full flex justify-between px-2 pb-0.5 text-sm">
                <span>Subtotal</span>
                <span class="px-2">
                  {formatPrice(subtotal, currency, locale)}
                </span>
              </div>

              <div class="border-t border-base-200 py-2 flex flex-col gap-4">
                {onAddCoupon && (
                  <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
                )}

                <Shipping
                  shippingValue={shippingValue}
                  setShippingValue={setShippingValue}
                />
              </div>

              {/* Total */}
              <div class="grid grid-cols-2 items-center divide-x border-t border-base-200 py-2 px-2 w-full">
                <div class="flex justify-between items-center text-xs w-full pr-2">
                  <span>Descontos:</span>
                  {discounts === 0
                    ? (
                      <span>
                        R$ 0,00
                      </span>
                    )
                    : (
                      <span>
                        {formatPrice(discounts, currency, locale)}
                      </span>
                    )}
                </div>

                <div class="flex justify-between items-center font-bold text-sm w-full pl-2">
                  <span>Total:</span>
                  <span>
                    {formatPrice(total, currency, locale)}
                  </span>
                </div>
              </div>

              <div>
                <a class="inline-block w-full" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="btn-primary btn-block rounded-none border-none bg-[#555555] hover:bg-[#2c2c2c] transition-colors duration-300 text-white font-bold select-none"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total - discounts,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    Finalizar Compra
                  </Button>
                </a>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
