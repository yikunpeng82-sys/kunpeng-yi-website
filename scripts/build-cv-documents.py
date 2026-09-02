#!/usr/bin/env python3
"""Build EN/ZH CV PDF and DOCX from the author-supplied academic record.

Website UI never includes gender, place of birth, private phone, or home address.
Those fields are also omitted here because the original docx binaries were not
on the VM; this reconstructs the public academic text only.
"""

from __future__ import annotations

from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt, RGBColor
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "cv"

NAVY = HexColor("#0b1f33")
WETLAND = HexColor("#1c4a3c")
INK = HexColor("#12202b")
MUTED = HexColor("#3a4650")

pdfmetrics.registerFont(TTFont("LibSerif", "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"))
pdfmetrics.registerFont(TTFont("LibSerif-Bold", "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"))
pdfmetrics.registerFont(TTFont("WQY", "/usr/share/fonts/truetype/wqy/wqy-microhei.ttc"))

PAPERS = [
    "Yu, M., Yin, L. & Yi, K. (2026). Bird diversity responses to mega-events influence: A case study of the Beijing 2022 Winter Olympics. Ecological Informatics 93: 103594. doi:10.1016/j.ecoinf.2025.103594",
    "Zhang, X., Wan, W., Yang, H. & Yi, K. (2025). Rapid development of wind energy infrastructure threatens bird migration. The Innovation Geoscience 3(3): 100142. doi:10.59717/j.xinn-geo.2025.100142",
    "Yin, S., Yi, K., Zhang, X., Nie, T., Meng, L., Sun, Z., Chu, Q., Ai, Z., Zhao, X., Wu, L., Guo, M. & Liu, X. (2024). Temporal and Spatial Dynamics of Summer Crop Residue Burning Practices in North China. Remote Sensing 16(24): 4763. doi:10.3390/rs16244763",
    "Tian, Z., Huo, D., Yi, K., Que, J., Lu, Z. & Hou, J. (2024). Evaluation of Suitable Habitats for Birds Based on MaxEnt and Google Earth Engine—A Case Study of Baer’s Pochard (Aythya baeri) in Baiyangdian, China. Remote Sensing 16(1): 64. doi:10.3390/rs16010064",
    "Yi, K., Meng, F., Gu, D. & Miao, Q. (2023). Optimizing Water Level Management Strategies to Strengthen Reservoir Support for Bird’s Migration Network. Remote Sensing 15(23): 5508. doi:10.3390/rs15235508",
    "Yi, K., Zhao, X., Zheng, Z., Zhao, D. & Zeng, Y. (2023). Trends of greening and browning in terrestrial vegetation in China from 2000 to 2020. Ecological Indicators 154: 110587. doi:10.1016/j.ecolind.2023.110587",
    "Yi, K., Zhang, J., Batbayar, N., Higuchi, H., Natsagdorj, T. & Bysykatova, I. P. (2022). Using Tracking Data to Identify Gaps in Knowledge and Conservation of the Critically Endangered Siberian Crane (Leucogeranus leucogeranus). Remote Sensing 14(20): 5101. doi:10.3390/rs14205101",
    "Bao, Y., Shinoda, M., Yi, K., et al. (2022). Satellite-Based Analysis of Spatiotemporal Wildfire Pattern in the Mongolian Plateau. Remote Sensing 15(1): 190. doi:10.3390/rs15010190",
    "Batbayar, N., Yi, K., Zhang, J., Natsagdorj, T., Damba, I., Cao, L. & Fox, A. D. (2021). Combining Tracking and Remote Sensing to Identify Critical Year-Round Site, Habitat Use and Migratory Connectivity of a Threatened Waterbird Species. Remote Sensing 13(20): 4049. doi:10.3390/rs13204049",
    "Damba, I., Zhang, J., Yi, K., et al. (2021). Seasonal and regional differences in migration patterns and conservation status of Swan Geese (Anser cygnoides) in the East Asian Flyway. Avian Research 12(1): 73. doi:10.1186/s40657-021-00308-y",
    "Li, H., Fang, L., Wang, X., Yi, K., Cao, L. & Fox, A. D. (2020). Does snowmelt constrain spring migration progression in sympatric wintering Arctic-nesting geese? Ibis 162(2): 548–555. doi:10.1111/ibi.12767",
    "Zhu, Q., Damba, I., Zhao, Q., Yi, K., et al. (2020). Lack of conspicuous sex-biased dispersal patterns at different spatial scales in an Asian endemic goose species breeding in unpredictable steppe wetlands. Ecology and Evolution 10: 7006–7020. doi:10.1002/ece3.6382",
    "Mao, D., Wang, Z., Wu, J., Wu, B., Zeng, Y., Song, K., Yi, K. & Luo, L. (2018). China's wetlands loss to urban expansion. Land Degradation & Development 29(8): 2644–2657. doi:10.1002/ldr.2939",
    "Wang, X., Cao, L., Bysykatova, I., et al. (2018). The Far East taiga forest: unrecognized inhospitable terrain for migrating Arctic-nesting waterbirds? PeerJ 6: e4353. doi:10.7717/peerj.4353",
    "Yi, K., Bao, Y. & Zhang, J. (2017). Spatial distribution and temporal variability of open fire in China. International Journal of Wildland Fire 26(2): 122–135. doi:10.1071/WF15213",
    "Yi, K., Zeng, Y. & Wu, B. (2016). Mapping and evaluation the process, pattern and potential of urban growth in China. Applied Geography 71: 44–55. doi:10.1016/j.apgeog.2016.04.011",
    "Yi, K. & Bao, Y. (2016). Estimates of Wildfire Emissions in Boreal Forests of China. Forests 7(8): 158. doi:10.3390/f7080158",
    "Yi, K., Tani, H., Li, Q., Zhang, J., Guo, M., Bao, Y., Wang, X. & Li, J. (2014). Mapping and Evaluating the Urbanization Process in Northeast China Using DMSP/OLS Nighttime Light Data. Sensors 14(2): 3207–3226. doi:10.3390/s140203207",
    "Yi, K., Tani, H., Zhang, J., Guo, M., Wang, X. & Zhong, G. (2013). Long-Term Satellite Detection of Post-Fire Vegetation Trends in Boreal Forests of China. Remote Sensing 5(12): 6938–6957. doi:10.3390/rs5126938",
    "Guo, M., Wang, X., Li, J., Yi, K., Zhong, G. & Tani, H. (2012). Assessment of Global Carbon Dioxide Concentration Using MODIS and GOSAT Data. Sensors 12(12): 16368–16389. doi:10.3390/s121216368",
]

