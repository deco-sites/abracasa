interface Props {
  /**
   * @format rich-text
   */
  text?: string;
  /** @format color */
  backgroundColor?: string;
}

function Topbar({ text, backgroundColor }: Props) {
  return (
    <div
      class="flex items-center justify-center py-2"
      style={{ backgroundColor: backgroundColor }}
    >
      {text && <span dangerouslySetInnerHTML={{ __html: text }} />}
    </div>
  );
}

export default Topbar;
