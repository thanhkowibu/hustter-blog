import { useRef } from "react";
import { Textarea } from "./ui/textarea";

const TextArea = ({
  val,
  setVal,
  isLearning,
  placeholder,
}: {
  val: string;
  setVal: (e: any) => void;
  isLearning: boolean;
  placeholder?: string;
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = (e: any) => {
    setVal(e.target.value);
  };

  return (
    <div className="h-full overflow-y-scroll rounded-lg border-border-hust border-2 hide-scrollbar">
      {/* <span>Input text</span> */}
      <Textarea
        className="bg-foreground-hust h-full text-justify text-copy-light leading-7 tracking-wider resize-none cursor-auto"
        placeholder={
          placeholder
            ? placeholder
            : "Nhập đoạn văn mà bạn muốn học thuộc! (Chỉ nên nhập từng đoạn một đừng nhập cả câu éo học nổi đâu)"
        }
        value={val}
        onChange={handleChange}
        disabled={isLearning}
        ref={textAreaRef}
      ></Textarea>
    </div>
  );
};
export default TextArea;
