import React from "react";
import vendorPrefix from 'vendor-prefix'
import useSwing from "../../hooks/useSwing";
import { SwingContext, RenderCardArg } from "./SwingContext";
import SwingCore from "../../core/types";

function transform(
  element: HTMLElement,
  coordinateX: number,
  coordinateY: number,
  rotation: number
) {
  // @ts-ignore
  element.style[vendorPrefix('transform')] = 'translate3d(0, 0, 0) translate(' + coordinateX + 'px, ' + coordinateY + 'px) rotate(' + rotation + 'deg)';
}

const defaultStackConfig = {
  throwOutConfidence(xOffset: number, yOffset: number, element: HTMLElement) {
    const xConfidence = Math.min(Math.abs(xOffset) / (0.5 * element.offsetWidth), 1)
    const yConfidence = Math.min(Math.abs(yOffset) / (0.3 * element.offsetHeight), 1)

    return Math.max(xConfidence, yConfidence)
  },

  maxRotation: 45
}

export interface Props<TCard> {
  cards: TCard[],
  getCardKey: (card: TCard) => string | number,
  renderCard?: ({ card, idx, ref }: RenderCardArg<TCard>) => React.ReactNode,
  onThrowOut(e: SwingCore.SwingEvent): void,
  children?: React.ReactNode,
  stackConfig?: SwingCore.StackConfig
}

export default function Swing<TCard>({
  cards,
  children,
  getCardKey,
  renderCard = ({ card }) => <div>{JSON.stringify(card)}</div>,
  onThrowOut,
  stackConfig: providedConfig = {}
}: Props<TCard>) {
  const stackConfig = { ...defaultStackConfig, ...providedConfig }
  const { stack } = useSwing({ stackConfig, onThrowOut })

  const firstCardRef = React.useRef<HTMLLIElement>(null);

  // every time cards changes, add first card to the stack
  //  if not already there
  React.useEffect(() => {
    if (stack && firstCardRef.current) {
      !stack.getCard(firstCardRef.current)
        && stack.createCard(firstCardRef.current);
    }
  }, [cards, firstCardRef, stack]);

  const triggerThrow = (thrownRight: boolean) => {
    const multiplier = thrownRight ? 1 : -1
    const xDist = 40
    const yDist = 12
    const rotation = 4
    const secs = 20

    if (!firstCardRef.current) return
    const card = stack.getCard(firstCardRef.current)

    const animate = (num: number) => {
      setTimeout(() => {
        if (!firstCardRef.current) return
        transform(firstCardRef.current, multiplier * num * xDist, num * yDist, multiplier * num * rotation)
      }, num * secs)
    }

    const arr = new Array(5).fill(null)
    for (let key in arr) {
      const n = +key + 1
      if (n === arr.length) {
        // final in array: end by throwing out card
        setTimeout(() => {
          card && card.throwOut(multiplier * n * xDist, n * yDist)
        }, n * secs)
      } else {
        animate(n)
      }
    }
  }

  const swingData = {
    cards,
    firstCardRef,
    getCardKey,
    renderCard,
    triggerThrow
  }

  return (
    <SwingContext.Provider value={swingData}>
      {children}
    </SwingContext.Provider>
  );
}