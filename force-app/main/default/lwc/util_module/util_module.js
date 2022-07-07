import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { createRecord, updateRecord, deleteRecord } from "lightning/uiRecordApi";


//this methos in use to delete Task
const delete_task = (taskId,self) => {
   //Logic
    return deleteRecord(taskId,self).then(() => {
        this.refresh_apex(self);
    });
};

const create_task = (taskId) => {
   //Logic
   console.log("task id",taskId);
   return true;
};


const update_task = (taskId) => {
   //Logic
   console.log("task id",taskId);
   return true;
};


const delete_resource = (taskId) => {
   //Logic
   console.log("task id",taskId);
   return true;
};

const create_resource = (taskId) => {
   //Logic
   console.log("task id",taskId);
   return true;
};

const dispash_event =(eventName,self)=>{
         const evt = new CustomEvent(eventName, {detail: "newTask"});
         self.dispatchEvent(evt);
}

const refresh_apex =(self)=>{
         const evt = new CustomEvent('refres_apex', {detail: "newTask"});
         self.dispatchEvent(evt);
}

const  toast_event =(title,massage,variant,self)=>{
                self.dispatchEvent(
                    new ShowToastEvent({
                        title: title,
                        message: massage,
                        variant: variant
                       })
                   );

               }

export {delete_task,create_task,update_task,delete_resource,create_resource,refresh_apex,dispash_event,toast_event};
/*** OTHER COMPONENT IMPORT STATEMENT: import { getTermOptions, calculateMonthlyPayment } from 'c/mortgage';    ***/