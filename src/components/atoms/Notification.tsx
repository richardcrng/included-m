import { IonToast } from '@ionic/react';
import React from 'react';

export interface NotificationProps {
  header?: string,
  message: string,
  buttonText?: string,
  isShowing: boolean,
  color?: string,
  position?: Parameters<typeof IonToast>[0]['position'],
  duration?: number,
  onDidDismiss?: Parameters<typeof IonToast>[0]['onDidDismiss'],
  buttons?: Parameters<typeof IonToast>[0]['buttons']
}

function Notification({
  header,
  message,
  buttonText,
  isShowing,
  color,
  position = 'top',
  duration = 1000,
  onDidDismiss,
  buttons
}: NotificationProps) {
  return (
    <IonToast
      isOpen={isShowing}
      header={header}
      message={message}
      position={position}
      duration={duration}
      onDidDismiss={onDidDismiss}
      buttons={buttons}
    />
  )
}

export default Notification;