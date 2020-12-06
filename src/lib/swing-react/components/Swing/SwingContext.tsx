import React from 'react';

export interface SwingContextValue<TCard = any> {
  cards: TCard[],
  disabled?: boolean,
  firstCardRef: React.RefObject<HTMLLIElement>,
  getCardKey: (card: TCard) => string | number,
  renderCard: ({ card, idx, ref } : RenderCardArg<TCard>) => React.ReactNode,
  triggerThrow: (right: boolean) => void
}

export interface RenderCardArg<TCard> {
  card: TCard,
  idx: number,
  ref?: React.RefObject<HTMLLIElement>
}

export const SwingContext = React.createContext<SwingContextValue>({
  cards: [],
  disabled: false,
  firstCardRef: React.createRef(),
  getCardKey: (card) => card.id,
  renderCard: ({ card }) => <div>{JSON.stringify(card)}</div>,
  triggerThrow: (boolean) => {}
})

export default SwingContext