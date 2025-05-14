
import React from "react";
import { Divider, DividerProps } from "@chakra-ui/react";

interface SeparatorProps extends DividerProps {
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
