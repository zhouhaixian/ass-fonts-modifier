import { existsSync, readFileSync, writeFileSync } from "fs";

export class SubtitleFile {
  private _path;

  get path() {
    return this._path;
  }

  constructor(path: string) {
    if (existsSync(path)) {
      this._path = path;
    } else {
      throw new Error(`File path "${this.path}" does not exist`);
    }
  }

  read() {
    return readFileSync(this.path, "utf16le");
  }

  write(content: string) {
    writeFileSync(this.path, content, "utf16le");
  }
}
