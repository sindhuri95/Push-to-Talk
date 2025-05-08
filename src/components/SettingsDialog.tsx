
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [autoDetect, setAutoDetect] = useState(false);
  const [speakTranslation, setSpeakTranslation] = useState(true);
  const [speakingSpeed, setSpeakingSpeed] = useState([1.0]);
  const [saveHistory, setSaveHistory] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Translation Settings</DialogTitle>
          <DialogDescription>
            Configure your translation preferences
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {/* Auto-detect language */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-detect">Auto-detect source language</Label>
              <p className="text-sm text-muted-foreground">
                Automatically detect the language being spoken
              </p>
            </div>
            <Switch
              id="auto-detect"
              checked={autoDetect}
              onCheckedChange={setAutoDetect}
            />
          </div>
          
          {/* Text to speech */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="speak-translation">Speak translations</Label>
              <p className="text-sm text-muted-foreground">
                Read translations aloud automatically
              </p>
            </div>
            <Switch
              id="speak-translation"
              checked={speakTranslation}
              onCheckedChange={setSpeakTranslation}
            />
          </div>
          
          {/* Speaking speed */}
          <div className="space-y-3">
            <div className="space-y-0.5">
              <Label>Speaking speed</Label>
              <p className="text-sm text-muted-foreground">
                Adjust how fast the translations are spoken
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">Slow</span>
              <Slider
                value={speakingSpeed}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={setSpeakingSpeed}
                className="flex-1"
              />
              <span className="text-sm">Fast</span>
            </div>
            <div className="text-center text-sm font-medium">
              {speakingSpeed[0]}x
            </div>
          </div>
          
          {/* Save history */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="save-history">Save conversation history</Label>
              <p className="text-sm text-muted-foreground">
                Keep a record of your translation sessions
              </p>
            </div>
            <Switch
              id="save-history"
              checked={saveHistory}
              onCheckedChange={setSaveHistory}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
