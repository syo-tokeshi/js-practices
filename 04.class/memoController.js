#!/usr/bin/env node
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
    const memoTitles = this.memoModel.loadMemoTitles(this.memos);
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
    this.memoModel.writeStdin(
      readlineInterface,
      stdinlines,
      this.memos,
      this.repository
    );
  }

  async deleteMemo() {
    const Memos = this.memos;
    if (Memos.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    const deepCopyMemos = Memos.map((memo) => ({ ...memo }));
    const deletePrompt = this.memoModel.createDeletePrompt(deepCopyMemos);
    try {
      const deletedMemoIndex = await deletePrompt.run();
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
