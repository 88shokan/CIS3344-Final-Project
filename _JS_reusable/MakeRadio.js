"use strict";

/*
MakeRadio: create and return a <form> tag that holds a radio group with an overall prompt, 
then prompts for all the choices. Here's an example of the HTML that might be built 
- if the consumer passed in this parameter object:
  {
    prompt: "Select your favorite pizza topping:", 
    choices: ["Cheeze","Mushrooms","Pepperoni"],
    selected: "Mushrooms"
  }

 <form>
   Select your favorite pizza topping:
   <p><input type="radio" name="favTopping" value="Chz" /> Cheeze  </p>
   <p><input type="radio" name="favTopping" value="Mush" checked /> Mushrooms </p>
   <p><input type="radio" name="favTopping" value="Pep" /> Pepperoni </p>
 </form>

All radio inputs that have the same "name" attribute are bundled together 
into a "radio group" (by the browser).  If you had three different radio groups
in the form, you'd specify that (in HTML) by having have three different name
attributes to show the browser how to group them together. But, since we are 
just creating one radio group in our form, we can just "hard code"
the name attribute (we just use "radName"). 

To programatically reference the value of a radio group, you reference the form
then the name attribute then specify the value property, like this: 

    form.favTopping.value // (e.g., for the radio group in the HTML above)  -OR-
    form.radName.value // (e.g., for the radio group created by the JS code below)

A <form> tag does not have a value property, but we add a custom property called 
"value" to our form. This makes it easier for the consumer to access the current value 
of the radio group (frm.value, instead having to specify frm.favTopping.value or
frm.radName.value). 

NOTE: we typically avoid <form> tags with single page applications. This is because a submit
    button inside a <form> (when clicked) would try to post to a server page (and we'd 
    loose control of our page). However, since we are creating the <form> tag and we 
    are NOT putting any submit buttons inside, it should be OK.
*/

// Destructured input parameter (with default values specified in function header). 
function MakeRadio({
    prompt = "Enter a value",
    choices = ["Radio Button Selection"],
    selected = "" }) {

    var frm = document.createElement("form"); // note not a div !!!
    frm.classList.add("radio");
    frm.innerHTML = prompt;

    // "for .. of" is easier way to iterate over an array -- you don't have to use index i.
    // choice represents choices[i] if you had used an index value. 
    for (var choice of choices) {
        /* 
        If "choice" (one of the array elements) matches the "selected" property, 
        then this radio input should have a "checked" attribute so that it's 
        pre-selected in the UI. */
        var checkedAttrib;
        if (choice === selected) {
            frm.value = choice; // preselect the value into the form component.
            checkedAttrib = "checked"; // show the preselected value on the UI.
        } else {
            checkedAttrib = "";
        }

        /* 
        What we use for the name attribute ("radName", below) does not really matter,
        but all radio inputs must have the same name to be grouped together into one 
        "radio group". */
        var paraOption = document.createElement("p");
        paraOption.innerHTML = `
            <p>
                <input type="radio" name="radName" value="${choice}" ${checkedAttrib}/>
                <span>${choice}</span>
            </p>
        `;

        /* 
        Whenever the user clicks on one of the radio inputs, copy the radio group's 
        value right up into the form (our custom "value" property).  */
        paraOption.onclick = function () {
            frm.value = frm.radName.value;
        };

        frm.appendChild(paraOption);

    } // for loop

    return frm;
}