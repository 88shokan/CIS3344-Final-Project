// MakeBudgetTracker.js
"use strict";

function MakeBudgetTracker({
  category = "General Budget",
  budget = 0,
  imgURL = "imgs/questionmark.png",
  currency = "$"
} = {}) {
  // Outer card container
  const card = document.createElement("div");
  card.className = "makeBudgetTracker";

  // --- Image section ---
  const img = document.createElement("img");
  img.src = imgURL;
  img.alt = `${category} image`;
  img.className = "budget-img";
  card.appendChild(img);

  // --- Category title ---
  const title = document.createElement("h2");
  title.textContent = category;
  title.className = "budget-category";
  card.appendChild(title);

  // --- Current balance ---
  const balance = document.createElement("p");
  balance.textContent = `Balance: ${currency}${budget.toFixed(2)}`;
  balance.className = "budget-amount";
  card.appendChild(balance);

  // --- Transaction list ---
  const list = document.createElement("ul");
  list.className = "transaction-list";
  card.appendChild(list);

  // --- Tip / Instruction block ---
  const tipBlock = document.createElement("div");
  tipBlock.className = "transaction-instructions";
  tipBlock.innerHTML = `
    <p>
      <strong>Tip:</strong> Enter 
      <span class="plus">+value</span> for income, or 
      <span class="minus">-value</span> for expense.
    </p>
  `;
  card.appendChild(tipBlock);

  // --- Input field ---
  const input = document.createElement("input");
  input.type = "number";
  input.placeholder = "Enter +income or -expense";
  input.className = "budget-input";
  card.appendChild(input);

  // --- Add transaction button ---
  const addBtn = document.createElement("button");
  addBtn.textContent = "Add Transaction";
  addBtn.className = "budget-btn";
  addBtn.onclick = () => {
    const val = Number(input.value);

    if (isNaN(val) || val === 0) {
      alert("Enter a valid number (positive or negative).");
      input.value = "";
      return;
    }

    // Update balance
    budget += val;
    balance.textContent = `Balance: ${currency}${budget.toFixed(2)}`;

    // Create transaction record
    const li = document.createElement("li");
    if (val > 0) {
      li.textContent = `+ ${currency}${val.toFixed(2)} (Income)`;
      li.className = "transaction income";
    } else {
      li.textContent = `- ${currency}${Math.abs(val).toFixed(2)} (Expense)`;
      li.className = "transaction expense";
    }
    list.appendChild(li);

    // Clear input
    input.value = "";
  };
  card.appendChild(addBtn);

  return card;
}