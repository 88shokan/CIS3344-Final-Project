// Object to hold generic functions that read/write from/to Local Storage
var persist = {};

persist.setItem = function (key, data) {
    localStorage.setItem(key, data);
    console.log("key '" + key + "' written to Local Storage with this value: " + data);
};

persist.getItem = function (key) {
    var data = localStorage.getItem(key);
    console.log("key '" + key + "' read from Local Storage with value: " + data);
    return data;
};

persist.removeItem = function (key) {
    localStorage.removeItem(key);
    console.log("key '" + key + "' has been removed from Local Storage");
};

// Show all data in localStorage
persist.readAllItems = function () {
    var s = "Local storage contains: ";
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        s += key + ":" + localStorage.getItem(key) + ", ";
    }
    console.log(s);
};

persist.setObj = function (key, data) {
    var json = JSON.stringify(data);
    localStorage.setItem(key, json);
    console.log("object key '" + key + "' written to Local Storage with this json data: " + json);
};

persist.getObj = function (key) {
    var json = localStorage.getItem(key);
    var data = JSON.parse(json);
    console.log("object key '" + key + "' read from Local Storage with this json data: " + json);
    return data;
};

persist.showLocalStorage = function () {
    console.log(localStorage);
}