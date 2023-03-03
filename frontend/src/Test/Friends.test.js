import Friends from "../Pages/Friends/Friends";
import React from 'react';
import renderer from 'react-test-renderer';

it('friends page renders correctly', () => {
    const component = renderer.create(
      <Friends />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});