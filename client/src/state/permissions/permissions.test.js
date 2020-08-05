import { Permissions } from './permissions';
import { RECEIVE_PERMISSIONS } from '../actionTypes';

describe('Permissions', () => {
    it('should return the initial state', () => {
        expect(Permissions(undefined, {})).toEqual({
            permissions: [],
        });
    });

    it('should handle RECEIVE_PERMISSIONS', () => {
        const permissions = ['CREATE', 'READ'];
        expect(
            Permissions(undefined, {
                type: RECEIVE_PERMISSIONS,
                payload: permissions,
            })
        ).toEqual({ permissions: permissions });

        expect(
            Permissions(
                { permissions: [] },
                {
                    type: RECEIVE_PERMISSIONS,
                    payload: permissions,
                }
            )
        ).toEqual({ permissions: permissions });
    });
});
