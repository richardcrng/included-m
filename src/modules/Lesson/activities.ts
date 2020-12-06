import { Activity } from "./lesson-types"

const readActivity: Activity = {
  activityType: 'read',
  blocks: [
    "The startup Juicero was convinced that customers would pay nearly $700 for their product. By 2017, they had raised almost $120m and hired over 200 employees.",
    "But sales were middling after product launch. Despite slashing prices, Juicero was steadily losing money, especially after it came out that squeezing their bags by hand was just as efficient.",
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
      text: "They scaled correctly without knowing for sure their business model worked.",
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

const activities: Activity[] = [
  selectForEachBlankSimpleActivity,
  readActivity,
  selectActivity,
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] },
  { activityType: 'read', blocks: [] }
]


export default activities