interface KnowledgeEntry {
  patterns: string[];
  responses: {
    en: string;
    zh: string;
  };
}

export const digitalTwinKnowledge: KnowledgeEntry[] = [
  {
    patterns: [
      // English
      "financial independence",
      "FI",
      "retire early",
      "early retirement",
      "financial freedom",
      "how much money to retire",
      "passive income",
      // Chinese
      "财务自由",
      "财务独立",
      "提前退休",
      "被动收入",
      "躺平",
      "存款",
      "多少钱退休"
    ],
    responses: {
      en: "Achieving financial independence requires building passive income streams that cover your expenses. The general rule is saving 25 times your annual expenses (4% rule). Start with investing in low-cost index funds, real estate, or dividend stocks. Focus on increasing your savings rate and reducing unnecessary expenses.",
      zh: "实现财务自由需要建立能够覆盖支出的被动收入流。一般规则是储蓄年支出的 25 倍（4% 法则）。从投资低成本指数基金、房地产或股息股票开始。专注于提高储蓄率并减少不必要的开支。"
    }
  },
  {
    patterns: [
      // English
      "digital nomad",
      "digital nomadism",
      "nomad life",
      "travel while working",
      "remote work",
      "work from anywhere",
      // Chinese
      "数字游民",
      "游牧生活",
      "远程工作",
      "边工作边旅行",
      "在家工作",
      "自由职业"
    ],
    responses: {
      en: "Digital nomadism is about location independence and remote work. Essential aspects include reliable internet, a portable setup, time zone management, and legal considerations (visa, taxes). Popular destinations include Thailand, Mexico, Portugal, and Estonia. Focus on building location-independent income first.",
      zh: "数字游民主义是关于位置独立和远程工作。关键要素包括可靠的互联网、便携式设备、时区管理和法律考虑（签证、税收）。热门目的地包括泰国、墨西哥、葡萄牙和爱沙尼亚。首先专注于建立位置独立的收入。"
    }
  },
  {
    patterns: [
      // English
      "AI entrepreneur",
      "AI startup",
      "artificial intelligence business",
      "AI company",
      "machine learning business",
      // Chinese
      "AI 创业",
      "人工智能创业",
      "AI 公司",
      "机器学习创业",
      "AI 赚钱",
      "大模型创业"
    ],
    responses: {
      en: "AI entrepreneurship involves leveraging AI technologies to solve real problems. Focus on niches where AI adds clear value - automation, personalization, prediction. Start with MVPs using existing AI APIs (OpenAI, Google, etc.), then develop proprietary solutions. The market is rapidly evolving, so stay adaptable and customer-focused.",
      zh: "AI 创业涉及利用 AI 技术解决实际问题。专注于 AI 增加明确价值的领域——自动化、个性化、预测。使用现有 AI API（OpenAI、Google 等）启动 MVP，然后开发专有解决方案。市场快速发展，所以要保持适应性和客户导向。"
    }
  },
  {
    patterns: [
      // English
      "1 million yuan",
      "millionaire",
      "can I retire with",
      "is 1 million enough",
      "1000000",
      "one million",
      "1 million",
      "deposit enough",
      "money to live",
      // Chinese
      "100 万",
      "一百万",
      "存款够吗",
      "多少钱够",
      "攒钱",
      "积蓄",
      "足够花"
    ],
    responses: {
      en: "Whether 1 million yuan is enough depends on your lifestyle and expenses. With the 4% rule, this supports about 40,000 yuan annually. Consider cost of living in your target location, inflation, healthcare costs, and unexpected expenses. For a frugal nomad lifestyle, it might last 10-15 years. For greater security, aim for 2-3 million yuan.",
      zh: "100 万元是否够用取决于您的生活方式和支出。按照 4% 法则，这支持每年约 4 万元。考虑目标地点的生活成本、通胀、医疗费用和意外支出。对于节俭的游民生活方式，可能持续 10-15 年。为了更大安全，目标应为 200-300 万元。"
    }
  },
  {
    patterns: [
      // English
      "lifestyle",
      "about you",
      "who are you",
      "tell me about yourself",
      "bio",
      "personal information",
      // Chinese
      "你是谁",
      "介绍一下",
      "关于你",
      "个人信息",
      "个人介绍",
      "老王"
    ],
    responses: {
      en: "I'm Willin Wang, a digital nomad and AI entrepreneur who believes 'to be Willin is to be willing'. I focus on building location-independent income through AI technologies, advocating for financial freedom and minimalist living while exploring the world.",
      zh: "我是老王（v0），一个数字游民和 AI 创业者，信奉\"知行合一，随心所愿\"。我专注于通过 AI 技术建立位置独立的收入，倡导财务自由和极简生活，同时探索世界。"
    }
  },
  {
    patterns: [
      // English
      "minimalism",
      "minimalist life",
      "simple life",
      "less is more",
      "declutter",
      "simple living",
      // Chinese
      "极简",
      "极简主义",
      "极简生活",
      "断舍离",
      "少即是多",
      "简单生活"
    ],
    responses: {
      en: "Minimalism is about focusing on what truly adds value to your life while eliminating excess. As a digital nomad, this means owning fewer physical possessions, using digital tools efficiently, and prioritizing experiences over material goods. It's about creating more freedom with less baggage.",
      zh: "极简主义是关注真正为生活增值的东西，同时消除多余物品。作为数字游民，这意味着拥有更少实物，高效使用数字工具，优先考虑体验而非物质商品。这是用更少负担创造更多自由。"
    }
  }
];

export function getResponse(input: string, locale: string): string | null {
  // For Chinese input, check against Chinese patterns directly
  // For English input, check against English patterns
  const lowerInput = input.toLowerCase();

  for (const entry of digitalTwinKnowledge) {
    for (const pattern of entry.patterns) {
      if (lowerInput.includes(pattern.toLowerCase())) {
        return locale === 'zh' ? entry.responses.zh : entry.responses.en;
      }
    }
  }

  return null;
}
