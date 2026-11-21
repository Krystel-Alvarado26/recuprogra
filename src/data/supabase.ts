import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://osjzzaiuoktzhaumbnux.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_h4ucS2r_--VubZHSrKRraw_LxtZRsN-';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


