function stringReverse(string){
    // input will be string only

    var splittedString = string.split('');
    var reversedString = splittedString.reverse();
    var joinTheReversedString = reversedString.join('');

    // output will be string only

    return(joinTheReversedString);
}

function checkPalindrome(string){
    var stringReverseFunctionOutput = stringReverse(string);
    if(stringReverseFunctionOutput === string){
        return(true);
    }
    else{
        return(false);
    }
}

function convertDateFromNumberToString(number){
    var dateInString = {day: '', month: '', year: ''};
    
    var day = number.day;
    var month = number.month;
    var year = number.year;

    if(day < 10){
        dateInString.day = '0' + day;
    }
    else{
        dateInString.day = day.toString();
    }

    if(month < 10){
        dateInString.month = '0' + month;
    }
    else{
        dateInString.month = month.toString();
    }
    dateInString.year = year.toString();

    return(dateInString);
}
