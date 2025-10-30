import { ProductDetailsPage } from "apps/commerce/types.ts";
import Seo, { Props as SeoProps } from "./Seo.tsx";
import { canonicalFromBreadcrumblist } from "apps/commerce/utils/canonical.ts";

export type Props = {
    jsonLD: ProductDetailsPage | null;
    omitVariants?: boolean;
} & Partial<Omit<SeoProps, "jsonLDs">>;

function Section({ jsonLD, omitVariants, ...props }: Props) {
    const title = jsonLD?.seo?.title;
    const description = jsonLD?.seo?.description;
    const image = jsonLD?.product.image?.[0]?.url;
    const canonical = jsonLD?.seo?.canonical
        ? jsonLD.seo.canonical
        : jsonLD?.breadcrumbList
        ? canonicalFromBreadcrumblist(jsonLD?.breadcrumbList)
        : undefined;
    const noIndexing = props.noIndexing || !jsonLD || jsonLD.seo?.noIndexing;

    if (omitVariants && jsonLD?.product.isVariantOf?.hasVariant) {
        jsonLD.product.isVariantOf.hasVariant = [];
    }

    return (
        <Seo
            {...props}
            title={title || props.title}
            description={description || props.description}
            image={image || props.image}
            canonical={props.canonical || canonical}
            jsonLDs={[jsonLD]}
            noIndexing={noIndexing}
        />
    );
}

export default Section;