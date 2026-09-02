/**
 * Seeded publications confirmed from Crossref and official RCEES/CAS lists.
 * No live Scholar scrape. Citation counts are intentionally omitted.
 * Papers without a verified DOI are listed with source notes only.
 */

export const FILTERS = [
  "movement",
  "remote-sensing",
  "wetlands",
  "energy",
  "disturbance",
] as const;

export type FilterId = (typeof FILTERS)[number];

export type Locale = "en" | "zh";

export interface Publication {
  id: string;
  year: number;
  title: string;
  authors: string[];
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  filters: FilterId[];
  selected?: boolean;
  home?: boolean;
  note?: string;
  summary: Record<Locale, string>;
}

export const FILTER_LABELS: Record<FilterId, Record<Locale, string>> = {
  movement: { en: "Movement Ecology", zh: "运动生态学" },
  "remote-sensing": { en: "Remote Sensing", zh: "遥感" },
  wetlands: { en: "Wetlands", zh: "湿地" },
  energy: { en: "Energy & Biodiversity", zh: "能源与生物多样性" },
  disturbance: { en: "Ecosystem Disturbance", zh: "生态系统扰动" },
};

export const publications: Publication[] = [
  {
    id: "yu-2026-ecoinf",
    year: 2026,
    title:
      "Bird diversity responses to mega-events influence: A case study of the Beijing 2022 Winter Olympics",
    authors: ["Mingzhao Yu", "Luqin Yin", "Kunpeng Yi"],
    journal: "Ecological Informatics",
    volume: "93",
    pages: "103594",
    doi: "10.1016/j.ecoinf.2025.103594",
    filters: ["remote-sensing"],
    home: true,
    summary: {
      en: "A case study of bird-diversity responses associated with the Beijing 2022 Winter Olympics, as recorded in Crossref.",
      zh: "以北京2022年冬奥会为例，讨论大型活动影响下的鸟类多样性响应（Crossref 记录）。",
    },
  },
  {
    id: "zhang-2025-xinn",
    year: 2025,
    title: "Rapid development of wind energy infrastructure threatens bird migration",
    authors: ["Xinmin Zhang", "Wenqiang Wan", "Hong Yang", "Kunpeng Yi"],
    journal: "The Innovation Geoscience",
    volume: "3",
    issue: "3",
    pages: "100142",
    doi: "10.59717/j.xinn-geo.2025.100142",
    filters: ["energy", "movement"],
    selected: true,
    home: true,
    summary: {
      en: "Crossref-confirmed article on wind-energy infrastructure and bird migration. Spatial coincidence of energy facilities and migratory landscapes is treated here as a planning question, not as measured collision or demographic impact.",
      zh: "Crossref 确认的文章，讨论风能基础设施与鸟类迁徙。能源设施与迁徙景观的空间并存在此作为规划问题陈述，不引申为碰撞或种群影响的实测结论。",
    },
  },
  {
    id: "yin-2024-residue",
    year: 2024,
    title:
      "Temporal and Spatial Dynamics of Summer Crop Residue Burning Practices in North China: Exploring the Influence of Climate Change and Anthropogenic Factors",
    authors: [
      "Shuai Yin",
      "Kunpeng Yi",
      "Xiu Zhang",
      "Tangzhe Nie",
      "Lingqi Meng",
      "Zhongyi Sun",
      "Qingnan Chu",
      "Zhipin Ai",
      "Xin Zhao",
      "Lan Wu",
      "Meng Guo",
      "Xinlu Liu",
    ],
    journal: "Remote Sensing",
    volume: "16",
    issue: "24",
    pages: "4763",
    doi: "10.3390/rs16244763",
    filters: ["remote-sensing", "disturbance"],
    summary: {
      en: "Satellite analysis of summer crop-residue burning across North China in relation to climate and human drivers.",
      zh: "利用卫星数据分析华北夏季秸秆焚烧的时空动态及其气候与人为驱动因素。",
    },
  },
  {
    id: "tian-2024-baeri",
    year: 2024,
    title:
      "Evaluation of Suitable Habitats for Birds Based on MaxEnt and Google Earth Engine—A Case Study of Baer’s Pochard (Aythya baeri) in Baiyangdian, China",
    authors: [
      "Zengrui Tian",
      "Da Huo",
      "Kunpeng Yi",
      "Jialiang Que",
      "Zhenguang Lu",
      "Jianhua Hou",
    ],
    journal: "Remote Sensing",
    volume: "16",
    issue: "1",
    pages: "64",
    doi: "10.3390/rs16010064",
    filters: ["wetlands", "remote-sensing"],
    home: true,
    summary: {
      en: "MaxEnt and Google Earth Engine are used to evaluate suitable habitat for Baer’s Pochard at Baiyangdian.",
      zh: "结合 MaxEnt 与 Google Earth Engine，评估白洋淀青头潜鸭的适宜生境。",
    },
  },
  {
    id: "yi-2023-miyun",
    year: 2023,
    title:
      "Optimizing Water Level Management Strategies to Strengthen Reservoir Support for Bird’s Migration Network",
    authors: ["Kunpeng Yi", "Fanjuan Meng", "Dehai Gu", "Qingyuan Miao"],
    journal: "Remote Sensing",
    volume: "15",
    issue: "23",
    pages: "5508",
    doi: "10.3390/rs15235508",
    filters: ["wetlands", "movement", "remote-sensing"],
    selected: true,
    home: true,
    summary: {
      en: "GSM–GPS tracking of white-naped cranes is combined with reservoir imagery to relate Miyun water-level management to habitat availability in a migration network.",
      zh: "将白枕鹤 GSM–GPS 追踪与水库遥感结合，分析密云水库水位管理与迁徙网络中栖息地可用性的关系。",
    },
  },
  {
    id: "yi-2023-green",
    year: 2023,
    title:
      "Trends of greening and browning in terrestrial vegetation in China from 2000 to 2020",
    authors: [
      "Kunpeng Yi",
      "Xueming Zhao",
      "Zhaoju Zheng",
      "Dan Zhao",
      "Yuan Zeng",
    ],
    journal: "Ecological Indicators",
    volume: "154",
    pages: "110587",
    doi: "10.1016/j.ecolind.2023.110587",
    filters: ["remote-sensing"],
    summary: {
      en: "National-scale satellite trends of vegetation greening and browning across China, 2000–2020.",
      zh: "基于卫星观测的 2000–2020 年中国陆地植被绿化与褐化趋势。",
    },
  },
  {
    id: "yi-2022-siberian",
    year: 2022,
    title:
      "Using Tracking Data to Identify Gaps in Knowledge and Conservation of the Critically Endangered Siberian Crane (Leucogeranus leucogeranus)",
    authors: [
      "Kunpeng Yi",
      "Junjian Zhang",
      "Nyambayar Batbayar",
      "Hiroyoshi Higuchi",
      "Tseveenmyadag Natsagdorj",
      "Inga P. Bysykatova",
    ],
    journal: "Remote Sensing",
    volume: "14",
    issue: "20",
    pages: "5101",
    doi: "10.3390/rs14205101",
    filters: ["movement", "wetlands"],
    selected: true,
    home: true,
    summary: {
      en: "GPS tracking of Siberian Cranes is used to map staging sites and compare used areas with the current protected-area network.",
      zh: "利用白鹤 GPS 追踪识别停歇地，并对照现有保护地网络评估空间覆盖缺口。",
    },
  },
  {
    id: "bao-2022-fire",
    year: 2022,
    title:
      "Satellite-Based Analysis of Spatiotemporal Wildfire Pattern in the Mongolian Plateau",
    authors: [
      "Yulong Bao",
      "Masato Shinoda",
      "Kunpeng Yi",
      "Xiaoman Fu",
      "Long Sun",
      "Elbegjargal Nasanbat",
      "Na Li",
      "Honglin Xiang",
      "Yan Yang",
      "Bulgan DavdaiJavzmaa",
      "Banzragch Nandintsetseg",
    ],
    journal: "Remote Sensing",
    volume: "15",
    issue: "1",
    pages: "190",
    doi: "10.3390/rs15010190",
    filters: ["remote-sensing", "disturbance"],
    summary: {
      en: "Satellite mapping of wildfire spatiotemporal patterns on the Mongolian Plateau.",
      zh: "基于卫星的蒙古高原野火时空格局分析。",
    },
  },
  {
    id: "ren-2022-wind",
    year: 2022,
    title: "优化风电场和电网布局以避免鸟撞",
    authors: ["Xichan Ren", "Kunpeng Yi", "Lei Cao"],
    journal: "环境保护科学",
    volume: "48",
    issue: "3",
    pages: "13-19",
    filters: ["energy"],
    note: "Listed on the official RCEES laboratory profile as 任西婵, 伊坤朋, 曹垒. 环境保护科学, 2022, 48(3): 13-19. No Crossref DOI verified at build time.",
    summary: {
      en: "Chinese-language article on optimizing wind-farm and power-grid layout to reduce bird-strike risk. Spatial layout is treated as a planning question, not as measured collision rates. No Crossref DOI verified at build time.",
      zh: "讨论优化风电场与电网布局以降低鸟撞风险。空间布局在此作为规划问题，不引申为碰撞率实测。构建时未在 Crossref 核验到 DOI。实验室主页著录：环境保护科学, 2022, 48(3): 13-19。",
    },
  },
  {
    id: "batbayar-2021-vipio",
    year: 2021,
    title:
      "Combining Tracking and Remote Sensing to Identify Critical Year-Round Site, Habitat Use and Migratory Connectivity of a Threatened Waterbird Species",
    authors: [
      "Nyambayar Batbayar",
      "Kunpeng Yi",
      "Junjian Zhang",
      "Tseveenmyadag Natsagdorj",
      "Iderbat Damba",
      "Lei Cao",
      "Anthony David Fox",
    ],
    journal: "Remote Sensing",
    volume: "13",
    issue: "20",
    pages: "4049",
    doi: "10.3390/rs13204049",
    filters: ["movement", "remote-sensing", "wetlands"],
    selected: true,
    home: true,
    summary: {
      en: "Multi-year GSM–GPS tracking of western-flyway white-naped cranes is combined with remote sensing to identify year-round sites, habitat use and migratory connectivity.",
      zh: "对西部路线白枕鹤开展多年 GSM–GPS 追踪，并结合遥感识别全年关键地点、栖息地利用与迁徙连通性。",
    },
  },
  {
    id: "damba-2021-swan",
    year: 2021,
    title:
      "Seasonal and regional differences in migration patterns and conservation status of Swan Geese (Anser cygnoides) in the East Asian Flyway",
    authors: [
      "Iderbat Damba",
      "Junjian Zhang",
      "Kunpeng Yi",
      "Huashan Dou",
      "Nyambayar Batbayar",
      "Tseveenmyadag Natsagdorj",
      "Batmunkh Davaasuren",
      "Lei Cao",
      "Anthony David Fox",
    ],
    journal: "Avian Research",
    volume: "12",
    issue: "1",
    pages: "73",
    doi: "10.1186/s40657-021-00308-y",
    filters: ["movement"],
    summary: {
      en: "Telemetry-based comparison of Swan Goose migration patterns and conservation status across the East Asian Flyway.",
      zh: "基于遥测比较东亚迁飞区鸿雁迁徙格局与保护状况的季节与区域差异。",
    },
  },
  {
    id: "li-2020-snowmelt",
    year: 2020,
    title:
      "Does snowmelt constrain spring migration progression in sympatric wintering Arctic-nesting geese? Results from a Far East Asia telemetry study",
    authors: [
      "Hongbin Li",
      "Lei Fang",
      "Xin Wang",
      "Kunpeng Yi",
      "Lei Cao",
      "Anthony D. Fox",
    ],
    journal: "Ibis",
    volume: "162",
    issue: "2",
    pages: "548-555",
    doi: "10.1111/ibi.12767",
    filters: ["movement"],
    summary: {
      en: "Far East Asian telemetry is used to test whether snowmelt constrains spring migration in sympatric Arctic-nesting geese.",
      zh: "利用远东遥测数据检验融雪是否制约同域越冬的北极繁殖雁类春季迁徙进程。",
    },
  },
  {
    id: "zhu-2020-dispersal",
    year: 2020,
    title:
      "Lack of conspicuous sex-biased dispersal patterns at different spatial scales in an Asian endemic goose species breeding in unpredictable steppe wetlands",
    authors: [
      "Qin Zhu",
      "Iderbat Damba",
      "Qingshan Zhao",
      "Kunpeng Yi",
      "Nyambayar Batbayar",
      "Tseveenmyadag Natsagdorj",
      "Batmunkh Davaasuren",
      "Xin Wang",
      "Sonia Rozenfeld",
      "Sachiko Moriguchi",
      "Aibin Zhan",
      "Lei Cao",
      "Anthony D. Fox",
    ],
    journal: "Ecology and Evolution",
    volume: "10",
    pages: "7006-7020",
    doi: "10.1002/ece3.6382",
    filters: ["movement", "wetlands"],
    summary: {
      en: "Dispersal structure of an Asian endemic goose breeding in steppe wetlands is examined across spatial scales.",
      zh: "分析一种在不可预测草原湿地繁殖的亚洲特有雁类在不同空间尺度上的扩散格局。",
    },
  },
  {
    id: "damba-2020-wildfowl",
    year: 2020,
    title:
      "Flyway structure, breeding, migration and wintering distributions of the globally threatened Swan Goose Anser cygnoides in East Asia",
    authors: [
      "Iderbat Damba",
      "Lei Fang",
      "Kunpeng Yi",
      "Junjian Zhang",
      "Nyambayar Batbayar",
      "Jianying You",
      "Oun-Kyong Moon",
      "Seon-Deok Jin",
      "Bo Feng Liu",
      "Guanhua Liu",
      "Wenbin Xu",
      "Binhua Hu",
      "Songtao Liu",
      "Jinyoung Park",
      "Hwajung Kim",
      "Kazuo Koyama",
      "Tseveenmyadag Natsagdorj",
      "Batmunkh Davaasuren",
      "Hansoo Lee",
      "Oleg Goroshko",
      "Qin Zhu",
      "Luyuan Ge",
      "Lei Cao",
      "Anthony D. Fox",
    ],
    journal: "Wildfowl",
    pages: "97-123",
    filters: ["movement"],
    note: "Listed on the official RCEES laboratory profile. No Crossref DOI verified at build time.",
    summary: {
      en: "Official-list paper on Swan Goose flyway structure and seasonal distributions in East Asia. DOI not verified in Crossref at build time.",
      zh: "实验室主页收录的鸿雁迁飞区结构与季节分布研究。构建时未在 Crossref 核验到 DOI。",
    },
  },
  {
    id: "yan-2020-greylag",
    year: 2020,
    title:
      "Flyway connectivity and population status of the Greylag Goose Anser anser in East Asia",
    authors: [
      "Ming Yan",
      "Kunpeng Yi",
      "Junjian Zhang",
      "Nyambayar Batbayar",
      "Zhenggang Xu",
      "Guanhua Liu",
      "Binhua Hu",
      "Bofu Zheng",
      "Aleksei Antonov",
      "Oleg Goroshko",
      "Gerelt Zhao",
      "Batmunkh Davaasuren",
      "Tuvshinjargal Erdenechimeg",
      "Jugdernamjil Nergui",
      "Iderbat Damba",
      "Lei Cao",
      "Anthony D. Fox",
    ],
    journal: "Wildfowl",
    volume: "6",
    pages: "157-180",
    filters: ["movement"],
    note: "Listed on the official RCEES laboratory profile. No Crossref DOI verified at build time.",
    summary: {
      en: "Official-list paper on Greylag Goose flyway connectivity and population status in East Asia. DOI not verified in Crossref at build time.",
      zh: "实验室主页收录的灰雁迁飞连通性与种群状况研究。构建时未在 Crossref 核验到 DOI。",
    },
  },
  {
    id: "mao-2018-wetlands",
    year: 2018,
    title: "China's wetlands loss to urban expansion",
    authors: [
      "Dehua Mao",
      "Zongming Wang",
      "Jianguo Wu",
      "Bingfang Wu",
      "Yuan Zeng",
      "Kaishan Song",
      "Kunpeng Yi",
      "Lin Luo",
    ],
    journal: "Land Degradation & Development",
    volume: "29",
    issue: "8",
    pages: "2644-2657",
    doi: "10.1002/ldr.2939",
    filters: ["wetlands", "remote-sensing"],
    summary: {
      en: "National assessment of wetland loss associated with urban expansion in China.",
      zh: "评估中国城镇化扩张导致的湿地丧失。",
    },
  },
  {
    id: "wang-2018-taiga",
    year: 2018,
    title:
      "The Far East taiga forest: unrecognized inhospitable terrain for migrating Arctic-nesting waterbirds?",
    authors: [
      "Xin Wang",
      "Lei Cao",
      "Inga Bysykatova",
      "Zhenggang Xu",
      "Sonia Rozenfeld",
      "Wooseog Jeong",
      "Didier Vangeluwe",
      "Yunlin Zhao",
      "Tianhe Xie",
      "Kunpeng Yi",
      "Anthony David Fox",
    ],
    journal: "PeerJ",
    volume: "6",
    pages: "e4353",
    doi: "10.7717/peerj.4353",
    filters: ["movement"],
    summary: {
      en: "Tracking-informed discussion of whether Far East taiga is inhospitable terrain for Arctic-nesting waterbirds on migration.",
      zh: "结合追踪讨论远东泰加林是否构成北极繁殖水鸟迁徙中的不利地形。",
    },
  },
  {
    id: "yi-2017-fire",
    year: 2017,
    title: "Spatial distribution and temporal variability of open fire in China",
    authors: ["Kunpeng Yi", "Yulong Bao", "Jiquan Zhang"],
    journal: "International Journal of Wildland Fire",
    volume: "26",
    issue: "2",
    pages: "122-135",
    doi: "10.1071/WF15213",
    filters: ["disturbance", "remote-sensing"],
    summary: {
      en: "Satellite-based analysis of the spatial distribution and temporal variability of open fire in China.",
      zh: "基于卫星的中国开放火空间分布与时间变率分析。",
    },
  },
  {
    id: "yi-2016-urban",
    year: 2016,
    title:
      "Mapping and evaluation the process, pattern and potential of urban growth in China",
    authors: ["Kunpeng Yi", "Yuan Zeng", "Bingfang Wu"],
    journal: "Applied Geography",
    volume: "71",
    pages: "44-55",
    doi: "10.1016/j.apgeog.2016.04.011",
    filters: ["remote-sensing"],
    summary: {
      en: "Mapping and evaluation of urban-growth process, pattern and potential in China.",
      zh: "中国城镇增长过程、格局与潜力的遥感制图与评估。",
    },
  },
  {
    id: "yi-2016-emissions",
    year: 2016,
    title: "Estimates of Wildfire Emissions in Boreal Forests of China",
    authors: ["Kunpeng Yi", "Yulong Bao"],
    journal: "Forests",
    volume: "7",
    issue: "8",
    pages: "158",
    doi: "10.3390/f7080158",
    filters: ["disturbance", "remote-sensing"],
    summary: {
      en: "Estimates of wildfire emissions from boreal forests in China.",
      zh: "中国北方林野火排放估算。",
    },
  },
  {
    id: "yi-2014-dmsp",
    year: 2014,
    title:
      "Mapping and Evaluating the Urbanization Process in Northeast China Using DMSP/OLS Nighttime Light Data",
    authors: [
      "Kunpeng Yi",
      "Hiroshi Tani",
      "Qiang Li",
      "Jiquan Zhang",
      "Meng Guo",
      "Yulong Bao",
      "Xiufeng Wang",
      "Jing Li",
    ],
    journal: "Sensors",
    volume: "14",
    issue: "2",
    pages: "3207-3226",
    doi: "10.3390/s140203207",
    filters: ["remote-sensing"],
    summary: {
      en: "DMSP/OLS nighttime lights are used to map and evaluate urbanization in Northeast China.",
      zh: "利用 DMSP/OLS 夜间灯光数据制图并评估东北城镇化过程。",
    },
  },
  {
    id: "yi-2013-postfire",
    year: 2013,
    title:
      "Long-Term Satellite Detection of Post-Fire Vegetation Trends in Boreal Forests of China",
    authors: [
      "Kunpeng Yi",
      "Hiroshi Tani",
      "Jiquan Zhang",
      "Meng Guo",
      "Xiufeng Wang",
      "Guosheng Zhong",
    ],
    journal: "Remote Sensing",
    volume: "5",
    issue: "12",
    pages: "6938-6957",
    doi: "10.3390/rs5126938",
    filters: ["disturbance", "remote-sensing"],
    summary: {
      en: "Long-term satellite detection of post-fire vegetation trends in China’s boreal forests.",
      zh: "卫星长时间序列检测中国北方林火后植被趋势。",
    },
  },
  {
    id: "guo-2012-gosat",
    year: 2012,
    title: "Assessment of Global Carbon Dioxide Concentration Using MODIS and GOSAT Data",
    authors: [
      "Meng Guo",
      "Xiufeng Wang",
      "Jing Li",
      "Kunpeng Yi",
      "Guosheng Zhong",
      "Hiroshi Tani",
    ],
    journal: "Sensors",
    volume: "12",
    issue: "12",
    pages: "16368-16389",
    doi: "10.3390/s121216368",
    filters: ["remote-sensing"],
    summary: {
      en: "MODIS and GOSAT observations are used to assess global carbon dioxide concentration.",
      zh: "利用 MODIS 与 GOSAT 数据评估全球二氧化碳浓度。",
    },
  },
];

