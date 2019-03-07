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
        opacity: 0;
        transition: all 1s ease-in;
    }
```

#### Mock 假数据 
    - 使用Charles第三方本地代理软件
    - 注意：调测项目的浏览器中其他的代理暂时关闭，否则此代理无用，api依旧是404
    - 配置 `Tools --> Map Loacl Settings --> Enable Map Loacl(√)` --> Add --> 配置即可 --> Choose --> 假数据json文件