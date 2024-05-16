export const environment = process.env as NodeJS.ProcessEnv & {
    REACT_APP_STATE_ENGINE: 'object' | 'subject';
};
