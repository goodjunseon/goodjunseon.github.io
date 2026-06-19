import { useState, useEffect } from "react";
import type { ReactNode, CSSProperties } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  Terminal,
  Briefcase,
  GraduationCap,
  BookOpen,
  Users,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import profileImg from "../assets/profile.webp";

const NAVY = "#012169";
const ORANGE = "#EA733D";
const PURPLE = "#7F35B2";
const TIFFANY = "#2AD2C9";

const NAV_LINKS = ["About", "Stack", "Projects", "Experience", "Contact"];

const STACK_CATS = ["Backend", "Database", "DevOps / Infra", "Collaboration"];

const TECH_STACK = [
  { name: "Java", cat: "Backend" },
  { name: "Spring Boot", cat: "Backend" },
  { name: "Spring Security", cat: "Backend" },
  { name: "JPA", cat: "Backend" },
  { name: "MySQL", cat: "Database" },
  { name: "Redis", cat: "Database" },
  { name: "AWS (EC2 / S3 / CloudFront / RDS)", cat: "DevOps / Infra" },
  { name: "Docker", cat: "DevOps / Infra" },
  { name: "GitHub Actions", cat: "DevOps / Infra" },
  { name: "Notion", cat: "Collaboration" },
  { name: "Swagger", cat: "Collaboration" },
];

const CAT_COLOR: Record<string, string> = {
  Backend: PURPLE,
  Database: TIFFANY,
  "DevOps / Infra": "#4f7cff",
  Collaboration: ORANGE,
};

const PROJECTS = [
  {
    title: "SURF",
    tagline: "TAVE Makers 동아리 커뮤니티 서비스",
    highlights: [
      "카카오 로그인을 Controller→Usecase→Service→ApiClient 계층으로 리팩토링",
      "멀티 OAuth 공통 추상화 위에 애플 로그인(Web/App) 신규 구현",
      "identityToken RS256 검증 · ES256 client_secret 서명 · form_post CSRF 대응 직접 구현",
      "RefreshToken Rotation 원자성을 Lua CAS로 강화",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "Redis", "OAuth / OIDC"],
    accent: ORANGE,
    year: "2026",
    team: "팀 11 · BE 4",
    note: "인증 도메인 단독 약 70 커밋 · 2,100+ 라인 · 애플 로그인 신규 구현",
  },
  {
    title: "ONECO",
    tagline: "부모·자녀 페어링 기반 경제/금융 키워드 교육 서비스",
    highlights: [
      "CloudFront 도입으로 이미지 응답 843ms → 298ms (약 2.8배) 개선",
      "DDD · 클린 아키텍처로 도메인 책임 분리",
      "Codex 활용 PR 문서 자동화 파이프라인 구축",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "AWS", "Docker"],
    accent: PURPLE,
    year: "2025",
    team: "팀 6 · BE 2",
    note: "TAVE 16기 후반기 연합 프로젝트 · 우수상 / 인기상",
  },
  {
    title: "PASSTIVAL",
    tagline: "안양대학교 축제 올인원 서비스",
    highlights: [
      "Nginx 로드밸런서로 Spring 서버 2대 이중화 — ALB 대비 비용 절감하며 가용성 확보",
      "GitHub Actions + AWS OIDC + SSM 기반 무(無)SSH 롤링 배포 파이프라인 구축",
      "축제 3일간 방문자 10,005 · PV 102,226 · 만족도 4.8/5.0(74명)",
      "Feign + Webhook 기반 Discord 에러 알림 시스템 구현",
    ],
    tags: ["Java", "Spring Boot", "MySQL", "Redis", "Nginx", "AWS", "Docker"],
    accent: TIFFANY,
    year: "2025",
    team: "팀 12 · BE 3 (리드)",
    note: "교내 신문 기재 · 총학생회 서버 호스팅 비용 지원",
  },
];

