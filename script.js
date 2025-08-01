let history = [];

function addResult(result) {
  if (history.length >= 5) history.shift();
  history.push(result);
  updateDisplay();
  predict();
}

function resetHistory() {
  history = [];
  updateDisplay();
  document.getElementById("prediction").innerText = "Dự đoán: ...";
  document.getElementById("percentages").innerText = "Xác suất: ...";
}

function updateDisplay() {
  const historyDiv = document.getElementById("historyDisplay");
  const display = history.map(r => {
    if (r === "Player") return "<span style='color:blue'>P</span>";
    if (r === "Banker") return "<span style='color:red'>B</span>";
    if (r === "Tie") return "<span style='color:green'>H</span>";
    return "-";
  });

  while (display.length < 5) {
    display.unshift("<span>-</span>");
  }

  historyDiv.innerHTML = display.join("");
}

function predict() {
  if (history.length < 5) {
    document.getElementById("prediction").innerText = "Dự đoán: cần đủ 5 ván";
    document.getElementById("percentages").innerText = "Xác suất: ...";
    return;
  }

  let total = history.length;
  let pCount = history.filter(h => h === "Player").length;
  let bCount = history.filter(h => h === "Banker").length;
  let tCount = history.filter(h => h === "Tie").length;

  let pRate = (pCount / total * 100).toFixed(1);
  let bRate = (bCount / total * 100).toFixed(1);
  let tRate = (tCount / total * 100).toFixed(1);

  // Dự đoán dựa trên tỷ lệ cao nhất
  let max = Math.max(pRate, bRate, tRate);
  let prediction = (max == pRate) ? "Player" : (max == bRate) ? "Banker" : "Hòa";

  document.getElementById("prediction").innerText = `Dự đoán: ${prediction}`;
  document.getElementById("percentages").innerText =
    `Xác suất - Player: ${pRate}%, Banker: ${bRate}%, Hòa: ${tRate}%`;
}
