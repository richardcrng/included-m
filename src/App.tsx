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
import HomePage from './routes/HomePage';

import { Course } from './content/types';
import actions from './redux/reducer';
import { Route } from 'react-router';
import CoursePage from './routes/CoursePage';
import TopicPage from './routes/TopicPage';


const App: React.FC = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://api.jsonbin.io/b/5fd14a6082e9306ae6ff98c2')
      const json: Course = await res.json()
      dispatch(actions.loaded.course.create.update(json))
    }

    getData()

  }, [dispatch])

  return (
  <IonApp>
    <IonReactRouter>
      <Route exact path='/course' component={CoursePage} />
      <Route exact path='/topic' component={TopicPage} />
      <Route exact path='/' component={HomePage} />
    </IonReactRouter>
  </IonApp>
)
}

export default App;
