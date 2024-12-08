import NewsletterForm from "$store/islands/NewsletterForm.tsx";

export interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionNewsLetter({ title, subtitle }: Props) {
  return (
    <div id="newsletter" class="bg-[#B9154C] text-white max-w-full flex items-center justify-center">
      <div class="w-full h-full bg-[#B9154C] items-center justify-center flex flex-col text-center my-1 py-1 px-6">
        <NewsletterForm title={title} subtitle={subtitle} />
      </div>
    </div>
  );
}
