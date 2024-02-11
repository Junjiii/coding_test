////////////// 1. 가운데 글자 가져오기 /////////////

// 문제
// 단어 s의 가운데 글자를 반환하는 함수,
// solution을 만들어 보세요. 단어의 길이가 짝수라면 가운데 두글자를 반환하면 됩니다.

function solution1(s) {
  const num = Math.floor([...s].length / 2);
  return s.length % 2 ? s.substr(num, 1) : s.substr(num - 1, 2);
}

////////////// 2. 나누어 떨어지는 숫자 배열 /////////////

// 문제
// array의 각 element 중 divisor로 나누어 떨어지는 값을 오름차순으로 정렬한 배열을 반환하는 함수, solution을 작성해주세요.
// divisor로 나누어 떨어지는 element가 하나도 없다면 배열에 -1을 담아 반환하세요.

function solution2(arr, divisor) {
  const result = arr.filter((v) => v % divisor === 0).sort((a, b) => a - b);
  return result.length ? result : [-1];
}

////////////// 3. 두 정수 사이의 합  /////////////

// 문제
// 두 정수 a, b가 주어졌을 때 a와 b 사이에 속한 모든 정수의 합을 리턴하는 함수, solution을 완성하세요.
// 예를 들어 a = 3, b = 5인 경우, 3 + 4 + 5 = 12이므로 12를 리턴합니다.

function solution3(a, b) {
  let num = 0;
  for (i = Math.min(a, b); i <= Math.max(a, b); i++) {
    num += i;
  }
  return num;
}

////////////// 4. 문자열 내 p와 y의 개수  /////////////

// 문제
// 대문자와 소문자가 섞여있는 문자열 s가 주어집니다.
// s에 'p'의 개수와 'y'의 개수를 비교해 같으면 True, 다르면 False를 return 하는 solution를 완성하세요.
// 'p', 'y' 모두 하나도 없는 경우는 항상 True를 리턴합니다. 단, 개수를 비교할 때 대문자와 소문자는 구별하지 않습니다.
// 예를 들어 s가 "pPoooyY"면 true를 return하고 "Pyy"라면 false를 return합니다.

function solution4(s) {
  return s.toLowerCase().split("p").length == s.toLowerCase().split("y").length;
}
