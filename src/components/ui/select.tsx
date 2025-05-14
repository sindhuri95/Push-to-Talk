
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

const SelectGroup = ({ children, ...props }: { children: React.ReactNode }) => {
  return <optgroup {...props}>{children}</optgroup>;
};

const SelectValue = (props: any) => null; // Not needed in Chakra UI

const SelectTrigger = (props: any) => null; // Not needed in Chakra UI

const SelectContent = (props: any) => null; // Not needed in Chakra UI

const SelectItem = ({ value, children, ...props }: { value: string, children: React.ReactNode }) => {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  );
};

const SelectLabel = (props: any) => null; // Not needed in Chakra UI

export { 
  Select, 
  SelectGroup, 
  SelectItem, 
  SelectValue, 
  SelectTrigger, 
  SelectContent, 
  SelectLabel 
};
