"use strict";

function MakeInvestmentEdit_CGF() {

    var ele = document.createElement("div");

    ele.innerHTML = `
        <div class="editAreaC"></div>
        <h4>Message Area</h4>
        <div class="msgAreaC"></div>
    `;

    var editArea = ele.getElementsByClassName("editAreaC")[0];
    var msgArea = ele.getElementsByClassName("msgAreaC")[0];

    var investmentInputSpecs = [

        // Radio button with default value
        {
            "prompt": "Investment Type (req'd): ",
            "fieldName": "investmentType",
            "dataType": "radio",
            "isRequired": true,
            "options": ["Stock", "Bond", "ETF", "Mutual Fund", "Crypto"],
            "selected": "Stock"  // Default selected value for radio button
        },

        {
            "prompt": "Security Name (req'd, length 2-100): ",
            "fieldName": "securityName",
            "dataType": "string",
            "isRequired": true,
            "minLen": 2,
            "maxLen": 100
        },
        {
            "prompt": "Ticker Symbol (req'd, length 1-10): ",
            "fieldName": "tickerSymbol",
            "dataType": "string",
            "isRequired": true,
            "minLen": 1,
            "maxLen": 10
        },
        
        // Select dropdown with default value
        {
            "prompt": "Asset Class (req'd): ",
            "fieldName": "assetClass",
            "dataType": "select",
            "isRequired": true,
            "options": ["Common Stock", "Preferred Stock", "Corporate Bond", "Government Bond", "Index Fund", "Other"]
        },
        
        {
            "prompt": "Brokerage Account (opt'l): ",
            "fieldName": "brokerageAccount",
            "dataType": "string",
            "isRequired": false,
            "maxLen": 100
        },
        {
            "prompt": "Purchase Date (req'd): ",
            "fieldName": "purchaseDate",
            "dataType": "date",
            "isRequired": true
        },
        {
            "prompt": "Maturity Date (opt'l): ",
            "fieldName": "maturityDate",
            "dataType": "date",
            "isRequired": false
        },
        {
            "prompt": "Purchase Price (opt'l, value 0.01-99999.99): ",
            "fieldName": "purchasePrice",
            "dataType": "number",
            "isRequired": false,
            "minValue": 0.01,
            "maxValue": 99999.99,
            "maxLen": 10
        },
        
        // Integer field for shares
        {
            "prompt": "Current Shares (opt'l, value 1-999999): ",
            "fieldName": "currentShares",
            "dataType": "integer",  // Changed from "number" to "integer"
            "isRequired": false,
            "minValue": 1,
            "maxValue": 999999
        }
    ];

    var investmentToEdit = {
        "investmentType": "Stock",  // Default for radio button
        "securityName": "Apple Inc.",
        "tickerSymbol": "AAPL",
        "assetClass": "Common Stock",  // Default for select dropdown
        "brokerageAccount": "Fidelity Traditional IRA",
        "purchaseDate": "",
        "maturityDate": "",
        "purchasePrice": "175.50",
        "currentShares": "100"
    };

    function success(inpObj) {
        msgArea.innerHTML += "Investment updated with these values:<br/>";
        for (var propName in inpObj) {
            msgArea.innerHTML += "&nbsp;&nbsp;" + propName + ": " + inpObj[propName] + "<br/>";
        }
        msgArea.innerHTML += "<br/>";

        msgArea.innerHTML += "Original 'investmentToEdit' after update (call-by-reference proof):<br/>";
        for (var p in investmentToEdit) {
            msgArea.innerHTML += "&nbsp;&nbsp;" + p + ": " + investmentToEdit[p] + "<br/>";
        }
        msgArea.innerHTML += "<br/>";
    }

    function cancel() {
        msgArea.innerHTML += "Investment edit cancelled.<br/><br/>";
    }

    var component = MakeEditArea({
        inputSpecs: investmentInputSpecs,
        successCallBack: success,
        cancelCallBack: cancel,
        editObj: investmentToEdit,
        title: "Investment Portfolio Manager"  // Added custom title
    });

    editArea.appendChild(component);

    return ele;

} // MakeInvestmentEdit_CGF