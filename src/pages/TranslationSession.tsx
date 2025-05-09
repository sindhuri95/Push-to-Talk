
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Clock, ArrowRight, CircleArrowRight, Save, SkipBack } from "lucide-react";
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
  const [endSessionValue, setEndSessionValue] = useState([0]);
  const [isDragging, setIsDragging] = useState(false);
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  
  // SOAP Notes state
  const [soapNotes, setSoapNotes] = useState({
    subjective: "",
    objective: "",
    assessment: "",
    plan: ""
  });

  // Audio replay state
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

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

  // Effect to handle slider completion
  useEffect(() => {
    if (endSessionValue[0] >= 90 && isDragging) {
      // Automatically complete to 100 when user gets close
      setEndSessionValue([100]);
      setShowGenerateButton(true);
      setIsDragging(false);
    }
  }, [endSessionValue, isDragging]);

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
    
    // Show the Generate Summary button if the slider reaches 100
    if (value[0] === 100) {
      setShowGenerateButton(true);
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

  // Handle mouse/touch events to improve slider UX
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    if (endSessionValue[0] < 90) {
      setEndSessionValue([0]);
    }
    setIsDragging(false);
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
      {/* Header with languages and flags */}
      <header className="w-full py-3 px-6 bg-white border-b backdrop-blur-sm bg-white/70 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-healthcare-primary">Curalingo</h1>
            <div className="flex items-center space-x-1 px-3 py-1 bg-healthcare-primary/5 rounded-full">
              <Clock className="h-3.5 w-3.5 text-healthcare-primary" />
              <span className="text-sm font-medium text-healthcare-primary">{formatTime(elapsedTime)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-healthcare-light/30 px-3 py-1.5 rounded-full">
              <span className="text-lg mr-2">{getFlagEmoji(sourceLanguage)}</span>
              <span className="font-medium text-sm text-healthcare-primary">{getLanguageName(sourceLanguage)}</span>
              <span className="mx-2 text-gray-400">→</span>
              <span className="text-lg mr-2">{getFlagEmoji(targetLanguage)}</span>
              <span className="font-medium text-sm text-healthcare-secondary">{getLanguageName(targetLanguage)}</span>
            </div>
            <div className="flex items-center bg-healthcare-primary/10 rounded-full h-8 w-8 justify-center">
              <span className="text-xs font-semibold text-healthcare-primary">D</span>
            </div>
          </div>
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
                    {currentSpeaker === "doctor" ? "Doctor's turn" : "Patient's turn"}
                  </div>
                </div>
                
                {doctorTranscriptions.length === 0 && patientTranscriptions.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <img src="/placeholder.svg" alt="Empty state" className="w-24 h-24 mb-4 opacity-40" />
                    <p>Transcriptions will appear here</p>
                    <p className="text-sm mt-1">Press the microphone button to begin</p>
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
                          <p className="text-xs font-semibold text-healthcare-primary">Doctor ({getLanguageName(sourceLanguage)})</p>
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
            
            {/* SOAP Notes column */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card className="h-full overflow-y-auto p-6 rounded-none border-none bg-white">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-healthcare-primary mb-1">SOAP Notes</h2>
                  <p className="text-sm text-gray-500">Document your clinical observations</p>
                </div>
                
                <div className="space-y-5">
                  {/* Subjective */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-healthcare-primary/30">
                    <h3 className="text-sm font-semibold mb-1 text-healthcare-primary flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-healthcare-primary rounded-full"></span>
                      Subjective
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">Patient's reported symptoms, complaints, and history</p>
                    <Textarea 
                      placeholder="Enter patient's subjective information..."
                      value={soapNotes.subjective}
                      onChange={(e) => handleSoapChange('subjective', e.target.value)}
                      className="resize-none focus-visible:ring-healthcare-primary border-gray-200 min-h-[100px]"
                    />
                  </div>
                  
                  {/* Objective */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-healthcare-primary/30">
                    <h3 className="text-sm font-semibold mb-1 text-healthcare-primary flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-healthcare-primary rounded-full"></span>
                      Objective
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">Measurable, observable data (vital signs, exam findings)</p>
                    <Textarea 
                      placeholder="Enter objective observations..."
                      value={soapNotes.objective}
                      onChange={(e) => handleSoapChange('objective', e.target.value)}
                      className="resize-none focus-visible:ring-healthcare-primary border-gray-200 min-h-[100px]"
                    />
                  </div>
                  
                  {/* Assessment */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-healthcare-primary/30">
                    <h3 className="text-sm font-semibold mb-1 text-healthcare-primary flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-healthcare-primary rounded-full"></span>
                      Assessment
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">Diagnosis or clinical impression</p>
                    <Textarea 
                      placeholder="Enter assessment or diagnosis..."
                      value={soapNotes.assessment}
                      onChange={(e) => handleSoapChange('assessment', e.target.value)}
                      className="resize-none focus-visible:ring-healthcare-primary border-gray-200 min-h-[100px]"
                    />
                  </div>
                  
                  {/* Plan */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 transition-all hover:border-healthcare-primary/30">
                    <h3 className="text-sm font-semibold mb-1 text-healthcare-primary flex items-center gap-1">
                      <span className="inline-block w-2 h-2 bg-healthcare-primary rounded-full"></span>
                      Plan
                    </h3>
                    <p className="text-xs text-gray-500 mb-2">Treatment plan, medications, follow-up</p>
                    <Textarea 
                      placeholder="Enter treatment plan..."
                      value={soapNotes.plan}
                      onChange={(e) => handleSoapChange('plan', e.target.value)}
                      className="resize-none focus-visible:ring-healthcare-primary border-gray-200 min-h-[100px]"
                    />
                  </div>
                </div>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        
        {/* Bottom area with mic button and end session slider */}
        <div className="flex flex-col gap-4">
          {/* Mic button centered - moved above the slider */}
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
              {currentSpeaker === "doctor" ? "Doctor speaking" : "Patient speaking"}
            </div>
          </div>
          
          {/* End session controls */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-center mt-4">
            {!showGenerateButton ? (
              <div className="relative w-72 h-14 bg-gradient-to-r from-gray-50 to-gray-100 rounded-full overflow-hidden shadow-sm flex items-center border border-gray-200">
                <div 
                  className={`absolute left-0 top-0 bottom-0 flex items-center justify-center z-10 w-14 h-14 bg-white rounded-full shadow-md transition-all ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                  style={{ left: `calc(${endSessionValue[0]}% - ${endSessionValue[0] > 0 ? 56 * (endSessionValue[0]/100) : 0}px)` }}
                >
                  <CircleArrowRight className="h-7 w-7 text-healthcare-primary" />
                </div>
                <div className="flex-1 text-center text-healthcare-primary font-medium ml-16">
                  Slide to End Session
                </div>
                <Slider
                  id="end-session-slider"
                  value={endSessionValue}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleSliderChange}
                  onValueCommit={handleDragEnd}
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                  className="absolute top-0 left-0 right-0 bottom-0 opacity-0 w-full cursor-pointer"
                  disabled={isGeneratingSummary}
                />
              </div>
            ) : (
              <Button
                onClick={handleGenerateSummary}
                disabled={isGeneratingSummary}
                className="w-72 py-6 bg-healthcare-primary hover:bg-healthcare-dark text-white rounded-full shadow-md transition-all"
              >
                {isGeneratingSummary ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    <span>Generating...</span>
                  </div>
                ) : "Generate Summary"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TranslationSession;

