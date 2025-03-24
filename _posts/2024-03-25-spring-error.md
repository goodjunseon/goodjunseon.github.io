---
layout: post
title: " 🛠Spring Boot @PathVariable 명시 누락 이슈"
date: 2025-03-25 14:18:00 +0900
categories: [TroubleShooting]
tags: [Spring Boot, Spring MVC, PathVariable, Thymeleaf, 트러블슈팅, 오류 해결]
---


## ✅ 개요
Spring Boot 3.0 이상에서 @PathVariable 사용 시, 파라미터 이름을 명시하지 않으면 아래와 같은 오류가 발생할 수 있다.  
이는 이전 버전에서는 발생하지 않았던 문제로, 강의에서 설명하지 않는 경우도 많다.


## 💥 발생한 문제 
### 🔍 컨트롤러 코드

```java
@GetMapping("/{id}")
public String findById(@PathVariable Long id, Model model) {
    ...
}
```

### ❗ 에러 로그

```bash
java.lang.IllegalArgumentException: 
Name for argument of type [java.lang.Long] not specified, 
and parameter name information not available via reflection.
Ensure that the compiler uses the '-parameters' flag.
```

## 🔍 원인 분석

- Spring Boot 3.x + Java 17 이상 환경에서는
@PathVariable에 명시적으로 변수 이름을 지정하지 않으면
리플렉션으로 파라미터 이름을 추론하지 못할 수 있다.

- 강의에서 사용하는 구버전(예: Spring Boot 2.x)은 컴파일러 설정 없이도 파라미터 이름을 추론할 수 있었지만,
최신 버전은 안전한 명시적 바인딩을 권장한다.

## 🛠️ 해결 방법

### ✅ 수정 전 (에러 발생 가능)
```java
@GetMapping("/{id}")
public String findById(@PathVariable Long id, Model model) {
    ...
}
```

### ✅ 수정 후 (에러 해결)
```java
@GetMapping("/{id}")
public String findById(@PathVariable("id") Long id, Model model) {
    ...
}
```

또는 빌드 시 -parameters 플래그를 적용하는 방법도 존재하지만,
환경/IDE에 따라 작동하지 않을 수 있어, 명시적 표기를 우선 추천한다.


## 💡 참고 사항

- @RequestParam도 동일하게 적용된다.

- 특히 최신 Spring Boot는 리플렉션 기반 파라미터 추론에 매우 엄격하므로, 항상 @PathVariable("id")처럼 명시적으로 이름을 지정하는 것이 좋다.

- IntelliJ의 내부 빌드 설정은 Gradle의 -parameters 설정을 반영하지 않을 수도 있다.

--- 

## 💡 깨달은점
>  문제 해결을 통해 Spring Boot 최신 버전에서는 작은 디테일이 중요한 이슈로 연결될 수 있음을 확인할 수 있었다.단순히 강의를 따라 하기보다는, 버전 차이로 인한 호환성 문제를 적극적으로 파악하고 해결하는 것이 중요하다.
