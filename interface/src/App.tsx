import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { searchOutline, homeOutline, personOutline,chatbubbleEllipsesOutline, heartOutline } from 'ionicons/icons';
import Home from './pages/home/Home';
import Chat from './pages/messages/Chat';
import Search from './pages/search/Search';
import Profile from './pages/profile/Profile';
import Saved from './pages/saved/Saved';
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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/Chat">
            <Chat />
          </Route>
          <Route path="/Search">
            <Search />
          </Route>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
             <Route path="/Profile">
            <Profile />
          </Route>
             <Route path="/Saved">
            <Saved />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className = "custom-tabs">

          <IonTabButton tab="Home" href="/Home" className="custom-tab-button">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

            <IonTabButton tab="Search" href="/Search" className="custom-tab-button">
            <IonIcon aria-hidden="true" icon={searchOutline} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>

          <IonTabButton tab="Chat" href="/Chat" className="custom-tab-button">
            <IonIcon aria-hidden="true" icon={chatbubbleEllipsesOutline} />
            <IonLabel>Chat</IonLabel>
          </IonTabButton>
        
          <IonTabButton tab="Saved" href="/Saved" className="custom-tab-button">
            <IonIcon aria-hidden="true" icon={heartOutline} />
            <IonLabel>Saved</IonLabel>
          </IonTabButton>

          <IonTabButton tab="Profile" href="/Profile" className="custom-tab-button">
            <IonIcon aria-hidden="true" icon={personOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
