import { MemoModel } from "./memoModel.js";
import enquirer from "enquirer";
const { Select } = enquirer;

export class MemoController {
  constructor(repositoryFile) {
    this.memoModel = new MemoModel(repositoryFile);
    this.memos = this.memoModel.loadMemos();
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
    const prompt = new Select({
      message: "本文を表示したいメモを選んでください😊\n",
      choices: this.memos,
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
    const readlineInterface = this.memoModel.createReadlineInterface();
    const stdinlines = this.memoModel.receiveStdin(readlineInterface);
    readlineInterface.on("close", () => {
    if (stdinlines.length !== 0) {
      this.memoModel.saveStdin(readlineInterface, stdinlines);
      console.log(`\nメモが新規作成されました😊`);
    } else {
      console.log(`\nメモの作成が中断されました`);
    }
    });
  }

  async deleteMemo() {
    const memos = this.memos;
    if (memos.length === 0) {
      return console.log(`メモは現在ございません。😭`);
    }
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
}
