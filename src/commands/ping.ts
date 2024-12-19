import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { openai } from "../config";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong!");

const prompt = `
  Instructions:
  - Given the following description, generate an output.
  - Emphatic exclamations that convey strong emotions or judgments. These exclamations are typically used to underscore viewpoints, rally support, or criticize opponents and media. They tend to be short, impactful words or phrases, often in all caps to increase emphasis. The exclamations are usually between 1 and 3 words long.
  - Return only the generated output, with anywhere from 1 to 10 (inclusive) exclamation marks at the end.
Input:\n
  `;

export async function execute(interaction: CommandInteraction) {
  console.log(interaction.channel?.lastMessageId);
  const lastMessageId = interaction.channel?.lastMessageId;
  const help = await interaction.channel?.messages.fetch(lastMessageId);
  /*const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "Write a haiku about recursion in programming.",
      },
    ],
  });
  const response = completion.choices[0].message.content;*/
  return interaction.reply(help);
}
