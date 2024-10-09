"use client";

import { envHeliusRpcUrl } from "@/lib/envConfig";
import { Action, useAction } from "@dialectlabs/blinks";
import { useActionSolanaWalletAdapter } from "@dialectlabs/blinks/hooks/solana";
import "@dialectlabs/blinks/index.css";
import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
const DynamicBlink = dynamic(
  () => import("@dialectlabs/blinks").then((mod) => mod.Blink),
  { ssr: false }
);
import { Skeleton } from "@/components/ui/skeleton";

const BlinkComp = ({ propActionApiUrl }: { propActionApiUrl: string }) => {
  const [action, setAction] = useState<Action | null>(null);
  const actionRef = useRef<Action | null>(null);
  const actionRefreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null
  );

  const actionApiUrl = propActionApiUrl;
  const { adapter } = useActionSolanaWalletAdapter(
    envHeliusRpcUrl as string
  );

  // Fetch the action using useAction hook
  const { action: fetchedAction } = useAction({
    url: actionApiUrl,
    adapter,
  });

  // Set the action when fetched and set the adapter
  useEffect(() => {
    if (fetchedAction) {
      fetchedAction.setAdapter(adapter); // Ensure adapter is set
      setAction(fetchedAction);
      actionRef.current = fetchedAction;
    }
  }, [fetchedAction, adapter]);

  // Set up interval to refresh action every 1 second
  useEffect(() => {
    // Function to refresh action
    const refreshAction = () => {
      if (actionRef.current) {
        actionRef.current
          .refresh()
          .then((refreshedAction) => {
            refreshedAction.setAdapter(adapter); // Ensure adapter is set
            setAction(refreshedAction);
            actionRef.current = refreshedAction;
          })
          .catch((error) => {
            console.error("Error refreshing action:", error);
          });
      }
    };

    // Start interval only if action is available
    if (actionRef.current) {
      refreshAction(); // Optionally, refresh immediately
      actionRefreshIntervalRef.current = setInterval(refreshAction, 1000);
    }

    // Cleanup interval on unmount
    return () => {
      if (actionRefreshIntervalRef.current) {
        clearInterval(actionRefreshIntervalRef.current);
        actionRefreshIntervalRef.current = null;
      }
    };
  }, [adapter]);

  return (
    <>
      {action ? (
        <DynamicBlink
          stylePreset="default"
          action={action}
          websiteText={new URL(actionApiUrl).hostname}
        />
      ) : (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-[320px]" />
          <Skeleton className="h-[16px]" />
          <Skeleton className="h-[16px]" />
          <Skeleton className="h-[32px]" />
          <div className="flex gap-2">
            <Skeleton className="h-[32px]" />
            <Skeleton className="h-[32px]" />
          </div>
        </div>
      )}
    </>
  );
};

export default BlinkComp;
