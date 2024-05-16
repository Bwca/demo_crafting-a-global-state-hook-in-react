import { FC } from 'react';

import { useRandomShakespeareQuote } from './random-shakespeare-quote.hook';

const GenerateQuote: FC = () => {
    const { getRandomQuote } = useRandomShakespeareQuote();
    return <button onClick={getRandomQuote}>Get Another Quote</button>;
};

export const ShakespeareQuoteComponent: FC = () => {
    const { quote } = useRandomShakespeareQuote();

    return (
        <div>
            <h2>Random Shakespeare Quote:</h2>
            {(quote && (
                <blockquote>
                    {quote.text} - <i>{quote.source}</i>
                </blockquote>
            )) || <p>Click the button to generate a random Shakespeare quote</p>}
            <GenerateQuote />
        </div>
    );
};
