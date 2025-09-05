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
    <div class="max-w-[1210px] h-full flex justify-start mx-auto flex-col mb-[72px] px-6 lg:px-0">  
      <div class="font-inter font-bold mt-[70px] lg:mt-[150px]">
        <div
          class="hidden lg:block"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div class="lg:hidden" dangerouslySetInnerHTML={{ __html: titleMob }} />
      </div>
      <div class="flex lg:hidden justify-start px-6 lg:px-0 mt-[77px]">
        <a
          target="_self"
          rel="noopener noreferrer"
          href={button?.buttonLink ?? "#"}
          class={
            "flex justify-center items-center btn bg-transparent uppercase rounded-none py-2 border-[1px] border-solid border-[#555555] text-center text-xs font-semibold w-full text-[#555555] max-w-[371px]"
          }
        >
          <span>{button?.buttonText}</span>
        </a>
      </div>
      <div class="hidden lg:flex justify-start px-6 lg:px-0 mt-[51px]">
        <a
          target="_self"
          rel="noopener noreferrer"
          href={button?.buttonLink ?? "#"}
          class={
            "hidden lg:flex justify-center items-center mt-[77px] btn bg-transparent uppercase rounded-none py-2 border-[1px] border-solid border-[#555555] text-center text-[17px] font-semibold w-full text-[#555555] max-w-[371px]"
          }
        >
          <span>{button?.buttonText}</span>
        </a>
      </div>
    </div>
  );
}
