
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import aiResponses from "../data/aiResponses.json";

interface EmailAgentFormProps {
  propertyId: number;
  agentEmail: string;
  onClose: () => void;
}

const EmailAgentForm = ({ propertyId, agentEmail, onClose }: EmailAgentFormProps) => {
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const handleGenerateAIMessage = () => {
    setIsGeneratingAI(true);
    // Simulate AI generation with pre-written responses
    setTimeout(() => {
      const propertyDesc = aiResponses.propertyAssistant.descriptions.find(
        (desc) => desc.propertyId === propertyId
      );
      if (propertyDesc) {
        setMessage(
          `Hi, I'm interested in this property. ${propertyDesc.enhancedDescription.slice(0, 150)}... Can we schedule a viewing?`
        );
      }
      setIsGeneratingAI(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the email through a backend service
    window.location.href = `mailto:${agentEmail}?subject=Property Inquiry&body=${encodeURIComponent(message)}`;
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Your Email</label>
        <Input
          type="email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          required
          placeholder="your.email@example.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          placeholder="Write your message here..."
          className="min-h-[150px]"
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleGenerateAIMessage}
          disabled={isGeneratingAI}
          className="flex-1"
        >
          {isGeneratingAI ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate AI Message"
          )}
        </Button>
        <Button type="submit" className="flex-1 bg-purple hover:bg-purple-dark">
          Send Email
        </Button>
      </div>
    </form>
  );
};

export default EmailAgentForm;
