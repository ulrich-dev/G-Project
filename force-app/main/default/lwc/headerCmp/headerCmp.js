import { api,LightningElement } from 'lwc';

export default class HeaderCmp extends LightningElement {
@api project;

menuItem =[
    {    
        name : "Liste",
        label : "Liste",
        iconName:"utility:list" 
    },
    {
        name : "Tableau",
        label : "Tableau",
        iconName:"utility:table" 
    },
    {
        name : "Calendrier",
        label : "Calendrier",
        iconName:"utility:date_input" 
    },
    {   
        name : "Gantt",
        label : "Gantt",
        iconName:"utility:table" 
    }
]
    handleclick(event){
        console.log("click sur un bottom")
            let activeMenu = event.currentTarget.dataset.id;
            const evt = new CustomEvent('handleactivemenu', {detail: {_active_menu : activeMenu}});
            this.dispatchEvent(evt);
    }
}