import { api,track,LightningElement } from 'lwc';
import { refresh_apex,dispash_event,toast_event } from 'c/util_module';


const IN_PROGRESS ="In Progress";
const OPEN ="Open";
const COMPLETED ="Completed";
const TEST ="Test";
const CLOSED ="Closed";
export default class SectionCmp extends LightningElement {
    isActiveMenu;
    isListe=true
    isCalenda=false
    isTab =false
    isGantt =false

    @track taskList=[];
    @track result


    @track 
        open = {
            title:'OPEN',
            selectedItems : [
                {
                    id:'1',
                    Name : 'Test Task 1',
                }
            ]
        }

    @track
      inProgress = {
        title:'IN PROGRESS',
         selectedItems : [
            {
                id:'2',
                Name : 'Test Task 2',
            }
        ]
    }


    @track
      completed = {
        title:'COMPLETED',
         selectedItems : [
            {
                id:'3',
                Name : 'Test Task 3',
            }
        ]
    }

    @track
      test = {
        title:'TEST',
         selectedItems : [
            {
                id:'4',
                Name : 'Test Task 4',
            }
        ]
    }

    @track
      closed = {
        title:'CLOSED',
         selectedItems : [
            {
                id:'5',
                Name : 'Test Task 5',
            }
        ]
    }



   @api
   get tasks() {
       return this.result;
   }
   set tasks(value) {
       this.result = value;
       console.log("tasksList",JSON.stringify(value));
    if(value){
         this.taskList =[]
        this.open.selectedItems= [];
        this.inProgress.selectedItems= [];
        this.completed.selectedItems= [];
        this.test.selectedItems= [];
        this.closed.selectedItems= [];
         value.forEach(tasks => {
        if(tasks.Status__c === OPEN) this.open.selectedItems.push({...tasks, iconName :"open"});
        if(tasks.Status__c === IN_PROGRESS) this.inProgress.selectedItems.push({...tasks, iconName :"inProgress"});
        if(tasks.Status__c === COMPLETED) this.completed.selectedItems.push({...tasks, iconName :"completed"});
        if(tasks.Status__c === TEST) this.test.selectedItems.push({...tasks, iconName :"test"});
        if(tasks.Status__c === CLOSED) this.closed.selectedItems.push({...tasks, iconName :"closed"});
        
        });

        this.taskList.push(this.open);
        this.taskList.push(this.inProgress);
        this.taskList.push(this.completed);
        this.taskList.push(this.test);
        this.taskList.push(this.closed);
        console.log(">>>>>>task list",this.taskList);
    }
 
   }


    @api
    get activemenu() {
        return this.isActiveMenu;
    }
    set activemenu(value) {
        this.isActiveMenu = value;
        switch (value) {
            case 'Liste':
                this.isListe =true;
                this.isTab =false;
                this.isCalenda =false;
                this.isGantt =false;
                break;
            case 'Tableau':
                this.isTab =true;
                this.isListe =false;
                this.isCalenda =false;
                this.isGantt =false;
                break;
            case 'Calendrier':
                this.isCalenda =true;
                this.isTab =false;
                this.isListe =false;
                this.isGantt =false;
                break;
            case 'Gantt':
                this.isTab =false;
                this.isListe =false;
                this.isCalenda =false;
                this.isGantt =true;
                break;
        
            default:
                break;
        }
    }
    //fire event new task
    handleNewTask(event){
        console.log('event');
        dispash_event('task_event',this,event.detail)
    }

    // aprex refresh

    handleApexRefresh(){
        refresh_apex(this);
    }
      

}