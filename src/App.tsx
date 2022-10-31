import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React, { useEffect ,  useState } from 'react';
import "./App.css"

//localStorage = 브라우저 닫았다가 다시 열어도 유지, 살제될때 까지 유지
//sessionStorage = 브라우저 세션 기간동안만 사용가능. 창닫으면 삭제

function App() {

  
interface ITodo {
  text: string;
  complete: boolean; 
}


  const [inputValue, setInputValue] = useState<string>('');
  const [todoList, setTodoList] = useState<ITodo[]>([]);
  const [todoDate , setTodoDate] = useState<any[]>([]);


  useEffect(()=> {
    window.localStorage.setItem('todoList' , JSON.stringify(todoList))
  },[todoList])

  useEffect(() =>{
    const savedTodolist = JSON.parse(window.localStorage.getItem('todoList') || "");

    if(savedTodolist != null){
      setTodoList(savedTodolist)
    }
   
  } , [])


  const handleSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(inputValue);
    addDate();
    setInputValue('');
  };

  const addDate = () => {
    let date = new Date();
    const newDate = new Intl.DateTimeFormat('kr' , {dateStyle: 'full' , timeStyle : "full"}).format(date);
    setTodoDate([ newDate]);
  }

  const addTodo = (text: string) => {
    const newTodos: ITodo[] = [...todoList, { text, complete: false }];
    setTodoList(newTodos);
  };

  const deleteTodo = (index: number) => {
   
    const newTodos: ITodo[] = [...todoList];
    newTodos.splice(index, 1);
    setTodoList(newTodos);
  };

  const clearTodo = () =>{
    setTodoList([]);
  }

  // const sortTodo = () =>{
  //  const copyTodo = todoList.map((todo:ITodo) => (
  //   todo.text
  //  ))
  //  copyTodo.sort()
  //  setTodoList(copyTodo)
  // }

  const sortTodo = () =>{
    const copyTodo = [...todoList];
    copyTodo.sort();
    setTodoList(copyTodo)
  }

  const completeTodo = (index: number) => {
    const newTodos: ITodo[] = [...todoList];
  
    newTodos[index].complete = !newTodos[index].complete;
    setTodoList(newTodos);
  };


  return (
    <div>
      <h1>Todo List</h1>
      <div className='input-todo'>
        <form onSubmit={handleSubmit} >
          <input type='text' value={inputValue} 
          onChange={e => setInputValue(e.target.value)}
          required/>
          <button type='submit'> Add Todo</button>
          <button onClick={clearTodo}>Clear</button>
          <button onClick={sortTodo}>Sort</button>
        </form>
      </div>
      <div className='show-todo'>
        {todoList.map((todo:ITodo , index:number) => (
          <div key={index}
          style={{textDecoration: todo.complete ? 'line-through' : ""}}>
            <div className='todo-box'>
              <div>
            {todo.text}
            </div>
            <div>
            {todoDate}
            </div>
            </div>
            <button onClick={() => completeTodo(index)}>완료</button>
            <button onClick={() => deleteTodo(index)}>delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;