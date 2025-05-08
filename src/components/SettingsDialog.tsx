
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  const [autoDetect, setAutoDetect] = useState(false);
  const [speakingSpeed, setSpeakingSpeed] = useState([1.0]);
  const [initialGreeting, setInitialGreeting] = useState('');

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
          
          {/* Initial Greeting */}
          <div className="space-y-3">
            <div className="space-y-0.5">
              <Label htmlFor="initial-greeting">Initial Greeting</Label>
              <p className="text-sm text-muted-foreground">
                Enter a custom greeting or introduction for the session
              </p>
            </div>
            <Textarea
              id="initial-greeting"
              placeholder="E.g., I am a nurse visiting John who only speaks Spanish. Greet the patient and ask how he has been feeling for the past week."
              value={initialGreeting}
              onChange={(e) => setInitialGreeting(e.target.value)}
              rows={4}
              className="resize-none"
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
