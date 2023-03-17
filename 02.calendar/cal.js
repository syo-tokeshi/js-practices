const args = require("minimist")(process.argv.slice(2));

const today = new Date();
const OFFSET_FOR_GET_MONTH_CORRECTLY = 1;
const month = args.m || today.getMonth() + OFFSET_FOR_GET_MONTH_CORRECTLY;
const year = args.y || today.getFullYear();
const startDate = new Date(year, month - OFFSET_FOR_GET_MONTH_CORRECTLY);
const endDate = new Date(year, month, 0);

const DISPLAYED_DATE_LENGTH = 2;
const SATURDAY = 6;

console.log(`     ${month}月 ${year}`);
console.log("日 月 火 水 木 金 土");
const BLANK_DATE = "   ".repeat(startDate.getDay());
process.stdout.write(BLANK_DATE);
for (
  const date = startDate;
  date <= endDate;
  date.setDate(date.getDate() + 1)
) {
  const formattedDay = String(date.getDate()).padStart(DISPLAYED_DATE_LENGTH);
  if (date.getDay() === SATURDAY) {
    console.log(formattedDay);
  } else {
    process.stdout.write(`${formattedDay} `);
  }
}
