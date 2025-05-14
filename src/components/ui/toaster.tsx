
import React from "react";
// Chakra UI handles toasts internally, so we don't need to create a separate provider
// This file exists just for compatibility with existing code

export function Toaster() {
  // This is now a no-op component since Chakra UI's toast system works differently
  return null;
}
