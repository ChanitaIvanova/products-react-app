import { RECEIVE_PERMISSIONS } from '../actionTypes';

export const Permissions = (state = { permissions: [] }, action) => {
    switch (action.type) {
        case RECEIVE_PERMISSIONS:
            return { ...state, permissions: action.payload };
        default:
            return state;
    }
};
