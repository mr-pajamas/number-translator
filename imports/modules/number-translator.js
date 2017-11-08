const NUMBERS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const GRADES = ['', '万', '亿', '兆', '京', '垓'];

function parse(input) {
  if (!/^0|([1-9]\d{0,23})$/.test(input)) throw new Error('请输入正整数（最多24位）');
  return [...input].map(char => +char);
}

const d0 = r => {
  r.out += NUMBERS[r.inArray[r.i++]];
  r.out += GRADES[(r.inArray.length - r.i) / 4];
  if (r.i < r.inArray.length) {
    r.inArray[r.i] === 0 ? d3z(r): d3(r);
  }
};

const d0z = r => {
  r.i += 1;
  r.out += GRADES[(r.inArray.length - r.i) / 4];
  if (r.i < r.inArray.length) {
    r.inArray[r.i] === 0 ? d3z(r): d3(r);
  }
};

const d0zz = r => {
  r.i += 1;
  if (r.i < r.inArray.length) {
    if (r.inArray[r.i] === 0) {
      d3z(r);
    } else {
      r.out += '零';
      d3(r);
    }
  }
};

const d1 = r => {
  if (r.i === 0 && r.inArray[r.i] === 1) {
    r.out += '十';
    r.i += 1;
  } else {
    r.out += `${NUMBERS[r.inArray[r.i++]]}十`;
  }
  r.inArray[r.i] === 0 ? d0z(r): d0(r);
};

const d1z = r => {
  if (r.inArray[++r.i] !== 0) {
    r.out += '零';
    d0(r);
  } else {
    d0z(r);
  }
};

const d1zz = r => {
  if (r.inArray[++r.i] !== 0) {
    r.out += '零';
    d0(r);
  } else {
    d0zz(r);
  }
};

const d2 = r => {
  r.out += `${NUMBERS[r.inArray[r.i++]]}百`;
  r.inArray[r.i] === 0 ? d1z(r): d1(r);
};

const d2z = r => {
  if (r.inArray[++r.i] !== 0) {
    r.out += '零';
    d1(r);
  } else {
    d1z(r);
  }
};

const d2zz = r => {
  if (r.inArray[++r.i] !== 0) {
    r.out += '零';
    d1(r);
  } else {
    d1zz(r);
  }
};

const d3 = r => {
  r.out += `${NUMBERS[r.inArray[r.i++]]}千`;
  r.inArray[r.i] === 0 ? d2z(r) : d2(r);
};

const d3z = r => {
  if (r.inArray[++r.i] !== 0) {
    r.out += '零';
    d2(r);
  } else {
    d2zz(r);
  }
};

export default (input) => {
  const inArray = parse(input);
  const r = { inArray, i: 0, out: '' };
  const di = (inArray.length - 1) % 4;
  switch (di) {
    case 0:
      d0(r);
      break;
    case 1:
      d1(r);
      break;
    case 2:
      d2(r);
      break;
    default:
      d3(r);
      break;
  }
  return r.out;
}