TIMELINE_EN = [
    "Associate Researcher / Associate Professor, Research Center for Eco-Environmental Sciences, Chinese Academy of Sciences & Key Laboratory of Urban and Regional Ecology — April 2017 – present",
    "Postdoctoral Fellow (Ecological Remote Sensing), Institute of Space and Earth Information Innovation, Chinese Academy of Sciences (Aerospace Information Research Institute / former RADI) — August 2014 – April 2017",
    "Ph.D., Remote Sensing, Hokkaido University — October 2010 – June 2014",
    "M.Sc., Physical Geography, Northeast Normal University — September 2008 – July 2010",
    "B.Sc., Geography, Harbin College — September 2003 – July 2007",
]

TIMELINE_ZH = [
    "副研究员，中国科学院生态环境研究中心、区域与城市生态安全全国重点实验室 — 2017年4月至今",
    "博士后（生态遥感），中国科学院空天信息创新研究院（原遥感与数字地球研究所） — 2014年8月–2017年4月",
    "遥感科学博士，北海道大学 — 2010年10月–2014年6月",
    "自然地理学硕士，东北师范大学 — 2008年9月–2010年7月",
    "地理学学士，哈尔滨学院 — 2003年9月–2007年7月",
]

RESEARCH_EN = (
    "Research addresses global climate change and eco-environmental remote sensing. "
    "Typical ecosystems—wetlands, forests and grasslands—in cities, nature reserves and national parks "
    "are examined in relation to drought, flood, wildfire and other extreme meteorological hazards. "
    "Threatened migratory birds are treated as indicator species for migration mechanisms, flyway-corridor "
    "conservation, and responses to human activity and extreme climate events. Applications include Sino BON, "
    "restoration of typical degraded wetlands in Northeast China, bird-habitat planning for the Xiong'an New Area, "
    "Nanchang territorial spatial planning (2019–2035), and a bird-strike risk early-warning system. "
    "Public academic identity is positioned as Movement Ecology × Earth Observation × Biodiversity Conservation."
)

