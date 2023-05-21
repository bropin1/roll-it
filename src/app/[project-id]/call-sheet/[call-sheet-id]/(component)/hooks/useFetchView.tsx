"use client";
import { useState, useEffect, useCallback } from "react";
import { Database } from "@/common/lib/database.types";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";

type ViewNames = keyof Database["public"]["Views"];

export default function useFetchView<T extends ViewNames>(viewName: T) {
  type FetchedData<T extends ViewNames> = {
    [K in keyof Database["public"]["Views"][T]["Row"]]: Database["public"]["Views"][T]["Row"][K];
  }[];

  const [data, setData] = useState<FetchedData<T>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: fetchData, error } = await supabase.from(viewName).select();
      if (error) throw error;
      setData(fetchData);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [viewName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
