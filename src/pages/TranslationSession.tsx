
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Flag, SquareX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const TranslationSession = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [doctorTranscriptions, setDoctorTranscriptions] = useState<{ source: string; target: string }[]>([]);
  const [patientTranscriptions, setPatientTranscriptions] = useState<{ source: string; target: string }[]>([]);
  const [isSpeaker, setIsSpeaker] = useState<"doctor" | "patient">("doctor");

  // These would be passed from the previous page
  const sourceLanguage = new URLSearchParams(window.location.search).get('source') || "en";
  const targetLanguage = new URLSearchParams(window.location.search).get('target') || "es";

  // Get language names for display
  const getLanguageName = (code: string): string => {
    const languages: Record<string, string> = {
      "en": "English",
      "es": "Spanish",
      "fr": "French",
      "zh": "Chinese",
      "ar": "Arabic",
      "ru": "Russian",
      "de": "German",
      "ja": "Japanese",
      "pt": "Portuguese",
      "hi": "Hindi",
      "ko": "Korean",
      "vi": "Vietnamese",
      "it": "Italian",
      "fa": "Persian",
      "ur": "Urdu"
    };
    return languages[code] || code;
  };

  const getFlagEmoji = (countryCode: string): string => {
    // Simple mapping of language codes to country codes for flag emojis
    const countryMapping: Record<string, string> = {
      "en": "GB", // English - United Kingdom
      "es": "ES", // Spanish - Spain
      "fr": "FR", // French - France
      "zh": "CN", // Chinese - China
      "ar": "SA", // Arabic - Saudi Arabia
      "ru": "RU", // Russian - Russia
      "de": "DE", // German - Germany
      "ja": "JP", // Japanese - Japan
      "pt": "PT", // Portuguese - Portugal
      "hi": "IN", // Hindi - India
      "ko": "KR", // Korean - South Korea
      "vi": "VN", // Vietnamese - Vietnam
      "it": "IT", // Italian - Italy
      "fa": "IR", // Persian - Iran
      "ur": "PK", // Urdu - Pakistan
    };
    
    // Convert country code to emoji flag
    const country = countryMapping[countryCode] || countryCode.toUpperCase();
    return country
      .split('')
      .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
      .join('');
  };

  const toggleListening = () => {
    // In a real implementation, this would activate the microphone and begin speech recognition
    setIsListening(prev => !prev);
    
    // Simulate transcription after a short delay when listening starts
    if (!isListening) {
      toast({
        title: `Now listening for ${isSpeaker === "doctor" ? "doctor" : "patient"} speech`,
        description: `Speak now in ${getLanguageName(sourceLanguage)}`,
      });
      
      // Simulate receiving transcription
      setTimeout(() => {
        const newTranscription = {
          source: isSpeaker === "doctor" 
            ? "Hello, how have you been feeling this past week?" 
            : "Me he sentido un poco mejor, pero todavía tengo dolor.",
          target: isSpeaker === "doctor" 
            ? "Hola, ¿cómo te has sentido esta última semana?" 
            : "I've been feeling a bit better, but I still have pain."
        };
        
        if (isSpeaker === "doctor") {
          setDoctorTranscriptions(prev => [...prev, newTranscription]);
        } else {
          setPatientTranscriptions(prev => [...prev, newTranscription]);
        }
        
        setIsListening(false);
      }, 3000);
    }
  };

  const switchSpeaker = () => {
    setIsSpeaker(prev => prev === "doctor" ? "patient" : "doctor");
    toast({
      title: `Switched to ${isSpeaker === "doctor" ? "patient" : "doctor"} mode`,
      description: `Now recording for ${isSpeaker === "doctor" ? "patient" : "doctor"}`,
    });
  };

  const endSession = () => {
    // Ask for confirmation before ending session
    if (window.confirm("Are you sure you want to end this translation session?")) {
      toast({
        title: "Session ended",
        description: "Translation session has been completed.",
      });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-healthcare-light to-white">
      {/* Header with languages and flags */}
      <header className="w-full py-4 px-6 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-healthcare-dark">Curalingo</h1>
            <span className="text-sm px-3 py-1 bg-healthcare-light rounded-full">Live Session</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-lg mr-2">{getFlagEmoji(sourceLanguage)}</span>
              <span className="font-medium">{getLanguageName(sourceLanguage)}</span>
            </div>
            <span className="text-gray-400">→</span>
            <div className="flex items-center">
              <span className="text-lg mr-2">{getFlagEmoji(targetLanguage)}</span>
              <span className="font-medium">{getLanguageName(targetLanguage)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 flex flex-col">
        {/* Current speaker indicator */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full ${isSpeaker === "doctor" ? "bg-healthcare-primary text-white" : ""}`}
              onClick={() => setIsSpeaker("doctor")}
            >
              Doctor
            </Button>
            <span className="mx-2">|</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`rounded-full ${isSpeaker === "patient" ? "bg-healthcare-primary text-white" : ""}`}
              onClick={() => setIsSpeaker("patient")}
            >
              Patient
            </Button>
          </div>
        </div>
        
        {/* Transcription area */}
        <Card className="flex-1 mb-6 overflow-y-auto max-h-[calc(100vh-300px)] p-4">
          {doctorTranscriptions.length === 0 && patientTranscriptions.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p>Transcriptions will appear here. Press the microphone button to begin.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Combine and sort transcriptions chronologically - this is simplified for the example */}
              {doctorTranscriptions.map((transcript, index) => (
                <div key={`doctor-${index}`} className="rounded-lg p-4 bg-healthcare-light border-l-4 border-healthcare-primary">
                  <p className="text-xs font-semibold text-healthcare-primary mb-1">Doctor ({getLanguageName(sourceLanguage)})</p>
                  <p className="font-medium">{transcript.source}</p>
                  <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
                    <p className="text-xs font-semibold text-healthcare-primary mb-1">Translation ({getLanguageName(targetLanguage)})</p>
                    <p className="font-medium">{transcript.target}</p>
                  </div>
                </div>
              ))}
              
              {patientTranscriptions.map((transcript, index) => (
                <div key={`patient-${index}`} className="rounded-lg p-4 bg-amber-50 border-l-4 border-amber-500">
                  <p className="text-xs font-semibold text-amber-600 mb-1">Patient ({getLanguageName(targetLanguage)})</p>
                  <p className="font-medium">{transcript.source}</p>
                  <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
                    <p className="text-xs font-semibold text-amber-600 mb-1">Translation ({getLanguageName(sourceLanguage)})</p>
                    <p className="font-medium">{transcript.target}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
        
        {/* Mic button */}
        <div className="flex flex-col items-center space-y-2">
          <div className="text-sm text-gray-500">
            {isSpeaker === "doctor" ? "Doctor speaking" : "Patient speaking"}
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={endSession}
              variant="outline"
              className="bg-white border-red-500 text-red-500 hover:bg-red-50"
              size="lg"
            >
              <SquareX className="mr-2 h-5 w-5" />
              End Session
            </Button>
            
            <Button
              onClick={toggleListening}
              className={`rounded-full h-16 w-16 p-0 flex items-center justify-center ${
                isListening 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-healthcare-primary hover:bg-healthcare-dark"
              }`}
              size="icon"
            >
              {isListening ? (
                <MicOff className="h-8 w-8" />
              ) : (
                <Mic className="h-8 w-8" />
              )}
            </Button>
            
            <Button
              onClick={switchSpeaker}
              variant="outline"
              className="bg-white"
              size="lg"
            >
              Switch to {isSpeaker === "doctor" ? "Patient" : "Doctor"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TranslationSession;
