declare module "@salesforce/apex/projectManagerCtl.getTask" {
  export default function getTask(param: {recordId: any}): Promise<any>;
}
declare module "@salesforce/apex/projectManagerCtl.retriveFeedItems" {
  export default function retriveFeedItems(param: {recordId: any}): Promise<any>;
}
declare module "@salesforce/apex/projectManagerCtl.insertFeed" {
  export default function insertFeed(param: {recordId: any, body: any}): Promise<any>;
}
declare module "@salesforce/apex/projectManagerCtl.inserComment" {
  export default function inserComment(param: {recordId: any, body: any}): Promise<any>;
}
declare module "@salesforce/apex/projectManagerCtl.getTaskPicklist" {
  export default function getTaskPicklist(): Promise<any>;
}
declare module "@salesforce/apex/projectManagerCtl.createContentDocLink" {
  export default function createContentDocLink(param: {contentVersionId: any, recordId: any}): Promise<any>;
}
declare module "@salesforce/apex/projectManagerCtl.getFilesList" {
  export default function getFilesList(param: {recordId: any, sObjt: any}): Promise<any>;
}
declare module "@salesforce/apex/projectManagerCtl.getFileVersionDetails" {
  export default function getFileVersionDetails(param: {fileId: any}): Promise<any>;
}
