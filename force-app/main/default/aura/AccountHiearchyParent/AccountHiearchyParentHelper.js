({
    fetchAccounts : function(component,event,helper) {
        var action = component.get("c.getAllAccounts");
           
        //Set up the callback
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var accounts = response.getReturnValue();
                component.set("v.parentAccounts", accounts);
                console.log("ParentAccountDetails",accounts);
                component.set("v.check", true);
               
            }  
            else
            {
                alert('Aura Parent Error is getting data');
            }          
        });
        $A.enqueueAction(action);
    }
})
