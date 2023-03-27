#!/usr/bin/env node
import {
  loadMemoTitles,
  selectMemo,
  createReadlineInterface,
  receiveStdin,
  saveStdin,
  createDeletePrompt,
} from "./memoModel.js";
import { Repository } from "./repository.js";

export class MemoController {
  constructor(Repository) {
    this.memos = Repository.load();
  }

  allMemos() {
    if (this.memos.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    const memoTitles = loadMemoTitles(this.memos);
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
      const memoText = await selectMemo(this.memos);
      console.log(`\n[内容]\n${memoText}`);
    } catch (e) {
      console.error(e);
    }
  }

  createMemo() {
    const readlineInterface = createReadlineInterface();
    const stdinlines = receiveStdin(readlineInterface);
    saveStdin(
      readlineInterface,
      stdinlines
    );
  }

  async deleteMemo() {
    const Memos = this.memos;
    if (Memos.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
    const deepCopyMemos = Memos.map((memo) => ({ ...memo }));
    const deletePrompt = createDeletePrompt(deepCopyMemos);
    try {
      const deletedMemoIndex = await deletePrompt.run();
      console.log(
        `\n${Memos[deletedMemoIndex].title}のメモを削除致しました🙇‍`
      );
      Memos.splice(deletedMemoIndex, 1);
      Repository.save(Memos);
    } catch (e) {
      console.error(e);
    }
  }
}
