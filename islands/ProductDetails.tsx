import Component, { loader } from "$store/components/product/ProductDetails.tsx";
import type { Props } from "$store/components/product/ProductDetails.tsx";

function Island(props: Props) {
    return <Component {...props} />;
}

export default Island;
export { loader };