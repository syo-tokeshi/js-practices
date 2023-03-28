import fs from "fs";

export class Repository {
  constructor(repositoryFile) {
    this.repositoryFile = repositoryFile;
  }

  load() {
    const jsonFile = fs.readFileSync(this.repositoryFile, "utf8");
    const fileContent = JSON.parse(jsonFile);
    return fileContent;
  }

  save(fileContent) {
    const jsonData = JSON.stringify(fileContent);
    fs.writeFileSync(this.repositoryFile, jsonData);
  }
}
