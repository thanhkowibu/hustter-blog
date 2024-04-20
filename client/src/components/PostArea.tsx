import { useEffect, useRef } from "react";

const TextArea = ({
  val,
  placeholder,
}: {
  val: string;
  placeholder?: string;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [val]);

  return (
    <div className="bg-transparent rounded flex flex-col space-y-2">
      {/* <span>Input text</span> */}
      <textarea
        className="bg-transparent hide-scrollbar text-justify text-copy-light indent-4 leading-8 text-lg outline-none resize-none cursor-auto "
        placeholder={placeholder ? placeholder : "Insert text here"}
        value={val}
        rows={2}
        disabled={true}
        ref={textAreaRef}
      ></textarea>
    </div>
  );
};
export default TextArea;
