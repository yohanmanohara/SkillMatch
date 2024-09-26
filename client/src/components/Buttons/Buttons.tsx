import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const base =
  "inline-flex items-center justify-center text-sm font-semibold transition-colors duration-300 ease-in-out whitespace-nowrap ring-offset-gray-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:border rounded-3xl ";

const buttonVariants = cva(base, {
  variants: {
    variant: {
      primary:
        "bg-primary-800 text-white hover:bg-white-0 hover:text-primary-800",
      primary_2:
        "bg-primary-800 text-white hover:bg-white-0 hover:text-primary-800",
      primary_3:
        "bg-primary-800 text-white hover:bg-white-0 hover:text-primary-800",
      primary_4:
      "bg-primary-800 text-white hover:bg-white-0 hover:text-primary-800",
      primary_5:
      "bg-primary-800 text-white hover:bg-white-0 hover:text-primary-800",
      primary_6:
      "bg-primary-800 text-white hover:bg-white-0 hover:text-primary-800",
      secondary:
        "bg-white-0 text-primary-800 border border-white hover:border hover:border-primary-800",
    },
    size: {
      small: "px-4 py-2",
      medium: "px-4 py-2",
      large: "px-8 py-4"
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

type ButtonProps = {
  variant: VariantProps<typeof buttonVariants>["variant"];
  size: VariantProps<typeof buttonVariants>["size"];
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ variant, size, className, children, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ className, variant, size })} {...props}>
      {children}
    </button>
  );
}

export default Button;
