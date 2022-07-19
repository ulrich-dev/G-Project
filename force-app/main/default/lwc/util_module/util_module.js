import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { createRecord, updateRecord, deleteRecord } from "lightning/uiRecordApi";


//this methos in use to delete Task
const delete_task = (taskId,self) => {
   //Logic
    return deleteRecord(taskId,self).then(() => {
        refresh_apex(self);
    });
};

const create_task = (data,self,ressource) => {

     let resp = createRecord(data).then((res) => {
                       refresh_apex(self);
                       toast_event('update','update successful','success',self);
                       if(ressource){
                          create_Assigntask(res.id,ressource,self);
                       }
                    });
   
};

const create_Assigntask =(taskId,ressId,self)=>{
      const insert = {
                      apiName: "Assigne_ressource__c",
                              fields: {
                                        Ressource__c : ressId,
                                        task__c: taskId,
                                      }
                   };
   return  createRecord(insert).then((res) => {
                       refresh_apex(self);
                       toast_event('update','update successful','success',self);
                    });
}


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

   const update_task = (data,self) => {
                    console.log("updateTask",data);
                    const update = {
                        fields: data
                    };
                    return updateRecord(update).then(() => {
                       refresh_apex(self);
                       toast_event('update','update successful','success',self);
                    });
   }

const dispash_event =(eventName,self,evtDetail)=>{
         const evt = new CustomEvent(eventName, {detail: evtDetail});
         self.dispatchEvent(evt);
}

const refresh_apex =(self)=>{
         const evt = new CustomEvent('refres_apex', {detail: ""});
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