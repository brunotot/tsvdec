import { exec } from "child_process";
import { promises as fs } from "fs";

const DEFAULT_PATTERN = "src/components/demo/*/*/*.{ts,tsx}";
let globPattern = process.argv[2] ?? "";
if (globPattern.startsWith("--")) globPattern = "";
globPattern = globPattern.length > 0 ? globPattern : DEFAULT_PATTERN;
const isSilent = process.argv.includes("--silent");
const command = `bash -c "shopt -s globstar; ls ${globPattern}"`;

function print(out, msg, ...args) {
  if (!isSilent) {
    out(msg, ...args);
  }
}

exec(command, (error, stdout, stderr) => {
  if (error) {
    print(console.error, `exec error: ${error}`);
    return;
  }
  if (stdout) {
    const files = stdout.split("\n").filter(Boolean);
    files.forEach(processFile);
  }
  if (stderr) {
    print(console.log, `stderr: ${stderr}`);
  }
});

async function processFile(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  if (!content.includes("export const CodeText")) {
    const newContent = `\n// prettier-ignore\nexport const CodeText =\n\`${content.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`;\n`;
    await fs.writeFile(filePath, content + newContent); // Append new content
    print(console.log, `Modified: ${filePath}`);
  } else {
    print(console.log, `Unchanged: ${filePath}`);
  }
}
