const args = require("minimist")(process.argv.slice(2));
const today = new Date();
const month = args.m || today.getMonth() + 1;
const year = args.y || today.getFullYear();
const correctionValue = 1;
const startDate = new Date(year, month - correctionValue);
const endDate = new Date(year, month, 0);
const defaultSpaceValue = "   ";
const rightJustifiedValue = 2;

console.log(`     ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
const defaultSpace = defaultSpaceValue.repeat(startDate.getDay());
process.stdout.write(defaultSpace);
for (
  startDate;
  startDate <= endDate;
  startDate.setDate(startDate.getDate() + 1)
) {
  let day = String(startDate.getDate()).padStart(
    rightJustifiedValue,
    defaultSpaceValue
  );
  if (startDate.getDay() == 6) {
    console.log(day);
  } else {
    process.stdout.write(`${day} `);
  }
}
