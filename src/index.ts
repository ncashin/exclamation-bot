import dotenv from "dotenv";
import OpenAI from "openai";
import { Client } from "discord.js";

dotenv.config();
const openai = new OpenAI();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
};

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});
client.once("ready", () => {
  console.log("Discord bot is ready! 🤖");
});