# DS flix React 작업 완료 이후 타입스크립트 적용 + 추가작업

- TS적용 전 초기버전 https://github.com/bigwin26/dsflix

# DS's Blog FrontEnd with REACT , TS

- [x] 디테일 페이지 구성 변경
- [x] 디테일 페이지 별점 추가
- [x] 더보기 페이지 무한 스크롤
- [x] 가로 스크롤바 제거 후 클릭이벤트 적용
- [x] 메인화면 예고편 적용
- [x] TV SHOW 디테일 페이지 바로보기 연결 적용
- [] 다국어 적용(React Portal사용)
- [x] 최적화 (코드스플릿, 메모라이징)
- [x] 반응형 웹(모바일, PC)

# 개발이슈

- [x] HashRouter 사용시 LINK를통해 동일한 path로 이동하려고하면 에러발생. ex) /movie/1 -> /movie/2
  - 해결: 리덕스 상태관리를 통해 해결.
- [x] 더보기 작업시 중복데이터 필터링 적용
