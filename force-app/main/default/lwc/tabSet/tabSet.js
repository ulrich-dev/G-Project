import {track,wire,api, LightningElement } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { refresh_apex,dispash_event,toast_event } from 'c/util_module';

import retriveFeedItems from '@salesforce/apex/projectManagerCtl.retriveFeedItems';
import insertFeed from '@salesforce/apex/projectManagerCtl.insertFeed';
import inserComment from '@salesforce/apex/projectManagerCtl.inserComment';
import getFilesList from '@salesforce/apex/projectManagerCtl.getFilesList';
import getFileVersionDetails from '@salesforce/apex/projectManagerCtl.getFileVersionDetails';




const TAB_SELECTED_CLASS='slds-tabs_default__link slds-text-align_center selectedTab';
const TAB_UNSELECTED8CLASS ='slds-tabs_default__link slds-text-align_center';
const OPTION_SELECTEDCLASS ='slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline slds-is-selected';
const OPTION_UNSELECTEDCLASS ='slds-listbox__option slds-listbox__option_plain slds-media slds-media_small slds-media_inline ';
const columns = [
  { label: 'Name', fieldName: 'name' },
  { label: 'Type', fieldName: 'type' },
  { label: 'createdBy', fieldName: 'createdBy' },
  { label: 'createdDate', fieldName: 'createdDate' },
];
export default class TabSet extends LightningElement {
    data = [...Array(10)].map((_, index) => {
      return {
          name: `Name (${index})`,
          website: 'www.salesforce.com',
          amount: Math.floor(Math.random() * 100),
          phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          closeAt: new Date(
              Date.now() + 86400000 * Math.ceil(Math.random() * 20)
          ),
      };
    });
    columns = columns;

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
  feedItemDatas;
  recordId;
  selectedRows;

  @track
  feedItem
  @track
  isShowPostFields =false;
  @track
  labelBtn ="New Post";
  @track
  isShowPostComment =false;


  //retrive all comment 
@api
get task_id() {
    return this.recordId;
}
set task_id(value) {
  console.log('set record id');
    this.recordId = value;
}

// @wire(retriveFeedItems, { recordId: this.task_id })
// datas (result) {
//     this.feedItemDatas = result;
//     if (result.error) {
//         // TODO: Error handling
//     } else if (result.data) {
//         // TODO: Data handling
//         this.feedItem =[...result.data.map((item)=>{return {...item , ownerName: item.InsertedBy.Name ,profileName: item.InsertedBy.Profile.Name}})];

//     }
// }
@track param = '';
@track prop;
@track error;

connectedCallback() {
  retriveFeedItems({ recordId: this.recordId })
    .then(result => {
      console.log('Result', result);
      this.feedItem =[...result.map((item)=>{return {...item , ownerName: item.InsertedBy.Name ,profileName: item.InsertedBy.Profile.Name,comment_label :'More comments',comnt_size:item.FeedComments?.length,copyComments: item.FeedComments?.length? [item.FeedComments[0]] :[],is_hidem_comments : true ,isShowPostComment :false}})];
      // this.feedItem.forEach(element => {
      //   element.FeedComments =[...element.FeedComments.map((item)=>{return {...item,CreatedByName: item.CreatedBy.Name}})];
      // });
    })
    .catch(error => {
      console.error('Error:', error);
  });

  getFilesList({recordId :this.recordId,sObjt:'Task__c'})
    .then(result => {
      console.log('Result', result);
      this.data = [...result.map((item)=>{ return {...item,name:item.title,type : item.title.split('.')[1]} })];

    })
    .catch(error => {
      console.error('Error:', error);
  });
}

handleMoreComments(event){
  let feedId = event.currentTarget.dataset.id;
  this.feedItem =[...this.feedItem.map((element) => {
    return element.Id === feedId? {...element, is_hidem_comments :element.is_hidem_comments? false:true, comment_label: element.is_hidem_comments?"More comments" :"Hiden comments",copyComments: element.is_hidem_comments? [element.FeedComments[0]]:[...element.FeedComments]  }  : {...element}
  })];
  
}
  //refresh component
  apexRefresh(){
    console.log('apex refresh');
    refreshApex(this.feedItemDatas);

}

   // handle show post fields

   handleClick(){
    this.isShowPostFields = this.isShowPostFields? false: true;
    this.labelBtn = this.isShowPostFields? "Hiden fields": "New Post";
  
   }

   // handle post feed
   handlePostSave(){
      console.log("message for all");
      let massage = this.template.querySelector('[data-id="message"]').value;
      console.log("message for all",massage);
      //post in chatter
      insertFeed({ recordId: this.recordId, body: massage})
      .then(result => {
        console.log('Result', result);
        toast_event('Success!','Operation successfully','success',this);
        this.connectedCallback();
        this.isShowPostFields =false;
        this.labelBtn = this.isShowPostFields? "Hiden fields": "New Post";

      })
      .catch(error => {
        console.error('Error:', error);
    });
   }

   //handle save comment 
   handleShowCommentField(event){
    let feedId = event.currentTarget.dataset.id;
    this.feedItem =[...this.feedItem.map((item)=>{ return item.Id === feedId? {...item,isShowPostComment: item.isShowPostComment? false:true}:{...item} })]
      this.isShowPostComment =this.isShowPostComment?false :true ;
   }
   //save post feed comment 
   handleCommentSave(event){
    console.log("handle save comment ");
    let massage = this.template.querySelector('[data-id="comment"]').value;
    let parentId = event.currentTarget.name;
    inserComment({ recordId: parentId, body: massage})
    .then(result => {
      console.log('Result', result);
      toast_event('Success!','Operation successfully','success',this);
      this.connectedCallback();
      this.isShowPostComment =false;
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

    //handle selected row 
    handleSelectedRow(event){
      this.selectedRows = event.detail.selectedRows;

    }

    //handle download file
    handleDownload(){
      console.log('selected row', this.selectedRows);

      if(this.selectedRows.length >0){
        this.selectedRows.forEach(element => {
          getFileVersionDetails({fileId:element.id})
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
        });
       
      }
    }
 
}