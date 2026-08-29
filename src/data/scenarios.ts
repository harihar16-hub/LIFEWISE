// ============================================
// LIFEWISE — Scenario Definitions
// ============================================
// 5 polished MVP scenarios, one per skill category.
// Target audience: 18–25 (Young Adult).
// Each scenario: situation → investigation → decision → consequence.

import type { Scenario } from '../types/game';

// ──────────────────────────────────────────────
// 1. FINANCIAL DECISION-MAKING
// ──────────────────────────────────────────────
const financialScenario: Scenario = {
  id: 'fin-investment-pitch',
  title: 'The Investment Pitch',
  category: 'financial',
  difficulty: 2,
  ageGroups: ['Young Adult', 'Adult', 'Experienced Adult'],
  situation:
    'Your close friend Raj excitedly tells you about a cryptocurrency called "LunaX" that has "guaranteed" 300% returns in 3 months. He has already invested ₹4,00,000 and wants you to invest ₹1,50,000 from your savings. He says the opportunity closes tomorrow.',
  context:
    'You have ₹2,50,000 in savings that you have been building for the past year. Raj is a good friend but has lost money on speculative investments before.',
  objective:
    'Decide whether to invest in LunaX and how to handle the pressure from your friend.',
  evidence: [
    {
      id: 'fin-ev-1',
      title: "Raj's Pitch Message",
      content:
        '"Bro, LunaX is the next big thing! My friend\'s friend made ₹12 lakhs in two months. I\'ve already put in ₹4 lakhs. You NEED to get in before tomorrow — the early investor window closes. Trust me on this one."',
      isHidden: false,
    },
    {
      id: 'fin-ev-2',
      title: 'LunaX Website',
      content:
        'The website is flashy with countdown timers and testimonials. The "About Us" page lists no real team members — just stock photos and first names. The whitepaper is full of buzzwords but vague on actual technology. There is no verifiable company registration.',
      isHidden: false,
    },
    {
      id: 'fin-ev-3',
      title: 'Online Reviews',
      content:
        'A quick search reveals mixed results. A few Reddit posts praise it, but a crypto watchdog site has flagged LunaX as a "high-risk unregulated scheme." Several users report difficulty withdrawing their money.',
      isHidden: true,
    },
    {
      id: 'fin-ev-4',
      title: 'SEBI Advisory Warning',
      content:
        'SEBI (Securities and Exchange Board of India) has issued a general advisory warning about cryptocurrency schemes promising guaranteed returns. The advisory specifically mentions that "guaranteed returns" is a common red flag for Ponzi schemes.',
      isHidden: true,
    },
    {
      id: 'fin-ev-5',
      title: "Raj's Investment History",
      content:
        'You recall that Raj lost ₹80,000 on a similar "sure thing" crypto project last year (MoonRise coin). He also convinced two other friends to invest, and they all lost money. He never acknowledged the loss directly.',
      isHidden: true,
    },
  ],
  decisions: [
    {
      id: 'fin-d1',
      text: 'Invest the full ₹1,50,000 — you trust Raj and don\'t want to miss out.',
      quality: 'poor',
      riskLevel: 'high',
      consequence: {
        immediate:
          'You transfer ₹1,50,000 to LunaX. For the first week, your dashboard shows your investment growing to ₹2,10,000. But when you try to withdraw, the platform requires a "withdrawal fee" of ₹50,000. A month later, the site goes offline. Your money is gone.',
        explanation:
          'This was a classic Ponzi scheme. The "growth" displayed was fabricated. The withdrawal fee was designed to extract even more money. Guaranteed returns and urgency ("closes tomorrow") are major red flags.',
        skillInvolved: 'Financial Decision-Making',
        lesson:
          'Never invest based on urgency or peer pressure. If returns sound too good to be true, they usually are. Always verify the legitimacy of investment platforms through official regulatory bodies like SEBI.',
      },
      skillImpacts: { financial: 0, criticalThinking: 0 },
    },
    {
      id: 'fin-d2',
      text: 'Invest ₹30,000 as a compromise — a smaller amount to test the waters.',
      quality: 'average',
      riskLevel: 'medium',
      consequence: {
        immediate:
          'You invest ₹30,000. The platform shows modest gains initially, but you notice it is impossible to make small withdrawals. When LunaX eventually shuts down, you lose ₹30,000. It is less devastating, but still a loss.',
        explanation:
          'Investing a smaller amount reduced your risk, which shows some caution. However, the fundamental problem remained: the investment was fraudulent. A smaller stake in a scam is still a loss.',
        skillInvolved: 'Financial Decision-Making',
        lesson:
          'Risk management is important, but the first step is verifying whether an investment is legitimate — not just reducing the amount. Due diligence comes before any investment, regardless of size.',
      },
      skillImpacts: { financial: 5, criticalThinking: 1 },
    },
    {
      id: 'fin-d3',
      text: 'Decline politely and tell Raj you need more time to research before investing.',
      quality: 'good',
      riskLevel: 'low',
      consequence: {
        immediate:
          'Raj is disappointed but respects your decision. Over the next few weeks, you research LunaX and discover the warning signs. When the platform eventually collapses, you are relieved you didn\'t invest. Your savings remain intact.',
        explanation:
          'Asking for time to research is a strong financial habit. You resisted social pressure and the artificial urgency. However, you didn\'t share your concerns with Raj, who lost his investment.',
        skillInvolved: 'Financial Decision-Making',
        lesson:
          'Taking time to research before investing is one of the most important financial decisions you can make. Artificial urgency is a pressure tactic — legitimate investments don\'t disappear overnight.',
      },
      skillImpacts: { financial: 12, criticalThinking: 3 },
    },
    {
      id: 'fin-d4',
      text: 'Decline, research LunaX thoroughly, and share your findings with Raj before he loses more.',
      quality: 'excellent',
      riskLevel: 'low',
      consequence: {
        immediate:
          'You spend an evening researching LunaX and find the SEBI warning, withdrawal complaints, and fake team profiles. You share a clear summary with Raj. He is initially defensive but eventually tries to withdraw his money. He manages to recover ₹1,50,000 of his ₹4,00,000 before the platform collapses.',
        explanation:
          'You made the best possible decision: you protected yourself with research, used critical thinking to evaluate the evidence, and then communicated your findings to protect your friend.',
        skillInvolved: 'Financial Decision-Making',
        lesson:
          'The strongest financial decisions combine personal discipline (not investing blindly), research skills (verifying claims), and willingness to share what you learn — even when it\'s uncomfortable. Good financial literacy can protect your entire community.',
      },
      skillImpacts: { financial: 20, criticalThinking: 5 },
    },
  ],
  tags: ['scam', 'investment', 'peer-pressure', 'urgency'],
};

