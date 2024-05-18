import { subjectStateHookFactory } from './subject-state-hook-factory';
import { environment } from '../environment';
import { objectStateHookFactory } from './object-state-hook-factory';
import { StateHookFactory } from './models';

export const stateHookFactory: StateHookFactory =
    environment.REACT_APP_STATE_ENGINE === 'object' ? objectStateHookFactory : subjectStateHookFactory;
