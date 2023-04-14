import { PartialType } from '@nestjs/swagger';
import { UsersDTO } from './create-user.dto';

export class UpdateUserDTO extends PartialType(UsersDTO) {}
