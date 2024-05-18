import { GetterSetterPair } from './getter-setter-pair.model';

export type StateHookFactory = <T, STATE extends string>(stateName: STATE, initialState: T) => () => GetterSetterPair<T, STATE>;
