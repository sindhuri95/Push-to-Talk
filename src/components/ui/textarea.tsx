
import React from "react";
import { Textarea as ChakraTextarea, TextareaProps as ChakraTextareaProps } from "@chakra-ui/react";

export interface TextareaProps extends ChakraTextareaProps {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <ChakraTextarea
        ref={ref}
        borderRadius="md"
        minH="80px"
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
