import { LightningElement,api } from 'lwc';
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { createRecord, updateRecord, deleteRecord } from "lightning/uiRecordApi";

export default class ModalCmp extends LightningElement {
    @api title;
    @api items;

    closeModal(){
        const evt = new CustomEvent('closemodal', {detail: "close"});
        this.dispatchEvent(evt);
    }

    hanldeProjectField(){

    }


    handleChange(){

    }

@api
    save(){
            let cmp=this.template.querySelector('c-dynamic-form');
            let contactDatas = cmp.save();
            if(contactDatas.isvalid){
                //creat new resource here 
                
                if(this.title === "New Resource"){
                    this.createTask(contactDatas.outputs);
                    this.ShowToastEvent('Inseted',"opperation successful","success")
                }else if ( this.title === "New Task"){
                    this.createRessouce(contactDatas.outputs);
                    this.ShowToastEvent("Inseted","opperation successful",'success')
                }
                this.closeModal();
            }
        
            return contactDatas;
         }

    ShowToastEvent(title,massage,variant){
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: title,
                        message: massage,
                        variant: variant
                    })
                );

    }



      createTask(data){
                    console.log("createTask",data);
                    const insert = {
                                    apiName: "Ressource__c",
                                    fields: {
                                        Name: data[0].value,
                                        Prenom__c: data[1].value,
                                        Phone__c: data[2].value,
                                        Email__c: data[3].value,
                                    }
                                    };

                    return createRecord(insert).then((res) => {
                        console.log("inserted",res);
                        const evt = new CustomEvent('apexrefresh', {detail: ""});
                        this.dispatchEvent(evt);
                        return { tid: res.id, ...res };
                    });
          }

          

         createRessouce(data){
                    const insert = {
                                    apiName: "Task__c",
                                    fields: {
                                        Name: data[1].value,
                                        Projet__c: data[0].name,
                                        Status__c :data[2].value,
                                      
                                    }
                                    };

                    return createRecord(insert).then((res) => {
                        console.log("inserted",res);
                        const evt = new CustomEvent('apexrefresh', {detail: ""});
                        this.dispatchEvent(evt);
                        return { tid: res.id, ...res };
                    });
          }

}