import SignUp from "../Pages/SignUp/SignUp";
import Inbox from "../Pages/Inbox/Inbox";
import React from 'react';
import renderer from 'react-test-renderer';

it('signup page renders correctly', () => {
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

it('enter password2', () => {
    const component = renderer.create(
      <Inbox />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('enter github url', () => {
    const component = renderer.create(
      <Inbox />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
