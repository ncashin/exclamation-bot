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

const prompt = `  
Generate a single impactful word that supports the sentiment of the input below. The output should capture the essence or emotional tone of the message. For instance, a threatening message should end with a word that conveys threat.

- The resulting word should be in all caps to emphasize emotion.
- Include between 1 and 10 exclamation marks at the end, to further convey sentiment strength.
- The output should directly align with the author's sentiment or intent shown in the message.
Input:
  He’s spent the last few weeks hitting tricks on the scooter. Wont do any work, just the scooter. He says they can’t fire him because they can’t catch him
`

const aiCall = async () => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  console.log(completion.choices[0].message);
};
aiCall();
