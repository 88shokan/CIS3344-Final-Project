// MakeBudgetTracker_CGF.js
"use strict";
function MakeBudgetTracker_CGF() {
  // Main container for the page
  const pageDiv = document.createElement("div");
  pageDiv.className = "budget-page";

  // Three trackers with images
  const groceries = MakeBudgetTracker({ 
      category: "Groceries", 
      budget: 250, 
      imgURL: "imgs/groceries.svg"
  });

  const rent = MakeBudgetTracker({ 
      category: "Rent", 
      budget: 1200, 
      imgURL: "imgs/rent.svg"
  });

  const savings = MakeBudgetTracker({ 
      category: "Savings", 
      budget: 500, 
      imgURL: "imgs/savings.svg"
  });

  // Append them to the page container
  pageDiv.appendChild(MakeBudgetTracker({}));
  pageDiv.appendChild(groceries);
  pageDiv.appendChild(rent);
  pageDiv.appendChild(savings);

  return pageDiv;
}
