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
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 flex flex-col">
        {/* Side-by-side Transcription and SOAP Notes */}
        <div className="mb-6 h-[calc(100vh-300px)]">
          <ResizablePanelGroup direction="horizontal" className="h-full rounded-lg border">
            {/* Transcription column */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card className="h-full overflow-y-auto p-4 rounded-none border-none">
                <h2 className="text-lg font-semibold mb-4 text-healthcare-dark">Transcriptions</h2>
                {doctorTranscriptions.length === 0 && patientTranscriptions.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <p>Transcriptions will appear here. Press the microphone button to begin.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Combine and sort transcriptions chronologically - this is simplified for the example */}
                    {doctorTranscriptions.map((transcript, index) => (
                      <div key={`doctor-${index}`} className="rounded-lg p-4 bg-healthcare-light border-l-4 border-healthcare-primary ml-4 mr-12 relative">
                        <div className="absolute -left-3 top-4 w-6 h-6 rounded-full bg-healthcare-primary flex items-center justify-center text-white text-xs font-bold">
                          D
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold text-healthcare-primary">Doctor ({getLanguageName(sourceLanguage)})</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0" 
                            onClick={() => handleReplayAudio("doctor", index)}
                            disabled={playingAudio === `doctor-${index}`}
                          >
                            <SkipBack 
                              size={16} 
                              className={`${playingAudio === `doctor-${index}` ? 'animate-pulse text-healthcare-primary' : 'text-gray-500'}`} 
                            />
                          </Button>
                        </div>
                        <p className="font-medium">{transcript.source}</p>
                        <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
                          <p className="text-xs font-semibold text-healthcare-primary mb-1">Translation ({getLanguageName(targetLanguage)})</p>
                          <p className="font-medium">{transcript.target}</p>
                        </div>
                      </div>
                    ))}
                    
                    {patientTranscriptions.map((transcript, index) => (
                      <div key={`patient-${index}`} className="rounded-lg p-4 bg-amber-50 border-l-4 border-amber-500 mr-4 ml-12 relative">
                        <div className="absolute -right-3 top-4 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold">
                          P
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs font-semibold text-amber-600">Patient ({getLanguageName(targetLanguage)})</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0" 
                            onClick={() => handleReplayAudio("patient", index)}
                            disabled={playingAudio === `patient-${index}`}
                          >
                            <SkipBack 
                              size={16} 
                              className={`${playingAudio === `patient-${index}` ? 'animate-pulse text-amber-600' : 'text-gray-500'}`} 
                            />
                          </Button>
                        </div>
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
            </ResizablePanel>

            <ResizableHandle withHandle />
            
            {/* SOAP Notes column */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <Card className="h-full overflow-y-auto p-4 rounded-none border-none">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-healthcare-dark">SOAP Notes</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1 text-healthcare-primary border-healthcare-primary"
                  >
                    <Save size={16} /> Save Notes
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {/* Subjective */}
                  <div>
                    <h3 className="text-sm font-medium mb-1 text-healthcare-dark">Subjective</h3>
                    <p className="text-xs text-gray-500 mb-1">Patient's reported symptoms, complaints, and history</p>
                    <Textarea 
                      placeholder="Enter patient's subjective information..."
                      value={soapNotes.subjective}
                      onChange={(e) => handleSoapChange('subjective', e.target.value)}
                      className="resize-none focus-visible:ring-healthcare-primary"
                    />
                  </div>
                  
                  {/* Objective */}
                  <div>
                    <h3 className="text-sm font-medium mb-1 text-healthcare-dark">Objective</h3>
                    <p className="text-xs text-gray-500 mb-1">Measurable, observable data (vital signs, exam findings)</p>
                    <Textarea 
                      placeholder="Enter objective observations..."
                      value={soapNotes.objective}
                      onChange={(e) => handleSoapChange('objective', e.target.value)}
                      className="resize-none focus-visible:ring-healthcare-primary"
                    />
                  </div>
                  
                  {/* Assessment */}
                  <div>
                    <h3 className="text-sm font-medium mb-1 text-healthcare-dark">Assessment</h3>
                    <p className="text-xs text-gray-500 mb-1">Diagnosis or clinical impression</p>
                    <Textarea 
                      placeholder="Enter assessment or diagnosis..."
                      value={soapNotes.assessment}
                      onChange={(e) => handleSoapChange('assessment', e.target.value)}
                      className="resize-none focus-visible:ring-healthcare-primary"
                    />
                  </div>
                  
                  {/* Plan */}
                  <div>
                    <h3 className="text-sm font-medium mb-1 text-healthcare-dark">Plan</h3>
                    <p className="text-xs text-gray-500 mb-1">Treatment plan, medications, follow-up</p>
                    <Textarea 
                      placeholder="Enter treatment plan..."
                      value={soapNotes.plan}
                      onChange={(e) => handleSoapChange('plan', e.target.value)}
                      className="resize-none focus-visible:ring-healthcare-primary"
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
                  className={`absolute left-0 top-0 bottom-0 flex items-center justify-center z-10 w-14 h-14 bg-white rounded-full shadow-md transition-transform ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
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
