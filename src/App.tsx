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

import actions from './redux/reducer';
import { Redirect, Route, Switch } from 'react-router';
import TopicPage from './routes/TopicPage';
import CoursePageRoute from './routes/course/CoursePageRoute';
import { useFireactiveCourse } from './lib/useFireactive/useFireactiveDocument';
import TopicPageRoute from './routes/topic/TopicPageRoute';
import LessonPageRoute from './routes/lesson/LessonPageRoute';



const App: React.FC = () => {
  const dispatch = useDispatch()

  // const [doc, state] = useFireactiveCourse({
  //   getDocument: () => Course.findOne({ courseTitle: 'Included M' }),
  //   documentToState: course => course.toRawDeep(false)
  // })

  // console.log(doc, state)
  
  // React.useEffect(() => {
  //   const getData = async () => {
  //     const res = await fetch('https://api.jsonbin.io/b/5fd513e9fbb23c2e36a5e8ca')
  //     const json: CourseCRUD = await res.json()

  //     dispatch(actions.loaded.course.create.update(json))
  //   }

  //   getData()

  // }, [dispatch])

  return (
  <IonApp>
    <IonReactRouter>
      <Switch>
        <Route exact path='/course/:id' component={CoursePageRoute.Firebase} />
        <Route exact path='/course' component={CoursePageRoute.Redux} />
        <Route exact path='/topic/:id' component={TopicPageRoute.Firebase} />
        <Route exact path='/lesson/:id' component={LessonPageRoute.Firebase} />
        <Route exact path='/' component={HomePage} />
        <Redirect to='/' />
      </Switch>
    </IonReactRouter>
  </IonApp>
)
}

export default App;
