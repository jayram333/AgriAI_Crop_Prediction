import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_PUBLISHABLE_KEY') ?? '',
    )

    const { email, password, aadharNumber, loginMethod = 'email' } = await req.json()

    let loginEmail = email;
    
    // Handle Aadhar-based login
    if (loginMethod === 'aadhar') {
      if (!aadharNumber || !/^\d{12}$/.test(aadharNumber)) {
        return new Response(
          JSON.stringify({ status: 'error', message: 'Valid 12-digit Aadhar number is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      loginEmail = `${aadharNumber}@aadhar.local`;
    } else {
      // Email validation for email-based login
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(
          JSON.stringify({ status: 'error', message: 'Valid email is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    if (!password) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Password is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Authenticate user
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: loginEmail,
      password,
    })

    if (error) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Invalid email or password' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({
        status: 'success',
        message: 'Login successful',
        userId: data.user.id,
        token: data.session.access_token,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ status: 'error', message: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})