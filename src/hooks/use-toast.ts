
import { useToast as useChakraToast } from "@chakra-ui/toast";

export type ToastProps = {
  id?: string;
  title?: string;
  description?: string;
  status?: "info" | "warning" | "success" | "error";
  duration?: number;
  isClosable?: boolean;
  position?: "top" | "top-right" | "top-left" | "bottom" | "bottom-right" | "bottom-left";
  action?: React.ReactNode;
};

export function useToast() {
  const chakraToast = useChakraToast();
  
  const toast = ({ 
    title, 
    description, 
    status = "info", 
    duration = 5000, 
    isClosable = true, 
    position = "bottom",
    ...props
  }: ToastProps) => {
    return chakraToast({
      title,
      description,
      status,
      duration,
      isClosable,
      position,
      ...props
    });
  };
  
  return {
    toast,
    toasts: [] // Empty array to maintain compatibility with previous usage if needed
  };
}
