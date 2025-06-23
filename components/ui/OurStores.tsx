import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: string;
  cards: {
    titleStore: string;
    linkWhatsapp: string;
    description: HTMLWidget;
    state: "RJ" | "SP";
  }[];
}

export default function OurStores({ title, cards }: Props) {
  const cardsRJ = cards.filter((card) => card.state === "RJ");
  const cardsSP = cards.filter((card) => card.state === "SP");

  return (
    <div class="max-w-[1190px] w-full mx-auto my-10 lg:my-16 px-8 lg:px-0">
      <p class="text-4xl text-[#555555] mb-6">{title}</p>

      <div class="flex flex-col lg:flex-row w-full gap-10">
        <div class="flex-1 flex flex-col gap-4">
          {cardsRJ.map((card) => (
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <a
                  href={card.linkWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center"
                >
                  <p class="text-start text-[#6D6E71] text-[13px] leading-[16px] font-bold">
                    {card.titleStore}
                  </p>
                  <img
                    src="https://novaabracasa.vteximg.com.br/arquivos/logo_whatsapp.png?v=637278521548700000"
                    width={20}
                    height={20}
                    alt="Logo do Whatsapp"
                    class="w-[20px] h-[20px] ml-1"
                  />
                </a>
              </div>
              <div>
                <p
                  class="text-[#6D6E71] text-[13px] leading-[16px]"
                  dangerouslySetInnerHTML={{ __html: card.description }}
                />
              </div>
            </div>
          ))}
        </div>

        <div class="flex-1 flex flex-col gap-4">
          {cardsSP.map((card) => (
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <a
                  href={card.linkWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center"
                >
                  <p class="text-start text-[#6D6E71] text-[13px] leading-[16px] font-bold">
                    {card.titleStore}
                  </p>
                  <img
                    src="https://novaabracasa.vteximg.com.br/arquivos/logo_whatsapp.png?v=637278521548700000"
                    width={20}
                    height={20}
                    alt="Logo do Whatsapp"
                    class="w-[20px] h-[20px] ml-1"
                  />
                </a>
              </div>
              <div>
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
