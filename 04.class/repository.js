#!/usr/bin/env node
import fs from "fs";

export class Repository {
  static load() {
    const jsonFile = fs.readFileSync("memos.json", "utf8");
    const fileContent = JSON.parse(jsonFile);
    return fileContent;
  }

  static save(fileContent) {
    const jsonData = JSON.stringify(fileContent);
    fs.writeFileSync("memos.json", jsonData);
  }
}
