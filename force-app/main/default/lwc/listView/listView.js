import { api,track,LightningElement } from 'lwc';
import { delete_task,refresh_apex,dispash_event,toast_event } from 'c/util_module';
import LightningConfirm from 'lightning/confirm';




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

    handleNewTask(event){
        console.log('new event action');
        dispash_event('taskevent',this,{action:'newtask',Id :''});
    }

    handleEdit(event){  
        dispash_event('task_event',this,{action:'edittask',Id :event.currentTarget.dataset.Id});

    }

    handleAttach(event){
       dispash_event('task_event',this,{action:'atachement',Id :event.currentTarget.dataset.Id});
    }
    async handleDelete(event){
        let taskId = event.currentTarget.dataset.id;
        console.log('console.log');
        const result = await LightningConfirm.open({
            variant: 'brand',
            label: 'Confirm Delete',
            header:'Confirm delete',
            // setting theme would have no effect
        });
        if(result){      
                let rep = delete_task(taskId,this);
                toast_event('deleted','deleted successful','success',this);
        }
    }

}