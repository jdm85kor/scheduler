# scheduler
 **요구사항**

 - 오늘 날짜의 경우 숫자에 파란색 원형을 표기합니다.
 - 왼쪽 상단의 오늘 버튼을 클릭할 경우, 오늘 날짜가 포함된 달력으로 이동합니다.
 - 일정을 등록/수정/삭제할 수 있습니다.
 - 구성은 제목, 시작/종료 날짜, 시작/종료 시간으로 입력 합니다.
 - 등록/수정/삭제 팝업 내 달력 레이어는 input의 type으로 대체합니다.
 - 시간 선택 시 System Selectbox로 대체합니다.
 - 일정 시작/종료 시간은 12시간제(AM/PM) 기준으로 작성합니다.

 - 시간은 30분 단위로 구성되며, 같은 날짜일 경우 시작/종료 시간이 같을 수 없습니다.
 - 일정 색상은 중복되지 않는 랜덤 컬러로 구현합니다.
 - 상단 중앙 날짜 좌우 버튼클릭 시 이전 달(주), 다음 달(주)로 이동합니다.
 - 월간 캘린더의 경우 고정 6주를 보여줍니다.
 - 디자인은 Figma를 참고하여 구현하되, 기능 구현을 우선순위로 평가 합니다.

 **구현내용**
   1. node module 설치 후, "npm run dev" 로 로컬에서 동작 시킬 수 있습니다.
   2. 브라우저에서 http://localhost:8080/ 로 접근하여 화면을 확인 가능합니다.
   3. 프로젝트 기술 스택은 react, webpack, babel,typescript, emotion 입니다. (cli, next 사용 X)
     - 최대한 간결하게 lib 사용을 주요하게하여 별도의 store는 사용하지 않고 component 구조를 최대한 flat한 형태로 가져갔습니다.
   4. emotion은 styled 보다는 css로 구현하여 component에서 바로 dom tag를 확인 가능하게하고 style만 분리하여 처리하였습니다.
   5. 디자인상에 표현된 내용을 다 구현 되었습니다. (e.g. 중복 모달 dimmed 처리)
   6. 일정의 경우, year, month를 이용하여 nested object 형태로 관리했습니다.
      - 일정 탐색시 search에 들어가는 비용을 줄이기 위해 indexing 용도입니다.