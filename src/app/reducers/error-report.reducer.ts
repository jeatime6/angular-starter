import { Reducer, Action } from '@ngrx/store';
import { REPORT_ERROR } from '../actions/layout-sidebar.action';

export function ErrorReportReducer(state = '', action: Action) {
    switch (action.type) {
        case REPORT_ERROR: {
            return action.payload;
        };
        default:
            return state;
    }
}
