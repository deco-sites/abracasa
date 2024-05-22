import { formatPrice } from "deco-sites/abracasa/sdk/format.ts";

const cashbacks = {
  Ativos: [
    { "valor": 10, "DataFim": "2024-05-31T23:59:59" },
    { "valor": 30, "DataFim": "2024-05-31T23:59:59" },
    { "valor": 50, "DataFim": "2024-05-31T23:59:59" },
  ],
};

function CashbackContent(
  { content, priceColor }: { content: string; priceColor: string },
) {
  return (
    <div class="flex flex-col gap-0.5 px-2 text-center">
      <span class="text-sm">{content}</span>
      <span class={`${priceColor} font-bold text-lg`}>
        {formatPrice(cashbacks.Ativos[0].valor)}
      </span>
    </div>
  );
}

function SellbieCashback() {
  return (
    <div class="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        class="flex items-center justify-center bg-green-600 p-0.5 w-8 h-8 m-1 text-white text-lg rounded-full"
      >
        S
      </div>

      <div
        tabIndex={0}
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-60 -translate-x-1/2 left-1/2"
      >
        <div class="grid grid-cols-2 divide-x-2 divide-black gap-2">
          <CashbackContent
            content="Cashback disponível"
            priceColor="text-emerald-400"
          />
          <CashbackContent
            content="Cashback a expirar"
            priceColor="text-red-400"
          />
        </div>
      </div>
    </div>
  );
}

export default SellbieCashback;
