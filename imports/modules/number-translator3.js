const NUMBERS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const DIGITS = ['', '十', '百', '千'];
const GRADES = ['', '万', '亿', '兆', '京', '垓'];

function parse(input) {
  if (!/^0|([1-9]\d{0,23})$/.test(input)) throw new Error('请输入正整数（最多24位）');
  return [...input].map(char => +char);
}

function translate(inArray) {
  if (inArray.length === 1 && inArray[0] === 0) return '零';

  let output = '';

  let zero = false; // zero表示是否遇到零
  let straightZeros = true; // straightZeros表示一个四位分组是否全为零

  inArray.forEach((n, i, { length : l }) => {
    const d = (l - 1 - i) % 4; // 计算四位分组单位（千、百、十、个）

    if (n === 0) {
      zero = true;
    } else {
      straightZeros = false;
      if (zero) {
        output += '零';
        zero = false;
      }
      if (i === 0 && n === 1 && d === 1) { // 如果数字开头为10，则不读'一'（'一十' => '十'）
        output += DIGITS[d];
      } else {
        output += `${NUMBERS[n]}${DIGITS[d]}`;
      }
    }

    if (d === 0) { // 一个四位分组结束时
      if (!straightZeros) {
        output += GRADES[(l - 1 - i) / 4]; // 计算分组单位
        zero = false; // 若输出四位组单位，先前遇到的零不读
      }
      straightZeros = true; // 重置
    }
  });

  return output;
}

export default (input) => {
  return translate(parse(input));
}
