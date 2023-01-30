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
            Tasks = new Map<Id,Task__c>([SELECT Id,Name, Projet__c,Ressource__c,flag_favorie__c, Status__c,Description__c, Priority__c,Ressource__r.Name, Commentaire__c, Due_Time__c , Start_date__c, End_date__c FROM Task__c WHERE Projet__c =: p.id]);
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
            return [select Id,ParentId,insertedby.name,insertedby.profile.name,createdDate,body,(select id,CommentBody,CreatedBy.Name from FeedComments) IsClosed, Status from FeedItem WHERE ParentId =: recordId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        
    }

    @AuraEnabled
    public static void insertFeed(String recordId, String body){
        try {
            insert new FeedItem(
                            ParentId = recordId,
                            body =body 
                            );
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    // post comment
    @AuraEnabled
    public static void inserComment(String recordId, String body){
        try {
            insert new FeedComment(
                FeedItemId=recordId,
                CommentBody=body
            );
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
        ContentVersion cv =  [SELECT ContentDocumentId,Title FROM ContentVersion WHERE Id = :contentVersionId limit 1];
        Id docId = cv.ContentDocumentId;
        insert new ContentDocumentLink(ContentDocumentId = docId, LinkedEntityId = recordId);
        createContenDistribution(contentVersionId,cv.Title);
        return docId;
    }

    public static void createContenDistribution(Id contentVersionId,String title){
        ContentDistribution cd = new ContentDistribution();
            cd.Name = title;
            cd.ContentVersionId = contentVersionId;
            cd.PreferencesAllowViewInBrowser= true;
            cd.PreferencesLinkLatestVersion=true;
            cd.PreferencesNotifyOnVisit=false;
            cd.PreferencesPasswordRequired=false;
            cd.PreferencesAllowOriginalDownload= true;
        insert cd;
    }


    @AuraEnabled(cacheable=true)
    public static FilesWrapper[] getFilesList(Id recordId,String sObjt) {
        if(sObjt.contains('project__c')){
            // retrive related tasks to project
                Map<String,Task__c> reletedTasks = new Map<String,Task__c>([SELECT id,Projet__c  FROM Task__c WHERE Projet__c =: recordId]);
                FilesWrapper[] filesList = new List<FilesWrapper>{};
                for (ContentDocumentLink link : [
                    SELECT
                    ContentDocumentId,
                    ContentDocument.LatestPublishedVersion.Title,
                    ContentDocument.LatestPublishedVersion.CreatedDate,
                    ContentDocument.LatestPublishedVersion.CreatedBy.Name
                    FROM ContentDocumentLink
                    WHERE LinkedEntityId = : reletedTasks.keySet() order By ContentDocument.LatestPublishedVersion.CreatedDate desc limit 5
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

            }else{
            FilesWrapper[] filesList = new List<FilesWrapper>{};
            for (ContentDocumentLink link : [
                SELECT
                ContentDocumentId,
                ContentDocument.LatestPublishedVersion.Title,
                ContentDocument.LatestPublishedVersion.CreatedDate,
                ContentDocument.LatestPublishedVersion.CreatedBy.Name
                FROM ContentDocumentLink
                WHERE LinkedEntityId = :recordId order By ContentDocument.LatestPublishedVersion.CreatedDate desc limit 5
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
       
    } 
    
    @AuraEnabled
    public static ContentDistribution getFileVersionDetails(Id fileId) {
        FileVersionWrapper[] contentversions = new List<FileVersionWrapper>{};
            for (ContentVersion cv : [SELECT id,title,contenturl,createddate, createdby.name, ReasonForChange,VersionData FROM ContentVersion WHERE ContentDocumentId = :fileId]) {
                contentVersions.add(new FileVersionWrapper(cv.id, cv.title, cv.createdby.name, Date.valueOf(cv.createddate), cv.ReasonForChange,cv.VersionData));
            }
        ContentDistribution cd = [select Id,name,ContentDownloadUrl,ContentVersionId, PdfDownloadUrl from ContentDistribution where ContentVersionId =: contentVersions[0].Id limit 1];
        system.debug('@@@@contend distribution'+cd);
        return cd;
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
     public blob contentUrl { get; set; }
     public FileVersionWrapper(String id, String title, String createdBy, Date createdDate, String reasonForChange,blob contentUrl) {
            super(id, title, createdBy, createdDate);
         this.reasonForChange = reasonForChange;
         this.contentUrl=contentUrl;
     }
 } 

 
}