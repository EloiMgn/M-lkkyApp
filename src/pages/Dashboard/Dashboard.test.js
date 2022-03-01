import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { Provider } from 'react-redux';
import { store } from "../../store";
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ReactTestUtils from 'react-dom/test-utils';

configure({ adapter: new Adapter() });

describe("when game is not playing", () => {
  const history = createMemoryHistory()
  test('renders add new team link', () => {
    render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <Dashboard /> 
      </Router>
    </Provider>
    );
    const linkElement = screen.getByText(/Ajouter une nouvelle équipe/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('on Click on link, render addNewTeam Page', () => {
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Dashboard /> 
        </Router>
      </Provider>
      );
      const button = screen.getByText(/Ajouter une nouvelle équipe/i);
      console.log(button);
      ReactTestUtils.Simulate.click(button);
      console.log(document.body);
  // console.log(userEvent.click(linkElement));
  // check that the content changed to the new page
  // expect(screen.getByText(/Votre équipe/i)).toBeInTheDocument()
  })
})
