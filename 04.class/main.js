#!/usr/bin/env node
import minimist from "minimist";
import { MemoController } from "./memoController.js";
const repositoryFile = "memos.json";
const main = () => {
  const argv = minimist(process.argv.slice(2));
  const memoController = new MemoController(repositoryFile);
  if (argv.l) {
    memoController.allMemos();
  } else if (argv.r) {
    memoController.showMemo();
  } else if (argv.d) {
    memoController.deleteMemo();
  } else {
    memoController.createMemo();
  }
};

main();
