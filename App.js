import { MainProvider } from "./contexts/MainContext";
import Navigator from "./navigators/Navigator";

const App = () => (
  <MainProvider>
    <Navigator />
  </MainProvider>
);

export default App;
