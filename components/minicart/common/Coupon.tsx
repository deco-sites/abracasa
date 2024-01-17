import { useState } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";

export interface Props {
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ coupon, onAddCoupon }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <div class="flex justify-between items-center px-2 w-full">
      {!coupon
        ? (
          <form
            class="flex items-center justify-between gap-2 w-full h-full"
            onSubmit={async (e) => {
              e.preventDefault();
              const { currentTarget: { elements } } = e;

              const input = elements.namedItem("coupon") as HTMLInputElement;
              const text = input.value;

              if (!text) return;

              try {
                setLoading(true);
                const coupon = await onAddCoupon(text);
                console.log(coupon);
              } finally {
                setLoading(false);
              }
            }}
          >
            <div class="flex items-center justify-center gap-6 w-full h-[36px] max-w-[180px] border border-gray-200 bg-white rounded p-2">
              <input
                name="coupon"
                class="w-full focus:outline-none placeholder:text-sm placeholder:text-[#d5d5d5]"
                type="text"
                value={coupon ?? ""}
                placeholder={"Adicionar cupom"}
              />
            </div>

            <Button
              hasBtnClass={false}
              type="submit"
              htmlFor="coupon"
              loading={loading}
              class="flex items-center justify-center w-[75px] h-[36px] text-xs text-firebrick border border-firebrick hover:bg-[#73c650] hover:border-[#73c650] transition-colors duration-150 rounded px-2.5"
            >
              Adicionar
            </Button>
          </form>
        )
        : (
          <div class="flex items-center justify-between w-full pr-2 text-sm">
            <div class="flex items-center gap-2">
              <span>cupom</span>
              <span class="text-firebrick font-bold uppercase">{coupon}</span>
            </div>

            <Button
              hasBtnClass={false}
              loading={loading}
              class="hover:text-firebrick transition-colors duration-150 text-lg"
              onClick={async () => {
                await onAddCoupon("");
              }}
            >
              X
            </Button>
          </div>
        )}
    </div>
  );
}

export default Coupon;
