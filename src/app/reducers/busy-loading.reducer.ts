import { Reducer, Action } from '@ngrx/store';
import { ADD_LOADING, REMOVE_LOADING, REMOVEALL_LOADING } from '../actions/layout-sidebar.action';

export function BusyLoadingReducer(state: Array<string> = [], action: Action) {
    switch (action.type) {
        case ADD_LOADING: {
            return [...state, action.payload];
        };
        case REMOVE_LOADING: {
            return state.filter((item) => { return item !== action.payload });
        };
        case REMOVEALL_LOADING: {
            return [];
        };
        default:
            return state;
    }
}
