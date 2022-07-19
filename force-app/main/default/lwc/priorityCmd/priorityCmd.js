import { LightningElement,api,track } from 'lwc';
import { update_task,refresh_apex,dispash_event,toast_event } from 'c/util_module';


export default class PriorityCmd extends LightningElement {

    @track bg_color='';
    @track task;
    @api
    get priority() {
        return this.bg_color;
    }
    set priority(value) {
        this.task ={...value};
        switch (this.task.Priority__c) {
            case 'Urgent':  this.bg_color= 'urgent'; break;
            case 'High' :   this.bg_color = 'high'; break;
            case 'Low' :    this.bg_color= 'low'; break;
            case 'Normal' : this.bg_color= 'normal'; break;
            case 'Closed' : this.bg_color= 'closed'; break;        
            default:
                break;
        }
    }

    options = [
        {
            label : "Urgent",
            Id: "123",
            icon_name : "utility:priority",
            color_name : "urgent"

        },

        {
         
            label : "High",
            Id : "1234",
            icon_name : "utility:priority",
            color_name : "high"

        },

        {
           
            label : "Normal",
            Id : "12345",
            icon_name : "utility:priority",
            color_name : "normal"
            
        },

        {
           
            label : "Low",
            Id : "123456",
            icon_name : "utility:priority",
            color_name : "low"
            
        },

        {
           
             label : "Closed",
             Id : "1234567",
             icon_name : "utility:close",
             color_name : "closed"

            
        },
    ];

    handleClick(event){
       let selectedId = event.currentTarget.dataset.id;
       let selectedVal = event.currentTarget.value;

        const field={
                        Id: selectedId,
                        Priority__c :selectedVal
                    }
                          
       let resp = update_task(field,this); 
    }
}