const args = require("minimist")(process.argv.slice(2));
const today = new Date();
const month = args.m || today.getMonth() + 1;
const year = args.y || today.getFullYear();
const valueForGetMonthStart = 1;
const valueForGetMonthEnd = 0;
const startDate = new Date(year, month - valueForGetMonthStart);
const endDate = new Date(year, month, valueForGetMonthEnd);
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
