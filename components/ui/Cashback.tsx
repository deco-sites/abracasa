import SellbieIcon from "deco-sites/abracasa/components/ui/SellbieIcon.tsx";
import { formatPrice } from "deco-sites/abracasa/sdk/format.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { invoke } from "$store/runtime.ts";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { CashbackAPIResponse } from "$store/loaders/sellbie/get-cashback.ts";

function NotLoggedIn() {
  return (
    <div class="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        class="p-0.5 m-1"
      >
        <a href="/login" class="w-9 h-9">
          <SellbieIcon />
        </a>
      </div>

      <div
        tabIndex={0}
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-60 -translate-x-1/2 left-1/2"
      >
        <span>Você precisa estar logado!</span>
      </div>
    </div>
  );
}

function CashbackContent(
  { content, priceColor, value }: {
    content: string;
    priceColor: string;
    value: number;
  },
) {
  return (
    <div class="flex flex-col gap-0.5 px-2 text-center">
      <span class="text-sm">{content}</span>
      <span class={`${priceColor} font-bold text-lg`}>
        {value === 0 ? "R$ 0,00" : formatPrice(value)}
      </span>
    </div>
  );
}

function SellbieCashback() {
  const { user } = useUser();
  const cashback = useSignal<CashbackAPIResponse | null>(null);

  if (!user || !user.value || !user.value.email) return <NotLoggedIn />;

  useEffect(() => {
    async function getUserCashback() {
      if (!user.value?.taxID) return;

      const cashbackValue = await invoke["deco-sites/abracasa"].loaders.sellbie
        ["get-cashback"]({
          cpf: user.value.taxID,
        });

      if (cashbackValue) {
        cashback.value = cashbackValue;
      }
    }

    getUserCashback();
  }, [user.value.email]);

  return (
    <div class="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        class="p-0.5 m-1"
      >
        <a href="/meu-cashback" class="w-9 h-9">
          <SellbieIcon />
        </a>
      </div>

      <div
        tabIndex={0}
        class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-60 -translate-x-1/2 left-1/2"
      >
        <div class="grid grid-cols-2 divide-x-2 divide-black gap-2">
          <CashbackContent
            content="Cashback disponível"
            priceColor="text-emerald-400"
            value={cashback.value?.resultado?.SaldoTotalDisponivel ?? 0}
          />
          <CashbackContent
            content="Cashback a expirar"
            priceColor="text-red-400"
            value={cashback.value?.resultado?.CashbackTotalPendente ?? 0}
          />
        </div>
      </div>
    </div>
  );
}

export default SellbieCashback;
