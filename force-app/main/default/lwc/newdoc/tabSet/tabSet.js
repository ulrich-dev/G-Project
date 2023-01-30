import {track,wire,api, LightningElement } from 'lwc';
import retriveFeedItems from '@salesforce/apex/projectManagerCtl.retriveFeedItems';

const TAB_SELECTED_CLASS='slds-tabs_default__link slds-text-align_center selectedTab';
const TAB_UNSELECTED8CLASS ='slds-tabs_default__link slds-text-align_center';
const OPTION_SELECTEDCLASS ='slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline slds-is-selected';
const OPTION_UNSELECTEDCLASS ='slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline ';

export default class TabSet extends LightningElement {
  options =[{'value':'option 1','selecdOptionStyle':OPTION_UNSELECTEDCLASS},{ 'value':'option 2','selecdOptionStyle':OPTION_UNSELECTEDCLASS}];
  selectedOptions=[];
  selectedValues=[];
  selectedTab = TAB_SELECTED_CLASS;
  selectedTab21 =TAB_UNSELECTED8CLASS;
  selecdOptionStyle=OPTION_UNSELECTEDCLASS;
  hideContent =true;
  isSelected =false;
  hideEsportaBox=false;
  currentTab ="tab1";
  recordId;

  @track
  feedItem

  //retrive all comment 
@api
get task_id() {
    return this.recordId;
}
set task_id(value) {
    this.recordId = value;
    retriveFeedItems({ recordId: value })
    .then(result => {
      console.log('Result feedItem', result);
        this.feedItem =[...result.map((item)=>{return {...item , ownerName: item.InsertedBy.Name ,profileName: item.InsertedBy.Profile.Name}})];
    })
    .catch(error => {
      console.error('Error:', error);
  });
}



   //control tab
    handleTab(event){
        this.currentTab =event.currentTarget.name;
         if(this.currentTab == "tab1"){debugger
             this.selectedTab=TAB_SELECTED_CLASS;
             this.selectedTab21=TAB_UNSELECTED8CLASS;
             this.hideContent =true;

           }else{
            this.selectedTab21=TAB_SELECTED_CLASS;
            this.selectedTab=TAB_UNSELECTED8CLASS;
            this.hideContent =false;
           }
           //close Esporta csv
           this.hideEsportaBox=false;
    }
 
}
