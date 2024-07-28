const domain = "https://ihatov08.github.io";

const selectRadio = document.getElementById("category-radio");

selectRadio.addEventListener(
  "click",
  () => {
    const radios = Array.prototype.slice.call(
      document.getElementsByName("category")
    );

    const radio= radios.find(r=>(r.checked))

    mainProc(radio.value);
  },
  false
);

async function mainProc(category) {

  startLoad();

  const response = await fetch(
    `https://ihatov08.github.io/kimetsu_api/api/${category}.json`
  );
  const json = await response.json();

  reflectionTable(json);

  stopLoad();
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

mainProc("all");