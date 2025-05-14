
import React from "react";
import {
  Box,
  BoxProps,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";

const Card = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => (
    <Box
      ref={ref}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      boxShadow="sm"
      {...props}
    >
      {children}
    </Box>
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => (
    <Box ref={ref} p={6} {...props}>
      {children}
    </Box>
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, any>(
  ({ children, ...props }, ref) => (
    <Heading ref={ref} size="md" fontWeight="semibold" mb={1} {...props}>
      {children}
    </Heading>
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, any>(
  ({ children, ...props }, ref) => (
    <Text ref={ref} color="gray.600" fontSize="sm" {...props}>
      {children}
    </Text>
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => (
    <Box ref={ref} p={6} pt={0} {...props}>
      {children}
    </Box>
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => (
    <Flex ref={ref} p={6} pt={0} alignItems="center" {...props}>
      {children}
    </Flex>
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
