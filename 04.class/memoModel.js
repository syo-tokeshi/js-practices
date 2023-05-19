import { Repository } from "./repository.js";

export class MemoModel {
  constructor(repositoryFile) {
    this.repository = new Repository(repositoryFile);
  }

  load = () => {
    return this.repository.load();
  };

  loadTitles = (memos) => {
    return memos.map((memo) => memo.title);
  };

  isEmpty = () => {
    return this.load().length === 0;
  };

  save = (memos) => {
    return this.repository.save(memos);
  };

  saveStdin = (readlineInterface, stdinlines) => {
    const title = stdinlines.shift();
    const newMemo = { title, content: stdinlines.join("\n") };
    const memos = this.repository.load();
    memos.push(newMemo);
    this.repository.save(memos);
  };
}
