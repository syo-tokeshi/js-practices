const args = require("minimist")(process.argv.slice(2));

const today = new Date();
const VALUE_FOR_GET_MONTH_CORRECTLY = 1;
const month = args.m || today.getMonth() + VALUE_FOR_GET_MONTH_CORRECTLY;
const year = args.y || today.getFullYear();
const startDate = new Date(year, month - VALUE_FOR_GET_MONTH_CORRECTLY);
const VALUE_FOR_GET_MONTH_END = 0;
const endDate = new Date(year, month, VALUE_FOR_GET_MONTH_END);

const DEFAULT_SPACE = "   ";
const RIGHT_JUSTIFIED_LENGTH = 2;
const SATURDAY = 6;

console.log(`     ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
const firstWeeksSpace = DEFAULT_SPACE.repeat(startDate.getDay());
process.stdout.write(firstWeeksSpace);
for (
  const date = startDate;
  date <= endDate;
  date.setDate(date.getDate() + 1)
) {
  const formattedDay = String(date.getDate()).padStart(RIGHT_JUSTIFIED_LENGTH);
  if (date.getDay() === SATURDAY) {
    console.log(formattedDay);
  } else {
    process.stdout.write(`${formattedDay} `);
  }
}
