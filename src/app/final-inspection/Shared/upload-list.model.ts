import { FinalInspectionUpload } from './final-inspection-upload.model';
export class UploadList {
    uploads: FinalInspectionUpload[];

    public getList(uploads: FinalInspectionUpload[]) {
        let list: string[];
        for (let upload of uploads) {
            list.push(upload.Attachment);
        }
        console.log(list);
        return list;
    }

    public getObjectsFromList(uploads: string[]) {
        let list: UploadList;
        for (let upload of uploads) {
            let newUpload = new FinalInspectionUpload();
            newUpload.Attachment = upload;
            list.uploads.push(newUpload);
        }
        console.log(list);
        return list;
    }
}
