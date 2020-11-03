public with sharing class ApexController {
    public ApexController() {

    }

    public List<FieldSetMember> getFields()
    {
        return SObjectType.Account.FieldSets.Account_FieldSet.getFields();
    }

    public sObject getRecordData(String recordId) 
    {
    	try
    	{
            String formattedRecordId = '\''+ recordId + '\'';
        	String query = 'SELECT ';

        	for(Schema.FieldSetMember f : this.getFields()) 
            {
            	query += f.getFieldPath() + ', ';
        	}

            query += 'Id FROM Account WHERE Id ='+formattedRecordId;
            System.debug('SOQL query' + query);
            
            return Database.query(query);

   		 }

        catch(Exception e)
        {
            System.debug('Error while fetching' + e.getMessage());
        }

    return null;

	}
}
