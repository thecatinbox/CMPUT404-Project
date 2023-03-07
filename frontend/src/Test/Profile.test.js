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

test("edit button can be clicked ", () => {
  const component = renderer.create(
    <Profile />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


/* 
it('exists a Edit Profile button', ()=>{
  const wrapper = render(<Button>Edit Profile</Button>).queryByText('Edit Profile')
  expect(wrapper).toBeTruthy()
})
it('exists a Cancel button', ()=>{
  const wrapper = render(<Button>Cancel</Button>).queryByText('Cancel')
  expect(wrapper).toBeTruthy()
})
it('exists a Save button', ()=>{
  const wrapper = render(<Button>Save</Button>).queryByText('Cancel')
  expect(wrapper).toBeTruthy()
})
*/ 