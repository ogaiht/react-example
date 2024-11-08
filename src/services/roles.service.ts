
import { CrudService } from './crud.service';
import { RoleDto } from './dtos';

const API_URI = 'roles';

export const roleService = new CrudService<RoleDto>(API_URI);