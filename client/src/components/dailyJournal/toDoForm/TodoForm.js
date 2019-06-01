import React, { Component } from "react";
import "./App.css";
import Todos from "./Todos";
import AddTodo from "./AddTodo";
import AddComment from "./AddComment";
import uuid from "uuid";
import axios from "axios";

class TodoForm extends Component {
  state = {
    todos: [
      {
        id: uuid.v4(),
        title: "Water Plants",
        isCompleted: false
      },
      {
        id: uuid.v4(),
        title: "Prune Foliage",
        isCompleted: false
      },
      {
        id: uuid.v4(),
        title: "Fertilize Plants",
        isCompleted: false
      },
      {
        id: uuid.v4(),
        title: "Germinate Seed",
        isCompleted: false
      },
      {
        id: uuid.v4(),
        title: "Deadhead Spent Blooms",
        isCompleted: false
      },
      {
        id: uuid.v4(),
        title: "Compost Organic Matter",
        isCompleted: false
      }
    ]
  };

  componentDidMount() {
    //axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    //.then(res => this.setState({todos: res.data}));
  }

  // Toggles between task isCompleted and/or task is !isComplete
  markComplete = id => {
    // console.log(id)
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.isCompleted = !todo.isCompleted;
        }
        return todo;
      })
    });
  };

  // Delete task: Use the spread operator ... to copy everything and then use the filter() method to filter out the task that is going to be deleted.
  deleteTodo = id => {
    axios
      .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(
        this.setState({
          todos: [...this.state.todos.filter(todo => todo.id != id)]
        })
      );
  };

  addTodo = title => {
    // console.log(task);
    // const newTodo =
    // {
    //   id: uuid.v4(),
    //   title: title,
    //   completed: false
    // }
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: title,
        completed: false
      })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  };

  render() {
    // console.log(this.state.todos)
    return (
      <React.Fragment>
        <AddTodo addTodo={this.addTodo} />
        <Todos
          todos={this.state.todos}
          markComplete={this.markComplete}
          deleteTodo={this.deleteTodo}
        />
        <AddComment />
      </React.Fragment>
    );
  }
}

export default TodoForm;