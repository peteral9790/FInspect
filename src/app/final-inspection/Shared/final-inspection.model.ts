import { Assembly } from './assembly.model';
import { MIStatus } from './mistatus.model';
import { FinalInspectionUpload } from './final-inspection-upload.model';
import { UploadList } from './upload-list.model';

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
    FinalInspectionUploads: FinalInspectionUpload[];
    MiStatus?: MIStatus;
    Assembly?: Assembly;

    constructor() {
        if (!this.MiStatus) {
            this.MiStatus = {
                Id: null,
                SalesOrder: '',
                MINumber: '',
                MIRev: '',
                Location: '',
                CustomerName: ''
            };
        }
        if (!this.Assembly) {
            this.Assembly = {
                TMSPartNumber: '',
                CustomerPartNumber: '',
                CableMI: '',
                CableDescription: '',
                Length: null,
                FWDConnType: '',
                FWDConnector: '',
                FWDIntermediate: '',
                AFTIntermediate: '',
                AFTConnector: '',
                AFTConnType: ''
            };
        }
    }  
}
