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
            Tasks = new Map<Id,Task__c>([SELECT Id,Name, Projet__c, Status__c, Priority__c, Commentaire__c, Due_Time__c , Start_date__c, End_date__c FROM Task__c WHERE Projet__c =: p.id]);
            assTask = [SELECT id, task__c,Ressource__c  FROM Assigne_ressource__c WHERE task__c IN : Tasks.keySet()];
            rss =[SELECT id, Prenom__c,Name , Hiring_date__c, Phone__c, Email__c FROM Ressource__c ORDER BY CreatedDate];
           
            return new Map<String,Object>{'p'=>p,'Tasks'=>Tasks.values(),'assTask'=>assTask,'allrss'=>rss};
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

  
}