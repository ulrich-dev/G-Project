declare module "@salesforce/apex/projectManagerCtl.getTask" {
  export default function getTask(param: {recordId: any}): Promise<any>;
}
declare module "@salesforce/apex/projectManagerCtl.getTaskPicklist" {
  export default function getTaskPicklist(): Promise<any>;
}
declare module "@salesforce/apex/projectManagerCtl.uploadFile" {
  export default function uploadFile(param: {fileName: any, base64Data: any, recordId: any}): Promise<any>;
}
declare module "@salesforce/apex/projectManagerCtl.getAllDocument" {
  export default function getAllDocument(param: {taskIds: any}): Promise<any>;
}
