import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import ListItem from './listItem';
import loadingGif from './loading.gif'

class App extends Component {

  constructor() {
    super();

    this.state = {
      newTodo: '',
      editing: false,
      notification: null,
      editingIndex: null,
      todos: [],
      loading: true
    }

    this.apiUrl = 'https://5eedea204cbc3400163313d1.mockapi.io';

    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.alert = this.alert.bind(this)
  };

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);

    this.setState({
      todos: response.data,
      loading: false
    });
  }

  handleChange(event) {
    this.setState({
      newTodo: event.target.value
    });
  };

  async addTodo() {

    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    });


    const todos = this.state.todos;

    todos.push(response.data);

    this.setState({
      todos: todos,
      newTodo: ''
    });

    this.alert('Todo added successfully.');
  }

  async deleteTodo(index) {
    const todos = this.state.todos;

    const todo = this.state.todos[index];

    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

    delete todos[index]

    this.setState({
      todos
    })

    this.alert('Todo deleted successfully.');
  
  }

  editTodo(index) {
    const todo = this.state.todos[index]
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    })
  }

  alert(notification) {
      this.setState({notification});

      setTimeout(() => {
        this.setState({notification: null})
      }, 2000)
  }

  async updateTodo(){

    const todo = this.state.todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });

    console.log(response)

    todo.name = this.state.newTodo;

    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;
    
    this.setState({
      todos,
      editing: false,
      editingIndex: null,
      newTodo: ''
    });

    this.alert('Todo updated successfully.');
  }

  render() {

    return (
      <div className="App">
        <div className="container">

          {
            this.state.notification && 
            <div className="mt-4 alert alert-success">
            <p className="text-center mb-0">{this.state.notification}</p>
          </div>
          }
          
          <h2 className="p-4">Todo App</h2>

          <input name="todo" type="text" className="form-control my-4" placeholder="Add a new todo" onChange={this.handleChange} value={this.state.newTodo}/>

    <button onClick={this.state.editing ? this.updateTodo : this.addTodo} className="btn btn-success mb-3" disabled={this.state.newTodo.length < 5}>{this.state.editing ? 'Update todo' : 'Add todo'}</button>

    {
      this.state.loading && <div>
        <img src={loadingGif} alt=""/>
      </div>
    }

    {
    (!this.state.editing || this.state.loading) && <ul className="list-group">
            {this.state.todos.map((item, index) => {

              return <ListItem 

              key={item.id}

              item={item} 

              editTodo={() => {this.editTodo(index)}} 

              deleteTodo={() => {this.deleteTodo(index)}}

              />

            })}
          </ul>
          }
          
        </div>
      </div>
    )
  }
}

export default App;
