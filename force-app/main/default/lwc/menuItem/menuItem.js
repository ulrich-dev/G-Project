import { track,api,LightningElement} from 'lwc';
import { delete_task,refresh_apex,dispash_event,toast_event } from 'c/util_module';
import getFileVersionDetails from '@salesforce/apex/projectManagerCtl.getFileVersionDetails';


export default class MenuItem extends LightningElement {
item;
@api
get menuitem() {
    return this.menuItem;
}
set menuitem(item) {
    this.item = item;
}

get bgColor(){
    if(this.item.classstyle && this.item.isActive){
        return "title-menu selected";
    }
    return "title-menu";
}

get isResource(){
    return this.item.isResource;
}

get isDocument(){
    return this.item.isDocument;
}

//this function is use to fire the name of active block
handleClick(event){
    console.log("displach class");
    let _active_menu =event.currentTarget.dataset.id;
    const evt = new CustomEvent('handleactivemenu', {detail: {_active_menu : _active_menu}});
    this.dispatchEvent(evt);
}

//this function is use to fire new event action 
handleNewTask(event){
    let resId= event.currentTarget.dataset.id;
    dispash_event('task_event',this,{action:'newtask',Id :resId});
}

handleNewResource(event){
    event.stopPropagation();
    const evt = new CustomEvent('newresource', {detail: "newResource"});
    this.dispatchEvent(evt);
}

//handle show details commponent
handleShowDetails(event){
    event.stopPropagation();
    console.log('@@@ handleShowDetails',event.currentTarget.dataset.id);
    const evt = new CustomEvent('showdetails', {detail : event.currentTarget.dataset.id });
    this.dispatchEvent(evt);

}


handleMenuFile(event){
    console.log('file content',event.currentTarget.dataset.id);
    getFileVersionDetails({fileId: event.currentTarget.dataset.id})
    .then(result => {
        console.log('file content',result);
        const a = document.createElement('a');
          a.style.display = 'none';
          a.href = result.ContentDownloadUrl;
          // the filename you want
          a.download = result.Title;
          document.body.appendChild(a);
          a.click();
    })
    .catch(error => {
        // TODO Error handling
    });
}

}