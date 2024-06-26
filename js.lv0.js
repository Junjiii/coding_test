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

////////////// 48. 뒤에서 5등까지 //////////////

// 문제
// 정수로 이루어진 리스트 num_list가 주어집니다.
// num_list에서 가장 작은 5개의 수를 오름차순으로 담은 리스트를 return하도록 solution 함수를 완성해주세요.

// 생각
// 1. 먼저 숫자 오름차순으로 정력한다.( sort())
// 2. 앞에서부터 5개만 리턴한다. (slice())

const solution48 = (num_list) => num_list.sort((a, b) => a - b).slice(0, 5);

////////////// 49. 빈 배열에 추가, 삭제하기 //////////////

// 문제
// 아무 원소도 들어있지 않은 빈 배열 X가 있습니다.
// 길이가 같은 정수 배열 arr과 boolean 배열 flag가 매개변수로 주어질 때,
// flag를 차례대로 순회하며 flag[i]가 true라면 X의 뒤에 arr[i]를 arr[i] × 2 번 추가하고,
/// flag[i]가 false라면 X에서 마지막 arr[i]개의 원소를 제거한 뒤 X를 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. flag 배열을 순회한다.
// 2. 요소마다 true / false 를 판별하여 그에 맞는 연산을 진행한다.

const solution49 = (arr, flag) => {
  let X = [];
  for (i = 0; i < flag.length; i++) {
    if (flag[i]) {
      for (j = 0; j < arr[i] * 2; j++) {
        X.push(arr[i]);
      }
    } else {
      for (j = 0; j < arr[i]; j++) {
        X.pop();
      }
    }
  }
  return X;
};

//////// 다른 사람 풀이

const solution49_1 = (arr, flag) => {
  return arr.reduce(
    (prev, num, i) =>
      flag[i]
        ? [...prev, ...new Array(num * 2).fill(num)]
        : prev.slice(0, -num),
    []
  );
};

////////////// 50. 배열의 길이를 2의 거듭제곱으로 만들기 //////////////

// 문제
// 정수 배열 arr이 매개변수로 주어집니다.
// arr의 길이가 2의 정수 거듭제곱이 되도록 arr 뒤에 정수 0을 추가하려고 합니다.
//  arr에 최소한의 개수로 0을 추가한 배열을 return 하는 solution 함수를 작성해 주세요.

const solution50 = (arr) => {
  const length = arr.length;
  const totalLength = 2 ** Math.ceil(Math.log2(length));
  return [...arr, ...new Array(totalLength - length).fill(0)];
};

////////////// 51. 뒤에서 5등 위로 //////////////

// 문제
// 정수로 이루어진 리스트 num_list가 주어집니다.
// num_list에서 가장 작은 5개의 수를 제외한 수들을 오름차순으로 담은 리스트를 return하도록 solution 함수를 완성해주세요.

// 생각
// 1. 오름차순으로 정렬한다. (sort)
// 2. 인덱스 5번부터 출력한다. (slice)

const solution51 = (num_list) => num_list.sort((a, b) => a - b).slice(5);

////////////// 52. 배열 만들기 6 //////////////

// 문제
// 0과 1로만 이루어진 정수 배열 arr가 주어집니다. arr를 이용해 새로운 배열 stk을 만드려고 합니다.
// i의 초기값을 0으로 설정하고 i가 arr의 길이보다 작으면 다음을 반복합니다.

// 만약 stk이 빈 배열이라면 arr[i]를 stk에 추가하고 i에 1을 더합니다.
// stk에 원소가 있고, stk의 마지막 원소가 arr[i]와 같으면 stk의 마지막 원소를 stk에서 제거하고 i에 1을 더합니다.
// stk에 원소가 있는데 stk의 마지막 원소가 arr[i]와 다르면 stk의 맨 마지막에 arr[i]를 추가하고 i에 1을 더합니다.

// 위 작업을 마친 후 만들어진 stk을 return 하는 solution 함수를 완성해 주세요.
// 단, 만약 빈 배열을 return 해야한다면 [-1]을 return 합니다.

// 생각
// 1. 빈 배열일때 / stk[stk.length-1] 가 arr[i]과 다를때 stk 에 arr[i] 를 추가한다.
// 2. 빈 배열일때 stk[stk.length-1] 를 구하면 undefined 가 뜬다.
// 3. undefined 와 arr[i] 는 같지 않으므로 false 가 뜬다.
// 4. 결국 빈 배열일때도 false /  stk[stk.length-1] 가 arr[i]과 다를때 도 false 이기 떄문에 같다.
// 5. stk[stk.length-1] 가 arr[i]과 같다면 arr.pop() 으로 맨마지막 요소를 삭제한다.
// 6. 결과값 stk 가 빈배열이라면 [-1] 아니라면 stk 를 리턴한다.

const solution52 = (arr) => {
  const result = arr.reduce((stk, v) => {
    v !== stk[stk.length - 1] ? stk.push(v) : stk.pop();
    return stk;
  }, []);
  return !result.length ? [-1] : result;
};

////////////// 53. 문자열 묶기 //////////////

// 문제
// 문자열 배열 strArr이 주어집니다. strArr의 원소들을 길이가 같은 문자열들끼리 그룹으로 묶었을 때
// 가장 개수가 많은 그룹의 크기를 return 하는 solution 함수를 완성해 주세요.

// 풀이 1
const solution53 = (strArr) => {
  const dict = {};

  strArr.forEach((item) => {
    const len = item.length;
    dict[len] = dict[len] ?? [];
    dict[len].push(item);
  });

  const values = Object.values(dict).map((a) => a.length);
  return Math.max(...values);
};

// 풀이2

const solution53_1 = (strArr) => {
  const counter = new Map();
  for (const str of strArr) {
    counter.set(str.length, (counter.get(str.length) || 0) + 1);
  }
  return Math.max(...counter.values());
};

////////////// 54. 문자열 정수의 합 //////////////

// 문제
// 한 자리 정수로 이루어진 문자열 num_str이 주어질 때, 각 자리수의 합을 return하도록 solution 함수를 완성해주세요.

// 생각
// 1. num_list 를 배열화한다. ( [...])
// 2. 문자열을 숫자형으로 변환한다. (+)
// 3. 배열을 순회하며 더해준다. (reduce)

const solution54 = (num_str) => [...num_str].reduce((a, v) => (a += +v), 0);

////////////// 55. 0 떼기 //////////////

// 문제
// 정수로 이루어진 문자열 n_str이 주어질 때,
// n_str의 가장 왼쪽에 처음으로 등장하는 0들을 뗀 문자열을 return하도록 solution 함수를 완성해주세요.

// 생각
// 1. n_str 을 배열화한다.
// 2. while 문을 사용해 왼쪽에서부터 "0" 이면 삭제하고 아니면 반복문 종료한다.
// 3. 합쳐서 리턴한다. (join)

const solution55 = (n_str) => {
  let i = 0;
  const result = [...n_str];
  while (i < result.length && result[i] === "0") {
    result.shift();
  }
  return result.join("");
};

//////// 다른 사람 풀이
const solution55_1 = (n_str) => String(+n_str);

// 어차피 맨 왼쪽의 0 은 숫자로 표현하지 않게 때문에 숫자형으로 변환하면 알아서 제거된다.

////////////// 56. 배열의 원소 삭제하기 //////////////

// 문제
// 정수 배열 arr과 delete_list가 있습니다.
// arr의 원소 중 delete_list의 원소를 모두 삭제하고 남은 원소들은 기존의 arr에 있던 순서를 유지한 배열을
// return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. arr을 뒤에서부터 순회한다.
// 2. arr[i] 가 delete_list[j]와 같으면 삭제한다.
// 2. 결과를 리턴한다.

const solution56 = (arr, delete_list) => {
  for (i = arr.length - 1; i >= 0; i--) {
    for (j = 0; j < delete_list.length; j++) {
      if (arr[i] === delete_list[j]) {
        arr.splice(i, 1);
      }
    }
  }
  return arr;
};

/////// 다른 사람 풀이

const solution56_1 = (arr, dels) => arr.filter((el) => !dels.includes(el));

////////////// 57. 두 수의 합 //////////////

// 문제
// 0 이상의 두 정수가 문자열 a, b로 주어질 때, a + b의 값을 문자열로 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. 숫자형으로 바꾼다. 대신 예시 중 자바스크립트 자체에서 64비트 이상은 정확한 값을 변환하기 한계가 있는 이슈가 있어서
// Bigint() 를 사용하여 정확한 값으로 바꾼다.
// 2. 더해준 값을 문자형으로 바꾼다.

const solution57 = (a, b) => `${BigInt(a) + BigInt(b)}`;

////////////// 58. 부분 문자열 //////////////

// 문제
// 어떤 문자열 A가 다른 문자열 B안에 속하면 A를 B의 부분 문자열이라고 합니다.
//   예를 들어 문자열 "abc"는 문자열 "aabcc"의 부분 문자열입니다.
// 문자열 str1과 str2가 주어질 때, str1이 str2의 부분 문자열이라면 1을 부분 문자열이 아니라면 0을 return하도록
//  solution 함수를 완성해주세요.

// 생각
// 1. 포함여부를 true false 로 반환하는 includes 를 사용한다.
// 2. 숫자형으로 바꾸어 1 또는 0 을 리턴하게 만든다.

const solution58 = (str1, str2) => +str2.includes(str1);

////////////// 59. 꼬리 문자열 //////////////

// 문제
// 문자열 리스트 str_list와 제외하려는 문자열 ex가 주어질 때,
// str_list에서 ex를 포함한 문자열을 제외하고 만든 꼬리 문자열을 return하도록 solution 함수를 완성해주세요.

// 생각
// str_list 에 ex 포함 여부가 false 인 것들만 합친다. (includes())

const solution59 = (str_list, ex) => {
  return str_list
    .reduce((acc, v) => {
      if (!v.includes(ex)) acc.push(v);
      return acc;
    }, [])
    .join("");
};

/////// 다른 사람 풀이

const solutin59_1 = (str_list, ex) =>
  str_list.filter((v) => !v.includes(ex)).join("");

////////////// 60. 주사위 게임 1 //////////////

// 문제
// 1부터 6까지 숫자가 적힌 주사위가 두 개 있습니다. 두 주사위를 굴렸을 때 나온 숫자를 각각 a, b라고 했을 때 얻는 점수는 다음과 같습니다.

// a와 b가 모두 홀수라면 a2 + b2 점을 얻습니다.
// a와 b 중 하나만 홀수라면 2 × (a + b) 점을 얻습니다.
// a와 b 모두 홀수가 아니라면 |a - b| 점을 얻습니다.

// 두 정수 a와 b가 매개변수로 주어질 때, 얻는 점수를 return 하는 solution 함수를 작성해 주세요.

// 생각
// 1. 3개의 상황에 맞는 연산을 만든다. (|a-b| 는 절대값을 출력해야한다. )
// 2. 홀수 짝수를 판단한다.

const method60_1 = {
  1: (a, b) => a ** 2 + b ** 2,
  2: (a, b) => 2 * (a + b),
  3: (a, b) => Math.abs(a - b),
};

const solution60_1 = (a, b) => {
  if (a % 2 === 1 && b % 2 === 1) return method[1](a, b);
  else if (a % 2 === 0 && b % 2 === 0) return method[3](a, b);
  else return method[2](a, b);
};

const method60_2 = {
  1: (a, b) => a ** 2 + b ** 2,
  2: (a, b) => 2 * (a + b),
  3: (a, b) => Math.abs(a - b),
};

const solution60_2 = (a, b) => {
  return a % 2 && b % 2
    ? method[1](a, b)
    : a % 2 || b % 2
    ? method[2](a, b)
    : method[3](a, b);
};

