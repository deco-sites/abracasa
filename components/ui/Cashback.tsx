import { formatPrice } from "deco-sites/abracasa/sdk/format.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { invoke } from "$store/runtime.ts";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import type { CashbackAPIResponse } from "$store/loaders/sellbie/get-cashback.ts";
import type { Secret } from "apps/website/loaders/secret.ts";

export interface Props {
  storeToken?: Secret;
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
        {formatPrice(value)}
      </span>
    </div>
  );
}

function SellbieCashback({ storeToken }: Props) {
  const { user } = useUser();
  const cashback = useSignal<CashbackAPIResponse | null>(null);

  if (!user || !user.value || !user.value.email) return null;

  useEffect(() => {
    async function getUserCashback() {
      const cpf = await invoke["deco-sites/abracasa"].loaders.dataentities
        ["get-personal-info"]({ email: user?.value?.email });

      if (!cpf) return;

      const cashbackValue = await invoke["deco-sites/abracasa"].loaders.sellbie
        ["get-cashback"]({ storeToken, cpf });

      if (cashbackValue) {
        cashback.value = cashbackValue;
        console.log(cashbackValue);
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
          <svg
            width="35"
            height="35"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            id="Camada_1"
            x="0px"
            y="0px"
            viewBox="0 0 35.9 32.8"
            xml:space="preserve"
          >
            <g>
              <path
                id="inner-circle"
                style="fill: rgb(78, 174, 66);"
                d="M27.5,16.7c0,5.3-4.3,9.6-9.6,9.6s-9.6-4.3-9.6-9.6s4.3-9.6,9.6-9.6c0,0,0,0,0,0       C23.2,7.1,27.5,11.4,27.5,16.7C27.5,16.7,27.5,16.7,27.5,16.7"
              >
              </path>
              <path
                id="inner-symbol"
                style="fill: rgb(255, 255, 255);"
                d="M19.6,21.4h-4.4c-0.6,0-1.1-0.5-1.1-1.1c0-0.3,0.1-0.6,0.3-0.8       c0.2-0.2,0.5-0.3,0.8-0.3h4.4c0.5,0,1-0.3,1.3-0.8c-0.3-0.4-0.7-0.7-1.2-0.7h-3.4c-1.1,0-2-0.8-2.1-2c0-0.3,0.1-0.6,0.2-0.9       c-0.1-0.3-0.2-0.5-0.2-0.8c0-1.1,1-2.1,2.1-2h4.4c0.6,0,1.1,0.5,1.1,1c0,0.6-0.5,1.1-1,1.1c0,0,0,0-0.1,0h-4.4       c-0.4,0-0.8,0.2-1,0.5c-0.1,0.1-0.2,0.2-0.2,0.3c0.3,0.4,0.7,0.7,1.3,0.7h3.4c1.1,0,2.1,0.9,2.1,2.1c0,0.2,0,0.5-0.1,0.7       c0.5,1.1,0,2.3-1.1,2.7C20.1,21.3,19.9,21.4,19.6,21.4 M19.6,20.8L19.6,20.8c0.8,0,1.5-0.7,1.5-1.5c0-0.1,0-0.1,0-0.2       c0,0,0,0.1-0.1,0.1c-0.4,0.4-0.9,0.6-1.5,0.6h-4.4c-0.3,0-0.5,0.2-0.5,0.5c0,0.3,0.2,0.5,0.5,0.5L19.6,20.8z M19.6,17.2       c0.5,0,1.1,0.2,1.4,0.6c0,0,0,0,0-0.1c0-0.8-0.7-1.5-1.5-1.5h-3.4c-0.6,0-1.1-0.3-1.5-0.7c0,0.1,0,0.1,0,0.2       c0,0.8,0.7,1.4,1.5,1.4c0,0,0,0,0,0L19.6,17.2z M16.2,12.7c-0.8,0-1.5,0.7-1.5,1.5c0,0.1,0,0.1,0,0.2l0,0       c0.4-0.4,0.9-0.6,1.5-0.6h4.4c0.3,0,0.5-0.2,0.5-0.5c0-0.3-0.2-0.5-0.5-0.5L16.2,12.7"
              >
              </path>
              <path
                id="arrow-left"
                style="fill: rgb(78, 174, 66);"
                d="M25.6,28.9c-6.9,4.2-15.9,2-20-4.9C2.4,18.9,2.8,12.4,6.5,7.6l0.6,4.9l1.3-0.2L7.5,5.5       L0.7,6.4l0.2,1.3l4.2-0.5c-5.2,7-3.8,16.9,3.2,22.1c5.1,3.8,12,4.2,17.5,1L25.6,28.9z"
              >
              </path>
              <path
                id="arrow-right"
                style="fill: rgb(78, 174, 66);"
                d="M10.4,4c6.9-4.2,15.9-2,20,4.9c3.1,5.2,2.8,11.7-0.9,16.5l-0.6-4.9l-1.3,0.2l0.9,6.8       l6.8-0.9l-0.2-1.3l-4.2,0.5c5.2-7,3.8-16.9-3.2-22.2c-5.1-3.8-12-4.2-17.5-1L10.4,4z"
              >
              </path>
            </g>
          </svg>
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
