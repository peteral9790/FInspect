import{Assembly} from './assembly.model';
import{MIStatus} from './mistatus.model';
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
    FinalInspectionUploads: string[];
    MiStatus?: MIStatus;
    Assembly?: Assembly;

    /* constructor () {
        if(!this.MiStatus){
            this.MiStatus={};
        }
    } */
}
