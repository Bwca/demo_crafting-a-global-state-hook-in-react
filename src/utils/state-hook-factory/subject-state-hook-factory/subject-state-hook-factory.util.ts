import { useCallback, useEffect, useState } from 'react';

import { Subject } from 'rxjs';

import { GetterSetterPair } from '../models';
import { StateHookFactory } from '../models/state-hook-factory.model';

export const subjectStateHookFactory: StateHookFactory = <T, STATE extends string>(stateName: STATE, initialState?: T) => {
    const subject$ = new Subject<T>();

    return (): GetterSetterPair<T, STATE> => {
        const [state, set] = useState<T>(initialState as T);

        useEffect(() => {
            const subscription = subject$.subscribe((s) => set(s));
            return () => {
                subscription.unsubscribe();
            };
        }, []);

        const setState = useCallback((s: T) => {
            subject$.next(s);
        }, []);

        return { [stateName]: state, [`set${stateName.charAt(0).toUpperCase()}${stateName.slice(1)}`]: setState } as GetterSetterPair<
            T,
            STATE
        >;
    };
};
