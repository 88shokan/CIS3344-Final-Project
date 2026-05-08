 function TwoEditAreas_CGF() {  
        var ele = document.createElement("div");
        ele.appendChild(MakeLoanApplicationEdit_CGF()); // but use the CGF for your first entity
        ele.appendChild(MakeInvestmentEdit_CGF()); // but use the CGF for your second entity
        return ele;
    }