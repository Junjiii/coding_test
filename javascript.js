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

/////////////// 11. 홀짝에 따라 다른 값 반환하기  ///////////////

// 문제
// 양의 정수 n이 매개변수로 주어질 때,
// n이 홀수라면 n 이하의 홀수인 모든 양의 정수의 합을 return 하고
// n이 짝수라면 n 이하의 짝수인 모든 양의 정수의 제곱의 합을 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. n 의 홀수 짝수 판단 ( if() 메소드 => n%2 나머지 값 )
// 2. 반복하여 수행 ( 반복 시작값을 지정 / 증가값도 지정 => for() 메소드로 상세하게 지정함 )

const solution11 = (n) => {
  let sum = 0;
  if (n % 2 === 0) {
    for (i = 2; i <= n; i += 2) {
      sum += i * i;
    }
  } else {
    for (i = 1; i <= n; i += 2) {
      sum += i;
    }
  }
  return sum;
};

/////////////// 12. 순서 바꾸기  ///////////////

// 문제
// 정수 리스트 num_list와 정수 n이 주어질 때,
// num_list를 n 번째 원소 이후의 원소들과 n 번째까지의 원소들로 나눠
// n 번째 원소 이후의 원소들을 n 번째까지의 원소들 앞에 붙인 리스트를 return하도록 solution 함수를 완성해주세요.

// 생각
// 1. n 이후의 원소들을 잘라내야한다. ( splice() 메소드 )
// 2. 맨 처음으로 합혀서 리턴한다 ( concat() 메소드 )

const solution12 = (num_list, n) => {
  let arr = num_list.splice(n, num_list.length);
  return arr.concat(num_list);
};

/////////////// 13. 접미사인지 확인하기   ///////////////

// 문제
// 어떤 문자열에 대해서 접미사는 특정 인덱스부터 시작하는 문자열을 의미합니다.
// 예를 들어, "banana"의 모든 접미사는 "banana", "anana", "nana", "ana", "na", "a"입니다.
// 문자열 my_string과 is_suffix가 주어질 때,
// is_suffix가 my_string의 접미사라면 1을, 아니면 0을 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. 접미사 : 단어 끝문자를 시작으로 이어지는 단어
// 2. my_string 끝부분부터 비교 (endWith() 메소드)

const solution13 = (string, include) => {
  return Number(string.endsWith(include));
};

/////////////// 14. n개 간격의 원소들   ///////////////

// 문제
// 정수 리스트 num_list와 정수 n이 주어질 때, \
// num_list의 첫 번째 원소부터 마지막 원소까지 n개 간격으로 저장되어있는
// 원소들을 차례로 담은 리스트를 return하도록 solution 함수를 완성해주세요.

// 생각
// 1. 일정 간격으로 주어진 배열 안에서 n개 이후의 값을 찾아낸다 ( for() 메소드 )
// 2. 찾아낸 값을 새로운 배열에 추가해서 리턴한다. ( push() 메소드 )

const solution14 = (num_list, n) => {
  const result = [];
  for (i = 0; i < num_list.length; i += n) {
    result.push(num_list[i]);
  }
  return result;
};

/////////////// 15. 세로 읽기   ///////////////

// 문제
// 문자열 my_string과 두 정수 m, c가 주어집니다.
// my_string을 한 줄에 m 글자씩 가로로 적었을 때
// 왼쪽부터 세로로 c번째 열에 적힌 글자들을 문자열로 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. 반복문을 사용하되 index가 m 값만큼 증가한다. ( for() 메소드 )
// 2. 문자열에서 원하는 값만큼 잘라내야하는데 slice는 시작지점 끝지점으로 지정해야해서 불편함
//  따라서 substr() 메소드로 시작지점, 잘라낼 갯수 로 지정하기로함
// 3. 다시한번 더 substr 을 사용하여 c 번쨰 단어 1개를 잘라냄 ( substr(c-1,1) )
// 4. 배열에 각각 추가하여 합쳐서 리턴한다. ( push(), join())

const solution15 = (str, m, c) => {
  const arr = [];
  for (i = 0; i < str.length; i += m) {
    const string = str.substr(i, m);
    arr.push(string.substr(c - 1, 1));
  }
  return arr.join("");
};

/////////////// 16. 배열 만들기 1   ///////////////

// 문제
// 정수 n과 k가 주어졌을 때, 1 이상 n이하의 정수 중에서 k의 배수를 오름차순으로
// 저장한 배열을 return 하는 solution 함수를 완성해 주세요.

