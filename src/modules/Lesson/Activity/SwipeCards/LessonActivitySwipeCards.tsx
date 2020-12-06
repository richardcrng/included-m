import React from 'react';
import { IonButton, IonCard, IonCardContent, IonFooter, IonIcon } from '@ionic/react';
import { arrowBack, arrowForward, card } from 'ionicons/icons';
import Swing, { Core } from '../../../../lib/swing-react';
import { SwipeCard, SwipeCardsActivity } from '../../lesson-types';
import LessonContent from '../../LessonContent';
import LessonContentBlock from '../../LessonContentBlock';

interface Props {
  activity: SwipeCardsActivity
}

function LessonActivitySwipeCards({
  activity,
}: Props) {

  const [cardsState, setCardsState] = React.useState(activity.cards.map(card => ({
    ...card,
    count: 0
  })))

  return (
    <Swing.Provider
      cards={cardsState}
      getCardKey={(card) => `${card.text}-${card.count}`}
      onThrowOut={(swingEvent, stack) => {
        const directionMatches = (
          cardsState[0].isRight && swingEvent.throwDirection === Core.Direction.RIGHT
        ) || (
          !cardsState[0].isRight && swingEvent.throwDirection === Core.Direction.LEFT
        )
        if (directionMatches) {
          setCardsState(([first, ...rest]) => rest)
        } else {
          // return card to top of stack
          setCardsState(([first, ...rest]) => [
            { ...first, count: first.count + 1 },
            ...rest
          ])
        }
      }}
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
            <>
              <LessonContent>
                {activity.blocks.map(block => (
                  <LessonContentBlock
                    key={JSON.stringify(block)}
                    block={block}
                  />
                ))}
                <Swing.Cards>
                  {cardNodes}
                </Swing.Cards>
              </LessonContent>
              <IonFooter>
                <IonButton expand='full'>
                  <IonIcon slot='start' icon={arrowBack} />
                  {activity.choices[0]}
                </IonButton>
                <IonButton expand='full' style={{ textAlign: 'left' }}>
                  <IonIcon slot='end' icon={arrowForward} />
                  {activity.choices[1]}
                </IonButton>
              </IonFooter>
            </>
          )
        }}
      </Swing.Stack>
    </Swing.Provider>
  );
}

export default LessonActivitySwipeCards;
