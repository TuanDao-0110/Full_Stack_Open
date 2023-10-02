import Content from "./components/Content";

const App = () => {
  // const noteCreation = (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   const noteToAdd = {
  //     content: newNote,
  //     id: notes.length + 1,
  //   };
  //   setNotes(notes.concat(noteToAdd));
  //   setNewNote("");
  // };
  return (
    <div>
      <Content />
    </div>
  );
};

export default App;
