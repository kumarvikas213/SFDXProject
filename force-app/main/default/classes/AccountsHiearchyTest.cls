@isTest
private with sharing class AccountsHiearchyTest {
    public AccountsHiearchyTest() {}

    @testSetup static void setup() {
        // Create common test accounts
        List<Account> testAccts = new List<Account>();
        for(Integer i=0;i<5;i++) {
            testAccts.add(new Account(Name = 'TestAcct'+i, Description='TestingPurpose', Industry='Chemical',AnnualRevenue=1000));
        }
        insert testAccts;        
    }

    @isTest static void getAccount()
    {
        List<sObject> accList = AccountsHiearchy.getAllAccounts();
        System.assertEquals(5, accList.size());

        Account acct = [SELECT Id FROM Account WHERE Name='TestAcct1' LIMIT 1];
        delete acct;
        List<sObject> accList1 = AccountsHiearchy.getAllAccounts();
        System.assertEquals(4, accList1.size());

        List<Account> updatedAccount = new List<Account>();
        Account acct1 = [SELECT Id FROM Account WHERE Name='TestAcct0' LIMIT 1];
        Account acct2 = [SELECT Id,ParentId FROM Account WHERE Name='TestAcct2' LIMIT 1];
        Account acct3 = [SELECT Id,ParentId FROM Account WHERE Name='TestAcct3' LIMIT 1];
        // Modify account
            acct2.ParentId =  acct1.Id;
            acct3.ParentId = acct1.Id;

            updatedAccount.add(acct2);
            updatedAccount.add(acct3);

        update updatedAccount;

        List<Account> modifyAccount = [select Id,Name from Account where ParentId =: acct1.Id];
        System.assertEquals(2, modifyAccount.size());

    }

    @isTest static void getFields()
    {
        List<String> fieldList = AccountsHiearchy.getFieldName();
        System.assertNotEquals(0,fieldList.size(),'Fieldset must have fields in it');
    }


    @isTest static void findAccountHierachyTest()
    {
        List<Account> accList =  [select Id,parentId,Name from Account];
        System.debug('accList is size'+accList.size());
        if(accList.size() > 4)
        {
             accList[2].parentId = accList[0].Id;
             accList[3].parentId = accList[2].Id;
        }

        List<Account> updatedAccount = new List<Account>(); 
        updatedAccount.add(accList[2]);
        updatedAccount.add(accList[3]);
    
        update updatedAccount;

        List<Account> childAccount = [select Id,Name from Account where ParentId =: accList[0].Id];
        System.assertEquals(1, childAccount.size(), 'Child accounts does not match for accList[0].Id');
        List<Account> hierachyMethod1 = AccountsHiearchy.findHierarchyData(accList[0].Id);
        System.assertEquals(3, hierachyMethod1.size(), 'accounts does not match for accList[0].Id');
       
        List<Account> childAccount1 = [select Id,Name from Account where ParentId =: accList[2].Id];
        System.assertEquals(1, childAccount1.size(),'accounts does not match for accList[2].Id');
        List<Account> hierachyMethod2 = AccountsHiearchy.findHierarchyData(accList[2].Id);
        System.assertEquals(3, hierachyMethod2.size(),'account does not match for accList[2].Id');

        List<Account> childAccount2 = [select Id,Name from Account where ParentId =: accList[3].Id];
        System.assertEquals(0, childAccount2.size(),'accounts does not match for accList[3].Id');
        List<Account> hierachyMethod3 = AccountsHiearchy.findHierarchyData(accList[3].Id);
        System.assertEquals(3, hierachyMethod3.size(),'accounts does not match for accList[3].Id');

        List<Account> hierachyMethod4 = AccountsHiearchy.findHierarchyData(accList[1].Id);
        System.assertEquals(1, hierachyMethod4.size(),'accounts does not match for accList[1].Id');

        List<Account> hierachyMethod5 = AccountsHiearchy.findHierarchyData(accList[4].Id);
        System.assertEquals(1, hierachyMethod5.size(),'Child accounts does not match for accList[3].Id');

        System.assertEquals(5,accList.size(),'Total accounts records in list does not match');

    }
}
