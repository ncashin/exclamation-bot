import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { openai } from "../config";

export const data = new SlashCommandBuilder()
  .setName("exclaim")
  .setDescription("Respond!");

export async function execute(interaction: CommandInteraction) {
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
  console.log(completion.choices[0]);
  return interaction.reply("Pong!");
}
