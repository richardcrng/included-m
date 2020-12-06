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
    activityType: 'read',
    blocks: [
      "Venture Capital (VC) is a form of private financing provided by VC funds to early-stage, high potential companies. Whilst providing capital to early-stage companies in exchange for equity is arguably the primary role of a VC investor, some also provide founders with other ‘services’ such as strategic guidance and expertise in relevant industries.",
    ]
  },
  {
    activityType: 'read',
    blocks: [
      "Daniel Blomquist summed up Creandum’s purpose when announcing [their recent $300m fund](https://blog.creandum.com/creandum-v-6b11f646e14d):",
      "> Over the past 15 years, we have developed from backing many of the Nordic BUSD companies, to now working with these founders from anywhere in Europe. With offices in Stockholm, Berlin, and San Francisco, we are able to serve European founders locally as well as in the US with the aim to support them in building globally leading companies.",
      "> Our experience has taught us that it takes time to grow a hyper-successful, globally dominant business, and only those are the ones we continue to look for. This is a key part of our historic success: back disruptors early and stay with them long term."
    ]
  }
]


export default activities