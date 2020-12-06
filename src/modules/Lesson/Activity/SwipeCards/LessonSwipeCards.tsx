import { IonCard, IonCardContent } from '@ionic/react';
import React from 'react';
import Swing, { Core } from '../../../../lib/swing-react';
import { SwipeCard } from '../../lesson-types';
import LessonContent from '../../LessonContent';

interface Props {
  cards: SwipeCard[],
  // onThrowOut: (e: Core.Types.SwingEvent) => void
}

function LessonSwipeCards({
  cards,
  // onThrowOut
}: Props) {

  console.log(cards)

  return (
    <Swing.Provider
      cards={cards}
      getCardKey={(card) => card.text}
      onThrowOut={() => undefined}
      renderCard={({ card, idx }) => (
        <IonCard key={card.text} >
          <IonCardContent>
            {card.text}
          </IonCardContent>
        </IonCard>
      )}
    >
      <Swing.Stack<SwipeCard>>
        {(cardNodes, swingData) => {
          return (
            <LessonContent>
              <button>Left</button>
              <button>Right</button>
            </LessonContent>
          )
        }}
      </Swing.Stack>
    </Swing.Provider>
  );
}

export default LessonSwipeCards;
