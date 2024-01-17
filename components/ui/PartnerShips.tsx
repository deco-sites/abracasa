import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  title: string;
  description: string;
  subTitle: string;
  socialMedia: {
    Image: ImageWidget;
    diretionalLink: string;
    titleImage: string;
    descriptionImage: string;
  }[];
}

export default function PartnerShips(
  { title, description, subTitle, socialMedia }: Props,
) {
  return (
    <section class="flex flex-col container lg:max-w-[80%] h-full pt-2 pb-12 px-4 lg:px-0">
      <div class="w-full h-full flex flex-col items-center justify-center text-center">
        <div class="w-full h-full my-2">
          <h1 class="text-4xl leading-[49px] text-[#555555] my-0">
            Parcerias
          </h1>
        </div>
        <div class="w-full h-full">
          <p class="text-lg leading-[25px] text-[#828282] mb-6">
            Confira o conteúdo dos nossos parceiros direto do nosso insta.
          </p>
        </div>
        <div class="w-[30%] h-full mt-6 mb-2 border-b border-solid border-[#828282]">
          {/* borda */}
        </div>
        <div class="w-full h-full my-2">
          <h2 class="text-4xl leading-[49px] text-[#555555]">
            Siga a Abra Casa
          </h2>
        </div>
        <div class="w-full h-full flex items-center justify-center mt-2 gap-5">
          {socialMedia.map((item) => (
            <a
              href={item.diretionalLink}
              title={item.titleImage}
              target="_blank"
            >
              <img
                src={item.Image}
                alt={item.descriptionImage}
                width={32}
                height={32}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
