export interface Props {
  productID?: string;
}

export default function QuickReview({ productID }: Props) {
  if (!productID) return null;

  return <div class="konfidency-reviews-summary" data-sku={productID}></div>;
}
