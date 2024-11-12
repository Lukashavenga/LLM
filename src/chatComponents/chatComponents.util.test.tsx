import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import { parseMarkdown } from './chatComponents.util';

describe('ChatComponents Util', () => {
    test('Can replace string with markup', () => {
        const inputText = "This is a markdownum example.";
        const expectedOutput = "This is a [markdownum](https://en.wikipedia.org/wiki/Markdown) example.";

        const result = parseMarkdown(inputText);

        expect(result).toBe(expectedOutput);
    });
});
