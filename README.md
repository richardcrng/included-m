<h1><img src="./src/assets/included-vc-logo.png" alt="Included VC" width="200"/></h1>

# Included M

> _📱 **Try the Included M demo** (best on a mobile browser): [https://included-m.vercel.app](https://included-m.vercel.app)_

**Contents**

- [Included M](#included-m)
  - [Goals](#goals)
  - [Background](#background)
  - [Roadmap](#roadmap)
    - [Target](#target)
    - [So far](#so-far)
    - [In progress](#in-progress)
  - [Content](#content)
  - [Tech used](#tech-used)
  - [How to contribute](#how-to-contribute)

<p float="left">
  <img src="./images/course-view.png" width="30%" />
  <img src="./images/chapter-view.png" width="30%" /> 
  <img src="./images/lesson-view.png" width="30%" />
</p>

## Goals

The goals of Included M are:

1. **To improve Fellow experience.** Included has great content (e.g. through 101 packs). Mostly, it's static written content at the moment. What if we could present that content in a more modern way?
2. **To broaden impact beyond Fellows.** Included has had to turn down a lot of people. We can't give them the _full_ Fellow experience, but what if we could give them _something_?
3. **To strengthen the Included brand.** We're re-imagining how people learn venture and enter the industry. What if we had our own product to do that?

Enter [**Included M**](https://included-m.vercel.app): a mobile-first web app that is designed to:

- amplify the reach of Included's content; and
- wrap up that content in engaging, bite-sized chunks.

## Background

Even with the pilot cohort (IVC20), there was always the aspiration to create a learning pathway that went beyond the Fellowship.

This originally had a working title of _Included 1000_.

Now, after a conversation with Stephen and Nikita, I ([Richard](https://richard.ng)) am trying to push this forwards.

I'm drawing heavy inspiration from my experience of [Quantic's mobile-first MBA](https://quantic.edu/), which I think does a pretty good job of making text content come to life through bite-sized and frequent interaction.

> 💡 The _M_ in Included M represents both scale (**M** is the roman numeral for 1000) and an emphasis on being **m**obile-optimised.

## Roadmap

### Target

The goal is to launch Included M on Product Hunt, either to coincide with recruitment for IVC22 or possibly before.

To get to that point, we need:

1. A curriculum overview (how is it all structured?)
2. Partial lesson content (at least a couple of modules/units, say
3. Some sort of PH launch plan

This, to my mind, does not have to include:

1. Full content - so look as we have some substantial content (although the more the better)
2. Saving of user progress
3. Native mobile apps

because the PH launch is almost like an MVP - we can spend time building full content and other features if there seems to be sufficient interest (and e.g. do a PH version 2.0 launch).

### So far

At the moment, what I've done so far is:

- Build the basic platform as a web app (for speed / cross-platform flexibility)
- Create a format for authoring content (e.g. [here's the sample lesson that gets fed in](https://github.com/richardcrng/included-m-content/blob/main/main-course/fundamentals/what-is-venture/goals-of-venture/index.yaml))
- Deploy with account creation and sample lesson at https://included-m.vercel.app

### In progress

- Curriculum structure (drawing from our own 101s and other venture education curricula) - _contributions welcome_
- Lesson content (turning curriculum structure into interactive experiences) - _contributions welcome_
- A guide / standard / tutorial for authoring content to go onto the platform

## Content

Most of the work for Included M is populating content. (If you try the demo, you will see that _most_ content is filler / holding at the moment. As of January 2021, it is only the first lesson of the very first chapter that has _any_ sort of content.)

Content is organised into a sequential hierarchy of:

1. Courses (for now, just one: `main-course`);
2. Topics (e.g. `main-course/fundamentals` and `maincourse-/dealflow`)
3. Chapters (e.g. `main-course/fundamentals/what-is-venture`)
4. Lessons (e.g. `main-course/fundamentals/what-is-venture/goals-of-venture`)

## Tech used

- React
- TypeScript
- [Riduce](https://riduce.richard.ng)
- Ionic

## How to contribute

You can:

- **Produce / adapt content** (very, very light formatting requirements; guide under construction)
- **Test it out** and report bugs / unexpected behaviour
- **Work on Prodct Hunt launch strategy**

or suggest other things!
