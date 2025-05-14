
import React from "react";
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormLabel,
  FormControl
} from "@chakra-ui/react";

interface SelectProps extends ChakraSelectProps {
  placeholder?: string;
  label?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ placeholder, label, children, ...props }, ref) => {
    return (
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        <ChakraSelect ref={ref} placeholder={placeholder} {...props}>
          {children}
        </ChakraSelect>
      </FormControl>
    );
  }
);

Select.displayName = "Select";

const SelectGroup = ({ children, ...props }: { children: React.ReactNode }) => {
  return <optgroup {...props}>{children}</optgroup>;
};

const SelectItem = ({ value, children, ...props }: { value: string, children: React.ReactNode }) => {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
};

// These components are not needed for Chakra UI but kept for compatibility
const SelectValue = (props: any) => null;
const SelectTrigger = (props: any) => null;
const SelectContent = (props: any) => null;
const SelectLabel = (props: any) => null;

export { 
  Select, 
  SelectGroup, 
  SelectItem, 
  SelectValue, 
  SelectTrigger, 
  SelectContent, 
  SelectLabel 
};