//  %2 를 통한 나머지 1 , 0 을 구하는데 삼항연산자 혹은 if() 조건문으로 활용할떄 1,0 은 true , false 로 인식하게 된다.

////////////// 61. 날짜 비교하기//////////////

// 문제
// 정수 배열 date1과 date2가 주어집니다.
// 두 배열은 각각 날짜를 나타내며 [year, month, day] 꼴로 주어집니다.
// 각 배열에서 year는 연도를, month는 월을, day는 날짜를 나타냅니다.
// 만약 date1이 date2보다 앞서는 날짜라면 1을, 아니면 0을 return 하는 solution 함수를 완성해 주세요.

// 생각
// 1. 배열의 요소를 조건에 맞춰 작성한다.
// 2. 모두 충족하지 못한다면 0을 리턴한다.

const solution61 = (date1, date2) => {
  let [year1, month1, day1] = date1;
  let [year2, month2, day2] = date2;
  if (year1 !== year2) return year1 < year2 ? 1 : 0;
  if (month1 !== month2) return month1 < month2 ? 1 : 0;
  if (day1 !== day2) return day1 < day2 ? 1 : 0;
  return 0;
};

////////// 다른 사람 풀이

const solution61_1 = (date1, date2) =>
  new Date(date1) < new Date(date2) ? 1 : 0;

////////////// 62.l로 만들기 /////////////

// 문제
// 알파벳 소문자로 이루어진 문자열 myString이 주어집니다.
// 알파벳 순서에서 "l"보다 앞서는 모든 문자를 "l"로 바꾼 문자열을 return 하는 solution 함수를 완성해 주세요.

// 생각
// 1. 배열을 순회하며 l 보다 작을 경우 l로 바꿔준다
// 2. 바꿔준 배열을 리턴한다.

const solution62 = (myString) => {
  const arr = [];
  const result = [...myString].map((v, i) => {
    if (v < "l") {
      arr.push("l");
    } else {
      arr.push(v);
    }
  });
  return arr.join("");
};

///////// 다른 사람 풀이
const solution62_1 = (myString) => myString.replace(/[a-k]/g, "l");

////////////// 63. 특별한 이차원 배열 1 /////////////

// 문제
// 정수 n이 매개변수로 주어질 때, 다음과 같은 n × n 크기의 이차원 배열 arr를 return 하는 solution 함수를 작성해 주세요.
// arr[i][j] (0 ≤ i, j < n)의 값은 i = j라면 1, 아니라면 0입니다.

// 생각

const solution63 = (n) => {
  let arr2 = [];
  for (let i = 0; i < n; i++) {
    let arr1 = new Array(n).fill(0);
    arr1[i] = 1;
    arr2.push(arr1);
  }
  return arr2;
};

//////// 다른 사람 풀이

const solution63_1 = (n) => {
  const answer = Array.from(Array(n), () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    answer[i][i] = 1;
  }

  return answer;
};

////////////// 64. 특별한 이차원 배열 2 /////////////

// 문제
// n × n 크기의 이차원 배열 arr이 매개변수로 주어질 때,
// arr이 다음을 만족하면 1을 아니라면 0을 return 하는 solution 함수를 작성해 주세요.
// 0 ≤ i, j < n인 정수 i, j에 대하여 arr[i][j] = arr[j][i]

const solution64 = (arr) => {
  let count = [];
  for (i = 0; i < arr.length; i++) {
    for (j = 0; j < arr.length; j++) {
      arr[i][j] === arr[j][i] ? count.push(1) : count.push(0);
    }
  }
  return count.includes(0) ? 0 : 1;
};

////////// 다른 사람 풀이
const solution64_1 = (arr) => {
  return arr.every((r, i) => r.every((_, j) => arr[i][j] === arr[j][i]))
    ? 1
    : 0;
};

////////////// 65. 이차원 배열 대각선 순회하기 /////////////

// 문제
// 2차원 정수 배열 board와 정수 k가 주어집니다.
// i + j <= k를 만족하는 모든 (i, j)에 대한 board[i][j]의 합을 return 하는 solution 함수를 완성해 주세요.

const solution65 = (board, k) => {
  let count = 0;
  const result = board.map((v, i) => {
    return v
      .map((bv, j) => {
        if (i + j <= k) {
          return board[i][j];
        }
      })
      .filter((v) => v);
  });
  for (i = 0; i < result.length; i++) {
    for (j = 0; j < result[i].length; j++) {
      count += result[i][j];
    }
  }
  return count;
};

////////// 다른 사람 풀이

const solution65_1 = (board, k) => {
  return board.reduce(
    (total, row, i) =>
      total + row.reduce((prev, num, j) => (i + j <= k ? prev + num : prev), 0),
    0
  );
};

const solution65_2 = (board, k) => {
  let answer = 0;
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (x + y <= k) answer += board[x][y];
    }
  }
  return answer;
};

////////////// 66. 세균 증식 /////////////

// 문제
// 어떤 세균은 1시간에 두배만큼 증식한다고 합니다.
// 처음 세균의 마리수 n과 경과한 시간 t가 매개변수로 주어질 때 t시간 후 세균의 수를 return하도록 solution 함수를 완성해주세요.

// 1. t 번의 횟수만큼 2번 곱해준다.
// 2. 그 후 몇마리인지 곱해준다.

const solution66 = (n, t) => 2 ** t * n;

/////// 다른 사람 풀이
const solution66_1 = (n, t) => {
  return n << t;
};

// 비트연산자 활용

const solution66_2 = (n, t) => {
  return n * Math.pow(2, t);
};

// pow() 메소드 사용

////////////// 67. 제곱수 판별하기 /////////////

// 문제
// 어떤 자연수를 제곱했을 때 나오는 정수를 제곱수라고 합니다.
// 정수 n이 매개변수로 주어질 때, n이 제곱수라면 1을 아니라면 2를 return하도록 solution 함수를 완성해주세요.

const solution67 = (n) => (Math.sqrt(n) % 1 === 0 ? 1 : 2);

/////// 다른 사람 풀이
const solution67_1 = (n) => {
  return Number.isInteger(Math.sqrt(n)) ? 1 : 2;
};

const solution67_2 = (n) => {
  for (let i = 0; i < n / 2; i++) {
    if (i * i == n) {
      return 1;
    }
  }
  return 2;
};

////////////// 68. 문자열 안에 문자열 /////////////

// 문제
// 문자열 str1, str2가 매개변수로 주어집니다.
//  str1 안에 str2가 있다면 1을 없다면 2를 return하도록 solution 함수를 완성해주세요.

const solution68 = (str1, str2) => (str1.includes(str2) ? 1 : 2);

/////////// 다른 사람 풀이
const solution68_1 = (str1, str2) => {
  return str1.split(str2).length > 1 ? 1 : 2;
};

////////////// 69. 자릿 수 더하기 /////////////

// 문제
// 정수 n이 매개변수로 주어질 때 n의 각 자리 숫자의 합을 return하도록 solution 함수를 완성해주세요

const solution69 = (n) =>
  n
    .toString()
    .split("")
    .reduce((acc, v) => (acc += +v), 0);

////////////// 70.n의 배수 고르기 /////////////

// 문제
// 정수 n과 정수 배열 numlist가 매개변수로 주어질 때,
// numlist에서 n의 배수가 아닌 수들을 제거한 배열을 return하도록 solution 함수를 완성해주세요.

const solution70 = (n, numlist) => numlist.filter((v) => v % n === 0);

/////////////// 71. 숫자 찾기 /////////////

// 문제
// 정수 num과 k가 매개변수로 주어질 때, num을 이루는 숫자 중에 k가 있으면
// num의 그 숫자가 있는 자리 수를 return하고 없으면 -1을 return 하도록 solution 함수를 완성해보세요.
const solution71 = (num, k) => {
  const result = num.toString().split("").map(Number).indexOf(k);
  return result >= 0 ? result + 1 : -1;
};

////// 다른 사람 풀이

const solution71_1 = (num, k) => {
  return (
    num
      .toString()
      .split("")
      .map((el) => Number(el))
      .indexOf(k) + 1 || -1
  );
};

/////////////// 72. 배열의 유사도  /////////////

// 문제
// 두 배열이 얼마나 유사한지 확인해보려고 합니다.
// 문자열 배열 s1과 s2가 주어질 때 같은 원소의 개수를 return하도록 solution 함수를 완성해주세요.

const solution72_1 = (s1, s2) => {
  let count = 0;
  s1.forEach((v) => {
    s2.forEach((b) => {
      if (v === b) count += 1;
    });
  });
  return count;
};

const solution72_2 = (s1, s2) => {
  const intersection = s1.filter((x) => s2.includes(x));
  return intersection.length;
};

const solution72_3 = (s1, s2) => {
  const concat = [...s1, ...s2];
  const setConcat = Array.from(new Set(concat));

  return concat.length - setConcat.length;
};

/////////////// 73. 잘라서 배열로 저장하기  /////////////

// 문제
// 문자열 my_str과 n이 매개변수로 주어질 때,
// my_str을 길이 n씩 잘라서 저장한 배열을 return하도록 solution 함수를 완성해주세요.

const solution73 = (my_str, n) => {
  const result = [];
  for (i = 0; i < my_str.length; i += n) {
    result.push(my_str.slice(i, i + n));
  }
  return result;
};

////// 다른 사람 풀이

const solution73_1 = (my_str, n) => {
  return my_str.match(new RegExp(`.{1,${n}}`, "g"));
};

/////////////// 74. 문자열 정렬하기 (2) /////////////

// 문제
// 영어 대소문자로 이루어진 문자열 my_string이 매개변수로 주어질 때,
// my_string을 모두 소문자로 바꾸고 알파벳 순서대로 정렬한 문자열을 return 하도록 solution 함수를 완성해보세요.

const solution74 = (my_string) => [...my_string.toLowerCase()].sort().join("");

/////////////// 75. 7의 갯수 /////////////

// 문제
// 머쓱이는 행운의 숫자 7을 가장 좋아합니다. 정수 배열 array가 매개변수로 주어질 때,
// 7이 총 몇 개 있는지 return 하도록 solution 함수를 완성해보세요.

const solution75 = (array) => {
  return [...array.join("")].filter((v) => v === "7").length;
};

////// 다른 사람 풀이
const solution75_1 = (array) => {
  return array.join("").split("7").length - 1;
};

/////////////// 76. 가장 큰 수 찾기 /////////////

// 문제
// 정수 배열 array가 매개변수로 주어질 때,
// 가장 큰 수와 그 수의 인덱스를 담은 배열을 return 하도록 solution 함수를 완성해보세요.

const solution76 = (array) => {
  let result = [];
  array.reduce((acc, v, i) => {
    if (acc < v) {
      acc = v;
      result = [];
      result.push(v, i);
    }
    return acc;
  });
  return result;
};

/////// 다른 사람 풀이

const solution76_1 = (array) => {
  let max = Math.max(...array);
  return [max, array.indexOf(max)];
};

/////////////// 77. 편지 /////////////

// 문제
// 머쓱이는 할머니께 생신 축하 편지를 쓰려고 합니다.
// 할머니가 보시기 편하도록 글자 한 자 한 자를 가로 2cm 크기로 적으려고 하며,
// 편지를 가로로만 적을 때, 축하 문구 message를 적기 위해 필요한 편지지의 최소 가로길이를 return 하도록 solution 함수를 완성해주세요.

const solution77 = (message) => message.length * 2;

/////////////// 78. 약수 구하기 /////////////

// 문제
// 정수 n이 매개변수로 주어질 때, n의 약수를 오름차순으로 담은 배열을 return하도록 solution 함수를 완성해주세요.

