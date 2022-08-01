import { track,api,wire,LightningElement } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import getTask from '@salesforce/apex/projectManagerCtl.getTask';
import getTaskPicklist from '@salesforce/apex/projectManagerCtl.getTaskPicklist';
import getFilesList from '@salesforce/apex/projectManagerCtl.getFilesList';

export default class MainCmp extends LightningElement {

    @api height;
    @api recordId;

    @track activeMenu="liste";
    @track isNewTask=false;
    @track isNewResource=false;
    @track tasks
    @track allrss
    @track assTask
    @track wiredTaskList =[]
    @track taskId='';
    @track isdetailCmp;
    @track documents;


    project={name:''};
    title
    options=[];
    resId ='';
   

    @wire(getTask, { recordId: '$recordId' })
    wiredData(result) {
    this.wiredTaskList = result;
      if (result.data) {
        console.log('Data', result.data);
        this.project = result.data.p;
        this.tasks =result.data.Tasks;
        this.assTask = result.data.assTask;
        //all ressourcies
        this.allrss = result.data.allrss;
      } else if (result.error) {
         console.error('Error:', result.error);
      }
    }

    @wire(getTaskPicklist)
    picklistVal({ error, data }) {
      if (data) {
        this.options = [... data.map(item =>({label:item ,value: item}))];
      } else if (error) {
        console.error('Error:', error);
      }
    }

    @wire(getFilesList, {recordId :'a027Q000003QtG3QAK'})
    document ({error, data}) {
        if (error) {
            // TODO: Error handling
        } else if (data) {
            // TODO: Data handling
            console.log('@@@@§/document Ids',data);
            this.documents = data;
        }
    }

    handleactivemenu(event){
        this.activeMenu = event.detail._active_menu;
    }

    
    handleOpenDetail(event){
        this.isdetailCmp= this.isdetailCmp? false:true ;
    }

    handleNewTask(event){
        console.log("newtask in main component ");
        let _active_menu = event.detail.action;
        if(_active_menu ==='newtask'){
            this.resId = event.detail.Id;
            this.title ="New Task";
        }
        if(_active_menu ==='edittask'){
            this.taskId =event.detail?.Id;
            this.title ="Edit Task";    
        } 
        this.isNewTask = _active_menu != ""?true : false;

    }

    newTask

    handleNewResource(event){
        let _active_menu = event.detail;
        console.log("newresource in main component ");
        this.isNewResource = _active_menu === "newResource"?true : false;
        this.title ="New Resource";
        
    }

    closeModal(){
        this.isNewTask =false;
        this.isNewResource =false;
    }

    //refresh component
    apexRefresh(){
        console.log('apex refresh');
        refreshApex(this.wiredTaskList);

    }

    get newTaskItems(){
        let taskRecord;
        console.log("find task");
        if(this.taskId){ 
                taskRecord = this.tasks.filter(item => {
                return item.Id == this.taskId;
            })[0];
        }
            return [
            
            {
                picklist :false,
                textarea :false,
                helpText :'project name',
                placeholder :'project',
                name :this.project.Id,
                type :'text',
                required :true,
                label :'Project',
                value : this.project.Name,
                max :14,
                maxlength :155,
            },
            {
                picklist :false,
                textarea :false,
                helpText :'Name',
                name : taskRecord? taskRecord.Id : '',
                placeholder :'Task Name',
                PhoneNumber :'tel',
                type :'text',
                required :true,
                label :'Name',
                value : taskRecord? taskRecord.Name : '',
                max :15,
                maxlength :30,
            },

              {
                picklist :false,
                textarea :false,
                helpText :'Start date',
                name :'Startdate',
                placeholder :'Start date',
                type :'date',
                required :true,
                label :'Start date',
                value : taskRecord? taskRecord.Start_date__c : '',
            },

              {
                picklist :false,
                textarea :false,
                helpText :'End date',
                name :'End date',
                placeholder :'End date',
                PhoneNumber :'',
                type :'date',
                required :true,
                label :'End date',
                value : taskRecord? taskRecord.End_date__c : '',
            },

             {
                picklist :true,
                textarea :false,
                helpText :'enter the status',
                placeholder :'status',
                name :'status',
                Email :'status',
                type :'text',
                required :true,
                label :'Status',
                options: this.options,
                value : taskRecord? taskRecord.Status__c : '',
                max :15,
                maxlength :30,
            },
            
            {
                picklist :true,
                textarea :false,
                helpText :'Resource',
                placeholder :'Resource',
                name :'Resource',
                Email :'email',
                type :'Email',
                required :true,
                label :'Resource',
                options: [...this.allrss.map(item =>({ label:item.Name ,value:item.Id}))],
                value : this.resId !=''? this.allrss.filter(item => { return item.Id == this.resId; })[0].Id :taskRecord? taskRecord.Ressource__c : '',
                max :15,
                maxlength :30,
            },
              {
                picklist :false,
                textarea :true,
                helpText :'Description',
                placeholder :'description',
                name : 'description',
                Lastname :'',
                type :'text',
                required :true,
                label :'Description',
                value : taskRecord? taskRecord.Description__c : '',
                max :14,
                maxlength :155,
            }
            ] ;

            this.resId ='';
    
}

    get newResourceItems(){
        return  [
            
            {
                picklist :false,
                textarea :false,
                helpText :'firstName',
                placeholder :'first Name',
                name :'firstName',
                type :'text',
                required :true,
                label :'First Name',
                value : '',
                max :14,
                maxlength :155,
            },
            {
                picklist :false,
                textarea :false,
                helpText :'last name',
                placeholder :'last Name',
                FirstName:' first name',
                name :'lastName',
                type :'text',
                required :true,
                label :'Last Name',
                value :'',
                max :14,
                maxlength :155,
            },
            {
                picklist :false,
                textarea :false,
                helpText :'phone number',
                placeholder :'phone number',
                name :'text',
                Hiringdate :'tel',
                type :'text',
                required :true,
                label :'Phone Number',
                max :15,
                maxlength :30,
            },
            {
                picklist :false,
                textarea :false,
                helpText :'enter the email address',
                placeholder :'email',
                Email :'',
                name :'email',
                type :'text',
                required :true,
                label :'Email',
                max :15,
                maxlength :30,
            }
            ];
    }
}