import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-4 pt-4 bg-whitesmoke text-sm leading-4 text-[#212121]">
      {methods.map((method) => (
        <li class="flex justify-center items-center border-b border-[#d5d5d5] pb-4 px-1">
          <span class="w-[35%]">
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>

          <span class="text-button w-full">
            Frete {method.name} - até{" "}
            {formatShippingEstimate(method.shippingEstimate)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, [items, postalCode.value]);

  return (
    <div class="flex flex-col gap-2">
      <div class="flex flex-col">
        <span class="text-sm leading-5">Calcule o frete:</span>
      </div>

      <form
        class="flex items-center border border-[#D9D9D9] justify-between w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleSimulation();
        }}
      >
        <input
          as="input"
          type="text"
          class="w-full text-sm text-black h-[54px] pl-3 placeholder:text-[#D9D9D9] focus:outline-none"
          placeholder="Digite seu cep"
          value={postalCode.value}
          maxLength={8}
          size={8}
          onChange={(e: { currentTarget: { value: string } }) => {
            postalCode.value = e.currentTarget.value;
          }}
        />
        <Button
          type="submit"
          loading={loading.value}
          hasBtnClass={false}
          class="w-[94px] h-[54px] bg-[#9A9A9A] text-white text-xs leading-4 uppercase"
        >
          Calcular
        </Button>
      </form>

      <div class="flex flex-col">
        <a
          class="text-xs leading-4 text-dimgray underline"
          target="_blank"
          href="http://www.buscacep.correios.com.br/sistemas/buscacep/"
        >
          Não sei meu cep
        </a>
      </div>

      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
