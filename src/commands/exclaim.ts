import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { openai } from "../config";

export const data = new SlashCommandBuilder()
  .setName("exclaim")
  .setDescription("Exclaim!");

const prompt = `
  Instructions:
  - Given the following description, generate an output.
  - Emphatic exclamations that convey strong emotions or judgments. They tend to be short, impactful words or phrases, often in all caps to increase emphasis.
  - Return only the generated output, with anywhere from 1 (inclusive) exclamation marks at the end.
  - You're scaring the hoes by saying unbelievable too much.
  - Do not answer unbelievable
  - Be unhinged pretty please bestie slay
  Input:\n
  `;

export async function execute(interaction: CommandInteraction) {
  const lastMessageId = (interaction.channel as any)?.lastMessageId as string;
  const help = interaction.channel?.messages.fetch(lastMessageId);
  const messageContent = (help as any)?.content;
  if (messageContent === "" && messageContent === undefined) {
    interaction.reply("Nothing!");
    return;
  }

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
  if (response === null) {
    interaction.reply("Nothing!");
    return;
  }
  return interaction.reply(response);
}
