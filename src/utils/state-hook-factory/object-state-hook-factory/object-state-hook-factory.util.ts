import { useCallback, useEffect, useState } from 'react';

import { GetterSetterPair } from '../models';
import { StateHookFactory } from '../models/state-hook-factory.model';

export const objectStateHookFactory: StateHookFactory = <T, STATE extends string>(stateName: STATE, initialState?: T) => {
    const stateObject = { state: initialState };
    let stateProxy: typeof stateObject;

    return (): GetterSetterPair<T, STATE> => {
        const [state, set] = useState<T>(stateObject.state as T);

        useEffect(() => {
            const handler = {
                set(target: typeof stateObject, property: string, value: T) {
                    console.log('setting state to ', value);
                    target.state = value;
                    set(value);
                    return true;
                },
            };

            const { revoke, proxy } = Proxy.revocable(stateObject, handler);
            stateProxy = proxy;

            return () => {
                revoke();
            };
        }, []);

        const setState = useCallback((s: T) => {
            stateProxy.state = s;
        }, []);

        return { [stateName]: state, [`set${stateName.charAt(0).toUpperCase()}${stateName.slice(1)}`]: setState } as GetterSetterPair<
            T,
            STATE
        >;
    };
};
