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
