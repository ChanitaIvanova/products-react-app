import { RECEIVE_PERMISSIONS } from '../actionTypes';

export const receivePermissions = (permissions) => ({
    type: RECEIVE_PERMISSIONS,
    payload: permissions,
});
