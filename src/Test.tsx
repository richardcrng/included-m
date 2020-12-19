import {
  IonButton,
  IonContent,
  IonHeader,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { isEqual } from "lodash";
import Activity from "./models/Activity";

function Test() {
  const [state, setState] = React.useState<Activity>();

  const fetchActivity = async () => {
    const activity = await Activity.findById("uOlrg9t7zwjNOCupDFHx");
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
          <div style={{ margin: "1rem" }}>
            <pre>{JSON.stringify(state.toObject(), null, 2)}</pre>
            <IonButton
              onClick={async () => {
                await Activity.create({
                  activityType: "read",
                  blocks: ["hello", "again"],
                });
              }}
            >
              Save
            </IonButton>
          </div>
        </IonContent>
      </>
    );
  }
}

export default Test;
