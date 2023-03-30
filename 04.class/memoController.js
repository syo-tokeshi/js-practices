import { MemoModel } from "./memoModel.js";
import readline from "node:readline";
import enquirer from "enquirer";
const { Select } = enquirer;

export class MemoController {
  constructor(repositoryFile) {
    this.memoModel = new MemoModel(repositoryFile);
  }

  allMemos() {
    if (this.memoModel.isEmpty()) return console.log(`メモは現在ございません。😭`);
    const memos = this.memoModel.load();
    const memoTitles = this.memoModel.loadTitles(memos);
    console.log("\n[メモ一覧]");
    for (const memo of memoTitles) {
      console.log(memo);
    }
  }

  async showMemo() {
    if (this.memoModel.isEmpty()) return console.log(`メモは現在ございません。😭`);
    const prompt = new Select({
      message: "本文を表示したいメモを選んでください😊\n",
      choices: this.memoModel.load(),
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
    const readlineInterface = this.#createReadlineInterface();
    const stdinlines = this.#receiveStdin(readlineInterface);
    readlineInterface.on("close", () => {
      if (this.#isStdinlinesEmpty(stdinlines)) {
        return console.log(`\nメモの作成が中断されました`);
      }
      this.memoModel.saveStdin(readlineInterface, stdinlines);
      console.log(`\nメモが新規作成されました😊`);
    });
  }

  async deleteMemo() {
    if (this.memoModel.isEmpty()) return console.log(`メモは現在ございません。😭`);
    const memos = this.memoModel.load();
    const deepCopyMemos = memos.map((memo) => ({ ...memo }));
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
        `\n${memos[deletedMemoIndex].title}のメモを削除致しました🙇‍`
      );
      memos.splice(deletedMemoIndex, 1);
      this.memoModel.saveMemos(memos);
    } catch (e) {
      console.error(e);
    }
  }

  #createReadlineInterface = () => {
    process.stdin.resume();
    process.stdin.setEncoding("utf8");
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return reader;
  };

  #receiveStdin = (reader) => {
    const lines = [];
    reader.on("line", (line) => {
      lines.push(line);
    });
    return lines;
  };

  #isStdinlinesEmpty(stdinlines) {
    return stdinlines.length === 0;
  }
}
