import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonFooter, IonIcon } from '@ionic/react';
import { arrowBack, arrowForward } from 'ionicons/icons';
import { shuffle } from 'lodash';
import Swing, { Core } from '../../../../../lib/swing-react';
import LessonContent from '../../LessonContent';
import LessonContentBlock from '../../LessonContentBlock';
import Notification, { NotificationProps } from '../../../../../ui/atoms/Notification';
import LessonContinueButton from '../../LessonContinueButton';
import { ActivityRawDeep } from '../../../../../models/Activity';
import { CardRaw } from '../../../../../models/Card';

interface Props {
  activity: ActivityRawDeep
}

function LessonActivitySwipeCards({
  activity,
}: Props) {
  const [notificationState, setNotificationState] = useState<NotificationProps>({ message: '', isShowing: false })

  const [cardsState, setCardsState] = React.useState(shuffle(activity.cards).map(card => ({
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
          const feedback = cardsState[0].feedbackOnCorrect || 'Amazing!'
          const newNotification = { message: feedback, color: 'success', isShowing: true }
          setNotificationState(newNotification)
          setCardsState(([first, ...rest]) => rest)
        } else {
          const feedback = cardsState[0].feedbackOnNotCorrect || 'Not quite'
          const newNotification = { message: feedback, color: 'warning', isShowing: true }
          setNotificationState(newNotification)

          // return card to top of stack
          setCardsState(([first, ...rest]) => [
            { ...first, count: first.count + 1 },
            ...rest
          ])
        }
      }}
      renderCard={({ card, idx }) => (
        <IonCard key={card.text}>
          <IonCardContent
            style={{
              height: '30vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
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
      <Swing.Stack<CardRaw>>
        {(cardNodes, swingData) => {
          return (
            <>
              <LessonContent>
                {activity.contentBlocks.map(block => (
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
                {cardsState.length > 0 && (
                  <>
                    <IonButton
                      disabled={notificationState.isShowing}
                      expand='full'
                      onClick={() => swingData.triggerThrow(false)}
                      size='large'
                    >
                      <IonIcon slot='start' icon={arrowBack} />
                      {cardsState[0].choiceLeft}
                    </IonButton>
                    <IonButton
                      disabled={notificationState.isShowing}
                      expand='full'
                      onClick={() => swingData.triggerThrow(true)}
                      size='large'
                    >
                      <IonIcon slot='end' icon={arrowForward} />
                      {cardsState[0].choiceRight}
                    </IonButton>
                  </>
                )}
                {cardsState.length === 0 && (
                  <LessonContinueButton />
                )}
              </IonFooter>
            </>
          )
        }}
      </Swing.Stack>
    </Swing.Provider>
  );
}

export default LessonActivitySwipeCards;
