import React from 'react';
import { render } from '@testing-library/react';
import {screen, fireEvent} from '@testing-library/dom'
import ChatInput from './ChatInput';

describe('ChatInput', () => {
    test('I can submit a message as an user', () => {
        
        const handleUserInput = jest.fn();
        render(<ChatInput handleUserInput={handleUserInput} />);
        
        const input = screen.getByTestId('chatInput');
        
        fireEvent.change(input, { target: { value: 'Hello!' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        
        expect(handleUserInput).toHaveBeenCalledWith('Hello!');
    })
});
