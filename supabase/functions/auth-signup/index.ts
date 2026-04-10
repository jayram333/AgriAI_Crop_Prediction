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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { 
      fullName, 
      email, 
      password, 
      phoneNumber, 
      farmLocation, 
      preferredLanguage = 'English',
      aadharNumber,
      registrationMethod = 'email'
    } = await req.json()

    // Validation
    if (!fullName || fullName.length < 3) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Full name must be at least 3 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Full name can only contain letters and spaces' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Email validation (for both email and aadhar-based registrations)
    if (!email) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Email identifier is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Aadhar validation for aadhar-based registration
    if (registrationMethod === 'aadhar') {
      if (!aadharNumber || !/^\d{12}$/.test(aadharNumber)) {
        return new Response(
          JSON.stringify({ status: 'error', message: 'Valid 12-digit Aadhar number is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    } else {
      // Standard email validation for email-based registration
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(
          JSON.stringify({ status: 'error', message: 'Valid email is required' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    if (!password || password.length < 6) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Password must be at least 6 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!phoneNumber) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Phone number is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!/^\+?[1-9]\d{9,14}$/.test(phoneNumber)) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Invalid phone number format' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabaseClient.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        full_name: fullName,
        phone: phoneNumber,
        farm_location: farmLocation,
        preferred_language: preferredLanguage,
        registration_method: registrationMethod,
        ...(registrationMethod === 'aadhar' && { aadhar_number: aadharNumber })
      },
      email_confirm: registrationMethod === 'email',
    })

    if (authError) {
      if (authError.message.includes('already registered')) {
        return new Response(
          JSON.stringify({ status: 'error', message: 'Email already exists' }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      throw authError
    }

    // Generate session token
    const { data: sessionData, error: sessionError } = await supabaseClient.auth.admin.generateAccessToken(authData.user.id)
    
    if (sessionError) throw sessionError

    return new Response(
      JSON.stringify({
        status: 'success',
        message: 'Account created successfully',
        userId: authData.user.id,
        token: sessionData.access_token,
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