const solution78 = (n) => {
  const result = [];
  for (i = 1; i <= n; i++) {
    if (n % i === 0) result.push(i);
  }
  return result;
};

////// 다른 사람 풀이

const solution78_1 = (n) => {
  return Array(n)
    .fill(0)
    .map((v, index) => v + index + 1)
    .filter((v) => n % v === 0);
};

/////////////// 79. 한 번만 등장한 문자 /////////////

// 문제
// 문자열 s가 매개변수로 주어집니다.
// s에서 한 번만 등장하는 문자를 사전 순으로 정렬한 문자열을 return 하도록 solution 함수를 완성해보세요.
// 한 번만 등장하는 문자가 없을 경우 빈 문자열을 return 합니다.

const solution79 = (s) => {
  let ans = [];

  let sArr = s.split("");

  sArr.forEach((item) => {
    if (s.indexOf(item) === s.lastIndexOf(item)) {
      ans.push(item);
    }
  });

  return ans.sort().join("");
};

/////// 다른 사람 풀이
const solution79_1 = (s) => {
  let res = [];
  for (let c of s) if (s.indexOf(c) === s.lastIndexOf(c)) res.push(c);
  return res.sort().join("");
};

/////////////// 80. 인덱스 바꾸기 /////////////

// 문제
// 문자열 my_string과 정수 num1, num2가 매개변수로 주어질 때,
// my_string에서 인덱스 num1과 인덱스 num2에 해당하는 문자를 바꾼 문자열을 return 하도록 solution 함수를 완성해보세요.

const solution80 = (s, a, b) => {
  s = [...s];
  [s[a], s[b]] = [s[b], s[a]];
  return s.join("");
};

/////////////// 81. 대문자와 소문자 /////////////

// 문제
// 문자열 my_string이 매개변수로 주어질 때,
// 대문자는 소문자로 소문자는 대문자로 변환한 문자열을 return하도록 solution 함수를 완성해주세요.

const solution81 = (my_string) => {
  return [...my_string]
    .map((v, i) => {
      return v === v.toLowerCase() ? v.toUpperCase() : v.toLowerCase();
    })
    .join("");
};

/////////////// 82. 암호해독 /////////////

// 문제
// 군 전략가 머쓱이는 전쟁 중 적군이 다음과 같은 암호 체계를 사용한다는 것을 알아냈습니다.
// 암호화된 문자열 cipher를 주고받습니다.
// 그 문자열에서 code의 배수 번째 글자만 진짜 암호입니다.
// 문자열 cipher와 정수 code가 매개변수로 주어질 때 해독된 암호 문자열을 return하도록 solution 함수를 완성해주세요.

const solution82 = (cipher, code) => {
  let result = "";
  for (i = code - 1; i < cipher.length; i += code) {
    result += cipher[i];
  }
  return result;
};

/////////////// 83. 369게임 /////////////

// 문제
// 머쓱이는 친구들과 369게임을 하고 있습니다.
// 369게임은 1부터 숫자를 하나씩 대며 3, 6, 9가 들어가는 숫자는 숫자 대신 3, 6, 9의 개수만큼 박수를 치는 게임입니다.
// 머쓱이가 말해야하는 숫자 order가 매개변수로 주어질 때, 머쓱이가 쳐야할 박수 횟수를 return 하도록 solution 함수를 완성해보세요.

const solution83 = (order) => {
  return [...order.toString()].filter((v) => /[369]/.test(v)).length;
};

//////// 다른 사람 풀이
const solution83_1 = (order) => {
  var answer = [...order.toString().matchAll(/[3|6|9]/g)].length;
  return answer;
};

const solution83_2 = (order) => {
  return ("" + order).split(/[369]/).length - 1;
};

/////////////// 84. 문자열 계산하기 /////////////

// 문제
// my_string은 "3 + 5"처럼 문자열로 된 수식입니다.
// 문자열 my_string이 매개변수로 주어질 때, 수식을 계산한 값을 return 하는 solution 함수를 완성해주세요.

const solution84 = (my_string) => {
  return new Function(`return ${my_string}`)();
};

/////// 다른 사람 풀이

const solution84_1 = (my_string) => {
  const stack = [];

  let sign = 1;
  for (const ch of my_string.split(" ")) {
    if (ch === "+") {
      sign = 1;
    } else if (ch === "-") {
      sign = -1;
    } else {
      stack.push(ch * sign);
    }
  }

  return stack.reduce((a, b) => a + b, 0);
};

const solution84_2 = (my_string) => {
  const arr = my_string.split(" ").filter((e) => e);
  while (arr.length > 1)
    arr.unshift(+arr.shift() + (arr.shift() === "+" ? 1 : -1) * arr.shift());
  return arr[0];
};

/////////////// 85. 영어가 싫어요 /////////////

// 문제
// 영어가 싫은 머쓱이는 영어로 표기되어있는 숫자를 수로 바꾸려고 합니다. 문자열 numbers가 매개변수로 주어질 때,
// numbers를 정수로 바꿔 return 하도록 solution 함수를 완성해 주세요.

const solution85 = (numbers) => {
  let num = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  for (i = 0; i < num.length; i++) {
    numbers = numbers.split(num[i]).join(i);
  }
  return Number(numbers);
};

//////// 다른 사람 풀이

const solution85_1 = (numbers) => {
  const obj = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const num = numbers.replace(
    /zero|one|two|three|four|five|six|seven|eight|nine/g,
    (v) => {
      return obj[v];
    }
  );

  return Number(num);
};

const solution85_2 = (n) =>
  Number(
    [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ].reduce((t, s, i) => t.replaceAll(s, i), n)
  );

/////////////// 86. 가까운 수 /////////////

// 문제
// 정수 배열 array와 정수 n이 매개변수로 주어질 때,
// array에 들어있는 정수 중 n과 가장 가까운 수를 return 하도록 solution 함수를 완성해주세요.

const solution86 = (array, n) => {
  array.sort((a, b) => a - b);
  let a = 0;
  let b = 0;
  let answer = [];

  for (let i = 0; i < array.length; i++) {
    answer.push(Math.abs(n - array[i]));
    a = Math.min(...answer);
    b = answer.indexOf(a);
  }
  return array[b];
};

////// 다른 사람 풀이

const solution86_1 = (array, n) => {
  array.sort((a, b) => Math.abs(n - a) - Math.abs(n - b) || a - b);

  return array[0];
};

/////////////// 87. 중복된 문자 제거 /////////////

// 문제
// 문자열 my_string이 매개변수로 주어집니다.
// my_string에서 중복된 문자를 제거하고 하나의 문자만 남긴 문자열을 return하도록 solution 함수를 완성해주세요.

const solution87 = (my_string) =>
  [...my_string].filter((e, i) => [...my_string].indexOf(e) === i).join("");

/////// 다른 사람 풀이

const solution87_1 = (my_string) => [...new Set([...my_string])].join("");

/////////////// 88. 삼각형의 완성조건 (1) /////////////

// 문제
// 선분 세 개로 삼각형을 만들기 위해서는 다음과 같은 조건을 만족해야 합니다.
// 가장 긴 변의 길이는 다른 두 변의 길이의 합보다 작아야 합니다.
// 삼각형의 세 변의 길이가 담긴 배열 sides이 매개변수로 주어집니다.
// 세 변으로 삼각형을 만들 수 있다면 1, 만들 수 없다면 2를 return하도록 solution 함수를 완성해주세요.

const solution88 = (sides) => {
  const [a, b, c] = sides.sort((a, b) => a - b);
  return c < a + b ? 1 : 2;
};

/////// 다른 사람 풀이

const solution88_1 = (sides) => {
  var answer = 0;
  const max = Math.max(...sides);
  const sum = sides.reduce((a, b) => a + b, 0) - max;

  answer = max < sum ? 1 : 2;

  return answer;
};

/////////////// 89. k의 개수 /////////////

// 문제
// 1부터 13까지의 수에서, 1은 1, 10, 11, 12, 13 이렇게 총 6번 등장합니다.
// 정수 i, j, k가 매개변수로 주어질 때, i부터 j까지 k가 몇 번 등장하는지 return 하도록 solution 함수를 완성해주세요.

const solution89 = (i, j, k) => {
  let a = "";
  for (i; i <= j; i++) {
    a += i;
  }
  return a.split(k).length - 1;
};

/////////////// 90. A로 B 만들기 /////////////

// 문제
// 문자열 before와 after가 매개변수로 주어질 때,
// before의 순서를 바꾸어 after를 만들 수 있으면 1을, 만들 수 없으면 0을 return 하도록 solution 함수를 완성해보세요.

const solution90 = (before, after) => {
  const afterArr = [...after];
  const arr = [...before].reduce((acc, v, i) => {
    if (afterArr.includes(v)) {
      afterArr.splice(afterArr.indexOf(v), 1);
    }
  }, "");

  return afterArr.length ? 0 : 1;
};

/////// 다른 사람 풀이

const solution90_1 = (before, after) => {
  return before.split("").sort().join("") === after.split("").sort().join("")
    ? 1
    : 0;
};

/////////////// 91. 이진수 더하기 /////////////

// 문제
// 이진수를 의미하는 두 개의 문자열 bin1과 bin2가 매개변수로 주어질 때,
// 두 이진수의 합을 return하도록 solution 함수를 완성해주세요.

const solution91 = (bin1, bin2) => {
  const num1 = parseInt(bin1, 2) + parseInt(bin2, 2);
  return num1.toString(2);
};

/////// 다른 사람 풀이

const solution91_1 = (bin1, bin2) => {
  let temp = Number(bin1) + Number(bin2);
  temp = [...temp.toString()].reverse().map((v) => +v);

  for (let i = temp.length; i < 11; i++) {
    temp.push(0);
  }

  for (let i = 0; i < temp.length; i++) {
    if (temp[i] === 2) {
      temp[i] = 0;
      temp[i + 1]++;
    } else if (temp[i] === 3) {
      temp[i] = 1;
      temp[i + 1]++;
    }
  }
  return Number(temp.reverse().join("")).toString();
};

/////////////// 92. 배열 원소의 길이 /////////////

// 문제
// 문자열 배열 strlist가 매개변수로 주어집니다.
// strlist 각 원소의 길이를 담은 배열을 retrun하도록 solution 함수를 완성해주세요.

const solution92 = (strlist) => {
  return strlist.reduce((acc, v, i) => {
    acc.push(v.length);
    return acc;
  }, []);
};

//////// 다른 사람 풀이
const solution92_1 = (strlist) => {
  return strlist.map((el) => el.length);
};

const solution92_2 = (strlist) => {
  return strlist.reduce((a, b) => [...a, b.length], []);
};

/////////////// 93. 최댓값 만들기(1) /////////////

// 문제
// 정수 배열 numbers가 매개변수로 주어집니다.
// numbers의 원소 중 두 개를 곱해 만들 수 있는 최댓값을 return하도록 solution 함수를 완성해주세요.

const solution93 = (numbers) => {
  numbers.sort((a, b) => b - a);
  return numbers[0] * numbers[1];
};

/////////////// 94. 팩토리얼 /////////////

// 문제
// i팩토리얼 (i!)은 1부터 i까지 정수의 곱을 의미합니다.
// 예를들어 5! = 5 * 4 * 3 * 2 * 1 = 120 입니다.
// 정수 n이 주어질 때 다음 조건을 만족하는 가장 큰 정수 i를 return 하도록 solution 함수를 완성해주세요.

const solution94 = (n) => {
  let i = 1;
  let f = 1;
  while (f * i < n) f *= ++i;
  return i;
};

/////////////// 95. 모음 제거 /////////////

// 문제
// 영어에선 a, e, i, o, u 다섯 가지 알파벳을 모음으로 분류합니다.
// 문자열 my_string이 매개변수로 주어질 때 모음을 제거한 문자열을 return하도록 solution 함수를 완성해주세요.

