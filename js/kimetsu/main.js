const domain = "https://ihatov08.github.io";

const selectAll = document.getElementById("select-all");
const selectKisatsutai = document.getElementById("select-kisatsutai");
const selectOni = document.getElementById("select-oni");
const selectHashira = document.getElementById("select-hashira");

selectAll.addEventListener(
  "click",
  () => {
    startLoad();
    apiAll();
    setTimeout(stopLoad, 1000);
  }
  ,false
)

selectKisatsutai.addEventListener(
  "click",
  () => {
    startLoad();
    apiKisatsutai();
    setTimeout(stopLoad, 1000);
  },
  false
);

selectOni.addEventListener(
  "click",
  () => {
    startLoad();
    apiOni();
    setTimeout(stopLoad, 1000);
  },
  false
);

selectHashira.addEventListener(
  "click",
  () => {
    startLoad();
    apiHashira();
    setTimeout(stopLoad, 1000);
  },
  false
);

async function apiAll() {
  const response = await fetch(
    "https://ihatov08.github.io/kimetsu_api/api/all.json"
  );
  const json =await response.json();

  reflectionTable(json);
}
startLoad();
apiAll();
stopLoad();

async function apiKisatsutai() {
  const response = await fetch(
    "https://ihatov08.github.io/kimetsu_api/api/kisatsutai.json"
  );
  const json = await response.json();

  reflectionTable(json);
}

async function apiOni() {
  const response = await fetch(
    "https://ihatov08.github.io/kimetsu_api/api/oni.json"
  );
  const json = await response.json();

  reflectionTable(json);
}

async function apiHashira() {
  const response = await fetch(
    "https://ihatov08.github.io/kimetsu_api/api/hashira.json"
  );
  const json = await response.json();

  reflectionTable(json);
}

function reflectionTable(json) {
  const table = document.getElementById("table");

  const records=Array.prototype.slice.call(table.children);

  for (const record of records){
    if (record.localName === "tbody") {
      continue;
    }
    table.removeChild(record);
  }

  for (const character of json) {
    const tr = document.createElement("tr");
    const nameColumn = document.createElement("td");
    nameColumn.appendChild(document.createTextNode(character.name));
    const imageColumn = document.createElement("td");
    const image = document.createElement("img");
    image.setAttribute("src", `${domain}${character.image}`);
    imageColumn.appendChild(image);

    const categoryColumn = document.createElement("td");
    categoryColumn.appendChild(document.createTextNode(character.category));

    tr.appendChild(nameColumn);
    tr.appendChild(imageColumn);
    tr.appendChild(categoryColumn);
    table.appendChild(tr);
  }
}

function startLoad() {
  document.getElementById("loading").style.visibility = "visible";
}

function stopLoad() {
  let element = document.getElementById("loading");
  element.style.visibility = "hidden";
}