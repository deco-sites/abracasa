import type { HTMLWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: string;
  cards:{
    titleStore: string;
    linkWhatsapp: string;
    description: HTMLWidget;
    }[];
}

export default function OurStores({title, cards}: Props) {
  return (
    <div class="max-w-[1200px] h-full flex flex-col items-start mx-auto">
      <div class="h-full flex flex-col items-start justify-start w-full">
        <div class="w-full h-full">
          <p class="text-4xl text-[#555555] mt-10 m-2">
            Nossas Lojas
          </p>
        </div>
        <div class="w-full h-full grid grid-cols-2 items-start gap-2">
            {cards.map((card) => (
                    <div class="lg:min-w-[500px] max-w-[500px] h-full flex flex-col mx-auto">
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
                            <p class="text-[#6D6E71] text-[13px] leading-[16px]"  dangerouslySetInnerHTML={{ __html: card.description}}/>
                        </div>
                    </div>
                ))}
        </div>
      </div>
    </div>
  );
}
