#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build the 50-slide seminar deck 《野生动物运动生态学前沿》.

Output: talks/wildlife-movement-ecology-frontiers.pptx

The Gaussian rotor-swept probability on slide 40 uses the normal CDF
    P = 1/2 [erf((H_max-μ)/(σ√2)) − erf((H_min-μ)/(σ√2))]
so height error stays in the denominator. A form written as
``/ sqrt(2) * sigma`` multiplies by σ instead of dividing by it.
"""

from __future__ import annotations

import io
import re
import uuid
import zipfile
from pathlib import Path

from lxml import etree
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Emu, Inches, Pt

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "talks" / "wildlife-movement-ecology-frontiers.pptx"
FONT_SRC = Path("/usr/share/fonts/truetype/wqy/wqy-microhei.ttc")
FONT_NAME = "WenQuanYi Micro Hei"

# Widescreen 13.333... × 7.5 in
SW = 12192000
SH = 6858000

NAVY = RGBColor(15, 23, 42)
NAVY_MID = RGBColor(30, 41, 59)
BG = RGBColor(248, 250, 252)
TEAL = RGBColor(13, 148, 136)
TEAL_SOFT = RGBColor(240, 253, 250)
TEAL_LINE = RGBColor(153, 246, 228)
SLATE = RGBColor(71, 85, 105)
MUTED = RGBColor(100, 116, 139)
TEXT = RGBColor(30, 41, 59)
WHITE = RGBColor(255, 255, 255)
INK_SOFT = RGBColor(226, 232, 240)
CARD_LINE = RGBColor(226, 232, 240)
TITLE_SUB = RGBColor(203, 213, 225)
TITLE_DIM = RGBColor(148, 163, 184)
CARD_DARK = RGBColor(30, 41, 59)
CARD_DARK_LINE = RGBColor(51, 65, 85)

NSMAP = {
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "ct": "http://schemas.openxmlformats.org/package/2006/content-types",
    "pr": "http://schemas.openxmlformats.org/package/2006/relationships",
}

GLYPHS: list[str] = []

SLIDES: list[dict] = [
    {
        "num": 1,
        "part": "MODULE 01",
        "type": "title",
        "title": "从“出现与消失”到重建生命历程",
        "subtitle": "野生动物运动生态学的理论、技术、机制与全球变化前沿",
        "points": [
            "突破“仅关注迁徙”的传统狭义边界：涵盖觅食、通勤、扩散到昼夜垂直位移（DVM）等多尺度时空过程",
            "核心科学主线演进：从观察“出现与消失”的离散现象，走向重建个体全生命周期并解释种群生态学后果",
            "三大国际前沿网络支撑体系：WILDLABS 技术实战网络、Bio-Logging Society 生理力学网络与《Movement Ecology》理论建模",
        ],
    },
    {
        "num": 2,
        "part": "MODULE 01  ·  认知演进史",
        "type": "content",
        "title": "前科学时期的长期经验与自然观察",
        "core_view": "原住民与猎人的传统生态知识（TEK）奠定了方向与季节性认知，但无法回答“消失的动物去了哪里”。",
        "points": [
            "长期经验积累：猎人、牧民、渔民基于足迹（Track & Sign）、叫声与物候记录，建立了早期定性经验体系",
            "亚里士多德假说与认知局限：古代学者认为燕子在秋季钻入池塘底泥冬眠，或由一种鸟变形（Transmutation）为另一种鸟",
            "外来物理证据的冲击：1822 年德国“箭鹳（Pfeilstorch）”体内带有中非骨箭的发现，首次坐实了跨大洲长距离迁徙的物理存在",
        ],
    },
    {
        "num": 3,
        "part": "MODULE 01  ·  认知演进史",
        "type": "content",
        "title": "个体标记与重遇：建立两点时空连接",
        "core_view": "标记重捕确立了跨时空的个体同一性，但两次重遇之间的漫长过程依然是彻底的认知黑箱。",
        "points": [
            "1899 年丹麦 Mortensen 开启金属脚环时代，奠定了宏观欧拉扩散与存活率统计分析的基础",
            "连接繁殖地与越冬地：确认不同地理空间捕获的为“同一个体”，描绘出大洲级迁飞通道雏形",
            "方法论固有盲区：回收率极低（常低于 1%）且存在严重的人为搜索努力空间偏差；重遇间隔内的轨迹细节不可见",
        ],
    },
    {
        "num": 4,
        "part": "MODULE 01  ·  认知演进史",
        "type": "content",
        "title": "无线电遥测与气象雷达：突破人类视距限制",
        "core_view": "VHF 与雷达让人类首次在动物离开视线、没入密林或黑夜后仍能持续观测，但受限于精度与身份识别。",
        "points": [
            "20 世纪 60 年代手持八木天线与航空测向（VHF），人类首次连续测量动物离开视距后的活动，揭示局部家域（Home Range）",
            "多普勒天气雷达网络（NEXRAD / OPERA）：突破单体限制，量化对流层夜间数以亿计的空中生物流通量（Dokter et al., 2018）",
            "科学代价与瓶颈：VHF 追踪人工劳动负荷极大且测角误差大；气象雷达无法准确区分个体身份与具体物种",
        ],
    },
    {
        "num": 5,
        "part": "MODULE 01  ·  认知演进史",
        "type": "content",
        "title": "卫星遥测与 GPS 革命：重建个体时空轨迹",
        "core_view": "GNSS 确立了拉格朗日连续时空研究视角，但“相同的轨迹背后行为状态与能量代价是否相同”仍未解决。",
        "points": [
            "Argos 多普勒系统向 GPS / GNSS 的技术跃迁：定位空间误差由数公里级缩减至米级，时间采样由离散天级缩至高频秒级",
            "拉格朗日视角确立：将移动个体视为携带内在驱动力、在连续空间决策的质点系统，完整还原迁徙、停歇地与家域动态",
            "认知悬念生成：仅凭平面经纬度点，无法推断动物在沿途究竟消耗了多少代谢能量、承受了何种环境应激",
        ],
    },
    {
        "num": 6,
        "part": "MODULE 01  ·  认知演进史",
        "type": "content",
        "title": "多传感器生物记录时代：行为与生理的全息测定",
        "core_view": "Bio-logging 实现了位置、姿态、生理与微环境的同步记录，但“环境是否直接导致决策”进入因果检验深水区。",
        "points": [
            "传感器维度井喷：高频三轴加速度计（ACC）、陀螺仪、磁力计、深水压力计、心率与体温传感器集成上身",
            "测量范畴拓宽：不仅测定“何时何地（Where & When）”，更直接测量“在做什么（Behavior）与生理能耗代价（Cost）”",
            "学会专家网络贡献：International Bio-Logging Society 团队（如佐藤克文、Chimienti、Adachi 等）推动了生理代理指标的标准化",
        ],
    },
    {
        "num": 7,
        "part": "MODULE 01  ·  认知演进史",
        "type": "content",
        "title": "高频观测与跨项目整合网络",
        "core_view": "反向定位、分布式接收网与共享数据库协同，推动微观高频互动研究与宏观跨物种保护预测。",
        "points": [
            "反向定位基础设施（ATLAS）：微瓦级轻型标签配合地面 TDOA 接收站网，开启局部生态系统超高频交互观测新范式",
            "Motus 跨国协同网络：超微型纳米编码射频标签在全球自动化塔网间协同接力，破解极小型鸟兽迁飞黑箱",
            "数据生态变革：Movebank 平台打破数据孤岛，支持上亿轨迹点与卫星环境遥感数据（Env-DATA）的跨尺度融合",
        ],
    },
    {
        "num": 8,
        "part": "MODULE 01  ·  认知演进史",
        "type": "content",
        "title": "科学史的两次核心范式转变总结",
        "core_view": "研究单位从“种群平均扩散”转向“个体生命历程”，研究目标从“描摹时空路线”转向“解释驱动机制”。",
        "points": [
            "转变一 · 研究单位：从描述“某种动物一般怎么动”，转向解析“同一个体在一生中如何根据环境与经验调整行为策略”",
            "转变二 · 研究目标：从单一绘制“迁飞地图几何线条”，转向解释内外部反馈如何驱动运动，以及对种群分布的级联后果",
            "方法论警示：看见路线绝不等于理解机制；现代研究必须结合控制实验、生理标定与长周期种群生命表",
        ],
    },
    {
        "num": 9,
        "part": "MODULE 02  ·  观测技术与实测边界",
        "type": "content",
        "title": "技术体系认知法则：按“实际测到了什么”来划分",
        "core_view": "必须严格区分空间定位、数据通信与行为测量三个独立物理环节，杜绝将工程代理指标等同于生物学真实机理。",
        "points": [
            "解耦三大系统环节：定位（GPS / Argos / TDOA）、通信（GSM / 北斗短报文 / 卫星链路）与行为传感（ACC / IMU / 深度计）",
            "通信不等于定位：GPS-GSM 标签即使在无手机信号盲区，内部闪存依然能连续记录定位；盲区不代表数据丢失",
            "测量值与代理值界限：三轴加速度计输出的是身体加速度（g），未经严格呼吸代谢标定不能直接宣称为“能量消耗”",
        ],
    },
    {
        "num": 10,
        "part": "MODULE 02  ·  观测技术与实测边界",
        "type": "content",
        "title": "经典外标与标记重捕系统",
        "core_view": "提供无可辩驳的个体身份、重遇端点与长期存活标尺，但连续时空过程彻底缺失。",
        "points": [
            "输出物理量：唯一身份编码、离散的重遇时间戳与绝对地理空间点坐标",
            "适用场景：大尺度种群年际存活率计算、宏观迁徙连接端点确立、跨大陆保护廊道边界划分",
            "核心局限：重捕率极低，且严重依赖人为搜索努力的空间分布不均；照片识别（Photo-ID）在鲸类和猫科中实现了无感重遇",
        ],
    },
    {
        "num": 11,
        "part": "MODULE 02  ·  观测技术与实测边界",
        "type": "content",
        "title": "地面与手持无线电测向（VHF）",
        "core_view": "在密林遮蔽与地下洞穴等极端环境下仍具不可替代性，但受制于人工劳动成本与空间误差。",
        "points": [
            "输出物理量：无线电射频脉冲到达方向（AOA）、信号强弱梯度及多点测向相交空间坐标",
            "适用场景：林下穿行物种、小型两栖爬行动物、地下洞穴栖息物种的近距离定位与家域核算",
            "核心局限：野外高强度人工追踪；地形反射导致多径效应；测角误差随距离线性放大，难以进行高频动态连续重建",
        ],
    },
    {
        "num": 12,
        "part": "MODULE 02  ·  观测技术与实测边界",
        "type": "content",
        "title": "自动无线电接收网络（以 Motus 为例）",
        "core_view": "以牺牲连续坐标轨迹为代价，换取微克级载荷在全球分布式基站网络中的宏观迁飞检出。",
        "points": [
            "输出物理量：特定编码数字标签在某基站接收半径内的检出时间序列、信号强度衰减曲线",
            "适用场景：体重低于 10 g 的微型雀形目鸟类、蝙蝠及大型昆虫的跨区域迁飞时间节点与停歇时长",
            "严谨边界警示：基站之间存在成百上千公里的信号空白区；“基站检出记录”绝不等于动物的“连续精确坐标轨迹”",
        ],
    },
    {
        "num": 13,
        "part": "MODULE 02  ·  观测技术与实测边界",
        "type": "content",
        "title": "GNSS 与卫星遥测终端（GPS, BDS, Argos）",
        "core_view": "提供全球无缝的高精度经纬度时间序列，但在微型化、功耗及水下电磁衰减上受制于物理定律。",
        "points": [
            "输出物理量：连续绝对空间三维坐标（经度、纬度、椭球高）、地面速度矢量与高精度原子钟时间戳",
            "工程前沿突破：微型柔性太阳能供电系统让几克级 GPS 标签在大型水鸟上实现多年持续回传",
            "物理硬伤：海水对高频电磁波具强屏蔽衰减；森林冠层引起多路径效应；设备自重严格受动物体重 3%–5% 伦理红线约束",
        ],
    },
    {
        "num": 14,
        "part": "MODULE 02  ·  观测技术与实测边界",
        "type": "content",
        "title": "反向定位系统（以 ATLAS 为例）",
        "core_view": "将繁重的计算与接收能耗移至地面基站，实现局部空域高频、大样本群体行为的革命性突破。",
        "points": [
            "原理机制：动物仅携带毫瓦级轻型发射芯片，由地面固定基站阵列利用到达时间差（TDOA）逆向解算空间位置",
            "核心突破：标签低至 1 克以下、电池寿命长、秒级采样，揭示个体间追逐、避障与社会互动（Nathan et al., 2022）",
            "边界警示：极度依赖地面布站几何拓扑构型与视距无阻挡；平原或湖泊的最佳精度不能直接外推至地形起伏复杂的山地",
        ],
    },
    {
        "num": 15,
        "part": "MODULE 02  ·  观测技术与实测边界",
        "type": "content",
        "title": "海洋与深水观测系统",
        "core_view": "电磁波入水即逝，海洋生物记录依赖水声网络阵列与温盐深（CTD）环境剖面反演。",
        "points": [
            "水声遥测网络：超声波编码发射器结合海底沉底式固定水听器阵列（OTN），监测鱼类过境与洄游",
            "弹出式卫星档案标签（PSAT）：记录温度、深度与光照曲线，定时脱落浮出水面向卫星打包传输历史剖面",
            "光照定位仪（Geolocator）：以极轻记录器根据日长与正午时刻推算经纬度；受水体浑浊、遮阴、高纬极昼极夜及春秋分误差影响极重",
        ],
    },
    {
        "num": 16,
        "part": "MODULE 02  ·  观测技术与实测边界",
        "type": "content",
        "title": "多传感器生物力学与生理记录器",
        "core_view": "加速度、陀螺仪与磁力计测量姿态动作，必须经实证标定方可作为行为识别与能耗代理。",
        "points": [
            "输出物理量：三轴动态与静态加速度（g）、角速度（rad/s）、三维地磁矢量（µT）",
            "能量代谢代理：VeDBA 与 ODBA 和呼吸耗氧率（VO₂）呈经验相关，但受环境温度与体能状况调控，并非普适线性映射",
            "极限生理耐受监测：植入式心率记录仪与脑电波（EEG）探针，证实海鸟跨洋滑翔及水鸟超高空飞行的生理调控极限",
        ],
    },
    {
        "num": 17,
        "part": "MODULE 02  ·  观测技术与实测边界",
        "type": "content",
        "title": "无物理接触的大尺度立体监测",
        "core_view": "雷达、红外机器视觉与声学阵列消除了负重干扰，但面临发声静默与个体身份不连续的硬伤。",
        "points": [
            "多普勒天气雷达网：在大陆尺度反演对流层空中迁徙流（Dokter et al., 2018），提供无干扰的生物量通量",
            "被动声学阵列（PAM）：通过森林树冠麦克风阵列的到达时差重构叫声空间源，但面临“动物静默即不可见”的漏检偏差",
            "WILDLABS 实战案例：无人机搭载热成像、360° 全景影像与端侧视觉识别，捕获群体微观防撞轨迹（Riley Knoedler, Courtney Shuert）",
        ],
    },
    {
        "num": 18,
        "part": "MODULE 02  ·  观测技术与实测边界",
        "type": "content",
        "title": "空间遥感与动物追踪的真正逻辑纽带",
        "core_view": "遥感大多刻画动物所处环境的动态变迁，追踪记录个体抉择；两者耦合方能揭示环境驱动机制。",
        "points": [
            "逻辑解耦：遥感卫星回答“宏观生态系统格局在如何变迁”，动物携带型传感器回答“个体在特定时空如何具体应对”",
            "环境动态赋能：高分辨率提供植被物候（NDVI / EVI）、水体消涨、地表积雪与海洋温盐锋面等动态环境场（Env-DATA）",
            "常见认知误区：宏观遥感分类斑块（如 30 m 土地利用分类）不能直接等同于动物在几十厘米微观视野下实际感受到的生境质量",
        ],
    },
    {
        "num": 19,
        "part": "MODULE 03  ·  理论范式与建模体系",
        "type": "content",
        "title": "Nathan 运动生态学统一范式（2008 PNAS）",
        "core_view": "运动是个体在内部状态、运动能力、导航机制与外部环境共同约束下的时空表达，核心在于反馈循环。",
        "points": [
            "四元核心机制：内部状态（Why move?）、运动能力（How to move?）、导航能力（Where / When to move?）、外部环境因子（Context）",
            "闭环状态反馈：一次运动决策导致位移与能耗，动态更新个体的内部生理能量与空间认知记忆，进而重塑下一次运动决策",
            "理论奠基意义：打破以往仅由物理扩散方程主导的机械论，将动物自主能动性置于生态学建模的核心位置",
        ],
    },
    {
        "num": 20,
        "part": "MODULE 03  ·  理论范式与建模体系",
        "type": "content",
        "title": "运动生态学的多维解释传统及其边界",
        "core_view": "各研究流派在假设前提、检验方法和解释层次上存在严格边界，不能将不同层面的结论任意混为一谈。",
        "points": [
            "自然史与迁徙生态学：关注物候与迁徙连接度。边界：轨迹路线规律本身不能推导个体认知决策机制",
            "行为生态学与最优化理论：权衡能量摄入与风险。边界：“最优解”必须明确约束条件，不能事后随意套用解释",
            "社会生态学与群体运动：研究信息传播。边界：多个个体同向运动可能源于共同地形与风场的物理约束，而非相互社交模仿",
        ],
    },
    {
        "num": 21,
        "part": "MODULE 03  ·  理论范式与建模体系",
        "type": "content",
        "title": "随机过程与统计运动学：从轨迹到潜在状态",
        "core_view": "统计模型能从连续时空轨迹中切分出行为隐状态，但数学离散状态不天然等同于真实生物学动机。",
        "points": [
            "经典运动学基础：从简单随机游走（SRW）到相关随机游走（CRW），检验步长（Step Length）与转向角（Turning Angle）分布",
            "重尾分布与 Lévy 飞行假说：在不可预测或极度稀疏的食物环境下，检验幂律步长是否提高搜索效率",
            "状态空间模型（SSM）与隐马尔可夫模型（HMM）：无监督切分过境、局域搜索（ARS）与静息；缺乏生物学证实时不宜盲目拟合",
        ],
    },
    {
        "num": 22,
        "part": "MODULE 03  ·  理论范式与建模体系",
        "type": "content",
        "title": "家域分析与连续时间模型演变",
        "core_view": "动态布朗桥与连续时间移动模型克服了静态核密度估计忽略时空自相关的缺陷，精准识别关键迁徙走廊与停歇地。",
        "points": [
            "静态核密度估计（Classical KDE）的缺陷：假定点与点之间独立同分布，抹去时间序列，造成家域面积系统性夸大",
            "动态布朗桥移动模型（dBBMM）：考虑两点间连续布朗位移方差，提取狭窄迁徙生态走廊与停歇核心斑块",
            "连续时间移动模型（ctmm）：Fleming、Gurarie 等的重要贡献在于校正采样频率与自相关，减轻非平衡、非规则采样的外推偏差",
        ],
    },
    {
        "num": 23,
        "part": "MODULE 03  ·  理论范式与建模体系",
        "type": "content",
        "title": "生境选择决策的现代建模：从 RSF 到 iSSA",
        "core_view": "iSSA 将“运动能力上能够到达哪里”与“在候选点中动物实际选择了哪里”联合建模，更逼近真实的移动决策过程。",
        "points": [
            "资源选择函数（RSF）对空间可用性界定的主观性：假定全域任意斑块均可瞬时到达，脱离动物物理运动能力的限制",
            "整合阶跃选择分析（iSSA）：在当前步长与转角经验分布下生成候选随机步（Available Steps），与实际选择步（Used Step）对比（Avgar et al., 2016）",
            "方法论警示：iSSA 揭示的是环境要素对步长与偏好的边际贡献；统计上的高选择概率仍属关联，不能直接宣称为因果机制",
        ],
    },
    {
        "num": 24,
        "part": "MODULE 03  ·  理论范式与建模体系",
        "type": "content",
        "title": "物理力学约束与能量景观（Energy Landscape）",
        "core_view": "动物的移动路径由气流、洋流和地形阻力构成的“能耗势能面”严格塑造，二维最短路径常对应三维极高代价。",
        "points": [
            "重构空间阻力：空间不再是各向同性的欧几里得平面，而是充满大气湍流、逆顺风向与洋流涡旋的动态流体势能场",
            "大型飞行动物的滑翔机制：猛禽与涉禽利用陆地日间热气流（Thermal Soaring）；信天翁利用海面剪切风梯度（Dynamic Soaring）实现极低能耗飞行",
            "学术网络贡献：Emily Shepard、Nir Sapir 等系统揭示了空气动力学与气流微环境对大型鸟类航线选择的绝对统治力",
        ],
    },
    {
        "num": 25,
        "part": "MODULE 03  ·  理论范式与建模体系",
        "type": "content",
        "title": "导航、认知与空间记忆机制的检验",
        "core_view": "“朝着特定方向前行”与“明确知晓自身坐标并修正航向”具有本质差异；重复轨迹不能单独证明认知地图。",
        "points": [
            "定向（Orientation）与定位（True Navigation）：矢量飞行指南针，与具备双坐标校准的认知地图，之间存在机制断层",
            "多感官罗盘整合：地磁感应、太阳罗盘结合生物钟、偏振光、星空模式与嗅觉气味羽流（Olfactory plumes）的协同备份",
            "严谨实验证据链：强磁场操纵、嗅觉神经阻断，以及跨大洲横向位移释放实验（Displacement Experiment），方能检验导航机制（Mouritsen, 2018）",
        ],
    },
    {
        "num": 26,
        "part": "MODULE 03  ·  理论范式与建模体系",
        "type": "content",
        "title": "运动：从个体决策向群落与生物多样性桥接",
        "core_view": "个体的运动决策决定了物种之间的空间重叠与相遇概率，是驱动营养级互作、传粉网络与种子远距离扩散的关键生态纽带。",
        "points": [
            "相遇生态学（Encounter Ecology）：捕食者与猎物、传病媒介与宿主的相遇概率，取决于两者的三维移动曲率与速度重叠",
            "长距离种子传播与植物更新：大型食果动物（Megafrugivores）的肠道排泄延迟与长程通勤，维持热带林大种子乔木的基因流",
            "理论升华：运动生态学不仅关乎动物自身存亡，更是连接个体微观行为与宏观群落时空动态的结构性基石（Jeltsch et al., 2013）",
        ],
    },
    {
        "num": 27,
        "part": "MODULE 04  ·  已确证机制与实证辨析",
        "type": "content",
        "title": "机制认知的三个科学层次",
        "core_view": "必须严格区分看到某种现象、统计支持某种假说，以及通过操纵实验或多源独立证据证实的因果机制。",
        "points": [
            "层次一 · 观测现象：记录到动物移动轨迹与某种环境因子在时空上同步重叠。海量数据极易产生虚假相关",
            "层次二 · 统计假说支持：基于状态选择模型，在数理上表明特定假设优于无效模型，但变量之间仍可能是混淆因子",
            "层次三 · 机制确证：结合生理力学测定、野外控制实验或天然实验（Before-After-Control-Impact, BACI），检验生理因果链是否成立",
        ],
    },
    {
        "num": 28,
        "part": "MODULE 04  ·  已确证机制与实证辨析",
        "type": "content",
        "title": "机制一：动态资源追踪与“追随绿波”的真实面貌",
        "core_view": "食草动物追踪展叶期的高营养物候，但并非所有种群都贴着同一波峰；消化生理与风险权衡会修正移动抉择。",
        "points": [
            "经典绿波假说（Green Wave Surfing）：食草动物春季迁徙紧随由南向北、由低海拔向高海拔依次萌发的优质多汁嫩叶",
            "跨种群实证：Merkle 等（2016）研究 5 类食草动物共 10 个种群，其中 7 个种群追随高返青率斑块，支持资源追踪机制",
            "边界修正：种群间并未统一贴合在同一物候阈值；反刍动物消化道容积、伴生捕食风险及遥感 NDVI 饱和，都会调制具体选择",
        ],
    },
    {
        "num": 29,
        "part": "MODULE 04  ·  已确证机制与实证辨析",
        "type": "content",
        "title": "机制二：三维物理环境的能量约束",
        "core_view": "斑头雁翻越喜马拉雅证实：贴近地形起伏的“过山车式”飞行，在密集大气中相比持续高空平飞更具生理能量优势。",
        "points": [
            "二维路线的局限：以往推测大型候鸟在越过世界屋脊时，会保持在高空持续平飞以缩减航程",
            "多传感器生理追踪：Bishop 等（2015）同步记录 GPS 高度、心率与振翅加速度，发现动物采取紧随山脊起伏的过山车式飞行",
            "生物物理机制：低海拔峡谷空气密度大、氧分压高，每振翅一次产生的气动升力更高；爬升能耗低于持续在稀薄空气中搏击的代价",
        ],
    },
    {
        "num": 30,
        "part": "MODULE 04  ·  已确证机制与实证辨析",
        "type": "content",
        "title": "机制三：多感官导航罗盘与磁感知的边界",
        "core_view": "动物导航存在线索冗余与动态校准；知更鸟 CRY4 蛋白体外实验是一大突破，但全链条生理闭环仍未彻底破解。",
        "points": [
            "多重罗盘交互：成鸟能利用地磁场倾角罗盘校准天体偏振光罗盘；不同生活史阶段调用不同信息源（Mouritsen, 2018）",
            "量子磁受体前沿突破：Xu 等（2021）在《Nature》证明欧洲知更鸟体内的隐花色素蛋白 CRY4 具有体外磁场敏感性的磁化学自由基对反应",
            "科学边界：体外蛋白质的物理化学特性，并不等于活体动物在自然磁异常下，从神经信号传导到飞行转向决策的完整因果链",
        ],
    },
    {
        "num": 31,
        "part": "MODULE 04  ·  已确证机制与实证辨析",
        "type": "content",
        "title": "机制四：迁徙传统的个体学习与文化传递",
        "core_view": "有效迁徙与资源追踪高度依赖社会学习与代际经验；恢复种群数量不等于恢复其迁徙文化。",
        "points": [
            "移位与放归实验：Jesmer 等（2018, Science）追踪重引入的大角羊和驼鹿，发现首代释放个体丧失了追随绿波的能力",
            "代际学习周期：人工放归种群需经历多代个体的经验试错与世代传授，才逐步重建出可用的迁飞走廊",
            "保护生物学启示：迁徙是一种脆性很高的社会文化传统；一旦核心经验个体被过量捕杀，种群会迅速丢失积累的时空记忆",
        ],
    },
    {
        "num": 32,
        "part": "MODULE 04  ·  已确证机制与实证辨析",
        "type": "content",
        "title": "机制五：人类活动足迹对动物运动的全球改变",
        "core_view": "高人类足迹地区哺乳动物日常位移显著压缩。这一现象混合了个体行为妥协与群落物种替换，不宜归为单一机制。",
        "points": [
            "全球尺度实证：Tucker 等（2018, Science）整合 57 种陆生哺乳动物、803 个个体的追踪数据；高人类足迹区（HFI）位移尺度压缩至约 1/2 至 2/3",
            "双重机制：其一，个体行为妥协，回避道路与建筑物导致活动范围受阻；其二，群落物种重构，大型长程活动物种衰退后由耐受型小型物种占据",
            "生态功能后果：运动压缩会削弱种子扩散与营养流动，并与局部近交风险、空间承载力下降联系在一起",
        ],
    },
    {
        "num": 33,
        "part": "MODULE 04  ·  已确证机制与实证辨析",
        "type": "content",
        "title": "机制六：疫情“人类封控期（Anthropause）”的行为非均质性",
        "core_view": "全球封控自然实验表明动物运动并无统一均一响应，凸显出固定基础设施与动态人流干扰的本质差异。",
        "points": [
            "全球自然实验：Tucker 等（2023, Science）利用封控期间的野生动物高频追踪数据，检验人类干扰减弱后的运动响应",
            "非均质响应：在严格封控地区，动物长距离位移显著增加；在非严格封控地区，不同物种与个体的响应方向可以相反",
            "理论剥离：城市道路等固定物理结构（Static Barrier）与车流人流等动态人为压力（Dynamic Disturbance）必须分开建模",
        ],
    },
    {
        "num": 34,
        "part": "MODULE 04  ·  已确证机制与实证辨析",
        "type": "content",
        "title": "机制七：动物运动对生态系统的反向塑造与策略多样性",
        "core_view": "运动不仅是被动响应，动物能通过移动改变物候与碳循环；前沿追踪表明经典迁徙物种内部亦存在高度策略异质性。",
        "points": [
            "生态工程效应：黄石野牛通过周期性迁徙与高密度采食、踩踏排泄，主动延缓了草地成熟衰老，延长了优质营养期（Geremia et al., 2019）",
            "WILDLABS 2026 前沿发现：Bedriñana-Romano 等整合声学与遥测，揭示南美长须鲸兼具全年居留、反向往返与经典迁徙等多重共存策略",
            "认知升华：动物不是地理网格中任由环境摆布的被动质点，而是主动参与塑造行星生态系统动态演替的能动力量",
        ],
    },
    {
        "num": 35,
        "part": "MODULE 05  ·  全球变化与三维防撞",
        "type": "content",
        "title": "运动：全球剧变下动物机体的“第一响应线”",
        "core_view": "相对于漫长的基因突变与形态演变，空间移动行为是个体抵御极端气候突发压力的首要自适应缓冲器。",
        "points": [
            "时空响应阶梯：形态演化（万年尺度） → 基因突变（千年尺度） → 种群消长（数十年） → **运动行为避险（秒级至日级）**",
            "行为缓冲的代价：面对热浪、突发干旱与野火，动物通过改变移动海拔、活动时段或迁徙目的地来规避致命打击",
            "保护警示：观察到动物“成功移动并存活”，并不代表其已适应新环境；长程逃逸往往伴随能量透支，以及随后繁殖成功率下降",
        ],
    },
    {
        "num": 36,
        "part": "MODULE 05  ·  全球变化与三维防撞",
        "type": "content",
        "title": "物种分布模型（SDM）的“运动盲区”",
        "core_view": "经典气候包络模型预测未来适宜区，但动物能否抵达并建立种群，必须受真实运动过程约束。",
        "points": [
            "适宜性与可达性的断裂：物种分布模型评估目标区域在气候上是否适合生存，却常常忽略动物能否穿越沿途障碍",
            "气候追踪滞后（Climate Tracking Lags）：破碎化的高速公路、水坝与城镇硬化，使移动受限的物种停留在原地并承受热应激",
            "建模呼吁：把整合阶跃模型（iSSA）与景观阻力面嵌入物种分布的动态预测，而不是只移动气候包络",
        ],
    },
    {
        "num": 37,
        "part": "MODULE 05  ·  全球变化与三维防撞",
        "type": "content",
        "title": "风电与空中能源设施冲突：超越平面重叠的三维解析",
        "core_view": "仅凭鸟类分布区与风电场重叠无法得出真实的碰撞风险；核心在于通流时段、微气象风阻及旋转叶片扫掠高度交叠。",
        "points": [
            "平面重叠的误区：若鸟类全年在轮毂高度以上数百米的高空气流中滑翔，平面重叠即使很高，真实碰撞也可以接近于零",
            "旋转叶片扫掠区（Rotor Swept Zone, RSZ）：机组下沿距地面约 20–50 m、上沿可达 150–250 m 的旋转圆盘，是碰撞风险集中的空域",
            "三维行为解耦：需要解析个体接近风场时的迎面风速、对热对流上升气流的依赖，以及机舱周围的微观转弯与避障",
        ],
    },
    {
        "num": 38,
        "part": "MODULE 05  ·  全球变化与三维防撞",
        "type": "content",
        "title": "垂直基准统一与高程误差传递模型",
        "core_view": "直接用“GPS 高度减 DEM”存在致命基准偏差；必须进行 WGS84 椭球高与 EGM2008 大地水准面正高转换，并控制坡度放大。",
        "points": [
            "离地高度：\nH_AGL(t) = [h_GPS(t) − N(EGM2008)] − DTM(x, y) − δ_veg\n用于去掉中国及沿海地区约 −10 m 至 −60 m 的大地水准面系统偏差",
            "坡度把水平误差放大到垂直方向：\nσ²_AGL = σ²_v + (∂DTM/∂x)² · σ²_x + σ²_DTM\n30° 坡面上，5 m 水平漂移即可带来约 3 m 的垂直假突变",
            "严谨区分裸土地表（DTM）与林冠或建筑物表面（DSM），避免树高造成鸟类净空、相对离地高度的系统性误判",
        ],
    },
    {
        "num": 39,
        "part": "MODULE 05  ·  全球变化与三维防撞",
        "type": "content",
        "title": "气压测高与微机电传感器（Barometer-IMU）融合",
        "core_view": "消费级 GPS 垂向误差高达 ±20 m，无法支持叶片级防撞研判；利用测风塔差分气压计融合 IMU，可把误差压缩至约 ±2 m。",
        "points": [
            "测风塔地面差分测高：\nΔz = (R_d · T_v / g) · ln(P_base / P_tag)\n用现场风机塔的绝对气压做实时差分，而不是只用标准大气",
            "扩展卡尔曼滤波（EKF）：以垂向加速度预测状态，以 GPS 与气压计作为双观测量，削弱气象锋面推移造成的气压零偏漂移",
            "叶片旋转尾流（Wake）的负压补偿：鸟类从风机下风向穿过时受伯努利负压影响，需要引入激光雷达尾流场的动态压力修正",
        ],
    },
    {
        "num": 40,
        "part": "MODULE 05  ·  全球变化与三维防撞",
        "type": "content",
        "title": "叶片扫掠区（RSZ）三维空间概率积分与 Band 模型修正",
        "core_view": "忽略高度误差会导致叶片顶部安全飞越的个体被“高斯拖尾”虚增碰撞概率；必须通过误差卷积修正风险概率积分。",
        "points": [
            "扫掠危险垂直区间：\n[Z_base + H_hub − R,  Z_base + H_hub + R]\n再结合机舱实时偏航角 θ_yaw，把区间投影为三维斜切圆柱",
            "高度误差下的扫掠概率：\nP_RSZ(t) = ½ [erf((H_max − μ) / (σ√2)) − erf((H_min − μ) / (σ√2))]\n其中 μ = H_AGL(t)。误差写在分母里，安全飞越不会被拖尾放大",
            "对传统 Band 模型的修正：不再把离散点二值化成“撞 / 不撞”，而对鸟类穿越机组空域的三维碰撞风险做连续积分",
        ],
    },
    {
        "num": 41,
        "part": "MODULE 05  ·  全球变化与三维防撞",
        "type": "content",
        "title": "机组微观避让行为参数化与近场立体校验",
        "core_view": "总避让率由宏观绕行、中观通道选择与微观近场躲避三级构成；微观闪避需通过高频 VeDBA 尖峰和立体视觉联合率定。",
        "points": [
            "三级连乘，而不是单一避让率：\n1 − M_avoid = (1 − A_macro)(1 − A_meso)(1 − A_micro)\n用以替换不分情景、统一写成 98% 的粗放假定",
            "高频加速度上的逃逸动作：在距叶片约 10–30 m 内，用动态体加速度尖峰（Peak VeDBA）和滚转角变化（Roll > 45°）识别紧急闪避",
            "近场校验：在代表性机舱加装双目立体长焦视觉，重构近机组约 150 m 内的鸟类三维轨迹，用来标定上述参数",
        ],
    },
    {
        "num": 42,
        "part": "MODULE 05  ·  全球变化与三维防撞",
        "type": "content",
        "title": "综合工程应用：从静态环评到分钟级动态智能停机（Curtailment）",
        "core_view": "将空间高精校正转化为风电场分钟级、单机位动态环保停机控制策略，平衡清洁能源发电效益与鸟类生态安全。",
        "points": [
            "数据控制闭环：高空预警雷达（宏观迁飞通量监测） → 重点个体差分气压终端（高危高度预警） → 风机 SCADA 联动控制系统",
            "打破粗暴切断：终结以往不分昼夜、按季节机械性全场断电的发电损失模式，转向高危时空窗口内的精准降速或停机",
            "生态与能源共赢：经算法优化后的敏捷停机策略，可在降低 90% 以上候鸟致死率的同时，仅损失不到 0.5% 的风电场全生命周期上网电量",
        ],
    },
    {
        "num": 43,
        "part": "MODULE 06  ·  前沿挑战与未来发展",
        "type": "content",
        "title": "仪器负载效应与生物伦理边界",
        "core_view": "即使标签重量低于体重的 3%，附加的气动或水动力阻力仍可能明显提高长途迁徙个体的代谢消耗。",
        "points": [
            "“3%–5% 重量法则”的局限：对长程跨洋拍翅迁徙的水鸟，迎风截面积与寄生阻力带来的代谢消耗，可以远大于静态重力本身",
            "侵入性生理干扰：绑扎带磨损皮肤与羽毛、天线高频颤振诱发应激；深水标签破坏流线型层流，并降低捕食冲刺速度",
            "伦理做法：设立无佩戴对照（如环志对照），把全生命周期的繁殖成功率与年存活率纳入标签效应评估",
        ],
    },
    {
        "num": 44,
        "part": "MODULE 06  ·  前沿挑战与未来发展",
        "type": "content",
        "title": "核心统计学警示：采样冗余不等于样本独立性",
        "core_view": "高频数据提高了个体行为分辨力，但海量坐标点替代不了足够的个体数、种群数和年份重复。",
        "points": [
            "统计陷阱：一百万个秒级 GPS 点，不是一百万个独立观测。时空强自相关的点不能直接当作独立样本做检验",
            "伪重复（Pseudoreplication）：由少数个体或单个异常丰水年份得到的迁移规律，未经大样本检验不能写成整物种的通则",
            "对策：计算有效样本量（Effective Sample Size），并做跨地区、跨年份、跨群体的独立交叉验证",
        ],
    },
    {
        "num": 45,
        "part": "MODULE 06  ·  前沿挑战与未来发展",
        "type": "content",
        "title": "前沿瓶颈：从高频相关性迈向因果机制检验",
        "core_view": "运动生态学正从“记录不足”转向“能否作出可靠的机理解释”；单纯将轨迹叠置于环境之上极易产生伪相关。",
        "points": [
            "当前风险：大空间、大数据下很容易挖出统计上显著、生态学上不成立的伪相关（Spurious Correlation）",
            "因果检验工具：工程建设前后的对照（BACI）、极端气候自然实验、感官干扰操纵，以及互相竞争的模型假设",
            "解释目标：从唯象描述（Phenomenological Description）推进到可被新数据否证的机理预测（Mechanistic Prediction）",
        ],
    },
    {
        "num": 46,
        "part": "MODULE 06  ·  前沿挑战与未来发展",
        "type": "content",
        "title": "未来工程革新：传感器、星地网络与边缘智能",
        "core_view": "突破数据传输与电池功耗的物理极限，依赖于将机器学习部署在标签端（TinyML），实现由传感器事件触发采样。",
        "points": [
            "WILDLABS 2026 前瞻（Speaker et al., 2026）：未来创新分为工程进展、分析能力和协作体系三大方向",
            "端侧边缘计算（Edge AI on Chips）：在标签芯片内部直接进行 100 Hz 高频加速度的行为特征抽取，仅回传分类代码，降低无线能耗",
            "天地一体化物联链路：低轨卫星物联网（LEO IoT）、空间站天基微纳接收机（ICARUS）与北斗短报文链路在超微型标签中的规模化演进",
        ],
    },
    {
        "num": 47,
        "part": "MODULE 06  ·  前沿挑战与未来发展",
        "type": "content",
        "title": "跨尺度模型整合：从个体瞬时抉择到种群动态外推",
        "core_view": "利用基于主体的模型（ABM）与积分投影模型（IPM），将个体微观移动的能量损耗映射为种群长周期存亡概率。",
        "points": [
            "升尺度（Scaling-up）理论瓶颈：如何将一只候鸟躲避一台风机时多耗费的几十焦耳能量，数学严密地升尺度换算为跨年代的种群灭绝概率？",
            "机制连接路径：微观运动决策 → 动态能量景观消耗 → 跨季节结转效应 → 繁殖成功率与年死亡率 → 种群矩阵增长率（λ）",
            "前沿行动框架：Scott Yanco 等（2025）系统提出的、将个体追踪与种群统计学及生命历程深度锚定的全纳研究议程",
        ],
    },
    {
        "num": 48,
        "part": "MODULE 06  ·  前沿挑战与未来发展",
        "type": "content",
        "title": "国际前沿研究网络与学术合作入口",
        "core_view": "依托三大互补的国际协作枢纽，聚焦传感器生理标定、人类干扰实测与复杂随机模型的最新进展。",
        "points": [
            "WILDLABS 社区：Courtney Shuert（影像与观测偏差）、Riley Knoedler（无人机热成像与声学）、Luis Bedriñana-Romano（鲸类多源追踪）",
            "生物记录实验传统：Marianna Chimienti、佐藤克文、Taiki Adachi（行为代理与力学）；Marlee Tucker、Francesca Cagnacci（人类足迹的全球整合）",
            "理论与模型传统：Ran Nathan、Sivan Toledo（统一范式与反向定位）；Fleming、Gurarie（连续时间模型）；Shepard、Sapir（飞行力学与能量景观）",
        ],
    },
    {
        "num": 49,
        "part": "MODULE 06  ·  前沿挑战与未来发展",
        "type": "content",
        "title": "数据治理、开源生态与反盗猎安全伦理",
        "core_view": "建立可追溯的全球数据共享标准，同时对极度濒危物种引入坐标时空混淆保护，筑牢数据安全堤坝。",
        "points": [
            "开放科学与基准：统一时间戳精度、垂直椭球基准面和检测概率等元数据（Darwin Core / Movebank）",
            "反向盗猎风险：犀牛、穿山甲、名贵猛禽等物种的高精度实时轨迹一旦外泄，可能被直接用于猎杀",
            "治理做法：科研数据分级访问；对公开发布的高精度坐标做空间模糊化（Spatial Fuzzing）与时间脱敏",
        ],
    },
    {
        "num": 50,
        "part": "MODULE 06  ·  前沿挑战与未来发展",
        "type": "content",
        "title": "结语：重塑人类与荒野的时空契约",
        "core_view": "运动是地球生命的流动血脉；理解并尊重动物的运动轨迹，是人类实现与自然共存共赢的必由之路。",
        "points": [
            "全球生物多样性指标重塑：Oliver 等（2026）呼吁正式将“动物运动连通性”纳入后 2020 全球生物多样性保护框架（GBF）核心评估体系",
            "理念的升华：当我们观测野生动物的运动时，我们不仅是在见证生命演化的坚韧与奇迹，更是在倾听整个行星系统向人类发出的健康脉动",
            "学术致谢与开放讨论：向全球生物记录学会（Bio-Logging Society）、WILDLABS 社区、《Movement Ecology》编委及野外一线科研团队致以崇高敬意",
        ],
    },
]


def emu(inches: float) -> Emu:
    return Emu(int(round(inches * 914400)))


def remember(text: str) -> str:
    GLYPHS.append(text)
    return text


def apply_font(run, size: float, color: RGBColor, bold: bool = False) -> None:
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = False
    run.font.color.rgb = color
    run.font.name = FONT_NAME
    r_pr = run._r.get_or_add_rPr()
    r_pr.set("lang", "zh-CN")
    r_pr.set("altLang", "en-US")
    r_pr.set("dirty", "0")
    for tag in ("a:latin", "a:ea", "a:cs"):
        el = r_pr.find(qn(tag))
        if el is None:
            el = r_pr.makeelement(qn(tag), {})
            r_pr.append(el)
        el.set("typeface", FONT_NAME)
        el.set("pitchFamily", "34")
        el.set("charset", "-122")


def _clear_runs(paragraph) -> None:
    p = paragraph._p
    for child in list(p):
        if child.tag == qn("a:r"):
            p.remove(child)


def write_line(paragraph, text: str, size: float, color: RGBColor, bold: bool = False,
               spacing: float = 1.15, before: float = 0, after: float = 0,
               align=PP_ALIGN.LEFT) -> None:
    remember(text)
    paragraph.alignment = align
    paragraph.line_spacing = spacing
    paragraph.space_before = Pt(before)
    paragraph.space_after = Pt(after)
    _clear_runs(paragraph)
    parts = re.split(r"(\*\*[^*]+\*\*)", text)
    wrote = False
    for part in parts:
        if not part:
            continue
        is_bold = part.startswith("**") and part.endswith("**")
        content = part[2:-2] if is_bold else part
        run = paragraph.add_run()
        run.text = content
        apply_font(run, size, color, bold or is_bold)
        wrote = True
    if not wrote:
        run = paragraph.add_run()
        run.text = ""
        apply_font(run, size, color, bold)


def fill_text(tf, blocks: list[dict], anchor: str = "t") -> None:
    tf.word_wrap = True
    tf.auto_size = None
    tf.margin_left = emu(0.02)
    tf.margin_right = emu(0.02)
    tf.margin_top = emu(0.02)
    tf.margin_bottom = emu(0.02)
    body_pr = tf._txBody.bodyPr
    body_pr.set("anchor", anchor)
    first = True
    for block in blocks:
        lines = block["text"].split("\n")
        for i, line in enumerate(lines):
            paragraph = tf.paragraphs[0] if first else tf.add_paragraph()
            first = False
            after = block.get("after", 0)
            if i < len(lines) - 1:
                after = block.get("break_after", 1)
            write_line(
                paragraph,
                line,
                block["size"],
                block["color"],
                bold=block.get("bold", False),
                spacing=block.get("spacing", 1.15),
                before=block.get("before", 0) if i == 0 else 0,
                after=after,
                align=block.get("align", PP_ALIGN.LEFT),
            )


def add_rect(slide, x, y, w, h, fill: RGBColor, line: RGBColor | None = None):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, emu(x), emu(y), emu(w), emu(h))
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    if line is None:
        shape.line.fill.background()
    else:
        shape.line.color.rgb = line
        shape.line.width = Pt(1)
    return shape


def add_round(slide, x, y, w, h, fill: RGBColor, line: RGBColor | None = None, radius: float = 0.08):
    shape = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, emu(x), emu(y), emu(w), emu(h))
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    if line is None:
        shape.line.fill.background()
    else:
        shape.line.color.rgb = line
        shape.line.width = Pt(1.25)
    try:
        shape.adjustments[0] = radius
    except Exception:
        pass
    return shape


def add_tf(slide, x, y, w, h):
    box = slide.shapes.add_textbox(emu(x), emu(y), emu(w), emu(h))
    return box.text_frame


def est_lines(text: str, width_in: float, font_pt: float) -> int:
    width_pt = width_in * 72.0
    lines = 1
    used = 0.0
    for ch in text:
        if ch == "\n":
            lines += 1
            used = 0.0
            continue
        width = font_pt * (1.02 if ord(ch) > 0x02FF else 0.56)
        if used > 0 and used + width > width_pt:
            lines += 1
            used = width
        else:
            used += width
    return lines


def build_title(slide, item: dict) -> None:
    add_rect(slide, 0, 0, 13.333333, 7.5, NAVY)
    add_rect(slide, 0, 0, 0.12, 7.5, TEAL)

    tf = add_tf(slide, 0.62, 0.42, 11.8, 0.34)
    fill_text(tf, [{
        "text": "ACADEMIC SEMINAR   ·   STATE OF THE ART",
        "size": 13, "color": TEAL, "bold": True, "spacing": 1.0,
    }])

    tf = add_tf(slide, 0.62, 0.88, 11.9, 0.95)
    fill_text(tf, [{
        "text": item["title"],
        "size": 40, "color": WHITE, "bold": True, "spacing": 1.0,
    }])

    tf = add_tf(slide, 0.62, 1.88, 11.6, 0.38)
    fill_text(tf, [{
        "text": "Frontiers in Wildlife Movement Ecology",
        "size": 16, "color": TITLE_DIM, "spacing": 1.0,
    }])

    tf = add_tf(slide, 0.62, 2.28, 11.6, 0.42)
    fill_text(tf, [{
        "text": item["subtitle"],
        "size": 18, "color": TITLE_SUB, "spacing": 1.0,
    }])

    add_rect(slide, 0.64, 2.86, 2.1, 0.035, TEAL)

    tf = add_tf(slide, 0.62, 3.02, 11.8, 0.72)
    fill_text(tf, [
        {"text": "伊坤朋    Kunpeng Yi", "size": 16, "color": WHITE, "bold": True, "spacing": 1.05, "after": 2},
        {"text": "副研究员  ·  中国科学院生态环境研究中心  ·  区域与城市生态安全全国重点实验室",
         "size": 13, "color": TITLE_DIM, "spacing": 1.05},
    ])

    gap = 0.18
    card_w = (12.08 - 2 * gap) / 3
    card_h = 2.95
    card_y = 3.92
    labels = ("尺度", "主线", "网络")
    for idx, point in enumerate(item["points"]):
        x = 0.62 + idx * (card_w + gap)
        add_round(slide, x, card_y, card_w, card_h, CARD_DARK, CARD_DARK_LINE, radius=0.06)
        add_rect(slide, x + 0.22, card_y + 0.22, 0.42, 0.055, TEAL)
        tf = add_tf(slide, x + 0.2, card_y + 0.38, card_w - 0.4, card_h - 0.52)
        fill_text(tf, [
            {"text": f"0{idx + 1}    {labels[idx]}", "size": 13, "color": TEAL, "bold": True,
             "spacing": 1.0, "after": 10},
            {"text": point, "size": 14, "color": INK_SOFT, "spacing": 1.22},
        ])

    tf = add_tf(slide, 0.62, 7.05, 12.0, 0.28)
    fill_text(tf, [{
        "text": "运动生态学  ×  地球观测  ×  生物多样性保护          50 页",
        "size": 12, "color": MUTED, "spacing": 1.0,
    }])


def build_content(slide, item: dict) -> None:
    margin = 0.55
    width = 13.333333 - margin * 2
    add_rect(slide, 0, 0, 13.333333, 7.5, BG)
    add_rect(slide, 0, 0, 13.333333, 0.06, TEAL)

    tf = add_tf(slide, margin, 0.18, width * 0.72, 0.30)
    fill_text(tf, [{
        "text": item["part"],
        "size": 12, "color": TEAL, "bold": True, "spacing": 1.0,
    }])
    tf = add_tf(slide, margin + width * 0.55, 0.18, width * 0.45, 0.30)
    fill_text(tf, [{
        "text": f"{item['num']:02d}   /   50",
        "size": 12, "color": SLATE, "bold": True, "spacing": 1.0, "align": PP_ALIGN.RIGHT,
    }])

    add_rect(slide, margin, 0.52, width, 0.01, CARD_LINE)

    title_lines = est_lines(item["title"], width, 26)
    title_size = 26 if title_lines == 1 else 22
    title_lines = est_lines(item["title"], width, title_size)
    title_h = 0.06 + title_lines * (title_size * 1.12) / 72
    tf = add_tf(slide, margin, 0.58, width, title_h)
    fill_text(tf, [{
        "text": item["title"],
        "size": title_size, "color": NAVY, "bold": True, "spacing": 1.02,
    }])

    thesis_y = 0.58 + title_h + 0.08
    core = item["core_view"]
    core_width = width - 0.55
    core_size = 16
    core_lines = est_lines(core, core_width, core_size)
    if core_lines > 2:
        core_size = 14
        core_lines = est_lines(core, core_width, core_size)
    thesis_h = max(1.12, 0.50 + core_lines * (core_size * 1.22) / 72)
    add_round(slide, margin, thesis_y, width, thesis_h, TEAL_SOFT, TEAL_LINE, radius=0.06)
    add_rect(slide, margin + 0.12, thesis_y + 0.16, 0.07, thesis_h - 0.32, TEAL)
    tf = add_tf(slide, margin + 0.36, thesis_y + 0.10, width - 0.52, thesis_h - 0.18)
    fill_text(tf, [
        {"text": "核心学术论点", "size": 11, "color": TEAL, "bold": True, "spacing": 1.0, "after": 4},
        {"text": core, "size": core_size, "color": TEXT, "bold": True, "spacing": 1.15},
    ])

    gap = 0.16
    cards_y = thesis_y + thesis_h + 0.16
    cards_h = 7.08 - cards_y
    card_w = (width - 2 * gap) / 3
    text_w = card_w - 0.46
    body_size = 15
    for size in (15, 14, 13.5, 13, 12):
        line_h = size * 1.22 / 72
        capacity = int((cards_h - 0.78) / line_h)
        needed = max(est_lines(p, text_w, size) for p in item["points"])
        body_size = size
        if needed <= max(capacity, 1):
            break

    for idx, point in enumerate(item["points"]):
        x = margin + idx * (card_w + gap)
        add_round(slide, x, cards_y, card_w, cards_h, WHITE, CARD_LINE, radius=0.05)
        add_rect(slide, x + 0.22, cards_y + 0.20, 0.36, 0.045, TEAL)
        tf = add_tf(slide, x + 0.18, cards_y + 0.32, card_w - 0.36, cards_h - 0.46)
        fill_text(tf, [
            {"text": f"0{idx + 1}", "size": 14, "color": TEAL, "bold": True, "spacing": 1.0, "after": 8},
            {"text": point, "size": body_size, "color": TEXT, "spacing": 1.2},
        ])

    tf = add_tf(slide, margin, 7.12, width * 0.72, 0.26)
    fill_text(tf, [{
        "text": "野生动物运动生态学前沿    ·    伊坤朋",
        "size": 11, "color": MUTED, "spacing": 1.0,
    }])
    tf = add_tf(slide, margin + width * 0.55, 7.12, width * 0.45, 0.26)
    fill_text(tf, [{
        "text": item["part"].split("·")[0].strip(),
        "size": 11, "color": MUTED, "spacing": 1.0, "align": PP_ALIGN.RIGHT,
    }])
    add_rect(slide, 0, 7.44, 13.333333, 0.06, RGBColor(226, 232, 240))
    add_rect(slide, 0, 7.44, 13.333333 * item["num"] / 50, 0.06, TEAL)

    notes = slide.notes_slide.notes_text_frame
    notes.text = (
        f"{item['num']:02d}  {item['title']}\n\n"
        f"{item['core_view']}\n\n"
        + "\n".join(f"{i + 1}. {p}" for i, p in enumerate(item["points"]))
    )


def build_presentation() -> Presentation:
    prs = Presentation()
    prs.slide_width = Emu(SW)
    prs.slide_height = Emu(SH)
    prs.core_properties.title = "野生动物运动生态学前沿"
    prs.core_properties.author = "伊坤朋 Kunpeng Yi"
    prs.core_properties.subject = "学术研讨会：理论、技术、机制与全球变化"
    prs.core_properties.category = "Movement Ecology"
    prs.core_properties.keywords = "movement ecology; bio-logging; iSSA; wind energy; AGL"
    blank = prs.slide_layouts[6]
    for item in SLIDES:
        slide = prs.slides.add_slide(blank)
        if item["type"] == "title":
            build_title(slide, item)
        else:
            build_content(slide, item)
    return prs


def _subset_font(text: str) -> bytes:
    from fontTools.subset import Options, Subsetter
    from fontTools.ttLib import TTCollection

    font = TTCollection(str(FONT_SRC)).fonts[0]
    options = Options()
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    options.notdef_outline = True
    options.recommended_glyphs = True
    options.hinting = False
    subsetter = Subsetter(options=options)
    subsetter.populate(text=text)
    subsetter.subset(font)
    buf = io.BytesIO()
    font.save(buf)
    return buf.getvalue()


def _obfuscate(data: bytes, guid: uuid.UUID) -> bytes:
    key = guid.bytes_le
    out = bytearray(data)
    for i in range(min(32, len(out))):
        out[i] ^= key[i % 16]
    return bytes(out)


def _set_theme_fonts(xml: bytes) -> bytes:
    root = etree.fromstring(xml)
    for tag in ("a:latin", "a:ea", "a:cs"):
        for el in root.findall(f".//{tag}", NSMAP):
            el.set("typeface", FONT_NAME)
    return etree.tostring(root, xml_declaration=True, encoding="UTF-8", standalone=True)


def embed_font(pptx_path: Path, font_bytes: bytes) -> None:
    guid = uuid.uuid4()
    part_name = f"ppt/fonts/{guid}.fntdata"
    obfuscated = _obfuscate(font_bytes, guid)

    with zipfile.ZipFile(pptx_path, "r") as zin:
        files = {info.filename: zin.read(info.filename) for info in zin.infolist()}

    files[part_name] = obfuscated
    files["ppt/theme/theme1.xml"] = _set_theme_fonts(files["ppt/theme/theme1.xml"])

    rels_root = etree.fromstring(files["ppt/_rels/presentation.xml.rels"])
    ids = []
    for rel in rels_root:
        rid = rel.get("Id", "")
        if rid.startswith("rId") and rid[3:].isdigit():
            ids.append(int(rid[3:]))
    font_rid = f"rId{max(ids, default=0) + 1}"
    rel_el = etree.SubElement(rels_root, "{http://schemas.openxmlformats.org/package/2006/relationships}Relationship")
    rel_el.set("Id", font_rid)
    rel_el.set("Type", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font")
    rel_el.set("Target", f"fonts/{guid}.fntdata")
    files["ppt/_rels/presentation.xml.rels"] = etree.tostring(
        rels_root, xml_declaration=True, encoding="UTF-8", standalone=True
    )

    pres = etree.fromstring(files["ppt/presentation.xml"])
    p_ns = NSMAP["p"]
    r_ns = NSMAP["r"]
    embedded = etree.Element(f"{{{p_ns}}}embeddedFontLst")
    font = etree.SubElement(embedded, f"{{{p_ns}}}embeddedFont")
    font_name = etree.SubElement(font, f"{{{p_ns}}}font")
    font_name.set("typeface", FONT_NAME)
    font_name.set("pitchFamily", "34")
    font_name.set("charset", "-122")
    regular = etree.SubElement(font, f"{{{p_ns}}}regular")
    regular.set(f"{{{r_ns}}}id", font_rid)
    notes = pres.find(f"{{{p_ns}}}notesSz")
    default_style = pres.find(f"{{{p_ns}}}defaultTextStyle")
    if notes is not None:
        notes.addnext(embedded)
    elif default_style is not None:
        default_style.addprevious(embedded)
    else:
        pres.append(embedded)
    files["ppt/presentation.xml"] = etree.tostring(
        pres, xml_declaration=True, encoding="UTF-8", standalone=True
    )

    ctypes = etree.fromstring(files["[Content_Types].xml"])
    ct_ns = NSMAP["ct"]
    default = etree.Element(f"{{{ct_ns}}}Default")
    default.set("Extension", "fntdata")
    default.set("ContentType", "application/x-fontdata")
    ctypes.insert(0, default)
    files["[Content_Types].xml"] = etree.tostring(
        ctypes, xml_declaration=True, encoding="UTF-8", standalone=True
    )

    tmp = pptx_path.with_suffix(".tmp.pptx")
    with zipfile.ZipFile(tmp, "w", compression=zipfile.ZIP_DEFLATED) as zout:
        for name, data in files.items():
            zout.writestr(name, data)
    tmp.replace(pptx_path)


def main() -> None:
    if len(SLIDES) != 50:
        raise SystemExit(f"expected 50 slides, got {len(SLIDES)}")
    nums = [s["num"] for s in SLIDES]
    if nums != list(range(1, 51)):
        raise SystemExit(f"slide numbers are not 1..50: {nums}")
    prs = build_presentation()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(OUT)
    alphabet = "".join(GLYPHS) + "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    font_bytes = _subset_font(alphabet)
    embed_font(OUT, font_bytes)
    print(f"saved {OUT} ({OUT.stat().st_size} bytes, font subset {len(font_bytes)} bytes)")


if __name__ == "__main__":
    main()
