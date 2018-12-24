import { User } from "../user";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface UserState {
    maskUserName: boolean;
    currentUser: User;
}

const initialState: UserState = {
    currentUser: null,
    maskUserName: true
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
    getUserFeatureState,
    state => state.maskUserName
);

export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);

export function reducer(state = initialState, action){
    
    switch(action.type){
        case 'TOOGLE_MASK_USERNAME':
            return{
                ...state,
                maskUserName:action.payload
            };
        default: 
        return state;
    }
}