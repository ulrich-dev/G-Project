import { LightningElement,api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Task__c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/Task__c.Description__c';
import STATUT_FIELD from '@salesforce/schema/Task__c.Status__c';
import Startdate_FIELD from '@salesforce/schema/Task__c.Start_date__c';
import Enddate_FIELD from '@salesforce/schema/Task__c.End_date__c';
import RESSOURCES_FIELD from '@salesforce/schema/Task__c.Ressource__c';
import PROJET_FIELD from '@salesforce/schema/Task__c.Projet__c';



export default class Task_detailsCmp extends LightningElement {
@api
selectedtask

@api objectApiName='Task__c';

nameField = NAME_FIELD;
Description = DESCRIPTION_FIELD;
statusField = STATUT_FIELD;
startField = Startdate_FIELD;
Enddate = Enddate_FIELD;
RessourceField = RESSOURCES_FIELD;
projetField = PROJET_FIELD;

get taskId(){
    return this.selectedtask?.Id;
}
get taskName(){
    return this.selectedtask? this.selectedtask.Name:""; 
    this.recordId = this.selectedtask.Id;
}
    closeModal(){
        const event = new CustomEvent('closemodal', {
            detail: {  }
        });
        this.dispatchEvent(event);
    }
}