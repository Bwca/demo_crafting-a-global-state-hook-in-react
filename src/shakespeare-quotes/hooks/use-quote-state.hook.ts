import { stateHookFactory } from '../../state-hook-factory';
import { ShakespeareQuote } from '../models';

export const useQuoteState = stateHookFactory<ShakespeareQuote | null, 'randomQuote'>('randomQuote', null);
