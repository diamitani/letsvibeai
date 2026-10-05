import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'You must be logged in to subscribe.' }, { status: 401 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ 
        message: 'Stripe is not configured yet. Please add STRIPE_SECRET_KEY to your environment variables.'
      });
    }

    // In a real app, initialize Stripe and create a checkout session
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.create({ ... });
    // return NextResponse.json({ url: session.url });

    return NextResponse.json({ 
      message: 'Stripe keys detected, but Checkout flow is pending final product prices.'
    });

  } catch (error: any) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
