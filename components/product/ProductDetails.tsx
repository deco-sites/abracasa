import { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  if (!page) return null;

  const description = page?.product?.description ||
    page?.product?.isVariantOf?.description;

  return (
    <div
      role="tablist"
      class="hidden lg:tabs tabs-bordered max-w-[1200px] mx-auto px-4 lg:px-0 mt-6"
    >
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        class="tab min-w-[300px] checked:text-firebrick"
        aria-label="Sobre"
        checked
      />
      <div role="tabpanel" class="tab-content pt-6">
        <div
          dangerouslySetInnerHTML={{
            __html: description?.replace(/\r?\n/g, "<br />") || "",
          }}
        />
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        class="tab min-w-[300px] checked:text-firebrick"
        aria-label="Dimensões e detalhes"
      />
      <div role="tabpanel" class="tab-content pt-6">
        Detalhamentos de dimensões
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        class="tab min-w-[300px] checked:text-firebrick"
        aria-label="Avaliações"
      />
      <div role="tabpanel" class="tab-content pt-6">
        Avaliações
      </div>

      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        class="tab min-w-[300px] checked:text-firebrick"
        aria-label="Assista o vídeo"
      />
      <div role="tabpanel" class="tab-content pt-6">
        Assista o Vídeo
      </div>
    </div>
  );
}
