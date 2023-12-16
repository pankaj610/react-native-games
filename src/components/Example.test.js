import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native'
import { Example } from './Example';

afterAll(()=> {

},);

const onEndReached = jest.fn();

test('examples of some things', async () => {
    const expectedUsername = 'Ada Lovelace'

    render(<Example prop="1"/>)

    fireEvent.changeText(screen.getByTestId("input"), "Pankaj");
    
    fireEvent.press(screen.getByText("Click here!"))
    
    const userOutput = await screen.findByTestId('output');

    fireEvent.scroll(screen.getByTestId("flat-list"))

    expect(onEndReached).toHaveBeenCalled();


    expect(userOutput).toHaveTextContent("Pankaj");
    
})