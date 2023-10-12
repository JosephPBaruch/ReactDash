import ListGroup from "./components/ListGroup";
import body from "./components/body";

function App() {
  let items = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const handleSelectItem = (item: string) => {
    console.log(item);
    return item;
  };

  return (
    <ListGroup
    items={items}
    heading={"cities"}
    onSelectItem={handleSelectItem}
/>

  );
}

export default App;

