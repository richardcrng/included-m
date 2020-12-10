import { Topic } from "../types";
import whatIsVentureCapital from "./chapters/01-01-what-is-venture-capital";
import fundStructure from "./chapters/01-02-fund-structure";

const vcFundamentals: Topic = {
  topicTitle: 'Fundamentals of Venture Capital',
  description: 'Learn about the the fund structures, financial dynamics and performance metrics in VC.',
  chapters: [
    whatIsVentureCapital,
    fundStructure
  ]
}

export default vcFundamentals