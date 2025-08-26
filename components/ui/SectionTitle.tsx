import type { RichText } from "apps/admin/widgets.ts";

export interface Props {
  title: RichText;
  titleMob: RichText;
}

export default function SectionTitle({
  title,
  titleMob
}: Props) {

  return (
    <div class="max-w-[1210px] h-full flex items-center justify-end mx-auto">
      <div class="font-inter font-bold my-[70px] lg:my-[150px] mr-6 lg:mr-[50px]">
        <div class="hidden lg:block" dangerouslySetInnerHTML={{ __html: title }} />
        <div class="lg:hidden" dangerouslySetInnerHTML={{ __html: titleMob }} />   
      </div>
    </div>
  );
}
