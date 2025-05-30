import SellbieIcon from "$store/components/ui/SellbieIcon.tsx";
import SellbieGrayIcon from "$store/components/ui/SellbieGrayIcon.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUser } from "apps/vtex/hooks/useUser.ts";
import { invoke } from "$store/runtime.ts";
import { useSignal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import type { CashbackAPIResponse } from "$store/loaders/sellbie/get-cashback.ts";

function NotLoggedIn() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    const header = document.getElementById("nav");

    if (header) {
      let previousValue = header.getAttribute("data-scrolling");

      const observerCallback: MutationCallback = (
        mutationsList: MutationRecord[],
      ) => {
        // deno-lint-ignore prefer-const
        for (let mutation of mutationsList) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "data-scrolling"
          ) {
            const currentValue = header.getAttribute("data-scrolling");

            if (currentValue !== previousValue) {
              setIsScrolling(currentValue === "true");
              previousValue = currentValue;
            }
          }
        }
      };

      const headerHome = header.getAttribute("data-ishome");
      setIsHome(headerHome === "true");

      const observer = new MutationObserver(observerCallback);
      observer.observe(header, { attributes: true });

      const handleMouseOver = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      header.addEventListener("mouseover", handleMouseOver);
      header.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        observer.disconnect();
        header.removeEventListener("mouseover", handleMouseOver);
        header.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className="dropdown dropdown-hover">
      <div
        tabIndex={0}
        role="button"
        className="p-0.5 m-1"
      >
        <a href="/user-login" className="w-10 h-10">
          {!isHome || isHovered || isScrolling
            ? <SellbieGrayIcon />
            : <SellbieIcon />}
        </a>
      </div>

      <div
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-60 -translate-x-1/2 left-1/2"
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

      const cashbackValue = await invoke["site"].loaders.sellbie
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