const TIMELINE = [
  {
    role: "PQC Developer Intern",
    org: "KQC · 한국퀀텀컴퓨팅 (Korea Quantum Computing)",
    period: "2026.06 — 현재",
    type: "work",
    points: [
      "양자내성암호(PQC, Post-Quantum Cryptography) 분야 개발 인턴십 진행 중",
    ],
  },
  {
    role: "Backend Developer",
    org: "TAVE Makers 2기",
    period: "2026.03 — 진행중",
    type: "club",
    points: [
      "SURF 플랫폼 인증(auth) 도메인 설계·구현",
      "카카오 로그인 리팩토링 및 애플 로그인(Web/App) 신규 도입",
    ],
  },
  {
    role: "안양대학교 회장 · 5개 지부 지부장",
    org: "UMC · 대학생 개발 연합 동아리 10기",
    period: "2026.02 — 2026.08",
    type: "club",
    points: [
      "안양대학교 회장 및 5개 연합 지부 지부장으로 동아리 운영·프로젝트 기획 전반 담당",
      "기획·디자인·개발 약 120명 규모의 스터디·프로젝트 프로그램 운영",
    ],
  },
  {
    role: "교내 근로 · 관재과",
    org: "안양대학교 (Anyang University)",
    period: "2024.09 — 2026.06",
    type: "work",
    points: ["재물조사 및 사무 보조 업무 수행"],
  },
  {
    role: "아르바이트 · 바리스타",
    org: "이디야커피 (Ediya)",
    period: "2024.02 — 2024.09",
    type: "work",
    points: ["음료 제조 및 고객 응대, 매장 관리 업무 수행"],
  },
  {
    role: "1사단 12여단 통신중대 체계관리병 병장 만기전역",
    org: "대한민국 육군 (Republic of Korea Army)",
    period: "2022.08 — 2024.02",
    type: "work",
    points: [
      "육군정보통신학교(C4I운용병) 수료",
      "인사·군수·통신 장비 관리 및 운용 업무 수행",
    ],
  },
  {
    role: "아르바이트 · 메이트",
    org: "롯데리아 (Lotteria)",
    period: "2021.01 — 2022.08",
    type: "work",
    points: ["주문·조리 및 고객 응대 등 매장 운영 업무 수행"],
  },
  {
    role: "Backend Developer",
    org: "대학생 IT 연합 동아리 TAVE 16기",
    period: "2025.09 — 2026.01",
    type: "club",
    points: [
      "후반기 연합 프로젝트 ONECO 백엔드 개발 (우수상·인기상)",
      "전반기 자바 심화 스터디(멀티스레드와 동시성) 대상 수상",
    ],
  },
  {
    role: "Backend Developer Lead",
    org: "Passtival · 안양대 축제 서비스",
    period: "2025.08 — 2025.09",
    type: "club",
    points: [
      "백엔드 리드로 프로젝트 기획·전체 설계 및 컨벤션/문서화 주도",
      "총학생회와 기능 우선순위·운영 방식을 조율하며 협업 구조 수립",
    ],
  },
  {
    role: "Backend Developer / Organizer",
    org: "카카오 X 구름톤 유니브 4기",
    period: "2025.03 — 2025.09",
    type: "club",
    points: [
      "Backend 파트 활동 및 운영진으로 커뮤니티 운영 참여",
      "해커톤(9ITHON) 1회 참여",
    ],
  },
  {
    role: "Organizing Committee",
    org: "Hult Prize On Campus · 창업 경진대회",
    period: "2024.09 — 2025.02",
    type: "club",
    points: ["창업 경진대회 운영진 활동"],
  },
  {
    role: "컴퓨터공학 전공",
    org: "안양대학교 (2027.03 졸업예정)",
    period: "2021.03 — 현재",
    type: "edu",
    points: [
      "학점 4.13 / 4.5, 112학점 이수",
      "성적 우수 장학금 3회 (1-1 수석 · 2-2 기업 장학 수석 · 3-1)",
      "총장상 — Hult Prize On Campus 우수 운영상 (2025)",
      "Student Advisor — 자율전공학부 대상 컴퓨터공학과 대표 멘토 (2025.03–2025.11)",
    ],
  },
  {
    role: "졸업",
    org: "우신중학교 · 우신고등학교",
    period: "2014.03 — 2019.12",
    type: "edu",
    points: ["댄스 동아리 'YK' (2015) 활동", "축구 동아리 (2014–2018) 활동"],
  },
];

