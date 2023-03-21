#!/usr/bin/env nod
import { JsonFile } from "./JsonFile.js";
import readline from "node:readline";
import enquirer from "enquirer";
const { Select } = enquirer;

export class MemoController {
  constructor() {
    this.jsonFile = new JsonFile();
    this.fileContent = this.jsonFile.load();
  }

  allMemos() {
    if (this.fileContent.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    const memoTitles = [];
    for (const memo of this.fileContent) {
      memoTitles.push(memo.title);
    }
    console.log("\n[メモ一覧]");
    for (const memo of memoTitles) {
      console.log(memo);
    }
  }

  async showMemo() {
    if (this.fileContent.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    const prompt = new Select({
      message: "本文を表示したいメモを選んでください😊\n",
      choices: this.fileContent,
      result() {
        return this.focused.text;
      },
      footer() {
        return "\n十字キーを上下する事で全てのメモから選択できます";
      },
    });
    try {
      const memoText = await prompt.run();
      console.log(`\n[内容]\n${memoText}`);
    } catch (e) {
      console.error(e);
    }
  }

  createMemo() {
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    const lines = [];
    reader.on("line", (line) => {
      lines.push(line);
    });
    reader.on("close", () => {
      const title = lines.shift();
      const newMemo = { title: title, text: lines.join("\n") };
      this.fileContent.push(newMemo);
      this.jsonFile.write(this.fileContent);
      console.log(`メモが新規作成されました😊`);
    });
  }

  async deleteMemo() {
    if (this.fileContent.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    const prompt = new Select({
      message: "削除したいメモをお選び下さい😭",
      choices: this.fileContent,
      result() {
        const deletedMemoIndex = this.index.toString();
        return deletedMemoIndex;
      },
      footer() {
        return "\n十字キーを上下する事で全てのメモから選択できます";
      },
    });
    try {
      const deletedMemoIndex = await prompt.run();
      const fileContent = this.fileContent;
      console.log(
        `\n${fileContent[deletedMemoIndex].title}のメモを削除致しました🙇‍`
      );
      fileContent.splice(deletedMemoIndex, 1);
      this.jsonFile.write(fileContent);
    } catch (e) {
      console.error(e);
    }
  }
}
