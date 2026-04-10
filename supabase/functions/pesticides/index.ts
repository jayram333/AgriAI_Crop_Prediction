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

    // Extract JWT token from Authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Unauthorized access. Please log in.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const token = authHeader.substring(7)

    // Verify the JWT token
    const { data: { user }, error } = await supabaseClient.auth.getUser(token)
    
    if (error || !user) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Unauthorized access. Please log in.' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Return pesticide information
    const pesticideData = {
      status: 'success',
      pesticides: {
        Insecticides: {
          description: 'Kill or control insects that damage crops.',
          examples: ['Organophosphates', 'Nicotinoids', 'Carbamates', 'Fumigants']
        },
        Herbicides: {
          description: 'Target weeds and other unwanted plants.',
          examples: ['Glyphosate (used on corn, soybeans, cotton)']
        },
        Fungicides: {
          description: 'Prevent or halt fungi growth causing crop diseases like mildew.',
          examples: []
        },
        Bactericides: {
          description: 'Prevent bacterial growth on crops.',
          examples: []
        },
        SpecificExamples: {
          Glyphosate: 'Common herbicide used on corn, soybeans, cotton.',
          Acephate: 'Synthetic insecticide used in agriculture.',
          'Organophosphates & Nicotinoids': 'Used to control insects on various crops.',
          SystemicPesticides: 'Absorbed by plants and found in fruits/vegetables (e.g., used on mango, guava, brinjal, tomato).'
        }
      }
    }

    return new Response(
      JSON.stringify(pesticideData),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ status: 'error', message: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})