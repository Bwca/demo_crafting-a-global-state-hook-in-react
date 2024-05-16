import { stateHookFactory } from '../../utils';
import { ShakespeareQuote } from '../shakespeare-quote.model';

export const useQuoteState = stateHookFactory<ShakespeareQuote | null, 'randomQuote'>('randomQuote', null);
