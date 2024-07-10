export interface Props {
  /**
   * @format rich-text
   */
  html?: string;
}

export default function HTMLContent({ html }: Props) {
  if (!html) return null;

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
