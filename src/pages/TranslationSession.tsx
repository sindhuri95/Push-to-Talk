
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Clock, ArrowRight, CircleArrowRight, Save, SkipBack, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

const TranslationSession = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [doctorTranscriptions, setDoctorTranscriptions] = useState<{ source: string; target: string }[]>([]);
  const [patientTranscriptions, setPatientTranscriptions] = useState<{ source: string; target: string }[]>([]);
  const [currentSpeaker, setCurrentSpeaker] = useState<"doctor" | "patient">("doctor");
  const [elapsedTime, setElapsedTime] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  
  // SOAP Notes state
  const [soapNotes, setSoapNotes] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: ""
  });

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

  const handleReplayAudio = (type: string, index: number) => {
    const audioId = `${type}-${index}`;
    setPlayingAudio(audioId);
    
    // Simulate audio playback
    toast({
      title: "Playing audio",
      description: `Playing ${type === "doctor" ? "doctor" : "patient"} transcription #${index + 1}`,
    });
    
    // Simulate audio finishing after a time
    setTimeout(() => {
      setPlayingAudio(null);
    }, 2000);
  };

  // Handle SOAP notes change
  const handleSoapChange = (section: keyof typeof soapNotes, value: string) => {
    setSoapNotes(prev => ({
      ...prev,
      [section]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-healthcare-light/50 to-white">
      {/* Updated header based on the design reference */}
      <header className="w-full py-2 bg-healthcare-primary text-white flex items-center justify-between px-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-healthcare-primary/80 mr-2"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <h1 className="text-xl font-bold">CuraLingo</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center rounded-md bg-healthcare-primary/30 px-3 py-1">
            <span className="text-sm font-medium text-white mr-1">{getLanguageName(sourceLanguage)}</span>
            <div className="w-5 h-5 flex items-center justify-center">
              <ArrowRight size={14} />
            </div>
            <span className="text-sm font-medium text-white">{getLanguageName(targetLanguage)}</span>
          </div>
          <div className="flex items-center bg-healthcare-primary/30 px-3 py-1 rounded-md">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{formatTime(elapsedTime)}</span>
          </div>
          <Button 
            variant="destructive" 
            size="sm"
            className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-1 text-sm font-medium"
            onClick={() => {
              navigate('/');
            }}
          >
            End Session
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-6 flex flex-col">
        {/* Side-by-side Transcription and SOAP Notes */}
        <div className="mb-6 h-[calc(100vh-250px)]">
          <ResizablePanelGroup direction="horizontal" className="h-full rounded-xl overflow-hidden border border-gray-100 shadow-sm">
            {/* Transcription column */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card className="h-full overflow-y-auto p-4 rounded-none border-none">
                <div className="flex justify-between items-center mb-3 sticky top-0 bg-white py-2 z-10">
                  <h2 className="text-lg font-semibold text-healthcare-primary">Transcriptions</h2>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    currentSpeaker === "doctor" 
                      ? "bg-healthcare-primary/10 text-healthcare-primary" 
                      : "bg-healthcare-secondary/10 text-healthcare-secondary"
                  }`}>
                    {currentSpeaker === "doctor" ? "Provider's turn" : "Patient's turn"}
                  </div>
                </div>
                
                {doctorTranscriptions.length === 0 && patientTranscriptions.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <img src="/placeholder.svg" alt="Empty state" className="w-24 h-24 mb-4 opacity-40" />
                    <p className="font-medium text-gray-600">No transcriptions yet</p>
                    <p className="text-sm mt-1 mb-3">Press the microphone button below to begin recording</p>
                    <div className="max-w-sm text-center p-4 rounded-lg bg-gray-50 border border-gray-200">
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">How it works:</span> Speak clearly into your microphone. 
                        Your speech will be transcribed and translated in real-time between the provider and patient languages.
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <div className="flex items-center text-xs text-healthcare-primary font-medium">
                          <div className="w-3 h-3 rounded-full bg-healthcare-primary mr-1"></div>Provider
                        </div>
                        <ArrowRight size={12} className="text-gray-400" />
                        <div className="flex items-center text-xs text-healthcare-secondary font-medium">
                          <div className="w-3 h-3 rounded-full bg-healthcare-secondary mr-1"></div>Patient
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 px-2">
                    {/* Combine and sort transcriptions chronologically - this is simplified for the example */}
                    {doctorTranscriptions.map((transcript, index) => (
                      <div 
                        key={`doctor-${index}`} 
                        className="rounded-xl p-4 bg-gradient-to-r from-healthcare-light/80 to-healthcare-light/50 border border-healthcare-primary/10 mr-6 ml-2 relative"
                      >
                        <div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-healthcare-primary shadow-sm flex items-center justify-center text-white text-xs font-bold">
                          D
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold text-healthcare-primary">Provider ({getLanguageName(sourceLanguage)})</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 hover:bg-healthcare-primary/10" 
                            onClick={() => handleReplayAudio("doctor", index)}
                            disabled={playingAudio === `doctor-${index}`}
                          >
                            <SkipBack 
                              size={15} 
                              className={`${playingAudio === `doctor-${index}` ? 'animate-pulse text-healthcare-primary' : 'text-healthcare-primary/60'}`} 
                            />
                          </Button>
                        </div>
                        <p className="font-medium">{transcript.source}</p>
                        <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
                          <p className="text-xs font-semibold text-healthcare-primary/80 mb-1">Translation ({getLanguageName(targetLanguage)})</p>
                          <p className="font-medium">{transcript.target}</p>
                        </div>
                      </div>
                    ))}
                    
                    {patientTranscriptions.map((transcript, index) => (
                      <div 
                        key={`patient-${index}`} 
                        className="rounded-xl p-4 bg-gradient-to-r from-healthcare-secondary/20 to-healthcare-secondary/10 border border-healthcare-secondary/20 ml-6 mr-2 relative"
                      >
                        <div className="absolute -right-3 top-4 w-6 h-6 rounded-full bg-healthcare-secondary shadow-sm flex items-center justify-center text-white text-xs font-bold">
                          P
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold text-healthcare-secondary">Patient ({getLanguageName(targetLanguage)})</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0 hover:bg-healthcare-secondary/10" 
                            onClick={() => handleReplayAudio("patient", index)}
                            disabled={playingAudio === `patient-${index}`}
                          >
                            <SkipBack 
                              size={15} 
                              className={`${playingAudio === `patient-${index}` ? 'animate-pulse text-healthcare-secondary' : 'text-healthcare-secondary/60'}`} 
                            />
                          </Button>
                        </div>
                        <p className="font-medium">{transcript.source}</p>
                        <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
                          <p className="text-xs font-semibold text-healthcare-secondary/80 mb-1">Translation ({getLanguageName(sourceLanguage)})</p>
                          <p className="font-medium">{transcript.target}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-gray-100" />
            
            {/* SOAP Notes column - updated to appear non-editable */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card className="h-full overflow-y-auto p-6 rounded-none border-none bg-white">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-healthcare-primary mb-1">SOAP Notes</h2>
                  <p className="text-sm text-gray-500">Automated documentation from your session (read-only)</p>
                </div>
                
                <div className="space-y-5">
                  {/* Subjective - non-editable styling */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <h3 className="text-sm font-semibold mb-1 text-healthcare-primary flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-healthcare-primary rounded-full"></span>
                      Subjective
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">Patient's reported symptoms, complaints, and history</p>
                    <div className="min-h-[100px] bg-gray-100/70 rounded-md p-3 text-gray-600 text-sm border border-gray-200">
                      {soapNotes.subjective || "Automatically generated content will appear here as the conversation progresses..."}
                    </div>
                  </div>
                  
                  {/* Objective - non-editable styling */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <h3 className="text-sm font-semibold mb-1 text-healthcare-primary flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-healthcare-primary rounded-full"></span>
                      Objective
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">Measurable, observable data (vital signs, exam findings)</p>
                    <div className="min-h-[100px] bg-gray-100/70 rounded-md p-3 text-gray-600 text-sm border border-gray-200">
                      {soapNotes.objective || "Automatically generated content will appear here as the conversation progresses..."}
                    </div>
                  </div>
                  
                  {/* Assessment - non-editable styling */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <h3 className="text-sm font-semibold mb-1 text-healthcare-primary flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-healthcare-primary rounded-full"></span>
                      Assessment
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">Diagnosis or clinical impression</p>
                    <div className="min-h-[100px] bg-gray-100/70 rounded-md p-3 text-gray-600 text-sm border border-gray-200">
                      {soapNotes.assessment || "Automatically generated content will appear here as the conversation progresses..."}
                    </div>
                  </div>
                  
                  {/* Plan - non-editable styling */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <h3 className="text-sm font-semibold mb-1 text-healthcare-primary flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-healthcare-primary rounded-full"></span>
                      Plan
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">Treatment plan, medications, follow-up</p>
                    <div className="min-h-[100px] bg-gray-100/70 rounded-md p-3 text-gray-600 text-sm border border-gray-200">
                      {soapNotes.plan || "Automatically generated content will appear here as the conversation progresses..."}
                    </div>
                  </div>
                </div>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        
        {/* Bottom area with mic button only */}
        <div className="flex flex-col gap-4">
          {/* Mic button centered */}
          <div className="flex justify-center">
            <Button
              onClick={toggleListening}
              className={`rounded-full h-16 w-16 p-0 flex items-center justify-center shadow-lg ${
                isListening 
                  ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                  : `${currentSpeaker === "doctor" ? "bg-healthcare-primary hover:bg-healthcare-dark" : "bg-healthcare-secondary hover:brightness-95"}`
              }`}
              size="icon"
            >
              {isListening ? (
                <MicOff className="h-7 w-7" />
              ) : (
                <Mic className="h-7 w-7" />
              )}
            </Button>
            
            <div className="absolute mt-20 text-xs font-medium text-gray-500">
              {currentSpeaker === "doctor" ? "Provider speaking" : "Patient speaking"}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TranslationSession;