FUNDING_EN = (
    "Has led more than ten research projects supported by the National Natural Science Foundation of China, "
    "a National Key R&D Programme sub-project, and local commissions, with total hosted funding exceeding "
    "RMB 8 million. Has published more than 40 academic papers, holds three invention patents, and has "
    "contributed to two monographs. Project-level funding detail is kept in this CV and is not tabulated on the website."
)

OVERVIEW_ZH = (
    "日本北海道大学博士，中国科学院遥感与数字地球研究所（空天院）博士后，现为中国科学院生态环境研究中心副研究员。"
    "主要从事全球气候变化与生态环境遥感监测研究。以城市、自然保护区、国家公园内的湿地、森林、草地等典型生态系统为目标，"
    "研究干旱、洪涝、野火等极端气象灾害对生态系统的影响机制。以珍稀濒危的迁徙鸟类为生态系统的指示物种，"
    "探究鸟类迁徙机制、候鸟迁飞通道保护策略、迁徙鸟类对人类活动和极端气候事件响应和反馈机制。"
    "相关成果服务于 Sino BON、东北典型退化湿地恢复与重建技术及示范、雄安新区鸟类栖息地规划、"
    "南昌市国土空间规划（2019-2035）及鸟撞风险预警系统等。"
    "主持国自然科学基金、国家重点研发子课题、地方委托等科研项目10余项，主持项目总经费800余万元，"
    "发表学术论文40余篇，发明专利3项，参编专著2部。"
)


def styles_en():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "T", parent=base["Title"], fontName="LibSerif-Bold", fontSize=18,
            textColor=NAVY, alignment=TA_LEFT, spaceAfter=2 * mm, leading=22,
        ),
        "sub": ParagraphStyle(
            "S", parent=base["Normal"], fontName="LibSerif", fontSize=10,
            textColor=WETLAND, spaceAfter=6 * mm, leading=14,
        ),
        "h": ParagraphStyle(
            "H", parent=base["Heading2"], fontName="LibSerif-Bold", fontSize=12,
            textColor=NAVY, spaceBefore=5 * mm, spaceAfter=2 * mm, leading=16,
        ),
        "body": ParagraphStyle(
            "B", parent=base["Normal"], fontName="LibSerif", fontSize=10,
            textColor=INK, alignment=TA_JUSTIFY, leading=14, spaceAfter=2 * mm,
        ),
        "meta": ParagraphStyle(
            "M", parent=base["Normal"], fontName="LibSerif", fontSize=10,
            textColor=INK, leading=14, spaceAfter=1 * mm,
        ),
        "note": ParagraphStyle(
            "N", parent=base["Normal"], fontName="LibSerif", fontSize=8.5,
            textColor=MUTED, leading=12, spaceBefore=6 * mm,
        ),
        "item": ParagraphStyle(
            "I", parent=base["Normal"], fontName="LibSerif", fontSize=9.5,
            textColor=INK, leading=13,
        ),
    }


def styles_zh():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "ZT", parent=base["Title"], fontName="WQY", fontSize=18,
            textColor=NAVY, alignment=TA_LEFT, spaceAfter=2 * mm, leading=24,
        ),
        "sub": ParagraphStyle(
            "ZS", parent=base["Normal"], fontName="WQY", fontSize=10,
            textColor=WETLAND, spaceAfter=6 * mm, leading=16,
        ),
        "h": ParagraphStyle(
            "ZH", parent=base["Heading2"], fontName="WQY", fontSize=12,
            textColor=NAVY, spaceBefore=5 * mm, spaceAfter=2 * mm, leading=18,
        ),
        "body": ParagraphStyle(
            "ZB", parent=base["Normal"], fontName="WQY", fontSize=10.5,
            textColor=INK, alignment=TA_JUSTIFY, leading=18, spaceAfter=3 * mm,
        ),
        "meta": ParagraphStyle(
            "ZM", parent=base["Normal"], fontName="WQY", fontSize=10.5,
            textColor=INK, leading=17, spaceAfter=1 * mm,
        ),
        "note": ParagraphStyle(
            "ZN", parent=base["Normal"], fontName="WQY", fontSize=8.5,
            textColor=MUTED, leading=14, spaceBefore=6 * mm,
        ),
        "item": ParagraphStyle(
            "ZI", parent=base["Normal"], fontName="WQY", fontSize=10,
            textColor=INK, leading=16,
        ),
    }


