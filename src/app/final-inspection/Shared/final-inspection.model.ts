import { FinalInspectionUpload } from './final-inspection-upload.model';
export class FinalInspection {
    Id: number;
    TMSPartNumber: string;
    MiStatusBarcode: string;
    DateInspected: string;
    QuantityInspected: string;
    QuantityAccepted: string;
    MfgLocation: string;
    InspectionLocation: string;
    InspectionType: string;
    InspectorName: string;
    EmployeeId: string;
    InspectionFiles: FinalInspectionUpload;
    constructor() {
        this.InspectionFiles = new FinalInspectionUpload();
    }
}
