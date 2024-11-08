import { ProfileDto } from '../../services/dtos';
import { RootState } from '../store';

export const selectMyProfile = (state: RootState): ProfileDto | null => state.profile.profile;