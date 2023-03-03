import Home from "../Pages/Home/Home";
import React from 'react';
import renderer from 'react-test-renderer';

it('show home', () => {
    const component = renderer.create(
      <Home />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});