import { LightningElement,track,api } from 'lwc';

const IN_PROGRESS ="In Progress";
const OPEN ="Open";
const COMPLETED ="Completed";
const TEST ="Test";
const CLOSED ="Closed";
export default class TabView extends LightningElement {


@api
get tasks() {
    return this.tasks;
}
set tasks(tasksList) {
    console.log("tasksList",JSON.stringify(tasksList));
    if(tasksList){
        this.open.selectedItems= [];
        this.inProgress.selectedItems= [];
        this.completed.selectedItems= [];
        this.test.selectedItems= [];
        this.closed.selectedItems= [];
         tasksList.forEach(tasks => {
        if(tasks.Status__c === OPEN) this.open.selectedItems.push({...tasks, iconName :"open"});
        if(tasks.Status__c === IN_PROGRESS) this.inProgress.selectedItems.push({...tasks, iconName :"inProgress"});
        if(tasks.Status__c === COMPLETED) this.completed.selectedItems.push({...tasks, iconName :"completed"});
        if(tasks.Status__c === TEST) this.test.selectedItems.push({...tasks, iconName :"test"});
        if(tasks.Status__c === CLOSED) this.closed.selectedItems.push({...tasks, iconName :"closed"});
        
        });

     
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

    

    handleDragComplete(event) {
        // Keep reference to the lists. Start and end lists may be the same list.
        let startList;
        let endList;
        if(this.dragInfo.name === 'open'){
            if(event.detail.name === 'completed'){
                startList = this.dragInfo.name === 'open'? this.open.selectedItems: this.completed.selectedItems
                endList = event.detail.name === 'open'? this.open.selectedItems: this.completed.selectedItems
            }else if(event.detail.name === 'test'){
                 startList = this.dragInfo.name === 'open'? this.open.selectedItems: this.test.selectedItems
                 endList = event.detail.name === 'open'? this.open.selectedItems: this.test.selectedItems
            }else if(event.detail.name === 'closed'){
                 startList = this.dragInfo.name === 'open'? this.open.selectedItems: this.closed.selectedItems
                 endList = event.detail.name === 'open'? this.open.selectedItems: this.closed.selectedItems
            }else{
                startList = this.dragInfo.name === 'open'? this.open.selectedItems: this.inProgress.selectedItems
                endList = event.detail.name === 'open'? this.open.selectedItems: this.inProgress.selectedItems
            }
        }
 // Keep reference to the lists. Start and end lists may be the same list.
        if(this.dragInfo.name === 'inprogress'){
            console.log("inprogress");
            if(event.detail.name === 'open'){
                startList = this.dragInfo.name ==='inprogress'? this.inProgress.selectedItems: this.open.selectedItems
                endList = event.detail.name === 'inprogress'? this.inProgress.selectedItems: this.open.selectedItems
            }else if(event.detail.name === 'completed'){
                 startList = this.dragInfo.name === 'inprogress'? this.inProgress.selectedItems: this.completed.selectedItems
                 endList = event.detail.name === 'inprogress'? this.inProgress.selectedItems: this.completed.selectedItems
            }else if(event.detail.name === 'test'){
                 startList = this.dragInfo.name === 'inprogress'? this.inProgress.selectedItems: this.test.selectedItems
                 endList = event.detail.name === 'inprogress'? this.inProgress.selectedItems: this.test.selectedItems
            }else if(event.detail.name === 'closed'){
                 startList = this.dragInfo.name === 'inprogress'? this.inProgress.selectedItems: this.closed.selectedItems
                 endList = event.detail.name === 'inprogress'? this.inProgress.selectedItems: this.closed.selectedItems
            }else{
                 startList = this.dragInfo.name === 'inprogress'? this.inProgress.selectedItems: this.inProgress.selectedItems
                 endList = event.detail.name === 'inprogress'? this.inProgress.selectedItems: this.inProgress.selectedItems
            }
        }

 // Keep reference to the lists. Start and end lists may be the same list.
         if(this.dragInfo.name === 'completed'){
            if(event.detail.name === 'open'){
                startList = this.dragInfo.name ==='completed'? this.completed.selectedItems: this.open.selectedItems
                endList = event.detail.name === 'completed'? this.completed.selectedItems: this.open.selectedItems
            }else if(event.detail.name === 'inprogress'){
                 startList = this.dragInfo.name === 'completed'? this.completed.selectedItems: this.inProgress.selectedItems
                 endList = event.detail.name === 'completed'? this.completed.selectedItems: this.inProgress.selectedItems
            }else if(event.detail.name === 'test'){
                 startList = this.dragInfo.name === 'completed'? this.completed.selectedItems: this.test.selectedItems
                 endList = event.detail.name === 'completed'? this.completed.selectedItems: this.test.selectedItems
            }else if(event.detail.name === 'closed'){
                 startList = this.dragInfo.name === 'completed'? this.completed.selectedItems: this.closed.selectedItems
                 endList = event.detail.name === 'completed'? this.completed.selectedItems: this.closed.selectedItems
            }else{
                 startList = this.dragInfo.name === 'completed'? this.completed.selectedItems: this.completed.selectedItems
                 endList = event.detail.name === 'completed'? this.completed.selectedItems: this.completed.selectedItems
            }
        }
 // Keep reference to the lists. Start and end lists may be the same list.
         if(this.dragInfo.name === 'test'){
            if(event.detail.name === 'open'){
                startList = this.dragInfo.name ==='test'? this.test.selectedItems: this.open.selectedItems
                endList = event.detail.name === 'test'? this.test.selectedItems: this.open.selectedItems
            }else if(event.detail.name === 'inprogress'){
                 startList = this.dragInfo.name === 'test'? this.test.selectedItems: this.inProgress.selectedItems
                 endList = event.detail.name === 'test'? this.test.selectedItems: this.inProgress.selectedItems
            }else if(event.detail.name === 'completed'){
                 startList = this.dragInfo.name === 'test'? this.test.selectedItems: this.completed.selectedItems
                 endList = event.detail.name === 'test'? this.test.selectedItems: this.completed.selectedItems
            }else if(event.detail.name === 'closed'){
                 startList = this.dragInfo.name === 'test'? this.test.selectedItems: this.closed.selectedItems
                 endList = event.detail.name === 'test'? this.test.selectedItems: this.closed.selectedItems
            }else{
                 startList = this.dragInfo.name === 'test'? this.test.selectedItems: this.test.selectedItems
                 endList = event.detail.name === 'test'? this.test.selectedItems: this.test.selectedItems
            }
        }
 // Keep reference to the lists. Start and end lists may be the same list.
         if(this.dragInfo.name === 'closed'){
            if(event.detail.name === 'open'){
                startList = this.dragInfo.name ==='closed'? this.closed.selectedItems: this.open.selectedItems
                endList = event.detail.name === 'closed'? this.closed.selectedItems: this.open.selectedItems
            }else if(event.detail.name === 'inprogress'){
                 startList = this.dragInfo.name === 'closed'? this.closed.selectedItems: this.inProgress.selectedItems
                 endList = event.detail.name === 'closed'? this.closed.selectedItems: this.inProgress.selectedItems
            }else if(event.detail.name === 'completed'){
                 startList = this.dragInfo.name === 'closed'? this.closed.selectedItems: this.completed.selectedItems
                 endList = event.detail.name === 'closed'? this.closed.selectedItems: this.completed.selectedItems
            }else if(event.detail.name === 'test'){
                 startList = this.dragInfo.name === 'closed'? this.closed.selectedItems: this.test.selectedItems
                 endList = event.detail.name === 'closed'? this.closed.selectedItems: this.test.selectedItems
            }else{
                 startList = this.dragInfo.name === 'closed'? this.closed.selectedItems: this.inProgress.selectedItems
                 endList = event.detail.name === 'closed'? this.closed.selectedItems: this.inProgress.selectedItems
            }
        }
      
        // Indices for the items to move in their respective lists
        let startIndex = startList.findIndex(item => item.id === this.dragInfo.id)
        let endIndex = endList.findIndex(item => item.id === event.detail.id)
        // Remove from old index, move to new index
        endList.splice(endIndex, 0, startList.splice(startIndex, 1)[0])
        // Trigger a render cycle on copy. You could also use @track.
        this.open.selectedItems = [...this.open.selectedItems]
        this.inProgress.selectedItems = [...this.inProgress.selectedItems]

   
    }

}