// ──────────────────────────────────────────────
// 2. CYBERSECURITY AWARENESS
// ──────────────────────────────────────────────
const cybersecurityScenario: Scenario = {
  id: 'cyber-urgent-email',
  title: 'The Urgent Email',
  category: 'cybersecurity',
  difficulty: 2,
  ageGroups: ['Young Adult', 'Adult', 'Experienced Adult'],
  situation:
    'It\'s 4:45 PM on a Friday. You receive an email from "IT Department <it-helpdesk@yourcompanny.com>" saying your company account will be suspended in 24 hours due to a "security audit." The email asks you to verify your credentials by clicking a link. It has your company logo and looks official.',
  context:
    'You recently started a new job at a tech company. You don\'t want your account suspended over the weekend, especially because you have a Monday morning presentation.',
  objective:
    'Decide how to handle this suspicious email under time pressure.',
  evidence: [
    {
      id: 'cyber-ev-1',
      title: 'The Email',
      content:
        'Subject: "URGENT: Account Suspension — Action Required Within 24 Hours"\n\nFrom: IT Department <it-helpdesk@yourcompanny.com>\n\nDear Employee,\nAs part of our quarterly security audit, your account has been flagged for verification. Please click the link below to confirm your identity within 24 hours or your account will be permanently suspended.\n\n[Verify My Account Now]\n\nThank you,\nIT Security Team',
      isHidden: false,
    },
    {
      id: 'cyber-ev-2',
      title: 'Sender Address Details',
      content:
        'Looking more carefully at the sender address: it-helpdesk@yourcompanny.com — the company name is misspelled ("companny" instead of "company"). The actual company domain is yourcompany.com. This is a common phishing technique called typosquatting.',
      isHidden: true,
    },
    {
      id: 'cyber-ev-3',
      title: 'Link Inspection',
      content:
        'Hovering over the "Verify My Account Now" button (without clicking) reveals the URL: http://secure-verify.sketchy-domain.ru/login. This is not your company\'s domain. The "http" (not "https") and the .ru domain are additional red flags.',
      isHidden: true,
    },
    {
      id: 'cyber-ev-4',
      title: 'Company IT Policy',
      content:
        'Your employee handbook states: "The IT department will NEVER ask you to verify credentials via email link. All password resets must be done through the internal IT portal at helpdesk.yourcompany.com or by visiting IT in person."',
      isHidden: true,
    },
  ],
  decisions: [
    {
      id: 'cyber-d1',
      text: 'Click the link and enter your credentials immediately — you can\'t risk account suspension before Monday.',
      quality: 'poor',
      riskLevel: 'high',
      consequence: {
        immediate:
          'You click the link and enter your username and password. The page looks legitimate but nothing happens after you submit. Within hours, the attackers use your credentials to access company systems, download confidential client data, and send phishing emails to your entire team from your account. IT contacts you over the weekend about the breach.',
        explanation:
          'This was a phishing attack. The misspelled domain, the urgency, and the request for credentials via email were all classic red flags. Once attackers have your credentials, they can impersonate you and access everything your account can.',
        skillInvolved: 'Cybersecurity Awareness',
        lesson:
          'Never enter credentials through email links, no matter how urgent the message seems. Phishing attacks specifically exploit time pressure and fear. Always verify through official channels.',
      },
      skillImpacts: { cybersecurity: 0 },
    },
    {
      id: 'cyber-d2',
      text: 'Forward the email to colleagues to ask if they received it too.',
      quality: 'average',
      riskLevel: 'medium',
      consequence: {
        immediate:
          'You forward the phishing email to five colleagues. Two of them, also worried about suspension, click the link and enter their credentials. The attack spreads further. IT eventually identifies the phishing campaign, but the damage is worse because you forwarded the malicious email.',
        explanation:
          'While your instinct to verify was partially correct, forwarding a phishing email spreads the attack. You should never forward suspicious emails — report them to IT directly instead.',
        skillInvolved: 'Cybersecurity Awareness',
        lesson:
          'Never forward suspicious emails. Even well-intentioned sharing can spread the attack to more victims. If you want to verify, contact IT directly through a separate, trusted channel.',
      },
      skillImpacts: { cybersecurity: 5, criticalThinking: 1 },
    },
    {
      id: 'cyber-d3',
      text: 'Ignore the email entirely and delete it.',
      quality: 'good',
      riskLevel: 'low',
      consequence: {
        immediate:
          'You delete the email and your account is fine on Monday. However, you didn\'t report it, so the phishing campaign continues targeting other employees. Two other colleagues fall for it over the weekend.',
        explanation:
          'Ignoring the phishing email protected you personally. However, not reporting it meant the IT team couldn\'t warn others or block the campaign. Security is a team effort.',
        skillInvolved: 'Cybersecurity Awareness',
        lesson:
          'While not clicking was the right instinct, reporting phishing attempts to IT helps protect the entire organization. You are part of the company\'s security defense.',
      },
      skillImpacts: { cybersecurity: 12, criticalThinking: 3 },
    },
    {
      id: 'cyber-d4',
      text: 'Don\'t click anything. Report the email to IT security through the official internal portal, and verify the claim directly with IT.',
      quality: 'excellent',
      riskLevel: 'low',
      consequence: {
        immediate:
          'You report the email through the official IT portal. The security team confirms it is a phishing attack and immediately sends a company-wide alert. They block the malicious domain and reset credentials for anyone who may have clicked. Your quick reporting prevents a major data breach. IT commends you in the Monday standup.',
        explanation:
          'You followed the ideal security protocol: don\'t click, don\'t forward, report through official channels, and verify independently. Your action protected the entire organization.',
        skillInvolved: 'Cybersecurity Awareness',
        lesson:
          'The best response to a suspicious email is: (1) Don\'t click any links, (2) Don\'t forward it, (3) Report it through official IT channels, (4) Verify the claim independently. Being a proactive reporter makes you part of the solution.',
      },
      skillImpacts: { cybersecurity: 20, criticalThinking: 5 },
    },
  ],
  tags: ['phishing', 'email', 'urgency', 'workplace'],
};

