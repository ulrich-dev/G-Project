import { LightningElement } from 'lwc';

export default class Newdoc extends LightningElement {

    options = [
        {
            label : "Urgence",
            Id: "123",
            icon_name : "utility:priority",
            color_name : "bg-color"

        },

        {
         
            label : "Haute",
            Id : "1234",
            icon_name : "utility:priority",
            color_name : "icon-righ"

        },

        {
           
            label : "Normale",
            Id : "12345",
            icon_name : "utility:priority",
            color_name : "slds-truncate"
            
        },

        {
           
            label : "Basse",
           Id : "123456",
            icon_name : "utility:priority",
            color_name : "assignTo"
            
        },

        {
           
            label : "Effacer",
           Id : "1234567",
            icon_name : "utility:close",
            color_name : "effacercolor"

            
        },


       
       
    ]
}