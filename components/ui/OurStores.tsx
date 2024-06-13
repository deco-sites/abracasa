import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: string;
  cards: {
    titleStore: string;
    linkWhatsapp: string;
    description: HTMLWidget;
  }[];
}

export default function OurStores({ cards }: Props) {
  return (
    <div class="max-w-[1190px] w-full h-full flex flex-col items-start mx-auto my-10 lg:my-16 px-8 lg:px-0">
      <div class="flex flex-col items-start gap-4 justify-start w-full h-full">
        <p class="text-4xl text-[#555555]">
          Nossas Lojas
        </p>

        <div class="grid sm:grid-cols-2 w-full h-full items-start justify-start gap-5">
          {cards?.map((card) => (
            <div class="w-full max-w-[500px] h-full flex flex-col">
              <div class="w-full h-full flex">
                <a
                  class="w-full h-full flex"
                  href={card.linkWhatsapp}
                >
                  <p class="text-start text-[#6D6E71] text-[13px] leading-[16px] font-bold pt-2 pr-1">
                    {card.titleStore}
                  </p>
                  <img
                    class="w-[30px] h-[30px] object-cover"
                    src="https://novaabracasa.vteximg.com.br/arquivos/logo_whatsapp.png?v=637278521548700000"
                    width={30}
                    height={30}
                    alt="Logo do Whatsapp"
                  />
                </a>
              </div>
              <div class="w-full h-full">
                <p
                  class="text-[#6D6E71] text-[13px] leading-[16px]"
                  dangerouslySetInnerHTML={{ __html: card.description }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
