
import React from "react";
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps
} from "@chakra-ui/react";

export interface InputProps extends Omit<ChakraInputProps, "size"> {
  size?: "default" | "sm" | "lg";
}

const sizeMapping: Record<string, string> = {
  default: "md",
  sm: "sm",
  lg: "lg",
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size = "default", ...props }, ref) => {
    const chakraSize = sizeMapping[size] || "md";
    
    return (
      <ChakraInput
        ref={ref}
        size={chakraSize}
        borderRadius="md"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
