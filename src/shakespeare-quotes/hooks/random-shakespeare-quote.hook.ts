import { useCallback } from 'react';

import { ShakespeareQuote } from '../models';
import { QUOTES } from '../constants';
import { useQuoteState } from './use-quote-state.hook';

export const useRandomShakespeareQuote = (): { quote: ShakespeareQuote | null; getRandomQuote: () => void } => {
    const { setRandomQuote, randomQuote } = useQuoteState();

    const getRandomQuote = useCallback((): void => {
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        setRandomQuote(QUOTES[randomIndex]);
    }, [setRandomQuote]);

    return { quote: randomQuote && { ...randomQuote }, getRandomQuote };
};
