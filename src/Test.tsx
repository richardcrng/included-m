import { IonContent, IonHeader, IonToolbar } from "@ionic/react";
import React from "react";

function Test() {
  const [state, setState] = React.useState();

  return (
    <>
      <IonToolbar>
        <IonHeader>{state ? "Data found" : "Searching for data"}</IonHeader>
      </IonToolbar>
      <IonContent>
        <div style={{ margin: "1rem" }}>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div>
      </IonContent>
    </>
  );
}

export default Test;
