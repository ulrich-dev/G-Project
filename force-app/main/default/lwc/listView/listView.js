import { api,track,LightningElement } from 'lwc';
import { delete_task,refresh_apex,dispash_event,toast_event } from 'c/util_module';



export default class ListView extends LightningElement {

@track result

    @api
    get tasks() {
        return this.result;
    }
    set tasks(value) {
        this.result = [...value.map(item =>({...item,minimize:false,icon_name:"utility:chevrondown",itemSize:item.selectedItems.length }))];
       console.log("task list",value);

    }

    //handle minimize function
    handleMinimize(event){
        let val =event.currentTarget.dataset.id;
        this.result = [... this.result.map((item)=> item.title == val? !item.minimize? {...item, minimize:true,icon_name :"utility:chevronup"}:{...item,minimize:false,icon_name :"utility:chevrondown"}  : {...item})];
        
    }

    handleNewTask(){
        dispash_event('newtask',this);
    }

    handleEdit(){  
        dispash_event('edittask',this);
    }

    handleAttach(){
       dispash_event('attachtask',this);
    }
    handleDelete(event){
        console.log('console.log');
        let taskId = event.currentTarget.dataset.id;
        let rep = delete_task(taskId,this);
        toast_event('deleted','deleted successful','success',this);

       


    }


 
   


}