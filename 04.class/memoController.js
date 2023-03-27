#!/usr/bin/env node

import readline from "node:readline";
import enquirer from "enquirer";
const { Select } = enquirer;
import { MemoModel } from "./memoModel.js";

export class MemoController {
  constructor(Repository) {
    this.repository = new Repository();
    this.memoModel = new MemoModel();
    this.memos = this.repository.load();
  }

  allMemos() {
    if (this.memos.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    const memoTitles = this.memoModel.loadMemoTitles(this.memos)
    console.log("\n[メモ一覧]");
    for (const memo of memoTitles) {
      console.log(memo);
    }
  }

  async showMemo() {
    if (this.memos.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    try {
      const memoText = await this.memoModel.selectMemo(this.memos);
      console.log(`\n[内容]\n${memoText}`);
    } catch (e) {
      console.error(e);
    }
  }

  createMemo() {
    const readlineInterface = this.memoModel.createReadlineInterface();
    const stdinlines = this.memoModel.receiveStdin(readlineInterface);
    this.memoModel.writeStdin(readlineInterface, stdinlines, this.memos, this.repository);
  }

  async deleteMemo() {
    const Memos = this.memos;
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
