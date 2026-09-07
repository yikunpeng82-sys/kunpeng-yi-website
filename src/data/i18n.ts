import { SITE } from "./site";
import { CV_TIMELINE } from "./cv";
import type { FilterId, Locale } from "./publications";
import { FILTER_LABELS } from "./publications";

export type { Locale };

export interface NavItem {
  id: string;
  href: string;
  label: string;
}

export interface Copy {
  lang: Locale;
  htmlLang: string;
  dir: "ltr";
  skip: string;
  navLabel: string;
  openMenu: string;
  closeMenu: string;
  langToggle: string;
  langToggleAria: string;
  langToggleHref: string;
  homeHref: string;
  publicationsHref: string;
  nav: NavItem[];
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  hero: {
    kicker: string;
    name: string;
    nameAlt: string;
    role: string;
    affiliation: string;
    lab: string;
    line: string;
    scholar: string;
    cv: string;
    contact: string;
    facts: Array<{ value: string; label: string }>;
  };
  research: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    themes: Array<{
      id: string;
      title: string;
      body: string;
    }>;
  };
  cases: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    placeholder: string;
    items: Array<{
      id: string;
      title: string;
      body: string;
      figure: string;
    }>;
  };
  capacity: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    items: Array<{ title: string; body: string }>;
  };
  selected: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    read: string;
    more: string;
  };
  pubs: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    viewAll: string;
    pageTitle: string;
    pageIntro: string;
    filterAll: string;
    filterLabel: string;
    empty: string;
    doi: string;
    bibtex: string;
    bibtexAll: string;
    copied: string;
    yearHeading: string;
    filters: Record<FilterId, string>;
  };
  about: {
    id: string;
    kicker: string;
    title: string;
    lead: string;
    body: string[];
    timelineTitle: string;
    timeline: Array<{ role: string; place: string }>;
  };
  collaborate: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    cards: Array<{ title: string; body: string }>;
    majorsLabel: string;
    majors: string[];
    directionsLabel: string;
    directions: string[];
  };
  contact: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    email: string;
    phone: string;
    address: string;
    postal: string;
    researchGate: string;
    scholar: string;
    cas: string;
    labProfile: string;
    github: string;
  };
  footer: {
    identity: string;
    scope: string;
  };
  notFound: {
    title: string;
    body: string;
    home: string;
    homeOther: string;
    homeOtherHref: string;
  };
  cvPage: {
    title: string;
    body: string;
    back: string;
    downloadCvEn: string;
    downloadCvZh: string;
    downloadBioEn: string;
    downloadBioZh: string;
    chooserLabel: string;
    projectsTitle: string;
    projectsIntro: string;
  };
}

const filters = Object.fromEntries(
  (Object.keys(FILTER_LABELS) as FilterId[]).map((id) => [id, FILTER_LABELS[id].en]),
) as Record<FilterId, string>;

const filtersZh = Object.fromEntries(
  (Object.keys(FILTER_LABELS) as FilterId[]).map((id) => [id, FILTER_LABELS[id].zh]),
) as Record<FilterId, string>;

