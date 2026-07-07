import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server.
 * Required anywhere we touch `window`/measure the DOM during render-time effects
 * (the horizontal gallery, scroll math, etc.) — avoids SSR "window is not defined".
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
