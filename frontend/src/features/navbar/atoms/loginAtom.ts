import { atomWithStorage } from 'jotai/utils'


export const loginAtom = atomWithStorage('isLoggedIn',false);