export const en: Copy = {
  lang: "en",
  htmlLang: "en",
  dir: "ltr",
  skip: "Skip to content",
  navLabel: "Primary",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  langToggle: "中文",
  langToggleAria: "Switch to Chinese",
  langToggleHref: "/zh/",
  homeHref: "/",
  publicationsHref: "/publications/",
  nav: [
    { id: "research", href: "/#research", label: "Research" },
    { id: "selected-work", href: "/#selected-work", label: "Papers" },
    { id: "publications", href: "/publications/", label: "Selected publications" },
    { id: "collaborate", href: "/#collaborate", label: "Collaborate" },
    { id: "contact", href: "/#contact", label: "Contact" },
  ],
  meta: {
    title: `${SITE.nameEn} · ${SITE.titleEn}, ${SITE.orgShortEn}`,
    description: `${SITE.nameEn} is an Associate Professor at ${SITE.orgEn}. ${SITE.positioningEn}.`,
    ogLocale: "en_US",
  },
  hero: {
    kicker: SITE.positioningEn,
    name: SITE.nameEn,
    nameAlt: SITE.nameZh,
    role: SITE.titleEn,
    affiliation: SITE.orgEn,
    lab: `${SITE.labEn} (${SITE.labEnShort})`,
    line: SITE.heroLineEn,
    scholar: "Google Scholar",
    cv: "Academic CV",
    contact: "Contact",
    facts: [
      { value: "40+", label: "papers" },
      { value: "10+", label: "hosted projects / >RMB 8 million" },
      { value: "3", label: "patents" },
      { value: "2", label: "co-authored / edited books" },
    ],
  },
  research: {
    id: "research",
    kicker: "Research",
    title: "Three themes",
    intro:
      "How migratory waterbirds use—and lose—wetland, river-basin and energy landscapes along the East Asian–Australasian Flyway.",
    themes: [
      {
        id: "movement",
        title: "Movement ecology",
        body: "GPS/GSM tracking recovers routes, stopovers, staging duration and migratory connectivity for threatened waterbirds—including white-naped crane, Siberian crane and East Asian geese—across the annual cycle.",
      },
      {
        id: "earth-observation",
        title: "Wetland Earth observation",
        body: "Satellite time series map water, land and vegetation so that habitat availability can be read from pixels: reservoir drawdown, floodplain wet–dry cycles, and landscape change around stopovers.",
      },
      {
        id: "energy",
        title: "Energy landscapes and birds",
        body: "Wind-energy and related infrastructure are treated as features of the landscapes birds already use. Analyses describe spatial overlap and planning context. They do not interpret overlap as collision rates or demographic impact.",
      },
    ],
  },
  cases: {
    id: "cases",
    kicker: "Study systems",
    title: "Research regions and focal species",
    intro:
      "Three programmes that join tracking, wetland remote sensing and spatial planning.",
    placeholder: "Figure placeholder — licensed paper figures are not reproduced here.",
    items: [
      {
        id: "miyun",
        title: "Miyun Reservoir and the white-naped crane",
        body: "Reservoir water-level management is linked to habitat available to white-naped cranes (Antigone vipio) on migration through the Beijing hinterland.",
        figure: "Miyun · Antigone vipio",
      },
      {
        id: "yangtze",
        title: "Yangtze floodplain waterbirds",
        body: "Floodplain wet–dry cycles and protected-area coverage for Siberian crane, Swan Goose and other waterbirds that use the middle and lower Yangtze.",
        figure: "Yangtze floodplain · waterbirds",
      },
      {
        id: "wind",
        title: "Global wind energy and migration",
        body: "Spatial overlap between expanding wind-energy infrastructure and migratory landscapes, used as a planning question rather than a collision census.",
        figure: "Wind · migration",
      },
    ],
  },
  capacity: {
    id: "capacity",
    kicker: "In progress",
    title: "Current capacity",
    intro:
      "Hosted programmes combine satellite tracking with Earth observation. Individual GPS sample sizes are not listed here.",
    items: [
      {
        title: "NSFC General Programme",
        body: "Multi-scale movement patterns and core-habitat monitoring along migration routes (2023–2026); retrieval of movement information from multi-source remote sensing and satellite tracking (2019–2022).",
      },
      {
        title: "National Key R&D Programme",
        body: "A hosted sub-project under China’s National Key R&D Programme, alongside locally commissioned work on wetland restoration and spatial planning.",
      },
      {
        title: "Tracking and remote sensing",
        body: "GSM–GPS telemetry joined to wetland and land-cover time series for flyway sites, reservoirs and energy landscapes.",
      },
    ],
  },
  selected: {
    id: "selected-work",
    kicker: "Selected publications",
    title: "Five papers",
    intro: "A short list that frames the current programme. The fuller selected list is on the publications page.",
    read: "DOI",
    more: "All selected publications",
  },
  pubs: {
    id: "publications",
    kicker: "Publications",
    title: "Selected publications",
    intro: "Five papers from the current programme.",
    viewAll: "Selected publications",
    pageTitle: "Selected publications",
    pageIntro:
      "A selected list of papers in which Kunpeng Yi is a named author, newest first. The complete record is larger than this page.",
    filterAll: "All",
    filterLabel: "Filter publications",
    empty: "No papers in this filter.",
    doi: "doi",
    bibtex: "BibTeX",
    bibtexAll: "Download BibTeX",
    copied: "Copied",
    yearHeading: "Year",
    filters,
  },
  about: {
    id: "about",
    kicker: "About",
    title: "Kunpeng Yi",
    lead: `${SITE.titleEn} at the ${SITE.orgEn}, based in the ${SITE.labEn} (${SITE.labEnShort}).`,
    body: [
      "I combine animal tracking, Earth observation and geospatial intelligence to understand how migratory birds navigate rapidly changing wetlands, river basins and energy landscapes—and translate that evidence into conservation and spatial planning.",
    ],
    timelineTitle: "Appointments and education",
    timeline: [...CV_TIMELINE.en],
  },
  collaborate: {
    id: "collaborate",
    kicker: "Collaborate",
    title: "Collaboration and students",
    intro:
      "Research collaboration, master’s supervision, and a working email.",
    cards: [
      {
        title: "Research collaboration",
        body: "Collaborations that join animal tracking, wetland remote sensing and conservation-oriented spatial planning along the East Asian–Australasian Flyway—shared telemetry, habitat time series, and how migratory birds respond to human activity and extreme climate events.",
      },
      {
        title: "Prospective students",
        body: "Master’s supervisor (硕导). Write to the institutional email. This page does not announce a numbered intake.",
      },
      {
        title: "Professional service",
        body: "Council member, China Grassland Society. Member of the Geographical Society of China, the Ecological Society of China, the Chinese Society of Remote Sensing, and the China Ornithological Society. Guest Editor of special issues for Remote Sensing, Land and Fire.",
      },
    ],
    majorsLabel: "Majors",
    majors: [
      "071300 Ecology",
      "0705Z1 Natural Resources Science",
      "070503 Cartography and Geographic Information Systems",
    ],
    directionsLabel: "Research directions",
    directions: [
      "运动生态学，迁徙动物监测与保护",
      "湿地监测与生态修复",
      "生态系统遥感监测与评估",
    ],
  },
  contact: {
    id: "contact",
    kicker: "Contact",
    title: "Contact",
    intro: "Institutional email is the working channel.",
    email: "Email",
    phone: "Office",
    address: "Postal address",
    postal: "Postcode",
    researchGate: "ResearchGate",
    scholar: "Google Scholar",
    cas: "CAS profile",
    labProfile: "Laboratory",
    github: "Website source",
  },
  footer: {
    identity: `${SITE.nameEn} · ${SITE.nameZh} · ${SITE.orgShortEn}`,
    scope: `${SITE.labEn} (${SITE.labEnShort})`,
  },
  notFound: {
    title: "Page not found",
    body: "That address is not part of this site.",
    home: "English home",
    homeOther: "中文首页",
    homeOtherHref: "/zh/",
  },
  cvPage: {
    title: "Academic CV",
    body: "Academic CV and a one-page academic bio for meetings.",
    back: "Back to home",
    downloadCvEn: "Academic CV (English, PDF)",
    downloadCvZh: "学术简历（中文，PDF）",
    downloadBioEn: "Academic Bio (English, PDF)",
    downloadBioZh: "学术简介（中文，PDF）",
    chooserLabel: "Downloads",
    projectsTitle: "Hosted NSFC projects",
    projectsIntro: "Two National Natural Science Foundation of China General Programme titles currently hosted.",
  },
};

