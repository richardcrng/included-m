/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import React from "react";
import { IonAlert, IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { version } from "../package.json";
// import { useDispatch } from 'react-redux';
import HomePage from "./routes/HomePage";

import { Redirect, Route, Switch } from "react-router";
import CoursePageRoute from "./routes/course/CoursePageRoute";
import TopicPageRoute from "./routes/topic/TopicPageRoute";
import LessonPageRoute from "./routes/lesson/LessonPageRoute";
import { JSendBase } from "./lib/jsend";
import { useQuery } from "react-query";
import { SERVER_URL } from "./constants";
import db from "./models/db";

export type PingSuccessVersionNumber = JSendBase<{
  deployedVersion: string;
}>;

interface Version {
  versionNumber: string;
  releaseDate: number;
  header?: string;
  message?: string;
}

function isNewVersionAvailable(versionToCheck: Version) {
  return versionToCheck.versionNumber !== version;
}

const App: React.FC = () => {
  const [hideModal, setHideModal] = React.useState(false);

  // const [alert, setAlert] = React.useState({
  //   versionNumber: version
  // })
  const [state, setState] = React.useState<Version[]>();

  React.useEffect(() => {
    const versionsSnapshot = db
      .collection("metadata")
      .doc("updates")
      .collection("versions")
      .withConverter({
        fromFirestore(snapshot) {
          const data = snapshot.data();
          return {
            versionNumber: data.versionNumber as string,
            releaseDate: data.releaseDate as number,
            header: data.header as string | undefined,
            message: data.message as string | undefined,
          } as Version;
        },
        toFirestore(doc: Version) {
          return doc;
        },
      })
      .orderBy("releaseDate", "desc")
      .limit(5)
      .get();
    versionsSnapshot.then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setState(data);
    });
  }, [setState]);

  const latestVersion = state && state[0];

  // const newVersionAvailable = !!(data && data !== version);
  const newVersionAvailable: boolean = !!(
    latestVersion && isNewVersionAvailable(latestVersion)
  );

  return (
    <IonApp>
      <IonAlert
        isOpen={newVersionAvailable && !hideModal}
        onDidDismiss={(e) => setHideModal(true)}
        header={latestVersion?.header || "New version available!"}
        message={
          latestVersion?.message ||
          "There is a new version of this web app available - would you like to access it?"
        }
        buttons={[
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Update",
            handler: () => {
              window.location.reload();
            },
          },
        ]}
      />
      <IonReactRouter>
        <Switch>
          <Route exact path="/course/:id" component={CoursePageRoute.Query} />
          <Route exact path="/topic/:id" component={TopicPageRoute.Firebase} />
          <Route
            exact
            path="/lesson/:id"
            component={LessonPageRoute.Firebase}
          />
          <Route exact path="/" component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
