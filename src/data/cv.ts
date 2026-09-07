import { SITE } from "./site";

export const CV_TIMELINE = {
  en: [
    {
      role: "Associate Professor",
      place: `${SITE.orgEn}; ${SITE.labEn} (${SITE.labEnShort}) · April 2017 – present`,
    },
    {
      role: "Postdoctoral Fellow, Ecological Remote Sensing",
      place:
        "Aerospace Information Research Institute, Chinese Academy of Sciences (AIRCAS), formerly RADI · August 2014 – April 2017",
    },
    {
      role: "Ph.D., Remote Sensing",
      place:
        "Hokkaido University · October 2010 – June 2014. Thesis: 遥感卫星观测及模型在生物质火烧中的应用研究",
    },
    {
      role: "M.Sc., Physical Geography",
      place: "Northeast Normal University · September 2008 – July 2010",
    },
    {
      role: "B.Sc., Geography",
      place: "Harbin College · September 2003 – July 2007",
    },
  ],
  zh: [
    {
      role: "副研究员",
      place: `${SITE.orgZh}、${SITE.labZh} · 2017年4月至今`,
    },
    {
      role: "博士后（生态遥感）",
      place:
        "中国科学院空天信息创新研究院（AIRCAS，原遥感与数字地球研究所 RADI） · 2014年8月–2017年4月",
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
  enPdf: SITE.cvEn,
  zhPdf: SITE.cvZh,
  enBio: SITE.bioEn,
  zhBio: SITE.bioZh,
} as const;

export const CV_RESEARCH_EN =
  "Research addresses global climate change and eco-environmental remote sensing. Typical ecosystems—wetlands, forests and grasslands—in cities, nature reserves and national parks are examined in relation to drought, flood, wildfire and other extreme meteorological hazards. Threatened migratory birds are treated as indicator species for migration mechanisms, flyway-corridor conservation, and responses to human activity and extreme climate events. Applications include Sino BON, restoration of typical degraded wetlands in Northeast China, bird-habitat planning for the Xiong'an New Area, Nanchang territorial spatial planning (2019–2035), and a bird-strike risk early-warning system.";

export const CV_OVERVIEW_ZH =
  "日本北海道大学博士，中国科学院空天信息创新研究院（原遥感与数字地球研究所）博士后，现为中国科学院生态环境研究中心副研究员。主要从事全球气候变化与生态环境遥感监测研究。以城市、自然保护区、国家公园内的湿地、森林、草地等典型生态系统为目标，研究干旱、洪涝、野火等极端气象灾害对生态系统的影响机制。以珍稀濒危的迁徙鸟类为生态系统的指示物种，探究鸟类迁徙机制、候鸟迁飞通道保护策略、迁徙鸟类对人类活动和极端气候事件响应和反馈机制。相关成果服务于 Sino BON、东北典型退化湿地恢复与重建技术及示范、雄安新区鸟类栖息地规划、南昌市国土空间规划（2019-2035）及鸟撞风险预警系统等。主持国家自然科学基金、国家重点研发计划子课题、地方委托等科研项目10余项，主持项目总经费800余万元，发表学术论文40余篇，发明专利3项，参编专著2部。";

export const CV_DIRECTION_ZH = "生态环境遥感研究";

export const CV_THESIS_ZH = "遥感卫星观测及模型在生物质火烧中的应用研究";

export const CV_INQUIRY_FIELDS = {
  en: [
    "Remote sensing science",
    "Geographic information science",
    "Ecology",
    "Geography",
  ],
  zh: ["遥感科学", "地理信息系统科学", "生态学", "地理学"],
} as const;

export const CV_STUDENT_DIRECTIONS = {
  zh: [
    "运动生态学，迁徙动物监测与保护",
    "湿地监测与生态修复",
    "生态系统遥感监测与评估",
  ],
  en: [
    "Movement ecology; monitoring and conservation of migratory animals",
    "Wetland monitoring and ecological restoration",
    "Remote-sensing monitoring and assessment of ecosystems",
  ],
} as const;

export const CV_MAJORS = {
  zh: [
    "071300生态学",
    "0705Z1自然资源学",
    "070503地图学与地理信息系统",
  ],
  en: [
    "071300 Ecology",
    "0705Z1 Natural Resources Science",
    "070503 Cartography and Geographic Information Systems",
  ],
} as const;

export const CV_SERVICE = {
  en: "Council member, China Grassland Society. Member of the Geographical Society of China, the Ecological Society of China, the Chinese Society of Remote Sensing, and the China Ornithological Society. Guest Editor of special issues for Remote Sensing, Land and Fire.",
  zh: "中国草学会理事；中国地理学会、中国生态学会、中国遥感学会、中国鸟类学会会员；Remote Sensing、Land、Fire 专刊 Guest Editor。",
} as const;

export const CV_HOSTED_PROJECTS = {
  en: [
    {
      title: "鸟类多尺度运动行为模式及其迁徙路线核心栖息地监测与保护研究",
      source: "NSFC General Programme",
      dates: "2023.01–2026.12",
      role: "Principal investigator",
    },
    {
      title: "基于多源遥感和卫星追踪大数据的鸟类运动行为信息反演研究",
      source: "NSFC General Programme",
      dates: "2019.01–2022.12",
      role: "Principal investigator",
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
