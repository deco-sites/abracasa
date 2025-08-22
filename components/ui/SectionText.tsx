import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  changeFontFamily?: boolean;
  changeFontWeight?: boolean;
  title: HTMLWidget;
  description: HTMLWidget;
}

export default function SectionNewsLetter({
  title,
  description,
  changeFontFamily,
  changeFontWeight,
}: Props) {
  if (!title || !description) return null;

  return (
    <div class={`max-w-[1240px] h-full flex items-center justify-center mx-auto ${changeFontWeight ? "mt-[85px] mb-[68px]" : ""}`}>
      <div
        class={`w-full h-full text-center ${
          changeFontFamily || changeFontWeight ? "font-inter" : "font-sans"
        } ${changeFontWeight ? "font-semibold" : "font-extralight"} ${
          changeFontFamily
            ? "mx-6 p-0 mt-[74px] mb-0 lg:mt-[134px] lg:mb-[14px] tracking-[1px]"
            : "my-10 md:my-7 py-2 px-6"
        }`}
      >
        <div class={`${changeFontWeight ? "mb-5" : ""}`} dangerouslySetInnerHTML={{ __html: title }} />

        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}
