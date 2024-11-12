import { type Section } from "@deco/deco/blocks";
import { context } from "@deco/deco";
interface Props {
    children?: Section;
}
function Placeholder() {
    return (<div class="rounded h-48 grid place-content-center w-full bg-base-100 text-base-300 text-sm">
      Content
    </div>);
}
function Container({ children }: Props) {
    if (!context.isDeploy && typeof children?.Component !== "function") {
        return (<div class="bg-primary bg-opacity-5 p-4">
        <Container children={{ Component: Placeholder, props: {} }}/>
      </div>);
    }
    if (!children) {
        return null;
    }
    return (<div class="container lg:max-w-[86%] xl:max-w-[85%]">
      <children.Component {...children.props}/>
    </div>);
}
export default Container;
