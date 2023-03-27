#!/usr/bin/env node
import enquirer from "enquirer";
const { Select } = enquirer;
import readline from "node:readline";
import { Repository } from "./repository.js";

export const loadMemoTitles = (memos) => {
  return memos.map((memo) => memo.title);
};

export const selectMemo = (memos) => {
  const prompt = new Select({
    message: "本文を表示したいメモを選んでください😊\n",
    choices: memos,
    result() {
      return this.focused.content;
    },
    footer() {
      return "\n十字キーを上下する事で全てのメモから選択できます";
    },
  });
  return prompt.run();
};

export const createReadlineInterface = () => {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return reader;
};

export const receiveStdin = (reader) => {
  const lines = [];
  reader.on("line", (line) => {
    lines.push(line);
  });
  return lines;
};

export const saveStdin = (readlineInterface, stdinlines) => {
  readlineInterface.on("close", () => {
    if (stdinlines.length !== 0) {
      const title = stdinlines.shift();
      const newMemo = { title: title, content: stdinlines.join("\n") };
      const memos = Repository.load();
      memos.push(newMemo);
      Repository.save(memos);
      console.log(`\nメモが新規作成されました😊`);
    } else {
      console.log(`\nメモの作成が中断されました`);
    }
  });
};

export const createDeletePrompt = (deepCopyMemos) => {
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
  return prompt;
};
