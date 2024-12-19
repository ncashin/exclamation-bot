import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { openai } from "../config";

export const data = new SlashCommandBuilder()
  .setName("exclaim")
  .setDescription("Exclaim!");

const prompt = `
  Instructions:
  - Given the following description, generate an output.
  - Emphatic exclamations that convey strong emotions or judgments. These exclamations are typically used to underscore viewpoints, rally support, or criticize opponents and media. They tend to be short, impactful words or phrases, often in all caps to increase emphasis. The exclamations are usually between 1 and 3 words long.
  - Return only the generated output, with anywhere from 1 (inclusive) exclamation marks at the end.
Discord
Input:\n
  `;

export async function execute(interaction: CommandInteraction) {
  const lastMessageId = interaction.channel?.lastMessageId;
  const help = interaction.channel?.messages.fetch(lastMessageId);
  const messageContent = help?.content;
  if (messageContent.length() === 0) {
    interaction.reply("Nothing!");
  }
  console.log(messageContent);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt + messageContent,
      },
    ],
  });
  const response = completion.choices[0].message.content;
  return interaction.reply(response);
}
