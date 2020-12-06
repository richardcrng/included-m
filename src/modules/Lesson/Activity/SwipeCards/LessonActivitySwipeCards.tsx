import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonFooter, IonIcon } from '@ionic/react';
import { arrowBack, arrowForward, card } from 'ionicons/icons';
import Swing, { Core } from '../../../../lib/swing-react';
import { SwipeCard, SwipeCardsActivity } from '../../lesson-types';
import LessonContent from '../../LessonContent';
import LessonContentBlock from '../../LessonContentBlock';
import Notification, { NotificationProps } from '../../../../components/atoms/Notification';

interface Props {
  activity: SwipeCardsActivity
}

function LessonActivitySwipeCards({
  activity,
}: Props) {
  const [notificationState, setNotificationState] = useState<NotificationProps>({ message: '', isShowing: false })

  const [cardsState, setCardsState] = React.useState(activity.cards.map(card => ({
    ...card,
    count: 0
  })))

  return (
    <Swing.Provider
      cards={cardsState}
      disabled={notificationState.isShowing}
      getCardKey={(card) => `${card.text}-${card.count}`}
      onThrowOut={(swingEvent, stack) => {
        const directionMatches = (
          cardsState[0].isRight && swingEvent.throwDirection === Core.Direction.RIGHT
        ) || (
          !cardsState[0].isRight && swingEvent.throwDirection === Core.Direction.LEFT
        )
        if (directionMatches) {
          setCardsState(([first, ...rest]) => rest)
          setNotificationState({
            message: 'Amazing!',
            color: 'success',
            isShowing: true
          })
        } else {
          // return card to top of stack
          setCardsState(([first, ...rest]) => [
            { ...first, count: first.count + 1 },
            ...rest
          ])
          setNotificationState({
            message: 'Not quite...',
            color: 'warning',
            isShowing: true
          })
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
      <Notification
        isShowing={notificationState.isShowing}
        color={notificationState.color}
        header={notificationState.header}
        message={notificationState.message}
        position='top'
        duration={1000}
        buttons={[notificationState.buttonText || 'Close']}
        onDidDismiss={() => {
          setNotificationState(prevState => ({
            ...prevState,
            isShowing: false
          }))
        }}
      />
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
                <IonButton
                  disabled={notificationState.isShowing}
                  expand='full'
                  onClick={() => swingData.triggerThrow(false)}
                >
                  <IonIcon slot='start' icon={arrowBack} />
                  {activity.choices[0]}
                </IonButton>
                <IonButton
                  disabled={notificationState.isShowing}
                  expand='full'
                  onClick={() => swingData.triggerThrow(true)}
                >
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
