
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Globe, ArrowLeftRight, Loader } from "lucide-react";
import SettingsDialog from '@/components/SettingsDialog';
import LanguageSelector from '@/components/LanguageSelector';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [autoDetect, setAutoDetect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartSession = () => {
    // Set loading state to true when button is clicked
    setIsLoading(true);
    
    // Simulate configuring session
    console.log("Starting session with", { sourceLanguage, targetLanguage });
    
    // This would typically be replaced with a real API call
    // For now, we'll just simulate a delay
    setTimeout(() => {
      // Navigate to the translation session page with language parameters
      navigate(`/session?source=${sourceLanguage}&target=${targetLanguage}`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-healthcare-light to-white flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-healthcare-primary" />
            <h1 className="text-xl font-bold text-healthcare-dark">Curalingo</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-5 w-5 text-healthcare-dark" />
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <Card className="w-full shadow-lg border-healthcare-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-healthcare-dark font-bold">
              Healthcare Translation
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Breaking language barriers in healthcare communication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-4">
            {/* Language Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="col-span-1">
                {!autoDetect && (
                  <LanguageSelector
                    value={sourceLanguage}
                    onChange={setSourceLanguage}
                    label="Source Language"
                  />
                )}
                {autoDetect && (
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-medium">Source Language</span>
                    <div className="border border-input px-3 py-2 rounded-md bg-muted/30">
                      <span className="text-sm text-muted-foreground">Auto-detect enabled</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center items-center">
                <div className="w-12 h-12 rounded-full bg-healthcare-light flex items-center justify-center">
                  <ArrowLeftRight className="h-6 w-6 text-healthcare-primary" />
                </div>
              </div>
              
              <div className="col-span-1">
                <LanguageSelector
                  value={targetLanguage}
                  onChange={setTargetLanguage}
                  label="Target Language"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full py-6 text-lg bg-healthcare-primary hover:bg-healthcare-dark transition-colors"
              onClick={handleStartSession}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Configuring Session...
                </span>
              ) : (
                'Begin New Session'
              )}
            </Button>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 bg-white border-t">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Curalingo. All rights reserved.</p>
          <p className="mt-1">Breaking language barriers in healthcare</p>
        </div>
      </footer>

      {/* Settings Dialog */}
      <SettingsDialog
        open={isSettingsOpen}
        onOpenChange={setIsSettingsOpen}
      />
    </div>
  );
};

export default Index;
