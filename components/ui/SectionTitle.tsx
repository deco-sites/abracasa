import type { RichText } from "apps/admin/widgets.ts";

export interface Props {
  title: RichText;
  titleMob: RichText;
  button?: {
    buttonLink?: string;
    buttonText?: string;
  };
}

export default function SectionTitle({ title, titleMob, button }: Props) {
  return (
    <div class="max-w-[1210px] h-full flex justify-center mx-auto flex-col lg:mb-[105px] mb-[72px] px-6 lg:px-0 mt-[74px] lg:mt-[104px]">
      <div class="font-inter font-bold">
        <div
          class="hidden lg:block"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div class="lg:hidden" dangerouslySetInnerHTML={{ __html: titleMob }} />
      </div>
      <div class="flex lg:hidden justify-center lg:px-0 mt-[25px]">
        <a
          target="_self"
          rel="noopener noreferrer"
          href={button?.buttonLink ?? "#"}
          class={
            "text-[13px] flex justify-center items-center cursor-pointer bg-black uppercase rounded-none py-2 border-[1px] border-solid border-[#555555] text-center text-xs font-semibold w-full text-white max-w-[406px]"
          }
        >
          <span>{button?.buttonText}</span>
        </a>
      </div>
      <div class="hidden lg:flex justify-center lg:px-0 mt-[54px]">
        <a
          target="_self"
          rel="noopener noreferrer"
          href={button?.buttonLink ?? "#"}
          class={
            "hidden lg:flex text-[15px] justify-center items-center cursor-pointer bg-black uppercase rounded-none py-2 border-[1px] border-solid border-[#555555] text-center font-semibold w-full text-white max-w-[406px]"
          }
        >
          <span>{button?.buttonText}</span>
        </a>
      </div>
    </div>
  );
}