const solution95 = (my_string) =>
  [...my_string].filter((v) => !v.match(/[aeiou]/gi)).join("");

/////// 다른 사람 풀이

const solution95_1 = (my_string) => {
  return my_string.replace(/[aeiou]/g, "");
};

/////////////// 96. 문자열 정렬하기 (1) /////////////

// 문제
// 문자열 my_string이 매개변수로 주어질 때,
// my_string 안에 있는 숫자만 골라 오름차순 정렬한 리스트를 return 하도록 solution 함수를 작성해보세요.

const solution96 = (my_string) => {
  return [...my_string]
    .filter((v) => v.match(/[0-9]/gi))
    .map((v) => +v)
    .sort((a, b) => a - b);
};

/////// 다른 사람 풀이

const solution96_1 = (my_string) => {
  return my_string
    .match(/\d/g)
    .sort((a, b) => a - b)
    .map((n) => Number(n));
};

/////////////// 97. 숨어있는 숫자의 덧셈 (1) /////////////

// 문제
// 문자열 my_string이 매개변수로 주어집니다.
// my_string안의 모든 자연수들의 합을 return하도록 solution 함수를 완성해주세요.

const solution97 = (my_string) => {
  return my_string.match(/\d/g).reduce((acc, v) => {
    acc += +v;
    return acc;
  }, 0);
};

////// 다른 사람 풀이

const solution97_1 = (my_string) => {
  const answer = my_string
    .replace(/[^0-9]/g, "")
    .split("")
    .reduce((acc, curr) => acc + Number(curr), 0);
  return answer;
};

/////////////// 98. 배열의 평균값 /////////////

// 문제
// 정수 배열 numbers가 매개변수로 주어집니다. numbers의 원소의 평균값을 return하도록 solution 함수를 완성해주세요.

const solution98 = (numbers) => {
  return (
    numbers.reduce((acc, v) => {
      acc += v;
      return acc;
    }, 0) / numbers.length
  );
};

/////////////// 99. 최댓값 만들기 (2) /////////////

// 문제
// 정수 배열 numbers가 매개변수로 주어집니다.
// numbers의 원소 중 두 개를 곱해 만들 수 있는 최댓값을 return하도록 solution 함수를 완성해주세요.

const solution99 = (numbers) => {
  const numASC = numbers.sort((a, b) => a - b);
  const num1 = numASC[0] * numASC[1];
  const numDESC = numbers.sort((a, b) => b - a);
  const num2 = numDESC[0] * numDESC[1];

  return num1 > num2 ? num1 : num2;
};

///////// 다른 사람 풀이

const solution99_1 = (numbers) => {
  numbers.sort((a, b) => a - b);
  return Math.max(
    numbers[0] * numbers[1],
    numbers[numbers.length - 1] * numbers[numbers.length - 2]
  );
};

const solution99_2 = (numbers) => {
  var answer = [];
  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      answer.push(numbers[i] * numbers[j]);
    }
  }
  return Math.max(...answer);
};

/////////////// 100. 주사위의 개수 /////////////

// 문제
// 머쓱이는 직육면체 모양의 상자를 하나 가지고 있는데 이 상자에 정육면체 모양의 주사위를 최대한 많이 채우고 싶습니다.
// 상자의 가로, 세로, 높이가 저장되어있는 배열 box와 주사위 모서리의 길이 정수 n이 매개변수로 주어졌을 때,
// 상자에 들어갈 수 있는 주사위의 최대 개수를 return 하도록 solution 함수를 완성해주세요.

const solution100 = (box, n) => {
  const [a, b, c] = box.map((v) => parseInt(v / n));
  return a * b * c;
};

//////// 다른 사람 풀이

const solution100_1 = (box, n) => {
  return box.reduce((acc, v) => acc * Math.floor(v / n), 1);
};

/////////////// 101. 숨어있는 숫자의 덧셈 (2) /////////////

// 문제
// 문자열 my_string이 매개변수로 주어집니다. my_string은 소문자, 대문자, 자연수로만 구성되어있습니다.
// my_string안의 자연수들의 합을 return하도록 solution 함수를 완성해주세요.

const solution101 = (my_string) => {
  return my_string.split(/[A-Za-z]+/g).reduce((acc, v) => (acc += +v), 0);
};

//////// 다른 사람 풀이

const solution101_1 = (my_string) => {
  return my_string.split(/\D+/).reduce((acc, cur) => acc + Number(cur), 0);
};

/////////////// 102. 컨트롤 제트 /////////////

// 문제
// 숫자와 "Z"가 공백으로 구분되어 담긴 문자열이 주어집니다.
// 문자열에 있는 숫자를 차례대로 더하려고 합니다.
// 이 때 "Z"가 나오면 바로 전에 더했던 숫자를 뺀다는 뜻입니다.
// 숫자와 "Z"로 이루어진 문자열 s가 주어질 때, 머쓱이가 구한 값을 return 하도록 solution 함수를 완성해보세요.

const solution102 = (s) => {
  const arr = s.split(" ");
  const result = arr.reduce((acc, v, i) => {
    if (v === "Z") {
      acc -= +arr[i - 1];
    } else {
      acc += +v;
    }
    return acc;
  }, 0);
  return result;
};

//////// 다른 사람 풀이

const solution102_1 = (s) => {
  const stack = [];

  s.split(" ").forEach((target) => {
    if (target === "Z") stack.pop();
    else stack.push(+target);
  });

  return stack.length ? stack.reduce((pre, cur) => pre + cur) : 0;
};

/////////////// 103. 소인수분해 /////////////

// 문제
// 소인수분해란 어떤 수를 소수들의 곱으로 표현하는 것입니다.
// 예를 들어 12를 소인수 분해하면 2 * 2 * 3 으로 나타낼 수 있습니다.
// 따라서 12의 소인수는 2와 3입니다.
// 자연수 n이 매개변수로 주어질 때 n의 소인수를 오름차순으로 담은 배열을 return하도록 solution 함수를 완성해주세요.

const solution103 = (n) => {
  var answer = [];

  for (let i = 2; i <= n; i++) {
    while (n % i === 0) {
      n = n / i;
      if (n % i !== 0) {
        answer.push(i);
      }
    }
  }
  return answer;
};

/////////////// 104. 합성수 찾기 /////////////

// 문제
// 약수의 개수가 세 개 이상인 수를 합성수라고 합니다.
// 자연수 n이 매개변수로 주어질 때 n이하의 합성수의 개수를 return하도록 solution 함수를 완성해주세요.

const solution104 = (n) => {
  let ans = [];

  for (let i = 1; i <= n; i++) {
    let measure = [];

    for (let j = 1; j <= n; j++) {
      if (i % j === 0) {
        measure.push(j);
      }

      if (measure.length >= 3) {
        ans.push(i);

        break;
      }
    }
  }

  return ans.length;
};

////////// 다른 사람 풀이

const solution104_1 = (n) => {
  let dp = new Array(n + 1).fill(1);
  for (let i = 2; i <= n; i++) {
    if (dp[i]) {
      for (let j = 2; i * j <= n; j++) {
        dp[i * j] = 0;
      }
    }
  }

  return dp.filter((el) => el === 0).length;
};

/////////////// 105. 배열 회전시키기 /////////////

// 문제
// 정수가 담긴 배열 numbers와 문자열 direction가 매개변수로 주어집니다.
// 배열 numbers의 원소를 direction방향으로 한 칸씩 회전시킨 배열을 return하도록 solution 함수를 완성해주세요.

const solution105 = (numbers, direction) => {
  const right = () => {
    numbers.unshift(numbers[numbers.length - 1]);
    numbers.pop();
  };
  const left = () => {
    numbers.push(numbers[0]);
    numbers.shift();
  };
  direction === "right" ? right() : left();
  return numbers;
};

/////// 다른 사람 풀이

const solution105_1 = (numbers, direction) => {
  var answer = [];

  if ("right" == direction) {
    numbers.unshift(numbers.pop());
  } else {
    numbers.push(numbers.shift());
  }

  answer = numbers;

  return answer;
};

const solution105_2 = (numbers, direction) => {
  return direction === "right"
    ? [numbers[numbers.length - 1], ...numbers.slice(0, numbers.length - 1)]
    : [...numbers.slice(1), numbers[0]];
};

/////////////// 106. 2차원으로 만들기 /////////////

// 문제
// 정수 배열 num_list와 정수 n이 매개변수로 주어집니다.
// num_list를 다음 설명과 같이 2차원 배열로 바꿔 return하도록 solution 함수를 완성해주세요.
// num_list가 [1, 2, 3, 4, 5, 6, 7, 8] 로 길이가 8이고 n이 2이므로 num_list를 2 * 4 배열로 다음과 같이 변경합니다.
// 2차원으로 바꿀 때에는 num_list의 원소들을 앞에서부터 n개씩 나눠 2차원 배열로 변경합니다.

const solution106 = (num_list, n) => {
  const arr = [];
  for (i = 0; i < num_list.length; i += n) {
    arr.push(num_list.slice(i, i + n));
  }
  return arr;
};

/////// 다른 사람 풀이

const solution106_1 = (num_list, n) => {
  return Array(num_list.length / n)
    .fill([])
    .map(() => num_list.splice(0, n));
};

const solution106_2 = (num_list, n) => {
  var answer = [];

  while (num_list.length) {
    answer.push(num_list.splice(0, n));
  }

  return answer;
};

/////////////// 107. 점의 위치 구하기 /////////////

// 문제
// 사분면은 한 평면을 x축과 y축을 기준으로 나눈 네 부분입니다. 사분면은 아래와 같이 1부터 4까지 번호를매깁니다.
// x 좌표와 y 좌표가 모두 양수이면 제1사분면에 속합니다.
// x 좌표가 음수, y 좌표가 양수이면 제2사분면에 속합니다.
// x 좌표와 y 좌표가 모두 음수이면 제3사분면에 속합니다.
// x 좌표가 양수, y 좌표가 음수이면 제4사분면에 속합니다.
// x 좌표 (x, y)를 차례대로 담은 정수 배열 dot이 매개변수로 주어집니다.
// 좌표 dot이 사분면 중 어디에 속하는지 1, 2, 3, 4 중 하나를 return 하도록 solution 함수를 완성해주세요.

const solution107 = (dot) => {
  if (dot[0] >= 0 && dot[1] >= 0) {
    return 1;
  } else if (dot[0] < 0 && dot[1] >= 0) {
    return 2;
  } else if (dot[0] < 0 && dot[1] < 0) {
    return 3;
  } else if (dot[0] >= 0 && dot[1] < 0) {
    return 4;
  }
};

/////// 다른 사람 풀이

const solution107_1 = (dot) => {
  const [num, num2] = dot;
  const check = num * num2 > 0;
  return num > 0 ? (check ? 1 : 4) : check ? 3 : 2;
};

/////////////// 108. 가위 바위 보 /////////////

// 문제
// 가위는 2 바위는 0 보는 5로 표현합니다. 가위 바위 보를 내는 순서대로 나타낸 문자열 rsp가 매개변수로 주어질 때,
// rsp에 저장된 가위 바위 보를 모두 이기는 경우를 순서대로 나타낸 문자열을 return하도록 solution 함수를 완성해보세요.

const solution108 = (rsp) => {
  return [...rsp].map((v) => (v == 2 ? 0 : v == 0 ? 5 : 2)).join("");
};

/////// 다른 사람 풀이
const solution108_1 = (rsp) => {
  let arr = {
    2: 0,
    0: 5,
    5: 2,
  };
  var answer = [...rsp].map((v) => arr[v]).join("");
  return answer;
};

