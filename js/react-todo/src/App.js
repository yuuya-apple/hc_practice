import logo from './logo.svg';
import './App.css';
import { AddForm } from "./components/AddForm";
import { RecoilRoot } from "recoil";
import { TodoList } from "./components/TodoList";
import { TodoCount } from "./components/TodoCount";

function App() {

  return (
    <RecoilRoot>
      <AddForm />
      <TodoCount />
      <TodoList />
    </RecoilRoot>
  );
}

export default App;
