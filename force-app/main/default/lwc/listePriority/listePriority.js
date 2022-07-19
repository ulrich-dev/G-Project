import { LightningElement } from 'lwc';

export default class ListePriority extends LightningElement {

    options = [{
        name:"Urgence", 
        label : "Urgence",
        class : "bg-color", 
        icon_name : "utility:priority",
    },

    {
        name:"Haute", 
        label : "Haute",
        class : "icon-righ",
        icon_name : "utility:priority",

    },

    {
        name:"Normal", 
        label : "Normal",
        class : "slds-truncate", 
        icon_name : "utility:priority",  
    },

    {
        name:"Basse", 
        label : "Basse",
        class : "assignTo", 
        icon_name :"utility:priority",  

    },

    {
        name :"Effacer",
        label : "Effacer",
        class : "effacercolor",
        icon_name : "utility:close",
    },


    
]
}