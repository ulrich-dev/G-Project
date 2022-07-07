import { api,wire,track, LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DynamicForm extends LightningElement {
    @api inputsItems=[];
    @api title;
    @api campohelptext;
    @track optionCampo=[];
    isSpinner;
    titleHelpInfo='Help Online';
    
    @track optionServizio;
//     @wire (getPickListHelpOptions)
//    picklistHelpValues;


    @api save(){
        const isvalid =this.validateFields(); 
         let output={};
        let outputs=[];
        if (isvalid) {
            let self=this;
            this.inputsItems.forEach(function(item){
                const key=item.name;
                const cmp=self.template.querySelector(`[data-id="${key}"]`);
                if (cmp) {
                     output[key]=cmp.value;
                    if (item.type==='datetime') {
                        try {
                            let dateTimevalue=cmp.value;
                            let datevalue=dateTimevalue? new Date(dateTimevalue).toLocaleDateString() :'';
                            let datelabel=item.label?  item.label.replace('/','').replace('ora','').replace('hour','') :' Date';
                            let timevalue=dateTimevalue? new Date(dateTimevalue).toLocaleTimeString() :'';
                            let timelabel=item.label?  item.label.replace('/','').replace('Data','').replace('Date','') :' Time';

                            outputs.push({label:datelabel,name:key+'d',value:datevalue});
                            outputs.push({label:timelabel,name:key+'t',value:timevalue});
                        } catch (error) {
                            console.log('OUTPUT  : Error while spliting date time output ',error);
                            outputs.push({label:item.label,name:key,value:cmp.value});
                        }
                        
                    }else{
                        outputs.push({label:item.label,name:key,value:cmp.value});
                    }
                }
            });
        }
        // console.log('OUTPUT VALUE : ',output);
        console.log('OUTPUTS VALUES : ',outputs);
        // add to manage insert helpInfo
        return {isvalid,outputs};
    
    }
    

    handleChange(event) {
        const value = event.detail.value;
        console.log('OUTPUT : ',value);
        if(event.currentTarget.name ==='contactName'){
            let eventToFire = new CustomEvent('contactchange',
            {detail :event.detail.value}
           )
            this.dispatchEvent(eventToFire);    
        }else{
            let eventToFire = new CustomEvent('projectchange',
                                 {detail :event.detail.value}
                             )
            this.dispatchEvent(eventToFire);    

        }
                                  
       
    }
    @api validateFields() {
        console.log('start verification');   
        let isvalid = true;
        let self=this;
        this.inputsItems.forEach(function(item){
            let key=item.name;
            let cmp=self.template.querySelector(`[data-id="${key}"]`);
            if (cmp) {
                isvalid = isvalid && cmp.reportValidity('');
                console.log('@@@@@@@@@@ isvalid loop '+isvalid);
                // if(!cmp.reportValidity('')) {
                //     isvalid = false;
                // }
            }
        });
        // console.log('>>>>>> inputsItems ',this.inputsItems);
       console.log('@@@@@@@@@@ isvalid '+isvalid);
       return isvalid;
   }
   dispatchToastEvent(title, messsage, variant) {
    const event = new ShowToastEvent({
        title: title,
        message: messsage,
        variant: variant,
    });
    this.dispatchEvent(event);
}



}