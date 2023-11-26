import { Configuration, OpenAIApi } from "openai";
import * as vscode from "vscode";

let orange = vscode.window.createOutputChannel("Orange");
orange.appendLine(`Token: ${process.env.OPENAI_TOKEN}, ${process.env}`);

const configuration = new Configuration({
  apiKey: process.env.OPENAI_TOKEN,
});
const openai = new OpenAIApi(configuration);
const UNIT_TEST_REQUEST = (path: string, code: string) =>
  `Generate a unit test with the jest syntax, containing relevant assertions and required packages in a single 'describe' block. Import the functions from ${path} and use them to test the following code snippet: ${code}.`;

export async function generateUnitTests(path: string, code: string) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: UNIT_TEST_REQUEST(path, code),
        },
      ],
      temperature: 0,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      max_tokens: 1000,
    });
    console.log("Response -->", response);
    const { message } = response.data.choices[0];
    return message?.content;
  } catch (error) {
    throw new Error(`Error generating unit tests from AI because of: ${error}`);
  }
}
