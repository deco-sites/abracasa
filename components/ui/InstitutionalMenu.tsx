import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";

export interface Props {
  cards?: {
    icon: AvailableIcons;
    description: string;
    link: string;
    title: string;
  }[];
}

export default function InstitutionalMenu(
  { cards, url }: ReturnType<typeof loader>,
) {
  return (
    <section class="w-full h-full flex items-center justify-center border-b border-solid border-[#8282829f]">
      <div class="max-w-[1617px] min-h-[205px] flex items-center justify-center">
        <div class="max-w-[100vw] overflow-auto scrollbar-none w-full h-full flex items-center gap-5 px-4">
          {cards?.map((card) => (
            <div
              class={`${
                card.link === url.pathname && "text-[#b9154c] border-[#b9154c]"
              } min-w-[180px] min-h-[93px] w-full h-full group flex items-center justify-center border border-solid text-sm border-[#8282829f] hover:text-[#b9154c] hover:border-[#b9154c]`}
            >
              <a
                href={card.link}
                class="w-full h-full flex items-center justify-center flex-col text-center"
              >
                <Icon
                  class={`${
                    card.link === url.pathname && "text-[#b9154c]"
                  } text-[#8282829f] group-hover:text-[#b9154c]`}
                  id={card.icon}
                  alt={card.description}
                  width={32}
                  height={32}
                  strokeWidth={0.01}
                />
                <span class="mt-2">
                  {card.title}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const loader = (props: Props, req: Request) => {
  const url = new URL(req.url);

  return {
    ...props,
    url,
  };
};
