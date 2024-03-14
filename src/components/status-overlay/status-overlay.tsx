import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AppRouter } from "@/server/api/root";
import { TRPCClientErrorLike } from "@trpc/client";
import { TRPCError } from "@trpc/server";
import { AlertCircle } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { StatusOverlayRenderer } from "./status-overlay-renderer";
import { cn } from "@/lib/utils";

type StatusOverlayProps = {
  isLoading?: boolean;
  isRefetching?: boolean;
  isError?: boolean;
  errors?: (TRPCError | TRPCClientErrorLike<AppRouter> | null)[];
  notFoundFallback?: React.ReactNode;
  children: React.ReactNode;
};

export const StatusOverlay = ({
  notFoundFallback,
  isLoading,
  isRefetching,
  isError,
  errors,
  children,
}: StatusOverlayProps) => {
  return (
    <div className="relative grid min-h-0">
      <StatusOverlayGood
        isLoading={isLoading}
        isRefetching={isRefetching}
        isError={isError}
      >
        {children}
      </StatusOverlayGood>

      <StatusOverlayLoading
        isLoading={isLoading}
        isRefetching={isRefetching}
        isError={isError}
      />
      <StatusOverlayErrors
        isError={isError}
        errors={errors}
        notFoundFallback={notFoundFallback}
      />
    </div>
  );
};

type StatusOverlayGoodProps = {
  isLoading?: boolean;
  isRefetching?: boolean;
  isError?: boolean;
  children: React.ReactNode;
};

const StatusOverlayGood = ({
  isLoading,
  isRefetching,
  isError,
  children,
}: StatusOverlayGoodProps) => {
  if (isError) {
    return null;
  }

  return (
    <div
      className={cn(
        "transition-opacity duration-300 ease-out",
        isLoading ? "opacity-0" : "",
        isRefetching ? "opacity-50" : "",
      )}
    >
      <StatusOverlayRenderer isLoading={isLoading}>
        {children}
      </StatusOverlayRenderer>
    </div>
  );
};

type StatusOverlayLoadingProps = {
  isLoading?: boolean;
  isRefetching?: boolean;
  isError?: boolean;
};

const StatusOverlayLoading = ({
  isLoading,
  isRefetching,
}: StatusOverlayLoadingProps) => {
  return (
    (isLoading || isRefetching) && (
      <div
        className={cn(
          "absolute inset-0 grid h-full place-items-center",
          isRefetching ? " backdrop-blur-sm" : "",
        )}
      >
        <Spinner />
      </div>
    )
  );
};

type StatusOverlayErrorsProps = {
  isError?: boolean;
  errors?: (TRPCError | TRPCClientErrorLike<AppRouter> | null)[];
  notFoundFallback?: React.ReactNode;
};

const StatusOverlayErrors = ({
  isError,
  errors,
  notFoundFallback,
}: StatusOverlayErrorsProps) => {
  const validErrors = errors?.filter((error) => error !== null);
  const hasNotFoundError = !!validErrors?.filter(
    (error) => error?.message.includes("NOT_FOUND"),
  ).length;

  if (!isError) {
    return null;
  }

  if (hasNotFoundError) {
    return (
      <div className="grid h-full place-items-center">{notFoundFallback}</div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Oops</AlertTitle>
        <AlertDescription>
          {validErrors?.length
            ? validErrors.map((error, index) => (
                <p key={index}>{error?.message ?? "Something went wrong."}</p>
              ))
            : null}
        </AlertDescription>
      </Alert>
    </div>
  );
};
