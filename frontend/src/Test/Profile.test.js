import Profile from "../Pages/Profile/Profile";
import React from 'react';
import renderer from 'react-test-renderer';

it('profile page renders correctly', () => {
    const component = renderer.create(
      <Profile />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});