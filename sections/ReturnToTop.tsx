import { useEffect, useState, useCallback } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";

interface ReturnToTopProps {
  content?: string;
}   

export default function ReturnToTop ({ content }: ReturnToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const threshold = 1000;
    setIsVisible(globalThis.scrollY > threshold);
  }, []);

  useEffect(() => {
    globalThis.addEventListener("scroll", handleScroll);
    return () => globalThis.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!isVisible) return null;

  const scrollToTop = () => {
    globalThis.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <a
      href="#top"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      class={`
        fixed bottom-[80px] right-2.5 flex flex-col items-center gap-1 z-50
        transition-all duration-300
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
    >
      <div class="bg-white border-[1px] border-gray-600 text-gray-600 p-3 rounded-full shadow-lg transition">
        <Icon id="ChevronUp" width={24} height={24} />
      </div>

      <span class="text-sm text-gray-800">{content}</span>
    </a>
  );
}
