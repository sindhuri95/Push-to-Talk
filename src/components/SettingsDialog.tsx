
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
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
