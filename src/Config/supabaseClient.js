import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jhoqqsmdvwptrxdseuie.supabase.co';
const supabaseKey = 'sb_publishable_k9nNfs0o_PDbxQ9Kn8W_hw_XYhoNhg2';

export const supabase = createClient(supabaseUrl, supabaseKey);
