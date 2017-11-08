import { assert } from 'meteor/practicalmeteor:chai';

import translateNumbers from './number-translator.js';
import translateNumbers2 from './number-translator2.js';

const samples = [
  { input: '1234', expected: '一千二百三十四' },
  { input: '12345', expected: '一万二千三百四十五' },
  { input: '123456', expected: '十二万三千四百五十六' },
  { input: '12345678', expected: '一千二百三十四万五千六百七十八' },
  { input: '123456789', expected: '一亿二千三百四十五万六千七百八十九' },
  { input: '1234567890', expected: '十二亿三千四百五十六万七千八百九十' },
  { input: '0', expected: '零' },
  { input: '10', expected: '十' },
  { input: '100', expected: '一百' },
  { input: '20000', expected: '二万' },
  { input: '300000', expected: '三十万' },
  { input: '400000000', expected: '四亿' },
  { input: '50000000000', expected: '五百亿' },
  { input: '101', expected: '一百零一' },
  { input: '1001', expected: '一千零一' },
  { input: '10010', expected: '一万零一十' },
  { input: '100100', expected: '十万零一百' },
  { input: '100000100', expected: '一亿零一百' },
  { input: '1000000100', expected: '十亿零一百' },
  { input: '100000001000', expected: '一千亿零一千' },
  { input: '1000000000100', expected: '一兆零一百' },
  { input: '1000000001000', expected: '一兆零一千' },
  { input: '10000000000100', expected: '十兆零一百' },
  { input: '10000000001000', expected: '十兆零一千' },
  { input: '1011', expected: '一千零一十一' },
  { input: '10011', expected: '一万零一十一' },
  { input: '100111', expected: '十万零一百一十一' },
  { input: '101000', expected: '十万一千' },
  { input: '11001000', expected: '一千一百万一千' },
  { input: '10010001000', expected: '一百亿一千万一千' },
  { input: '10010000100', expected: '一百亿一千万零一百' },
  { input: '100001001000', expected: '一千亿零一百万一千' },
  { input: '10000001001000', expected: '十兆零一百万一千' },
];

describe('translateNumbers()', function () {

  for (const sample of samples) {
    it(`转换数字：${sample.input}`, function () {
      const output = translateNumbers(sample.input);
      assert.equal(output, sample.expected);
    });
  }
});

describe('translateNumbers2()', function () {

  for (const sample of samples) {
    it(`转换数字：${sample.input}`, function () {
      const output = translateNumbers2(sample.input);
      assert.equal(output, sample.expected);
    });
  }
});