/////////////// 109.모스부호 (1)  /////////////

// 문제
// 머쓱이는 친구에게 모스부호를 이용한 편지를 받았습니다.
// 그냥은 읽을 수 없어 이를 해독하는 프로그램을 만들려고 합니다.
// 문자열 letter가 매개변수로 주어질 때, letter를 영어 소문자로 바꾼 문자열을 return 하도록 solution 함수를 완성해보세요.

const solution109 = (letter) => {
  const morse = {
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",
  };
  return letter
    .split(" ")
    .map((v) => morse[v])
    .join("");
};

/////////////// 110. 개미군단  /////////////

// 문제
// 개미 군단이 사냥을 나가려고 합니다. 개미군단은 사냥감의 체력에 딱 맞는 병력을 데리고 나가려고 합니다.
// 장군개미는 5의 공격력을, 병정개미는 3의 공격력을 일개미는 1의 공격력을 가지고 있습니다.
// 예를 들어 체력 23의 여치를 사냥하려고 할 때, 일개미 23마리를 데리고 가도 되지만,
// 장군개미 네 마리와 병정개미 한 마리를 데리고 간다면 더 적은 병력으로 사냥할 수 있습니다.
// 사냥감의 체력 hp가 매개변수로 주어질 때,
// 사냥감의 체력에 딱 맞게 최소한의 병력을 구성하려면 몇 마리의 개미가 필요한지를 return하도록 solution 함수를 완성해주세요.

const solution110 = (hp) => {
  const first = parseInt(hp / 5);
  const second = parseInt((hp % 5) / 3);
  const third = (hp % 5) % 3;
  return first + second + third;
};

////// 다른 사람 풀이

const solution110_1 = (hp) => {
  return Math.floor(hp / 5) + Math.floor((hp % 5) / 3) + ((hp % 5) % 3);
};

/////////////// 111. 순서쌍의 개수  /////////////

// 문제
// 순서쌍이란 두 개의 숫자를 순서를 정하여 짝지어 나타낸 쌍으로 (a, b)로 표기합니다.
// 자연수 n이 매개변수로 주어질 때 두 숫자의 곱이 n인 자연수 순서쌍의 개수를 return하도록 solution 함수를 완성해주세요.

const solution111 = (n) => {
  const arr = [];
  let i = 1;

  while (i <= n) {
    if (n % i === 0) {
      arr.push([i, n / i]);
    }
    i++;
  }
  return arr.length;
};

/////// 다른 사람 풀이

const solution111_1 = (n) => {
  let ans = 0;
  for (let i = 1; i < Math.sqrt(n); i++) if (n % i === 0) ans += 2;

  return Number.isInteger(Math.sqrt(n)) ? ans + 1 : ans;
};

/////////////// 112.  진료순서 정하기  /////////////

// 문제
// 외과의사 머쓱이는 응급실에 온 환자의 응급도를 기준으로 진료 순서를 정하려고 합니다.
// 정수 배열 emergency가 매개변수로 주어질 때 응급도가 높은 순서대로 진료 순서를 정한 배열을 return하도록 solution 함수를 완성해주세요.

const solution112 = (emergency) => {
  const copiedEmergency = [...emergency].sort((a, b) => b - a);
  let rankArr = new Array(emergency.length).fill(0);
  let count = 1;
  for (let i = 0; i < emergency.length; i++) {
    let index = emergency.indexOf(copiedEmergency[i]);
    rankArr.splice(index, 1, count);
    count++;
  }
  return rankArr;
};

//// 다른 사람 풀이

const solution112_1 = (emergency) => {
  let sorted = emergency.slice().sort((a, b) => b - a);
  return emergency.map((v) => sorted.indexOf(v) + 1);
};

/////////////// 113. 외계행성의 나이  /////////////

// 문제
// 우주여행을 하던 머쓱이는 엔진 고장으로 PROGRAMMERS-962 행성에 불시착하게 됐습니다.
// 입국심사에서 나이를 말해야 하는데, PROGRAMMERS-962 행성에서는 나이를 알파벳으로 말하고 있습니다.
// a는 0, b는 1, c는 2, ..., j는 9입니다. 예를 들어 23살은 cd, 51살은 fb로 표현합니다.
// 나이 age가 매개변수로 주어질 때 PROGRAMMER-962식 나이를 return하도록 solution 함수를 완성해주세요.

const solution113 = (age) => {
  const arr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
  return [...age.toString()].reduce((acc, v) => {
    acc += arr[+v];
    return acc;
  }, "");
};

///// 다른 사람 풀이

const solution113_1 = (age) => {
  return age
    .toString()
    .split("")
    .map((v) => "abcdefghij"[v])
    .join("");
};

const solution113_2 = (age) => {
  let char = "abcdefghij";
  return Array.from(age.toString())
    .map((t) => char[+t])
    .join("");
};

const solution113_3 = (age) => {
  return age.toString().replace(/./g, (x) => "abcdefghij"[x]);
};

/////////////// 114. 배열 자르기  /////////////

// 문제
// 정수 배열 numbers와 정수 num1, num2가 매개변수로 주어질 때,
// numbers의 num1번 째 인덱스부터 num2번째 인덱스까지 자른 정수 배열을 return 하도록 solution 함수를 완성해보세요.

const solution114 = (numbers, num1, num2) => {
  return numbers.slice(num1, num2 + 1);
};

/////////////// 115. 짝수의 합  /////////////

// 문제
// 정수 n이 주어질 때, n이하의 짝수를 모두 더한 값을 return 하도록 solution 함수를 작성해주세요.

const solution115 = (n) => {
  let result = 0;
  for (i = 0; i <= n; i += 2) {
    result += i;
  }
  return result;
};

//////// 다른 사람 풀이
const solution115_1 = (n) => {
  var half = Math.floor(n / 2);
  return half * (half + 1);
};

/////////////// 116. 양꼬치  /////////////

// 문제
// 머쓱이네 양꼬치 가게는 10인분을 먹으면 음료수 하나를 서비스로 줍니다.
// 양꼬치는 1인분에 12,000원, 음료수는 2,000원입니다. 정수 n과 k가 매개변수로 주어졌을 때,
// 양꼬치 n인분과 음료수 k개를 먹었다면 총얼마를 지불해야 하는지 return 하도록 solution 함수를 완성해보세요.

const solution116 = (n, k) => {
  return n * 12000 + (k - Math.floor(n / 10)) * 2000;
};

/////////////// 117. 각도기  /////////////

// 문제
// 각에서 0도 초과 90도 미만은 예각, 90도는 직각, 90도 초과 180도 미만은 둔각 180도는 평각으로 분류합니다.
// 각 angle이 매개변수로 주어질 때 예각일 때 1, 직각일 때 2, 둔각일 때 3, 평각일 때 4를 return하도록 solution 함수를 완성해주세요.

const solution117 = (angle) => {
  if (0 < angle && angle < 90) return 1;
  else if (angle === 90) return 2;
  else if (90 < angle && angle < 180) return 3;
  else if (angle === 180) return 4;
};

//////// 다른 사람 풀이

const solution117_1 = (angle) => {
  return [0, 90, 91, 180].filter((x) => angle >= x).length;
};

const solution117_2 = (angle) => {
  return angle < 90 ? 1 : angle === 90 ? 2 : angle < 180 ? 3 : 4;
};

const solution117_3 = (angle) => {
  switch (angle) {
    case 90:
      return 2;
    case 180:
      return 4;
    default:
      return angle > 0 && angle < 90 ? 1 : 3;
  }
};

/////////////// 118. 특정 문자 제거하기  /////////////

// 문제
// 문자열 my_string과 문자 letter이 매개변수로 주어집니다.
// my_string에서 letter를 제거한 문자열을 return하도록 solution 함수를 완성해주세요.

const solution118 = (my_string, letter) => {
  return [...my_string].filter((v) => v !== letter).join("");
};

///// 다른 사람 풀이

const solution118_1 = (my_string, letter) => {
  const answer = my_string.split(letter).join("");
  return answer;
};

const solution118_2 = (my_string, letter) => {
  return my_string.replaceAll(letter, "");
};

/////////////// 119. 문자 반복 출력하기  /////////////

// 문제
// 문자열 my_string과 정수 n이 매개변수로 주어질 때,
// my_string에 들어있는 각 문자를 n만큼 반복한 문자열을 return 하도록 solution 함수를 완성해보세요.

const solution119 = (my_string, n) => {
  return [...my_string].reduce((acc, v) => {
    acc += new Array(n).fill(v).join("");
    return acc;
  }, "");
};

////// 다른 사람 풀이

const solution119_1 = (my_string, n) => {
  var answer = [...my_string].map((v) => v.repeat(n)).join("");
  console.log(answer);
  return answer;
};

/////////////// 120. 짝수 홀수 개수  /////////////

// 문제
// 정수가 담긴 리스트 num_list가 주어질 때,
// num_list의 원소 중 짝수와 홀수의 개수를 담은 배열을 return 하도록 solution 함수를 완성해보세요.

const solution120 = (num_list) => {
  const even = num_list.filter((v) => v % 2 === 0);
  const odd = num_list.filter((v) => v % 2);
  return [even.length, odd.length];
};

////// 다른 사람 풀이

const solution120_1 = (num_list) => {
  var answer = [0, 0];

  for (let a of num_list) {
    answer[a % 2] += 1;
  }

  return answer;
};

const solution120_2 = (num_list) => {
  return [
    num_list.filter((num) => num % 2 === 0).length,
    num_list.filter((num) => num % 2 === 1).length,
  ];
};

const solution120_3 = (list) => {
  return list.reduce(
    (acc, cur) => (cur & 1 ? acc[1]++ : acc[0]++, acc),
    [0, 0]
  );
};

/////////////// 121. 문자열 뒤집기  /////////////

// 문제
// 문자열 my_string이 매개변수로 주어집니다.
// my_string을 거꾸로 뒤집은 문자열을 return하도록 solution 함수를 완성해주세요.

const sotution121 = (my_string) => [...my_string].reverse().join("");

/////////////// 122. 배열 뒤집기  /////////////

// 문제
// 정수가 들어 있는 배열 num_list가 매개변수로 주어집니다.
//  num_list의 원소의 순서를 거꾸로 뒤집은 배열을 return하도록 solution 함수를 완성해주세요.

const solution122 = (num_list) => num_list.reverse();

/////////////// 123. 나이 출력  /////////////

// 문제
// 머쓱이는 40살인 선생님이 몇 년도에 태어났는지 궁금해졌습니다.
// 나이 age가 주어질 때, 2022년을 기준 출생 연도를 return 하는 solution 함수를 완성해주세요.

const solution = (age) => 2022 - (age - 1);

/////////////// 124. 아이스 아메리카노  /////////////

// 문제
// 머쓱이는 추운 날에도 아이스 아메리카노만 마십니다.
// 아이스 아메리카노는 한잔에 5,500원입니다. 머쓱이가 가지고 있는 돈 money가 매개변수로 주어질 때,
//  머쓱이가 최대로 마실 수 있는 아메리카노의 잔 수와 남는 돈을 순서대로 담은 배열을 return 하도록 solution 함수를 완성해보세요.

const solution124 = (money) => {
  let result = [0, money];
  while (result[1] > 0) {
    if (result[1] >= 5500) {
      result[1] -= 5500;
      result[0] += 1;
    } else {
      break;
    }
  }
  return result;
};

/////// 다른 사람 풀이

const solution124_1 = (money) => {
  let count = 0;
  while (money >= 5500) {
    money -= 5500;
    count++;
  }
  return [count, money];
};

const solution124_2 = (money) => {
  return [Math.floor(money / 5500), money % 5500];
};

/////////////// 125. 옷가게 할인 받기  /////////////

