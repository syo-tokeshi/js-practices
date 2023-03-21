#!/usr/bin/env nod
import { JsonFile } from "./JsonFile.js";
import readline from "node:readline";
import enquirer from "enquirer";
const { Select } = enquirer;

export class MemoController {
  constructor() {
    this.jsonFile = new JsonFile();
    this.Memos = this.jsonFile.load();
  }

  allMemos() {
    if (this.Memos.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    const memoTitles = [];
    for (const memo of this.Memos) {
      memoTitles.push(memo.title);
    }
    console.log("\n[メモ一覧]");
    for (const memo of memoTitles) {
      console.log(memo);
    }
  }

  async showMemo() {
    if (this.Memos.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    const prompt = new Select({
      message: "本文を表示したいメモを選んでください😊\n",
      choices: this.Memos,
      result() {
        return this.focused.content;
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
      const newMemo = { title: title, content: lines.join("\n") };
      this.Memos.push(newMemo);
      this.jsonFile.write(this.Memos);
      console.log(`メモが新規作成されました😊`);
    });
  }

  async deleteMemo() {
    const Memos = this.Memos;
    const deepCopyMemos = Memos.map((memo) => ({ ...memo }));

    if (Memos.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    const prompt = new Select({
      message: "削除したいメモをお選び下さい😭",
      choices: deepCopyMemos,
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
      console.log(
        `\n${Memos[deletedMemoIndex].title}のメモを削除致しました🙇‍`
      );
      Memos.splice(deletedMemoIndex, 1);
      this.jsonFile.write(Memos);
    } catch (e) {
      console.error(e);
    }
  }
}
