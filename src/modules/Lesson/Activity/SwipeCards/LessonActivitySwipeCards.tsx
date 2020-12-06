import { IonButton, IonCard, IonCardContent, IonFooter, IonIcon } from '@ionic/react';
import React from 'react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import Swing, { Core } from '../../../../lib/swing-react';
import { SwipeCard, SwipeCardsActivity } from '../../lesson-types';
import LessonContent from '../../LessonContent';
import LessonContentBlock from '../../LessonContentBlock';

interface Props {
  activity: SwipeCardsActivity
  // onThrowOut: (e: Core.Types.SwingEvent) => void
}

function LessonActivitySwipeCards({
  activity,
  // onThrowOut
}: Props) {

  return (
    <Swing.Provider
      cards={activity.cards}
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
            <>
              <LessonContent>
                {activity.blocks.map(block => (
                  <LessonContentBlock
                    key={JSON.stringify(block)}
                    block={block}
                  />
                ))}
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
