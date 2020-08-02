import { ADD_PERMISSIONS } from '../actionTypes';

export const addPermissions = (permissions) => ({
    type: ADD_PERMISSIONS,
    payload: permissions
});
