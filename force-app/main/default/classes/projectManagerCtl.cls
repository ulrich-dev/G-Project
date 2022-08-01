public with sharing class projectManagerCtl {
  
    //this method is use to retrive all datas releted to the project 
    @AuraEnabled(cacheable=true)
    public static Map<String,Object> getTask(String recordId){
        try {
            Projet__c p;
            List<Ressource__c> rss = new List<Ressource__c>();
            List<Assigne_ressource__c> assTask= new List<Assigne_ressource__c>();
            Set<String> resourceIds = new Set<String>(); 
            Map<Id,Task__c> Tasks; 
            p =  [SELECT id,name FROM Projet__c WHERE id =:recordId];
            Tasks = new Map<Id,Task__c>([SELECT Id,Name, Projet__c,Ressource__c, Status__c,Description__c, Priority__c,Ressource__r.Name, Commentaire__c, Due_Time__c , Start_date__c, End_date__c FROM Task__c WHERE Projet__c =: p.id]);
            assTask = [SELECT id, task__c,Ressource__c,Ressource__r.Name  FROM Assigne_ressource__c WHERE task__c IN : Tasks.keySet()];
            rss =[SELECT id, Prenom__c,Name , Hiring_date__c, Phone__c, Email__c FROM Ressource__c ORDER BY CreatedDate];
           
            return new Map<String,Object>{'p'=>p,'Tasks'=>Tasks.values(),'assTask'=>assTask,'allrss'=>rss};
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<FeedItem> retriveFeedItems(String recordId){
        try {
            System.debug('record id '+recordId);
            return [select Id, ParentId,insertedby.name,insertedby.profile.name,createdDate,body,(select id,CommentBody from FeedComments) IsClosed, Status from FeedItem WHERE ParentId =: recordId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }

     /*
    *************************************************************************************************************
    * Below method is issed to get the picklist value.
    *************************************************************************************************************
    */
    @AuraEnabled(cacheable=true)
    public static List<String> getTaskPicklist()
    {
        List<String> pickListValuesList= new List<String>();
		Schema.DescribeFieldResult fieldResult = Task__c.Status__c.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
		for( Schema.PicklistEntry pickListVal : ple){
			pickListValuesList.add(pickListVal.getLabel());
		}     
		return pickListValuesList;
    }

    @AuraEnabled
    public static Id createContentDocLink(Id contentVersionId, Id recordId) {
        Id docId = [SELECT ContentDocumentId FROM ContentVersion WHERE Id = :contentVersionId].ContentDocumentId;
        insert new ContentDocumentLink(ContentDocumentId = docId, LinkedEntityId = recordId);
        return docId;
    }


    @AuraEnabled(cacheable=true)
    public static FilesWrapper[] getFilesList(Id recordId) {
        FilesWrapper[] filesList = new List<FilesWrapper>{};
            for (ContentDocumentLink link : [
                SELECT
                ContentDocumentId,
                ContentDocument.LatestPublishedVersion.Title,
                ContentDocument.LatestPublishedVersion.CreatedDate,
                ContentDocument.LatestPublishedVersion.CreatedBy.Name
                FROM ContentDocumentLink
                WHERE LinkedEntityId = :recordId
            ]) {
                filesList.add(
                    new FilesWrapper(
                        link.ContentDocumentId,
                        link.ContentDocument.LatestPublishedVersion.Title,
                        link.ContentDocument.LatestPublishedVersion.CreatedBy.Name,
                        Date.valueOf(link.ContentDocument.LatestPublishedVersion.CreatedDate),
                        link.ContentDocument.LatestPublishedVersionId
                    )
                );
            }
        return filesList;
    } 
    
    @AuraEnabled
    public static FileVersionWrapper[] getFileVersionDetails(Id fileId) {
        FileVersionWrapper[] contentversions = new List<FileVersionWrapper>{};
            for (ContentVersion cv : [SELECT id,title,contenturl,createddate, createdby.name, ReasonForChange FROM ContentVersion WHERE ContentDocumentId = :fileId]) {
                contentVersions.add(new FileVersionWrapper(cv.id, cv.title, cv.createdby.name, Date.valueOf(cv.createddate), cv.ReasonForChange,cv.contenturl));
            }
        return contentVersions;
    } 
    
     public virtual class File{
        @AuraEnabled
        public String id { get; set; }
        @AuraEnabled
        public String title { get; set; }
        @AuraEnabled
        public String createdBy { get; set; }
        @AuraEnabled
        public Date createdDate { get; set; }
        public File(String id, String title, String createdBy, Date createdDate) {
            this.id = id;
            this.title = title;
            this.createdBy = createdBy;
            this.createdDate = createdDate;
        }
    }

    public class FilesWrapper extends File{
        @AuraEnabled
        public String latestVersionId { get; set; }
        
        public FilesWrapper(String id, String title, String createdBy, Date createdDate, String latestVersionId) {
           	super(id, title, createdBy, createdDate);
            this.latestVersionId = latestVersionId;
        }
    }

    public class FileVersionWrapper extends File{
        @AuraEnabled
     public String reasonForChange { get; set; }
     @AuraEnabled
     public String contentUrl { get; set; }
     public FileVersionWrapper(String id, String title, String createdBy, Date createdDate, String reasonForChange,string contentUrl) {
            super(id, title, createdBy, createdDate);
         this.reasonForChange = reasonForChange;
         this.contentUrl=contentUrl;
     }
 } 
}