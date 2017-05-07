
import { Reducer, Action } from '@ngrx/store';
import { SidebarNavGroupModel, SidebarNavItemModel } from '../models/SidebarNavModel';
import { ADD_NAV, REPLACE_NAV } from '../actions/layout-sidebar.action';

export function LayoutSideBarReducer(state: SidebarNavGroupModel[] = [], action: Action) {
    switch (action.type) {
        case ADD_NAV: {
            return [...state, action.payload];
        };
        case REPLACE_NAV: {
            return [...action.payload];
        };
        default:
            return state;
    }
}
