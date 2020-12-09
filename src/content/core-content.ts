import { Course } from "./types";
import vcFundamentals from "./01-vc-fundamentals";

const coreCourse: Course = {
  courseTitle: 'Included M',
  description: 'Included M is a free learning pathway in venture capital, brought to you by Included VC.',
  topics: [
    vcFundamentals,
    {
      topicTitle: 'Dealflow: Sourcing',
      description: 'Discover what dealflow is, where it comes from and what the different models of it are.',
      chapters: []
    }
  ]
}

export default coreCourse