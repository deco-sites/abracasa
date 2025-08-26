export interface Props {
  title: string;
  subTitle: string;
  description: string;
  /**
   * @format color
   **/
  backgroundColor?: string;
  button?: {
    title?: string;
    link?: string;
  };
}

export default function SectionTitle({
  title,
  subTitle,
  description,
  button,
  backgroundColor,
}: Props) {
  return (
    <div class="max-w-[1300px] w-full h-full flex items-center justify-start mx-auto xl:pl-0 pr-5 pl-5">
      <div
        class="font-inter pt-52 pb-20 lg:py-[6.5rem] px-10 lg:px-14 text-white mb-[70px] lg:mb-[150px] w-full h-full"
        style={{ backgroundColor }}
      >
        <div
          class="lg:text-[32px] tracking-widest mb-[14px] text-[28px] font-thin"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          class="lg:text-[32px] tracking-widest text-[28px] font-bold"
          dangerouslySetInnerHTML={{ __html: subTitle }}
        />
        <div
          class="lg:text-[18px] mb-8 tracking-widest text-[16px] font-thin"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {button?.title && button?.link && (
          <a href={button.link}>
            <button class="border-2 min-w-[150px] border-white font-light text-[12px] lg:text-[14px] py-2 px-2 bg-transparent max-w-[120px] w-full">
              {button.title}
            </button>
          </a>
        )}
      </div>
    </div>
  );
}
