/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "active": "bg-neutral-focus text-neutral-content ring-neutral-focus ",
  "disabled": "bg-neutral-content text-neutral",
  "default": "bg-base-100 text-black",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "bg-[#212121] text-white font-bold",
  disabled:
    `relative after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-red-800 after:w-full after:block after:-rotate-45 after:content-[""]`,
  default:
    "border border-base-200 hover:bg-[#212121] hover:text-white hover:font-bold",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <div class="avatar placeholder text-xs">
      <div
        class={`rounded-[2px] w-16 h-8 ${colors[content] ?? colors[variant]} ${
          variants[variant]
        }`}
      >
        <span class="lowercase truncate">
          {colors[content] ? "" : content}
        </span>
      </div>
    </div>
  );
}

export default Avatar;
