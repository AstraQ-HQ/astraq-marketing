import { type RefObject, useCallback, useEffect, useRef } from "react";
import { env } from "@/env";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: string | HTMLElement,
        options: {
          sitekey: string;
          language?: string;
          execution?: "render" | "execute";
          appearance?: "interaction-only" | "always" | "execute";
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        },
      ) => string;
      remove: (widgetId: string) => void;
      execute: (element: string | HTMLElement) => void;
      reset: (element: string | HTMLElement) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
  }
}

export function useTurnstile(
  ref: RefObject<HTMLDivElement | null>,
  updateToken: (token: string) => void,
) {
  const widgetIdRef = useRef<string | null>(null);

  const buildTurnstile = useCallback(() => {
    if (!ref.current || !window.turnstile) {
      return;
    }

    if (widgetIdRef.current) {
      return;
    }

    try {
      const widgetId = window.turnstile.render(ref.current, {
        sitekey: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        language: "en",
        execution: "render",
        appearance: "interaction-only",
        callback: (token: string) => {
          updateToken(token);
        },
        "expired-callback": () => {
          updateToken("");
          if (ref.current && window.turnstile) {
            window.turnstile.reset(ref.current);
          }
        },
        "error-callback": () => {
          updateToken("");
          if (ref.current && window.turnstile) {
            window.turnstile.reset(ref.current);
          }
        },
      });
      widgetIdRef.current = widgetId;
    } catch (e) {
      console.error("Turnstile render error:", e);
    }
  }, [ref, updateToken]);

  const resetTurnstile = useCallback(() => {
    if (!ref.current || !window.turnstile) {
      return;
    }
    window.turnstile.reset(ref.current);
  }, [ref]);

  useEffect(() => {
    if (window.turnstile && !widgetIdRef.current) {
      buildTurnstile();
    }
  }, [buildTurnstile]);

  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  return { buildTurnstile, resetTurnstile };
}
