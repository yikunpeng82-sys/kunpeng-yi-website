import { SITE } from "./site";

/** Compact appointments from the author-supplied English CV. No private fields. */
export const CV_TIMELINE = {
  en: [
    {
      role: "Associate Researcher / Associate Professor",
      place:
        "RCEES, CAS · Apr 2017 – present (CAS faculty page also lists 助理研究员 for this appointment)",
    },
    {
      role: "Postdoctoral Fellow (Ecological Remote Sensing)",
      place:
        "Institute of Space and Earth Information Innovation, CAS (Aerospace Information Research Institute / former RADI) · Aug 2014 – Apr 2017",
    },
    {
      role: "Ph.D., Remote Sensing",
      place:
        "Hokkaido University · Oct 2010 – Jun 2014. Thesis: 遥感卫星观测及模型在生物质火烧中的应用研究",
    },
    {
      role: "M.Sc., Physical Geography",
      place: "Northeast Normal University · Sep 2008 – Jul 2010",
    },
    {
      role: "B.Sc., Geography",
      place: "Harbin College · Sep 2003 – Jul 2007",
    },
  ],
  zh: [
    {
      role: "副研究员、助理研究员",
      place:
        "中国科学院生态环境研究中心 · 2017年4月至今（院所页面同期列出两职称）",
    },
    {
      role: "博士后（生态遥感）",
      place:
        "中国科学院空天信息创新研究院（原遥感与数字地球研究所） · 2014年8月–2017年4月",
    },
    {
      role: "遥感科学博士",
      place:
        "北海道大学 · 2010年10月–2014年6月。学位论文：遥感卫星观测及模型在生物质火烧中的应用研究",
    },
    {
      role: "自然地理学硕士",
      place: "东北师范大学 · 2008年9月–2010年7月",
    },
    {
      role: "地理学学士",
      place: "哈尔滨学院 · 2003年9月–2007年7月",
    },
  ],
} as const;

export const CV_FILES = {
  enPdf: "/cv/kunpeng-yi-cv-en.pdf",
  zhPdf: "/cv/kunpeng-yi-cv-zh.pdf",
  enDocx: "/cv/kunpeng-yi-cv-en.docx",
  zhDocx: "/cv/kunpeng-yi-cv-zh.docx",
} as const;

export const CV_RESEARCH_EN =
  "Research addresses global climate change and eco-environmental remote sensing. Typical ecosystems—wetlands, forests and grasslands—in cities, nature reserves and national parks are examined in relation to drought, flood, wildfire and other extreme meteorological hazards. Threatened migratory birds are treated as indicator species for migration mechanisms, flyway-corridor conservation, and responses to human activity and extreme climate events. Applications include Sino BON, restoration of typical degraded wetlands in Northeast China, bird-habitat planning for the Xiong'an New Area, Nanchang territorial spatial planning (2019–2035), and a bird-strike risk early-warning system. The public site is positioned as Movement Ecology × Earth Observation × Biodiversity Conservation.";

export const CV_OVERVIEW_ZH =
  "日本北海道大学博士，中国科学院遥感与数字地球研究所（空天院）博士后，现为中国科学院生态环境研究中心副研究员。主要从事全球气候变化与生态环境遥感监测研究。以城市、自然保护区、国家公园内的湿地、森林、草地等典型生态系统为目标，研究干旱、洪涝、野火等极端气象灾害对生态系统的影响机制。以珍稀濒危的迁徙鸟类为生态系统的指示物种，探究鸟类迁徙机制、候鸟迁飞通道保护策略、迁徙鸟类对人类活动和极端气候事件响应和反馈机制。相关成果服务于 Sino BON、东北典型退化湿地恢复与重建技术及示范、雄安新区鸟类栖息地规划、南昌市国土空间规划（2019-2035）及鸟撞风险预警系统等。主持国自然科学基金、国家重点研发子课题、地方委托等科研项目10余项，主持项目总经费800余万元，发表学术论文40余篇，发明专利3项，参编专著2部。";

export const CV_DIRECTION_ZH = "生态环境遥感研究";

export const CV_THESIS_ZH =
  "遥感卫星观测及模型在生物质火烧中的应用研究";

export const CV_INQUIRY_FIELDS = {
  en: [
    "Remote sensing science",
    "Geographic information science",
    "Ecology",
    "Geography",
  ],
  zh: ["遥感科学", "地理信息系统科学", "生态学", "地理学"],
} as const;

export const CV_SERVICE = {
  en: "China Grassland Society (council member). Member of the Geographical Society of China, the Ecological Society of China, the Chinese Society of Remote Sensing, and the China Ornithological Society. Guest-in-chief editor of special issues for Remote Sensing, Land and Fire.",
  zh: "中国草学会理事；中国地理学会、中国生态学会、中国遥感学会、中国鸟类学会会员；Remote Sensing、Land、Fire 专刊 guest-in-chief editor。",
} as const;

/** Hosted NSFC titles from the RCEES faculty page — CV / compact list only. */
export const CV_HOSTED_PROJECTS = {
  en: [
    {
      title: "鸟类多尺度运动行为模式及其迁徙路线核心栖息地监测与保护研究",
      source: "NSFC General Programme",
      dates: "2023.01–2026.12",
      role: "Host / 主持",
    },
    {
      title: "基于多源遥感和卫星追踪大数据的鸟类运动行为信息反演研究",
      source: "NSFC General Programme",
      dates: "2019.01–2022.12",
      role: "Host / 主持",
    },
  ],
  zh: [
    {
      title: "鸟类多尺度运动行为模式及其迁徙路线核心栖息地监测与保护研究",
      source: "国家自然科学基金面上项目",
      dates: "2023.01–2026.12",
      role: "主持",
    },
    {
      title: "基于多源遥感和卫星追踪大数据的鸟类运动行为信息反演研究",
      source: "国家自然科学基金面上项目",
      dates: "2019.01–2022.12",
      role: "主持",
    },
  ],
} as const;

export const CV_IDENTITY = {
  nameEn: SITE.nameEn,
  nameZh: SITE.nameZh,
  degree: "Ph.D.",
  positionEn: `${SITE.titleEn}, ${SITE.orgEn}`,
  positionZh: `${SITE.orgZh}${SITE.titleZh}`,
} as const;
