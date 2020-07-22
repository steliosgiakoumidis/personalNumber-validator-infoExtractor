const validator = require('./validator.js')

const validateAndExtractInfo = (personalNumber) => {
    var basicValidation = validator.validateBasicData(personalNumber)
    if(!basicValidation.succesful){
        return {error: "Bad format", PersonalNumberInfo: undefined}
    }
    const dateValidation = validator.validateDate(basicValidation.nakedPersonalNumber)
    if(!dateValidation){
        return {error: "The first digits of the provided personal number do not parse into a date", PersonalNumberInfo: undefined}
    }
    const officialFormat = getOfficialFormat(basicValidation.nakedPersonalNumber, basicValidation.symbol)
    const luhnValidation = validator.validateLuhn(officialFormat)
    if(!luhnValidation){
        return {error: "Luhn validation failed", PersonalNumberInfo: undefined}
    }

    const originalString = personalNumber
    const age = calculateAge(officialFormat)
    const birthDate = calculateBithDate(officialFormat)
    const gender = calculateGender(officialFormat)

    return {error: undefined, PersonalNumberInfo: {age: age, birthDate: birthDate, gender: gender, originalString: originalString, officialFormat: officialFormat, isValid: true}}
}

const calculateGender = (personalNumber) => {
    const genderDigit = parseInt(personalNumber.charAt(10))
    if(genderDigit % 2 === 0){
        return "female"
    } else {
        return "male"
    }
}

const calculateBithDate = (personalNumber) => {
    return personalNumber.substring(6,8)+'/'+personalNumber.substring(4,6)+'/'+personalNumber.substring(0,4)
}

const getOfficialFormat = (personalNumber, symbol) => {
    if(personalNumber.length === 10){  
        const twelveDigitsPn = guessTwelveDigitPersonalNumber(personalNumber, symbol)
        return twelveDigitsPn
    } else{
        return personalNumber
    } 
}

 const guessTwelveDigitPersonalNumber = (personalNumber, symbol) => {
        const twoYearString = parseInt(personalNumber.substring(0,2))
        const currentYear = new Date().getFullYear()
        const test = currentYear - (2000 + twoYearString)
        console.log('test: '+test)
        console.log('symbol: '+symbol)
        if(test < 18 || symbol === "plus"){
                return 19 + personalNumber 
        } else{
            return 20 + personalNumber
        } 
    }

const calculateAge = (personalNumber) => {
    debugger
     const now = new Date()
     var birth = personalNumber.substring(4,6)+'/'+personalNumber.substring(6,8)+'/'+personalNumber.substring(0,4)
     const birthDate = new Date(birth)

    var years = (now.getFullYear() - birthDate.getFullYear());

    if (now.getMonth() < birthDate.getMonth() || 
        now.getMonth() == birthDate.getMonth() && now.getDate() < birthDate.getDate()) {
        years--;
    }
     
    return years
}
    


module.exports = {
    validateAndExtractInfo: validateAndExtractInfo
} 