import { IonContent, IonHeader, IonText, IonToolbar } from "@ionic/react";
import React from "react";
import { isEqual } from "lodash";
import Activity from "./models/Activity";

function Test() {
  const [state, setState] = React.useState<Activity>();

  const fetchActivity = async () => {
    const activity = await Activity.findById("FKBJJDcuVMyyLKCyhxao");
    if (!state || !isEqual(state.toObject(), activity.toObject())) {
      console.log("updating", state?.toObject(), activity.toObject());
      setState(activity);
    }
  };

  React.useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  if (!state) {
    return <div>Looking for data...</div>;
  } else {
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