// 문제
// 머쓱이네 옷가게는 10만 원 이상 사면 5%, 30만 원 이상 사면 10%, 50만 원 이상 사면 20%를 할인해줍니다.
// 구매한 옷의 가격 price가 주어질 때, 지불해야 할 금액을 return 하도록 solution 함수를 완성해보세요.

const solution125 = (price) => {
  if (price >= 100000 && price < 300000) {
    return Math.floor(price * 0.95);
  } else if (price >= 300000 && price < 500000) {
    return Math.floor(price * 0.9);
  } else if (price >= 500000) {
    return Math.floor(price * 0.8);
  } else {
    return price;
  }
};

/////////////// 126. 공 던지기  /////////////

// 문제
// 머쓱이는 친구들과 동그랗게 서서 공 던지기 게임을 하고 있습니다.
// 공은 1번부터 던지며 오른쪽으로 한 명을 건너뛰고 그다음 사람에게만 던질 수 있습니다.
// 친구들의 번호가 들어있는 정수 배열 numbers와 정수 K가 주어질 때,
// k번째로 공을 던지는 사람의 번호는 무엇인지 return 하도록 solution 함수를 완성해보세요.

const solution126 = (numbers, k) => {
  let arr = [];
  let count = 0;

  while (arr.length <= k - 1) {
    if (count > numbers.length - 1) {
      count = count - numbers.length;
      arr.push(numbers[count]);
      count += 2;
    } else {
      arr.push(numbers[count]);
      count += 2;
    }
  }
  return arr[arr.length - 1];
};

//////////   다른 사람 풀이

const solution126_1 = (numbers, k) => {
  return numbers[(--k * 2) % numbers.length];
};

const solution126_2 = (numbers, k) => {
  return numbers[(2 * (k - 1)) % numbers.length];
};

const solution126_3 = (numbers, k) => {
  const [idx, len] = [k * 2 - 1, numbers.length];
  const findIdx = idx >= len ? idx % len : idx;
  return findIdx;
};

/////////////// 127. 구슬을 나누는 경우의 수  /////////////

// 문제
// 머쓱이는 구슬을 친구들에게 나누어주려고 합니다. 구슬은 모두 다르게 생겼습니다.
// 머쓱이가 갖고 있는 구슬의 개수 balls와 친구들에게 나누어 줄 구슬 개수 share이 매개변수로 주어질 때,
// balls개의 구슬 중 share개의 구슬을 고르는 가능한 모든 경우의 수를 return 하는 solution 함수를 완성해주세요.

const solution127 = (balls, share) => {
  let answer = 1;

  for (i = 0; i < share; i++) {
    answer = (answer * (balls - i)) / (i + 1);
  }
  return answer;
};

/////////////// 128. 삼각형의 완성조건 (2)  /////////////

// 문제
// 선분 세 개로 삼각형을 만들기 위해서는 다음과 같은 조건을 만족해야 합니다.
// 가장 긴 변의 길이는 다른 두 변의 길이의 합보다 작아야 합니다.
// 삼각형의 두 변의 길이가 담긴 배열 sides이 매개변수로 주어집니다.
// 나머지 한 변이 될 수 있는 정수의 개수를 return하도록 solution 함수를 완성해주세요.

const solution128 = (sides) => {
  let count = 0;
  const max = Math.max(...sides);
  const min = Math.min(...sides);

  for (let i = max - min + 1; i <= max; i++) {
    count++;
  }

  for (let i = max + 1; i < max + min; i++) {
    count++;
  }
  return count;
};

/////////////// 129. 커피 심부름  /////////////

// 문제
// 팀의 막내인 철수는 아메리카노와 카페 라테만 판매하는 카페에서 팀원들의 커피를 사려고 합니다.
// 아메리카노와 카페 라테의 가격은 차가운 것과 뜨거운 것 상관없이 각각 4500, 5000원입니다.
// 각 팀원에게 마실 메뉴를 적어달라고 하였고,
// 그 중에서 메뉴만 적은 팀원의 것은 차가운 것으로 통일하고 "아무거나"를 적은 팀원의 것은 차가운 아메리카노로 통일하기로 하였습니다.
// 각 직원이 적은 메뉴가 문자열 배열 order로 주어질 때,
// 카페에서 결제하게 될 금액을 return 하는 solution 함수를 작성해주세요.
// order의 원소는 아래의 것들만 들어오고, 각각의 의미는 다음과 같습니다.

const solution129 = (order) => {
  return order.reduce((acc, v) => {
    if (v.includes("americano") || v === "anything") {
      acc += 4500;
    } else if (v.includes("latte")) {
      acc += 5000;
    }
    return acc;
  }, 0);
};

////// 다른 사람 풀이
const solution129_1 = (order) =>
  order.reduce((acc, cur) => acc + (cur.includes("latte") ? 5000 : 4500), 0);

const solution129_2 = (order) =>
  order.reduce((a, b) => a + (/latte/.test(b) ? 5000 : 4500), 0);

/////////////// 130. 직사각형 넓이 구하기   /////////////

// 문제
// 2차원 좌표 평면에 변이 축과 평행한 직사각형이 있습니다.
// 직사각형 네 꼭짓점의 좌표 [[x1, y1], [x2, y2], [x3, y3], [x4, y4]]가 담겨있는 배열 dots가 매개변수로 주어질 때,
// 직사각형의 넓이를 return 하도록 solution 함수를 완성해보세요.

const solution130 = (dots) => {
  const width =
    Math.max(...dots.map((a) => a[0])) - Math.min(...dots.map((a) => a[0]));
  const height =
    Math.max(...dots.map((a) => a[1])) - Math.min(...dots.map((a) => a[1]));
  return width * height;
};

////////// 다른 사람 풀이

const solution130_1 = (dots) => {
  let x = [],
    y = [];

  for (let pos of dots) {
    x.push(pos[0]);
    y.push(pos[1]);
  }

  return (Math.max(...x) - Math.min(...x)) * (Math.max(...y) - Math.min(...y));
};

const solution130_2 = (dots) => {
  const [[x1, y1], [x2, y2], [x3, y3]] = dots.sort(([x1], [x2]) => x1 - x2);
  return Math.abs(y1 - y2) * Math.abs(x1 - x3);
};

/////////////// 131. 캐릭터의 좌표   /////////////

// 문제
// 캐릭터는 항상 [0,0]에서 시작할 때
// 키 입력이 모두 끝난 뒤에 캐릭터의 좌표 [x, y]를 return하도록 solution 함수를 완성해주세요.

const solution131 = (keyinput, board) => {
  board[0] = (board[0] - 1) / 2;
  board[1] = (board[1] - 1) / 2;
  return keyinput.reduce(
    (acc, v) => {
      if (v === "right" && acc[0] + 1 <= board[0]) acc[0]++;
      if (v === "left" && acc[0] - 1 >= -board[0]) acc[0]--;

      if (v === "up" && acc[1] + 1 <= board[1]) acc[1]++;
      if (v === "down" && acc[1] - 1 >= -board[1]) acc[1]--;
      return acc;
    },
    [0, 0]
  );
};

//////// 다른 사람 풀이

const solution131_1 = (keyinput, board) => {
  let res = [0, 0];
  for (let p of keyinput) {
    switch (p) {
      case "left":
        if (-res[0] < board[0] / 2 - 1) res[0]--;
        break;
      case "right":
        if (res[0] < board[0] / 2 - 1) res[0]++;
        break;
      case "up":
        if (res[1] < board[1] / 2 - 1) res[1]++;
        break;
      case "down":
        if (-res[1] < board[1] / 2 - 1) res[1]--;
        break;
    }
  }
  return res;
};

/////////////// 132. 다항식 더하기   /////////////

// 문제
// 한 개 이상의 항의 합으로 이루어진 식을 다항식이라고 합니다.
// 다항식을 계산할 때는 동류항끼리 계산해 정리합니다.
// 덧셈으로 이루어진 다항식 polynomial이 매개변수로 주어질 때,
// 동류항끼리 더한 결괏값을 문자열로 return 하도록 solution 함수를 완성해보세요.
// 같은 식이라면 가장 짧은 수식을 return 합니다.

const solution132 = (polynomial) => {
  let arr = polynomial.split(" + ");
  let xTerm = 0;
  let constant = 0;
  arr.map((i) => {
    if (i.includes("x")) {
      const tmp = i.split("x");
      tmp[0] ? (xTerm += parseInt(tmp[0])) : xTerm++;
    } else if (i !== "+") {
      constant += parseInt(i);
    }
  });
  if (xTerm !== 0 && constant !== 0) {
    if (xTerm === 1) {
      return `x + ${constant}`;
    }
    return `${xTerm}x + ${constant}`;
  }
  if (xTerm === 0 && constant !== 0) {
    return `${constant}`;
  }
  if (xTerm !== 0 && constant === 0) {
    if (xTerm === 1) {
      return "x";
    }
    return `${xTerm}x`;
  }
  if (xTerm === 0 && constant === 0) {
    return "0";
  }
};

/////////////// 다른 사람 풀이
const solution132_1 = (polynomial) => {
  const arr = polynomial.split(" + ");
  const xNum = arr
    .filter((n) => n.includes("x"))
    .map((n) => n.replace("x", "") || "1")
    .reduce((acc, cur) => acc + parseInt(cur, 10), 0);
  const num = arr
    .filter((n) => !isNaN(n))
    .reduce((acc, cur) => acc + parseInt(cur, 10), 0);

  let answer = [];
  if (xNum) answer.push(`${xNum === 1 ? "" : xNum}x`);
  if (num) answer.push(num);

  return answer.join(" + ");
};

/////////////// 133.  저주의 숫자 3 /////////////

// 문제
// 정수 n이 매개변수로 주어질 때, n을 3x 마을에서 사용하는 숫자로 바꿔 return하도록 solution 함수를 완성해주세요.

const solution133 = (n) => {
  let tenBaseNumber = 1,
    townNumber = 1;

  while (n > tenBaseNumber) {
    tenBaseNumber++;
    townNumber++;

    while (townNumber % 3 === 0 || String(townNumber).includes("3")) {
      townNumber++;
    }
  }

  return townNumber;
};

/////////// 다른 사람 풀이

const solution133_1 = (n) => {
  return [...Array(n * 3)]
    .map((_, i) => i + 1)
    .filter((num) => num % 3 !== 0 && !num.toString().includes("3"))[n - 1];
};

const solution133_2 = (n) => {
  var answer = 0;
  for (let i = 1; i <= n; i++) {
    if (i % 3 == 0) {
      n++;
    }
    if (String(i).includes("3") & (i % 3 != 0)) {
      n++;
    }
  }
  return n;
};

/////////////// 134. 유한소수 판별하기 /////////////

// 문제
// 두 정수 a와 b가 매개변수로 주어질 때,
// a/b가 유한소수이면 1을, 무한소수라면 2를 return하도록 solution 함수를 완성해주세요.

const solution134 = (a, b) => {
  let g = 1;
  for (let i = 1; i <= b; i++) {
    if (a % i === 0 && b % i === 0) g = i;
  }

  b = b / g;

  while (b % 2 === 0) b = b / 2;
  while (b % 5 === 0) b = b / 5;

  return b === 1 ? 1 : 2;
};

///////// 다른 사람 풀이

const solution134_1 = (a, b) => {
  return Number((a / b).toFixed(10)) == a / b ? 1 : 2;
};

const solution134_2 = (a, b) => {
  return (a / b).toString().length > 10 ? 2 : 1;
};

/////////////// 135. 코드 처리하기 /////////////

// 문제
// 문자열 code를 통해 만들어진 문자열 ret를 return 하는 solution 함수를 완성해 주세요.

