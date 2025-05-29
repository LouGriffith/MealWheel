const defaultRestaurants = [
  { name: "Chick-fil-A", weight: 5 },
  { name: "Taco Bell", weight: 3 },
  { name: "Zaxby's", weight: 4 },
  { name: "Popeyes", weight: 2 },
  { name: "Arby’s", weight: 1 }
];

let restaurants = JSON.parse(localStorage.getItem("restaurants")) || defaultRestaurants;

function spinWheel() {
  const expanded = restaurants.flatMap(r => Array(r.weight).fill(r.name));
  const choice = expanded[Math.floor(Math.random() * expanded.length)];
  document.getElementById("suggestion").textContent = `🎯 ${choice}`;
}

function renderPreferences() {
  const list = document.getElementById("restaurantList");
  list.innerHTML = "";
  restaurants.forEach((r, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>${r.name}</label>
      <input type="range" min="1" max="5" value="${r.weight}" 
        oninput="updateWeight(${i}, this.value)" />
      <span>${r.weight}</span>
    `;
    list.appendChild(li);
  });
}

function updateWeight(index, value) {
  restaurants[index].weight = parseInt(value);
  renderPreferences();
}

document.getElementById("spin").onclick = spinWheel;
document.getElementById("reSpin").onclick = spinWheel;
document.getElementById("savePrefs").onclick = () => {
  localStorage.setItem("restaurants", JSON.stringify(restaurants));
  alert("Preferences saved!");
};

renderPreferences();
