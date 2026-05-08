"use strict";

function SlideShowAjax_CGF() {
  const pageDiv = document.createElement("div");

  // Helper to create a placeholder container
  function createLoadingBox(title) {
    const box = document.createElement("div");
    box.classList.add("loading-box");
    box.style.border = "2px dashed #ccc";
    box.style.padding = "10px";
    box.style.margin = "10px 0";
    box.style.textAlign = "center";

    const heading = document.createElement("h2");
    heading.textContent = title;
    heading.style.color = "#1976D2";

    const loadingMsg = document.createElement("p");
    loadingMsg.textContent = "Loading...";
    loadingMsg.style.fontStyle = "italic";
    loadingMsg.style.color = "#555";


    box.appendChild(loadingMsg);

    return box;
  }

  //
  const budgetPlaceholder = createLoadingBox("Budget Tracker");
  pageDiv.appendChild(budgetPlaceholder);

  ajax(
    "json/budget.json",
    function (data) {
      const oldObjList = data.budgetTrack || [];
      const newObjList = oldObjList.map(item => ({
        image: item.imgURL,
        caption: item.caption,
        info: `
          <p><strong>Category:</strong> ${item.category || "N/A"}</p>
          <p><strong>Budget:</strong> $${item.balance}</p>
          <p><strong>Description:</strong> ${item.description}</p>
        `
      }));

      const ss1 = MakeSlideShow({
        slideShowTitle: "Budget Tracker",
        ssObjList: newObjList,
        themeColor: "#1976D2"
      });

      pageDiv.replaceChild(ss1, budgetPlaceholder); // 🔥 Replace loading box with slideshow
    },
    function (status) {
      budgetPlaceholder.innerHTML = `<h2 style="color:#1976D2;">Budget Tracker</h2><p style="color:red;">Failed to load budget.json (status ${status})</p>`;
    }
  );

  // --- 2. Investment Portfolio Slideshow ---
  const portfolioPlaceholder = createLoadingBox("Investment Portfolio");
  pageDiv.appendChild(portfolioPlaceholder);

  ajax(
    "json/portfolio.json",
    function (data) {
      const oldObjList = data.investPort || [];
      const newObjList = oldObjList.map(item => ({
        image: item.imgURL,
        caption: item.caption,
        info: `
          <p><strong>Asset:</strong> ${item.asset}</p>
          <p><strong>Type:</strong> ${item.type}</p>
          <p><strong>Symbol:</strong> ${item.symbol}</p>
          <p><strong>Shares:</strong> ${item.shares}</p>
          <p><strong>Price Per Share:</strong> ${item.price_per_share}</p>
          <p><strong>Total Value:</strong> ${item.total_value}</p>
        `
      }));

      const ss2 = MakeSlideShow({
        slideShowTitle: "Investment Portfolio",
        ssObjList: newObjList,
        themeColor: "#1976D2"
      });

      pageDiv.replaceChild(ss2, portfolioPlaceholder);  
    },
    function (status) {
      portfolioPlaceholder.innerHTML = `<h2 style="color:#1976D2;">Investment Portfolio</h2><p style="color:red;">Failed to load portfolio.json (status ${status})</p>`;
    }
  );

  // --- 3. Default Slideshow ---
  const ss3 = MakeSlideShow({
    slideShowTitle: "Empty Slideshow",
    ssObjList: [
      {
        image: "pics_slideShow/nothing.png",
        caption: "No data loaded",
        info: "No info available"
      }
    ]
  });
  pageDiv.appendChild(ss3);

  return pageDiv;
}
