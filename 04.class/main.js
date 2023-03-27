#!/usr/bin/env node

import minimist from "minimist";
import { MemoController } from "./MemoController.js";
import { Repository } from "./repository.js";

const main = () => {
  const argv = minimist(process.argv.slice(2));
  const memoController = new MemoController(Repository);
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
