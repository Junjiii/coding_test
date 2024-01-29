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

const solution20_2 = (num_list) => num_list.findIndex((v) => v < 0);

/////////////// 21. 배열 만들기 3  ///////////////

// 문제
// 정수 배열 arr와 2개의 구간이 담긴 배열 intervals가 주어집니다.
// intervals는 항상 [[a1, b1], [a2, b2]]의 꼴로 주어지며 각 구간은 닫힌 구간입니다.
// 닫힌 구간은 양 끝값과 그 사이의 값을 모두 포함하는 구간을 의미합니다.
// 이때 배열 arr의 첫 번째 구간에 해당하는 배열과 두 번째 구간에 해당하는 배열을 앞뒤로 붙여
// 새로운 배열을 만들어 return 하는 solution 함수를 완성해 주세요.

// 생각
// 1. intervals[0] 과 intervals[1] 각각 구간에 맞는 요소들을 뽑아낸다.(filter() 메소드 )
// 2. 배열들을 합쳐서 리턴한다. (concat() )

const solutio21_2 = (arr, intervals) => {
  const [[a1, b1], [a2, b2]] = intervals;

  const arr1 = arr.filter((_, i) => i >= a1 && i <= b1);
  const arr2 = arr.filter((_, i) => i >= a2 && i <= b2);
  const result = arr1.concat(arr2);
  return result;
};

////// 다른 사람 풀이
const solution21_2 = (arr, intervals) => {
  const [[a, b], [c, d]] = intervals;
  return [...arr.slice(a, b + 1), ...arr.slice(c, d + 1)];
};

/////////////// 22. 2의 영역   ///////////////

// 문제
// 정수 배열 arr가 주어집니다.
// 배열 안의 2가 모두 포함된 가장 작은 연속된 부분 배열을 return 하는 solution 함수를 완성해 주세요.
// 단, arr에 2가 없는 경우 [-1]을 return 합니다.

// 생각
// 2가 포함된 구간을 골라내야한다. (infdexOf, lastIndexOf 메소드)
// 시작 지점 + 끝지점이 없다면 (1보다 작다면) [-1] 리턴 / 있다면 잘라내기

const solution22 = (arr) => {
  const startIdx = arr.indexOf(2);
  const endIdx = arr.lastIndexOf(2);

  return startIdx + endIdx < 1 ? [-1] : arr.slice(startIdx, endIdx + 1);
};

/////////////// 23. 1로 만들기    ///////////////

// 문제
// 정수가 있을 때, 짝수라면 반으로 나누고, 홀수라면 1을 뺀 뒤 반으로 나누면, 마지막엔 1이 됩니다.
// 예를 들어 10이 있다면 다음과 같은 과정으로 1이 됩니다.
// 정수들이 담긴 리스트 num_list가 주어질 때, num_list의 모든 원소를 1로 만들기 위해서
// 필요한 나누기 연산의 횟수를 return하도록 solution 함수를 완성해주세요.

// 생각
// 1. while을 활용하여 조건이 참일때까지 반복 처리를 한다.
// 2. 한번 처리할대마다 카운트를 해준다
// 3. 마무리하고 카운트한 결과값을 리턴한다.

const solution23 = (arr) => {
  const result = arr.reduce((acc, flag) => {
    let currentFlag = flag;
    let count = 0;
    while (currentFlag !== 1) {
      if (currentFlag % 2 === 0) {
        currentFlag = currentFlag / 2;
      } else if (currentFlag % 2 === 1) {
        currentFlag = (currentFlag - 1) / 2;
      }
      count += 1;
    }
    return acc + count;
  }, 0);
  return result;
};

/////////////// 24. n 번째 원소부터   ///////////////

// 문제
// 정수 리스트 num_list와 정수 n이 주어질 때,
// n 번째 원소부터 마지막 원소까지의 모든 원소를 담은 리스트를 return하도록 solution 함수를 완성해주세요.

// 생각
// slice() 메소드를 사용하여 잘라낸다.

