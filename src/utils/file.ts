import * as fs from "fs";
import { promisify } from "util";

const readFileAsync = promisify(fs.readFile);

export async function readFileContents(filePath: string) {
  try {
    return await readFileAsync(filePath, "utf-8");
  } catch (error) {
    throw new Error(`Not able to read file because of ${error}`);
  }
}

export async function writeToFile(
  directory: string,
  fileName: string,
  data: string
) {
  const testFileName: string = fileName.split(".").join(".test.");
  const path: string = `${directory}/${testFileName}`;
  data.replace("```", "");
  console.log("Data ->", data);
  try {
    await fs.promises.writeFile(path, data);
    console.log("Successfully written to new file");
  } catch (error) {
    throw new Error(`Error in writing to new file because of: ${error}`);
  }
}
