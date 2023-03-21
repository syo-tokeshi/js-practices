import fs from "fs";
export class JsonFile {
  load() {
    const jsonFile = fs.readFileSync("memos.json", "utf8");
    const fileContent = JSON.parse(jsonFile);
    return fileContent;
  }

  write(fileContent) {
    const jsonData = JSON.stringify(fileContent);
    fs.writeFileSync("memos.json", jsonData);
  }
}
