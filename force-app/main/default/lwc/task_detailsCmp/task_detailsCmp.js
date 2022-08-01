import { LightningElement,api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Task__c.Name';


export default class Task_detailsCmp extends LightningElement {
@api selectedtask
@api recordId ='a027Q000003Qt0fQAC';
@api objectApiName='Task__c';

nameField = NAME_FIELD;

get taskName(){
    return this.selectedtask? this.selectedtask.Name:""; 
}
    closeModal(){
        const event = new CustomEvent('closemodal', {
            detail: {  }
        });
        this.dispatchEvent(event);
    }
}