import React from 'react';
import OuterCard from '../OuterCard';
import useSwingData from '../../hooks/useSwingData';
import { SwingProps, SwingData } from '../Swing';
import StackedCards from '../StackedCards';

interface StackProps<TCard> {
  children?(cardNodes: React.ReactNode[], swingData: SwingData<TCard>, StackedCards: React.FC): React.ReactNode,
  renderCard?: SwingProps<TCard>['renderCard']
}

function Stack<TCard>({
  children = (cardNodes, cards, StackedCards) => (
    <StackedCards>{cardNodes}</StackedCards>
  ),
  renderCard: passedRenderCard
}: StackProps<TCard>) {

  const swingData = useSwingData<TCard>()

  const renderCard = passedRenderCard || swingData.renderCard

  const cardNodes = swingData.cards.reduce(
    (acc: React.ReactNode[], card, idx) => {
      // if (idx > 2) return acc

      return [
        <OuterCard
          key={swingData.getCardKey(card)}
          ref={idx === 0 ? swingData.firstCardRef : undefined}
        >
          {renderCard({ card, idx })}
        </OuterCard>,
        ...acc
      ]
    }, []
  )

  return (
    <>
      {children(cardNodes, swingData, StackedCards)}
    </>
  )
}

export default Stack;