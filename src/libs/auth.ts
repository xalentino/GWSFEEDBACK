import { betterAuth } from "better-auth";
import { dbpool } from "./database";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { guest, staff, owner, developer, admin as administration, contributor, perms } from "./permissions";
import { createAuthMiddleware } from "better-auth/api";

const getSocialProviders = () => {
  if (process.env.DISCORD_CLIENT_ID && process.env.DISCORD_CLIENT_SECRET) {
    return {
      discord: {
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        scope: ["identify", "email", "guilds.members.read"],
      }
    };
  }
  
  if (process.env.ROBLOX_CLIENT_ID && process.env.ROBLOX_CLIENT_SECRET) {
    return {
      roblox: {
        clientId: process.env.ROBLOX_CLIENT_ID,
        clientSecret: process.env.ROBLOX_CLIENT_SECRET,
      }
    };
  }
  
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    return {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }
    };
  }
  
  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    return {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      }
    };
  }
  
  throw new Error("No OAuth providers configured in environment variables");
};

export const auth = betterAuth({
  database: dbpool,
  socialProviders: getSocialProviders(),
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/error") {
        if (ctx.query && "error" in ctx.query && ctx.query.error === "banned") {
          throw ctx.redirect(`https://zipline.bloxhillstores.co.uk/xsNF3y.mp4`);
        }
      }
    })
  },
  plugins: [
    nextCookies(),
    admin({
      perms,
      defaultRole: "guest",
      roles: {
        guest,
        admin: administration,
        owner,
        staff,
        developer,
        contributor
      },
      adminRoles: ["owner", "admin"],
    }),
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "guest",
      },
    }
  }
});