// ──────────────────────────────────────────────
// 3. CRITICAL THINKING
// ──────────────────────────────────────────────
const criticalThinkingScenario: Scenario = {
  id: 'ct-viral-news',
  title: 'The Viral Health Scare',
  category: 'criticalThinking',
  difficulty: 2,
  ageGroups: ['Teen', 'Young Adult', 'Adult', 'Experienced Adult'],
  situation:
    'A viral Instagram post with 150K+ shares claims: "BREAKING: New Harvard study proves that popular energy drink ZapBolt causes irreversible heart damage in people under 30." Your roommate just threw away a case of ZapBolt and three friends have messaged you asking if it\'s true.',
  context:
    'You drink ZapBolt occasionally. The post looks alarming and has been shared by several people you trust. But you haven\'t seen it in any major news outlet.',
  objective:
    'Decide how to evaluate and respond to this viral health claim.',
  evidence: [
    {
      id: 'ct-ev-1',
      title: 'The Viral Post',
      content:
        'The post features a dramatic image of a heart monitor flatline over a ZapBolt can. The caption reads: "Harvard scientists confirm ZapBolt destroys your heart!! Share before they take this down!!" The account has 2,000 followers and was created 3 weeks ago. The post uses emotional language and all-caps urgency.',
      isHidden: false,
    },
    {
      id: 'ct-ev-2',
      title: "ZapBolt's Official Response",
      content:
        'ZapBolt\'s official account posted: "We are aware of false claims circulating online. ZapBolt meets all FDA and FSSAI safety standards. Our products undergo rigorous testing. We are consulting with our legal team regarding defamatory content."',
      isHidden: false,
    },
    {
      id: 'ct-ev-3',
      title: 'The Actual Harvard Study',
      content:
        'After searching PubMed, you find the study being referenced. It is titled "Cardiovascular Effects of Excessive Caffeine Consumption." It studied the effects of consuming more than 600mg of caffeine daily (about 6 cups of coffee). It found elevated heart rate in a small sample of 23 participants. It does NOT mention ZapBolt or any specific brand. It concluded "more research is needed."',
      isHidden: true,
    },
    {
      id: 'ct-ev-4',
      title: 'Fact-Check Analysis',
      content:
        'Snopes and a health fact-checking site both rate the claim as "Mostly False." They note: the study is real but has been wildly misrepresented. It studied excessive caffeine in general, not ZapBolt specifically. One ZapBolt contains 150mg of caffeine — you would need to drink 4+ daily to reach the study\'s threshold. The "irreversible damage" claim is fabricated.',
      isHidden: true,
    },
    {
      id: 'ct-ev-5',
      title: 'Nutritionist Expert Opinion',
      content:
        'Dr. Priya Sharma, a sports nutritionist, commented on the controversy: "The study is being taken completely out of context. Moderate energy drink consumption (1-2 per day) has not been shown to cause heart damage in healthy adults. However, excessive consumption of any caffeinated product can cause temporary cardiovascular effects. Moderation is key."',
      isHidden: true,
    },
  ],
  decisions: [
    {
      id: 'ct-d1',
      text: 'Share the viral post immediately — better safe than sorry. Your friends need to know.',
      quality: 'poor',
      riskLevel: 'high',
      consequence: {
        immediate:
          'You share the post, adding to its viral spread. Your share reaches hundreds more people. Some of them experience anxiety about their past energy drink consumption. A few make unnecessary and expensive doctor visits. When the fact-checks surface days later, people remember you shared the false claim.',
        explanation:
          'Sharing unverified alarming content — even with good intentions — contributes to misinformation. "Better safe than sorry" sounds reasonable but actually caused harm: unnecessary panic, wasted medical resources, and damaged your credibility.',
        skillInvolved: 'Critical Thinking',
        lesson:
          'The urgency to share health scares quickly is often stronger than the urgency to verify them. But sharing misinformation "to be safe" is not safe — it causes real harm. Take 10 minutes to fact-check before sharing anything alarming.',
      },
      skillImpacts: { criticalThinking: 0 },
    },
    {
      id: 'ct-d2',
      text: 'Stop drinking ZapBolt and tell your friends to do the same — why take the risk?',
      quality: 'average',
      riskLevel: 'low',
      consequence: {
        immediate:
          'You stop drinking ZapBolt, which is a personal choice that doesn\'t cause harm. However, by telling friends to stop without verifying the claim, you spread the unverified fear to your social circle. When the fact-check comes out, your friends realize the panic was overblown.',
        explanation:
          'Your personal caution is reasonable, but advising others based on an unverified claim spreads misinformation person-to-person. This is how false health scares gain credibility — through trusted personal recommendations.',
        skillInvolved: 'Critical Thinking',
        lesson:
          'There\'s a difference between personal caution and spreading unverified claims. You can choose to avoid something while still telling others: "I haven\'t verified this yet — let me check before we all react."',
      },
      skillImpacts: { criticalThinking: 5 },
    },
    {
      id: 'ct-d3',
      text: 'Wait for more information before forming an opinion. Tell friends you\'re looking into it.',
      quality: 'good',
      riskLevel: 'low',
      consequence: {
        immediate:
          'You tell your friends "I saw it too, but I want to check the actual study before reacting." A few days later, fact-checkers debunk the viral claim. Your friends appreciate that you didn\'t contribute to the panic. You maintained your credibility.',
        explanation:
          'Pausing before reacting to alarming content is a critical thinking strength. You resisted the emotional pressure to act immediately and chose to wait for verification.',
        skillInvolved: 'Critical Thinking',
        lesson:
          'In the age of viral content, the ability to pause and say "let me verify this" is one of the most important skills you can develop. Not every alarming claim requires an immediate reaction.',
      },
      skillImpacts: { criticalThinking: 12, communication: 3 },
    },
    {
      id: 'ct-d4',
      text: 'Research the original study, check fact-checkers, and share a balanced analysis with your friends.',
      quality: 'excellent',
      riskLevel: 'low',
      consequence: {
        immediate:
          'You spend 30 minutes finding the actual study on PubMed and reading the fact-check analysis. You send your friends a clear summary: "The study is real but it\'s about excessive caffeine in general, not ZapBolt specifically. One can a day is within safe limits. The viral post exaggerated everything." Your friends are grateful for the clarity.',
        explanation:
          'You demonstrated expert-level critical thinking: you traced the claim to its source, evaluated the evidence, cross-referenced with fact-checkers, and communicated a nuanced conclusion — not just "true" or "false."',
        skillInvolved: 'Critical Thinking',
        lesson:
          'The highest level of critical thinking is not just avoiding misinformation — it\'s actively researching, evaluating sources, understanding nuance, and sharing accurate information. You became part of the solution instead of the problem.',
      },
      skillImpacts: { criticalThinking: 20, communication: 5 },
    },
  ],
  tags: ['misinformation', 'health', 'social-media', 'verification'],
};

