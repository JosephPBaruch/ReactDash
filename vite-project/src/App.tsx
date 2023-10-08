import ListGroup from "./components/ListGroup";

function App() {
  let items = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const handleSelectItem = (item: string) => {
    console.log(item);
    return item;
  };

  return (
    <div>
      <ListGroup
        items={items}
        heading={"cities"}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}

export default App;