// 생각
// 1. k  배수만큼 n 숫자까지 반복적으로 처리해야한다 (for() 메소드 )
// 2. 빈 배열에 추가하여 리턴한다.

const solution16 = (n, k) => {
  const arr = [];
  for (i = k; i <= n; i += k) {
    arr.push(i);
  }
  return arr;
};

/////////////// 17. 가까운 1 찾기  ///////////////

// 문제
// 정수 배열 arr가 주어집니다. 이때 arr의 원소는 1 또는 0입니다.
// 정수 idx가 주어졌을 때, idx보다 크면서 배열의 값이 1인 가장 작은 인덱스를 찾아서 반환하는 solution 함수를 완성해 주세요.
// 단, 만약 그러한 인덱스가 없다면 -1을 반환합니다.

// 생각
// 1. 결과값은 조건에 맞는 index 다.
// 2. 조건은 idx 보다 큰 index 중에 값이 1 인 index
// 3. 반복적으로 수행해서 판별 후 리턴한다. (for () 메소드 )

const solution17_1 = (arr, idx) => {
  let result;
  for (i = idx; i <= arr.length; i++) {
    if (arr[i] === 1) {
      result = i;
      break;
    } else {
      result = -1;
    }
  }
  return result;
};

/////// 다른 사람 풀이

const solution17_2 = (arr, idx) => {
  return arr.findIndex((flag, i) => idx <= i && flag === 1);
};

// findIndex()
// (callback) callback 함수에 조건에 맞는 것을 반환한다.
// 조건에 일치하는 것이 없다면? -1 (false) 를 반환한다.

/////////////// 18. 문자열의 뒤 n글자   ///////////////

// 문제
// 문자열 my_string과 정수 n이 매개변수로 주어질 때,
// my_string의 뒤의 n글자로 이루어진 문자열을 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. 뒤부터 n 개의 글자  = 자르는 시작 지점은 my_string.length - n
// 2. substr()를 사용해 시작 지점부터 끝까지 잘라내 반환하기

const solution18 = (string, n) => string.substr(string.length - n);

/////////////// 19. 리스트 자르기   ///////////////

// 문제
// 정수 n과 정수 3개가 담긴 리스트 slicer 그리고 정수 여러 개가 담긴 리스트 num_list가 주어집니다.
// slicer에 담긴 정수를 차례대로 a, b, c라고 할 때, n에 따라 다음과 같이 num_list를 슬라이싱 하려고 합니다.

// n = 1 : num_list의 0번 인덱스부터 b번 인덱스까지
// n = 2 : num_list의 a번 인덱스부터 마지막 인덱스까지
// n = 3 : num_list의 a번 인덱스부터 b번 인덱스까지
// n = 4 : num_list의 a번 인덱스부터 b번 인덱스까지 c 간격으로

// 올바르게 슬라이싱한 리스트를 return하도록 solution 함수를 완성해주세요.

// 생각
// 1. 각 n 마다 조건이 맞는 배열의 요소를 잘라내야한다 (slice())
// 2. 각 n 마다 이뤄지는 기능이 다르다. (swich...case 메소드 )
// 2.  n 이 4 일때 c 간격의 요소를 찾아낸다 = 간격이라는 얘기는 a부터 b까지의 index 중 c 로 나누었을때 나머지가 0인 경우이다.
// 3. 위 조건을 코드로 !index%c) 이렇게 표현이 가능하다.

const solution19 = (n, slicer, num_list) => {
  let [a, b, c] = [...slicer];
  switch (n) {
    case 1:
      return num_list.slice(0, b + 1);
    case 2:
      return num_list.slice(a);
    case 3:
      return num_list.slice(a, b + 1);
    case 4:
      return num_list.slice(a, b + 1).filter((_, idx) => !(idx % c));
  }
};

/////////////// 20. 첫번쨰로 나오는 음수   ///////////////

// 문제
// 정수 리스트 num_list가 주어질 때,
// 첫 번째로 나오는 음수의 인덱스를 return하도록 solution 함수를 완성해주세요. 음수가 없다면 -1을 return합니다.

// 생각
// 1. 반복적 수행 ( for() )
// 2. 조건에 맞는 것을 찾으면 반복문 종료 ( if() break )

const solution20_1 = (num_list) => {
  for (i = 0; i <= num_list.length; i++) {
    if (num_list[i] < 0) {
      return i;
      break;
    }
  }
  return -1;
};

////// 다른 사람 풀이

const solution = (num_list) => num_list.findIndex((v) => v < 0);
