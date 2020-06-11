<h1 align="center">Welcome to DSFlix 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
</p>

> DS flix 영화, TV프로그램 정보 사이트 with TypeScript

### 🏠 [Homepage](https://eager-allen-ef19d9.netlify.app/)
-클릭시 홈페이지로 이동합니다.

## About
- TypeScript와 React를 같이 사용해보는 것을 경험하기 위한 토이 프로젝트입니다.
- 영화정보와 TV프로그램, 배우들의 정보를 조회할 수 있습니다.

## Environment
# Front
- HTML
- CSS
- TypeScript
- React
- styled-components
- Redux
- Redux-saga

## Feature
- PC,mobile

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

# 초기버전
- TS적용 전 초기버전 https://github.com/bigwin26/dsflix

# 작업순서

- [x] 디테일 페이지 구성 변경
- [x] 디테일 페이지 별점 추가
- [x] 더보기 페이지 무한 스크롤
- [x] 가로 스크롤바 제거 후 화살표 클릭이벤트 적용
- [x] 메인화면 예고편 적용
- [x] TV SHOW 디테일 페이지 바로보기 연결 적용
- [x] 다국어 적용(React Portal사용)
- [x] 최적화 (코드스플릿, 메모라이징)
- [x] 반응형 (모바일, PC)

# 개발이슈

- [x] HashRouter 사용시 LINK를통해 동일한 path로 이동하려고하면 에러발생. ex) /movie/1 -> /movie/2
  - 해결: 리덕스 상태관리를 통해 해결.
- [x] 더보기 작업시 중복데이터 필터링 적용

## Author

👤 **daeseung**

- Github: [@bigwin26](https://github.com/bigwin26)

## Show your support

Give a ⭐️ if this project helped you!

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
