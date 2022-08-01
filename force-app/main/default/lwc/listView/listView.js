import { api,track,LightningElement } from 'lwc';

import { delete_task,refresh_apex,dispash_event,toast_event } from 'c/util_module';
import LightningConfirm from 'lightning/confirm';




export default class ListView extends LightningElement {

@track result;
@track assTask;
@track ressourcies;

fileData;
fileName
recordId
isTaskDetailCmp
task

    @api
    get tasks() {
        return this.result;
    }
    set tasks(value) {
        this.result = [...value.map(item =>({...item,minimize:false,icon_name:"utility:chevrondown",itemSize:item.selectedItems.length }))];
       console.log("task list result",this.result);
    }

    //handle minimize function
    handleMinimize(event){
        let val =event.currentTarget.dataset.id;
        this.result = [... this.result.map((item)=> item.title == val? !item.minimize? {...item, minimize:true,icon_name :"utility:chevronup"}:{...item,minimize:false,icon_name :"utility:chevrondown"}  : {...item})];
        
    }

    handleNewTask(event){
        console.log('new event action');
        dispash_event('task_event',this,{action:'newtask',Id :''});
    }

    handleEdit(event){  
        event.stopPropagation();
        dispash_event('task_event',this,{action:'edittask',Id :event.currentTarget.dataset.id});
    }

    handleAttach(event){
        event.stopPropagation();
    }
    handleSelected(event){

    }

    handleApexRefresh(){
        console.log('after update////');
        refresh_apex(this);
    }

    handleFile(event){
        event.stopPropagation();
        console.log('fille change');
        if(event.target.files.length > 0) {
            const file = event.target.files[0]
            this.recordId = event.currentTarget.dataset.id;
            var reader = new FileReader()
            reader.onload = () => {
                var base64 = reader.result.split(',')[1]
                this.fileName = file.name;
                this.fileData = {
                    'filename': file.name,
                    'base64': base64
                }
                console.log(this.fileData)
            }
            reader.readAsDataURL(file)
            //upload File 
            this.uploadFile();
        }
        event.preventDefault();
    }

    uploadFile() {
        event.stopPropagation();
        console.log('start send file');
        const {base64, filename} = this.fileData
        uploadFile({ fileName:this.fileName, base64Data : base64, recordId:this.recordId }).then(result=>{
            this.fileData = null
            this.fileName =""
            let title = `${filename} uploaded successfully!!`;
            toast_event('Success!',title,'success',this);
        }).catch(err=>{
            toast_event('Error!!',err.body.message,'error',this);
        }).finally(() => {
        })

    }

    async handleDelete(event){
        event.stopPropagation();
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
    get getSelectedTask(){
        return this.task;
    }

    openDetailsCmp(event){
        this.result.forEach(element => {
            element.selectedItems.forEach(item => {
                if(item.Id === event.currentTarget.dataset.id){
                    this.task = item;
                }
            });
        });
       
        console.log('selected item',JSON.stringify(this.task ));
        this.isTaskDetailCmp =true;
        event.stopPropagation();
    }

    closeTaskDetailCmp(){
        this.isTaskDetailCmp =false;
    }

}