#!/usr/bin/env node
import enquirer from "enquirer";
const { Select } = enquirer;
import readline from "node:readline";

export class MemoModel {
  loadMemoTitles = (Memos) => {
    return Memos.map((memo) => memo.title);
  };

  selectMemo = (Memos) => {
    const prompt = new Select({
      message: "本文を表示したいメモを選んでください😊\n",
      choices: Memos,
      result() {
        return this.focused.content;
      },
      footer() {
        return "\n十字キーを上下する事で全てのメモから選択できます";
      },
    });
    return prompt.run();
  };

  createReadlineInterface() {
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return reader;
  }

  receiveStdin = (reader) => {
    const lines = [];
    reader.on("line", (line) => {
      lines.push(line);
    });
    return lines;
  };

  writeStdin = (reader, stdinlines, memos, repository) => {
    reader.on("close", () => {
      if (stdinlines.length !== 0) {
        const title = stdinlines.shift();
        const newMemo = { title: title, content: stdinlines.join("\n") };
        memos.push(newMemo);
        repository.write(memos);
        console.log(`\nメモが新規作成されました😊`);
      } else {
        console.log(`\nメモの作成が中断されました`);
      }
    });
  };

  createDeletePrompt = (deepCopyMemos) => {
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
}