export const zh: Copy = {
  lang: "zh",
  htmlLang: "zh-CN",
  dir: "ltr",
  skip: "跳到正文",
  navLabel: "主导航",
  openMenu: "打开菜单",
  closeMenu: "关闭菜单",
  langToggle: "EN",
  langToggleAria: "切换到英文",
  langToggleHref: "/",
  homeHref: "/zh/",
  publicationsHref: "/zh/publications/",
  nav: [
    { id: "research", href: "/zh/#research", label: "研究" },
    { id: "selected-work", href: "/zh/#selected-work", label: "论文" },
    { id: "publications", href: "/zh/publications/", label: "代表性论文" },
    { id: "collaborate", href: "/zh/#collaborate", label: "合作与招生" },
    { id: "contact", href: "/zh/#contact", label: "联系" },
  ],
  meta: {
    title: `${SITE.nameZh} · ${SITE.titleZh}，${SITE.orgShortZh}`,
    description: `${SITE.nameZh}，${SITE.orgZh}${SITE.titleZh}。${SITE.positioningZh}。`,
    ogLocale: "zh_CN",
  },
  hero: {
    kicker: SITE.positioningZh,
    name: SITE.nameZh,
    nameAlt: SITE.nameEn,
    role: SITE.titleZh,
    affiliation: SITE.orgZh,
    lab: SITE.labZh,
    line: SITE.heroLineZh,
    scholar: "Google Scholar",
    cv: "学术简历",
    contact: "联系",
    facts: [
      { value: "40余篇", label: "学术论文" },
      { value: "10余项", label: "主持项目 / 经费800余万元" },
      { value: "3项", label: "发明专利" },
      { value: "2部", label: "参编专著" },
    ],
  },
  research: {
    id: "research",
    kicker: "研究",
    title: "三个主题",
    intro:
      "围绕东亚—澳大利西亚迁飞区的候鸟如何利用——以及失去——湿地、流域与能源景观。",
    themes: [
      {
        id: "movement",
        title: "运动生态学",
        body: "利用 GPS/GSM 追踪恢复受胁水鸟的迁徙路线、停歇地、停歇时长与连通性，对象包括白枕鹤、白鹤及东亚雁类，覆盖全年生活史。",
      },
      {
        id: "earth-observation",
        title: "湿地地球观测",
        body: "用卫星时间序列制图水体、陆地与植被，从像元读取栖息地可用性：水库消落、洪泛湿地干湿节律，以及停歇地周边的景观变化。",
      },
      {
        id: "energy",
        title: "能源景观与鸟类",
        body: "风能及相关基础设施被视为鸟类已经使用的景观要素。分析描述空间并存与规划语境，不将空间重叠解释为碰撞率或种群影响。",
      },
    ],
  },
  cases: {
    id: "cases",
    kicker: "研究区域与重点物种",
    title: "研究区域与重点物种",
    intro: "追踪、湿地遥感与空间规划交汇的三条工作线。",
    placeholder: "图示占位 — 本站不转载受版权保护的论文插图。",
    items: [
      {
        id: "miyun",
        title: "密云水库与白枕鹤",
        body: "将水库水位管理与白枕鹤（Antigone vipio）在北京腹地迁徙停歇期的栖息地可用性联系起来。",
        figure: "密云 · 白枕鹤",
      },
      {
        id: "yangtze",
        title: "长江洪泛湿地水鸟",
        body: "长江中下游洪泛湿地的干湿节律与保护地覆盖，对象包括白鹤、鸿雁及其他水鸟。",
        figure: "长江洪泛区 · 水鸟",
      },
      {
        id: "wind",
        title: "全球风能与迁徙",
        body: "扩张中的风能设施与迁徙景观的空间重叠，作为规划问题提出，而不是碰撞数量统计。",
        figure: "风能 · 迁徙",
      },
    ],
  },
  capacity: {
    id: "capacity",
    kicker: "进行中",
    title: "当前能力",
    intro: "主持项目将卫星追踪与地球观测结合。此处不列出 GPS 个体数量。",
    items: [
      {
        title: "国家自然科学基金面上项目",
        body: "鸟类多尺度运动行为模式及其迁徙路线核心栖息地监测与保护（2023–2026）；基于多源遥感和卫星追踪大数据的鸟类运动行为信息反演（2019–2022）。",
      },
      {
        title: "国家重点研发计划",
        body: "主持国家重点研发计划子课题，并承担湿地恢复与空间规划方面的地方委托工作。",
      },
      {
        title: "追踪与遥感",
        body: "将 GSM–GPS 遥测与湿地、地表覆盖时间序列对接，覆盖迁飞停歇地、水库与能源景观。",
      },
    ],
  },
  selected: {
    id: "selected-work",
    kicker: "代表性论文",
    title: "五篇论文",
    intro: "构成当前研究主线的短名单。更完整的代表性列表见论文页。",
    read: "DOI",
    more: "全部代表性论文",
  },
  pubs: {
    id: "publications",
    kicker: "论文",
    title: "代表性论文",
    intro: "当前研究主线中的五篇。",
    viewAll: "代表性论文",
    pageTitle: "代表性论文",
    pageIntro:
      "伊坤朋为署名作者的代表性论文，最新在前。完整目录长于本页。",
    filterAll: "全部",
    filterLabel: "筛选论文",
    empty: "该分类下暂无条目。",
    doi: "doi",
    bibtex: "BibTeX",
    bibtexAll: "下载 BibTeX",
    copied: "已复制",
    yearHeading: "年份",
    filters: filtersZh,
  },
  about: {
    id: "about",
    kicker: "简介",
    title: "伊坤朋",
    lead: `${SITE.orgZh}${SITE.titleZh}，任职于${SITE.labZh}。`,
    body: [
      "融合动物追踪、卫星遥感与地理空间智能，研究候鸟如何响应快速变化的湿地、流域与能源景观，并将科学证据转化为保护与空间规划行动。",
    ],
    timelineTitle: "学历与任职",
    timeline: [...CV_TIMELINE.zh],
  },
  collaborate: {
    id: "collaborate",
    kicker: "合作与招生",
    title: "合作与招生",
    intro: "研究合作、硕士研究生指导，以及工作邮箱。",
    cards: [
      {
        title: "研究合作",
        body: "欢迎在东亚—澳大利西亚迁飞区开展动物追踪、湿地遥感与面向保护的空间规划合作，尤其是共享遥测、栖息地时间序列，以及迁徙鸟类对人类活动与极端气候事件的响应。",
      },
      {
        title: "意向学生",
        body: "硕导。请写信至机构邮箱。本页不发布定额招生人数。",
      },
      {
        title: "学术任职",
        body: "中国草学会理事；中国地理学会、中国生态学会、中国遥感学会、中国鸟类学会会员；Remote Sensing、Land、Fire 专刊 Guest Editor。",
      },
    ],
    majorsLabel: "招生专业",
    majors: ["071300生态学", "0705Z1自然资源学", "070503地图学与地理信息系统"],
    directionsLabel: "招生方向",
    directions: [
      "运动生态学，迁徙动物监测与保护",
      "湿地监测与生态修复",
      "生态系统遥感监测与评估",
    ],
  },
  contact: {
    id: "contact",
    kicker: "联系",
    title: "联系",
    intro: "请使用机构邮箱。",
    email: "电子邮箱",
    phone: "办公电话",
    address: "通讯地址",
    postal: "邮编",
    researchGate: "ResearchGate",
    scholar: "Google Scholar",
    cas: "中科院页面",
    labProfile: "实验室",
    github: "网站源码",
  },
  footer: {
    identity: `${SITE.nameZh} · ${SITE.nameEn} · ${SITE.orgShortZh}`,
    scope: SITE.labZh,
  },
  notFound: {
    title: "页面不存在",
    body: "该地址不属于本站。",
    home: "中文首页",
    homeOther: "English home",
    homeOtherHref: "/",
  },
  cvPage: {
    title: "学术简历",
    body: "学术简历，以及供会议使用的一页学术简介。",
    back: "返回首页",
    downloadCvEn: "Academic CV (English, PDF)",
    downloadCvZh: "学术简历（中文，PDF）",
    downloadBioEn: "Academic Bio (English, PDF)",
    downloadBioZh: "学术简介（中文，PDF）",
    chooserLabel: "下载",
    projectsTitle: "主持的国家自然科学基金",
    projectsIntro: "目前主持的两项国家自然科学基金面上项目。",
  },
};

export function getCopy(locale: Locale): Copy {
  return locale === "zh" ? zh : en;
}
