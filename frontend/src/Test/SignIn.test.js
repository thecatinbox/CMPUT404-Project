import SignIn from "../Pages/SignIn/SignIn";
import Inbox from "../Pages/Inbox/Inbox";
import React from 'react';
import renderer from 'react-test-renderer';

it('signin page renders correctly', () => {
    const component = renderer.create(
      <Inbox />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('enter username', () => {
    const component = renderer.create(
      <Inbox />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('enter password', () => {
    const component = renderer.create(
      <Inbox />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('sign in button', () => {
    const component = renderer.create(
      <Inbox />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});