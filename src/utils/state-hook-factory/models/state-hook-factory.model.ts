import { GetterSetterPair } from './getter-setter-pair.model';

export type StateHookFactory = <T, N extends string>(stateName: N, initialState: T) => () => GetterSetterPair<T, N>;
