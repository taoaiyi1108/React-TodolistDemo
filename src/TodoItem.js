import React, { Component } from 'react';
import PropTypes from "prop-types"; 

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const { content, test } = this.props;
        return (
            <li onClick={this.handleClick}>
                {content}
            </li>
        )
    }

    handleClick() {
        const { deleteItem, index } = this.props;
        deleteItem(index);
    }

    /* 性能优化*/
    shouldComponentUpdate(nextProps,nextState) {
        if(nextProps.content !== this.props.content) {
            return true;
        }else {
            return false;
        }
    }

    componentWillReceiveProps() {
        /* 1、当一个组件从父组件接收了参数
           2、只要父组件的render函数被重新执行了，子组件的这个生命周期函数就会被执行
           3、如果这个组件首次从在于父组件中，不会执行
           4、如果这个组件之前已经从在于父组件中，才会被执行 */
    }

    componentWillUnmount() {
        // 组件即将被从页面中剔除的时候执行
    }
}

TodoItem.propTypes = {
    test: PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    deleteItem: PropTypes.func,
    index: PropTypes.number
}

TodoItem.defaultProps = {
    test: "Hello World"
}

export default TodoItem;