// ──────────────────────────────────────────────
// 4. COMMUNICATION (with NPC dialogue)
// ──────────────────────────────────────────────
const communicationScenario: Scenario = {
  id: 'comm-team-conflict',
  title: 'The Team Conflict',
  category: 'communication',
  difficulty: 3,
  ageGroups: ['Young Adult', 'Adult'],
  situation:
    'During a team presentation to your manager, your coworker Alex publicly says: "I think it\'s important to note that the competitor analysis section — which was MY research — didn\'t get any credit in these slides." The room goes quiet. Your manager looks at you. You did use Alex\'s research but forgot to add a credit slide.',
  context:
    'You and Alex have been working on this project for two weeks. You created the slides and presented, while Alex did significant background research. You genuinely forgot to credit Alex — it wasn\'t intentional. But Alex is clearly upset.',
  objective:
    'Handle the public confrontation with Alex and resolve the credit dispute.',
  evidence: [
    {
      id: 'comm-ev-1',
      title: 'Project Email Thread',
      content:
        'Reviewing the email thread, Alex sent you three research documents over the past two weeks: competitor analysis, market trends, and user feedback summary. Your reply was: "Thanks, this is super helpful!" You used all three in the presentation.',
      isHidden: false,
    },
    {
      id: 'comm-ev-2',
      title: 'The Presentation Slides',
      content:
        'Looking at your slides, Alex\'s research appears on slides 4, 7, and 9. The "Contributors" slide only lists your name. There are no citations or attributions anywhere in the deck.',
      isHidden: false,
    },
    {
      id: 'comm-ev-3',
      title: "Alex's Recent Behavior",
      content:
        'You recall that Alex has been quieter than usual in the past week. They mentioned during lunch that they felt their contributions at work were "invisible." A mutual colleague told you Alex was worried about being overlooked for a promotion.',
      isHidden: true,
    },
    {
      id: 'comm-ev-4',
      title: "Team Dynamics Context",
      content:
        'Your team values collaboration, and your manager has previously emphasized the importance of crediting contributors. Last month, another team had a similar issue that created lasting tension.',
      isHidden: true,
    },
  ],
  npcDialogue: {
    npcName: 'Alex',
    npcRole: 'Coworker',
    startNodeId: 'alex-1',
    nodes: {
      'alex-1': {
        id: 'alex-1',
        npcName: 'Alex',
        npcText:
          'After the meeting, Alex approaches you in the hallway. "Look, I didn\'t want to make a scene, but I\'m really frustrated. I spent days on that research and you presented it like it was all your work. Do you have any idea how that felt?"',
        options: [
          {
            id: 'alex-1-a',
            text: '"Honestly, it wasn\'t that much work. I did the hard part — the slides and the actual presentation."',
            tone: 'aggressive',
            nextNodeId: 'alex-2a',
            skillImpact: { communication: 0 },
          },
          {
            id: 'alex-1-b',
            text: '"You\'re right, and I\'m sorry. I should have credited you. Can you tell me more about how you\'re feeling?"',
            tone: 'empathetic',
            nextNodeId: 'alex-2b',
            skillImpact: { communication: 4 },
          },
          {
            id: 'alex-1-c',
            text: '"I mean, if you wanted credit, you should have spoken up earlier instead of calling me out in front of everyone."',
            tone: 'passive',
            nextNodeId: 'alex-2c',
            skillImpact: { communication: 1 },
          },
        ],
        isTerminal: false,
      },
      'alex-2a': {
        id: 'alex-2a',
        npcName: 'Alex',
        npcText:
          'Alex\'s expression hardens. "Wow. So you really don\'t get it. The research IS the hard part — you just put it in pretty slides. I\'m going to talk to the manager about this." Alex walks away.',
        options: [
          {
            id: 'alex-2a-a',
            text: '"Fine, go ahead. I\'m not worried."',
            tone: 'aggressive',
            nextNodeId: null,
            skillImpact: { communication: 0 },
          },
          {
            id: 'alex-2a-b',
            text: '"Wait — I\'m sorry. That came out wrong. Can we start over?"',
            tone: 'empathetic',
            nextNodeId: null,
            skillImpact: { communication: 2 },
          },
        ],
        isTerminal: true,
      },
      'alex-2b': {
        id: 'alex-2b',
        npcName: 'Alex',
        npcText:
          'Alex\'s shoulders relax slightly. "Thank you for saying that. I just... I\'ve been feeling invisible lately. I put real effort into that research and hearing you present it without mentioning me — it hurt. Especially in front of the manager."',
        options: [
          {
            id: 'alex-2b-a',
            text: '"I completely understand. Let me email the manager right now to clarify your contributions. And let\'s co-present the next update together — your research deserves to be heard directly from you."',
            tone: 'assertive',
            nextNodeId: null,
            skillImpact: { communication: 5 },
          },
          {
            id: 'alex-2b-b',
            text: '"I\'ll add your name to the slides and send a correction. It won\'t happen again."',
            tone: 'empathetic',
            nextNodeId: null,
            skillImpact: { communication: 3 },
          },
        ],
        isTerminal: true,
      },
      'alex-2c': {
        id: 'alex-2c',
        npcName: 'Alex',
        npcText:
          '"I shouldn\'t have to ASK for credit for my own work. That\'s the whole point. Look, I don\'t want to fight. Can you just... acknowledge what happened?"',
        options: [
          {
            id: 'alex-2c-a',
            text: '"You\'re right. I messed up. Let me fix this — I\'ll email the manager and credit you properly."',
            tone: 'empathetic',
            nextNodeId: null,
            skillImpact: { communication: 3 },
          },
          {
            id: 'alex-2c-b',
            text: '"Fine. I\'ll add your name to the slides."',
            tone: 'passive',
            nextNodeId: null,
            skillImpact: { communication: 1 },
          },
        ],
        isTerminal: true,
      },
    },
  },
  decisions: [
    {
      id: 'comm-d1',
      text: 'Defend yourself publicly — explain that you did the majority of the work and the slides were yours.',
      quality: 'poor',
      riskLevel: 'high',
      consequence: {
        immediate:
          'You pushback in front of the manager, creating an uncomfortable argument. Alex becomes more upset. The manager privately tells you both to "work it out" but notes that the team dynamic has been damaged. Colleagues start taking sides.',
        explanation:
          'Defending yourself publicly when you made a genuine mistake escalates the conflict. It turns a credit issue into a power struggle. Even if you did more work, dismissing Alex\'s contribution damages trust and team cohesion.',
        skillInvolved: 'Communication',
        lesson:
          'When you\'ve made a mistake, the strongest response is to acknowledge it — not defend it. Public defensiveness almost always escalates conflict and damages relationships beyond the original issue.',
      },
      skillImpacts: { communication: 0, negotiation: 0 },
    },
    {
      id: 'comm-d2',
      text: 'Apologize profusely and give Alex full credit for everything — you just want the conflict to end.',
      quality: 'average',
      riskLevel: 'low',
      consequence: {
        immediate:
          'You say "Alex did everything, I just made the slides." The manager looks confused. Alex feels somewhat vindicated but knows this isn\'t accurate either. The over-correction creates a different kind of dishonesty and makes you look like you didn\'t contribute.',
        explanation:
          'Over-apologizing and giving away all credit is conflict avoidance, not resolution. It\'s not truthful (you did significant work too) and it creates a new imbalance instead of fixing the original one.',
        skillInvolved: 'Communication',
        lesson:
          'Effective conflict resolution requires honesty, not just appeasement. Acknowledge what you did wrong without erasing what you did right. The goal is fairness, not just ending the argument.',
      },
      skillImpacts: { communication: 5, negotiation: 1 },
    },
    {
      id: 'comm-d3',
      text: 'Privately email the manager to explain your side of the story before Alex does.',
      quality: 'average',
      riskLevel: 'medium',
      consequence: {
        immediate:
          'You send the manager a detailed email positioning yourself favorably. When Alex talks to the manager later, it looks like a "he said, she said" situation. The manager is frustrated by the politics and loses respect for both of you.',
        explanation:
          'Going behind Alex\'s back to the manager transforms a simple credit issue into office politics. It shows a lack of willingness to resolve conflict directly and makes you appear manipulative.',
        skillInvolved: 'Communication',
        lesson:
          'Direct communication is almost always more effective than going around someone. If you have a conflict with a colleague, address it with them first. Escalating prematurely erodes trust.',
      },
      skillImpacts: { communication: 5 },
    },
    {
      id: 'comm-d4',
      text: 'Acknowledge Alex\'s contribution publicly, email the manager with proper credit, and propose co-presenting future updates together.',
      quality: 'excellent',
      riskLevel: 'low',
      consequence: {
        immediate:
          'You respond in the meeting: "Alex is right, and I apologize — the research was a critical part of this presentation and I should have credited it. Let me update the deck with proper attribution." After the meeting, you email the manager with a clear breakdown of contributions and suggest co-presenting the next update. Alex appreciates the public acknowledgment. The manager respects your accountability.',
        explanation:
          'You took responsibility publicly (where the mistake happened), corrected it formally, and proposed a constructive solution for the future. This demonstrates emotional intelligence, accountability, and collaborative leadership.',
        skillInvolved: 'Communication',
        lesson:
          'The most effective conflict resolution: (1) Acknowledge the mistake where it happened, (2) Correct it formally, (3) Propose a structural solution so it doesn\'t repeat. This turns a conflict into a team improvement.',
      },
      skillImpacts: { communication: 20, negotiation: 5 },
    },
  ],
  tags: ['workplace', 'conflict', 'credit', 'teamwork', 'npc'],
};

