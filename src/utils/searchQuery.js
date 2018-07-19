const isWordTrust = word => word.length >= 4;

const check = query => query.split(' ').map(isWordTrust);

export const reMount = (q) => {
  if (typeof q === 'undefined' && !q.length) return [];

  console.log(q)

  const checked = check(q);

  return checked.reduce((acc, cur, index) => {
    if (typeof q.split(' ')[index] === 'undefined') return acc;
    if (cur) {
      acc.push(q.split(' ')[index]);
    } else if (acc.length === 0) {
      acc.push(q.split(' ')[index]);
    } else {
      acc[acc.length - 1] = `${acc[acc.length - 1]} ${q.split(' ')[index]}`;
    }

    return acc;
  }, []);
};

export const createArgsWord = (array, quant = 10) => {
  const obj = {};

  for (let i = 0; i < quant; i += 1) {
    if (typeof array[i] !== 'undefined') {
      obj[`word${i + 1}`] = array[i];
    } else {
      obj[`word${i + 1}`] = '';
    }
  }

  return obj;
};

export default reMount;
