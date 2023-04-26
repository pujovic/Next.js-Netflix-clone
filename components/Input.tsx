import React from "react";

interface Props {
  id: string;
  onChange: any;
  onBlur: any;
  value: string;
  label: string;
  type?: string;
  error: boolean;
}

function Input({ id, onChange, onBlur, value, label, type, error }: Props) {
  return (
    <div className="relative">
      <input
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        type={type}
        id={id}
        className={`${error && "bg-[#a74c4c]"}
        block
        rounded-md
        mt-4
        px-6
        pt-6
        pb-1
        w-full
        text-md
      text-white
      bg-neutral-700
        appearance-none
        focus:outline-none
        focus:ring-0
        peer
        invalid:border-b-1`}
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="
        absolute 
        text-md
      text-zinc-400
        duration-150 
        transform 
        -translate-y-3 
        scale-75 
        top-7 
        z-10 
        origin-[0] 
        left-6
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75
        peer-focus:-translate-y-3
      "
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
