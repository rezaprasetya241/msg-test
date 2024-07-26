import { useEffect, useRef } from "react";

interface Props {
  disabled?: boolean;
  value?: string | number;
}
const CurrencyInput = ({ disabled, value }: Props) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleFocus = () => {
      if (parentRef.current) {
        parentRef.current.classList.add("focus-within");
      }
    };

    const handleBlur = () => {
      if (parentRef.current) {
        parentRef.current.classList.remove("focus-within");
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("focus", handleFocus);
      inputElement.addEventListener("blur", handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("focus", handleFocus);
        inputElement.removeEventListener("blur", handleBlur);
      }
    };
  }, []);
  return (
    <div
      ref={parentRef}
      className="flex items-center border border-input bg-transparent rounded-md h-9 overflow-hidden focus-within:outline-none focus-within:ring-1 focus-within:ring-main disabled:cursor-not-allowed "
    >
      <span className="bg-gray-200 px-3 py-2 text-gray-700">Rp.</span>
      <input
        ref={inputRef}
        type="text"
        disabled={disabled}
        value={value}
        // onChange={onChange}
        className="flex-1 px-3 py-2 outline-none text-sm transition-colors file:border-0 file:bg-transparent placeholder:text-muted-foreground"
        placeholder="0"
      />
    </div>
  );
};

export default CurrencyInput;
