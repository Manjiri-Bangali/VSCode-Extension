// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { generateUnitTests } from "./generate";
import { readFileContents, writeToFile } from "./utils/file";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "mtg" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "mtg.testGenerate",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const fileRegex: RegExp = /\.[0-9a-z]+$/i;
      const filePath: string | undefined =
        vscode.window.activeTextEditor?.document.fileName;
      const fileParts: Array<string> = filePath ? filePath.split("/") : [];
      const fileName: string = fileParts[fileParts.length - 1];
      fileParts.pop();
      const currentDirectory = fileParts.join("/");
      const ext = fileName.match(fileRegex);
      console.log("Extension ->", ext![0]);
      if (filePath && ext && (ext[0] === ".js" || ext[0] === ".ts")) {
        vscode.window.showInformationMessage(
          `Unit test generation is in process. Please wait....`
        );
        const code = await readFileContents(filePath);
        const content = await generateUnitTests(filePath, code);
        content && (await writeToFile(currentDirectory, fileName, content));
        vscode.window.showInformationMessage(
          `Unit test generated successfully.`
        );
      } else {
        vscode.window.showErrorMessage(
          "Not a valid file for unit test generation."
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
