import { useCallback, useEffect, useState } from 'react';

import { GetterSetterPair } from '../models';
import { StateHookFactory } from '../models/state-hook-factory.model';

export const objectStateHookFactory: StateHookFactory = <T, STATE extends string>(stateName: STATE, initialState?: T) => {
    const listeners: Set<(s: T) => void> = new Set();
    const currentState: any = new Proxy<{ state?: T }> ({ state: initialState }, {
        set(target: typeof currentState, property: string, value: T) {
            target.state = value;
            listeners.forEach(l => l(value))
            return true;
        },
    });

    return (): GetterSetterPair<T, STATE> => {
        const [state, set] = useState<T>(currentState.state as T);

        useEffect(() => {
            listeners.add(set)
            return () => {
                listeners.delete(set)
            };
        }, []);

        const setState = useCallback((s: T) => {
            currentState.state = s;
        }, []);

        return { [stateName]: state, [`set${stateName.charAt(0).toUpperCase()}${stateName.slice(1)}`]: setState } as GetterSetterPair<
            T,
            STATE
        >;
    };
};
