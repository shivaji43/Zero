"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { COOKIE_CATEGORIES, type CookieCategory } from "@/lib/cookies";
import { useCookies } from "@/providers/cookie-provider";
import { CookieTrigger } from "./cookie-trigger";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { X, Cookie } from "lucide-react";

interface CookieConsentProps {
  children?: React.ReactNode;
  showFloatingButton?: boolean;
}

export function CookieConsent({ children, showFloatingButton = true }: CookieConsentProps) {
  const [open, setOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const { preferences, updatePreference, acceptAll, rejectAll, isLoaded } = useCookies();

  useEffect(() => {
    if (isLoaded && !Object.values(preferences).some((value) => value)) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, preferences]);

  const handleSavePreferences = () => {
    setOpen(false);
    setShowBanner(false);
  };

  const handleAcceptAll = () => {
    acceptAll();
    setOpen(false);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    rejectAll();
    setOpen(false);
    setShowBanner(false);
  };

  return (
    <>
      {showFloatingButton && (
        <div className="fixed bottom-4 right-4 z-50">
          <CookieTrigger variant="icon" onClick={() => setOpen(true)} />
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        {children && (
          <DialogTrigger asChild onClick={() => setOpen(true)}>
            {children}
          </DialogTrigger>
        )}
        <DialogContent className="flex max-h-[90vh] flex-col gap-0 border-zinc-800 bg-black p-0 outline-none">
          <div className="border-b border-zinc-800 px-6 py-6">
            <DialogHeader>
              <DialogTitle>Cookie Settings</DialogTitle>
              <DialogDescription>
                Customize your cookie preferences. You can enable or disable different types of
                cookies below.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-6 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-zinc-800 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-2">
            <div className="space-y-6 py-6">
              {(
                Object.entries(COOKIE_CATEGORIES) as [
                  CookieCategory,
                  (typeof COOKIE_CATEGORIES)[CookieCategory],
                ][]
              ).map(([category, info]) => (
                <div key={category} className="flex items-start justify-between space-x-4">
                  <div>
                    <Label htmlFor={category} className="font-medium text-zinc-100">
                      {info.name}
                    </Label>
                    <p className="mt-1 text-sm text-zinc-400">{info.description}</p>
                  </div>
                  <Switch
                    id={category}
                    checked={preferences[category]}
                    disabled={info.required}
                    onCheckedChange={(checked) => updatePreference(category, checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              ))}

              <Accordion type="single" collapsible className="mt-6">
                <AccordionItem value="details" className="border-zinc-800">
                  <AccordionTrigger className="text-zinc-100 hover:text-zinc-100 hover:no-underline">
                    <span className="text-sm font-medium">Detailed Cookie Information</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400">
                    <div className="space-y-4 text-sm">
                      {Object.entries(COOKIE_CATEGORIES).map(([key, info]) => (
                        <div key={key}>
                          <h4 className="font-medium text-zinc-100">{info.name}</h4>
                          <p className="mt-1">{info.description}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="border-t border-zinc-800 bg-black px-6 py-4">
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
              <div className="mt-2 flex flex-1 gap-2 sm:mt-0">
                <Button
                  variant="outline"
                  className="flex-1 border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-900 hover:text-zinc-100"
                  onClick={handleRejectAll}
                >
                  Reject All
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-900 hover:text-zinc-100"
                  onClick={handleAcceptAll}
                >
                  Accept All
                </Button>
              </div>
              <Button
                onClick={handleSavePreferences}
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700 sm:flex-none"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showBanner && (
        <Card className="animate-in fade-in slide-in-from-bottom-4 fixed bottom-4 left-4 right-4 z-40 border-zinc-800 bg-black p-4 shadow-lg duration-300 md:left-auto md:right-4 md:max-w-md">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-zinc-100" />
              <h3 className="font-semibold text-zinc-100">Cookie Consent</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBanner(false)}
              className="text-zinc-400 hover:text-zinc-100"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <p className="mb-4 text-sm text-zinc-400">
            We use cookies to enhance your browsing experience, serve personalized ads or content,
            and analyze our traffic.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setOpen(true)}
              className="border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-900 hover:text-zinc-100"
            >
              Customize
            </Button>
            <Button
              size="sm"
              onClick={handleAcceptAll}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Accept All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRejectAll}
              className="text-zinc-400 hover:text-zinc-100"
            >
              Reject All
            </Button>
          </div>
        </Card>
      )}
    </>
  );
}
