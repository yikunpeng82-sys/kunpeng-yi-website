import { SITE, labCurrentEn, labFormerNoteEn } from "./site";
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
  projectsHref: string;
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
    labFormer: string;
    lines: string[];
    explore: string;
    publications: string;
    cv: string;
    glanceTitle: string;
    facts: Array<{ value: string; label: string }>;
  };
  research: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    questionLabel: string;
    methodsLabel: string;
    relevanceLabel: string;
    themes: Array<{
      id: string;
      title: string;
      question: string;
      methods: string;
      relevance: string;
      note?: string;
    }>;
  };
  featured: {
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
      doi?: string;
      note?: string;
    }>;
  };
  systems: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    caption: string;
    regions: Array<{ id: string; label: string; body: string }>;
  };
  tools: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    access: string;
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
    pdf: string;
    code: string;
    data: string;
    project: string;
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
    labNote: string;
    timelineTitle: string;
    timeline: Array<{ role: string; place: string }>;
  };
  collaborate: {
    id: string;
    kicker: string;
    title: string;
    intro: string;
    discuss: string;
    discussSubject: string;
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
    ucas: string;
    github: string;
  };
  footer: {
    identity: string;
    scope: string;
    former: string;
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
  projectsPage: {
    title: string;
    body: string;
    intro: string;
    roleLabel: string;
    sourceLabel: string;
    noteLabel: string;
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
  projectsHref: "/projects/",
  nav: [
    { id: "research", href: "/#research", label: "Research" },
    { id: "publications", href: "/publications/", label: "Publications" },
    { id: "projects", href: "/projects/", label: "Projects" },
    { id: "collaborate", href: "/#collaborate", label: "Collaborate" },
    { id: "contact", href: "/#contact", label: "Contact" },
  ],
  meta: {
    title: `${SITE.nameEn} · ${SITE.titleEn}, ${SITE.orgShortEn}`,
    description: `${SITE.nameEn} is an ${SITE.titleEn} at ${SITE.orgEn}, ${labCurrentEn}. ${SITE.positioningEn}. ${SITE.heroLineEn}.`,
    ogLocale: "en_US",
  },
  hero: {
    kicker: SITE.positioningEn,
    name: SITE.nameEn,
    nameAlt: SITE.nameZh,
    role: SITE.titleEn,
    affiliation: SITE.orgEn,
    lab: labCurrentEn,
    labFormer: labFormerNoteEn,
    lines: [
      `${SITE.heroLineEn}.`,
      "I lead research that joins animal tracking, wetland Earth observation and conservation planning along the East Asian–Australasian Flyway.",
      "The group works with international partners on how migratory waterbirds use—and lose—wetland, river-basin and energy landscapes.",
    ],
    explore: "Explore Research",
    publications: "Selected Publications",
    cv: "Download CV",
    glanceTitle: "Research at a Glance",
    facts: [
      { value: "40+", label: "Publications" },
      { value: "10+", label: "PI-led Projects" },
      { value: "RMB 8M+", label: "Hosted funding" },
      { value: "3", label: "Patents" },
    ],
  },
  research: {
    id: "research",
    kicker: "Signature programmes",
    title: "Three Signature Research Programs",
    intro:
      "A laboratory programme at the intersection of movement ecology, Earth observation and biodiversity conservation.",
    questionLabel: "Question",
    methodsLabel: "Data & Methods",
    relevanceLabel: "Conservation–Planning Relevance",
    themes: [
      {
        id: "movement",
        title: "Movement Ecology & Biologging",
        question:
          "How do threatened waterbirds move through the annual cycle—routes, stopovers, staging duration and migratory connectivity?",
        methods:
          "GSM–GPS biologging joined to flyway-scale spatial data for white-naped crane, Siberian crane and East Asian geese.",
        relevance:
          "Used sites and connectivity show where corridor conservation is thin and where stopover habitat still functions.",
      },
      {
        id: "earth-observation",
        title: "Wetland EO & Ecological Restoration",
        question:
          "How does habitat availability change when reservoirs, floodplains and restored wetlands wet and dry?",
        methods:
          "Satellite time series of water, land and vegetation, with habitat-suitability models where they are already published.",
        relevance:
          "Water-level management and restoration can be read as habitat supply for migratory waterbirds.",
      },
      {
        id: "energy",
        title: "Energy Infrastructure & Migratory Birds",
        question:
          "Where do energy facilities and migratory landscapes overlap, and what does that imply for planning and response?",
        methods:
          "Infrastructure layers overlaid on tracking and habitat maps to describe overlap, exposure and planning risk.",
        relevance:
          "Overlap, exposure and planning-risk surfaces that can inform siting and response along migratory landscapes.",
        note: "Scope note: overlap, exposure, planning risk and response only.",
      },
    ],
  },
  featured: {
    id: "featured",
    kicker: "Featured research",
    title: "Featured Research",
    intro:
      "Four published studies that show how tracking, wetland remote sensing and spatial planning meet on the ground.",
    placeholder: "Figure placeholder — licensed paper figures are not reproduced here.",
    items: [
      {
        id: "miyun",
        title: "Miyun Reservoir × white-naped crane",
        body: "GSM–GPS tracking of white-naped cranes (Antigone vipio) is joined to reservoir imagery to relate Miyun water-level management to habitat available in a migration network.",
        figure: "Miyun · Antigone vipio",
        doi: "10.3390/rs15235508",
      },
      {
        id: "siberian",
        title: "Siberian Crane × flyway gaps",
        body: "GPS tracking of the Critically Endangered Siberian Crane (Leucogeranus leucogeranus) maps staging sites and compares used areas with the current protected-area network.",
        figure: "Siberian Crane · flyway gaps",
        doi: "10.3390/rs14205101",
      },
      {
        id: "baiyangdian",
        title: "Baiyangdian × Baer’s Pochard",
        body: "MaxEnt and Google Earth Engine are used to evaluate suitable habitat for Baer’s Pochard (Aythya baeri) at Baiyangdian.",
        figure: "Baiyangdian · Aythya baeri",
        doi: "10.3390/rs16010064",
      },
      {
        id: "wind",
        title: "Wind energy × migration",
        body: "Spatial coincidence of expanding wind-energy infrastructure and migratory landscapes, framed as overlap, exposure and planning risk.",
        figure: "Wind · migration",
        doi: "10.59717/j.xinn-geo.2025.100142",
        note: "Scope note: overlap, exposure, planning risk and response only.",
      },
    ],
  },
  systems: {
    id: "study-systems",
    kicker: "Study systems",
    title: "Study systems along the flyway",
    intro:
      "A conceptual sketch of where the programme works. It is not a published map and is not a substitute for the figures in the papers.",
    caption:
      "Conceptual diagram of study systems along the East Asian–Australasian Flyway. Locations are schematic.",
    regions: [
      {
        id: "miyun",
        label: "Miyun Reservoir",
        body: "Water-level management and white-naped crane habitat in the Beijing hinterland.",
      },
      {
        id: "baiyangdian",
        label: "Baiyangdian",
        body: "Habitat suitability for Baer’s Pochard in a restored lowland wetland.",
      },
      {
        id: "yangtze",
        label: "Yangtze floodplain",
        body: "Floodplain wet–dry cycles and flyway-site coverage for Siberian crane and East Asian geese.",
      },
      {
        id: "energy",
        label: "Energy landscapes",
        body: "Overlap and exposure between energy infrastructure and migratory landscapes.",
      },
    ],
  },
  tools: {
    id: "data-tools",
    kicker: "Data & tools",
    title: "Data & Tools",
    intro:
      "Tracking, habitat time series and spatial layers from hosted programmes.",
    access:
      "Available through research collaboration. This website does not host public data downloads.",
    items: [
      {
        title: "Biologging tracks",
        body: "GSM–GPS movement data from hosted programmes on threatened waterbirds. Shared by collaboration, not as an open download on this site.",
      },
      {
        title: "Wetland Earth-observation stacks",
        body: "Reservoir and floodplain water, land and vegetation time series used to read habitat availability from pixels.",
      },
      {
        title: "Habitat and flyway layers",
        body: "Used sites, suitability surfaces and protected-area comparison layers from published studies.",
      },
      {
        title: "Planning-support overlays",
        body: "Energy and water-landscape layers used in overlap, exposure and planning-risk analyses.",
      },
    ],
  },
  selected: {
    id: "selected-work",
    kicker: "Selected publications",
    title: "Selected publications",
    intro: "A short list that frames the current programme. The fuller selected list is on the publications page.",
    read: "DOI",
    more: "All selected publications",
  },
  pubs: {
    id: "publications",
    kicker: "Publications",
    title: "Selected publications",
    intro: "Papers that frame the current programme.",
    viewAll: "Selected publications",
    pageTitle: "Selected publications",
    pageIntro:
      "A selected list of papers in which Kunpeng Yi is a named author, newest first. The complete record is larger than this page. DOI, PDF, Code, Data and Project links appear only when a URL exists.",
    filterAll: "All",
    filterLabel: "Filter publications",
    empty: "No papers in this filter.",
    doi: "DOI",
    pdf: "PDF",
    code: "Code",
    data: "Data",
    project: "Project",
    bibtex: "BibTeX",
    bibtexAll: "Copy BibTeX",
    copied: "Copied",
    yearHeading: "Year",
    filters,
  },
  about: {
    id: "about",
    kicker: "About",
    title: "Kunpeng Yi",
    lead: `${SITE.titleEnFull} at the ${SITE.orgEn}.`,
    body: [
      "Ph.D., Hokkaido University. Postdoctoral fellow at the Aerospace Information Research Institute, Chinese Academy of Sciences (AIRCAS), formerly RADI. Master’s supervisor (硕导) at UCAS. Guest Editor of special issues for Remote Sensing, Land and Fire.",
      "I combine animal tracking, Earth observation and geospatial analysis to support conservation and spatial planning for migratory birds.",
    ],
    labNote: `${labCurrentEn}; ${labFormerNoteEn}.`,
    timelineTitle: "Appointments and education",
    timeline: [...CV_TIMELINE.en],
  },
  collaborate: {
    id: "collaborate",
    kicker: "Collaborate",
    title: "International research collaboration",
    intro:
      "The group welcomes collaborators who join animal tracking, wetland remote sensing and conservation-oriented spatial planning along the East Asian–Australasian Flyway.",
    discuss: "Discuss a collaboration",
    discussSubject: "Research collaboration with Kunpeng Yi",
    cards: [
      {
        title: "Research collaboration",
        body: "Shared telemetry, habitat time series, and how migratory birds respond to human activity and extreme climate events. International and domestic partners are equally welcome.",
      },
      {
        title: "Prospective students",
        body: "Master’s supervisor (硕导) at UCAS. Write to the institutional email. This page does not announce a numbered intake.",
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
      "Movement ecology; monitoring and conservation of migratory animals / 运动生态学，迁徙动物监测与保护",
      "Wetland monitoring and ecological restoration / 湿地监测与生态修复",
      "Remote-sensing monitoring and assessment of ecosystems / 生态系统遥感监测与评估",
    ],
  },
  contact: {
    id: "contact",
    kicker: "Contact",
    title: "Contact",
    intro: "Institutional email is the working channel for collaboration.",
    email: "Email",
    phone: "Office",
    address: "Postal address",
    postal: "Postcode",
    researchGate: "ResearchGate",
    scholar: "Google Scholar",
    cas: "CAS profile",
    labProfile: "Laboratory",
    ucas: "UCAS profile",
    github: "Website source",
  },
  footer: {
    identity: `${SITE.nameEn} · ${SITE.nameZh} · ${SITE.titleEn} · ${SITE.orgShortEn}`,
    scope: labCurrentEn,
    former: `Formerly ${SITE.labFormerEn}.`,
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
    projectsIntro: "Two National Natural Science Foundation of China General Programme titles currently hosted. Further programmes are listed on the projects page.",
  },
  projectsPage: {
    title: "Projects",
    body: "PI-led and hosted programmes. Untitled grants are not invented here.",
    intro:
      "Hosted programmes include National Natural Science Foundation of China General Programmes, a National Key R&D Programme sub-project, and locally commissioned wetland-restoration and spatial-planning studies. Combined hosted funding exceeds RMB 8 million across more than ten PI-led projects.",
    roleLabel: "Role",
    sourceLabel: "Source",
    noteLabel: "Note",
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
  projectsHref: "/zh/projects/",
  nav: [
    { id: "research", href: "/zh/#research", label: "研究" },
    { id: "publications", href: "/zh/publications/", label: "论文" },
    { id: "projects", href: "/zh/projects/", label: "项目" },
    { id: "collaborate", href: "/zh/#collaborate", label: "合作" },
    { id: "contact", href: "/zh/#contact", label: "联系" },
  ],
  meta: {
    title: `${SITE.nameZh} · ${SITE.titleZh}，${SITE.orgShortZh}`,
    description: `${SITE.nameZh}，${SITE.orgZh}${SITE.titleZh}，任职于${SITE.labZh}。${SITE.positioningZh}。${SITE.heroLineZh}。`,
    ogLocale: "zh_CN",
  },
  hero: {
    kicker: SITE.positioningZh,
    name: SITE.nameZh,
    nameAlt: SITE.nameEn,
    role: SITE.titleZh,
    affiliation: SITE.orgZh,
    lab: SITE.labZh,
    labFormer: `英文现名 ${labCurrentEn}；曾用名 ${SITE.labFormerEn}`,
    lines: [
      `${SITE.heroLineZh}。`,
      "课题组将动物追踪、湿地地球观测与保护规划结合起来，工作范围覆盖东亚—澳大利西亚迁飞区。",
      "我们与国内外合作者一起，研究候鸟如何利用——以及失去——湿地、流域与能源景观。",
    ],
    explore: "了解研究",
    publications: "代表性论文",
    cv: "下载简历",
    glanceTitle: "研究一览",
    facts: [
      { value: "40余篇", label: "学术论文" },
      { value: "10余项", label: "主持项目" },
      { value: "800余万元", label: "主持经费" },
      { value: "3项", label: "发明专利" },
    ],
  },
  research: {
    id: "research",
    kicker: "标志性研究",
    title: "三项标志性研究计划",
    intro: "运动生态学、地球观测与生物多样性保护交汇处的实验室主线。",
    questionLabel: "科学问题",
    methodsLabel: "数据与方法",
    relevanceLabel: "保护与规划意义",
    themes: [
      {
        id: "movement",
        title: "运动生态学与生物日志",
        question:
          "受胁水鸟如何完成全年生活史——迁徙路线、停歇地、停歇时长与迁徙连通性如何组织？",
        methods:
          "将白枕鹤、白鹤及东亚雁类的 GSM–GPS 生物日志与迁飞区尺度空间数据对接。",
        relevance: "已利用地点与连通性可以指出通道保护薄弱处，以及停歇地栖息地仍在发挥作用的位置。",
      },
      {
        id: "earth-observation",
        title: "湿地地球观测与生态修复",
        question: "当水库、洪泛湿地与修复湿地干湿交替时，栖息地可用性如何变化？",
        methods: "水体、陆地与植被的卫星时间序列，并在已发表研究中使用生境适宜性模型。",
        relevance: "水位管理与湿地修复可以读作候鸟的栖息地供给。",
      },
      {
        id: "energy",
        title: "能源基础设施与候鸟",
        question: "能源设施与迁徙景观在何处重叠，对规划与响应意味着什么？",
        methods: "将基础设施图层叠加到追踪与栖息地地图上，描述重叠、暴露与规划风险。",
        relevance: "重叠、暴露与规划风险图层可用于迁徙景观中的选址与响应。",
        note: "范围说明：仅讨论重叠、暴露、规划风险与响应。",
      },
    ],
  },
  featured: {
    id: "featured",
    kicker: "代表性研究",
    title: "代表性研究",
    intro: "四项已发表研究，展示追踪、湿地遥感与空间规划如何落到具体地点。",
    placeholder: "图示占位 — 本站不转载受版权保护的论文插图。",
    items: [
      {
        id: "miyun",
        title: "密云水库 × 白枕鹤",
        body: "将白枕鹤（Antigone vipio）GSM–GPS 追踪与水库遥感结合，分析密云水位管理与迁徙网络中栖息地可用性的关系。",
        figure: "密云 · 白枕鹤",
        doi: "10.3390/rs15235508",
      },
      {
        id: "siberian",
        title: "白鹤 × 迁飞区保护缺口",
        body: "利用极危物种白鹤（Leucogeranus leucogeranus）的 GPS 追踪识别停歇地，并对照现有保护地网络评估空间覆盖缺口。",
        figure: "白鹤 · 迁飞缺口",
        doi: "10.3390/rs14205101",
      },
      {
        id: "baiyangdian",
        title: "白洋淀 × 青头潜鸭",
        body: "结合 MaxEnt 与 Google Earth Engine，评估白洋淀青头潜鸭（Aythya baeri）的适宜生境。",
        figure: "白洋淀 · 青头潜鸭",
        doi: "10.3390/rs16010064",
      },
      {
        id: "wind",
        title: "风能 × 迁徙",
        body: "扩张中的风能设施与迁徙景观的空间并存，表述为重叠、暴露与规划风险。",
        figure: "风能 · 迁徙",
        doi: "10.59717/j.xinn-geo.2025.100142",
        note: "范围说明：仅讨论重叠、暴露、规划风险与响应。",
      },
    ],
  },
  systems: {
    id: "study-systems",
    kicker: "研究系统",
    title: "迁飞区上的研究系统",
    intro: "示意课题组工作地点。这是概念图，不是已发表地图，也不能替代论文插图。",
    caption: "东亚—澳大利西亚迁飞区研究系统概念图。地点为示意。",
    regions: [
      {
        id: "miyun",
        label: "密云水库",
        body: "北京腹地的水位管理与白枕鹤栖息地。",
      },
      {
        id: "baiyangdian",
        label: "白洋淀",
        body: "修复型洼淀湿地中青头潜鸭的生境适宜性。",
      },
      {
        id: "yangtze",
        label: "长江洪泛湿地",
        body: "洪泛湿地干湿节律，以及白鹤与东亚雁类停歇地覆盖。",
      },
      {
        id: "energy",
        label: "能源景观",
        body: "能源基础设施与迁徙景观的重叠与暴露。",
      },
    ],
  },
  tools: {
    id: "data-tools",
    kicker: "数据与工具",
    title: "数据与工具",
    intro: "主持项目中的追踪数据、栖息地时间序列与空间图层。",
    access: "通过研究合作共享。本网站不提供公开数据下载。",
    items: [
      {
        title: "生物日志轨迹",
        body: "主持项目中受胁水鸟的 GSM–GPS 运动数据。经合作共享，不在本站公开下载。",
      },
      {
        title: "湿地地球观测时间序列",
        body: "水库与洪泛湿地的水体、陆地与植被时间序列，用于从像元读取栖息地可用性。",
      },
      {
        title: "栖息地与迁飞图层",
        body: "已发表研究中的利用地点、适宜性表面与保护地对照图层。",
      },
      {
        title: "规划支持叠加图层",
        body: "用于重叠、暴露与规划风险分析的能源与水域景观图层。",
      },
    ],
  },
  selected: {
    id: "selected-work",
    kicker: "代表性论文",
    title: "代表性论文",
    intro: "构成当前研究主线的短名单。更完整的代表性列表见论文页。",
    read: "DOI",
    more: "全部代表性论文",
  },
  pubs: {
    id: "publications",
    kicker: "论文",
    title: "代表性论文",
    intro: "构成当前研究主线的论文。",
    viewAll: "代表性论文",
    pageTitle: "代表性论文",
    pageIntro:
      "伊坤朋为署名作者的代表性论文，最新在前。完整目录长于本页。仅在确有网址时显示 DOI、PDF、Code、Data、Project 链接。",
    filterAll: "全部",
    filterLabel: "筛选论文",
    empty: "该分类下暂无条目。",
    doi: "DOI",
    pdf: "PDF",
    code: "Code",
    data: "Data",
    project: "Project",
    bibtex: "BibTeX",
    bibtexAll: "复制 BibTeX",
    copied: "已复制",
    yearHeading: "年份",
    filters: filtersZh,
  },
  about: {
    id: "about",
    kicker: "简介",
    title: "伊坤朋",
    lead: `${SITE.orgZh}${SITE.titleZh}。`,
    body: [
      "北海道大学博士。中国科学院空天信息创新研究院（AIRCAS，原遥感与数字地球研究所 RADI）博士后。中国科学院大学硕导。Remote Sensing、Land、Fire 专刊 Guest Editor。",
      "融合动物追踪、地球观测与地理空间分析，服务候鸟保护与空间规划。",
    ],
    labNote: `${SITE.labZh}；英文现名 ${labCurrentEn}，曾用名 ${SITE.labFormerEn}。`,
    timelineTitle: "学历与任职",
    timeline: [...CV_TIMELINE.zh],
  },
  collaborate: {
    id: "collaborate",
    kicker: "合作",
    title: "国际研究合作",
    intro:
      "欢迎在东亚—澳大利西亚迁飞区开展动物追踪、湿地遥感与面向保护的空间规划合作。",
    discuss: "洽谈合作",
    discussSubject: "与伊坤朋洽谈研究合作",
    cards: [
      {
        title: "研究合作",
        body: "共享遥测、栖息地时间序列，以及迁徙鸟类对人类活动与极端气候事件的响应。欢迎国际与国内合作者。",
      },
      {
        title: "意向学生",
        body: "中国科学院大学硕导。请写信至机构邮箱。本页不发布定额招生人数。",
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
    intro: "研究合作请使用机构邮箱。",
    email: "电子邮箱",
    phone: "办公电话",
    address: "通讯地址",
    postal: "邮编",
    researchGate: "ResearchGate",
    scholar: "Google Scholar",
    cas: "中科院页面",
    labProfile: "实验室",
    ucas: "国科大页面",
    github: "网站源码",
  },
  footer: {
    identity: `${SITE.nameZh} · ${SITE.nameEn} · ${SITE.titleZh} · ${SITE.orgShortZh}`,
    scope: SITE.labZh,
    former: `英文现名 ${labCurrentEn}；曾用名 ${SITE.labFormerEn}。`,
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
    projectsIntro: "目前主持的两项国家自然科学基金面上项目。更多项目见项目页。",
  },
  projectsPage: {
    title: "项目",
    body: "主持与负责的科研项目。未确认的课题名称此处不编造。",
    intro:
      "主持项目包括国家自然科学基金面上项目、国家重点研发计划子课题，以及湿地恢复与空间规划方面的地方委托研究。主持项目10余项，主持经费超过800万元。",
    roleLabel: "角色",
    sourceLabel: "来源",
    noteLabel: "说明",
  },
};

export function getCopy(locale: Locale): Copy {
  return locale === "zh" ? zh : en;
}
