import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE,
  process.env.SUPA_KEY
);
