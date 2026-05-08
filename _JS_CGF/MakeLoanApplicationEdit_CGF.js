// prevents a misspelled variable from getting a global auto-declared variable.
"use strict";

function MakeLoanApplicationEdit_CGF() {

    var ele = document.createElement("div");

    ele.innerHTML = `
        <div class="editAreaC"></div>
        <h4>Message Area</h4>
        <div class="msgAreaC"></div>
        `;

    var editArea = ele.getElementsByClassName("editAreaC")[0];
    var msgArea = ele.getElementsByClassName("msgAreaC")[0];

    var loanInputSpecs = [
        {
            "prompt": "Applicant Name (req'd, length 2-100): ",
            "fieldName": "applicantName",
            "dataType": "string",
            "isRequired": true,
            "minLen": 2,
            "maxLen": 100
        },
        {
            "prompt": "Loan Type (req'd): ",
            "fieldName": "loanType",
            "dataType": "radio",
            "isRequired": true,
            "options": ["Mortgage", "Personal Loan", "Auto Loan", "Business Loan", "Student Loan", "Home Equity Loan", "HELOC", "Construction Loan"],
            "selected": "Mortgage"  // Default selected value for radio button
        },
        {
            "prompt": "Loan Purpose (req'd): ",
            "fieldName": "loanPurpose",
            "dataType": "select",
            "isRequired": true,
            "options": ["Home Purchase", "Refinance", "Home Improvement", "Debt Consolidation", "Vehicle Purchase", "Business Expansion", "Education", "Other"]
        },
        {
            "prompt": "Employment Status (req'd): ",
            "fieldName": "employmentStatus",
            "dataType": "select",
            "isRequired": true,
            "options": ["Full-Time", "Part-Time", "Self-Employed", "Contract", "Retired", "Unemployed"]
        },
        {
            "prompt": "Application Date (req'd): ",
            "fieldName": "applicationDate",
            "dataType": "date",
            "isRequired": true
        },
        {
            "prompt": "Requested Loan Amount (req'd, value 1000-10000000): ",
            "fieldName": "requestedAmount",
            "dataType": "number",
            "isRequired": true,
            "minValue": 1000,
            "maxValue": 10000000,
            "maxLen": 10
        },
        {
            "prompt": "Loan Term in Years (req'd, value 1-40): ",
            "fieldName": "loanTerm",
            "dataType": "integer",  // Changed from "number" to "integer"
            "isRequired": true,
            "minValue": 1,
            "maxValue": 40
        },
        {
            "prompt": "Annual Income (req'd, value 0-10000000): ",
            "fieldName": "annualIncome",
            "dataType": "number",
            "isRequired": true,
            "minValue": 0,
            "maxValue": 10000000,
            "maxLen": 10
        },
        {
            "prompt": "Credit Score (opt'l, value 300-850): ",
            "fieldName": "creditScore",
            "dataType": "integer",  // Changed from "number" to "integer"
            "isRequired": false,
            "minValue": 300,
            "maxValue": 850
        },
        {
            "prompt": "Down Payment (opt'l, value 0-10000000): ",
            "fieldName": "downPayment",
            "dataType": "number",
            "isRequired": false,
            "minValue": 0,
            "maxValue": 10000000,
            "maxLen": 10
        },
        {
            "prompt": "Property/Collateral Address (opt'l, max length 200): ",
            "fieldName": "propertyAddress",
            "dataType": "string",
            "isRequired": false,
            "maxLen": 200
        }
    ];

    var loanToEdit = {
        "applicantName": "",
        "loanType": "Mortgage",  // Default for radio button
        "loanPurpose": "Home Purchase",  // Default for select dropdown
        "employmentStatus": "Full-Time",  // Default for select dropdown
        "applicationDate": "",
        "requestedAmount": "",
        "loanTerm": "",
        "annualIncome": "",
        "creditScore": "",
        "downPayment": "",
        "propertyAddress": "123 Main Street, Philadelphia, PA 19103"
    };

    function success(inpObj) {
        msgArea.innerHTML += "Loan application will be submitted with these values:<br/>";
        for (var propName in inpObj) {
            msgArea.innerHTML += "&nbsp; &nbsp; " + propName + ": " +
                inpObj[propName] + "<br/>";
        }
        msgArea.innerHTML += "<br/>";

        msgArea.innerHTML += "To show that passing objects in JS is 'call by reference', " +
            "here is the original 'loanToEdit' object (that also got changed):<br/>";
        for (propName in loanToEdit) {
            msgArea.innerHTML += "&nbsp; &nbsp; " + propName + ": " +
                loanToEdit[propName] + "<br/>";
        }
        msgArea.innerHTML += "<br/>";
    }

    function cancel() {
        msgArea.innerHTML += "Loan application cancelled.<br/><br/>";
    }

    var component = MakeEditArea({
        inputSpecs: loanInputSpecs,
        successCallBack: success,
        cancelCallBack: cancel,
        editObj: loanToEdit,
        title: "Loan Application Form"  // Added custom title
    });
    editArea.appendChild(component);

    return ele;

} // MakeLoanApplicationEdit_CGF