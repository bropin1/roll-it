"use client";
import { useState, useEffect, useCallback } from "react";
import { Database } from "@/common/lib/database.types";
import { supabase } from "@/common/supabaseConfig/supabaseConfig";

type TableNames = keyof Database["public"]["Tables"];

export default function useFetchTable<T extends TableNames>(
  tableName: T,
  selectQuery?: string
) {
  // type FetchedData<T extends TableNames> = {
  //   [K in keyof Database["public"]["Tables"][T]["Row"]]: Database["public"]["Tables"][T]["Row"][K];
  // }[];

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: fetchData, error } = await supabase
        .from(tableName)
        .select(selectQuery);
      if (error) throw error;
      setData(fetchData);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
