import { LightningElement,track,api } from 'lwc';
import { refresh_apex,dispash_event,toast_event,update_task} from 'c/util_module';

const IN_PROGRESS ="In Progress";
const OPEN ="Open";
const COMPLETED ="Completed";
const TEST ="Test";
const CLOSED ="Closed";
export default class TabView extends LightningElement {

isSameRows= false; 

@api
get tasks() {
    return this.tasks;
}
set tasks(tasksList) {
    if(tasksList){
        this.open = {...tasksList[0] };
        this.inProgress = {...tasksList[1] };
        this.completed = {...tasksList[2] };
        this.test = {...tasksList[3] };
        this.closed = {...tasksList[4] };

    }
 
}

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



    // Temp storage set on drag start
    dragInfo

    @track items=[
        {
            name:"open",
            label:"OPEN",
        },
         {
            name:"inProgress",
            label:"IN PROGRESS",
        },
         {
            name:"completed",
            label:"COMPLETED",
        },
         {
            name:"test",
            label:"TEST",
        },
         {
            name:"closed",
            label:"CLOSED",
        }
    ]


    handleDragStart(event) {
        // Keep track of the list and item id
        console.log('start drag');
        this.dragInfo = { ...event.detail }
       
    }
    //dispash new task event
    handleNewTask(event){
        const evt = new CustomEvent('newtask', {detail: event.detail});
        this.dispatchEvent(evt);
    }

    handleApexRefresh(event){
        refresh_apex(this);
    }

    edittask(event){
        console.log('event detail ',event.detail);
        dispash_event('task_event',this,event.detail);
    }

