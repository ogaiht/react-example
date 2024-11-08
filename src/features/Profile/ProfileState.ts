import { ProfileDto } from '../../services/dtos';

export interface ProfileState {
    profile: ProfileDto|null;
    errors: boolean;
    loading: boolean;
}

export const initialState: ProfileState  = {
    profile: null,
    errors: false,
    loading: false
};