const EXPERIENCE_SECTIONS = [
  { title: "Work", subtitle: "인턴 · 근로", types: ["work"] },
  { title: "동아리 · 대외활동", subtitle: "Club & Community", types: ["club"] },
  {
    title: "교육 · 학습",
    subtitle: "Education & Study",
    types: ["edu", "study"],
  },
];

function TistoryIcon({ size = 18 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-md font-bold shrink-0"
      style={{
        width: size,
        height: size,
        background: ORANGE,
        color: "#fff",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: Math.round(size * 0.62),
        lineHeight: 1,
      }}
    >
      T
    </span>
  );
}

function timelineStyle(type: string): {
  color: string;
  icon: ReactNode;
  label: string;
} {
  if (type === "edu")
    return {
      color: TIFFANY,
      icon: <GraduationCap size={17} color="#fff" />,
      label: "Education",
    };
  if (type === "study")
    return {
      color: ORANGE,
      icon: <BookOpen size={17} color="#fff" />,
      label: "Study",
    };
  if (type === "club")
    return {
      color: "#4f7cff",
      icon: <Users size={17} color="#fff" />,
      label: "동아리 · 대외활동",
    };
  return {
    color: PURPLE,
    icon: <Briefcase size={17} color="#fff" />,
    label: "Work",
  };
}

