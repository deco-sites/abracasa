import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  changeFontFamily?: boolean;
  title: HTMLWidget;
  description: HTMLWidget;
}

export default function SectionNewsLetter({
  title,
  description,
  changeFontFamily,
}: Props) {
  if (!title || !description) return null;

  return (
    <div class="max-w-[1240px] h-full flex items-center justify-center mx-auto">
      <div
        class={`w-full h-ful text-center ${
          changeFontFamily
            ? "font-inter font-extralight mx-6 p-0 mt-[74px] mb-0 lg:mt-[134px] lg:mb-[14px] tracking-[1px]"
            : "font-sans my-10 md:my-7 py-2 px-6"
        }`}
      >
        <div dangerouslySetInnerHTML={{ __html: title }} />

        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}
