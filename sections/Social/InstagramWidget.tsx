export interface Props {
  appId: string;
  title: string;
  /**
   * @format html
   */
  subtitle?: string;
}

export default function InstagramWidget({ appId, title, subtitle }: Props) {
  if (!appId) return null;

  return (
    <div class="flex flex-col container pt-8 pb-12">
      <div class="flex flex-col gap-2 items-center justify-center text-center pb-8">
        <h1 class="text-[#555] leading-[49px] text-xl lg:text-4xl font-normal">
          {title}
        </h1>
        {subtitle && (
          <div class="pt-1" dangerouslySetInnerHTML={{ __html: subtitle }} />
        )}
      </div>

      <script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        defer
      />

      <div class={appId} data-elfsight-app-lazy />
    </div>
  );
}
