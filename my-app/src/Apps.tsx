import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { MyNewsFeed } from "../src/view/MyNewsFeed";
import { AppProvide } from "./context/AppContext";
const App = () => {
  return (
    <AppProvide>
        <MyNewsFeed />
    </AppProvide>
  )
};

export default App;