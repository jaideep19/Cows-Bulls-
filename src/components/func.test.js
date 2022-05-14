const mp = require('./MultiPlayer');

describe("Hint tests", () => {
    test('Correct Hint Check1', () => {
      expect(mp.getHint(1234, 5634)).toBe("2B0C");
    });

    test('Correct Hint Check2', () => {
        expect(mp.getHint(3412, 5634)).toBe("0B2C");
      });
})

describe("random number tests", () => {
    test('Check length1', () => {
      expect(mp.randomNDigitNumberNotStartingWithZero(4).toString().length).toBe(4);
    });

    test('Check length2', () => {
        expect(mp.randomNDigitNumberNotStartingWithZero("").toString().length).toBe(1);
      });
})