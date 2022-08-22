# wanted_pre_onboarding <br>
* <B>사용기술</B>: nodeJS, express, mySQL, typeORM, swagger <br>
* <B>api-docs</B> : url/api-docs, https://drive.google.com/file/d/1_Lg0Zqro83xw4Jei04GlVutWHB0Lpxli/view?usp=sharing <br>
* <B>schema</B> : <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![ㅅㅋㅁ](https://user-images.githubusercontent.com/81277145/185779461-e46c1941-6ed1-4ca7-9fc0-72450b2c66d5.png) <br><br>

## 1. 채용공고 등록 <br>
post요청을 통해 requestBody의 회사명, 채용포지션, 채용상세, 사용기술을 입력받은 뒤 typeORM의 save 메소드를 통해 채용공고 레코드를 생성하게 됩니다.
채용공고(recruit) 테이블은 회사정보(company) 테이블과 ManyToOne 매핑 되어있으므로, 입력받은 회사명을 가진 레코드를 찾아내어 저장하는 방식으로 동작합니다. <br><br>
## 2. 채용공고 수정 <br>
수정할 채용공고의 id와 변경할 값을 입력받은 뒤 해당 채용공고에 변경 값을 덮어씌우는 방식으로 구현하였습니다. <br><br>
## 3. 채용공고 삭제 <br>
삭제할 채용공고의 id를 입력 받아 delete메소드를 통해 hardDelete시키는 방식으로 구현하였습니다. <br><br>
## 4-1. 채용공고 조회 <br>
find메소드를 이용해 recruit 테이블 안의 모든 레코드를 가져온 뒤 Array.map을 통해 채용상세(description)만을 제외시킨 후 클라이언트 측에 반환합니다. 
## 4-2. 채용공고 검색 <br>
Path parameter를 통해 검색어(keyword)를 입력 받아, queryBuilder로 like연산자를 사용해 검색어를 포함하고 있는 레코드들을 찾고 반환합니다. <br><br>
## 5. 채용상세 조회 <br>
Path parameter를 통해 채용공고id를 입력 받아 해당 채용공고를 올린 회사의 정보를 즉시 참조하여 해당 회사가 올린 모든 채용공고 중 클라이언트가 입력한 채용공고만을 제외한 배열을 value로 가지는 '회사가올린다른채용공고' key를 추가한 채용공고의 모든 column값을 반환합니다. <br><br>
## 6. 채용공고 지원 <br>
지원할 채용공고의 id와 지원자의 id를 입력 받습니다. 먼저 채용공고 테이블에 해당 채용공고가 존재하는지 확인한 뒤, 지원내역(apply) 테이블에서 해당 '채용공고'와 입력받은 '지원자id'를 동시에 가지고있는 데이터를 찾아 'prev' 상수에 저장합니다. 'prev'이 undefined 또는 null이 아니라면 '이미 지원한 공고'라는 메세지와 함께 return 되며 'prev'이 unedfined 또는 null 이었다면 지원내역 테이블에 새로 저장합니다. <br><br>
