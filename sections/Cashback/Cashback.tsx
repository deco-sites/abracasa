import type { HTMLWidget } from "apps/admin/widgets.ts";
import { type Section } from "@deco/deco/blocks";
export interface StatProps {
    items: Array<{
        label: string;
        title: string;
        subtitle: string;
    }>;
    align: "start" | "center";
}
export interface Props {
    title?: HTMLWidget;
    /**
     * @title Background
     * @format color
     * @default #049091
     */
    bgColor?: string;
    stats?: StatProps;
    sections: Section[];
    faq?: {
        title?: string;
        subtitle?: string;
        "q&a"?: Array<{
            question: string;
            answer: string;
        }>;
    };
}
function Stat({ items, align }: StatProps) {
    return (<div class="stats stats-vertical lg:stats-horizontal shadow">
      {items?.map((item) => (<div class={`stat ${align === "center" ? "place-items-center" : "place-items-start"}`}>
          <div class="stat-title">{item.label}</div>
          <div class="stat-value">{item.title}</div>
          <div class="stat-desc">{item.subtitle}</div>
        </div>))}
    </div>);
}
function FAQ({ faq }: Pick<Props, "faq">) {
    if (!faq || faq["q&a"] && faq["q&a"].length == 0)
        return null;
    return (<div class="py-2">
      <div class="bg-white p-4 rounded-lg shadow-xl py-8 mt-12">
        {faq && (<h4 class="text-4xl font-bold text-gray-800 tracking-widest uppercase text-center">
            {faq.title}
          </h4>)}

        {faq.subtitle && (<p class="text-center text-gray-600 text-sm mt-2">
            {faq.subtitle}
          </p>)}

        <div class="space-y-12 px-2 xl:px-16 mt-12">
          {faq["q&a"]?.map((item) => (<div class="mt-4 flex">
              <div>
                <div class="flex items-center h-16 border-l-4 border-blue-600">
                  <span class="text-4xl text-blue-600 px-4">Q.</span>
                </div>
                <div class="flex items-center h-16 border-l-4 border-gray-400">
                  <span class="text-4xl text-gray-400 px-4">A.</span>
                </div>
              </div>
              <div>
                <div class="flex items-center h-16">
                  <span class="text-lg text-blue-600 font-bold">
                    {item.question}
                  </span>
                </div>
                <div class="flex items-center py-2">
                  <span class="text-gray-500">
                    {item.answer}
                  </span>
                </div>
              </div>
            </div>))}
        </div>
      </div>
    </div>);
}
export default function Cashback({ title, bgColor, stats, sections, faq }: Props) {
    return (<div class="flex flex-col max-w-[1180px] mx-auto gap-2">
      <div style={{ background: bgColor }} class="flex flex-col w-full gap-3 py-10 px-6">
        {title && <div dangerouslySetInnerHTML={{ __html: title }}/>}

        {stats && <Stat items={stats.items} align={stats.align}/>}

        <div class="flex flex-col items-center justify-center gap-6 bg-white rounded-xl w-full max-w-[95%] p-4 mx-auto">
          {sections?.map((section, index) => {
            const { Component, props } = section;
            return <Component key={index} {...props}/>;
        })}
        </div>
      </div>

      {faq && <FAQ faq={faq}/>}
    </div>);
}
