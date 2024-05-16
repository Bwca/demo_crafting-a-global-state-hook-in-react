export type GetterSetterPair<T, S extends string> = {
    [K in [S, `set${Capitalize<S>}`][number]]: K extends `set${Capitalize<S>}` ? (s: T) => void : T;
};