def bullets(items: list[str], style: ParagraphStyle) -> ListFlowable:
    return ListFlowable(
        [ListItem(Paragraph(item, style), leftIndent=8) for item in items],
        bulletType="bullet",
        start="•",
        leftIndent=12,
        bulletFontName=style.fontName,
        bulletFontSize=style.fontSize,
    )


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(MUTED)
    canvas.setFont("LibSerif", 8)
    canvas.drawString(18 * mm, 12 * mm, "Kunpeng Yi / 易昆鹏 — academic CV")
    canvas.drawRightString(A4[0] - 18 * mm, 12 * mm, f"{doc.page}")
    canvas.restoreState()


def build_en_pdf(path: Path) -> None:
    s = styles_en()
    story = [
        Paragraph("Curriculum Vitae", s["title"]),
        Paragraph("Kunpeng Yi / 易昆鹏", s["sub"]),
        Paragraph("Personal Information", s["h"]),
        Paragraph("<b>Name:</b> Kunpeng Yi", s["meta"]),
        Paragraph("<b>Degree:</b> Ph.D.", s["meta"]),
        Paragraph(
            "<b>Position:</b> Associate Professor, Research Center for Eco-Environmental Sciences, Chinese Academy of Sciences",
            s["meta"],
        ),
        Paragraph("Education &amp; Appointments", s["h"]),
        bullets(TIMELINE_EN, s["item"]),
        Paragraph("Research interests", s["h"]),
        Paragraph(RESEARCH_EN, s["body"]),
        Paragraph("Projects and output (overview)", s["h"]),
        Paragraph(FUNDING_EN, s["body"]),
        Paragraph("Representative publications", s["h"]),
        Paragraph(
            "Crossref-confirmed papers in which Kunpeng Yi is a named author. "
            "Citation counts are omitted. Two <i>Wildfowl</i> (2020) entries listed on the official laboratory profile "
            "are omitted here because no DOI was verified at build time; they appear on the website with that note.",
            s["body"],
        ),
        bullets(PAPERS, s["item"]),
        Paragraph(
            "Reconstructed on the author-supplied English CV (docx). Gender, place of birth, private telephone "
            "and home address are not included. Institutional email: kpyi@rcees.ac.cn.",
            s["note"],
        ),
    ]
    doc = SimpleDocTemplate(
        str(path), pagesize=A4,
        leftMargin=18 * mm, rightMargin=18 * mm,
        topMargin=16 * mm, bottomMargin=18 * mm,
        title="Curriculum Vitae — Kunpeng Yi",
        author="Kunpeng Yi",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


def build_zh_pdf(path: Path) -> None:
    s = styles_zh()
    story = [
        Paragraph("个人简介", s["title"]),
        Paragraph("易昆鹏（Kunpeng Yi）", s["sub"]),
        Paragraph("身份", s["h"]),
        Paragraph("姓名（本站）：易昆鹏", s["meta"]),
        Paragraph("学位：博士", s["meta"]),
        Paragraph("职务：中国科学院生态环境研究中心副研究员", s["meta"]),
        Paragraph(
            "本简介原文及部分中国科学院、国科大、实验室页面写作伊坤朋。本站对外中文名保持易昆鹏。",
            s["body"],
        ),
        Paragraph("学历与任职", s["h"]),
        bullets(TIMELINE_ZH, s["item"]),
        Paragraph("研究概述", s["h"]),
        Paragraph(OVERVIEW_ZH, s["body"]),
        Paragraph(
            "网站定位仍为：运动生态学 × 地球观测 × 生物多样性保护。项目经费明细只保留在简历中，不在网站首页列表。",
            s["body"],
        ),
        Paragraph(
            "根据作者提供的中文简介重建。不发布性别、籍贯、私人电话或家庭住址。工作邮箱：kpyi@rcees.ac.cn。",
            s["note"],
        ),
    ]
    doc = SimpleDocTemplate(
        str(path), pagesize=A4,
        leftMargin=18 * mm, rightMargin=18 * mm,
        topMargin=16 * mm, bottomMargin=18 * mm,
        title="个人简介 — 易昆鹏",
        author="易昆鹏",
    )
    doc.build(story, onFirstPage=footer, onLaterPages=footer)


def add_heading(doc: Document, text: str) -> None:
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.bold = True
    run.font.size = Pt(13)
    run.font.color.rgb = RGBColor(0x0B, 0x1F, 0x33)


def build_en_docx(path: Path) -> None:
    doc = Document()
    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.LEFT
    run = title.add_run("Curriculum Vitae — Kunpeng Yi / 易昆鹏")
    run.bold = True
    run.font.size = Pt(18)
    add_heading(doc, "Personal Information")
    doc.add_paragraph("Name: Kunpeng Yi")
    doc.add_paragraph("Degree: Ph.D.")
    doc.add_paragraph(
        "Position: Associate Professor, Research Center for Eco-Environmental Sciences, Chinese Academy of Sciences"
    )
    add_heading(doc, "Education & Appointments")
    for item in TIMELINE_EN:
        doc.add_paragraph(item, style="List Bullet")
    add_heading(doc, "Research interests")
    doc.add_paragraph(RESEARCH_EN)
    add_heading(doc, "Projects and output (overview)")
    doc.add_paragraph(FUNDING_EN)
    add_heading(doc, "Representative publications")
    doc.add_paragraph(
        "Crossref-confirmed papers in which Kunpeng Yi is a named author. Citation counts are omitted."
    )
    for paper in PAPERS:
        doc.add_paragraph(paper, style="List Bullet")
    note = doc.add_paragraph()
    run = note.add_run(
        "Reconstructed from the author-supplied English CV. Gender, place of birth, private telephone "
        "and home address are not included. Institutional email: kpyi@rcees.ac.cn."
    )
    run.italic = True
    run.font.size = Pt(9)
    doc.save(str(path))


def build_zh_docx(path: Path) -> None:
    doc = Document()
    title = doc.add_paragraph()
    run = title.add_run("个人简介 — 易昆鹏（Kunpeng Yi）")
    run.bold = True
    run.font.size = Pt(18)
    add_heading(doc, "身份")
    doc.add_paragraph("姓名（本站）：易昆鹏")
    doc.add_paragraph("学位：博士")
    doc.add_paragraph("职务：中国科学院生态环境研究中心副研究员")
    doc.add_paragraph("本简介原文及部分中国科学院、国科大、实验室页面写作伊坤朋。本站对外中文名保持易昆鹏。")
    add_heading(doc, "学历与任职")
    for item in TIMELINE_ZH:
        doc.add_paragraph(item, style="List Bullet")
    add_heading(doc, "研究概述")
    doc.add_paragraph(OVERVIEW_ZH)
    note = doc.add_paragraph()
    run = note.add_run(
        "根据作者提供的中文简介重建。不发布性别、籍贯、私人电话或家庭住址。工作邮箱：kpyi@rcees.ac.cn。"
    )
    run.italic = True
    run.font.size = Pt(9)
    doc.save(str(path))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    build_en_pdf(OUT / "kunpeng-yi-cv-en.pdf")
    build_zh_pdf(OUT / "kunpeng-yi-cv-zh.pdf")
    build_en_docx(OUT / "kunpeng-yi-cv-en.docx")
    build_zh_docx(OUT / "kunpeng-yi-cv-zh.docx")
    for name in (
        "kunpeng-yi-cv-en.pdf",
        "kunpeng-yi-cv-zh.pdf",
        "kunpeng-yi-cv-en.docx",
        "kunpeng-yi-cv-zh.docx",
    ):
        p = OUT / name
        print(f"{p.name:28} {p.stat().st_size:8} bytes")


if __name__ == "__main__":
    main()
