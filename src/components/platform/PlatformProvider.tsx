import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { loadPlatformContext, type PlatformContext } from "@/lib/platform";

type Value = {
  ctx: PlatformContext | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const Ctx = createContext<Value>({ ctx: null, loading: true, refresh: async () => {} });

export function usePlatform() {
  return useContext(Ctx);
}

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [ctx, setCtx] = useState<PlatformContext | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const next = await loadPlatformContext();
    setCtx(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return <Ctx.Provider value={{ ctx, loading, refresh }}>{children}</Ctx.Provider>;
}
