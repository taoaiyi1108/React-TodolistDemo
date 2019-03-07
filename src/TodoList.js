import React, { Component, Fragment } from "react";
import axios from 'axios';
import TodoItem from './TodoItem';
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
    componentWillMount() {
        // 在组件即将挂载到页面的时候执行
        console.log("componentWillMount");
    }
    render() {
        return (
            <Fragment>
                <div>
                    <label htmlFor="insert">输入内容</label>
                    <input 
                        id="insert" 
                        type="text" 
                        className="input-border" 
                        value={this.state.inputValue} 
                        onChange={this.handleInputChange} 
                        ref={(input) =>{this.input = input}}
                    />
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul ref={(ul) =>{this.ul = ul}}>
                    { this.getTodoItem() }
                </ul>
            </Fragment>
        )
    }
    componentDidMount() {
        // 组件被挂在页面之后自动被执行
        // ajax 请求数据
        axios.get("/api/todolist").then( res =>{
            console.log(res.data)
            this.setState(() =>{
                return {list:res.data}
            });
        },error =>{
            console.log(error)
        })
    }
    shouldComponentUpdate() {
        // 组件被更新之前会自动执行
        return true; // 是否更新组件 true 更新 false 不更新
    }
    componentWillUpdate() {
        /* 组件被更新之前会自动执行，但是他在shouldComponentUpdate之后被执行
        如果componentWillUpdate返回true才会执行，返回false就不会被执行 */
    }
    componentDidUpdate() {
        // 组件更新完成之后会被执行
    }
    getTodoItem() {
        return this.state.list.map((item, index) => {
            return (
                <TodoItem key={item} content={item} index={index} deleteItem={this.handleItemDelete} />
            )
        })
    }
    handleInputChange(e) {
        const value = e.target.value;
        // const value = this.input.value;  // 不建议使用ref直接操作DOM
        this.setState(() =>({
            inputValue: value
        }));
    }
    handleBtnClick(e) {
        // this.setState(func,func) // 两个参数func
        this.setState((prevState) =>({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ""
        }),() =>{
            // setState 异步执行完成后就调用该函数
            console.log(this.ul.querySelectorAll("li"));
        });
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