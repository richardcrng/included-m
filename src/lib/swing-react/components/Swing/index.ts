import Swing, { Props } from "./Swing";
import { SwingContextValue } from './SwingContext';

export default Swing
export type SwingProps<TCard> = Props<TCard>
export type SwingData<TCard> = SwingContextValue<TCard>