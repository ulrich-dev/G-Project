import { LightningElement,api } from 'lwc';
import { delete_task,toastEvent } from 'c/util_module';

export default class DragListContainer extends LightningElement {
  @api items;
  @api name;
  @api title;

   cancel(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  handleDragComplete(event) {
    // Fire custom event when drag stops
    const detail = { name: this.name, id: event.target.dataset?.id }
    console.log(detail)
    this.dispatchEvent(
      new CustomEvent(
        'endmove', 
        { detail }
      )
    )
  }
  // Fire custom event when drag starts
  handleDragStart(event) {
    const detail = { name: this.name, id: event.target.dataset?.id }
    this.dispatchEvent(
      new CustomEvent(
        'startmove', 
        { detail }
      )
    )
  }
  handleNewTask(){
     const evt = new CustomEvent('newtask', {detail: {
                                                        action : "newTask",
                                                        Id: '',    
                                                    }});
     this.dispatchEvent(evt);
  }
  deleteTask(event){
    let rep = delete_task(event.currentTarget.dataset.id);
    if(rep){
       this.ShowToastEvent('Inseted',"opperation successful","success")
    }
  }

}