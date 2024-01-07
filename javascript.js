/////////////// 1. 문자열 뒤집기

// my_string : 문자열
// s : 정수 (시작점)
// e : 정수 (끝지점)
// 설명 : 주어진 my_string에서 s ~ e 사이의 문자를 뒤집어 문자열로 리턴하는 함수 만들기

///// 생각
// 1. s ~ e 사이의 문자만 따로 만질 수 있게 한다 ( slice() 메소드 )
// 2. 배열로서 전개연산을 해서 다루기 쉽게 만든다 ([...] 메소드 )
// 3. 뒤집고 합친다( reverse(), join() 메소드 )
// 4. my_string 에 같은 부분을 지우고 바꾼 부분을 추가한다. ([...],splice(),join() 메소드)

const solution1 = (my_string, s, e) => {
  const slicedString = my_string.slice(s, e + 1);
  const reverseStr = [...slicedString].reverse().join("");
  const splitMyString = [...my_string];
  splitMyString.splice(s, e - s + 1, reverseStr);
  return splitMyString.join("");
};

/////////////// 2. 문자열 뒤집기

//정수 n 과 문자열 control 이 주어집니다.
//control 은 "w", "a", "s", "d"의 4개의 문자로 이루 어져 있으며,
//controL 의 앞에서부터 순서대로 문자에 따라 n 의 값을 바꿉니다.
// "w" : n 이 1커집니다.
// "s" : n 이 1 작아집니다.
// "d" : n 이 10 커집니다.
// "a": n 이10 작아집니다.
// 위 규칙에 따라 n 을 바꿨을 때 가장 마지막에 나오는 n 의 값을 return 하는 Solution 함수를 완 성해 주세요

///// 생각
// 1. 알파벳 만큼 나눈다 ( [...] 메소드 )
// 2. 알파멧마다 비교작업을 한다 ( if() 메소드 )
// 3. 각각의 알파벳만큼 반복을 수행한다 ( map() 메소드 )
// 4. 결과값 리턴

const solution2_1 = (n, control) => {
  [...control].map((i) => {
    if (i === "w") {
      n += 1;
    } else if (i === "s") {
      n -= 1;
    } else if (i === "d") {
      n += 10;
    } else if (i === "a") {
      n -= 10;
    }
  });
  return n;
};

// 다름 풀이
const operations = {
  w: (n) => n + 1,
  s: (n) => n - 1,
  d: (n) => n + 10,
  a: (n) => n - 10,
};

function solution2_2(n, control) {
  return [...control].reduce((prev, op) => operations[op](prev), n);
}

////////////// 다른 풀이 : 해석
// 알파벳에 맞는 각각의 함수를 객체로 만들어주었다
// [...control] 구조분해 할당
// reduce를 사용한 배열 순회
// prev (accumulator) 누적되는 값
// op (currentValue) 현재 요소
// n 은 최초 실행시 초기값

// operations[op](prev) 이 형식이 이해가 처음에 안 갔는데
// 예를 들어 객체의 해당 키의 값을 불러오려면 obj[key] = value 이기 때문에
// control의 첫번째가 "w" 라면
// operations["w"]  = (n) => n + 1 이 함수가 실행이 되고
// function(parameter) 처럼 prev 가 초기값(n) 이 0 이라면
// operations[op] 라는 함수의 이름에 parameter(0) 이 들어가는 형태이므로
// operations[op](prev) = (prev) => prev + 1 이 되는 뜻이였다.
