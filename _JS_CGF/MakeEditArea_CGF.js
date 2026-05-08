 // prevents a misspelled variable from getting a global auto-declared variable.
        "use strict";

        function MakeEditArea_CGF() {

            var ele = document.createElement("div");

          

            var editArea = ele.getElementsByClassName("editAreaC")[0];
            var msgArea = ele.getElementsByClassName("msgAreaC")[0];

            /*  My sample JSON data (pretend coming from DB). 
                Make your JS field names match your JSON field 
                names to prevent issues. 

                "webUserId": "1",
                "userEmail": "abha@temple.edu",
                "image": "https://cis-linux2.temple.edu/~sallyk/pics_users/abha.jpg",
 
                // date format like this to prepopulate html date input tag
                "birthday": "2001-02-29",

                "membershipFee": "",
                "userRoleId": "3",
                "userRoleType": "Member",
                "errorMsg": ""
            */


    var userInputSpecs = [
        {
            "prompt": "User Email: ",
            "fieldName": "userEmail",
            "dataType": "string",
            "isRequired": true, // required field
            "maxLen": 20
        },
        {
            "prompt": "User Image (URL): ",
            "fieldName": "image",
            "dataType": "string",
            "isRequired": false, // empty string is OK
            "maxLen": 500
        },
        {
            "prompt": "Birthday: ",
            "fieldName": "birthday",
            "dataType": "date",
            "isRequired": true // means optional
        },
        {
            "prompt": "Membership Fee: ",
            "fieldName": "membershipFee",
            "dataType": "number",
            "isRequired": false, // means optional
            "maxLen": 10 // 10 characters including decimal point
        }
    ];

            var userToEdit = {
                //"webUserId": "352",
                "userEmail": "sallyk@gmail.com",
                "image": "http://cis-linux2.temple.edu/~sallyk/pics_users/sallyk.jpg",
                "birthday": "1997-02-28", // right format to prefill html date input tag
                "membershipFee": "14000.00"
            };

            function success(inpObj) {
                msgArea.innerHTML += "We will process your request with these values:<br/>";
                for (var propName in inpObj) {
                    msgArea.innerHTML += "&nbsp; &nbsp; " + propName + ": " +
                        inpObj[propName] + "<br/>";
                }
                msgArea.innerHTML += "<br/>";

                msgArea.innerHTML += "To show that passing objects in JS is 'call by reference', " +
                    "here is the original 'userToEdit' object (that also got changed):<br/>";
                for (propName in userToEdit) {
                    msgArea.innerHTML += "&nbsp; &nbsp; " + propName + ": " +
                        userToEdit[propName] + "<br/>";
                }
                msgArea.innerHTML += "<br/>";
            }

            function cancel() {
                msgArea.innerHTML += "Sorry that you decided to cancel.<br/><br/>";
            }

            var component = MakeEditArea({
                inputSpecs: userInputSpecs,
                successCallBack: success,
                cancelCallBack: cancel,
                editObj: userToEdit
            });
            editArea.appendChild(component);

            return ele;

        } 