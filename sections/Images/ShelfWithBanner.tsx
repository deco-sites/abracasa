import { type LoaderReturnType } from "@deco/deco";
import { Product } from "apps/commerce/types.ts";
import ProductShelf from "deco-sites/abracasa/sections/Product/ProductShelf.tsx";
import { Props as ProductShelfProps } from "../../components/product/ProductShelf.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface Props extends Omit<ProductShelfProps, "products"> {
  products: LoaderReturnType<Product[] | null>;
  bannerImage: BannerImage;
  shelfBannerTitle?: string;
}

interface BannerImage {
  image: {
    src: ImageWidget;
    alt: string;
    width?: number;
    height?: number;
  };
}

function ShelfWithBanner({
  bannerImage,
  shelfBannerTitle,
  products,
  description,
  layout,
  cardLayout,
}: Props) {
  return (
    <div class="flex flex-col w-full container lg:max-w-[85%] pt-5 lg:pt-[82px] pb-10 lg:pb-[126px] px-5 lg:px-0">
      <h1 class="text-[#555555]  text-2xl font-sans font-normal mb-[14px]">
        {shelfBannerTitle}
      </h1>
      <div class="flex gap-4">
        <Image
          src={bannerImage.image.src}
          alt={bannerImage.image.alt}
          width={bannerImage.image.width ?? 410}
          height={bannerImage.image.height ?? 462}
          loading="lazy"
          decoding="async"
          class="hidden lg:block"
        />
        <ProductShelf
          products={products}
          description={description}
          layout={layout}
          cardLayout={cardLayout}
          shelfWithBanner={true}
          bannerImage={bannerImage}
        />
      </div>
    </div>
  );
}

export default ShelfWithBanner;
