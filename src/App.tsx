/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


import React from 'react';
import {
  IonApp,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useDispatch } from 'react-redux';
import { isEqual } from 'lodash';
import HomePage from './routes/HomePage';

import { CourseCRUD } from './content/types';
import actions from './redux/reducer';
import { Route } from 'react-router';
import CoursePage from './routes/CoursePage';
import TopicPage from './routes/TopicPage';
import LessonPage from './routes/LessonPage';
import Course, { CourseRaw } from './models/Course';
import useFireactiveDocument from './lib/useFireactive/useFireactiveDocument';


const App: React.FC = () => {
  const dispatch = useDispatch()

  const [doc, state] = useFireactiveDocument<Course, CourseRaw>({
    getDocument: () => Course.findOne({ courseTitle: 'Included M' }),
    documentToState: (c: Course) => c.toRaw()
  }, (course, updateFn) => course.on('value', updateFn))

  console.log(state, doc)
  
  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://api.jsonbin.io/b/5fd513e9fbb23c2e36a5e8ca')
      const json: CourseCRUD = await res.json()

      dispatch(actions.loaded.course.create.update(json))
    }

    getData()

  }, [dispatch])

  return (
  <IonApp>
    <IonReactRouter>
      <Route exact path='/course' component={CoursePage} />
      <Route exact path='/topic' component={TopicPage} />
      <Route exact path='/lesson' component={LessonPage} />
      <Route exact path='/' component={HomePage} />
    </IonReactRouter>
  </IonApp>
)
}

export default App;
