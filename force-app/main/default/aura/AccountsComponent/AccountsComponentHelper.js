({
    fetchAccounts : function(component,event,helper) {
        var action = component.get("c.getRecordData");
        var accountId = component.get("v.recordId");
      // var accountId = '001N000001z5fQ5IAI';
        
        action.setParams({
            recordId : accountId
        })
        //Set up the callback
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var accounts = response.getReturnValue();
                component.set("v.accountList", accounts);
                console.log("accountDetails",component.get("v.accountList"));
                component.set("v.check", true);
               
            }  
            else
            {
                alert('Error is getting data');
            }          
        });
        $A.enqueueAction(action);
    }
})
