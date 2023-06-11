import { existsSync, readdirSync } from "fs";
import path from "path";
import { SubtitleFile } from "./subtitle-file";

export class SubtitleFileScanner {
  private _subtitleFilesPath;

  get subtitleFilesPath() {
    return this._subtitleFilesPath;
  }

  constructor(subtitleFilesPath: string) {
    if (existsSync(subtitleFilesPath)) {
      this._subtitleFilesPath = subtitleFilesPath;
    } else {
      throw new Error(
        `Subtitle files path "${subtitleFilesPath}" does not exist`
      );
    }
  }

  scan() {
    const filesName = readdirSync(this.subtitleFilesPath);
    const subtitleFilesName = filesName.filter(
      (fileName) => path.extname(fileName) === ".ass"
    );
    return subtitleFilesName.map(
      (fileName) =>
        new SubtitleFile(path.resolve(this.subtitleFilesPath, fileName))
    );
  }
}
