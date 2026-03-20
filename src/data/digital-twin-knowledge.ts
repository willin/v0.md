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
      en: "I'm Willin Wang, a digital nomad and AI entrepreneur who believes 'to be Willin is to be willing'. I focus on building location-independent income through AI technologies, advocating for minimalist living while exploring the world.",
      zh: "我是老王（v0），一个数字游民和 AI 创业者，信奉\"知行合一，随心所愿\"。我专注于通过 AI 技术建立位置独立的收入，倡导极简生活，同时探索世界。"
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
