const cosmetics = ["paraben", "sulfate", "plastic", "fragrance"];
const food = ["palm oil", "preservative", "artificial", "monosodium"];

function highlight(text, words) {
  const regex = new RegExp(`\\b(${words.join("|")})\\b`, "gi");
  return text.replace(regex, (match) => `<mark class="harmful">${match}</mark>`);
}

function calculateEcoScore(matches) {
  let maxBad = 6;
  let score = Math.max(0, 10 - matches.length * (10 / maxBad));
  return Math.round(score);
}

chrome.storage.local.get(["productTitle", "productText"], (result) => {
  const title = result.productTitle || "";
  const fullText = result.productText?.toLowerCase() || "";

  if (!title) {
    document.getElementById("result").innerText = "⚠️ No product info found. Open a product page.";
    return;
  }

  document.getElementById("result").innerHTML = `<strong>Product:</strong> ${title}`;

  const matchedCosmetics = cosmetics.filter(w => fullText.includes(w));
  const matchedFood = food.filter(w => fullText.includes(w));
  const matched = [...matchedCosmetics, ...matchedFood];

  let type = "unknown";
  if (matchedCosmetics.length > 0) type = "cosmetic";
  else if (matchedFood.length > 0) type = "food";

  // Eco Score
  const ecoScore = calculateEcoScore(matched);
  let meterColor = ecoScore > 7 ? "green" : ecoScore > 4 ? "orange" : "red";

  const scoreDiv = document.getElementById("score");
  scoreDiv.innerHTML = `
    <strong>🌱 Eco Score:</strong> ${ecoScore}/10
    <div id="eco-meter">
      <div id="eco-meter-bar" style="width:${ecoScore * 10}%; background:${meterColor}"></div>
    </div>
  `;

  // If no bad keywords found
  if (matched.length === 0) {
    document.getElementById("alternatives").innerHTML = "✅ This product seems sustainable!";
    return;
  }

  // Show found issues
  const altDiv = document.getElementById("alternatives");
  altDiv.innerHTML = `<h4>⚠️ Found Issues:</h4><p>${matched.join(", ")}</p>`;

  // Suggest Alternatives
  fetch(`eco-data/${type}.json`)
    .then(res => res.json())
    .then(data => {
      altDiv.innerHTML += `<h4>✅ Suggested Alternatives:</h4>`;
      data.forEach(item => {
        const card = document.createElement("div");
        card.className = "alt-card";
        card.innerHTML = `<strong>${item.name}</strong><br>${item.reason}`;
        altDiv.appendChild(card);
      });

      // Highlight ingredients in text
      altDiv.innerHTML += `
        <h4>🧪 Ingredients/Description Scan:</h4>
        <div class="text-scan">${highlight(fullText, matched)}</div>
      `;
    })
    .catch(err => {
      console.error("Failed to load alternatives:", err);
      altDiv.innerHTML += "❌ No alternatives found.";
    });
});
