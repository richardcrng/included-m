import Swing from "./components/Swing";
import Stack from "./components/Stack";
import StackedCards from './components/StackedCards';
import * as Core from './core'
import useSwingData from "./hooks/useSwingData";

export default {
  Provider: Swing,
  Stack,
  Cards: StackedCards,
  Core
}

export {
  Stack,
  StackedCards,
  Swing,
  useSwingData,
  Core
}