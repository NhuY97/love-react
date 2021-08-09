import './App.css';
import { Switch, Route } from "react-router-dom";
import { Routes } from "./routes/CONSTANTS";
import BoardGame from './components/game/BoardGame';
import OnboardingPage from './pages/OnboardingPage';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path={Routes.ONBOARDING_PAGE} exact>
            <OnboardingPage />
          </Route>
          <Route path={`${Routes.PLAY_GAME_PAGE}`} exact>
            <BoardGame />
          </Route>
          <Route path="*">
            <OnboardingPage />
          </Route>
        </Switch>
      
      
    </div>
  );
}

export default App;
