---
layout: post
title: "🧠 Spring Data JPA의 save() 메서드: Insert vs Update 구분 원리"
date: 2025-03-24 16:00:00 +0900
categories: [DevLog]
tags: [Spring Boot, Spring Data JPA, JPA, Entity, save, Insert, Update, CRUD, 백엔드]
---

## ✅ 개요

Spring Data JPA에서 save() 메서드는 글 작성(INSERT)과 글 수정(UPDATE)을 모두 처리할 수 있다. 그럼 어떻게 둘을 구분할까?

핵심은 바로 엔티티의 id 값 존재 여부이다.

## 📌 동작 원리

### 1. id == null → 새로 저장 (INSERT)

- 엔티티에 id 값이 없으면 JPA는 신규 데이터로 판단함
- 따라서 insert 쿼리가 실행됨
```java
BoardEntity entity = new BoardEntity();
entity.setBoardTitle("새 글");
boardRepository.save(entity); // INSERT 발생
```
### 2. id != null → 기존 데이터 수정 (UPDATE)

- id가 존재하면 JPA는 해당 ID의 데이터를 DB에서 조회하고,
- 존재할 경우 update 쿼리 실행

```java
BoardEntity entity = boardRepository.findById(id).get();
entity.setBoardTitle("수정된 제목");
boardRepository.save(entity); // UPDATE 발생
```

## 🧠 내부 동작 (JPA 관점)

- save() → 내부적으로 EntityManager.merge() 사용

- merge는 엔티티의 id를 확인해서:

    - 없으면: 새로 persist → INSERT

    - 있으면: 기존 엔티티로 판단 → UPDATE


## 📌 요약 표
|상황|id유무|JPA판단|동작|실행 쿼리|
|:---:|:---:|:---:|:---:|:---:|
|글작성|id == null|새 엔티티|저장|INSERT|
|글수정|id != null|기존 엔티티|수정|UPDATE|

    
## ✅ 결론

- save()는 id가 있는지 여부에 따라 insert인지 update인지 자동으로 판단해준다.
- 따라서 글 작성을 할 때는 id 없이 저장하고,
- 글 수정을 할 때는 id 값을 가진 엔티티를 조회해서 수정 후 다시 저장하면 된다.

