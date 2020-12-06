import { Activity } from "./lesson-types"

const readActivity: Activity = {
  activityType: 'read',
  blocks: [
    "Venture Capital (VC) is a form of private financing provided by VC funds to early-stage, high potential companies. Whilst providing capital to early-stage companies in exchange for equity is arguably the primary role of a VC investor, some also provide founders with other ‘services’ such as strategic guidance and expertise in relevant industries.",
  ]
}

const selectActivity: Activity = {
  activityType: 'select-multiple',
  blocks: [
    "Within six months, Juicero had shuttered, offering a full refund to their customers.",
    "What do you suppose were some of the missteps that led to Juicero's demise?",
  ],
  answers: [
    {
      text: "They needed more celebrity endorsements.",
      isCorrect: false,
    },
    {
      text: "They assumed they knew what customers wanted from the product.",
      isCorrect: true,
    },
    {
      text: "They didn't raise enough money.",
      isCorrect: false
    },
    {
      text: "They scaled prematurely without knowing for sure their business model worked.",
      isCorrect: true
    }
  ]
}

const selectForEachBlankSimpleActivity: Activity = {
  activityType: 'select-for-each-blank',
  blocks: [
    "To be successful, startups shouldn't just try to be a scaled-down version of a large company.",
    "For existing companies with a known market, {{traditional product development}} can work just fine.",
    "But if you're unsure about what you're selling and who you're going to sell it to, {{a startup model}} might be more appropriate."
  ]
}

const selectForEachBlankComplexActivity: Activity = {
  activityType: 'select-for-each-blank',
  blocks: [
    "In the early days, a startup operates in 'search mode' - its business model is just a collection of unproven hypotheses.",
    "During these first two phases, it's necessary to test these hypotheses by getting in front of customers {{early and often}}.",
    "It's also important to limit spending until the {{customer creation and company building phases}}, when the business model is known."
  ]
}

const selectAnAnswerActivity: Activity = {
  activityType: 'select-an-answer',
  blocks: [
    "But what exactly is a startup? For our purposes, let's turn to Steve Blank's definition:",
    "> A *startup* is a temporary organization in search of a scalable, repeatable, profitable business model.",
    "Essentially, this means:"
  ],
  answers: [
    {
      text: 'All startups either get sold or shut down after a while.',
      isCorrect: false
    },
    {
      text: 'Startups are adaptable organizations whose primary goal is to *find* a business model - not to execute one.',
      isCorrect: true
    }
  ]
}

const swipeActivity: Activity = {
  activityType: 'swipe-cards',
  blocks: ["Are the following examples startups or something else?"],
  cards: [
    { text: "A large conglomerate updates the colour of its best-selling product.", isRight: true },
    { text: "A student wants to start a social network for children.", isRight: false },
    { text: "A journalist quits her job and decides to go freelance.", isRight: true },
    { text: "An engineer wants to design an app to sell.", isRight: false }
  ],
  choices: ["startup", "something else"]
}

const activities: Activity[] = [
  {
    activityType: 'select-for-each-blank',
    blocks: [
      "Venture Capital (VC) is a form of private financing provided by VC funds to early-stage, high potential companies.",
      "Whilst providing {{capital to early-stage companies in exchange for equity}} is arguably the *primary* role of a VC investor, some also provide founders with {{other ‘services’ such as strategic guidance and expertise in relevant industries}}.",
    ]
  },
  {
    activityType: 'select-multiple',
    blocks: [
      "Every fund looks to define their unique opportunity space and sustainable competitive advantage, but they share some things in common.",
      "What do you think those things are?"
    ],
    answers: [
      {
        text: "They take risks by funding early-stage ventures.",
        isCorrect: true,
        feedback: "That's right - what an exciting business!"
      },
      {
        text: 'They are profitable.',
        isCorrect: false,
        feedback: "If only! There's no guarantee in venture capital of profitability..."
      },
      {
        text: 'They manage billions of pounds of assets.',
        isCorrect: false,
        feedback: "Some funds might have a portfolio valued at billions, but most funds have millions rather than billions that they deploy."
      },
      {
        text: "They have the intention of achieving large returns for their investors.",
        isCorrect: true,
        feedback: "That's right - VCs have their own investors to answer to!"
      }
    ]
  },
  {
    activityType: 'read',
    blocks: [
      "As is the case with most high-risk investment vehicles, VC investments experience high rates of failure.",
      "A 2012 research project conducted by HBS Professor, Shikhar Ghosh stated that around 75% of all venture-backed start-ups fail, whilst a report by Startup Genome predicted this figure to be as high as 90%."
    ]
  },
  {
    activityType: 'select-an-answer',
    blocks: [
      "The best performing funds tend to have a different failure rate in startups that they back to average funds.",
      "How do you think it's different?"
    ],
    answers: [
      {
        text: "Higher - go big or go home!",
        isCorrect: true,
        feedback: "That's right! Isn't that interesting?"
      },
      {
        text: "Lower - they're better performing funds after all!",
        isCorrect: false,
        feedback: "You might think so, but no! Fund returns are not *just* a function of failure rate."
      }
    ]
  },
  {
    activityType: 'read',
    blocks: [
      "Regardless of the exact figure, it is pretty clear that a startup’s pathway to success is an arduous one, thus VC investors are exacting with their capital and are structured in a way so as to balance good governance with risk-taking while endeavouring to create substantial returns for their investors."
    ]
  }
]


export default activities