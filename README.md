### 学习笔记

##### CSS动画
```javascript
    import React, { Component, Fragment } from "react";
    import './style.css';
    class App extends Component {
        constructor(props) {
            super(props);
            this.state = {
                show: false
            }
        }
        this.handleToggle = this.handleToggle.bind(this);
    }
    render() {
        return (
            <Fragment>
                <div className={this.state.show?'show':'hide'}>App</div>
                <button onClick={this.handleToggle}>Toggle</button>
            </Fragment>
        )
    }
    handleToggle() {
        this.setState(() =>{
            return {show:this.state.show?false:true}
        });
    }
```
```css
    .show {
        opacity: 1;
        transition: all 1s ease-in;
    }
    .hide {
       /*  opacity: 0;
        transition: all 1s ease-in; */
        animation: hide-item 2s ease-in forwards; /* forwards 动画结束后保存动画最后一帧的效果 */
    }
    @keyframes hide-item {
        0% {
            opacity: 1;
            color: red;
        }
        50% {
            opacity: 0.5;
            color: green;
        }
        100% {
            opacity: 0;
            color: blue;
        }
    }
```

#### React动画模块 React-transition-group
```javascript
    import { CSSTransition, TransitionGroup } from 'react-transition-group'; /* 引入css动画组件库 */
    /* 单个DOM动画使用 */
    render() {
        return(
            <Fragment>
                <CSSTransition
                    in={this.state.show} /* 出场动画 show false --> true */
                    timeout={1000}/* 动画持续时间 */
                    classNames="fade" /* fade css前缀 可以自由命名，但必须和对应的css动画保持一致 */
                    unmountOnExit /* 在DOM影藏后移除DOM */
                    /* CSSTransition:有钩子函数，可以再钩子函数中做额外的动画造作 */
                    onEntered={ (el) =>{el.style.color="blue"}}
                    appear={true} /* DOM 元素首次展示的时候就展示动画效果 */
                >
                    <div>hello</div>
                </CSSTransition>
            </Fragment>
        )
    }
    /* 多个DOM动画效果 */
    this.state = {
        list:[]
    }
    this.setState((prevState) =>{
        return {
            list: [...prevState.list, "item"]
        }
    });
    render() {
        return(
            <Fragment>
               <TransitionGroup>
                    {
                        this.sate.list.map((item,index) => {
                            return (
                                <CSSTransition
                                    timeout={1000}
                                    classNames="fade"
                                    unmountOnExit
                                    onEntered={ (el) =>{el.style.color="blue"}}
                                    appear={true}
                                    key={index}
                                >
                                    <div>{item}</div>
                                </CSSTransition>
                            )
                        })
                    }
               </TransitionGroup>
            </Fragment>
        )
    }
```
```css
    /* 入场动画 三个时刻 */
    /* appera 属性后 要点在入场动画1,2阶段添加css样式类名 */
    .fade-enter, .fade-appear {
        opacity:0;
    }
    .fade-enter-active, .fade-appear-avtive {
        opacity:1;
        transition: opacity 1s ease-in;
    }
    .fade-enter-done {
        opacity:1;
    }
    /* 出场动画 三个时刻 */
    .fade-exit {
        opacity:1;
    } 
    .fade-exit-active {
        opacity:0;
        transition: opacity 1s ease-in;
    } 
    .fade-exit-done {
        opacity:0;
    }
```

#### Mock 假数据 
    - 使用Charles第三方本地代理软件
    - 注意：调测项目的浏览器中其他的代理暂时关闭，否则此代理无用，api依旧是404
    - 配置 `Tools --> Map Loacl Settings --> Enable Map Loacl(√)` --> Add --> 配置即可 --> Choose --> 假数据json文件

#### React生命周期
    - construct() 也算是一个生命周期，组件初始化的时候执行，只执行一次；
    - componentWillMount() 在组件即将挂载到页面的时候执行,只执行一次；
    - componentDidMount() 组件被挂在之后，自动执行，只执行一次，此处可以进行Ajax数据请求；
    - render() 渲染组价，只要组件的state，props更新都会执行一次；
    - shouldComponentUpdate(nextProps,nextState) 
        - 1、接收2个参数，props，state改变后的值；
        - 2、必须返回一个Boolean值，返回true组件更新，返回false组件不更新；
    - componentWillUpdate() 组件被更新之前会自动执行，但是他在shouldComponentUpdate之后被执行,如果componentWillUpdate返回true才会执行，返回false就不会被执行;
    - componentDidUpdate() 组件更新完成之后会被执行
    - componentWillReceiveProps()
        - 1、当一个组件从父组件接收了参数
        - 2、只要父组件的render函数被重新执行了，子组件的这个生命周期函数就会被执行
        - 3、如果这个组件首次从在于父组件中，不会执行
        - 4、如果这个组件之前已经从在于父组件中，才会被执行

#### React修改state中的数据
```javascript
    this.state = {
        list:[]
    }
    this.setState((prevState) =>{
        /* prevState state 被修改前 */
        return {
            list: [...prevState.list, "item"] /* list 添加一个item */
        }
    });
```