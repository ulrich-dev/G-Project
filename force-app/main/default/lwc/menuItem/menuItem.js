import { track,api,LightningElement} from 'lwc';

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

//this function is use to fire the name of active block
handleClick(event){
    console.log("displach class");
    let _active_menu =event.currentTarget.dataset.id;
    const evt = new CustomEvent('handleactivemenu', {detail: {_active_menu : _active_menu}});
    this.dispatchEvent(evt);
}

//this function is use to fire new event action 
handleNewTask(){
    const evt = new CustomEvent('newtask', {detail: "newTask"});
    this.dispatchEvent(evt);
}

handleNewResource(event){
    event.stopPropagation();
    const evt = new CustomEvent('newresource', {detail: "newResource"});
    this.dispatchEvent(evt);
}




}