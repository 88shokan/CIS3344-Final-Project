"use strict";

// Builds a DOM element, sets various properties, may appent his DOM element 
// to a parent. Returns the built DOM element. Properties of 'param's input parameter obj: 
// 
// htmlTag (required) the type of DOM element built
// innerHTML (opt'l), set this into the new DOM element
// cssClass (opt'l), add this css class to the new DOM element
// src (opt'l for img tags), set src attribut to this image file name.
// type (opt'l for input tags), set type 
// parent (opt'l) add this new DOM element to parent (also a DOM element)
function MakeTag(params) {
    if (!params.htmlTag) {
        var errorMsg = "Function MakeTag requires a parameter object with an 'htmlTag' property.";
        alert(errorMsg);
        throw new Error(errorMsg);
        return;
    }
    var ele = document.createElement(params.htmlTag);

    if (params.innerHTML) {
        ele.innerHTML = params.innerHTML;
    }
    if (params.src) {
        ele.src = params.src;
    }
    if (params.type) {
        ele.type = params.type;
    }
    if (params.name) {
        ele.name = params.name;
    }
    if (params.value) {
        ele.value = params.value;
    }
    if (params.cssClass) {
        ele.classList.add(params.cssClass);
    }
    if (params.parent) {
        params.parent.appendChild(ele);
    }

    return ele;
}