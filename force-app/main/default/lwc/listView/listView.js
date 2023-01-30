import { api,track,LightningElement } from 'lwc';

import { delete_task,refresh_apex,dispash_event,toast_event,update_task } from 'c/util_module';
import LightningConfirm from 'lightning/confirm';
import createContentDocLink from "@salesforce/apex/projectManagerCtl.createContentDocLink";


import { deleteRecord, createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const BASE64EXP = new RegExp(/^data(.*)base64,/);
export default class ListView extends LightningElement {

@track result;
@track assTask;
@track ressourcies;

fileData;
fileName
recordId
isTaskDetailCmp
task

    @api
    get tasks() {
        return this.result;
    }
    set tasks(value) {
        this.result = [...value.map(item =>({...item,minimize:false,icon_name:"utility:chevrondown",itemSize:item.selectedItems.length }))];
       console.log("task list result",this.result);
    }

    //handle minimize function
    handleMinimize(event){
        let val =event.currentTarget.dataset.id;
        this.result = [... this.result.map((item)=> item.title == val? !item.minimize? {...item, minimize:true,icon_name :"utility:chevronup"}:{...item,minimize:false,icon_name :"utility:chevrondown"}  : {...item})];
        
    }

    handleNewTask(event){
        console.log('new event action');
        dispash_event('task_event',this,{action:'newtask',Id :''});
    }

    handleEdit(event){  
        event.stopPropagation();
        dispash_event('task_event',this,{action:'edittask',Id :event.currentTarget.dataset.id});
    }

 
    handleSelected(event){

    }

    handleApexRefresh(){
        console.log('after update////');
        refresh_apex(this);
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
      
    async handleDelete(event){
        event.stopPropagation();
        let taskId = event.currentTarget.dataset.id;
        console.log('console.log');
        const result = await LightningConfirm.open({
            variant: 'brand',
            label: 'Confirm Delete',
            header:'Confirm delete',
            // setting theme would have no effect
        });
        if(result){        
                let rep = delete_task(taskId,this);
                toast_event('deleted','deleted successful','success',this);
        }
    }
    get getSelectedTask(){
        return this.task;
    }

    //update favorie flag
    handleFavorite(event){
        let curent_Task;
        this.result.forEach(element => {
            element.selectedItems.forEach(item => {
                if(item.Id === event.currentTarget.dataset.id){
                    curent_Task = item;
                }
            });
        });
        let fields={
            Id : event.currentTarget.dataset.id,
            flag_favorie__c : curent_Task.flag_favorie__c? false : true
        }
        update_task(fields,this);
    }

    openDetailsCmp(event){
        this.result.forEach(element => {
            element.selectedItems.forEach(item => {
                if(item.Id === event.currentTarget.dataset.id){
                    this.task = item;
                }
            });
        });
       
        console.log('selected item',JSON.stringify(this.task ));
        this.isTaskDetailCmp =true;
        event.stopPropagation();
    }

    closeTaskDetailCmp(){
        this.isTaskDetailCmp =false;
    }

}