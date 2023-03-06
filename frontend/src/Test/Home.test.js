import Home from "../Pages/Home/Home";
import TopBar from '../Components/TopBar/TopBar';
import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from "@testing-library/react";

it('home page renders correctly', () => {
    const component = renderer.create(
      <Home />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test("button can be clicked ", () => {
  const onClick = jest.fn(); 
  
  const { getByLabelText } = render(
    <button aria-label="Button" onClick={onClick} />
  );
 
  const btn = getByLabelText("Button");
  fireEvent.click(btn);
  expect(onClick).toBeCalled(); 
  expect(onClick).toBeCalledTimes(1);
});

it('changes the color of Home button on the Top Bar when they hovered', () => {
  const component = renderer.create(
    <a id="home" href="/home">Home</a>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('changes the color of Inbox button on the Top Bar when they hovered', () => {
  const component = renderer.create(
    <a id="inbox" href="/inbox">Inbox</a>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('changes the color of Friends button on the Top Bar when they hovered', () => {
  const component = renderer.create(
    <a id="friends" href="/friends">Friends</a>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('changes the color of Profile button on the Top Bar when they hovered', () => {
  const component = renderer.create(
    <a id="profile" href="/profile">Profile</a>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseEnter();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  renderer.act(() => {
    tree.props.onMouseLeave();
  });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
        

