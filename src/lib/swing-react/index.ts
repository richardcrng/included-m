import Swing from "./components/Swing";
import Stack from "./components/Stack";
import StackedCards from './components/StackedCards';
import * as Core from './core'
import useSwingData from "./hooks/useSwingData";

const SwingReact = {
  Provider: Swing,
  Stack,
  Cards: StackedCards,
  Core
}

export default SwingReact

export {
  Stack,
  StackedCards,
  Swing,
  useSwingData,
  Core
}