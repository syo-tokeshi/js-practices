import readline from "node:readline";
import { Repository } from "./repository.js";

export class MemoModel {
  constructor(repositoryFile) {
    this.repository = new Repository(repositoryFile);
  }

  loadMemos = () => {
    return this.repository.load();
  };

  loadMemoTitles = (memos) => {
    return memos.map((memo) => memo.title);
  };

  saveMemos = (memos) => {
    return this.repository.save(memos);
  };

  createReadlineInterface = () => {
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return reader;
  };

  receiveStdin = (reader) => {
    const lines = [];
    reader.on("line", (line) => {
      lines.push(line);
    });
    return lines;
  };

  saveStdin = (readlineInterface, stdinlines) => {
    const title = stdinlines.shift();
    const newMemo = { title, content: stdinlines.join("\n") };
    const memos = this.repository.load();
    memos.push(newMemo);
    this.repository.save(memos);
  };

  isEmpty = () => {
    return this.loadMemos().length === 0;
  }
}
