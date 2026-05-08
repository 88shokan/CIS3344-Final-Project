"use strict";
function MakePortfolioR_CGF() {
  return (
    <div className="portfolio">
      {/* Apple Portfolio Item */}
      <MakePortfolioR
        img="imgs/apple.svg"
        symbol="$AAPL"
        shares={10}
        price={175.5}
        className="portfolio-apple"
      />

      {/* Bitcoin Portfolio Item */}
      <MakePortfolioR
        img="imgs/bitcoin.png"
        symbol="$BTC"
        shares={0.5}
        price={27000}
        className="portfolio-bitcoin"
      />

      {/* Default Portfolio Item (uses default props) */}
      <MakePortfolioR className="portfolio-default" />
    </div>
  );
}

ReactDOM.render(<MakePortfolioR_CGF />, document.getElementById("root"));