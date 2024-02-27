export {
  default,
  loader,
} from "../../components/product/Gallery/ImageSlider.tsx";

export function LoadingFallback() {
  return (
    <div class="w-[90vw] sm:w-[40vw] h-[375px] sm:h-[645px] skeleton flex justify-center items-center mt-8" />
  );
}
