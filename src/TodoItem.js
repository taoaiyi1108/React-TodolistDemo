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
                {test} - {content}
            </li>
        )
    }

    handleClick() {
        const { deleteItem, index } = this.props;
        deleteItem(index);
    }
}

TodoItem.propTypes = {
    test: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(PropTypes.number,PropTypes.string),
    deleteItem: PropTypes.func,
    index: PropTypes.number
}

TodoItem.defaultProps = {
    test: "Hello World"
}

export default TodoItem;