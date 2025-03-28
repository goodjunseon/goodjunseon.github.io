---
layout: post
title: "🧠 Spring 개념 정리하기"
date: 2025-03-24 16:00:00 +0900
categories: [technote]
tags: [spring]
---

## ✅ Spring MVC 개념 정리하기 
 Spring Boot에서 ***MVC***(Model, View, Controller)패턴은 웹 애플리케이션을 구성할 때 관심사의 분리를 통해 개발과 유지보수를 용이하게 만드는 아키텍처입니다.

### 📌 주요 구성요소
- Model(모델):  
애플리케이션의 데이터와 비즈니스 로직을 담당합니다. 데이터베이스에서 가져온 정보, 사용자의 입력, 비즈니스 규칙 등을 포함합니다. 컨트롤러와 뷰 사이에서 데이터를 주고받는 역할을 합니다.

- View(뷰):  
사용자가 실제로 보게 되는 화면을 담당합니다. HTML, JSP, Thymeleaf 등 다양한 템플릿 엔진을 사용하여 동적인 웹 페이지를 렌더링 합니다.

- Controller(컨트롤러):  
사용자 요청을 처리, 모델과 뷰를 연결하는 역할을 합니다. HTTP 요청을 받아 적절한 비즈니스 로직을 수행하고, 그 결과를 모델에 담아 특정 뷰로 전달합니다. Spring에서는 @Controller 혹은 REST API를 위해 @RestController 어노테이션을 사용합니다.

### 🚀 Spring Boot와 MVC의 동작 흐름
1. 요청 처리:  
사용자가 웹 브라우저를 통해 HTTP 요청을 보내면, Spring Boot의 내장 서버(톰캣)가 요청을 받아 Spring MVC의 디스패처 서블릿(DispatcherServlet)으로 전달합니다..

2. 컨트롤러 맵핑:  
디스패처 서블릿은 요청 URL과 HTTP 메소드에 따라 적절한 컨트롤러 메서드를 찾아 호출합니다. 이때, @RequestMapping, @GetMapping, @PostMapping 등의 어노테이션을 사용하여 매핑합니다.

3. 비즈니스 로직 수행 및 모델 구성:  
컨트롤러는 필요한 경우 서비스 레이어를 호출하여 비즈니스 로직을 처리한 후, 결과 데이터를 모델 객체에 담아 뷰에 전달합니다

4. 뷰 렌더링:  
모델에 담긴 데이터를 기반으로 템플릿 엔진(예: Thymeleaf)이 HTML 등 적절한 뷰를 생성하여 사용자에게 응답합니다.


## ✅ 역할 분리를 위한 Entity와 DTO 개념
Spring boot같은 프레임워크를 사용할 때 자주 등장하는 두가지 개념, Entity와 DTO(Data Transfer Object)에 대해 자세히 알아보고자 합니다.

### 🔍 Entity란?
Entity는 주로 데이터베이스와 직접적으로 연관된 객체를 의미합니다. 데이터베이스 테이블과 맵핑되어 영속성(persistence)을 관리하는 역할을 합니다. 예를들어, JPA(Java Persistence API)를 사용하는 Spring Boot 애플리케이션에서는 @Entity 어노테이션을 붙여 해당 클래스가 데이터베이스 테이블과 맵핑 되도록 설정합니다.

### Entity의 주요 특징
- 영속성 관리: 데이터베이스에 저장, 수정, 삭제 등의 CRUD 작업을 직접적으로 담당합니다.
- 도메인 로직 포함: 간단한 비즈니스 로직이나 상태 관리 로직을 포함할 수 있습니다.
- 식별자: 각 Entity는 고유 식별자(@ID로 지정)를 갖습니다.

### 🔍DTO란?
DTO는 계층 간 데이터 전송을 위한 객체입니다. 주로 컨트롤러와 서비스, 또는 서버와 클라이언트 간에 데이터를 주고 받을 때 사용됩니다. DTO는 데이터만 담고 있으며, 복잡한 비즈니스 로직이나 영속성 관련 로직은 포함되지 않습니다.

