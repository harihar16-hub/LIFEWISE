import { useGameStore } from './store/gameStore';
import LandingScreen from './screens/LandingScreen';
import ProfileScreen from './screens/ProfileScreen';
import DashboardScreen from './screens/DashboardScreen';
import ScenarioScreen from './screens/ScenarioScreen';
import ResultScreen from './screens/ResultScreen';
import FinalProfileScreen from './screens/FinalProfileScreen';

export default function App() {
  const screen = useGameStore((s) => s.screen);

  return (
    <div className="min-h-screen bg-game-bg font-game">
      {screen === 'landing' && <LandingScreen />}
      {screen === 'profile' && <ProfileScreen />}
      {screen === 'dashboard' && <DashboardScreen />}
      {screen === 'scenario' && <ScenarioScreen />}
      {screen === 'result' && <ResultScreen />}
      {screen === 'finalProfile' && <FinalProfileScreen />}
    </div>
  );
}
