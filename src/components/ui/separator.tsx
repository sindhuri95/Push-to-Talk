
import React from "react";
import { Divider, DividerProps as ChakaraDividerProps } from "@chakra-ui/react";

interface SeparatorProps extends ChakaraDividerProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ orientation = "horizontal", decorative = true, ...props }, ref) => {
    return (
      <Divider
        ref={ref}
        orientation={orientation}
        aria-orientation={orientation}
        aria-hidden={decorative}
        {...props}
      />
    );
  }
);

Separator.displayName = "Separator";

export { Separator };
