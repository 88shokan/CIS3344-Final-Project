"use strict";
/* 
 * MakeEditArea expects a parameter object with the following inputs: 
 *     inputSpecs: array of objects (one object per field the user is supposed to type in)
 *     successCallBack: called if user clicks Submit and all inputs validate
 *     cancelCallBack: called if user clicks Cancel
 *     editObj: optional object holding initial values
 *     title: optional title for the edit area (defaults to "Edit Area")
 */

function MakeEditArea({ inputSpecs, successCallBack, cancelCallBack, editObj = {}, title = "Edit Area" }) {

    
    var errorMsg = "";

    if (!inputSpecs || !inputSpecs[0]) {
        errorMsg += "MakeEditArea did not receive an 'inputSpecs' array with at least one field.<br/><br/>";
    }
    if (!successCallBack || !(successCallBack instanceof Function)) {
        errorMsg += "MakeEditArea missing required 'successCallBack' function.<br/><br/>";
    }
    if (!cancelCallBack || !(cancelCallBack instanceof Function)) {
        errorMsg += "MakeEditArea missing required 'cancelCallBack' function.<br/><br/>";
    }

    if (errorMsg.length > 0) {
        alert(errorMsg);
        throw errorMsg;
    }

    // --- Create main container ---
    var editDiv = document.createElement("div");
    editDiv.classList.add("editArea");

    editDiv.innerHTML = `
        <h3>${title}</h3>
        <div class="rowsC"></div>
        <button class="saveButtonC">Save</button>
        <button class="cancelButtonC">Cancel</button>
        <span class="recLevelMsgC"></span>
    `;

    var rows = editDiv.getElementsByClassName("rowsC")[0];
    var saveButton = editDiv.getElementsByClassName("saveButtonC")[0];
    var cancelButton = editDiv.getElementsByClassName("cancelButtonC")[0];
    var recLevelMsg = editDiv.getElementsByClassName("recLevelMsgC")[0];


    // --- Build each row of inputs ---
    for (var spec of inputSpecs) {

        // Create one row
        var rowDiv = MakeTag({
            htmlTag: "div",
            parent: rows,
            cssClass: "row"
        });

        // Prompt label
        MakeTag({
            htmlTag: "span",
            cssClass: "prompt",
            innerHTML: spec.prompt,
            parent: rowDiv
        });

      
        if (spec.dataType === "select") {

            spec.inputTag = MakeTag({
                htmlTag: "select",
                parent: rowDiv
            });

            // If required, put a placeholder
            if (spec.isRequired) {
                MakeTag({
                    htmlTag: "option",
                    value: "",
                    innerHTML: "-- Please select --",
                    parent: spec.inputTag
                });
            }

            // Populate dropdown
            if (spec.options && Array.isArray(spec.options)) {
                for (var option of spec.options) {
                    var optTag = MakeTag({
                        htmlTag: "option",
                        value: option,
                        innerHTML: option,
                        parent: spec.inputTag
                    });

                    // Prefill if editing
                    if (editObj[spec.fieldName] === option) {
                        optTag.selected = true;
                    }
                }
            }

        } 
      
        else if (spec.dataType === "radio") {
            // Build via your MakeRadio.js
            spec.inputTag = MakeRadio({
                prompt: "",
                choices: spec.options,
                selected: editObj[spec.fieldName] || spec.selected || ""
            });

            // Mark required if needed
            spec.inputTag.isRequired = spec.isRequired === true;

            rowDiv.appendChild(spec.inputTag);
        } 
     
        else {
            var typeValue = "text";
            if (spec.dataType === "date") typeValue = "date";
            if (spec.dataType === "number" || spec.dataType === "integer") typeValue = "number";

            spec.inputTag = MakeTag({
                htmlTag: "input",
                type: typeValue,
                value: editObj[spec.fieldName] || "",
                parent: rowDiv
            });
        }

        // Spacer
        MakeTag({
            htmlTag: "span",
            innerHTML: "&nbsp;",
            parent: rowDiv
        });

        // Error message span
        spec.errorMsg = MakeTag({
            htmlTag: "span",
            cssClass: "error",
            parent: rowDiv
        });

    } // end for inputSpecs


   
    saveButton.onclick = function () {

        var allErrors = "";

        for (var spec of inputSpecs) {

            console.log("Validating:", spec.fieldName, "=", spec.inputTag.value);

            if (spec.dataType === "string") {
                spec.errorMsg.innerHTML = Validate.String(
                    spec.inputTag.value,
                    spec.isRequired,
                    spec.minLen,
                    spec.maxLen
                );
            }

            else if (spec.dataType === "number" || spec.dataType === "integer") {
                spec.errorMsg.innerHTML = Validate.Number(
                    spec.inputTag.value,
                    spec.isRequired,
                    spec.minValue,
                    spec.maxValue
                );
            }

            else if (spec.dataType === "date") {
                spec.errorMsg.innerHTML = Validate.RequiredField(
                    spec.inputTag.value,
                    spec.isRequired
                );
            }

            else if (spec.dataType === "select") {
                spec.errorMsg.innerHTML = Validate.RequiredField(
                    spec.inputTag.value,
                    spec.isRequired
                );
            }

            // --- RADIO GROUP VALIDATION ---
            else if (spec.dataType === "radio") {
                let val = spec.inputTag.value;

                if (spec.isRequired && (!val || val.trim().length === 0)) {
                    spec.errorMsg.innerHTML = "Please make a selection.";
                } else {
                    spec.errorMsg.innerHTML = "";
                }
            }

            else {
                spec.errorMsg.innerHTML = "Unknown data type: " + spec.dataType;
            }

            allErrors += spec.errorMsg.innerHTML;
        }

        if (allErrors.length > 0) {
            recLevelMsg.innerHTML = "Please Try Again";
            return;
        }

        recLevelMsg.innerHTML = "Success!";

        // SAVE VALUES INTO editObj
        for (var spec of inputSpecs) {
            editObj[spec.fieldName] = spec.inputTag.value;
        }

        successCallBack(editObj);
    };


    function clearAll() {
        for (var spec of inputSpecs) {
            if (spec.dataType === "select") {
                spec.inputTag.selectedIndex = 0;
            } 
            else if (spec.dataType === "radio") {
                // Clear the form's value
                spec.inputTag.value = "";
                // Uncheck all radio buttons inside the form
                var radios = spec.inputTag.querySelectorAll('input[type="radio"]');
                for (var radio of radios) {
                    radio.checked = false;
                }
            } 
            else {
                spec.inputTag.value = "";
            }
            // Clear error messages
            if (spec.errorMsg) {
                spec.errorMsg.innerHTML = "";
            }
        }
        recLevelMsg.innerHTML = "";
    }

    cancelButton.onclick = function () {
        clearAll();
        cancelCallBack();
    };

    return editDiv;
}