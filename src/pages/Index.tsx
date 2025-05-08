
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Languages, Settings, Globe } from "lucide-react";
import SettingsDialog from '@/components/SettingsDialog';
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleStartSession = () => {
    // This will be implemented in future iterations
    console.log("Starting session with", { sourceLanguage, targetLanguage });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-healthcare-light to-white flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-6 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-healthcare-primary" />
            <h1 className="text-xl font-bold text-healthcare-dark">SpeakEasy Health Connect</h1>
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
              Break language barriers in healthcare communication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-4">
            {/* Language Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="col-span-1">
                <LanguageSelector
                  value={sourceLanguage}
                  onChange={setSourceLanguage}
                  label="Source Language"
                />
              </div>
              
              <div className="flex justify-center items-center">
                <div className="w-12 h-12 rounded-full bg-healthcare-light flex items-center justify-center">
                  <Languages className="h-6 w-6 text-healthcare-primary" />
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
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="h-12 w-12 rounded-full bg-healthcare-light flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-healthcare-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-healthcare-dark">Real-time Translation</h3>
                <p className="text-sm text-gray-500">Instant communication across languages</p>
              </div>
              
              <div className="p-4">
                <div className="h-12 w-12 rounded-full bg-healthcare-light flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-healthcare-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-medium text-healthcare-dark">HIPAA Compliant</h3>
                <p className="text-sm text-gray-500">Secure and private healthcare conversations</p>
              </div>
              
              <div className="p-4">
                <div className="h-12 w-12 rounded-full bg-healthcare-light flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-healthcare-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-medium text-healthcare-dark">Medical Terminology</h3>
                <p className="text-sm text-gray-500">Specialized healthcare vocabulary</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full py-6 text-lg bg-healthcare-primary hover:bg-healthcare-dark transition-colors"
              onClick={handleStartSession}
            >
              Begin New Session
            </Button>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 bg-white border-t">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} SpeakEasy Health Connect. All rights reserved.</p>
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
