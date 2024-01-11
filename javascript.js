/////////////// 1. 문자열 뒤집기 ////////////////

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

/////////////// 2. 수 조작하기 ////////////////

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

// 다른 풀이
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

/////////////// 3. 등차수열의 특정한 항만 더하기 ///////////////

// 문제
// 두 정수 a, d와 길이가 n 인 boolean 배열 included 가 주어집니다. 첫째항이 a, 공차가
// d 인 등차수열에서 included[1] 가+ 1항을 의미할 때, 이 등차수열의 1항부터 n항까지
// incLuded 가 true인 항들만 더한 값을 return 하는 solution 함수를 작성해 주세요

// 생각
// 1. a는 d 만큼 등차수열이 된다
// 2. included 의 index 길이만큼 등차수열을 적용해서 나열한다.
//    ( 내가 지정한 값만큼 등차수열로 적용할 수 있게 만들어야해서 반복문을 사용해야겠다 라고 생각했고
//      나열한 것들을 다음 작업을 위해 배열에 담아야겠다고 생각했다. ) ( map() 메소드 )
// 3. 같은 index 위치의 값을 비교하여 true 인 것들을 찾아낸다.
//    ( 등차수열을 적용한 배열과 included 의 배열을 비교해서 true 인 등차수열 값을 도출해야한다 ) ( if() 메소드 )
// 4. 해당 결과값 리턴

const solution3 = (a, b, included) => {
  let arr = [];
  let result = 0;

  included.map((i) => {
    arr.push(a);
    a += b;
  });

  for (i = 0; i < arr.length; i++) {
    if (included[i] === true) {
      result += arr[i];
    }
  }
  return result;
};

/////////////// 4. ad 값 제거하기 ///////////////

// 문제
// 문자열 배열 strArr가 주어집니다.
// 배열 내의 문자열 중 "ad"라는 부분 문자열을 포함하고 있는 모든 문자열을 제거하고 남은 문자열을 순서를 유지하여
// 배열로 return 하는 solution 함수를 완성해 주세요.

// 생각
// 1. 배열을 순회하며 무언가를 한다. ( reduce() 메소드 )
// 2. "ad" 포함 여부를 확인한다. ( includes() 메소드 )
// 3. 새로운 배열에 추가하여 재구성한다. (push() 메소드 )
// 4. 값을 리턴한다.

const solution4 = (strArr) => {
  const result = strArr.reduce((acc, flag) => {
    if (!flag.includes("ad")) {
      acc.push(flag);
    }
    return acc;
  }, []);
  return result;
};

/////////////// 5. 문자열 곱하기  ///////////////

// 문제
// 문자열 my_string과 정수 k가 주어질 때, my_string을 k번 반복한 문자열을
// return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. k 만큼 반복 생성
// 2. 생성한 문자열 합치기 ( repeat() 메소드 )

const solution5 = (my_string, k) => {
  return my_string.repeat(k);
};

/////////////// 6. 문자열 섞기  ///////////////

// 문제
// 길이가 같은 두 문자열 str1과 str2가 주어집니다.
// 두 문자열의 각 문자가 앞에서부터 서로 번갈아가면서 한 번씩 등장하는 문자열을 만들어
// return 하는 solution 함수를 완성해 주세요.

// 생각
// 1. 각각 한 문자씩 쪼개서 배열화 한다. ( [...] 전개연산자 메소드 )
// 2. 반복하여 새배열에 번갈아 넣는다. ( for, push() 메소드 )
// 3. 합쳐서 결과물 리턴한다. ( join() 메소드)

const solution6 = (str1, str2) => {
  let a = [...str1];
  let b = [...str2];
  let c = [];
  for (let i = 0; i < a.length; i++) {
    c.push(a[i]);
    c.push(b[i]);
  }
  return c.join("");
};

/////////////// 7. 두 수의 합  ///////////////

// 문제
// 정수 num1과 num2가 주어질 때, num1과 num2의 합을 return하도록 soltuion 함수를 완성해주세요.

const solution7 = (num1, num2) => {
  return num1 + num2;
};

////////////// 8. 두 수의 차  ///////////////

// 문제
// 정수 num1과 num2가 주어질 때, num1에서 num2를 뺀 값을 return하도록 soltuion 함수를 완성해주세요.

const solution8 = (num1, num2) => {
  return num1 - num2;
};

/////////////// 9. 머쓱이보다 키가 큰 사람  ///////////////

// 문제
// 머쓱이는 학교에서 키 순으로 줄을 설 때 몇 번째로 서야 하는지 궁금해졌습니다.
// 머쓱이네 반 친구들의 키가 담긴 정수 배열 array와 머쓱이의 키 height가 매개변수로 주어질 때,
// 머쓱이보다 키 큰 사람 수를 return 하도록 solution 함수를 완성해보세요.

// 생각
// 1. 배열은 순회한다.( reduce() 메소드 )
// 2. index 값과 height 를 비교한다. (if 메소드 )

const solution9 = (array, height) => {
  return array.reduce((acc, flag) => {
    if (flag > height) {
      acc += 1;
    }
    return acc;
  }, 0);
};

// 다른사람 풀이

const solution9_1 = (array, height) => {
  var answer = array.filter((item) => item > height);
  return answer.length;
};

// filter 메소드
// filter 는 배열에 사용하며, 주어진 함수를 만족하는 모든 요소를 모아 새 배열로 반환한다.
// filter() 를 통해 item 과 height 의 크기 비교 후 만족하는 값만 새배열로 반환시켰다.

/////////////// 10. flag에 따라 다른 값 반환하기  ///////////////

// 문제
// 두 정수 a, b와 boolean 변수 flag가 매개변수로 주어질 때,
// flag가 true면 a + b를 false면 a - b를 return 하는 solution 함수를 작성해 주세요.

// 생각
// flag 값이 true & false 인지 확인한다 ( 삼한연산자 메소드 )

const solution10 = (a, b, flag) => {
  return flag === true ? a + b : a - b;
};
