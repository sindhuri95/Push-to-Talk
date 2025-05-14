
import React from "react";
import {
  Checkbox as ChakraCheckbox,
  CheckboxProps as ChakraCheckboxProps
} from "@chakra-ui/react";

interface CheckboxProps extends ChakraCheckboxProps {
  // Any additional props we need to handle
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ children, ...props }, ref) => {
    return (
      <ChakraCheckbox ref={ref} {...props}>
        {children}
      </ChakraCheckbox>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
