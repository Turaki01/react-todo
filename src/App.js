import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      newTodo: '',
      todos: [
        {
          id: 1,
          name: 'Buy bread'
        },
      {
        id: 2,
        name: 'Write code'
      },
      {
        id: 3,
        name: 'Play F1'
      },
      {
        id: 4,
        name: 'Wash clothes'
      },
      {
        id: 5,
        name: 'Commit to github'
      }
    ]
    }

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this)
  };

  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  };

  addTodo() {
    const newTodo = {
      name: this.state.newTodo,
      id: this.state.todos[this.state.todos.length - 1].id + 1
    }

    const todos = this.state.todos;

    todos.push(newTodo);

    this.setState({
      todos: todos,
      newTodo: ''
    })
  }

  deleteTodo(index) {
    const todos = this.state.todos;

    delete todos[index]

    this.setState({
      todos
    })
  
  }

  render() {

    return (
      <div className="App">
        <div className="container">
          <h2 className="p-4">Todo App</h2>

          <input name="todo" type="text" className="form-control my-4" placeholder="Add a new todo" onChange={this.handleChange} value={this.state.newTodo}/>

          <button onClick={this.addTodo} className="btn btn-info mb-3">Add todo</button>


          <ul className="list-group">
            {this.state.todos.map((item, index) => {
              return <li key={item.id} className="list-group-item">
                {item.name}

                <button onClick={() => {
                  this.deleteTodo(index)
                }} className="btn btn-danger btn-sm ml-4">X</button>
                </li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default App;
