public with sharing class AccountController {
    public AccountController() {}
    
    
    public static List<FieldSetMember> getFields()
    {
        return SObjectType.Account.FieldSets.Account_FieldSet.getFields();
    }

    @AuraEnabled
    public static sObject getRecordData(String recordId) 
    {
    	try
    	{
            String formattedRecordId = '\''+ recordId + '\'';
        	String query = 'SELECT ';

        	for(Schema.FieldSetMember f : getFields()) 
            {
            	query += f.getFieldPath() + ', ';
        	}

            query += 'Id FROM Account WHERE Id = '+formattedRecordId;
            System.debug('SOQL query' + query);
            
            return Database.query(query);

   		 }

        catch(Exception e)
        {
            System.debug('Error while fetching' + e.getMessage());
        }

    return null;

    }
    
    @AuraEnabled(Cacheable=true)
    public static List<String> getFieldName(){
        List<String> fieldSet = new List<String>();
        try {
            
            for(Schema.FieldSetMember f : SObjectType.Account.FieldSets.Account_FieldSet.getFields()) 
            {
            	fieldSet.add(f.getFieldPath());
            }
           
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
        return fieldSet;
    }
}
