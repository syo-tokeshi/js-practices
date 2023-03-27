#!/usr/bin/env node

import readline from "node:readline";
import enquirer from "enquirer";
const { Select } = enquirer;
import { MemoModel } from "./memoModel.js";

export class MemoController {
  constructor(Repository) {
    this.repository = new Repository();
    this.memoModel = new MemoModel();
    this.Memos = this.repository.load();
  }

  allMemos() {
    if (this.Memos.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    const memoTitles = this.memoModel.loadMemoTitles(this.Memos)
    console.log("\n[メモ一覧]");
    for (const memo of memoTitles) {
      console.log(memo);
    }
  }

  async showMemo() {
    if (this.Memos.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    try {
      const memoText = await this.memoModel.selectMemoList(this.Memos);
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
      if (lines.length !== 0) {
        const title = lines.shift();
        const newMemo = { title: title, content: lines.join("\n") };
        this.Memos.push(newMemo);
        this.repository.write(this.Memos);
        console.log(`\nメモが新規作成されました😊`);
      }else{
        console.log(`\nメモの作成が中断されました`);
      }
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
      this.repository.write(Memos);
    } catch (e) {
      console.error(e);
    }
  }
}
