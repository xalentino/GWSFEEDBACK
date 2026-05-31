import { Provider } from "@/types/types";
import axios from 'axios';
import toast from "react-hot-toast";

export function resolveOAuthServer(): Provider {
  const providers = {
    discord: !!(process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET),
    google: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    roblox: !!(process.env.ROBLOX_CLIENT_ID && process.env.ROBLOX_CLIENT_SECRET),
    github: !!(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
  };
  
  const configured = Object.entries(providers).filter(([, enabled]) => enabled);
  
  if (configured.length === 0) {
    throw new Error("No OAuth providers configured");
  }
  
  if (configured.length > 1) {
    throw new Error(`Only one OAuth provider is supported, but found: ${configured.map(([name]) => name).join(", ")}`);
  }
  
  return configured[0][0] as Provider;
}

export async function resolveOAuthClient(): Promise<Provider | null> {
  try {
    const response = await axios.get('/api/auth/providers');
    const providers = response.data;
    
    const configured = Object.entries(providers).filter(([, enabled]) => enabled);
    
    if (configured.length === 0) {
      toast.error("No OAuth providers configured. Please contact the administrator.");
      return null;
    }
    
    if (configured.length > 1) {
      toast.error("Multiple OAuth providers configured. Please configure only one.");
      return null;
    }
    
    return configured[0][0] as Provider;
  } catch (error) {
    toast.error("Failed to load OAuth configuration");
    console.error(error);
    return null;
  }
}