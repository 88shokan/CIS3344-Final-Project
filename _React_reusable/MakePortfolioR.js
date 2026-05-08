"use strict";

const { useState } = React;

function MakePortfolioR({
  img = "imgs/questionmark.png",
  symbol = "$UNKNOWN",
  shares = 0,
  price = 0.0,
}) {
  // React State variables
  const [stockImg, setStockImg] = useState(img);
  const [stockSymbol, setStockSymbol] = useState(symbol);
  const [stockShares, setStockShares] = useState(shares);
  const [stockPrice, setStockPrice] = useState(price);
  const [notes, setNotes] = useState("");

  // Input states for updates
  const [addShares, setAddShares] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newNote, setNewNote] = useState("");

  // Event handlers
  function handleAddShares() {
    const num = parseFloat(addShares);
    if (!isNaN(num)) {
      setStockShares(stockShares + num);
    }
    setAddShares("");
  }

  function handleUpdatePrice() {
    const num = parseFloat(newPrice);
    if (!isNaN(num)) {
      setStockPrice(num);
    }
    setNewPrice("");
  }

  function handleAddNote() {
    if (newNote.trim() !== "") {
      setNotes(notes + (notes ? " | " : "") + newNote.trim());
    }
    setNewNote("");
  }

  function handleImageChange(e) {
    setStockImg(e.target.value);
  }

  return (
    <div className="portfolio-card">
      <h3 className="portfolio-title">{stockSymbol}</h3>
      <img src={stockImg} alt={stockSymbol} className="portfolio-img" />

      <p><b>Shares:</b> {stockShares}</p>
      <p><b>Price:</b> ${stockPrice.toFixed(2)}</p>
      <p><b>Total Value:</b> ${(stockShares * stockPrice).toFixed(2)}</p>
      <p><b>Notes:</b> {notes || "No notes yet"}</p>

      

      {/* Add shares */}
      <div className="portfolio-control">
        <input
          type="number"
          value={addShares}
          onChange={(e) => setAddShares(e.target.value)}
          placeholder="Add shares"
        />
        <button onClick={handleAddShares}>Add</button>
      </div>

      {/* Update price */}
      <div className="portfolio-control">
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="New price"
        />
        <button onClick={handleUpdatePrice}>Update</button>
      </div>

      {/* Notes */}
      <div className="portfolio-control">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note"
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
    </div>
  );
}
