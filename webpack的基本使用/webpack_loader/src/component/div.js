import "../css/div.css";

const divEL = document.createElement("div");
divEL.textContent = "hello";
divEL.classList.add("content");
document.body.append(divEL);