### DTO의 주요 특징
- 데이터 전달: 필요한 데이터만 선택적으로 전달하여 불필요한 정보 노출을 방지할 수 있습니다.
- 구조 단순화: Entity와 달리 복잡한 관계를 제거하고, 필요한 필드만 포함하여 구조를 단순화합니다.
- 보안강화: 민감한 정보(예: 비밀번호, 내부 ID 등)를 제외한 데이터만 전달할 수 있습니다.

### 🤔 정리하자면
Entity는 중요한 데이터(예: 데이터베이스에 저장된 정보)를 담은 "안전한 상자"와 같아서, 직접적으로 외부에서 접근하거나 수정하면 안되는 정보를 보호합니다. 반면, DTO는 이 Entity의 데이터중 필요한 부분만 복사해 "새로운 상자"에 담아 계층 간 혹은 클라이언트와의 통신 등 외부로 전달할 때 사용하는 도구입니다.

## ✅ Attribute와 Model, Session 개념 정리하기

Spring Boot를 공부하다 보면 Attribute, Model, Session이라는 용어가 자주 등장합니다.  
특히 model.addAttribute()와 session.setAttribute()는 거의 필수적으로 사용됩니다.  
저같은 초보 개발자는 "Attribute가 뭐지?", "Model과 Session은 뭐가 다르지?" 라고 헷갈리기 쉽습니다.

이번 글에서는 이 세 가지 개념을 한 번에 쉽게 정리해보겠습니다.

### 📌 Attribute란 무엇인가?
Attribute(속성)은 (이름,값) 형태의 데이터입니다.  
쉽게말해서, **Key-Value** 형태의 데이터 저장 공간이라고 생각하면 됩니다.  
Spring에서는 이 Attribute를 다양한 Scope에 저장할 수 있습니다.

|Attribute 저장 위치|주요 메서드|범위|
|:---:|:---:|:---:|
|Request Scope|	model.addAttribute("key", value)|요청(Request)와 응답(Response) 사이|
|Session Scope|session.setAttribute("key", value)|세션 유지 기간 동안 (로그인 상태 등)|
|Application Scope |application.setAttribute("key", value)|서버가 켜져있는 동안 전체 애플리케이션|

### 📌 Model이란 무엇인가?
Model은 Attribute를 전달하는 가방과 같습니다.  
주로 Controller에서 View로 데이터를 전달할 때 사용합니다.  
즉, 화면(View)에 보여줄 데이터를 임시로 저장하는 역할을 합니다.

사용자가 요청한 화면에 보여줄 데이터가 있을 때, 게시글 목록, 회원 이름 등 화면에 필요한 데이터를 담을 때 사용합니다.

Coneroller 예시
```java
@GetMapping("/greeting")
public String greeting(Model model) {
    model.addAttribute("nickname", "준선");
    return "greeting";
}
```
nickname이라는 Attribute를 Model에 추가, View로 전달


아래는 View(Thymleaf) 예시
```html
<p>안녕하세요, [[${nickname}]]님!</p>

```

👉 화면에 "안녕하세요, 준선님!" 

### 📌 Sessoin과 Model의 창이

|구분|Model|Session|
|:---:|:---:|:---:|
|사용 목적|	View에 데이터 전달 (임시)|사용자 상태 정보 저장 (로그인 정보 등 장기)|
|유지기간|1번 요청/응답 동안 유지|브라우저 세션 종료 전까지 유지|
|데이터 접근|View 템플릿 엔진에서 사용 (${key})|모든 Controller, View에서 접근 가능 (session.getAttribute())|

### 🤔 정리하자면
>Attribute란, (이름, 값) 형태로 데이터를 저장하는 데이터 속성입니다.
Spring MVC에서는 주로 Model과 Session에 Attribute를 저장하여 데이터를 전달하거나 보관합니다.

- Model → View로 데이터 "전달"할 때 사용 (임시)
- Session → 사용자 상태 정보 "저장"할 때 사용 (지속적)

