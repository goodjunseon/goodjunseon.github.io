---
layout: post
title: "🛠️ JpaRepository 파라미터 순서가 중요한 이유 (feat. T와 ID 혼동 주의!)r"
date: 2025-03-24 01:03:00 +0900
categories: [troubleshooting]
tags: [spring]
---
## 💣 JpaRepository 타입 추론 오류: save()에서 "S is not within its bound" 에러가 발생한 이유

Spring Boot로 JPA를 사용할 때 흔히 JpaRepository<Entity, ID>를 상속받아 Repository를 만들게 됩니다.
그런데 어느 날 save() 메서드를 호출했을 뿐인데, 이런 낯선 에러 메시지를 만났습니다

## ❗ 오류 메시지
```pgsql
Inferred type 'S' for type parameter 'S' is not within its bound; should extend 'java.lang.Long'
```

## 🤔 어떤 코드에서 발생했을까?
```java
public interface MemberRepository extends JpaRepository<Long, MemberEntity> {
}
```

```java
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    public void save(MemberDTO memberDTO) {
        MemberEntity memberEntity = MemberEntity.toMemberEntity(memberDTO);
        memberRepository.save(memberEntity); // ❌ 여기서 오류 발생!
    }
}
```

## 📌 JpaRepository<T, ID> 의 의미
```java
public interface JpaRepository<T, ID> extends PagingAndSortingRepository<T, ID> { ... }
```
>- T: 관리할 엔티티 클래스 타입
>- ID: 그 엔티티의 기본 키 타입


### ✅ 올바른 예시
```java
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
}

```

### ❌ 잘못된 예시 (내가 작성한 코드)
```java
public interface MemberRepository extends JpaRepository<Long, MemberEntity> {
}
```


앞으로는 JpaRepository<엔티티 클래스, ID 타입> 순서를 꼭 기억하세요! 그럼 20000😂