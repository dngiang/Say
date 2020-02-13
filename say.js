//REFER TO README.rtf for more JS information
//TEST STATUS: PASSED

'use strict';

const SINGLE = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
];

const TENS = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety"
];

const TEENS = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen"
];

const THOUSANDS = [
  "", 
  " thousand", 
  " million", 
  " billion"
];

const hyphen = (prefix, suffix) => {
  if (suffix === "") {
    return prefix;
  } else 
  {
    return `${prefix}-${suffix}`;
  }
};

const div = (n, d) => Math.floor(n / d);

const hundred = n => {
  if (n === 0) {
    return undefined;
  } else if (n < 10) {
    return SINGLE[n];

  } else if (n < 20) {
    return TEENS[n - 10];

  } else if (n < 100) {
    return hyphen(TENS[div(n, 10)], SINGLE[n % 10]);

  } else {
    return [SINGLE[div(n, 100)], "hundred", hundred(n % 100)]
      .filter(x => x)
      .join(" ");
  }
};

export class Say {
  inEnglish(digit) {
    if (digit < 0 || digit > 999999999999) {
      throw new Error("Values must be between 0 and 999,999,999,999");
    }
    if (digit === 0) {
      return "zero";
    }
    let n = digit;
    return THOUSANDS.map(thousand => {
      const h = n % 1000;
      n = div(n, 1000);
      const hundredStr = hundred(h);
      return hundredStr && hundredStr + thousand;
    })
      .filter(x => x)
      .reverse()
      .join(" ");
  }
}
