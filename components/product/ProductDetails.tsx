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
      class="tabs tabs-bordered max-w-[1200px] mx-auto px-4 lg:px-0 mt-6"
    >
      <input
        type="radio"
        name="my_tabs_1"
        role="tab"
        class="tab checked:text-firebrick"
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
        class="tab checked:text-firebrick"
        aria-label="Dimensões"
      />
      <div role="tabpanel" class="tab-content pt-6">
        Detalhamentos de dimensões
      </div>
    </div>
  );
}
