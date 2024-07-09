import { useState } from "react";
import { PokeCard } from "./components/PokeCard";
import { PokeList } from "./components/PokeList";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  const ids = ["bulbasaur", "charmander", "squirtle"];
  const [selectedItem, setSelectedItem] = useState("bulbasaur");

  return (
    <Provider store={store}>
      <PokeList
        ids={ids}
        selectedId={selectedItem}
        onSelect={(id) => setSelectedItem(id)}
      />
      <hr />
      <PokeCard id={selectedItem} />
    </Provider>
  );
}

export default App;
