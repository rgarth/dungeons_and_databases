import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check environment variables (without exposing sensitive values)
    const envCheck = {
      NEXT_PUBLIC_PUSHER_KEY: {
        exists: !!process.env.NEXT_PUBLIC_PUSHER_KEY,
        length: process.env.NEXT_PUBLIC_PUSHER_KEY?.length || 0,
        startsWith: process.env.NEXT_PUBLIC_PUSHER_KEY?.substring(0, 4) || 'N/A',
        isPlaceholder: process.env.NEXT_PUBLIC_PUSHER_KEY === 'your-pusher-key-here' || 
                      process.env.NEXT_PUBLIC_PUSHER_KEY === 'SET' ||
                      process.env.NEXT_PUBLIC_PUSHER_KEY === ''
      },
      NEXT_PUBLIC_PUSHER_CLUSTER: {
        exists: !!process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        value: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'NOT_SET'
      },
      PUSHER_APP_ID: {
        exists: !!process.env.PUSHER_APP_ID,
        length: process.env.PUSHER_APP_ID?.length || 0,
        isPlaceholder: process.env.PUSHER_APP_ID === 'your-pusher-app-id-here' ||
                      process.env.PUSHER_APP_ID === ''
      },
      PUSHER_SECRET: {
        exists: !!process.env.PUSHER_SECRET,
        length: process.env.PUSHER_SECRET?.length || 0,
        isPlaceholder: process.env.PUSHER_SECRET === 'your-pusher-secret-here' ||
                      process.env.PUSHER_SECRET === ''
      }
    };

    // Check if all required variables are properly set
    const allValid = Object.values(envCheck).every(check => {
      if ('isPlaceholder' in check) {
        return check.exists && !check.isPlaceholder;
      }
      return check.exists;
    });

    return NextResponse.json({
      status: allValid ? 'OK' : 'CONFIGURATION_ERROR',
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      envCheck,
      recommendations: allValid ? [] : [
        'Check Vercel environment variables in the dashboard',
        'Ensure NEXT_PUBLIC_PUSHER_KEY is set to your actual Pusher key',
        'Ensure PUSHER_APP_ID is set to your actual Pusher app ID',
        'Ensure PUSHER_SECRET is set to your actual Pusher secret',
        'Ensure NEXT_PUBLIC_PUSHER_CLUSTER is set to your Pusher cluster (e.g., us2, ap1)',
        'Redeploy after setting environment variables'
      ]
    });
  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 