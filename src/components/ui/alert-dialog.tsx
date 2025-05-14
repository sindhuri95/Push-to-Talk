
import * as React from "react"
import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button
} from "@chakra-ui/react"

interface AlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AlertDialog = ({isOpen, onClose, children}: AlertDialogProps) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          {children}
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  )
}

const AlertDialogTrigger = ({children, ...props}: React.ComponentProps<typeof Button>) => {
  return <Button {...props}>{children}</Button>
}

const AlertDialogHeader = ({children, ...props}: React.ComponentProps<typeof AlertDialogHeader>) => {
  return <AlertDialogHeader {...props}>{children}</AlertDialogHeader>
}

const AlertDialogFooter = ({children, ...props}: React.ComponentProps<typeof AlertDialogFooter>) => {
  return <AlertDialogFooter {...props}>{children}</AlertDialogFooter>
}

const AlertDialogTitle = ({children, ...props}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className="text-lg font-semibold" {...props}>{children}</div>
}

const AlertDialogDescription = ({children, ...props}: React.HTMLAttributes<HTMLDivElement>) => {
  return <AlertDialogBody {...props}>{children}</AlertDialogBody>
}

const AlertDialogAction = ({children, ...props}: React.ComponentProps<typeof Button>) => {
  return <Button colorScheme="blue" ml={3} {...props}>{children}</Button>
}

const AlertDialogCancel = ({children, ...props}: React.ComponentProps<typeof Button>) => {
  return <Button variant="outline" {...props}>{children}</Button>
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
