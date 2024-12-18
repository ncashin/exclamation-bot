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

const aiCall = async () => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Write a haiku about recursion in programming.",
      },
    ],
  });
  console.log(completion.choices[0].message);
};
aiCall();
