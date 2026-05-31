import { NextResponse } from 'next/server';

export async function GET() {
  const providers = {
    discord: !!(process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET),
    google: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    roblox: !!(process.env.ROBLOX_CLIENT_ID && process.env.ROBLOX_CLIENT_SECRET),
    github: !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
  };
  
  return NextResponse.json(providers);
}