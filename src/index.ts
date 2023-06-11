import path from "path";
import { SubtitleFileScanner } from "./subtitle-file-scanner";
import { checkbox, input } from "@inquirer/prompts";
import { existsSync } from "fs";
import { SubtitleStyleModifier } from "./subtitle-style-modifier";

main();

async function main() {
  const filesPath = await input({
    message: "请输入字幕文件所在的目录",
    default: path.resolve(__dirname, "../subtitles"),
    validate: existsSync,
  });
  const files = new SubtitleFileScanner(filesPath).scan();
  const modifiers = files.map((file) => new SubtitleStyleModifier(file));
  const styleNames = union(...modifiers.map((modifier) => modifier.styleNames));
  const styleNamesToReplace = await checkbox<string>({
    message: "请选择你想修改的样式名称",
    choices: styleNames.map((styleName) => ({
      name: styleName,
      value: styleName,
    })),
  });
  const fontNameToReplace = await input({
    message: "请输入你想修改的字体名称",
    default: "微软雅黑",
  });
  modifiers.map((modifier) => {
    modifier.replaceFont(styleNamesToReplace, fontNameToReplace);
    modifier.save();
  });
}

function union(...arrays: any[]) {
  const set = new Set([].concat(...arrays));
  return Array.from(set);
}
