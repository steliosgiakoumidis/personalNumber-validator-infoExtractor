const assert = require('assert')
const validator = require('./SwedishPersonalNumber.js')

describe('Personal number', () => {
    it('Age should be 34', () => {
        const test = validator.validateAndExtractInfo('8510201471')
           assert.equal(test.PersonalNumberInfo.age, 34);
       });
    it('Age should be 34', () => {
    const test = validator.validateAndExtractInfo('8510201471')
        assert.equal(test.PersonalNumberInfo.officialFormat, '198510201471');
       });
    it('Age should be 34', () => {
        const test = validator.validateAndExtractInfo('8510201471')
           assert.equal(test.PersonalNumberInfo.gender, 'male');
       });
   });



// const validator = require('./SwedishPersonalNumber.js')

// const a = validator.validateAndExtractInfo('8510201471')

// console.log(a)