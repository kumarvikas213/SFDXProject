public with sharing class AccountsHiearchy {

    @AuraEnabled(Cacheable=true)
    public static List<String> getFieldName(){
        List<String> fieldSet = new List<String>();
        
            for(Schema.FieldSetMember f : SObjectType.Account.FieldSets.Account_FieldSet.getFields()) 
            {
            	fieldSet.add(f.getFieldPath());
            }
        return fieldSet;
    }

    @AuraEnabled(Cacheable=true)
    public static List<sObject> getAllAccounts() 
    {
    	
        	String query = 'SELECT ';
        	for(Schema.FieldSetMember f : SObjectType.Account.FieldSets.Account_FieldSet.getFields()) 
            {
            	query += f.getFieldPath() + ', ';
        	}
            query += 'id,parentId FROM Account ORDER BY ParentId Limit 1000';
            System.debug('SOQL query' + query);
    
            return Database.query(query);
   		 
    }

    @AuraEnabled
    public static List<Account> findHierarchyData(string recId){
        List<Account> accList = new List<Account>();
        string queryString = 'select id,name,accountNumber,industry,parentId from Account ';
        //Section to get all child account details from ultimate parent starts-------------------------
        List<String> currentParent      = new List<String>{};
        Integer level               = 0;
        Boolean endOfStructure      = false;
        //method to find top parent of account
        string topMostparent = GetTopParentId(recId );
        system.debug('*******topMostparent:'+topMostparent);
        currentParent.add(topMostparent);
        system.debug('**********topMostparent:'+ currentParent);
        //Loop though all children
        string finalQueryString = '';
        List<Account>  queryOutput = new List<Account> ();
        while ( !endOfStructure ){  
            if( level == 0 ){
                finalQueryString = queryString + ' where id IN : CurrentParent ORDER BY ParentId  Limit 1000';
            } 
            else {
                finalQueryString = queryString + ' where ParentID IN : CurrentParent ORDER BY ParentId Limit 1000';
            }
            system.debug('********finalQueryString:'+finalQueryString);
            if(finalQueryString != null && finalQueryString !=''){
                try{
                    if(Limits.getLimitQueries()-Limits.getQueries()>0){
                        queryOutput = database.query(finalQueryString);
                        system.debug('***hierarchy level:'+level);
                    }else{
                        system.debug('****endOfStructure is true as SOQL limit reaches:');
                        endOfStructure = true;
                    }
                }catch(exception ex){ 
                    endOfStructure = true;
                }
            }
            system.debug('**queryOutput size:'+queryOutput);
            if( queryOutput.size() == 0 ){
                endOfStructure = true;
            }
            else{
                currentParent.clear();
                //iterating through query output
                for ( Integer i = 0 ; i < queryOutput.size(); i++ ){
                    currentParent.add(queryOutput[i].Id);
                    accList.add(queryOutput[i]);
                 }
            }
            level++;
        }
        system.debug('**********accList:'+accList);
        return accList;
    }
    
	// Find the top most element in Heirarchy  
    // @return objId
    public static String GetTopParentId( string recId ){
        Boolean top = false;
        while ( !top ) {
            string queryString = 'select id ,name, ParentId from Account where Id =:recId LIMIT 1';
            Account acc = database.query(queryString);
            if ( acc.parentId != null ) {
                recId = acc.parentId;
            }else {
                top = true;
            }
        }
        return recId ;
    }



}
