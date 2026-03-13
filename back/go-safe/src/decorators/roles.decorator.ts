import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/auth/guards/roles.enum';

export const Roles = (role: Role) => SetMetadata('role', role);
