import Home from "../Pages/Home/Home";
import React from 'react';
import renderer from 'react-test-renderer';

it('home page renders correctly', () => {
    const component = renderer.create(
      <Home />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});