const solution24 = (num_list, n) => {
  return num_list.slice(n - 1);
};

/////////////// 25. 글자 지우기   ///////////////

// 문제
// 문자열 my_string과 정수 배열 indices가 주어질 때,
// my_string에서 indices의 원소에 해당하는 인덱스의 글자를
// 지우고 이어 붙인 문자열을 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. 다루기 쉽게 배열화 한다. (전개연산자 )
// 2. 조건에 맞는 요소만 골라낸다. (filter())
// 3. 문자열로 합쳐서 리턴한다.

const solution25 = (my_string, indices) => {
  return [...my_string].filter((_, i) => !indices.includes(i)).join("");
};

/////////////// 26. 왼쪽 오른쪽  ///////////////

// 문제
// 문자열 리스트 str_list에는 "u", "d", "l", "r" 네 개의 문자열이 여러 개 저장되어 있습니다.
// str_list에서 "l"과 "r" 중 먼저 나오는 문자열이 "l"이라면 해당 문자열을 기준으로 왼쪽에 있는 문자열들을 순서대로 담은 리스트를,
// 먼저 나오는 문자열이 "r"이라면 해당 문자열을 기준으로 오른쪽에 있는 문자열들을 순서대로 담은 리스트를 return하도록 solution 함수를 완성해주세요.
// "l"이나 "r"이 없다면 빈 리스트를 return합니다.

// 생각
// 1. 포함하고 있는 인덱스를 찾아낸다 (findIndex())
// 2. index의 값에 따라 배열을 잘라낸다.

const solution26 = (str_list) => {
  const index = str_list.findIndex((item) => item === "l" || item === "r");
  if (index === -1) {
    return [];
  } else if (str_list[index] === "l") {
    return str_list.slice(0, index);
  } else {
    return str_list.slice(index + 1);
  }
};

/////////////// 27. flag에 따라 다른 값 반환하기  ///////////////

// 문제
// 두 정수 a, b와 boolean 변수 flag가 매개변수로 주어질 때,
// flag가 true면 a + b를 false면 a - b를 return 하는 solution 함수를 작성해 주세요.

const solution27 = (a, b, flag) => {
  return flag === true ? a + b : a - b;
};

/////////////// 28. 홀수 vs 짝수   ///////////////

// 문제
// 정수 리스트 num_list가 주어집니다. 가장 첫 번째 원소를 1번 원소라고 할 때,
// 홀수 번째 원소들의 합과 짝수 번째 원소들의 합 중 큰 값을 return 하도록 solution 함수를 완성해주세요.
// 두 값이 같을 경우 그 값을 return합니다.

// 생각
// 1. Index 가 홀수 / 짝수인 것을 골라낸다. (filter())
// 2. 값들을 합친다. (reduce())
// 3. 상항연산자를 사용해 결과갑을 리턴한다.

const solution28_1 = (num_list) => {
  const oddNum = num_list
    .filter((_, i) => i % 2 !== 0)
    .reduce((acc, flag) => (acc += flag), 0);
  const evenNum = num_list
    .filter((_, i) => i % 2 === 0)
    .reduce((acc, flag) => (acc += flag), 0);
  return oddNum >= evenNum ? oddNum : evenNum;
};

////// 다른 사람 풀이

const solution28_2 = (num_list) => {
  let even = 0;
  let odd = 0;

  num_list.map((v, idx) => {
    !(idx % 2) ? (even += v) : (odd += v);
  });

  return odd > even ? odd : even;
};

/////////////// 29. 5명씩   ///////////////

// 문제
// 최대 5명씩 탑승가능한 놀이기구를 타기 위해 줄을 서있는 사람들의 이름이 담긴 문자열 리스트 names가 주어질 때,
// 앞에서 부터 5명씩 묶은 그룹의 가장 앞에 서있는 사람들의 이름을 담은 리스트를 return하도록 solution 함수를 완성해주세요.
// 마지막 그룹이 5명이 되지 않더라도 가장 앞에 있는 사람의 이름을 포함합니다.