    handleDragComplete(event) {
        // Keep reference to the lists. Start and end lists may be the same list.
        let startList;
        let endList;
        let evtId =  event.detail.id;
        let status="";
        if(this.dragInfo.name === 'open'){
            if(event.detail.name === 'completed'){
                startList = this.dragInfo.name === 'open'? this.open : this.completed 
                endList = event.detail.name === 'open'? this.open : this.completed 
                status = COMPLETED;
            }else if(event.detail.name === 'test'){
                 startList = this.dragInfo.name === 'open'? this.open : this.test 
                 endList = event.detail.name === 'open'? this.open : this.test 
                status = TEST;
            }else if(event.detail.name === 'closed'){
                 startList = this.dragInfo.name === 'open'? this.open : this.closed 
                 endList = event.detail.name === 'open'? this.open : this.closed 
                status = CLOSED;
                 
            }else{
                startList = this.dragInfo.name === 'open'? this.open : this.inProgress 
                endList = event.detail.name === 'open'? this.open : this.inProgress 
                status = IN_PROGRESS;
            }
            if(event.detail.name === 'open'){
                this.isSameRows= true; 
                status = OPEN;
            } 
        }
 // Keep reference to the lists. Start and end lists may be the same list.
        if(this.dragInfo.name === 'inprogress'){
            if(event.detail.name === 'open'){
                startList = this.dragInfo.name ==='inprogress'? this.inProgress : this.open 
                endList = event.detail.name === 'inprogress'? this.inProgress : this.open 
                status = OPEN;
            }else if(event.detail.name === 'completed'){
                 startList = this.dragInfo.name === 'inprogress'? this.inProgress : this.completed 
                 endList = event.detail.name === 'inprogress'? this.inProgress : this.completed 
                status = COMPLETED;
            }else if(event.detail.name === 'test'){
                 startList = this.dragInfo.name === 'inprogress'? this.inProgress : this.test 
                 endList = event.detail.name === 'inprogress'? this.inProgress : this.test 
                status = TEST;
            }else if(event.detail.name === 'closed'){
                 startList = this.dragInfo.name === 'inprogress'? this.inProgress : this.closed 
                 endList = event.detail.name === 'inprogress'? this.inProgress : this.closed 
                status = CLOSED;
            }else{
                 startList = this.dragInfo.name === 'inprogress'? this.inProgress : this.inProgress 
                 endList = event.detail.name === 'inprogress'? this.inProgress : this.inProgress 
                 this.isSameRows= true; 
                status = IN_PROGRESS;

            }
        }

 // Keep reference to the lists. Start and end lists may be the same list.
         if(this.dragInfo.name === 'completed'){
            if(event.detail.name === 'open'){
                startList = this.dragInfo.name ==='completed'? this.completed : this.open 
                endList = event.detail.name === 'completed'? this.completed : this.open 
                status = OPEN;
            }else if(event.detail.name === 'inprogress'){
                 startList = this.dragInfo.name === 'completed'? this.completed : this.inProgress
                 endList = event.detail.name === 'completed'? this.completed : this.inProgress
                 status = IN_PROGRESS;
            }else if(event.detail.name === 'test'){
                 startList = this.dragInfo.name === 'completed'? this.completed : this.test 
                 endList = event.detail.name === 'completed'? this.completed : this.test 
                 status = TEST;
            }else if(event.detail.name === 'closed'){
                 startList = this.dragInfo.name === 'completed'? this.completed : this.closed 
                 endList = event.detail.name === 'completed'? this.completed : this.closed 
                status = CLOSED;
            }else{
                 startList = this.dragInfo.name === 'completed'? this.completed : this.completed 
                 endList = event.detail.name === 'completed'? this.completed : this.completed 
                 this.isSameRows= true; 
                 status = COMPLETED;

            }
        }
 // Keep reference to the lists. Start and end lists may be the same list.
         if(this.dragInfo.name === 'test'){
            if(event.detail.name === 'open'){
                startList = this.dragInfo.name ==='test'? this.test : this.open 
                endList = event.detail.name === 'test'? this.test : this.open 
                status = OPEN;
            }else if(event.detail.name === 'inprogress'){
                 startList = this.dragInfo.name === 'test'? this.test : this.inProgress 
                 endList = event.detail.name === 'test'? this.test : this.inProgress 
                status = IN_PROGRESS;
            }else if(event.detail.name === 'completed'){
                 startList = this.dragInfo.name === 'test'? this.test : this.completed 
                 endList = event.detail.name === 'test'? this.test : this.completed 
                 status = COMPLETED;

            }else if(event.detail.name === 'closed'){
                 startList = this.dragInfo.name === 'test'? this.test : this.closed 
                 endList = event.detail.name === 'test'? this.test : this.closed 
                 status = CLOSED;
            }else{
                 startList = this.dragInfo.name === 'test'? this.test : this.test 
                 endList = event.detail.name === 'test'? this.test : this.test 
                 this.isSameRows= true; 
                status = TEST;

            }
        }
 // Keep reference to the lists. Start and end lists may be the same list.
         if(this.dragInfo.name === 'closed'){
            if(event.detail.name === 'open'){
                startList = this.dragInfo.name ==='closed'? this.closed : this.open 
                endList = event.detail.name === 'closed'? this.closed : this.open 
                status = OPEN;
            }else if(event.detail.name === 'inprogress'){
                 startList = this.dragInfo.name === 'closed'? this.closed : this.inProgress 
                 endList = event.detail.name === 'closed'? this.closed : this.inProgress 
                 status = IN_PROGRESS;
            }else if(event.detail.name === 'completed'){
                 startList = this.dragInfo.name === 'closed'? this.closed : this.completed 
                 endList = event.detail.name === 'closed'? this.closed : this.completed 
                 status = COMPLETED;

            }else if(event.detail.name === 'test'){
                 startList = this.dragInfo.name === 'closed'? this.closed : this.test 
                 endList = event.detail.name === 'closed'? this.closed : this.test 
                status = TEST;

            }else{
                 startList = this.dragInfo.name === 'closed'? this.closed : this.inProgress 
                 endList = event.detail.name === 'closed'? this.closed : this.inProgress 
                 this.isSameRows= true; 
                 status = CLOSED;

            }
        }

      
        // Indices for the items to move in their respective lists
        let startIndex = startList.selectedItems.findIndex(item => item.Id === this.dragInfo.id)
        let endIndex = endList.selectedItems.findIndex(item => item.Id === evtId);
        console.log('startIndex',startIndex);
        console.log('endIndex', endIndex);

        let startListClone = [...startList.selectedItems];
        let endListClone = [...endList.selectedItems];
        // Remove from old index, move to new index
        if(this.isSameRows) endListClone.splice(startIndex,1);
        endListClone.splice(endIndex,0,startListClone.splice(startIndex,1)[0]);
        startList.selectedItems =[...startListClone];
        endList.selectedItems =[...endListClone];
    
        update_task({Id: this.dragInfo.id , Status__c :status},this);
        this.isSameRows= false; 

    }

}