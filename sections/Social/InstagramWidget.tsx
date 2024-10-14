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
    <div class="flex flex-col container lg:max-w-[80%] pt-8 pb-12 px-4 lg:px-0">
      <div class="flex flex-col gap-2 items-center justify-center text-center pb-8">
        <h1 class="text-primary leading-[30px] lg:leading-[49px] text-[22px] lg:text-4xl font-normal">
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
