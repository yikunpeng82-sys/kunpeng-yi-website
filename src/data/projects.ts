/** Hosted programmes listed on the site. Untitled grants are not invented. */

export interface ProjectItem {
  id: string;
  title: { en: string; zh: string };
  source: { en: string; zh: string };
  dates?: string;
  role: { en: string; zh: string };
  note?: { en: string; zh: string };
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "nsfc-2023",
    title: {
      en: "鸟类多尺度运动行为模式及其迁徙路线核心栖息地监测与保护研究",
      zh: "鸟类多尺度运动行为模式及其迁徙路线核心栖息地监测与保护研究",
    },
    source: {
      en: "NSFC General Programme",
      zh: "国家自然科学基金面上项目",
    },
    dates: "2023.01–2026.12",
    role: { en: "Principal investigator", zh: "主持" },
  },
  {
    id: "nsfc-2019",
    title: {
      en: "基于多源遥感和卫星追踪大数据的鸟类运动行为信息反演研究",
      zh: "基于多源遥感和卫星追踪大数据的鸟类运动行为信息反演研究",
    },
    source: {
      en: "NSFC General Programme",
      zh: "国家自然科学基金面上项目",
    },
    dates: "2019.01–2022.12",
    role: { en: "Principal investigator", zh: "主持" },
  },
  {
    id: "nkrd",
    title: {
      en: "National Key R&D Programme sub-project",
      zh: "国家重点研发计划子课题",
    },
    source: {
      en: "National Key R&D Programme of China",
      zh: "国家重点研发计划",
    },
    role: { en: "Hosted sub-project PI", zh: "主持子课题" },
    note: {
      en: "Official English title and grant number are not listed here pending PI confirmation.",
      zh: "正式课题名称与编号待负责人确认后补列，此处不编造。",
    },
  },
  {
    id: "local",
    title: {
      en: "Locally commissioned wetland-restoration and spatial-planning studies",
      zh: "湿地恢复与空间规划方面的地方委托研究",
    },
    source: {
      en: "Local commissions",
      zh: "地方委托",
    },
    role: { en: "Principal investigator / hosted", zh: "主持" },
    note: {
      en: "Application contexts mentioned in the academic CV include Sino BON, typical degraded-wetland restoration in Northeast China, bird-habitat planning for the Xiong'an New Area, and Nanchang territorial spatial planning (2019–2035). Individual contract titles are not listed here.",
      zh: "学术简历中提及的应用语境包括 Sino BON、东北典型退化湿地恢复、雄安新区鸟类栖息地规划、南昌市国土空间规划（2019–2035）。具体合同名称此处不编列。",
    },
  },
];