// 생각
// 1. 5영씩 새 배열을 잘라내어 배열로 만든다.
// 2. 잘라낸 배열 중 가장 첫번째 사람을 찾아낸다.
// 3. 그렇다명 결국 결과값의 인덱스 번호는 5의 배수이므로 나머지 값이 0 인 것을 찾아낸다.

const solution29 = (names) => names.filter((v, idx) => idx % 5 === 0);

/////////////// 30. 할 일 목록  ///////////////

// 문제
// 오늘 해야 할 일이 담긴 문자열 배열 todo_list와 각각의 일을 지금 마쳤는지를 나타내는 boolean 배열 finished가 매개변수로 주어질 때,
// todo_list에서 아직 마치지 못한 일들을 순서대로 담은 문자열 배열을 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. todo_list 와 finished 의 길이는 같다 => 조건의 맞는 finished[i] 는 길이가 같기 떄문에 todo_list 의 index 와 동일하다.
// 2. filter()  를 사용해서 리턴한다.

const solution30 = (todo_list, finished) => {
  return todo_list.filter((e, i) => !finished[i]);
};

/////////////// 31. 원하는 문자열 찾기 ///////////////

// 문제
// 알파벳으로 이루어진 문자열 myString과 pat이 주어집니다.
// myString의 연속된 부분 문자열 중 pat이 존재하면 1을 그렇지 않으면 0을 return 하는 solution 함수를 완성해 주세요.
// 단, 알파벳 대문자와 소문자는 구분하지 않습니다.

// 생각
// 1. 비교연산자 ==  로 비교하기엔 엄격하지 못해 전부 소문자형으로 변환 (toLowerCase())
// 2. 포함 여부를 확인한다. includes()

const solution31 = (myString, pat) => {
  return +myString.toLowerCase().includes(pat.toLowerCase());
};

/////////////// 32. n보다 커질때까지 더하기  ///////////////

// 문제
// 정수 배열 numbers와 정수 n이 매개변수로 주어집니다. numbers의 원소를 앞에서부터 하나씩 더하다가
// 그 합이 n보다 커지는 순간 이때까지 더했던 원소들의 합을 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. 반복적으로 수행한다.
// 2. 조건에 맞을때 멈춘다.

const solution32 = (numbers, n) => {
  let result = 0;

  for (let i = 0; i <= numbers.length && (result += numbers[i]) <= n; i++);

  return result;
};

/////// 다른 사람 풀이

function solution32(numbers, n) {
  var answer = 0;
  let i = 0;
  while (answer <= n) {
    answer += numbers[i++];
  }
  return answer;
}

/////////////// 33. 배열에서 문자열 대소문자 변환하기 ///////////////

// 문제
// 문자열 배열 strArr가 주어집니다. 모든 원소가 알파벳으로만 이루어져 있을 때,
// 배열에서 홀수번째 인덱스의 문자열은 모든 문자를 대문자로,
// 짝수번째 인덱스의 문자열은 모든 문자를 소문자로 바꿔서 반환하는 solution 함수를 완성해 주세요.

// 생각
// 1. 반복한다.
// 2. 짝수 혹수 일떄 값을 변환하여 새로운 배열에 추가한다.

function solution33(strArr) {
  let resultArr = [];

  for (let i = 0; i < strArr.length; i++) {
    if (i % 2 === 0) {
      resultArr.push(strArr[i].toLowerCase());
    } else {
      resultArr.push(strArr[i].toUpperCase());
    }
  }

  return resultArr;
}

/////////////// 34. A 강조하기 ///////////////

// 문제
// 문자열 myString이 주어집니다. myString에서 알파벳 "a"가 등장하면 전부 "A"로 변환하고,
// "A"가 아닌 모든 대문자 알파벳은 소문자 알파벳으로 변환하여 return 하는 solution 함수를 완성하세요.

