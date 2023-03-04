import Inbox from "../Pages/Inbox/Inbox";
import React from 'react';
import renderer from 'react-test-renderer';

it('inbox page renders correctly', () => {
    const component = renderer.create(
      <Inbox />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});