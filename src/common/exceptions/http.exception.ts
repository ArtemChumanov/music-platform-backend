import { BadRequestException } from '@nestjs/common';

export class CreateException extends BadRequestException {
  constructor(message = 'Cannot create entity') {
    super(message);
  }
}