// ──────────────────────────────────────────────
// 5. NEGOTIATION (with NPC dialogue)
// ──────────────────────────────────────────────
const negotiationScenario: Scenario = {
  id: 'neg-salary-discussion',
  title: 'The Salary Discussion',
  category: 'negotiation',
  difficulty: 3,
  ageGroups: ['Young Adult', 'Adult'],
  situation:
    'You\'ve been offered your dream role as a Product Analyst at a growing startup. The offer letter says ₹6,00,000 per annum. But your research shows the market rate for this role with your qualifications is ₹7,50,000–₹9,00,000. The HR manager Priya seems eager to close the deal today.',
  context:
    'This is your first serious job offer after graduating. You really want this job, but the salary is significantly below market rate. You have no other offers currently, but you had a strong interview performance.',
  objective:
    'Negotiate the salary offer while maintaining the job opportunity.',
  evidence: [
    {
      id: 'neg-ev-1',
      title: 'The Offer Letter',
      content:
        'Role: Product Analyst\nSalary: ₹6,00,000/year\nBenefits: Health insurance, 18 days PTO, flexible work\nStart Date: Next month\nNote: "Please confirm your acceptance within 3 business days."',
      isHidden: false,
    },
    {
      id: 'neg-ev-2',
      title: 'Market Salary Data',
      content:
        'According to Glassdoor, AmbitionBox, and LinkedIn Salary Insights:\n- Product Analyst (entry-level, similar companies): ₹7,00,000–₹9,00,000\n- Average for your city: ₹8,00,000\n- With your internship experience and certifications: ₹7,50,000–₹8,50,000',
      isHidden: true,
    },
    {
      id: 'neg-ev-3',
      title: 'Company Glassdoor Reviews',
      content:
        'The company has 4.2 stars on Glassdoor. Several reviews mention: "Great culture and growth opportunities, but starting salaries tend to be low. Those who negotiate get significantly better packages. Annual raises have been 15-20%."',
      isHidden: true,
    },
    {
      id: 'neg-ev-4',
      title: 'Your Interview Performance Notes',
      content:
        'During the final round, the hiring manager said: "You\'re exactly the kind of candidate we need. Your data analytics portfolio really stood out." The HR manager mentioned they\'d been trying to fill this role for 3 months.',
      isHidden: true,
    },
  ],
  npcDialogue: {
    npcName: 'Priya',
    npcRole: 'HR Manager',
    startNodeId: 'priya-1',
    nodes: {
      'priya-1': {
        id: 'priya-1',
        npcName: 'Priya',
        npcText:
          'Priya calls you. "Hi! We\'re really excited to have you join the team. I wanted to check — have you had a chance to review the offer? We\'d love to get your confirmation today if possible!"',
        options: [
          {
            id: 'priya-1-a',
            text: '"Yes, I accept! I\'m thrilled about the offer. When do I start?"',
            tone: 'passive',
            nextNodeId: null,
            skillImpact: { negotiation: 0 },
          },
          {
            id: 'priya-1-b',
            text: '"I\'m very excited about the role! However, I\'d like to discuss the compensation. Based on my research, the market rate for this role is ₹7,50,000–₹9,00,000. Given my qualifications, I was hoping we could discuss a salary closer to ₹8,00,000."',
            tone: 'assertive',
            nextNodeId: 'priya-2b',
            skillImpact: { negotiation: 5 },
          },
          {
            id: 'priya-1-c',
            text: '"Honestly, ₹6 lakhs is way too low. I know people getting ₹10 lakhs for this role. I need at least ₹10,00,000 or I\'m not interested."',
            tone: 'aggressive',
            nextNodeId: 'priya-2c',
            skillImpact: { negotiation: 1 },
          },
        ],
        isTerminal: false,
      },
      'priya-2b': {
        id: 'priya-2b',
        npcName: 'Priya',
        npcText:
          '"I appreciate you being upfront about that. I understand market rates have shifted. Let me see what I can do — our budget for this role does have some flexibility. Could you share the salary data you\'re referencing?"',
        options: [
          {
            id: 'priya-2b-a',
            text: '"Absolutely — here are the Glassdoor and LinkedIn figures for Product Analyst roles in our city. I\'m also bringing an analytics certification and internship experience that I believe adds value."',
            tone: 'assertive',
            nextNodeId: null,
            skillImpact: { negotiation: 5 },
          },
          {
            id: 'priya-2b-b',
            text: '"I don\'t have exact numbers, but I\'ve heard from friends that it should be higher."',
            tone: 'passive',
            nextNodeId: null,
            skillImpact: { negotiation: 2 },
          },
        ],
        isTerminal: true,
      },
      'priya-2c': {
        id: 'priya-2c',
        npcName: 'Priya',
        npcText:
          '"I appreciate your confidence, but ₹10 lakhs is significantly above our band for this role. We do value you as a candidate, but we need to be realistic. Is there a number you\'d be comfortable with that\'s within a reasonable range?"',
        options: [
          {
            id: 'priya-2c-a',
            text: '"You\'re right, I may have overshot. Based on market data, would ₹8,00,000 be feasible? I believe my skills justify that range."',
            tone: 'assertive',
            nextNodeId: null,
            skillImpact: { negotiation: 3 },
          },
          {
            id: 'priya-2c-b',
            text: '"Fine, I\'ll take whatever you offer then."',
            tone: 'passive',
            nextNodeId: null,
            skillImpact: { negotiation: 0 },
          },
        ],
        isTerminal: true,
      },
    },
  },
  decisions: [
    {
      id: 'neg-d1',
      text: 'Accept the ₹6,00,000 offer immediately — you don\'t want to risk losing the job.',
      quality: 'poor',
      riskLevel: 'low',
      consequence: {
        immediate:
          'You accept the offer at ₹6,00,000. You start the job and discover that a colleague hired the same week — with similar qualifications — negotiated ₹7,80,000. Over the next year, despite strong performance, your raises are calculated as a percentage of your base salary, meaning the gap grows over time.',
        explanation:
          'Accepting without negotiating left ₹1,50,000–₹2,00,000+ on the table. Most companies expect candidates to negotiate and build room for it into initial offers. Not negotiating is often interpreted as lack of confidence, not loyalty.',
        skillInvolved: 'Negotiation',
        lesson:
          'Almost all job offers have negotiation room built in. Not negotiating doesn\'t make you a "grateful" employee — it costs you real money, compounding over years. The company won\'t rescind an offer just because you negotiate respectfully.',
      },
      skillImpacts: { negotiation: 0 },
    },
    {
      id: 'neg-d2',
      text: 'Demand ₹10,00,000 — go in high and let them counter down.',
      quality: 'average',
      riskLevel: 'high',
      consequence: {
        immediate:
          'Priya is taken aback by the aggressive demand. She explains the role\'s salary band caps at ₹8,50,000. After some back-and-forth, she offers ₹7,20,000 as a compromise, but the interaction has left a slightly negative impression. You accept, but start the job with a reputation for being "difficult."',
        explanation:
          'Anchoring high can work in some negotiations, but going unrealistically high (₹10L for a ₹6L offer) damages credibility. The counter-offer was decent, but the relationship cost is real — first impressions in a new job matter.',
        skillInvolved: 'Negotiation',
        lesson:
          'Effective negotiation requires credible anchoring. Your opening ask should be ambitious but justified by evidence (market data, qualifications). An unrealistic demand undermines your credibility and can damage the professional relationship.',
      },
      skillImpacts: { negotiation: 5, communication: 1 },
    },
    {
      id: 'neg-d3',
      text: 'Say you need time to think about it and will respond within the 3-day window.',
      quality: 'good',
      riskLevel: 'low',
      consequence: {
        immediate:
          'You use the time to research market rates, prepare your case, and draft a professional counter-proposal at ₹7,80,000. Priya responds positively and offers ₹7,50,000 with a 6-month review for further increase. You accept. A solid outcome, though taking the full 3 days delayed the process.',
        explanation:
          'Taking time to prepare was smart — you avoided impulsive acceptance and built a data-driven case. However, you didn\'t demonstrate the confidence to negotiate in real-time, which is itself a valuable skill.',
        skillInvolved: 'Negotiation',
        lesson:
          'Taking time to prepare a negotiation is better than negotiating unprepared. But building the confidence to negotiate in the moment — backed by preparation you\'ve already done — is the strongest approach.',
      },
      skillImpacts: { negotiation: 12, criticalThinking: 3 },
    },
    {
      id: 'neg-d4',
      text: 'Express enthusiasm for the role, present market salary data, and make a specific counter-offer of ₹8,00,000 backed by your qualifications.',
      quality: 'excellent',
      riskLevel: 'medium',
      consequence: {
        immediate:
          'You say: "I\'m very excited about this role and the team. Based on market data from Glassdoor and LinkedIn, the range for this role is ₹7.5L–₹9L. Given my analytics certification and internship experience, I\'d like to propose ₹8,00,000." Priya appreciates the professionalism, checks with the hiring manager, and comes back with ₹7,80,000 plus a signing bonus of ₹30,000. You accept. You start the job with a reputation for being professional and self-assured.',
        explanation:
          'You combined enthusiasm (showing you want the job) with evidence-based negotiation (market data, specific qualifications). The counter-offer was specific and justified, making it easy for Priya to advocate for you internally.',
        skillInvolved: 'Negotiation',
        lesson:
          'The best salary negotiations: (1) Express genuine enthusiasm first, (2) Present specific market data, (3) Make a precise counter-offer (not a range), (4) Tie it to your unique qualifications. This approach is respectful, professional, and effective.',
      },
      skillImpacts: { negotiation: 20, communication: 5 },
    },
  ],
  tags: ['salary', 'job-offer', 'workplace', 'first-job', 'npc'],
};

// ──────────────────────────────────────────────
// EXPORT ALL SCENARIOS
// ──────────────────────────────────────────────
export const scenarios: Scenario[] = [
  financialScenario,
  cybersecurityScenario,
  criticalThinkingScenario,
  communicationScenario,
  negotiationScenario,
];
