
import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const LanguageSelector = ({ value, onChange, label }: LanguageSelectorProps) => {
  // List of common languages with their ISO codes
  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "zh", name: "Chinese" },
    { code: "fr", name: "French" },
    { code: "vi", name: "Vietnamese" },
    { code: "ar", name: "Arabic" },
    { code: "ru", name: "Russian" },
    { code: "ko", name: "Korean" },
    { code: "de", name: "German" },
    { code: "hi", name: "Hindi" },
    { code: "pt", name: "Portuguese" },
    { code: "it", name: "Italian" },
    { code: "ja", name: "Japanese" },
    { code: "fa", name: "Persian" },
    { code: "ur", name: "Urdu" }
  ];

  return (
    <FormControl mb={2}>
      <FormLabel fontSize="sm" fontWeight="medium">
        {label}
      </FormLabel>
      <Select
        id={`${label.toLowerCase().replace(/\s/g, '-')}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        bg="white"
        borderColor="healthcare.primary"
        _hover={{ borderColor: "healthcare.dark" }}
      >
        <option value="" disabled>Select language</option>
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
