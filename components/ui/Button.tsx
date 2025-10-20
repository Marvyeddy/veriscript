import React, { ButtonHTMLAttributes, ReactNode } from "react";

const styles = {
  default: `bg-[#03B156] text-white`,
};

type ButtonProps = {
  variants: keyof typeof styles;
  children?: ReactNode;
  className?: string;
};

const Button = ({
  variants,
  children,
  className,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`${styles[variants]} py-[10px] px-[14px] rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
