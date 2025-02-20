import NewsletterForm from "$store/islands/NewsletterForm.tsx";

export interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionNewsLetter({ title, subtitle }: Props) {
  return (
    <div
      id="newsletter"
      class="bg-[#FBFBFB] text-[#555555] max-w-full flex items-center justify-center px-6 py-8"
    >
      <div class="w-full h-full bg-[#FBFBFB] items-center justify-center flex flex-col text-center">
        <NewsletterForm title={title} subtitle={subtitle} />
      </div>
    </div>
  );
}
