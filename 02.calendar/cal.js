const args = require("minimist")(process.argv.slice(2));

const today = new Date();
const monthCorrectlyGetForValue = 1;
const month = args.m || today.getMonth() + monthCorrectlyGetForValue;
const year = args.y || today.getFullYear();
const startDate = new Date(year, month - monthCorrectlyGetForValue);
const getMonthEndForValue = 0;
const endDate = new Date(year, month, getMonthEndForValue);

const defaultSpace = "   ";
const rightJustifiedValue = 2;
const saturday = 6;

console.log(`     ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
const firstWeeksSpace = defaultSpace.repeat(startDate.getDay());
process.stdout.write(firstWeeksSpace);
for (
  const date = startDate;
  date <= endDate;
  date.setDate(date.getDate() + 1)
) {
  const formatted_day = String(date.getDate()).padStart(rightJustifiedValue);
  if (date.getDay() === saturday) {
    console.log(formatted_day);
  } else {
    process.stdout.write(`${formatted_day} `);
  }
}
