import React, { Component, Fragment } from "react";
import TodoItem from './TodoItem';
import Test from "./Test";
import './style.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleItemDelete = this.handleItemDelete.bind(this);
    }
    render() {
        return (
            <Fragment>
                <div>
                    <label htmlFor="insert">输入内容</label>
                    <input id="insert" type="text" className="input-border" value={this.state.inputValue} onChange={this.handleInputChange} />
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul>
                    { this.getTodoItem() }
                </ul>
                <Test content={this.state.inputValue} />
            </Fragment>
        )
    }
    getTodoItem() {
        return this.state.list.map((item, index) => {
            return (
                <TodoItem key={index} content={item} index={index} deleteItem={this.handleItemDelete} />
            )
        })
    }
    handleInputChange(e) {
        const value = e.target.value;
        this.setState(() =>({
            inputValue: value
        }));
    }
    handleBtnClick(e) {
        this.setState((prevState) =>({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ""
        }));
    }
    handleItemDelete(index) {
        this.setState((prevState) =>{
            const list = [...prevState.list];
            list.splice(index, 1);
            return {
                list
            };
        });
    }
}

export default TodoList;