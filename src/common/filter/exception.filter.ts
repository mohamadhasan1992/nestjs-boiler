import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { LoggerService } from '../logger';
import { ThrottlerException } from '@nestjs/throttler';



interface IError {
  message: string;
  statusCode: string;
  error: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    let message: IError;
    if (exception instanceof ThrottlerException) {
      message = {
        message: 'Too Many Requests',
        statusCode: status.toString(),
        error: 'ThrottlerException'
      };
    } else {
      message = exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : { message: (exception as Error).message, statusCode: null, error: "HTTP EXCEPTION ERROR" };
    }
    const responseData = {
      ...{
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      ...message,
    };

    this.logMessage(request, message, status, exception);

    response.status(status).json(responseData);
  }

  private logMessage(request: any, message: IError, status: number, exception: any) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} statusCode=${
          message.statusCode ? message.statusCode : null
        } message=${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} statusCode=${
          message.statusCode ? message.statusCode : null
        } message=${message.message ? message.message : null}`,
      );
    }
  }
}
