#!/usr/bin/env node
import minimist from "minimist";
import { MemoController } from "./memoController.js";

const repositoryFile = "memos.json";

const main = () => {
  const argv = minimist(process.argv.slice(2));
  const memoController = new MemoController(repositoryFile);
  if (argv.l) return memoController.allMemos();
  if (argv.r) return memoController.showMemo();
  if (argv.d) return memoController.deleteMemo();
  memoController.createMemo();
};

main();
