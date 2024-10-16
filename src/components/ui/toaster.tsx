"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { act, useEffect } from "react";

export function Toaster({active}: {active: boolean}) {
  const { toasts, toast } = useToast(); 

  if (active) {
    useEffect(() => {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
    }, [toast]);
  }

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && (
              <ToastDescription>{description}</ToastDescription>
            )}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