const solution135 = (code) => {
  let mode = 0;

  const arr = [...code].reduce((acc, v, i) => {
    if (mode === 0) {
      if (v === "1") {
        mode = 1;
      } else if (v !== "1" && i % 2 === 0) {
        acc.push(code[i]);
      }
    } else if (mode === 1) {
      if (v === "1") {
        mode = 0;
      } else if (v !== "1" && i % 2 !== 0) {
        acc.push(code[i]);
      }
    }
    return acc;
  }, []);

  return !arr.length ? "EMPTY" : arr.join("");
};

///////////// 다른 사람 풀이

const solution135_1 = (code) => {
  let odd = false;
  return (
    Array.from(code).reduce((acc, v, i) => {
      if (v === "1") {
        odd = !odd;
        return acc;
      }
      return i % 2 === (odd ? 1 : 0) ? acc + v : acc;
    }, "") || "EMPTY"
  );
};

const solution135_2 = (code) => {
  var answer = code
    .replaceAll("1", "")
    .split("")
    .filter((val, idx) => idx % 2 === 0)
    .join("");
  return answer.length > 0 ? answer : "EMPTY";
};

/////////////// 136. 수열과 구간 쿼리 4 /////////////

// 문제
// 위 규칙에 따라 queries를 처리한 이후의 arr를 return 하는 solution 함수를 완성해 주세요.

const solution136 = (arr, queries) => {
  queries.map(([s, e, k]) => {
    for (i = s; i <= e; i++) {
      if (i % k === 0) {
        arr[i]++;
      }
    }
  });
  return arr;
};

/////////// 다른 사람 풀이

const solution136_1 = (arr, queries) => {
  for (let [s, e, k] of queries) {
    for (let i = s; i <= e; i++) {
      if (i % k === 0) arr[i]++;
    }
  }
  return arr;
};

////////////// 137.  배열 만들기 4 /////////////

// 문제
// 위 작업을 마친 후 만들어진 stk를 return 하는 solution 함수를 완성해 주세요.

const solution137 = (arr) => {
  const str = [];
  for (i = 0; i < arr.length; i++) {
    if (!str.length) {
      str.push(arr[i]);
    } else if (str[str.length - 1] < arr[i]) {
      str.push(arr[i]);
    } else if (str[str.length - 1] >= arr[i]) {
      str.pop();
      i--;
    }
  }
  return str;
};

///////////// 다른 사람 풀이

const solution137_1 = (arr) => {
  var stk = [];
  for (let i = 0; i < arr.length; ) {
    if (stk.length === 0) {
      stk.push(arr[i++]);
    } else if (stk[stk.length - 1] < arr[i]) {
      stk.push(arr[i++]);
    } else if (stk[stk.length - 1] >= arr[i]) {
      stk.pop();
    }
  }
  return stk;
};

////////////// 138. 외계어 사전 /////////////

// 문제
// spell에 담긴 알파벳을 한번씩만 모두 사용한 단어가 dic에 존재한다면 1,
// 존재하지 않는다면 2를 return하도록 solution 함수를 완성해주세요.

const solution138 = (spell, dic) => {
  let count = 2;
  for (let word of dic) {
    const result = spell.reduce((acc, v) => {
      if (word.includes(v)) acc.push(1);
      return acc;
    }, []);
    if (result.length === spell.length) count = 1;
  }
  return count;
};

/////////// 다른 사람 풀이
const solution138_1 = (p, d) => {
  return d.some((s) => p.sort().toString() == [...s].sort().toString()) ? 1 : 2;
};

const solution138_2 = (spell, dic) => {
  return dic.filter((v) => spell.every((c) => v.includes(c))).length ? 1 : 2;
};

////////////// 139. 문자열 여러번 뒤집기 /////////////

// 문제
// 문자열 my_string과 이차원 정수 배열 queries가 매개변수로 주어집니다.
//  queries의 원소는 [s, e] 형태로, my_string의 인덱스 s부터 인덱스 e까지를 뒤집으라는 의미입니다.
// my_string에 queries의 명령을 순서대로 처리한 후의 문자열을 return 하는 solution 함수를 작성해 주세요.

const solution139 = (my_string, queries) => {
  for (let [s, e] of queries) {
    let word = my_string.slice(s, e + 1);
    my_string =
      my_string.slice(0, s) +
      word.split("").reverse().join("") +
      my_string.slice(e + 1);
  }
  return my_string;
};

//////////////// 다른 사람 풀이

const solution139_1 = (my_string, queries) => {
  let str = my_string.split("");
  queries.forEach(([start, end]) => {
    const changeStr = str.slice(start, end + 1);
    str.splice(start, changeStr.length, ...changeStr.reverse());
  });
  return str.join("");
};

const solution139_2 = (my_string, queries) => {
  const str = [...my_string];
  queries.forEach(([s, e]) => {
    while (s < e) {
      [str[s], str[e]] = [str[e], str[s]];
      s++;
      e--;
    }
  });
  return str.join("");
};

////////////// 140. 배열 만들기 2 /////////////

// 문제
// 정수 l과 r이 주어졌을 때, l 이상 r이하의 정수 중에서 숫자 "0"과 "5"로만 이루어진 모든 정수를
//  오름차순으로 저장한 배열을 return 하는 solution 함수를 완성해 주세요.
// 만약 그러한 정수가 없다면, -1이 담긴 배열을 return 합니다.

function solution140(l, r) {
  var answer = [];
  for (let i = l; i <= r; i++) {
    let arr = String(i);
    if (![...arr].every((x) => x === "5" || x === "0")) continue;
    answer.push(i);
  }
  return answer.length ? answer : [-1];
}

/////// 다른 사람 풀이

function solution140_1(l, r) {
  const result = Array.from({ length: r - l + 1 }, (_, i) => i + l).filter(
    (n) => !/[^05]/.test(n)
  );
  return result.length ? result : [-1];
}

////////////// 141. 배열 만들기 5 /////////////

// 문제
// 문자열 배열 intStrs와 정수 k, s, l가 주어집니다. intStrs의 원소는 숫자로 이루어져 있습니다.
// 배열 intStrs의 각 원소마다 s번 인덱스에서 시작하는 길이 l짜리 부분 문자열을 잘라내 정수로 변환합니다.
// 이때 변환한 정수값이 k보다 큰 값들을 담은 배열을 return 하는 solution 함수를 완성해 주세요.

function solution141(intStrs, k, s, l) {
  return intStrs.reduce((acc, e, i) => {
    if (k < +e.substr(s, l)) acc.push(+e.substr(s, l));
    return acc;
  }, []);
}

/////// 다른 사람 풀이

function solution141_1(intStrs, k, s, l) {
  return intStrs.map((v) => +v.slice(s, s + l)).filter((v) => v > k);
}

function solution141_2(intStrs, k, s, l) {
  var answer = [];
  intStrs.forEach((el) => {
    const num = +el.substr(s, l);
    if (num > k) answer.push(num);
  });
  return answer;
}

function solution141_3(intStrs, k, s, l) {
  return intStrs
    .reduce((acc, e) => {
      acc.push(+e.substr(s, l));
      return acc;
    }, [])
    .filter((v) => v > k);
} /////// 내 풀이보다 살짝 더 빠름

////////////// 142. qr code /////////////

// 문제
// 두 정수 q, r과 문자열 code가 주어질 때,
//  code의 각 인덱스를 q로 나누었을 때 나머지가 r인 위치의 문자를 앞에서부터
// 순서대로 이어 붙인 문자열을 return 하는 solution 함수를 작성해 주세요.

function solution142(q, r, code) {
  return [...code].filter((_, i) => i % q === r).join("");
}

/////////   다른 사람 풀이

function solution142_1(q, r, code) {
  return Array.from(code).reduce((result, word, i) => {
    if (i % q === r) return result + word;
    return result;
  }, "");
}

////////////// 143. 문자 개수 세기 /////////////

// 문제
// 알파벳 대소문자로만 이루어진 문자열 my_string이 주어질 때,
// my_string에서 'A'의 개수, my_string에서 'B'의 개수,..., my_string에서 'Z'의 개수,
// my_string에서 'a'의 개수, my_string에서 'b'의 개수,..., my_string에서 'z'의 개수를
// 순서대로 담은 길이 52의 정수 배열을 return 하는 solution 함수를 작성해 주세요.

function solution143(m) {
  var answer = [];
  let al = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let a = [];
  a.length = 52;
  a.fill(0);

  m.split("").map((n) => {
    a[al.indexOf(n)] += 1;
  });

  return a;
}

//////// 다른 사람 풀이

function solution143_1(str) {
  return [...str].reduce(
    (p, c) => (p[c.charCodeAt() - (c === c.toLowerCase() ? 71 : 65)]++, p),
    Array(52).fill(0)
  );
}

////////////// 144. 수열 구간과 쿼리 1 /////////////

// 문제
// 정수 배열 arr와 2차원 정수 배열 queries이 주어집니다.
// queries의 원소는 각각 하나의 query를 나타내며, [s, e] 꼴입니다.
// 각 query마다 순서대로 s ≤ i ≤ e인 모든 i에 대해 arr[i]에 1을 더합니다.
// 위 규칙에 따라 queries를 처리한 이후의 arr를 return 하는 solution 함수를 완성해 주세요.

function solution144(arr, queries) {
  queries.map(([s, e]) => {
    for (i = s; i <= e; i++) {
      arr[i]++;
    }
  });
  return arr;
}

/////// 다른 사람 풀이

function solution144_1(arr, queries) {
  queries.forEach(([s, e]) => {
    while (s <= e) arr[s++]++;
  });
  return arr;
}

function solution144_2(arr, queries) {
  for (let [s, e] of queries) for (let i = s; i <= e; i++) arr[i]++;
  return arr;
}

////////////// 145. 조건에 맞게 수열 변환하기 2 /////////////

// 문제
// 이러한 작업을 x번 반복한 결과인 배열을 arr(x)라고 표현했을 때, arr(x) = arr(x + 1)인 x가 항상 존재합니다.
//  이러한 x 중 가장 작은 값을 return 하는 solution 함수를 완성해 주세요.

function solution145(arr) {
  let idx = 0;
  let prevArr = arr;
  while (true) {
    const changeCurArr = prevArr.map((a) => {
      if (a >= 50 && a % 2 === 0) return a / 2;
      if (a < 50 && a % 2 === 1) return a * 2 + 1;
      return a;
    });

    const isAllSame = prevArr.every((a, i) => a === changeCurArr[i]);
    if (isAllSame) break;
    idx += 1;
    prevArr = changeCurArr;
  }

  return idx;
}

////////  다른 사람 풀이

function solution145_1(arr) {
  var answer = 0;
  let before = [-1];

  while (!arr.every((e, idx) => e == before[idx])) {
    before = [...arr];

    arr = arr.map((e) => {
      if ((e >= 50) & (e % 2 == 0)) return e / 2;
      if ((e < 50) & (e % 2 != 0)) return e * 2 + 1;
      return e;
    });
    answer++;
  }
  return answer - 1;
}

function solution145_2(arr, n = 0) {
  while (
    !arr.every((x) => (x >= 50 && x % 2 === 1) || (x < 50 && x % 2 === 0))
  ) {
    arr = arr.map((x) => {
      if (x >= 50 && x % 2 === 0) return x / 2;
      if (x < 50 && x % 2 === 1) return x * 2 + 1;
      return x;
    });
    n++;
  }
  return n;
}

////////////// 146.  /////////////

// 문제
// 정수 배열 arr가 주어집니다. 문제에서의 무작위의 수는 arr에 저장된 순서대로 주어질 예정이라고 했을 때,
// 완성될 배열을 return 하는 solution 함수를 완성해 주세요.
// 단, 완성될 배열의 길이가 k보다 작으면 나머지 값을 전부 -1로 채워서 return 합니다.

