import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import SearchInput from '/SRC/components/search-input.js';
import SearchData from '/SRC/dto/search-data.js';

test('Check returned SearchData by timeout', (done) => {

    const onUpdateSearchInput = searchData => {
        expect(searchData.getQuery()).toBe('men in black');
        done();
    };

    const wrapper = mount(
        <SearchInput onUpdateSearchInput={onUpdateSearchInput} />
    );

    wrapper.find('input').simulate('change', {target: {value: 'foo'}});
    wrapper.find('input').simulate('change', {target: {value: 'bar'}});
    wrapper.find('input').simulate('change', {target: {value: ' men   in   black '}});

});

test('Check returned SearchData by enter', (done) => {

    const onUpdateSearchInput = searchData => {
        expect(searchData.getQuery()).toBe('bar');
        done();
    };

    const wrapper = mount(
        <SearchInput onUpdateSearchInput={onUpdateSearchInput} />
    );

    wrapper.find('input').simulate('change', {target: {value: 'foo'}});
    wrapper.find('input').simulate('change', {target: {value: ' bar '}});
    wrapper.find('input').simulate('keyPress', {key: 'Enter'});
    wrapper.find('input').simulate('change', {target: {value: '42'}});

});
