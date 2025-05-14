
import React from "react";
import { 
  Button as ChakraButton, 
  ButtonProps as ChakraButtonProps 
} from "@chakra-ui/react";

export interface ButtonProps extends Omit<ChakraButtonProps, "size"> {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const variantMapping: Record<string, string> = {
  default: "solid",
  destructive: "solid",
  outline: "outline",
  secondary: "ghost",
  ghost: "ghost",
  link: "link",
};

const sizeMapping: Record<string, string> = {
  default: "md",
  sm: "sm",
  lg: "lg",
  icon: "sm",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const chakraVariant = variantMapping[variant] || "solid";
    const chakraSize = sizeMapping[size] || "md";
    
    // Apply specific styles for destructive variant
    const colorScheme = variant === "destructive" ? "red" : "blue";
    
    return (
      <ChakraButton
        ref={ref}
        variant={chakraVariant}
        size={chakraSize}
        colorScheme={colorScheme}
        {...props}
      >
        {children}
      </ChakraButton>
    );
  }
);

Button.displayName = "Button";

export { Button };
