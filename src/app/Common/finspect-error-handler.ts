import { ErrorHandler, Injectable } from '@angular/core';
import { FinspectErrorService } from './finspect-error-service.service';

@Injectable()
export class FInspectErrorHandler extends ErrorHandler {
    constructor(private fInspectErrorService: FinspectErrorService) {
        super();
    }

    handleError(error) {
        this.fInspectErrorService.logError(error);
    }
}
