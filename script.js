let history = [];

function addResult(result) {
  if (history.length >= 5) history.shift();
  history.push(result);
  updateDisplay();
  predict();
}

function updateDisplay() {
  const historyDiv = document.getElementById("historyDisplay");
  historyDiv.innerHTML = history.map(r => {
    if (r === "Player") return "<span style='color:blue'>P</span>";
    if (r === "Banker") return "<span style='color:red'>B</span>";
    if (r === "Tie") return "<span style='color:green'>H</span>";
    return "-";
  }).join("");
}

function predict() {
  if (history.length < 5) {
    document.getElementById("prediction").innerText = "Dự đoán: cần đủ 5 ván";
    return;
  }

  // Mô hình dự đoán mẫu (có thể nâng cấp thành AI sau)
  let pCount = history.filter(h => h === "Player").length;
  let bCount = history.filter(h => h === "Banker").length;
  let tCount = history.filter(h => h === "Tie").length;

  let nextPrediction;
  if (pCount > bCount && pCount > tCount) {
    nextPrediction = "Player";
  } else if (bCount > pCount && bCount > tCount) {
    nextPrediction = "Banker";
  } else {
    nextPrediction = "Tie";
  }

  document.getElementById("prediction").innerText = `Dự đoán: ${nextPrediction}`;
}
