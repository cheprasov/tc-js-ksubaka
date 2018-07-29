import React from 'react';
import Navigation from '/SRC/components/navigation.js';
import { shallow } from 'enzyme';

import { NavLink } from 'react-router-dom'

test('Navigation without title', () => {

    const wrapper = shallow(<Navigation />);
    expect(wrapper.equals(<nav className="navigation"><span>Movies</span></nav>)).toEqual(true);

});

test('Navigation with title', () => {

    const wrapper = shallow(<Navigation title="Foo Bar Movie" />);
    expect(wrapper.equals(
        <nav className="navigation">
            <NavLink to="/">Movies</NavLink>
            <span className="separator" />
            <span className="title">Foo Bar Movie</span>
        </nav>
    )).toEqual(true);

});
