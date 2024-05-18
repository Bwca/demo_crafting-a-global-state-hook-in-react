import { useCallback, useEffect, useState } from 'react';

import { GetterSetterPair } from '../models';
import { StateHookFactory } from '../models/state-hook-factory.model';

export const objectStateHookFactory: StateHookFactory = <T, N extends string>(stateName: N, initialState: T) => {
    const listeners: Set<(s: T) => void> = new Set();
    const currentState = new Proxy<{ state?: T }>(
        { state: initialState },
        {
            set(target: typeof currentState, property: string, value: T) {
                target.state = value;
                listeners.forEach((l) => l(value));
                return true;
            },
        },
    ) as { state: T };

    return (): GetterSetterPair<T, N> => {
        const [state, set] = useState<T>(currentState.state as T);

        useEffect(() => {
            listeners.add(set);
            return () => {
                listeners.delete(set);
            };
        }, []);

        const setState = useCallback((s: T) => {
            currentState.state = s;
        }, []);

        return { [stateName]: state, [`set${stateName.charAt(0).toUpperCase()}${stateName.slice(1)}`]: setState } as GetterSetterPair<T, N>;
    };
};
