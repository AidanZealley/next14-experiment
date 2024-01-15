"use client"; // Error components must be Client Components

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid place-items-center p-6">
      <div className="w-full max-w-lg">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Oops</AlertTitle>
          <AlertDescription>
            <div className="grid justify-start gap-6">
              <span>{error.message}</span>
              <Button size="sm" onClick={() => reset()}>
                <span className="flex items-center gap-2">
                  <RefreshCcw className="h-3 w-3" />
                  Refresh
                </span>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
