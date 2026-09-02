import { SITE } from "./site";
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
    core: string;
    explore: string;
    selected: string;
    cv: string;
    cvNote: string;
    vizCaption: string;
    vizPixelLabel: string;
  };
  research: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    moreNote: string;
    themes: Array<{
      id: string;
      title: string;
      body: string;
      highlight: boolean;
    }>;
  };
  selected: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    read: string;
    doiPending: string;
  };
  systems: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    groups: Array<{ label: string; tags: string[] }>;
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
    sourceNote: string;
    yearHeading: string;
    filters: Record<FilterId, string>;
  };
  about: {
    id: string;
    kicker: string;
    title: string;
    lead: string;
    body: string[];
    nameNote: string;
    timelineTitle: string;
    timeline: Array<{ role: string; place: string }>;
  };
  collaborate: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    cards: Array<{ title: string; body: string }>;
  };
  contact: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    email: string;
    scholar: string;
    cas: string;
    labProfile: string;
    placeholders: string;
  };
  footer: {
    identity: string;
    scope: string;
    license: string;
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
    { id: "selected-work", href: "/#selected-work", label: "Selected Work" },
    { id: "publications", href: "/publications/", label: "Publications" },
    { id: "about", href: "/#about", label: "About" },
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
    role: `${SITE.titleEn} / ${SITE.titleZh}`,
    affiliation: SITE.orgEn,
    lab: SITE.labEn,
    line: SITE.heroLineEn,
    core: "I combine animal tracking, Earth observation and geospatial intelligence to understand how migratory birds navigate rapidly changing wetlands, river basins and energy landscapes—and translate that evidence into conservation and spatial planning.",
    explore: "Explore Research",
    selected: "Selected Publications",
    cv: "Download CV",
    cvNote: "CV PDF is a placeholder until an official file is supplied.",
    vizCaption:
      "Conceptual visualization — East Asian–Australasian Flyway outline, GPS tracks and stopovers, wetland pixels, turbine silhouettes and a white-naped crane silhouette. Not observational map data.",
    vizPixelLabel: "wetland pixels",
  },
  research: {
    id: "research",
    kicker: "Research",
    title: "Four themes, one flyway question",
    intro:
      "Work is organised around how migratory waterbirds use—and lose—wetland, river-basin and energy landscapes along the East Asian–Australasian Flyway. The first three themes are highlighted here; conservation translation is the fourth.",
    moreNote:
      "Theme four is developed through collaboration and spatial-planning applications rather than as a standalone product line.",
    themes: [
      {
        id: "movement",
        title: "Movement ecology",
        body: "GPS/GSM tracking is used to recover routes, stopovers, staging duration and migratory connectivity for threatened waterbirds—including white-naped crane, Siberian crane and East Asian geese—across the annual cycle.",
        highlight: true,
      },
      {
        id: "earth-observation",
        title: "Earth observation of wetlands",
        body: "Satellite time series map water, land and vegetation so that habitat availability can be read from pixels: reservoir drawdown, floodplain wet–dry cycles, and landscape change around stopovers.",
        highlight: true,
      },
      {
        id: "energy",
        title: "Energy landscapes and spatial planning",
        body: "Wind-energy and related infrastructure are treated as features of the landscapes birds already use. Analyses describe spatial overlap and planning context. They do not interpret overlap as collision rates or demographic impact.",
        highlight: true,
      },
      {
        id: "conservation",
        title: "From evidence to conservation action",
        body: "Tracking and remote-sensing results are translated into protected-area gap assessments, habitat-restoration briefs and spatial-planning advice for wetlands, reservoirs and flyway corridors.",
        highlight: false,
      },
    ],
  },
  selected: {
    id: "selected-work",
    kicker: "Selected work",
    title: "Papers that define the current programme",
    intro:
      "Four Crossref-verified articles. Summaries stay close to the published record. Publisher figures are not reproduced here.",
    read: "DOI",
    doiPending: "DOI not verified",
  },
  systems: {
    id: "study-systems",
    kicker: "Study systems",
    title: "Places and species, not an encyclopaedia",
    intro:
      "Tags mark systems that appear in the seeded papers. They are labels for navigation, not species accounts.",
    groups: [
      {
        label: "Flyway & landscapes",
        tags: [
          "East Asian–Australasian Flyway",
          "Wetlands",
          "River basins",
          "Energy landscapes",
          "Reservoirs",
        ],
      },
      {
        label: "Places",
        tags: [
          "Miyun Reservoir",
          "Baiyangdian",
          "Poyang Lake",
          "Yangtze River Basin",
          "Mongolian Plateau",
          "Northeast China",
        ],
      },
      {
        label: "Species",
        tags: [
          "White-naped Crane (Antigone vipio)",
          "Siberian Crane (Leucogeranus leucogeranus)",
          "Swan Goose (Anser cygnoides)",
          "Greylag Goose (Anser anser)",
          "Baer’s Pochard (Aythya baeri)",
        ],
      },
    ],
  },
  pubs: {
    id: "publications",
    kicker: "Publications",
    title: "Selected recent papers",
    intro:
      "Six entries from a static, Crossref-checked seed file. The full list is reverse-chronological and filterable. Citation counts are not displayed.",
    viewAll: "All publications",
    pageTitle: "Publications",
    pageIntro:
      "Seeded papers in which Kunpeng Yi is a named author, ordered newest first. Filters follow research themes. This page does not scrape Google Scholar. Entries without a verified DOI are labelled as such.",
    filterAll: "All",
    filterLabel: "Filter publications",
    empty: "No papers in this filter.",
    doi: "doi",
    sourceNote: "Unverified DOI",
    yearHeading: "Year",
    filters,
  },
  about: {
    id: "about",
    kicker: "About",
    title: "Kunpeng Yi",
    lead: `${SITE.titleEn} at the ${SITE.orgEn}, based in the ${SITE.labEn}.`,
    body: [
      "I combine animal tracking, Earth observation and geospatial intelligence to understand how migratory birds navigate rapidly changing wetlands, river basins and energy landscapes—and translate that evidence into conservation and spatial planning.",
      "Doctoral training in remote sensing was completed at Hokkaido University, followed by postdoctoral research at the Chinese Academy of Sciences.",
    ],
    nameNote:
      "Display name: 易昆鹏. CAS, UCAS and laboratory pages list 伊坤朋.",
    timelineTitle: "Compact timeline",
    timeline: [
      {
        role: "Associate Professor / 副研究员",
        place: "RCEES, Chinese Academy of Sciences — State Key Laboratory of Urban and Regional Ecology",
      },
      {
        role: "Postdoctoral research",
        place: "Chinese Academy of Sciences (ecological remote sensing)",
      },
      {
        role: "PhD, remote sensing",
        place: "Hokkaido University",
      },
    ],
  },
  collaborate: {
    id: "collaborate",
    kicker: "Collaborate",
    title: "Research first, then people",
    intro:
      "This page lists research collaboration only. It does not advertise jobs, products or consultancy retainers.",
    cards: [
      {
        title: "Research collaboration",
        body: "I welcome collaborations that join animal tracking, wetland remote sensing and conservation-oriented spatial planning along the East Asian–Australasian Flyway—especially shared telemetry, habitat time series and planning questions around energy and water infrastructure.",
      },
      {
        title: "Prospective students",
        body: "Prospective students may write to the institutional email. No open positions are advertised on this site.",
      },
    ],
  },
  contact: {
    id: "contact",
    kicker: "Contact",
    title: "Email is the working channel",
    intro:
      "Write to the institutional address. There is no form backend on this static site. ORCID, ResearchGate and GitHub will appear when official IDs are supplied.",
    email: "Email",
    scholar: "Google Scholar",
    cas: "CAS profile",
    labProfile: "Laboratory page",
    placeholders: "ORCID, ResearchGate and GitHub links are listed in ASSETS_NEEDED.md until confirmed.",
  },
  footer: {
    identity: `${SITE.nameEn} · ${SITE.nameZh} · ${SITE.orgShortEn}`,
    scope: "Research, teaching, collaboration and conservation only.",
    license: "Static academic site. No citation metrics. No live Scholar scrape.",
  },
  notFound: {
    title: "Page not found",
    body: "That address is not part of this site.",
    home: "English home",
    homeOther: "中文首页",
    homeOtherHref: "/zh/",
  },
  cvPage: {
    title: "Curriculum vitae",
    body: "An official CV PDF has not been added yet. This placeholder exists so the Download CV action has a stable URL. See ASSETS_NEEDED.md.",
    back: "Back to home",
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
    { id: "selected-work", href: "/zh/#selected-work", label: "代表工作" },
    { id: "publications", href: "/zh/publications/", label: "论文" },
    { id: "about", href: "/zh/#about", label: "简介" },
    { id: "collaborate", href: "/zh/#collaborate", label: "合作" },
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
    role: `${SITE.titleZh} / ${SITE.titleEn}`,
    affiliation: SITE.orgZh,
    lab: SITE.labZh,
    line: SITE.heroLineZh,
    core: "融合动物追踪、卫星遥感与地理空间智能，研究候鸟如何响应快速变化的湿地、流域与能源景观，并将科学证据转化为保护与空间规划行动。",
    explore: "了解研究",
    selected: "代表论文",
    cv: "下载简历",
    cvNote: "简历 PDF 为占位文件，待提供正式版本后替换。",
    vizCaption:
      "概念示意 — 东亚—澳大利西亚迁飞区轮廓、GPS 轨迹与停歇地、湿地像元、风机剪影与白枕鹤剪影。并非观测地图数据。",
    vizPixelLabel: "湿地像元",
  },
  research: {
    id: "research",
    kicker: "研究",
    title: "四个主题，一条迁飞区问题",
    intro:
      "工作围绕东亚—澳大利西亚迁飞区的候鸟如何利用——以及失去——湿地、流域与能源景观展开。首页突出前三个主题；保护转化是第四主题。",
    moreNote: "第四主题通过合作与空间规划应用展开，而不是独立的产品线。",
    themes: [
      {
        id: "movement",
        title: "运动生态学",
        body: "利用 GPS/GSM 追踪恢复受胁水鸟的迁徙路线、停歇地、停歇时长与连通性，对象包括白枕鹤、白鹤及东亚雁类，覆盖全年生活史。",
        highlight: true,
      },
      {
        id: "earth-observation",
        title: "湿地地球观测",
        body: "用卫星时间序列制图水体、陆地与植被，从像元读取栖息地可用性：水库消落、洪泛湿地干湿节律，以及停歇地周边的景观变化。",
        highlight: true,
      },
      {
        id: "energy",
        title: "能源景观与空间规划",
        body: "风能及相关基础设施被视为鸟类已经使用的景观要素。分析描述空间并存与规划语境，不将空间重叠解释为碰撞率或种群影响。",
        highlight: true,
      },
      {
        id: "conservation",
        title: "从证据到保护行动",
        body: "将追踪与遥感结果转化为保护地空缺评估、栖息地修复建议，以及面向湿地、水库与迁飞通道的空间规划依据。",
        highlight: false,
      },
    ],
  },
  selected: {
    id: "selected-work",
    kicker: "代表工作",
    title: "构成当前研究主线的论文",
    intro: "四篇经 Crossref 核验的文章。摘要紧贴已发表记录，不转载出版商图片。",
    read: "DOI",
    doiPending: "DOI 未核验",
  },
  systems: {
    id: "study-systems",
    kicker: "研究系统",
    title: "地点与物种标签，而非百科",
    intro: "标签对应种子文献中出现的系统，仅供检索，不作物种志。",
    groups: [
      {
        label: "迁飞区与景观",
        tags: ["东亚—澳大利西亚迁飞区", "湿地", "流域", "能源景观", "水库"],
      },
      {
        label: "地点",
        tags: ["密云水库", "白洋淀", "鄱阳湖", "长江流域", "蒙古高原", "中国东北"],
      },
      {
        label: "物种",
        tags: [
          "白枕鹤 Antigone vipio",
          "白鹤 Leucogeranus leucogeranus",
          "鸿雁 Anser cygnoides",
          "灰雁 Anser anser",
          "青头潜鸭 Aythya baeri",
        ],
      },
    ],
  },
  pubs: {
    id: "publications",
    kicker: "论文",
    title: "近期论文摘选",
    intro: "静态、经 Crossref 核对的种子文件中的六条。完整列表按时间倒序并提供筛选。不展示被引次数。",
    viewAll: "全部论文",
    pageTitle: "论文",
    pageIntro:
      "易昆鹏为署名作者的种子文献，最新在前。筛选对应研究主题。本页不抓取 Google Scholar。未核验 DOI 的条目已标注。",
    filterAll: "全部",
    filterLabel: "筛选论文",
    empty: "该分类下暂无条目。",
    doi: "doi",
    sourceNote: "DOI 未核验",
    yearHeading: "年份",
    filters: filtersZh,
  },
  about: {
    id: "about",
    kicker: "简介",
    title: "易昆鹏",
    lead: `${SITE.orgZh}${SITE.titleZh}，任职于${SITE.labZh}。`,
    body: [
      "融合动物追踪、卫星遥感与地理空间智能，研究候鸟如何响应快速变化的湿地、流域与能源景观，并将科学证据转化为保护与空间规划行动。",
      "于北海道大学获得遥感科学博士学位，随后在中国科学院完成博士后研究。",
    ],
    nameNote: "本站中文名：易昆鹏。中国科学院、国科大及实验室页面写作伊坤朋。",
    timelineTitle: "简要经历",
    timeline: [
      {
        role: "副研究员 / Associate Professor",
        place: "中国科学院生态环境研究中心 · 区域与城市生态安全全国重点实验室",
      },
      {
        role: "博士后",
        place: "中国科学院（生态遥感）",
      },
      {
        role: "遥感科学博士",
        place: "北海道大学",
      },
    ],
  },
  collaborate: {
    id: "collaborate",
    kicker: "合作",
    title: "先研究，后人事",
    intro: "本页只列研究合作，不发布岗位、产品或顾问聘任。",
    cards: [
      {
        title: "研究合作",
        body: "欢迎在东亚—澳大利西亚迁飞区开展动物追踪、湿地遥感与面向保护的空间规划合作，尤其是共享遥测、栖息地时间序列，以及能源与水利设施相关的规划问题。",
      },
      {
        title: "意向学生",
        body: "意向学生可写信至机构邮箱。本站不发布在招岗位。",
      },
    ],
  },
  contact: {
    id: "contact",
    kicker: "联系",
    title: "工作邮箱是主要渠道",
    intro:
      "请使用机构邮箱。本静态站点没有表单后端。ORCID、ResearchGate 与 GitHub 将在官方编号确认后显示。",
    email: "电子邮箱",
    scholar: "Google Scholar",
    cas: "中科院页面",
    labProfile: "实验室页面",
    placeholders: "ORCID、ResearchGate 与 GitHub 链接待确认，详见 ASSETS_NEEDED.md。",
  },
  footer: {
    identity: `${SITE.nameZh} · ${SITE.nameEn} · ${SITE.orgShortZh}`,
    scope: "仅涉及研究、教学、合作与保护。",
    license: "静态学术网站。不展示被引指标。不实时抓取 Scholar。",
  },
  notFound: {
    title: "页面不存在",
    body: "该地址不属于本站。",
    home: "中文首页",
    homeOther: "English home",
    homeOtherHref: "/",
  },
  cvPage: {
    title: "个人简历",
    body: "正式简历 PDF 尚未加入。此占位页用于提供稳定的下载入口。详见 ASSETS_NEEDED.md。",
    back: "返回首页",
  },
};

export function getCopy(locale: Locale): Copy {
  return locale === "zh" ? zh : en;
}
