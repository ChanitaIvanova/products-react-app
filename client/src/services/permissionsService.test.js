import { baseUrl } from '../config';
import { fetchPermissions } from './permissionsService';

describe('permissionsService', () => {
    describe('#fetchPermissions', () => {
        beforeEach(() => {
            fetch.resetMocks();
        });

        describe('WHEN the promise is resolve successfully', () => {
            it("returns the permissions", () => {
                fetch.mockResponseOnce(JSON.stringify(['READ', 'WRITE'] ));
                return fetchPermissions().then(permissions => {
                    expect(permissions).toEqual(['READ', 'WRITE']);
                    expect(fetch).toHaveBeenCalledTimes(1);
                    expect(fetch).toHaveBeenCalledWith(baseUrl + 'permissions');
                });
                
            });
        });

        describe('WHEN the promise is rejected', () => {
            it("returns empty permissions", () => {
                fetch.mockReject(() => Promise.reject("Failed to get data"));
                return fetchPermissions().then(permissions => {
                    expect(permissions).toEqual([]);
                    expect(fetch).toHaveBeenCalledTimes(1);
                    expect(fetch).toHaveBeenCalledWith(baseUrl + 'permissions');
                });
                
            });
        })
    });
})
