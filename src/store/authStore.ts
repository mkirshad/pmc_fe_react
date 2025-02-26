import cookiesStorage from '@/utils/cookiesStorage'
import appConfig from '@/configs/app.config'
import { TOKEN_NAME_IN_STORAGE } from '@/constants/api.constant'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User } from '@/@types/auth'
import AxiosBase from '../services/axios/AxiosBase';

type Session = {
    signedIn: boolean
}

type AuthState = {
    session: Session
    user: User
}

type AuthAction = {
    setSessionSignedIn: (payload: boolean) => void
    setUser: (payload: User) => void
    fetchUserGroups: () => Promise<void>  // Action to fetch user groups
}

const getPersistStorage = () => {
    if (appConfig.accessTokenPersistStrategy === 'localStorage') {
        return localStorage
    }

    if (appConfig.accessTokenPersistStrategy === 'sessionStorage') {
        return sessionStorage
    }

    return cookiesStorage
}

const initialState: AuthState = {
    session: {
        signedIn: false,
    },
    user: {
        avatar: '',
        userName: '',
        email: '',
        authority: [],
    },
}

export const useSessionUser = create<AuthState & AuthAction>()(
    persist(
        (set) => ({
            ...initialState,
            setSessionSignedIn: (payload) =>
                set((state) => ({
                    session: {
                        ...state.session,
                        signedIn: payload,
                    },
                })),
            setUser: (payload) =>
                set((state) => ({
                    user: {
                        ...state.user,
                        ...payload,
                    },
                })),
            // Fetch user groups along with district details
            fetchUserGroups: async () => {
                try {
                    if (navigator.onLine) {
                        const response = await AxiosBase.get('/pmc/user-groups/', {
                            headers: { 'Content-Type': 'application/json' },
                        });
                        const groups = response.data || [];
                        
                        // Extract district information from the first group (all groups will have the same district)
                        const districtInfo = groups.length > 0 ? {
                            district_id: groups[0].district_id,
                            district_name: groups[0].district_name,
                        } : { district_id: null, district_name: '' };

                        set((state) => ({
                            user: {
                                ...state.user,
                                authority: groups.length > 0 ? groups.map(group => group.name) : [''],
                                district_id: districtInfo.district_id,  // Store district_id
                                district_name: districtInfo.district_name,  // Store district_name
                            },
                        }));
                    } 
                } catch (error) {
                    console.error('Error fetching user groups:', error);
                    set((state) => ({
                        user: {
                            ...state.user,
                            authority: [],
                            district_id: null,  // Reset on error
                            district_name: '',  // Reset on error
                        },
                    }));
                }
            },
        }),
        { name: 'sessionUser', storage: createJSONStorage(() => localStorage) },
    ),
);


export const useToken = () => {
    const storage = getPersistStorage()

    const setToken = (token: string) => {
        storage.setItem(TOKEN_NAME_IN_STORAGE, token)
    }

    return {
        setToken,
        token: storage.getItem(TOKEN_NAME_IN_STORAGE),
    }
}
