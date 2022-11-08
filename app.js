function stringReverse(string){
    var splittedString = string.split('');
    var reversedString = splittedString.reverse();
    var joinTheReversedString = reversedString.join('');
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

function variationOfDate(stringDate){

    var DDMMYYYY = stringDate.day + stringDate.month + stringDate.year;
    var MMDDYYYY = stringDate.month + stringDate.day + stringDate.year;
    var YYYYMMDD = stringDate.year + stringDate.month + stringDate.day;
    var DDMMYY = stringDate.day + stringDate.month + stringDate.year.slice(2);
    var MMDDYY = stringDate.month + stringDate.day + stringDate.year.slice(2);
    var YYMMDD = stringDate.year.slice(2) + stringDate.month + stringDate.day;

    return([DDMMYYYY,MMDDYYYY,YYYYMMDD,DDMMYY,MMDDYY,YYMMDD]);
}

function checkPalindromeForAllDateFormats(dateFormats){

    var FormatsOfDates = variationOfDate(dateFormats);
    var newArr = [];

    for(var i = 0; i < FormatsOfDates.length; i++){
        if(checkPalindrome(FormatsOfDates[i])){
            newArr.push(true);
        }
        else{
            newArr.push(false);
        }
    }
    return(newArr);
}

function checkForLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
}

function getNextDate(date){

    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var monthEnd = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
        if(checkForLeapYear(year)){
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > monthEnd[month - 1]){
            day = 1;
            month++
        }
        if(month > 12){
            month = 1;
            year++;
        }
    }
    return({day: day, month: month, year: year});
}

function getNextPalindromeDate(date){
    var nextdate = getNextDate(date);
    var cnt = 0;

    while(1){
        cnt++;
        var stringNextDate = convertDateFromNumberToString(nextdate);
        var checkingForAllDateFmt = checkPalindromeForAllDateFormats(stringNextDate);
        for(var i = 0; i < checkingForAllDateFmt.length; i++){
            if(checkingForAllDateFmt[i]){
                return([cnt, nextdate]);
            }
        }
        nextdate = getNextDate(nextdate);
    }
}

function getPrevDate(date){

    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
    var monthEnd = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(day === 0){
        month--;

        if(month === 0){
            month = 12;
            day = 31;
            year--;
        }
        else if(month === 2){
            if(checkForLeapYear(year)){
                day = 29;
            }
            else{
                day = 28;
            }
        }

        else{
            day = monthEnd[month - 1];
        }
    }
    return({day: day, month: month, year: year});
}

function getPrevPalindromeDate(date){
    var prevDate = getPrevDate(date);
    var cnt = 0;

    while(1){
        cnt++;
        var stringPrevDate = convertDateFromNumberToString(prevDate);
        var checkingPalindromeForAllDateFmt =  checkPalindromeForAllDateFormats(stringPrevDate);
        for(var i = 0; i < checkingPalindromeForAllDateFmt.length; i++){
            if(checkingPalindromeForAllDateFmt[i]){
                return([cnt,prevDate]);
            }
        }
        prevDate = getPrevDate(prevDate);
    }
}

function message(msg){
    outputDiv.innerText = msg;
}

function clickEventHandler(){
    var dob = dateOfBirth.value;

    if(dob !== ""){
        var dobSplitted = dob.split("-");
        var DAY = Number(dobSplitted[2]);
        var MONTH = Number(dobSplitted[1]);
        var YEAR = Number(dobSplitted[0]);

        var date = {day: DAY, month: MONTH, year: YEAR};

        var dateString = convertDateFromNumberToString(date);
        var palindromeChecked = checkPalindromeForAllDateFormats(dateString);
        var isPalindrome = false;
        
        for(var i = 0; i < palindromeChecked.length; i++){
            if(palindromeChecked[i]){
                isPalindrome = true;
                break;
            }
        }
        if(!isPalindrome){
            var [cnt1, nextDate] = getNextPalindromeDate(date);
            var [cnt2, prevDate] = getPrevPalindromeDate(date);
            if(cnt1 > cnt2){
                message(`the nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${cnt2} day(s).`)
            }
            else{
                message(`the nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${cnt1} day(s).`)
            }
        }
        else{
            message("selected BirthDate is Palindrome.")
        }
    }
    else{
        message("please select the birthdate.")
    }
    
}



var dateOfBirth = document.querySelector("#birth-date");
var submitBtn = document.querySelector("#submit");
var outputDiv = document.querySelector("#output");

submitBtn.addEventListener("click",clickEventHandler);