function TimelineItem({ item }: { item: (typeof TIMELINE)[number] }) {
  const { color, icon } = timelineStyle(item.type);
  return (
    <div className="flex gap-7 relative">
      {/* Dot */}
      <div
        className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center z-10"
        style={{
          background: color,
          boxShadow: `0 0 0 4px #f0f4ff`,
          marginTop: 4,
        }}
      >
        {icon}
      </div>

      {/* Card */}
      <div
        className="flex-1 rounded-2xl p-6"
        style={{
          background: "#fff",
          border: "1.5px solid rgba(1,33,105,0.07)",
          boxShadow: "0 2px 16px rgba(1,33,105,0.05)",
        }}
      >
        <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
          <div>
            <div
              className="font-bold"
              style={{
                fontFamily: "'Pretendard Variable', Pretendard, sans-serif",
                fontSize: "19px",
                color: NAVY,
                lineHeight: 1.25,
              }}
            >
              {item.org}
            </div>
            <div className="text-sm font-semibold mt-1" style={{ color }}>
              {item.role}
            </div>
          </div>
          <Mono style={{ fontSize: "11px", color: "rgba(1,33,105,0.38)" }}>
            {item.period}
          </Mono>
        </div>

        <ul className="flex flex-col gap-2">
          {item.points.map((pt) => (
            <li
              key={pt}
              className="flex items-start gap-2 text-sm"
              style={{ color: "#4a5a7a" }}
            >
              <ChevronRight
                size={14}
                className="mt-0.5 shrink-0"
                style={{ color }}
              />
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Mono({
  children,
  style = {},
}: {
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", ...style }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Mono
      style={{
        fontSize: "12px",
        fontWeight: 600,
        color: ORANGE,
        display: "block",
        marginBottom: "12px",
      }}
    >
      {children}
    </Mono>
  );
}

function CodeEditorMockup() {
  const line = (indent: number, content: ReactNode) => (
    <div style={{ paddingLeft: indent * 16 }}>{content}</div>
  );
  const kw = (t: string) => <span style={{ color: "#ff7b72" }}>{t}</span>;
  const ann = (t: string) => <span style={{ color: TIFFANY }}>{t}</span>;
  const cls = (t: string) => <span style={{ color: "#79c0ff" }}>{t}</span>;
  const fn = (t: string) => <span style={{ color: "#d2a8ff" }}>{t}</span>;
  const dim = (t: string) => <span style={{ color: "#8b949e" }}>{t}</span>;
  const txt = (t: string) => <span style={{ color: "#e6edf3" }}>{t}</span>;

  return (
    <div className="relative select-none">
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "#0d1117",
          border: `1px solid rgba(127, 53, 178, 0.4)`,
          boxShadow: `0 0 80px rgba(127, 53, 178, 0.12), 0 24px 64px rgba(0, 0, 0, 0.55)`,
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: "#161b22",
            borderBottom: "1px solid rgba(127,53,178,0.25)",
          }}
        >
          <div className="flex items-center gap-1.5">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#ff5f57" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#febc2e" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: "#28c840" }}
            />
          </div>
          <Mono style={{ fontSize: "11px", color: "#8b949e" }}>
            MissionService.java
          </Mono>
          <div style={{ width: 56 }} />
        </div>

        {/* Code area */}
        <div className="flex gap-4 p-5" style={{ background: "#0d1117" }}>
          {/* Line numbers */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              lineHeight: "1.75",
              color: "#3d444d",
              textAlign: "right",
              userSelect: "none",
              minWidth: 20,
            }}
          >
            {Array.from({ length: 14 }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code */}
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              lineHeight: "1.75",
              flex: 1,
            }}
          >
            {line(0, <>{ann("@Service")}</>)}
            {line(0, <>{ann("@RequiredArgsConstructor")}</>)}
            {line(
              0,
              <>
                {kw("public class ")}
                {cls("MissionService")}
                {txt(" {")}
              </>,
            )}
            {line(0, <>&nbsp;</>)}
            {line(
              1,
              <>
                {kw("private final ")}
                {cls("MissionRepository ")}
                {txt("missionRepository;")}
              </>,
            )}
            {line(0, <>&nbsp;</>)}
            {line(1, <>{ann("@Transactional")}</>)}
            {line(
              1,
              <>
                {kw("public ")}
                {cls("Mission ")}
                {fn("complete")}
                {txt("(")}
                {cls("Long")}
                {txt(" missionId) {")}
              </>,
            )}
            {line(
              2,
              <>
                {cls("Mission")}
                {txt(" mission = missionRepository")}
              </>,
            )}
            {line(
              3,
              <>
                {txt(".")}
                {fn("findById")}
                {txt("(missionId)")}
              </>,
            )}
            {line(
              3,
              <>
                {txt(".")}
                {fn("orElseThrow")}
                {txt("();")}
              </>,
            )}
            {line(
              2,
              <>
                {txt("mission.")}
                {fn("complete")}
                {txt("();")}
              </>,
            )}
            {line(
              2,
              <>
                {kw("return ")}
                {txt("mission;")}
              </>,
            )}
            {line(
              1,
              <>
                {txt("}")}
                {dim("  // ...")}
                {txt("  }")}
              </>,
            )}
          </div>
        </div>
      </div>

      {/* Terminal card */}
      <div
        className="mt-3 rounded-xl p-4"
        style={{
          background: "#0d1117",
          border: `1px solid rgba(42, 210, 201, 0.3)`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <Terminal size={12} style={{ color: TIFFANY }} />
          <Mono style={{ fontSize: "11px", color: TIFFANY }}>terminal</Mono>
        </div>
        <Mono style={{ fontSize: "11px", lineHeight: "1.8", display: "block" }}>
          <span style={{ color: "#3fb950" }}>~/projects/oneco</span>
          <span style={{ color: "#8b949e" }}> $ </span>
          <span style={{ color: "#e6edf3" }}>./gradlew bootRun</span>
          <br />
          <span style={{ color: "#3fb950" }}>✓ </span>
          <span style={{ color: "#8b949e" }}>
            Started OnecoApplication in 2.31s
          </span>
          <br />
          <span style={{ color: TIFFANY }}>◆ </span>
          <span style={{ color: "#8b949e" }}>Listening on </span>
          <span style={{ color: "#e6edf3" }}>http://localhost:8080</span>
        </Mono>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: "'Pretendard Variable', Pretendard, sans-serif",
        color: NAVY,
        background: "#f8f9fc",
      }}
    >
      {/* ── HEADER ───────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? NAVY : "transparent",
          boxShadow: scrolled ? "0 2px 32px rgba(1,33,105,0.28)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: ORANGE }}
            >
              <Mono
                style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}
              >
                박
              </Mono>
            </div>
            <span
              className="font-semibold text-white"
              style={{
                fontFamily: "'Pretendard Variable', Pretendard, sans-serif",
                fontSize: "17px",
              }}
            >
              박준선
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l}
                onClick={() => scrollTo(l.toLowerCase())}
                className="text-sm font-medium transition-colors duration-200 cursor-pointer"
                style={{ color: "rgba(255,255,255,0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 cursor-pointer"
              style={{ background: ORANGE }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              연락하기
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden"
            style={{
              background: NAVY,
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <button
                  key={l}
                  onClick={() => scrollTo(l.toLowerCase())}
                  className="text-left text-sm font-medium cursor-pointer"
                  style={{ color: "rgba(255,255,255,0.78)" }}
                >
                  {l}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-white text-center cursor-pointer"
                style={{ background: ORANGE }}
              >
                연락하기
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ─────────────────────────────────────── */}
      <section
        id="hero"
        className="min-h-screen flex items-center"
        style={{
          background: `linear-gradient(140deg, #010d3a 0%, #012169 45%, #021e8c 100%)`,
        }}
      >
        {/* Subtle radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 70% 50%, rgba(127,53,178,0.08) 0%, transparent 70%)`,
          }}
        />
        <div className="max-w-6xl mx-auto px-6 pt-28 pb-20 w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              {/* Status badge */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium mb-8"
                style={{
                  background: "rgba(42,210,201,0.1)",
                  border: `1px solid rgba(42,210,201,0.28)`,
                  color: TIFFANY,
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: TIFFANY,
                    animation: "pulse 2s ease-in-out infinite",
                  }}
                />
                <Mono style={{ fontSize: "12px" }}>
                  새로운 기회를 찾고 있어요
                </Mono>
              </div>

              <h1
                className="font-bold leading-tight text-white mb-6"
                style={{
                  fontFamily: "'Pretendard Variable', Pretendard, sans-serif",
                  fontSize: "clamp(1.5rem, 4.2vw, 3.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                기본기와 태도를 무기로, <br />
                <span style={{ color: ORANGE }}>성장하는 개발자.</span>
              </h1>

              <p
                className="text-lg mb-10 leading-relaxed"
                style={{ color: "rgba(255,255,255,0.6)", maxWidth: "480px" }}
              >
                1년간 매주 스터디를 운영·참여하며 배운 내용을 기록하고
                프로젝트에 적용해온 백엔드 개발자입니다.
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <button
                  onClick={() => scrollTo("projects")}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 cursor-pointer"
                  style={{ background: ORANGE, fontSize: "15px" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = `0 10px 28px rgba(234,115,61,0.42)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  Projects <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    color: "rgba(255,255,255,0.88)",
                    fontSize: "15px",
                    background: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.6)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.25)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Contact
                </button>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap gap-10">
                {[
                  { value: "4.13/4.5", label: "학점 (GPA)" },
                  { value: "2.8x", label: "이미지 응답 개선" },
                  { value: "10k+", label: "축제 서비스 방문자" },
                ].map((s) => (
                  <div key={s.label}>
                    <div
                      className="font-bold text-white"
                      style={{
                        fontFamily:
                          "'Pretendard Variable', Pretendard, sans-serif",
                        fontSize: "28px",
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: code editor */}
            <div className="hidden lg:block">
              <CodeEditorMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────── */}
      <section id="about" className="py-28" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: visual card */}
            <div className="relative">
              <div
                className="rounded-3xl p-8 relative overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, #010e3a 0%, #012169 60%, #021d8a 100%)`,
                  minHeight: 380,
                }}
              >
                {/* Decorative blobs */}
                <div
                  className="absolute top-0 right-0 w-56 h-56 rounded-full opacity-[0.08]"
                  style={{
                    background: TIFFANY,
                    transform: "translate(30%, -30%)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-[0.08]"
                  style={{
                    background: PURPLE,
                    transform: "translate(-25%, 25%)",
                  }}
                />
                {/* Avatar */}
                <div className="relative z-10 flex flex-col items-center justify-center py-8">
                  <div
                    className="w-44 h-44 rounded-2xl overflow-hidden mb-5"
                    style={{
                      border: `2px solid rgba(42,210,201,0.35)`,
                      boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
                    }}
                  >
                    <img
                      src={profileImg}
                      alt="박준선 프로필 사진"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center mb-8">
                    <div
                      className="font-bold text-white text-xl"
                      style={{
                        fontFamily:
                          "'Pretendard Variable', Pretendard, sans-serif",
                      }}
                    >
                      박준선
                    </div>
                    <div className="text-sm mt-1" style={{ color: TIFFANY }}>
                      Backend Engineer
                    </div>
                  </div>
                  {/* Mini skill tags */}
                  <div className="grid grid-cols-3 gap-3 w-full">
                    {[
                      { v: "Java", l: "주력 언어" },
                      { v: "Spring", l: "백엔드" },
                      { v: "AWS", l: "인프라" },
                    ].map((i) => (
                      <div
                        key={i.v}
                        className="text-center p-3 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.07)" }}
                      >
                        <div className="font-semibold text-sm text-white">
                          {i.v}
                        </div>
                        <div
                          className="text-xs mt-0.5"
                          style={{ color: "rgba(255,255,255,0.38)" }}
                        >
                          {i.l}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: copy */}
            <div>
              <SectionLabel>// about me</SectionLabel>
              <h2
                className="font-bold mb-6"
                style={{
                  fontFamily: "'Pretendard Variable', Pretendard, sans-serif",
                  fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)",
                  color: NAVY,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                기본기와 태도를 무기로,
                <br /> 성장하는 개발자.
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "#4a5a7a" }}
              >
                Java와 Spring 기반의 백엔드 개발자입니다. 도메인을 중심으로
                책임을 분리하고, 정책과 규칙이 흩어지지 않도록 DDD·클린
                아키텍처를 적용해 변경과 확장에 유연한 구조를 지향합니다.
              </p>
              <p
                className="text-base leading-relaxed mb-9"
                style={{ color: "#4a5a7a" }}
              >
                ‘체감'이 아닌 측정으로 개선을 증명하는 것을 중요하게 생각합니다.
                CloudFront 전환으로 이미지 응답을 약 2.8배 개선한 과정을 측정
                기준·비교 조건과 함께 문서화해 팀과 공유했습니다.
              </p>
              <div className="flex flex-col gap-3.5">
                {[
                  "1년간 매주 스터디를 운영·참여하며 학습 내용을 기록하고 프로젝트에 적용",
                  "DDD·클린 아키텍처 기반의 도메인 설계",
                  "Chrome DevTools 측정 기반의 성능 개선 (CloudFront 2.8배)",
                  "요구사항을 기준으로 트레이드오프를 검토하고 조기 최적화를 경계",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0"
                      style={{ color: TIFFANY }}
                    />
                    <span className="text-sm" style={{ color: "#4a5a7a" }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────── */}
      <section id="stack" className="py-28" style={{ background: "#f0f4ff" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>// tech stack</SectionLabel>
            <h2
              className="font-bold"
              style={{
                fontFamily: "'Pretendard Variable', Pretendard, sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                color: NAVY,
                letterSpacing: "-0.02em",
              }}
            >
              주로 사용하는 기술
            </h2>
          </div>

          {STACK_CATS.map((cat) => {
            const items = TECH_STACK.filter((t) => t.cat === cat);
            if (!items.length) return null;
            const color = CAT_COLOR[cat] || PURPLE;
            return (
              <div key={cat} className="mb-8">
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="h-px flex-1"
                    style={{ background: "rgba(1,33,105,0.1)" }}
                  />
                  <Mono
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color,
                    }}
                  >
                    {cat}
                  </Mono>
                  <div
                    className="h-px flex-1"
                    style={{ background: "rgba(1,33,105,0.1)" }}
                  />
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {items.map((tech) => (
                    <div
                      key={tech.name}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-default"
                      style={{
                        background: "#fff",
                        border: `1.5px solid ${color}28`,
                        color: NAVY,
                        boxShadow: "0 2px 8px rgba(1,33,105,0.05)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = color;
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = `0 8px 24px ${color}22`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = `${color}28`;
                        e.currentTarget.style.transform = "";
                        e.currentTarget.style.boxShadow =
                          "0 2px 8px rgba(1,33,105,0.05)";
                      }}
                    >
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────── */}
      <section id="projects" className="py-28" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>// featured projects</SectionLabel>
            <h2
              className="font-bold"
              style={{
                fontFamily: "'Pretendard Variable', Pretendard, sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                color: NAVY,
                letterSpacing: "-0.02em",
              }}
            >
              만든 프로젝트
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl p-7 transition-all duration-300 cursor-default"
                style={{
                  background: "#fff",
                  border: "1.5px solid rgba(1,33,105,0.08)",
                  boxShadow: "0 2px 16px rgba(1,33,105,0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 16px 48px rgba(1,33,105,0.12)`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = `${p.accent}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 16px rgba(1,33,105,0.05)";
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.borderColor = "rgba(1,33,105,0.08)";
                }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="h-1 w-14 rounded-full"
                    style={{ background: p.accent }}
                  />
                  <div className="flex items-center gap-2.5">
                    <span
                      className="inline-flex items-center gap-1 rounded-md px-2 py-0.5"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: p.accent,
                        background: `${p.accent}14`,
                        border: `1px solid ${p.accent}33`,
                      }}
                    >
                      <Users size={11} />
                      {p.team}
                    </span>
                    <Mono
                      style={{ fontSize: "11px", color: "rgba(1,33,105,0.3)" }}
                    >
                      {p.year}
                    </Mono>
                  </div>
                </div>

                <h3
                  className="font-bold mb-1.5"
                  style={{
                    fontFamily: "'Pretendard Variable', Pretendard, sans-serif",
                    fontSize: "21px",
                    color: NAVY,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-sm font-semibold mb-3.5"
                  style={{ color: p.accent }}
                >
                  {p.tagline}
                </p>
                <ul className="flex flex-col gap-2 mb-4">
                  {p.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm leading-relaxed"
                      style={{ color: "#4a5a7a" }}
                    >
                      <ChevronRight
                        size={15}
                        className="mt-0.5 shrink-0"
                        style={{ color: p.accent }}
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Highlight note */}
                <div
                  className="text-xs font-medium mb-6 px-3 py-2 rounded-lg"
                  style={{ background: `${p.accent}11`, color: p.accent }}
                >
                  {p.note}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                      style={{
                        background: `${p.accent}11`,
                        color: p.accent,
                        border: `1px solid ${p.accent}28`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────── */}
      <section
        id="experience"
        className="py-28"
        style={{ background: "#f0f4ff" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <SectionLabel>// experience & education</SectionLabel>
            <h2
              className="font-bold"
              style={{
                fontFamily: "'Pretendard Variable', Pretendard, sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
                color: NAVY,
                letterSpacing: "-0.02em",
              }}
            >
              걸어온 길
            </h2>
          </div>

          <div className="flex flex-col gap-16">
            {EXPERIENCE_SECTIONS.map((sec) => {
              const items = TIMELINE.filter((it) =>
                sec.types.includes(it.type),
              );
              if (!items.length) return null;
              const lineColor = timelineStyle(items[0].type).color;
              return (
                <div key={sec.title}>
                  {/* Section heading */}
                  <div className="flex items-center gap-3 mb-7 pl-1">
                    <h3
                      className="font-bold"
                      style={{
                        fontFamily:
                          "'Pretendard Variable', Pretendard, sans-serif",
                        fontSize: "22px",
                        color: NAVY,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {sec.title}
                    </h3>
                    <div
                      className="h-px flex-1"
                      style={{ background: "rgba(1,33,105,0.12)" }}
                    />
                    <Mono
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: lineColor,
                      }}
                    >
                      {sec.subtitle}
                    </Mono>
                  </div>

                  {/* Timeline for this section */}
                  <div className="relative">
                    <div
                      className="absolute top-5 bottom-5"
                      style={{
                        left: 20,
                        width: 1,
                        background: `linear-gradient(to bottom, ${lineColor}, ${lineColor}00)`,
                        opacity: 0.5,
                      }}
                    />
                    <div className="flex flex-col gap-10">
                      {items.map((item, i) => (
                        <TimelineItem key={i} item={item} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────── */}
      <section
        id="contact"
        className="py-28 relative overflow-hidden"
        style={{
          background: `linear-gradient(140deg, #010d3a 0%, #012169 55%, #021e8c 100%)`,
        }}
      >
        {/* Glow accents */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: PURPLE, filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-[0.05] pointer-events-none"
          style={{ background: TIFFANY, filter: "blur(60px)" }}
        />

        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <SectionLabel>// contact</SectionLabel>
          <h2
            className="font-bold text-white mb-5"
            style={{
              fontFamily: "'Pretendard Variable', Pretendard, sans-serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
            }}
          >
            함께 성장할 팀을 찾고 있습니다.
          </h2>
          <p
            className="text-base leading-relaxed mb-12 mx-auto"
            style={{ color: "rgba(255,255,255,0.56)", maxWidth: 500 }}
          >
            백엔드 개발자로서 새로운 기회를 기다리고 있습니다. 편하게 연락
            주시면 빠르게 답변드리겠습니다.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="mailto:pzs2001926@gmail.com"
              className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-200"
              style={{ background: ORANGE, fontSize: "15px" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 28px rgba(234,115,61,0.48)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <Mail size={16} /> pzs2001926@gmail.com
            </a>
          </div>

          {/* Social links */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                icon: <Github size={18} />,
                label: "GitHub",
                href: "https://github.com/goodjunseon",
              },
              {
                icon: <Linkedin size={18} />,
                label: "LinkedIn",
                href: "https://linkedin.com/in/junseon",
              },
              {
                icon: <TistoryIcon size={18} />,
                label: "Blog",
                href: "https://goodjunseon-tech-blog.tistory.com/",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "rgba(255,255,255,0.68)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.48)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                  e.currentTarget.style.background = "";
                  e.currentTarget.style.color = "rgba(255,255,255,0.68)";
                }}
              >
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer
        className="py-5"
        style={{
          background: "#010b30",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.28)" }}>
            © 2026 박준선. All rights reserved.
          </span>
          <Mono style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
            Built with React + TypeScript
          </Mono>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(1,33,105,0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(1,33,105,0.4); }
      `}</style>
    </div>
  );
}
