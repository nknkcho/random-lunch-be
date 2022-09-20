# Random Lunch (BE)

랜덤 런치의 백엔드 개발 코드입니다.

> ## 목차

- [데모](#데모)
- [API](#API)
- [폴더 구조](#폴더-구조)
- [파일별 역할](#파일별-역할)
- [구현 방법](#구현-방법)
- [기술 스택](#기술-스택)

> ## 데모

[🌎 데모 링크](https://random-lunch-nttjxsjdw-nknkcho.vercel.app/)

> ## API
https://backend.randomlunch.site

> ## 폴더 구조

```
├─app.js
├─routers
├─models
├─controllers
├─config
└─constants
```

> ## 파일별 역할

**routers**
| 함수 | 역할 |
|---------------------|-----------------------------------|
| `members.js` | 요청에 따른 컨트롤러를 연결해주는 라우터 |

**models**
| 함수 | 역할 |
|---------------------|-----------------------------------|
| `members.js` | DB로부터 데이터를 가져오는 모델 함수 |

**controllers**
| 함수 | 역할 |
|---------------------|-----------------------------------|
| `members.js` | 멤버를 생성, 삭제 및 그룹 조회의 로직을 담은 컨트롤러 |

**config**
| 함수 | 역할 |
|---------------------|-----------------------------------|
| `db.js` | 환경 변수를 통해 받은 사용자 및 DB 정보를 통해 mysql과 연결하는 함수 |
| `env.js` | 환경 변수를 사용할 수 있도록 하는 함수 |

**constants**
| 함수 | 역할 |
|---------------------|-----------------------------------|
| `statusCodes` | 자주 쓰는 상태 코드를 상수화 |

> ## 구현 방법

### 현재 멤버의 리스트 조회

- 쿼리로 받은 `groups`,`groupSize`가 존재하지 않을 때 전체 멤버의 데이터를 리턴합니다.
- GET 요청 api : `backend.randomlunch.site/members?groups=&groupSize=`

### 신규 멤버 추가

- 요청 body로 받은 멤버의 이름이 없거나 기존 데이터와 중복된 결과가 있을 경우 멤버를 생성하지 않습니다.
- 최소한의 sql injection 문제를 방지하기 위해 특수문자를 거르는 함수를 사용하였습니다.
- 성공적으로 생성되었을 경우 생성된 멤버의 이름과 id를 함께 리턴합니다.
- POST 요청 api : `backend.randomlunch.site/members`

### 멤버 삭제

- 삭제할 멤버의 이름을 파라미터로 받습니다.
- DELETE 요청 api : `backend.randomlunch.site/members/:name`

### 그룹 생성

- 쿼리로 받은 `groups`,`groupSize`의 곱이 전체 멤버 수보다 크거나 둘 중에 하나라도 0일 경우 그룹을 생성하지 않습니다.
- DB로부터 전체 리스트를 받아온 후, `shuffle` 함수를 통해 멤버를 무작위로 섞어준 뒤(`shuffledMemberList`) 그룹 생성 로직을 실행하였습니다.
- 전체 멤버를 요청한 그룹수로 나누었을 때, 그 몫은 그룹안에 들어가야 할 사람의 숫자를 나타냅니다. 몫의 크기만큼 반복문을 실행하여 그룹을 구분하였습니다.

```JavaScript
let memberListResult = [];
...
for (let i = 0; i < groups; i++) {
      memberListResult[i] = [];
      for (let j = 0; j < numberOfMembersInOneGroup; j++) {
        memberListResult[i].push(shuffledMemberList[0]);
        shuffledMemberList.shift();
      }
    }
```

- 전체 멤버를 요청한 그룹수로 나누었을 때의 나머지는 기생성된 그룹에 한 명씩 순차적으로 들어가도록 구현 하였습니다.

```JavaScript
shuffledMemberList.forEach((item, index) => {
      memberListResult[index].push(item);
    });
```
- GET 요청 api : `backend.randomlunch.site/members?groups=4&groupSize=3`

> ## 기술 스택

- Node.js
- Express
- Mysql
- 배포: lightsail