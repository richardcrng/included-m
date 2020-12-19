import { IonContent, IonHeader, IonText, IonToolbar } from "@ionic/react";
import React from "react";
import Activity from "./models/Activity";
import db from "./models/db";

function Test() {
  const [state, setState] = React.useState<Activity>();

  React.useEffect(() => {
    const fetchActivity = async () => {
      const activity = await Activity.findById("FKBJJDcuVMyyLKCyhxao");
      console.log("found activity", activity, activity && activity.toObject());
      setState(activity);
    };

    fetchActivity();
  }, []);

  if (!state) {
    return <div>Looking for data...</div>;
  } else {
    console.log("set data", state);
    return (
      <>
        <IonToolbar>
          <IonHeader>Data found</IonHeader>
        </IonToolbar>
        <IonContent>
          <IonText color="white">
            {JSON.stringify(state.toObject(), null, 2)}
          </IonText>
          <div style={{ margin: "1rem" }}>
            <h1>Show stuff</h1>
            <div>
              <p>Message</p>
              <p>{JSON.stringify(state.toObject(), null, 2)}</p>
              <div style={{ color: "white" }}>
                {JSON.stringify(state.toObject(), null, 2)}
              </div>
            </div>
          </div>
        </IonContent>
      </>
    );
  }
}

export default Test;
