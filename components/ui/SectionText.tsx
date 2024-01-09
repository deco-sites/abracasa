import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: HTMLWidget;
  description: HTMLWidget;
}

export default function SectionNewsLetter({ title, description }: Props) {
  if (!title || !description) return null;

  return (
    <div class="max-w-[1320px] h-full flex items-center justify-center mx-auto">
      <div class="w-full h-ful text-center my-10 md:my-7 py-2 px-6">
        <div dangerouslySetInnerHTML={{ __html: title }} />

        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
}
