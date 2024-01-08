import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AppRouter } from "@/server/api/root";
import { TRPCClientErrorLike } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { AlertCircle, Loader2 } from "lucide-react";
import { Spinner } from "./spinner";

type StatusOverlayProps = {
  isLoading?: boolean;
  isRefetching?: boolean;
  isError?: boolean;
  errors?: (TRPCError | TRPCClientErrorLike<AppRouter> | null)[];
  children: React.ReactNode;
};

export const StatusOverlay = ({
  isLoading,
  isRefetching,
  isError,
  errors,
  children,
}: StatusOverlayProps) => {
  const validErrors = errors?.filter((error) => error !== null);

  return (
    <div className="relative">
      {!isError && (
        <div
          className={`transition-opacity duration-300 ease-out ${
            isLoading ? "opacity-0" : ""
          } ${isRefetching ? "opacity-50" : ""}`}
        >
          {children}
        </div>
      )}
      {(isLoading || isRefetching) && (
        <div className="absolute inset-0 grid place-items-center">
          {isLoading && <Loader2 className="h-8 w-8 animate-spin" />}
          {isRefetching && (
            <div className="grid h-full w-full place-items-center backdrop-blur-sm">
              <Spinner />
            </div>
          )}
          {isError && (
            <div className="w-full max-w-lg">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Oops</AlertTitle>
                <AlertDescription>
                  {validErrors?.length
                    ? validErrors.map((error) => (
                        <p>{error?.message ?? "Something went wrong."}</p>
                      ))
                    : null}
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
