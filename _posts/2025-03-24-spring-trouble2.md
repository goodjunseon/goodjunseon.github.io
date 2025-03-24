---
layout: post
title: "🛠 Spring Boot 게시판 프로젝트 오류 해결 기록: detail.html White Label Error"
date: 2025-03-24 01:03:00 +0900
categories: [troubleshooting]
tags: [spring]
---

## 📌 문제 상황

- 게시판 프로젝트에서 게시글을 작성한 뒤 상세 페이지(/board/{id})로 이동했을 때,
- White Label Error Page가 발생하고 아무 내용도 출력되지 않음.

## 🔍 초기에 의심했던 원인

- @PathVariable 누락 여부 → @PathVariable("id")까지 명시적으로 지정함.

- DTO → Entity 매핑 문제 → id = null 이었으나, 이는 새 글 작성 시 자연스러운 현상.

- Hibernate 설정, Gradle 컴파일 옵션 확인 → -parameters 옵션도 정상적.

## ✅ 실제 원인
Model에 존재하지 않는 데이터를 detail.html에서 요청하고 있었음!

### 🔥 detail.html (문제 있었던 코드 예시)
```javascript
<tr th:if="${board.fileAttached == 1}">
  <td><img th:src="@{|/upload/${board.storedFileName}|}" alt=""></td>
</tr>

<tr th:each="comment : ${commentList}">
  <td th:text="${comment.commentContents}"></td>
</tr>
```

### ⚠ 문제점
- board.fileAttached, board.storedFileName, commentList는
BoardController의 Model에 포함되지 않았음

- 따라서 타임리프가 렌더링 중 해당 데이터를 찾지 못하고 예외 발생


### 💡 해결 방법
✅ 불필요한 속성 제거 or 조건 분기 추가
```javascript
<!-- 수정된 detail.html -->
<tr>
  <th>id</th>
  <td th:text="${board.id}"></td>
</tr>
<tr>
  <th>title</th>
  <td th:text="${board.boardTitle}"></td>
</tr>
<tr>
  <th>contents</th>
  <td th:text="${board.boardContents}"></td>
</tr>
<!-- commentList 등은 controller에서 model로 넘겨줄 때만 사용 -->
```

## 🧠 깨달은 점

- 타임리프는 model에 없는 속성을 요청하면 렌더링 중 에러가 발생

- 단순히 "없는 값이니까 무시하겠지"가 아니라, 런타임 에러가 난다

- 특히 Spring Boot 3.x + Thymeleaf 조합에서는 더 민감하게 동작

## 📘 마무리

이번 오류 해결 경험을 통해 템플릿에 넘기는 데이터와 뷰에서 사용하는 속성의 일치 여부가 매우 중요하다는 것을 배웠다.

단순히 controller나 service 문제만을 의심하기전에, 타임리프 템플릿 자체의 조건문과 model 구조도 확인해 보아야한다는 것을 깨달았다.