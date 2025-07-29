import { NextResponse } from 'next/server';

// SSE endpoint disabled - using Pusher for real-time updates instead
export async function GET() {
  return NextResponse.json(
    { error: 'SSE endpoint disabled - use Pusher for real-time updates' },
    { status: 410 } // Gone - this endpoint is no longer available
  );
} 