"use-client";

import { createClient } from "@supabase/supabase-js";
import { Database } from "../lib/database.types";
// const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL!;
// const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY!;

const SUPABASE_URL = "https://kasxpogilaplulkhanpp.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthc3hwb2dpbGFwbHVsa2hhbnBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5NjYxNjcsImV4cCI6MTk5OTU0MjE2N30.gqBpna4xXMQJsTsi5Qpqst2BVyRDI_gNPXv77or1v9k";

if (!SUPABASE_URL) {
  throw new Error(
    "REACT_APP_SUPABASE_URL is required. Please provide it in the .env file or through your hosting platform's environment variable management."
  );
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
