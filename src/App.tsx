import React from "react";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router";
import { DEFAULT_COURSE_ID } from "./constants";
import CoursePageRoute from "./components/routes/course/CoursePageRoute";
import TopicPageRoute from "./components/routes/topic/TopicPageRoute";
import LessonPageRoute from "./components/routes/lesson/LessonPageRoute";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route
            exact
            path="/learn/:courseId"
            component={CoursePageRoute.Query}
          />
          <Route
            exact
            path="/learn/:courseId/:topicId"
            component={TopicPageRoute.Query}
          />
          <Route
            exact
            path="/learn/:courseId/:topicId/:chapterId/:lessonId"
            component={LessonPageRoute.Query}
          />
          <Route
            exact
            path="/"
            component={() => <Redirect to={`/learn/${DEFAULT_COURSE_ID}`} />}
          />
          <Redirect to="/" />
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
