// This file can be simplified since we're using Chakra UI's styling system
// We'll keep a minimal utility here for any non-Chakra specific functions we might need

export function cn(...inputs: any[]): string {
  // This function is a simplified version of the former tailwind cn utility
  // With Chakra UI, we typically won't need this anymore
  return inputs.filter(Boolean).join(" ");
}
