import { useEffect, useState } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";

import Button from "$store/components/ui/Button.tsx";

interface Props {
  shippingValue: number | null;
  setShippingValue: (value: number | null) => void;
}

function Shipping({ shippingValue, setShippingValue }: Props) {
  const { simulate, cart } = useCart();
  const { items } = cart.value ?? { items: [] };
  const [loading, setLoading] = useState(false);
  const [cep, setCep] = useState("");
  const [cepError, setCepError] = useState("");

  useEffect(() => {
    async function shippingCalculate() {
      setLoading(true);

      if (shippingValue && items.length > 0) {
        const sanitizedCep = cep.replace(/\D/g, "");
        if (sanitizedCep.length !== 8) {
          setLoading(false);
          return;
        }

        const shippingValueCalculated = await simulate({
          items: items.map((item) => ({
            id: Number(item.id),
            quantity: item.quantity,
            seller: item.seller,
          })),
          postalCode: sanitizedCep,
          country: "BRA",
        });

        const methods =
          shippingValueCalculated.logisticsInfo?.reduce(
            (initial, { slas }) => {
              const price = slas.length > 0 ? slas[0].price : 0;
              return [...initial, price];
            },
            [] as number[]
          ) ?? [];

        const totalShippingPrice = methods.reduce(
          (sum, price) => sum + price,
          0
        );

        const price = totalShippingPrice === 0 ? null : totalShippingPrice;

        setShippingValue(price);
      }

      setLoading(false);
    }

    shippingCalculate();
  }, [cart.value, shippingValue]);

  return (
    <div class="flex justify-between items-center px-2 w-full">
      {!shippingValue ? (
        <form
          class="flex flex-col w-full h-full justify-between gap-2" 
          onSubmit={async (e) => {
            e.preventDefault();

            const sanitizedCep = cep.replace(/\D/g, "");
            if (sanitizedCep.length !== 8) {
              setCepError("Digite um CEP válido.");
              return;
            } else {
              setCepError("");
            }

            try {
              setLoading(true);

              const shippingValue = await simulate({
                items: items.map((item) => ({
                  id: Number(item.id),
                  quantity: item.quantity,
                  seller: item.seller,
                })),
                postalCode: sanitizedCep,
                country: "BRA",
              });

              const methods =
                shippingValue.logisticsInfo?.reduce((initial, { slas }) => {
                  const price = slas.length > 0 ? slas[0].price : 0;
                  return [...initial, price];
                }, [] as number[]) ?? [];

              const totalShippingPrice = methods.reduce(
                (sum, price) => sum + price,
                0
              );

              setShippingValue(totalShippingPrice);
            } finally {
              setLoading(false);
            }
          }}
        >
          <div class="flex items-center justify-between gap-2 w-full h-[36px]">
            <div class="flex items-center justify-center gap-2 w-full border border-gray-200 bg-white rounded p-2 max-w-[180px]">
              <input
                name="shipping"
                class="w-full focus:outline-none placeholder:text-sm text-sm placeholder:text-[#d5d5d5]"
                type="number"
                maxLength={8}
                value={cep}
                onChange={(e) => setCep(e.currentTarget.value)}
                placeholder={"Adicione o seu frete"}
              />
            </div>

            <Button
              hasBtnClass={false}
              type="submit"
              htmlFor="coupon"
              loading={loading}
              class="flex items-center justify-center  w-[75px] h-[36px] text-xs text-firebrick border border-firebrick hover:bg-[#73c650] hover:border-[#73c650] transition-colors duration-150 rounded px-2.5"
            >
              Calcular
            </Button>
          </div>

          {cepError && (
            <span class="text-red-500 text-xs mt-1 block max-w-[180px]">
              {cepError}
            </span>
          )}
        </form>
      ) : (
        <div class="flex items-center justify-between w-full pr-2 text-sm">
          <div class="flex items-center gap-2">
            <span>Frete</span>
            <span class="text-firebrick font-bold uppercase">
              {cep} - R${shippingValue / 100}
            </span>
          </div>

          <Button
            hasBtnClass={false}
            loading={loading}
            class="hover:text-firebrick transition-colors duration-150 text-lg"
            onClick={() => {
              setShippingValue(null);
              setCep("");
              setCepError("");
            }}
          >
            X
          </Button>
        </div>
      )}
    </div>
  );
}

export default Shipping;
