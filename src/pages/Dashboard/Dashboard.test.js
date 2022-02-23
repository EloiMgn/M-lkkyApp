import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { Provider } from 'react-redux';
import { store } from "../../store";
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'
import userEvent from '@testing-library/user-event'

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
  const leftClick = {button: 0}
  const linkElement = screen.getByText(/Ajouter une nouvelle équipe/i);
  // console.log(leftClick);
  userEvent.click(linkElement)

  // check that the content changed to the new page
  expect(screen.getByText(/Votre équipe/i)).toBeInTheDocument()
  })
})
