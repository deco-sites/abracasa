export {
  default,
  loader,
} from "../../components/product/Gallery/ImageSlider.tsx";

export function LoadingFallback() {
  return (
    <div class="w-full lg:w-[800px] lg:h-[645px] skeleton flex justify-center items-center mt-8" />
  );
}
