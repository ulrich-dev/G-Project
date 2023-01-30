import { LightningElement,api } from 'lwc';
import { delete_task,toastEvent,refresh_apex,dispash_event } from 'c/util_module';
import LightningConfirm from 'lightning/confirm';
import createContentDocLink from "@salesforce/apex/projectManagerCtl.createContentDocLink";


import { deleteRecord, createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const BASE64EXP = new RegExp(/^data(.*)base64,/);
export default class DragListContainer extends LightningElement {
  @api items;
  @api name;
  @api title;

  fileName
  recordId
  get itemsWrap(){
      if(this.items){
        this.items =[...this.items.map((item)=>({...item,Name:item.Name.length >7? item.Name.substring(0,6)+'...': item.Name   }))];
      }

    return this.items;
  }

   cancel(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  handleDragComplete(event) {
    // Fire custom event when drag stops
    const detail = { name: this.name, id: event.currentTarget.dataset.id }
    console.log('detail in dragcompleted',detail)
    this.dispatchEvent(
      new CustomEvent(
        'endmove', 
        { detail }
      )
    )
    event.stopPropagation();
  }
  // Fire custom event when drag starts
  handleDragStart(event) {
    const detail = { name: this.name, id: event.currentTarget.dataset?.id }
    this.dispatchEvent(
      new CustomEvent(
        'startmove', 
        { detail }
      )
    )
  }

  //dispash selected task
  handleShowDetail(event){
    let taskId = event.currentTarget.dataset.id;

    const evt = new CustomEvent('handle_show_details', {
        detail:  this.items.filter((item)=> item.Id == taskId)[0]
    });
    this.dispatchEvent(evt);
  }

  editeTask(event){
    let taskId = event.currentTarget.dataset.id;
    dispash_event('task_event',this,{action:'edittask',Id :taskId});

    event.stopPropagation();

  }

handleUpload(event) {
  try {
    const file = event.target.files[0];
    this.recordId = event.currentTarget.dataset.id;
    const reader = new FileReader();
    let fileData = "";
    reader.onload = () => {
      fileData = reader.result;
      this.uploadFile(file, fileData);
    };
    reader.readAsDataURL(file);
  } catch (err) {
    console.error(err);
    this.dispatchEvent(
      new ShowToastEvent({
        variant: "error",
        message: `File upload failed: ${err.body.message || err.body.error}`
      })
    );
  }
  event.stopPropagation();
} 

uploadFile(file, fileData) {
  const payload = {
    Title: file.name,
    PathOnClient: file.name,
    VersionData: fileData.replace(BASE64EXP, "")
  };
  createRecord({ apiName: "ContentVersion", fields: payload })
    .then((cVersion) => {
        this.createContentLink(cVersion.id);
        this.dispatchEvent(
          new ShowToastEvent({
            variant: "success",
            message: `Content Document Version created ${cVersion.id}`
          })
        );
      
    })
    .catch((err) => {
      this.dispatchEvent(
        new ShowToastEvent({
          variant: "error",
          message: `File upload failed: ${err.body.message || err.body.error}`
        })
      );
      this.showSpinner = false;
    });
} 

createContentLink(cvId) {
  console.log('created content document id',this.recordId);
  console.log('created content verssion id',cvId);
 createContentDocLink({
    contentVersionId: cvId,
    recordId: this.recordId
  })
    .then((cId) => {
      this.dispatchEvent(
        new ShowToastEvent({
          variant: "success",
          message: `File uploaded successfully ${cId}`
        })
      );
    })
    .catch((err) => {
      this.dispatchEvent(
        new ShowToastEvent({
          variant: "error",
          message: `An error occurred: ${
            err.body ? err.body.message || err.body.error : err
          }`
        })
      );
    });
}


  handleNewTask(){
    dispash_event('task_event',this,{action:'New Task',Id :''});
  }
  async deleteTask(event){
    const taskId =event.currentTarget.dataset.id;
    const result = await LightningConfirm.open({
      variant: 'brand',
      label: 'Confirm Delete',
      header:'Confirm delete',
      // setting theme would have no effect
      });
  if(result){      
        let rep=  delete_task(taskId,this);
  }

  event.stopPropagation();
  }

}