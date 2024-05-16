import { useCallback } from 'react';

import { ShakespeareQuote } from './shakespeare-quote.model';
import { QUOTES } from './quotes.const';
import { useQuoteState } from './state';

export const useRandomShakespeareQuote = (): { quote: ShakespeareQuote | null; getRandomQuote: () => void } => {
    const { setRandomQuote, randomQuote } = useQuoteState();

    const getRandomQuote = useCallback((): void => {
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        setRandomQuote(QUOTES[randomIndex]);
    }, [setRandomQuote]);

    return { quote: randomQuote && { ...randomQuote }, getRandomQuote };
};
