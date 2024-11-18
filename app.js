"use strict";

const input = document.querySelector("input");
const output = document.querySelector("textarea");
const typeface = document.querySelector("select");
const weight = document.getElementsByName("weight")[0];
const weightLabel = document.getElementsByClassName("weightLabel")[0];
const size = document.getElementsByName("size")[0];
const sizeLabel = document.getElementsByClassName("sizelabel")[0];
const leading = document.getElementsByName("leading")[0];
const leadingLabel = document.getElementsByClassName("leadinglabel")[0];
const italic = document.getElementsByName("italic")[0];
const colors = document.getElementsByClassName("colors")[0];
const button = document.querySelector(".save");
const settings = document.querySelector(".settings-container");
let config = {
  background: "rgb(42 ,42 ,42)",
  color: "rgb(255, 255, 255)",
  italic: false,
  leading: "1.2",
  size: "64",
  text: "The quick brown fox jumped on the lazy dog",
  typeface: "NeueMontreal",
  weight: "400",
};

let savedConfigs = [];

const setOutput = (e) => {
  output.value = input.value
    ? e.target.value
    : "The quick brown fox jumped on the lazy dog";
  config.text = output.value;
};

const setInput = (e) => {
  input.value = output.value;
  input.placeholder = output.value
    ? e.target.value
    : "The quick brown fox jumped on the lazy dog";
  config.text = input.placeholder;
};

const setTypo = (e) => {
  output.style.fontFamily = e.target.value;
  config.typeface = e.target.value;
};

const setFontWeight = (e) => {
  weightLabel.textContent = e.target.value;
  output.style.fontWeight = e.target.value;
  config.weight = e.target.value;
};

const setFontSize = (e) => {
  sizeLabel.textContent = `${e.target.value}px`;
  output.style.fontSize = `${e.target.value}px`;
  config.size = e.target.value;
};

const setFontLeading = (e) => {
  leadingLabel.textContent = `${e.target.value}`;
  output.style.lineHeight = `${e.target.value}`;
  config.leading = e.target.value;
};

const setItalic = (e) => {
  output.style.fontStyle = e.target.checked ? "italic" : "";
  config.italic = e.target.checked;
};

const setColors = (e) => {
  if (e.target.classList.contains("color")) {
    output.style.backgroundColor = e.target.style.backgroundColor;
    output.style.color = e.target.style.color;
    config.background = e.target.style.backgroundColor;
    config.color = e.target.style.color;
  }
};

const save = () => {
  savedConfigs.push({ ...config });
  addConfig();
};

const truncateString = (string = "", maxLength = 50) => {
  return string.length > maxLength
    ? `${string.substring(0, maxLength)}…`
    : string;
};

const addConfig = () => {
  let italic = config.italic ? "italic" : "normal";
  let id = savedConfigs.length - 1;
  let html = `<div 
  class="setting"
  style="background-color:${config.background};
  color:${config.color}; 
  font-family:${config.typeface}; 
  font-weight:${config.weight}; 
  font-style:${italic}" data-id=${id}>${truncateString(config.text, 20)}</div>`;
  settings.insertAdjacentHTML("afterbegin", html);
};

const setConfig = (e) => {
  if (e.target.dataset.id) {
    let clickedConfig = savedConfigs[e.target.dataset.id];
    output.value = clickedConfig.text;
    input.value = clickedConfig.text;
    input.placeholder = clickedConfig.text;
    output.style.fontFamily = clickedConfig.typeface;
    weightLabel.textContent = clickedConfig.weight;
    output.style.fontWeight = clickedConfig.weight;
    sizeLabel.textContent = `${clickedConfig.size}px`;
    output.style.fontSize = `${clickedConfig.size}px`;
    leadingLabel.textContent = `${clickedConfig.leading}`;
    output.style.lineHeight = `${clickedConfig.leading}`;
    output.style.fontStyle = clickedConfig.italic ? "italic" : "";
    output.style.backgroundColor = clickedConfig.background;
    output.style.color = clickedConfig.color;
  }
};

input.addEventListener("input", setOutput);
output.addEventListener("input", setInput);
typeface.addEventListener("input", setTypo);
weight.addEventListener("input", setFontWeight);
size.addEventListener("input", setFontSize);
leading.addEventListener("input", setFontLeading);
italic.addEventListener("input", setItalic);
colors.addEventListener("click", setColors);
button.addEventListener("click", save);
settings.addEventListener("click", setConfig);
