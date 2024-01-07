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

const solution = (my_string, s, e) => {
  const slicedString = my_string.slice(s, e + 1);
  const reverseStr = [...slicedString].reverse().join("");
  const splitMyString = [...my_string];
  splitMyString.splice(s, e - s + 1, reverseStr);
  return splitMyString.join("");
};
