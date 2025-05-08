import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Clock, ArrowRight, CircleArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";

const TranslationSession = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [doctorTranscriptions, setDoctorTranscriptions] = useState<{ source: string; target: string }[]>([]);
  const [patientTranscriptions, setPatientTranscriptions] = useState<{ source: string; target: string }[]>([]);
  const [currentSpeaker, setCurrentSpeaker] = useState<"doctor" | "patient">("doctor");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [endSessionValue, setEndSessionValue] = useState([0]);
  const [isSliderActive, setIsSliderActive] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [showGenerateButton, setShowGenerateButton] = useState(false);

  // These would be passed from the previous page
  const sourceLanguage = new URLSearchParams(window.location.search).get('source') || "en";
  const targetLanguage = new URLSearchParams(window.location.search).get('target') || "es";

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format elapsed time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
        title: `Now listening for ${currentSpeaker} speech`,
        description: `Speak now in ${getLanguageName(currentSpeaker === "doctor" ? sourceLanguage : targetLanguage)}`,
      });
      
      // Simulate receiving transcription
      setTimeout(() => {
        const newTranscription = {
          source: currentSpeaker === "doctor" 
            ? "Hello, how have you been feeling this past week?" 
            : "Me he sentido un poco mejor, pero todavía tengo dolor.",
          target: currentSpeaker === "doctor" 
            ? "Hola, ¿cómo te has sentido esta última semana?" 
            : "I've been feeling a bit better, but I still have pain."
        };
        
        if (currentSpeaker === "doctor") {
          setDoctorTranscriptions(prev => [...prev, newTranscription]);
          setCurrentSpeaker("patient"); // Automatically switch to patient after doctor speaks
        } else {
          setPatientTranscriptions(prev => [...prev, newTranscription]);
          setCurrentSpeaker("doctor"); // Automatically switch to doctor after patient speaks
        }
        
        setIsListening(false);
      }, 3000);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setEndSessionValue(value);
    
    // If slider reaches 100, show the Generate Summary button
    if (value[0] === 100) {
      setShowGenerateButton(true);
      setEndSessionValue([0]); // Reset slider
    }
  };

  const handleGenerateSummary = () => {
    setIsGeneratingSummary(true);
    toast({
      title: "Generating summary...",
      description: "Please wait while we prepare your session summary.",
    });
    
    // Simulate generating a summary (would be replaced with actual API call)
    setTimeout(() => {
      setIsGeneratingSummary(false);
      toast({
        title: "Summary generated",
        description: "Your session summary is ready.",
      });
      navigate("/");
    }, 2000);
  };

  // Reset slider value when released if not at 100
  const handleSliderReleased = () => {
    if (endSessionValue[0] < 100) {
      setEndSessionValue([0]);
      setIsSliderActive(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-healthcare-light to-white">
      {/* Header with languages and flags */}
      <header className="w-full py-4 px-6 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-healthcare-dark">Curalingo</h1>
            <div className="flex items-center space-x-1 px-3 py-1 bg-healthcare-light rounded-full">
              <Clock className="h-4 w-4 text-healthcare-dark" />
              <span className="text-sm">{formatTime(elapsedTime)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="text-lg mr-2">{getFlagEmoji(sourceLanguage)}</span>
              <span className="font-medium">{getLanguageName(sourceLanguage)}</span>
              <span className="text-xs ml-1">(Doctor)</span>
            </div>
            <span className="text-gray-400">→</span>
            <div className="flex items-center">
              <span className="text-lg mr-2">{getFlagEmoji(targetLanguage)}</span>
              <span className="font-medium">{getLanguageName(targetLanguage)}</span>
              <span className="text-xs ml-1">(Patient)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 flex flex-col">
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
        
        {/* Bottom area with mic button and end session slider */}
        <div className="flex flex-col gap-4">
          {/* Mic button centered - moved above the slider */}
          <div className="flex justify-center">
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
          </div>
          
          {/* End session controls */}
          <div className="bg-white p-3 rounded-lg shadow-sm flex justify-center">
            {!showGenerateButton ? (
              <div className="relative w-64 h-14 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full overflow-hidden shadow-lg flex items-center border border-gray-200">
                <div 
                  className="absolute left-0 top-0 bottom-0 flex items-center justify-center z-10 w-14 h-14 bg-white rounded-full shadow-md"
                  style={{ left: `calc(${endSessionValue[0]}% - ${endSessionValue[0] > 0 ? 56 * (endSessionValue[0]/100) : 0}px)` }}
                >
                  <CircleArrowRight className="h-8 w-8 text-healthcare-primary" />
                </div>
                <div className="flex-1 text-center text-healthcare-dark font-medium ml-16">
                  Slide to End Session
                </div>
                <Slider
                  id="end-session-slider"
                  value={endSessionValue}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleSliderChange}
                  onValueCommit={handleSliderReleased}
                  onMouseDown={() => setIsSliderActive(true)}
                  onTouchStart={() => setIsSliderActive(true)}
                  className="absolute top-0 left-0 right-0 bottom-0 opacity-0 w-full cursor-pointer"
                  disabled={isGeneratingSummary}
                />
              </div>
            ) : (
              <Button
                onClick={handleGenerateSummary}
                disabled={isGeneratingSummary}
                className="w-64 bg-healthcare-primary hover:bg-healthcare-dark text-white"
              >
                {isGeneratingSummary ? "Generating..." : "Generate Summary"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TranslationSession;
