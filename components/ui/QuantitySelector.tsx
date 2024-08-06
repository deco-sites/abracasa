import Button from "../ui/Button.tsx";
import { useSignal } from "@preact/signals";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled, loading }: Props) {
  const appearMessage = useSignal(false);

  const decrement = () => {
    onChange?.(Math.max(0, quantity - 1));
    appearMessage.value = true;
    setTimeout(() => appearMessage.value = false, 5000);
  };

  const increment = () => {
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));
    appearMessage.value = true;
    setTimeout(() => appearMessage.value = false, 5000);
  };

  return (
    <>
      <div class="join border rounded-none w-min max-w-[104px] max-h-[34px]">
        <Button
          hasBtnClass={false}
          class="btn-ghost join-item w-[32px] h-[34px] font-semibold"
          onClick={decrement}
          disabled={disabled}
          loading={loading}
        >
          -
        </Button>
        <input
          class="font-bold text-center join-item [appearance:textfield] w-[28px] max-h-[34px]"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          max={QUANTITY_MAX_VALUE}
          min={1}
          value={quantity}
          disabled={disabled}
          onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
          maxLength={3}
          size={3}
        />
        <Button
          hasBtnClass={false}
          class="btn-ghost join-item w-[32px] h-[34px] font-semibold"
          onClick={increment}
          disabled={disabled}
          loading={loading}
        >
          +
        </Button>
      </div>

      <div
        class={`${
          appearMessage.value ? "visible opacity-100" : "invisible opacity-0"
        } text-sm items-center justify-center absolute left-1/2 -translate-x-1/2 text-center bg-[#555] text-white py-2 px-4 transition-opacity duration-500 pointer-events-none`}
      >
        O valor do frete foi alterado
      </div>
    </>
  );
}

export default QuantitySelector;
