"use strict";

function MakeSlideShow({
  slideShowTitle = "Untitled",
  ssObjList = [
    {
      image: "pics_slideShow/nothing.png",
      caption: "No slides provided",
      info: "No additional information"
    }
  ],
  themeColor = "#1976D2"
} = {}) {

  // 
  const storageKey = `slideShowIndex_${slideShowTitle}`;

  const container = document.createElement("div");
  container.classList.add("slideShow");
  container.style.borderColor = themeColor;

  const titleEl = document.createElement("h2");
  titleEl.textContent = slideShowTitle;
  titleEl.style.color = themeColor;
  container.appendChild(titleEl);

  // ✅ Load persisted index
  let currentIndex = 0;
  const storedIndex = localStorage.getItem(storageKey);
  if (storedIndex !== null) {
    const parsedIndex = parseInt(storedIndex, 10);
    if (!isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < ssObjList.length) {
      currentIndex = parsedIndex;
    }
  }

  // Elements for display
  const img = document.createElement("img");
  img.classList.add("slideShow-image");
  container.appendChild(img);

  const caption = document.createElement("div");
  caption.classList.add("slideShow-caption");
  container.appendChild(caption);

  const info = document.createElement("div");
  info.classList.add("slideShow-info");
  info.style.display = "none";
  container.appendChild(info);

  // ✅ Function to update the UI
  function updateSlide() {
    const slide = ssObjList[currentIndex];
    img.src = slide.image;
    caption.textContent = slide.caption;
    info.innerHTML = slide.info;
    localStorage.setItem(storageKey, currentIndex.toString());
  }

  // Initialize with persisted/current index
  updateSlide();

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "Show Info";
  toggleBtn.addEventListener("click", () => {
    const showing = info.style.display === "block";
    info.style.display = showing ? "none" : "block";
    toggleBtn.textContent = showing ? "Show Info" : "Hide Info";
  });
  container.appendChild(toggleBtn);

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + ssObjList.length) % ssObjList.length;
    updateSlide();  
  });
  container.appendChild(prevBtn);

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % ssObjList.length;
    updateSlide();  
  });
  container.appendChild(nextBtn);

  return container;
}
