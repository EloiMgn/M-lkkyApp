import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { Provider } from 'react-redux';
import { store } from "../../store";
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'

describe("when game is not playing", function() {
  test('renders add new team link', () => {
    // console.log('yeah');
    const history = createMemoryHistory()
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
})
