"use strict";

// We are still following JS file naming convention: 
// "JS file name matches the single JS function or object defined within."
// Validate object matches Validate.js 
var Validate = {};

// Now we add public methods to Validate object (all validation functions)

Validate.Number = function (inputVal, isRequired, minVal, maxVal) {
    if (isRequired && inputVal.length === 0) {
        return "Required";
    }
    if (inputVal.length === 0) {
        return ""; // Empty but not required is valid
    }
    if (isNaN(inputVal)) {
        return "Error. Not a valid number.";
    }
    
    var numVal = Number(inputVal);
    
    // Check min value
    if (minVal !== undefined && numVal < minVal) {
        return "Error. Number must be at least " + minVal + ".";
    }
    
    // Check max value
    if (maxVal !== undefined && numVal > maxVal) {
        return "Error. Number must be no more than " + maxVal + ".";
    }
    
    return ""; // no error message means input passed validation.
}

// Using Fat Arrow notation 
// (just an alternative to "regular" function definition above)
Validate.Integer = (inputVal, isRequired) => {
    if (isRequired && inputVal.length === 0) {
        return "Required";
    }

    if (!isNaN(inputVal)) { // means it is a number... 
        var numVal = Number(inputVal);
        var diff = numVal - Math.floor(numVal);
        if ((diff < 0.0001) && (diff > -0.0001)) {
            return ""; // no error message means input passed validation.
        } else {
            return "Error. You entered a number, but it's not an integer.";
        }
    }
    return "Error. Not a valid integer (not a number either).";
}

Validate.String = (inputVal, isRequired, minLen, maxLen) => {
    if (isRequired && inputVal.length === 0) {
        return "Required";
    }
    
    // Check minimum length
    if (minLen !== undefined && inputVal.length > 0 && inputVal.length < minLen) {
        return "Error. Input must be at least " + minLen + " characters long.";
    }
    
    // Check maximum length
    if (maxLen !== undefined && inputVal.length > maxLen) {
        return "Error. Please shorten your input to " + maxLen + " characters maximum (currently " + inputVal.length + " characters).";
    }

    return ""; // no error message means input passed validation.
}

/* Note about date validation... I wanted to write some JS code (like above)
to check if a user entered string was a valid date but it actually seems difficult 
(and looks like you need a framework !!!)  So, we will just use the HTML5 
input type="date" which provides a nice date UI and no way the user can enter 
an invalid date. All we need to do is check that the user clicked a date 
(if the date input is required). For this, we can use the generic "RequiredField"
validation below, for a date or any type of input). 
*/
Validate.RequiredField = (inputVal, isRequired) => {
    if (isRequired && inputVal.length === 0) {
        return "Required";
    }
    return ""; // no error message means input passed validation.
}