// 생각
// 1. 다루기 쉽게 배열화 한다. (전개 연산자)
// 2. 배열을 순회한다 (map())
// 3. 소문자 a 가 맞다면 대문자로 바꾸고 대문자 A는 그냥 둔다 (toUpperCase)
// 4. 나머지 알파벳은 소문자로 바꾼다. (toLowerCase)

const solution34 = (myString) => {
  return [...myString]
    .map((v) => {
      if (v.toLowerCase() === "a") {
        return v.toUpperCase();
      } else {
        return v.toLowerCase();
      }
    })
    .join("");
};

//// 다른 사람 풀이

const solution34_1 = (s) => s.toLowerCase().replaceAll("a", "A");

const solution34_2 = (myString) => {
  return [...myString]
    .map((str) => (["a", "A"].includes(str) ? "A" : str.toLowerCase()))
    .join("");
};

/////////////// 35. 특정한 문자를 대문자로 바꾸기 ///////////////

// 문제
// 영소문자로 이루어진 문자열 my_string과 영소문자 1글자로 이루어진 문자열 alp가 매개변수로 주어질 때,
// my_string에서 alp에 해당하는 모든 글자를 대문자로 바꾼 문자열을 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. 조건에 맞는 alp 를 대문자로 대체한다. (replaceAll())

const solution35 = (my_string, alp) => {
  return my_string.replaceAll(alp, alp.toUpperCase());
};

/////////////// 36. 조건에 맞게 수열 변환하기 3 ///////////////

// 문제
// 정수 배열 arr와 자연수 k가 주어집니다.
// 만약 k가 홀수라면 arr의 모든 원소에 k를 곱하고, k가 짝수라면 arr의 모든 원소에 k를 더합니다.
// 이러한 변환을 마친 후의 arr를 return 하는 solution 함수를 완성해 주세요.

// 생각
// 1. 삼항연산자를 사용해 조건에 맞는 연산식을 배열을 순회하며 적용한다 (map(삼항연산자))

const solution36 = (arr, k) => arr.map((v) => (k % 2 ? v * k : v + k));

/////////////// 37. 특정 문자열로 끝나는 가장 긴 부분 문자열 찾기 ///////////////

// 문제
// 문자열 myString과 pat가 주어집니다.
// myString의 부분 문자열중 pat로 끝나는 가장 긴 부분 문자열을 찾아서 return 하는 solution 함수를 완성해 주세요.

// 생각
// 1. pat의 마지막 스펠링 위치 알아내기
// 2. 알아낸 마지막 위치가 myString 어디에 위치한지 찾기
// 3. 위치를 가지고 잘라낸다.

const solution37_1 = (myString, pat) => {
  const length = [...pat][pat.length - 1];
  const end = myString.lastIndexOf(length);
  const result = myString.slice(0, end + 1);
  return result;
};

////// 다른 사람 풀이

const solution37_2 = (str, pat) => str.substring(0, str.lastIndexOf(pat)) + pat;

// 굳이 포함된 위치까지 잘라낼 필요가 없었다.

/////////////// 38. 배열의 원소만큼 추가하기///////////////

// 문제
// 아무 원소도 들어있지 않은 빈 배열 X가 있습니다. 양의 정수 배열 arr가 매개변수로 주어질 때,
// arr의 앞에서부터 차례대로 원소를 보면서 원소가 a라면 X의 맨 뒤에 a를 a번 추가하는 일을 반복한 뒤의 배열 X를
// return 하는 solution 함수를 작성해 주세요.

// 생각
// 배열을 순회하여 새로운 값을 만들어야한다.
// 원소의 값만큼 해당 원소로 길이를 채운다.
// 채운 원소를 합친다.

const solution38 = (arr) => {
  return arr.reduce((X, f) => X.concat(Array(f).fill(f)), []);
};

///// 다른 사람 풀이
const solution38_2 = (arr) => {
  return arr.reduce((list, num) => [...list, ...new Array(num).fill(num)], []);
};

