const now = Date.now();
const program = require("commander");
const WIDTH = 20;
const SPACE_THREE = "   ";
const SPACE_TWO = "  ";
const SPACE = " ";

program.option("-m, --month <s>").parse(process.argv);
month = program._optionValues.month;

if (month !== undefined && (month > 12 || month < 1 || isNaN(month))) {
  throw new Error("無効な値です");
}

let target = new Date();

if (month !== undefined) {
  target.setMonth(month - 1);
}

const month_name = new Intl.DateTimeFormat("en", { month: "long" }).format(
  target
);
const title = month_name + SPACE + target.getFullYear();

const sDate = new Date(target.getFullYear(), target.getMonth(), 1);
const eDate = new Date(target.getFullYear(), target.getMonth() + 1, 0);

const margin = WIDTH - title.length;

if (margin % 2 === 0) {
  const times = margin / 2;
  console.log(SPACE.repeat(times) + title + SPACE.repeat(times));
} else {
  const times = margin / 2;
  console.log(SPACE.repeat(times) + title + SPACE.repeat(times + 1));
}

console.log("Su Mo Tu We Th Fr Sa");

let row = "";

for (let i = 1; i <= eDate.getDate(); i++) {
  if (i === 1) {
    row += SPACE_THREE.repeat(sDate.getDay());
  }
  row += (SPACE_TWO + i).slice(-2);

  if (row.length === WIDTH || i === eDate.getDate()) {
    console.log(row);
    row = "";
  } else {
    row += SPACE;
  }
}
