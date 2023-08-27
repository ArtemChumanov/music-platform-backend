import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
    //     Logger.error(`${request.method} ${request.url}`, exception.stack);
    // } else {
    //     Logger.error(
    //         `${status} ${request.method} ${request.url}`,
    //         `Message: ${exception.message} `,
    //         `ExceptionFilter`,
    //     );
    // }

    response.status(status).json({
      statusCode: status,
      message: exception?.message || null,
      timestamp: new Date(),
      path: request.url,
    });
  }
}
