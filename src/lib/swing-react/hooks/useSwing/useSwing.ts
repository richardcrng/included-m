import { useState, useEffect } from 'react';
import * as Swing from "../../core";

interface Config {
  stackConfig?: Swing.Types.StackConfig,
  onThrowOut?(e: Swing.Types.SwingEvent, stack: Swing.Types.Stack): void 
}

function useSwing<EType extends HTMLElement = HTMLElement>({
  stackConfig,
  onThrowOut
}: Config) {
  const [stack] = useState(Swing.Stack(stackConfig))

  // set listeners
  useEffect(() => {
    const listener = stack.on("throwout", function destroyCardAndUpdateState(e: Swing.Types.SwingEvent) {
      const thrownCard = stack.getCard(e.target);
      thrownCard && thrownCard.destroy();
      onThrowOut && onThrowOut(e, stack)
    });

    return function cleanup() {
      stack.off(listener)
    }
  }, [onThrowOut, stack]);

  return { stack }
}

export default useSwing;