export function doiUrl(doi: string): string {
  return `https://doi.org/${doi}`;
}

export function formatAuthors(authors: string[], locale: Locale): string {
  const marked = authors.map((name) =>
    name === "Kunpeng Yi" ? (locale === "zh" ? "易昆鹏" : "Kunpeng Yi") : name,
  );
  return marked.join(", ");
}

export function byYearDesc(items: Publication[]): Publication[] {
  return [...items].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return a.title.localeCompare(b.title);
  });
}

export function homePublications(): Publication[] {
  const featured = byYearDesc(publications.filter((p) => p.home));
  return featured.slice(0, 6);
}

export function selectedPublications(): Publication[] {
  return byYearDesc(publications.filter((p) => p.selected));
}

export function filterPublications(filter: FilterId | "all"): Publication[] {
  const list = byYearDesc(publications);
  if (filter === "all") return list;
  return list.filter((p) => p.filters.includes(filter));
}

export function groupedByYear(
  items: Publication[] = publications,
): Array<{ year: number; papers: Publication[] }> {
  const groups = new Map<number, Publication[]>();
  for (const paper of byYearDesc(items)) {
    const list = groups.get(paper.year) ?? [];
    list.push(paper);
    groups.set(paper.year, list);
  }
  return [...groups.entries()].map(([year, papers]) => ({ year, papers }));
}