function solution146(arr, k) {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (result.length === k) break;
    if (!result.includes(arr[i])) result.push(arr[i]);
  }

  while (result.length < k) {
    result.push(-1);
  }
  return result;
}

/////// 다른 사람 풀이

function solution146_1(arr, k) {
  const set = new Set(arr);
  return set.size < k
    ? [...set, ...Array(k - set.size).fill(-1)]
    : [...set].slice(0, k);
}

////////////// 147. 그림 확대 /////////////

// 문제
// 직사각형 형태의 그림 파일이 있고, 이 그림 파일은 1 × 1 크기의 정사각형 크기의 픽셀로 이루어져 있습니다.
// 이 그림 파일을 나타낸 문자열 배열 picture과 정수 k가 매개변수로 주어질 때,
// 이 그림 파일을 가로 세로로 k배 늘린 그림 파일을 나타내도록 문자열 배열을 return 하는 solution 함수를 작성해 주세요.

function solution147(picture, k) {
  return picture.reduce((acc, e) => {
    const repeatEl = [...e].map((el) => el.repeat(k)).join("");
    for (let i = 0; i < k; i++) acc.push(repeatEl);

    return acc;
  }, []);
}

////////// 다른 사람 풀이

const solution147_1 = (picture, k) =>
  Array(picture.length * k)
    .fill(0)
    .map((v, i) => picture[~~(i / k)].replace(/./g, (v) => v.repeat(k)));

////////////// 148. 전국 대회 선발 고사  /////////////

// 문제
// 전국 대회에 선발된 학생 번호들을 등수가 높은 순서대로 각각 a, b, c번이라고 할 때
// 10000 × a + 100 × b + c를 return 하는 solution 함수를 작성해 주세요.

function solution148(rank, attendance) {
  let answer = [];
  for (let i = 0; i < rank.length; i++) {
    if (attendance[i]) answer.push(rank[i]);
  }
  answer.sort((a, b) => a - b);
  function Participant(idx) {
    return rank.indexOf(answer[idx]);
  }
  return 10000 * Participant(0) + 100 * Participant(1) + Participant(2);
}

//////// 다른 사람 풀이

function solution148_1(rank, attendance) {
  const [a, b, c] = rank
    .map((r, i) => [r, i])
    .filter(([_, i]) => attendance[i])
    .sort(([a], [b]) => a - b);
  return 10000 * a[1] + 100 * b[1] + c[1];
}

////////////// 149. 정사각형으로 만들기  /////////////

// 문제
// 이차원 정수 배열 arr이 매개변수로 주어집니다.
// arr의 행의 수가 더 많다면 열의 수가 행의 수와 같아지도록 각 행의 끝에 0을 추가하고,
// 열의 수가 더 많다면 행의 수가 열의 수와 같아지도록 각 열의 끝에 0을 추가한 이차원 배열을 return 하는 solution 함수를 작성해 주세요.

function solution149(arr) {
  const columnLength = arr.length;
  const lowLength = arr[0].length;

  if (lowLength > columnLength) {
    const element = new Array(lowLength).fill(0);
    for (let i = 0; i < lowLength - columnLength; i++) {
      arr.push(element);
    }
  } else if (lowLength < columnLength) {
    arr.forEach((e) => {
      for (let i = 0; i < columnLength - lowLength; i++) {
        e.push(0);
      }
    });
  }
  return arr;
}

//////// 다른 사람 풀이

function solution149_1(arr) {
  let n = Math.max(arr.length, Math.max(...arr.map((v) => v.length)));
  for (let a of arr) while (a.length < n) a.push(0);
  while (arr.length < n) arr.push(Array(n).fill(0));
  return arr;
}

function solution149_2(arr) {
  const ROWS = arr.length;
  const COLS = arr[0].length;
  const DIFF = Math.abs(ROWS - COLS);

  if (ROWS > COLS) {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < DIFF; j++) {
        arr[i].push(0);
      }
    }
  } else if (ROWS < COLS) {
    for (let i = 0; i < DIFF; i++) {
      const row = new Array(COLS).fill(0);
      arr.push(row);
    }
  }

  return arr;
}

function solution149_3(arr) {
  const xLength = arr.length;
  const yLength = arr[0].length;

  if (xLength === yLength) return arr;

  const MaxLength = Math.max(xLength, yLength);
  const answer = Array.from({ length: MaxLength }, () =>
    Array(MaxLength).fill(0)
  );

  for (let x = 0; x < xLength; x++) {
    for (let y = 0; y < yLength; y++) {
      answer[x][y] = arr[x][y];
    }
  }

  return answer;
}

////////////// 150. 치킨 쿠폰  /////////////

// 문제
// 프로그래머스 치킨은 치킨을 시켜먹으면 한 마리당 쿠폰을 한 장 발급합니다.
// 쿠폰을 열 장 모으면 치킨을 한 마리 서비스로 받을 수 있고, 서비스 치킨에도 쿠폰이 발급됩니다.
// 시켜먹은 치킨의 수 chicken이 매개변수로 주어질 때 받을 수 있는 최대 서비스 치킨의 수를 return하도록 solution 함수를 완성해주세요.

function solution150(chicken) {
  let ch = chicken;
  let answer = 0;

  while (ch > 9) {
    answer += Math.floor(ch / 10);
    ch = Math.floor(ch / 10 + (ch % 10));
  }

  return answer;
}

///////// 다른 사람 풀이

function solution150_1(chicken) {
  var answer = parseInt((chicken - 1) / 9);
  return answer;
}

function solution150_2(chicken) {
  let answer = 0;
  let coupon = chicken;

  while (coupon >= 10) {
    answer = answer + parseInt(coupon / 10);
    coupon = parseInt(coupon / 10) + (coupon % 10);
  }

  return answer;
}

////////////// 151. 종이 자르기 /////////////

// 문제
// 머쓱이는 큰 종이를 1 x 1 크기로 자르려고 합니다.
// 예를 들어 2 x 2 크기의 종이를 1 x 1 크기로 자르려면 최소 가위질 세 번이 필요합니다.
// 정수 M, N이 매개변수로 주어질 때,
// M x N 크기의 종이를 최소로 가위질 해야하는 횟수를 return 하도록 solution 함수를 완성해보세요.

function solution151(M, N) {
  return M * N - 1;
}

////////////// 152. 문자열 밀기 /////////////

// 문제
// 문자열 "hello"에서 각 문자를 오른쪽으로 한 칸씩 밀고 마지막 문자는 맨 앞으로 이동시키면 "ohell"이 됩니다.
// 이것을 문자열을 민다고 정의한다면 문자열 A와 B가 매개변수로 주어질 때,
// A를 밀어서 B가 될 수 있다면 밀어야 하는 최소 횟수를 return하고 밀어서 B가 될 수 없으면 -1을 return 하도록 solution 함수를 완성해보세요.

function solution152(A, B) {
  let result = 0;

  const arr = [...A];

  while (arr.join("") !== B) {
    if (result > arr.length) {
      result = -1;
      break;
    }

    const spell = arr[arr.length - 1];

    arr.pop();
    arr.unshift(spell);
    result += 1;
  }

  return result;
}

///////// 다른 사람 풀이

let solution152_1 = (a, b) => (b + b).indexOf(a);

function solution152_2(A, B) {
  if (A === B) return 0;
  for (let i = 0; i < A.length; i++) {
    A = A.slice(-1) + A.slice(0, -1);
    if (A === B) return i + 1;
  }
  return -1;
}

var solution152_3 = (A, B) =>
  new Array(A.length)
    .fill(A)
    .map((s, i) => s.slice(A.length - i) + s.slice(0, A.length - i))
    .indexOf(B);

///////////// 153. 로그인 성공? /////////////

// 문제
// 머쓱이는 프로그래머스에 로그인하려고 합니다.
// 머쓱이가 입력한 아이디와 패스워드가 담긴 배열 id_pw와 회원들의 정보가 담긴 2차원 배열 db가 주어질 때,
// 아이디와 비밀번호가 모두 일치하는 회원정보가 있으면 "login"을 return합니다.
// 로그인이 실패했을 때 아이디가 일치하는 회원이 없다면 “fail”를,
// 아이디는 일치하지만 비밀번호가 일치하는 회원이 없다면 “wrong pw”를 return 합니다.

function solution153(id_pw, db) {
  let message = "fail";
  for (let [id, pw] of db) {
    if (id === id_pw[0] && pw === id_pw[1]) {
      message = "login";
      break;
    } else if (id === id_pw[0] && pw !== id_pw[1]) {
      message = "wrong pw";
      break;
    }
  }
  return message;
}

/////// 다른 사람 풀이

function solution153_1(id_pw, db) {
  const [id, pw] = id_pw;
  const map = new Map(db);
  return map.has(id) ? (map.get(id) === pw ? "login" : "wrong pw") : "fail";
}

function solution153_2(id_pw, db) {
  db = db.filter((v) => v[0] === id_pw[0]);

  if (!db.length) return "fail";

  for (let d of db) if (d[1] === id_pw[1]) return "login";

  return "wrong pw";
}

///////////// 154. 등수 메기기 /////////////

// 문제
// 영어 점수와 수학 점수의 평균 점수를 기준으로 학생들의 등수를 매기려고 합니다.
// 영어 점수와 수학 점수를 담은 2차원 정수 배열 score가 주어질 때,
// 영어 점수와 수학 점수의 평균을 기준으로 매긴 등수를 담은 배열을 return하도록 solution 함수를 완성해주세요.

function solutio154(score) {
  const avg = score.map(([e, m]) => (e + m) / 2);
  const result = new Array(score.length).fill(1);

  for (let i = 0; i < avg.length; i++) {
    for (let j = 0; j < avg.length; j++) {
      if (avg[j] > avg[i]) result[i]++;
    }
  }

  return result;
}

/////////// 다른 사람 풀이

function solution154_1(score) {
  return score.map((el) => {
    return (
      score.filter((v) => (v[0] + v[1]) / 2 > (el[0] + el[1]) / 2).length + 1
    );
  });
}

function solution154_2(score) {
  let avg = score.map((v) => (v[0] + v[1]) / 2);
  let sorted = avg.slice().sort((a, b) => b - a);
  return avg.map((v) => sorted.indexOf(v) + 1);
}

///////////// 155. 나머지가 1이 되는 수 찾기 /////////////

// 문제
// 자연수 n이 매개변수로 주어집니다.
// n을 x로 나눈 나머지가 1이 되도록 하는 가장 작은 자연수 x를 return 하도록 solution 함수를 완성해주세요. 답이 항상 존재함은 증명될 수 있습니다.

function solution155(n) {
  for (let x = 0; x < n; x++) {
    if (n % x === 1) {
      return x;
    }
  }
}

////////// 다른 사람 풀이

function solution155_1(n, x = 1) {
  while (x++) {
    if (n % x === 1) {
      return x;
    }
  }
}

///////////// 156. 음양 더하기 /////////////

// 문제
// 어떤 정수들이 있습니다. 이 정수들의 절댓값을 차례대로 담은 정수 배열 absolutes와
// 이 정수들의 부호를 차례대로 담은 불리언 배열 signs가 매개변수로 주어집니다.
// 실제 정수들의 합을 구하여 return 하도록 solution 함수를 완성해주세요.

function solution156(absolutes, signs) {
  let result = 0;
  for (let i = 0; i < absolutes.length; i++) {
    signs[i] === true ? (result += absolutes[i]) : (result += -absolutes[i]);
  }
  return result;
}

//////// 다른 사람 풀이

function solution156_1(absolutes, signs) {
  return absolutes.reduce((acc, val, i) => acc + val * (signs[i] ? 1 : -1), 0);
}
