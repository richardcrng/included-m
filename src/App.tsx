import React from "react";
import { IonAlert, IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router";
import { version } from "../package.json";
import db from "./lib/models/db";
import SignInPageRoute from "./components/routes/sign-in/SignInPageRoute";
import withAuth from "./components/modules/auth/withAuth";
import AccountRecoveryPageRoute from "./components/routes/account-recovery/AccountRecoveryPageRoute";
import withAuthForward from "./components/modules/auth/withAuthForward";
import { DEFAULT_COURSE_ID } from "./constants";
import CoursePageRoute from "./components/routes/course/CoursePageRoute";
import TopicPageRoute from "./components/routes/topic/TopicPageRoute";
import LessonPageRoute from "./components/routes/lesson/LessonPageRoute";
import HomePage from "./components/routes/HomePage";
import ActivityPageRoute from "./components/routes/lesson/ActivityPageRoute";

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
          <Route
            exact
            path="/sign-in"
            component={withAuthForward(
              SignInPageRoute,
              `/learn/${DEFAULT_COURSE_ID}`
            )}
          />
          <Route
            exact
            path="/account-recovery"
            component={withAuthForward(
              AccountRecoveryPageRoute,
              `/learn/${DEFAULT_COURSE_ID}`
            )}
          />
          <Route
            exact
            path="/learn/:courseId"
            component={withAuth(CoursePageRoute.Query)}
          />
          <Route
            exact
            path="/learn/:courseId/:topicId"
            component={withAuth(TopicPageRoute.Query)}
          />
          <Route
            exact
            path="/learn/:courseId/:topicId/:chapterId/:lessonId"
            component={withAuth(LessonPageRoute.Query)}
          />
          <Route
            exact
            path="/learn/:courseId/:topicId/:chapterId/:lessonId/:activityIdx"
            component={withAuth(ActivityPageRoute.Query)}
          />
          <Route exact path="/" component={HomePage} />
          <Redirect to="/" />
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
