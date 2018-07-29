import React from 'react';

import { NavLink } from 'react-router-dom'

export default class Navigation extends React.Component {

    getNavigationElements() {
        const children = [];

        if (this.props.title) {
            children.push(
                <NavLink key="key-nav-home" to="/">Movies</NavLink>,
                <span key={`key-sep`} className="separator" />,
                <span className="title" key={`key-nav-item-${children.length}`}>{this.props.title}</span>
            );
        } else {
            children.push(<span key="key-nav-home">Movies</span>)
        }

        return children;
    }

    render() {
        return (
            <nav className="navigation">
                {this.getNavigationElements()}
            </nav>
        );
    }
}
