import { SubtitleFile } from "./subtitle-file";
import { parse, stringify } from "ass-compiler";

export class SubtitleStyleModifier {
  private subtitleFile;
  private _content;

  constructor(subtitleFile: SubtitleFile) {
    this.subtitleFile = subtitleFile;
    this._content = parse(this.subtitleFile.read());
  }

  get content() {
    return this._content;
  }

  get styles() {
    return this.content.styles.style;
  }

  get styleNames() {
    return this.styles.map((style) => style.Name);
  }

  replaceFont(styleNames: string[], fontName: string) {
    styleNames.map((styleName) => {
      this.styles.map((style) => {
        if (style.Name === styleName) style.Fontname = fontName;
      });
    });
  }

  save() {
    this.subtitleFile.write(stringify(this.content));
  }
}