// concat 보다 배열안에서 전개연산자를 사용하여 합치는 것이 속도가 더 빠르다 .

/////////////// 39. 문자열이 몇 번 등장하는지 세기 //////////////

// 문제
// 문자열 myString과 pat이 주어집니다.
// myString에서 pat이 등장하는 횟수를 return 하는 solution 함수를 완성해 주세요.

// 생각
// 1. 앞에서 부터 pat 의 길이랑 같이 잘라낸다.
// 2. 잘라낸 것이 pat 이랑 같다면 count에 1을 더한다.
// 3. pat 보다 길이가 작은 부분은 검사할 필요가 없기 떄문에 반복문의 i는 myString.length - pat.length 까지만 하게 만든다.

const solution39 = (myString, pat) => {
  let count = 0;
  for (let i = 0; i <= myString.length - pat.length; i++) {
    if (myString.slice(i, i + pat.length) === pat) {
      count++;
    }
  }
  return count;
};

/////////////// 40. 공백으로 구분하기 2 //////////////

// 문제
// 단어가 공백 한 개 이상으로 구분되어 있는 문자열 my_string이 매개변수로 주어질 때,
// my_string에 나온 단어를 앞에서부터 순서대로 담은 문자열 배열을 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. 공백을 기준으로 쪼갠다 (split())
// 2. 요소의 값이 있는것만 골라낸다. (filter())

const solution40 = (my_string) => {
  return my_string.split(" ").filter((v) => v);
};

////// 다른 사람 풀이

const solution40_1 = (my_string) => {
  return my_string.trim().split(/ +/);
};

/////////////// 41. x 사이의 개수 //////////////

// 문제
// 문자열 myString이 주어집니다. myString을 문자 "x"를 기준으로 나눴을 때
// 나눠진 문자열 각각의 길이를 순서대로 저장한 배열을 return 하는 solution 함수를 완성해 주세요.

// 생각
// 1. "x" 를 기준으로 쪼갠다 (split())
// 2. 배열은 순회하며 나눠진 값으 길이를 구한다. (map())

const solution41 = (myString) => {
  return myString.split("x").map((v) => v.length);
};

/////////////// 42. 문자열 잘라서 정렬하기 //////////////

// 문제
// 문자열 myString이 주어집니다.
//  "x"를 기준으로 해당 문자열을 잘라내 배열을 만든 후 사전순으로 정렬한 배열을 return 하는 solution 함수를 완성해 주세요.
// 단, 빈 문자열은 반환할 배열에 넣지 않습니다.

// 생각
// 1. "x" 를 기준으로 잘라낸다. (split())
// 2. 값이 있는것만 골라낸다.(filter(Boolean))
// 3. 오름차순으로 정렬한다. (sort())

const solution42 = (myString) => {
  return myString.split("x").filter(Boolean).sort();
};

/////////////// 43. 문자열 잘라서 정렬하기 //////////////

// 문제
// 문자열 binomial이 매개변수로 주어집니다.
// binomial은 "a op b" 형태의 이항식이고 a와 b는 음이 아닌 정수,
// op는 '+', '-', '*' 중 하나입니다. 주어진 식을 계산한 정수를 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. 공백을 기준으로 쪼개준다. (split)
// 2. "+","-","*" 떄마다 각각 연산을 다르게 적용한다. (switch case )

const solution43 = (binomial) => {
  const [a, op, b] = binomial.split(" ");
  switch (op) {
    case "+":
      return +a + +b;
    case "-":
      return +a - +b;
    case "*":
      return +a * +b;
  }
};

//////// 다른 사람 풀이

const ops = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
};

function solution43_1(binomial) {
  const [a, op, b] = binomial.split(" ");
  return ops[op](+a, +b);
}

////////////// 44. 문자열 바꿔서 찾기 //////////////

// 문제
// 문자 "A"와 "B"로 이루어진 문자열 myString과 pat가 주어집니다.
// myString의 "A"를 "B"로, "B"를 "A"로 바꾼 문자열의 연속하는 부분 문자열 중
// pat이 있으면 1을 아니면 0을 return 하는 solution 함수를 완성하세요.

