import { track,api,LightningElement } from 'lwc';
import logo from '@salesforce/resourceUrl/beonelogos';
import { delete_task,refresh_apex,dispash_event,toast_event } from 'c/util_module';






export default class NavBarMenu extends LightningElement {
    @track
    url = logo +'.png';
    doc;
    isTaskDetailCmp = false;
    selectedTask;

    @api
    get documents() {
        return this.doc;
    }
    set documents(value) {
        if(value){
            this.items.forEach(element => {
                if(element.name === 'Documents'){
                        element.subItem =[...value.map(item =>({...item,
                                                label:item.title,
                                                name:item.id,
                                                icon_name: 'utility:download'
                                            }))];
                }
            });
        }
    }
    get geturl(){
        console.log('url',this.url);
        return this.url;
    }

    @api
    get allrss() {
        return this.allrss;
        
    }
    set allrss(value) {
        if(value){
                this.items.forEach(element => {
                    if(element.name === 'Resources'){
                            element.subItem =[...value.map(item =>({...item,
                                                    label:item.Name,
                                                    name:item.Id
                                                }))];
                    }
                });
        }
    }


    @api
    get favorite_task() {
        return this.favorite_task;
    }
    set favorite_task(value) {
        if(value){
            this.items.forEach(element => {
                if(element.name === 'Favoris'){
                        element.subItem =[...value.map(item =>({...item,
                                                label:item.Name,
                                                name:item.Id
                                            }))].filter((item)=>item.flag_favorie__c);
                }
            });
        }
    }

   @track 
   items =[
                {
                    name : "Favoris",
                    title : "Favoris",
                    isActive :false,
                    incon_name: "utility:chevronright",
                    isResource:false,
                    isDocument:false,
                    subItem : [
                            {
                                label:"Favoris",
                                name:""
                            },
                            {
                                 label:"Favoris",
                                 name:""
                            }
                    ]
                },
                {
                    name : "Resources",
                    title : "Resources",
                    isActive :false,
                    incon_name: "utility:chevronright",
                    isResource:true,
                    isDocument:false,
                    subItem : [
                            {
                                 label:"Favoris",
                                 name:""
                            },
                            {
                                 label:"Favoris",
                                 name:"" 
                            }
                    ]

                },
                {
                    name : "Documents",
                    title : "Documents",
                    isActive :false,
                    incon_name: "utility:chevronright",
                    isResource:false,
                    isDocument:true,
                    subItem : [
                            {
                                label:"Favoris",
                                name:""
                            },
                            {
                                label:"Favoris",
                                name:""
                            }
                    ]

                }
            ];


            handleclick(event){
                console.log('event detail',event.detail._active_menu);
                let _active_menu = event.detail._active_menu;
                this.items = [... this.items.map(item => {
                    if(item.name === _active_menu && !item.isActive){
                        item.isActive =true;
                        item.incon_name="utility:chevrondown";
                        item.classstyle ="selected" ;
                    }else if(item.name === _active_menu && item.isActive){
                        item.isActive =false;
                        item.incon_name="utility:chevronright";
                    }
                    if(item.name !== _active_menu && item.isActive){
                        item.isActive =false;
                        item.incon_name="utility:chevronright";
                    }
                    return item;
                })];

                console.log("after modification", this.items);
            }


            handleNewTask(event){
               dispash_event('task_event',this,event.detail);
            }

            handleNewResource(event){
                let _active_menu = event.detail;
                const evt = new CustomEvent('newresource', {detail: _active_menu});
                this.dispatchEvent(evt);
            }


          
            //open show details commponent 
            showTaskDerails(event){
                console.log('@@@selected task id',event.detail);
                this.items[0].subItem.forEach(item => {
                    if(item.name === event.detail){
                         this.selectedTask = item;
                         this.isTaskDetailCmp =true;
                    }
            });
           
            }

        
            closeTaskDetailCmp(event){
                this.isTaskDetailCmp =false;
            }

            
}