class List {
  constructor() {
    this.list = [];
    this.readOnly = false;
  }

  addTag(tagName) {
    if (!tagName) return;
    this.list.push(tagName);
    localStorage.setItem("list", JSON.stringify(this.list));
  }

  removeTagByName(tagName) {
    let index = this.list.indexOf(tagName);
    this.list.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(this.list));
  }

  getList() {
    if (localStorage.getItem("list")) {
      this.list = JSON.parse(localStorage.getItem("list"));
    }
    return this.list;
  }

  changeMode(bolean) {
    this.readOnly = bolean;
  }

  getMode() {
    return this.readOnly;
  }
}

function showList(list) {
  tagArea.innerHTML = "";
  list.forEach((item) => {
    createDivWithTag(item);
  });
}

function createDivWithTag(tagName) {
  let div = document.createElement("div");
  div.innerHTML = `<div>${tagName}</div><button>&times</button>`;
  div.classList.add("tag");

  tagArea.append(div);
}

function addTags(event) {
  event.preventDefault();
  if (list.readOnly) return;

  let str = form[0].value;
  if (!str) return;
  let arr = str.split(" ");
  arr.forEach((item) => list.addTag(item));

  showList(list.getList());
  form[0].value = "";
}

function removeTag(event) {
  if (list.readOnly) return;
  if (event.target.tagName !== "BUTTON") return;
  let parent = event.target.closest(".tag");
  list.removeTagByName(parent.firstElementChild.innerHTML);

  showList(list.getList());
}

let tagArea = document.getElementById("tagArea");
let form = document.getElementById("form");
let checkbox = document.getElementById("checkbox");

const list = new List();
showList(list.getList());

checkbox.checked = list.getMode();

form.addEventListener("submit", addTags);

tagArea.addEventListener("click", removeTag);

checkbox.addEventListener("change", (event) => {
  list.changeMode(event.target.checked);
});
