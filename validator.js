const validateBasicData = (personalNumber) => {
    const symbolCheck = checkSymbols(personalNumber)
    console.log(symbolCheck)
    if(!symbolCheck.check){
        return { succesful: false, nakedPersonalNumber: undefined}
    }
    const nakedPersonalNumber = personalNumber.replace(/[^\w\s]/gi, '')
    const isNumber = /^\d+$/.test(nakedPersonalNumber);
    if(!isNumber){
        return { succesful: false, nakedPersonalNumber: undefined}
    }
    
    if(nakedPersonalNumber.length !== 10 && nakedPersonalNumber !== 12 ){
        return { succesful: false, nakedPersonalNumber: undefined}
    }

    return { succesful: true, nakedPersonalNumber: nakedPersonalNumber, symbol: symbolCheck.symbol}
}

const checkSymbols = (personalNumber) => {
    const plus = personalNumber.replace(/[^+]/g, "").length
    const minus = personalNumber.replace(/[^-]/g, "").length
    console.log('plus: '+ plus)
    console.log('minus: '+ minus)
    if(plus >= 1){
        return {check: true, symbol: "plus"}
    }
    if(minus >= 1){
        return {check: true, symbol: "minus"}
    }
    if (plus === 0 && minus === 0){
        return {check: true, symbol: undefined}
    }

    return { check: false, symbol: undefined }
}

const validateDate = (personalNumber) => {
    if(personalNumber.length === 10){
        const dateIsValid = parseDate(personalNumber.substring(0,6))
        if(!dateIsValid){
            return false
        } 
    } else {
        const dateIsValid = parseDate(personalNumber.substring(2,8))
        if(!dateIsValid){
            return false
        } 
    }
    return true
}

const parseDate = (date) => {
    var timestamp = Date.parse(date);
    
    if (isNaN(timestamp) == false) {
      return true;
    }

    return false;
 }

 const validateLuhn = (personalNumber) => {
    const numArray = Array.from(personalNumber.substring(2, 12), x => parseInt(x))
    let tempProductArray = new Array(9)
    let multiplicationFactor = 2
    debugger
    for (let i = 0; i < numArray.length - 1; i++) {
        let temp = numArray[i] * multiplicationFactor;
        if (temp < 10)
        {
            tempProductArray[i] = temp;
        }
        else
        {
            tempProductArray[i] = theSumOfTwoDigitNumber(temp);
        }
        if(multiplicationFactor === 2){
            multiplicationFactor = 1
        } else {
            multiplicationFactor = 2
        }
    }
    
    const arraySum = tempProductArray.reduce((a, b) => a + b, 0)
    let lastDigit = 10 - arraySum % 10;
    if (lastDigit == 10)
    {
        lastDigit = 0;
    }
    return lastDigit === parseInt(personalNumber.slice(-1))
}

const theSumOfTwoDigitNumber = (twoDigitNumber) => {
    return twoDigitNumber % 10 + Math.floor(twoDigitNumber / 10);
}

module.exports = {
    validateBasicData: validateBasicData,
    validateDate: validateDate,
    validateLuhn: validateLuhn
}