// 생각
// 1. 배열로 쪼갠다 (전개연산자)
// 2. 배열을 순회하여 "A" 는 "B" / "B" 는 "A" 로 바꿔준다.
// 3. 합쳐서 pat 이 포함되어있는지 확인한다. (join / includes)

const solution44 = (myString, pat) => {
  return +[...myString]
    .map((v) => (v === "A" ? (v = "B") : (v = "A")))
    .join("")
    .includes(pat);
};

////////////// 45. 배열 비교하기 //////////////

// 문제
// 이 문제에서 두 정수 배열의 대소관계를 다음과 같이 정의합니다.
// 두 배열의 길이가 다르다면, 배열의 길이가 긴 쪽이 더 큽니다.
// 배열의 길이가 같다면 각 배열에 있는 모든 원소의 합을 비교하여 다르다면 더 큰 쪽이 크고, 같다면 같습니다.
// 두 정수 배열 arr1과 arr2가 주어질 때, 위에서 정의한 배열의 대소관계에 대하여 arr2가 크다면 -1,
// arr1이 크다면 1, 두 배열이 같다면 0을 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. 길이를 비교하여 1 / -1 을 리턴한다.
// 2. 배열 요소의 총 합을 각각 구한다. (reduce)
// 3. 비교하여 1 / -1 / 0 을 리턴한다.

const solution45 = (arr1, arr2) => {
  if (arr1.length > arr2.length) return 1;
  else if (arr1.length < arr2.length) return -1;

  const num1 = arr1.reduce((acc, flag) => (acc += flag), 0);
  const num2 = arr2.reduce((acc, flag) => (acc += flag), 0);

  if (num1 > num2) return 1;
  else if (num1 < num2) return -1;
  else return 0;
};

////////////// 46. 세 개의 구분자  //////////////

// 문제
// 임의의 문자열이 주어졌을 때 문자 "a", "b", "c"를 구분자로 사용해 문자열을 나누고자 합니다.
// 예를 들어 주어진 문자열이 "baconlettucetomato"라면 나눠진 문자열 목록은 ["onlettu", "etom", "to"] 가 됩니다.
// 문자열 myStr이 주어졌을 때 위 예시와 같이 "a", "b", "c"를 사용해 나눠진 문자열을 순서대로 저장한 배열을 return 하는 solution 함수를 완성해 주세요.
// 단, 두 구분자 사이에 다른 문자가 없을 경우에는 아무것도 저장하지 않으며, return할 배열이 빈 배열이라면 ["EMPTY"]를 return 합니다.

const solution46 = (myStr) => {
  const result = myStr.split(/[a|b|c]/g).filter((a) => a);
  return result.length ? result : ["EMPTY"];
};

////////////// 47. 배열의 길이에 따라 다른 연산하기 //////////////

// 문제
// 정수 배열 arr과 정수 n이 매개변수로 주어집니다.
// arr의 길이가 홀수라면 arr의 모든 짝수 인덱스 위치에 n을 더한 배열을,
//  arr의 길이가 짝수라면 arr의 모든 홀수 인덱스 위치에 n을 더한 배열을 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. 배열을 순회한다.
// 2. arr 의 길이가 짝수일떈 홀수 인덱스에 n을 더한다.
// 3. arr 의 길이가 홀수라면 짝수 인덱스에 n을 더한다.

const solution47 = (arr, n) => {
  return arr.map((v, i) =>
    arr.length % 2 === 0 && i % 2 !== 0
      ? (v += n)
      : arr.length % 2 !== 0 && i % 2 === 0
      ? (v += n)
      : v
  );
};

////////// 다른 사람 풀이

const solution47_1 = (arr, n) =>
  arr.map((num, idx) => (arr.length % 2 !== idx % 2 ? num + n : num));

// 길이와 인덱스의 홀수 짝수 여부를 이렇게 응용했다.
