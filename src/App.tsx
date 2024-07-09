import { Provider } from "react-redux";
import { store } from "./store/store";
import { Users } from "./components/Users";

function App() {
  return (
    <Provider store={store}>
      <Users />
    </Provider>
  );
}

export default App;
