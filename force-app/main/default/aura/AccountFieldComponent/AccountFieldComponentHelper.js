({
    getFieldName : function(component,event,helper)
    {
            var accountList = component.get("v.accountListChild");
            console.log("Child account list",accountList);
            var action = component.get("c.getFieldName");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var fieldList = response.getReturnValue();                    
                  //  console.log(fieldList);
                    component.set("v.fieldList", fieldList);
                    for (var idx in fieldList) {
                     //   console.log(fieldList[idx]);
                        $A.createComponent(
                            "ui:inputText",
                            {
                              "label": fieldList[idx],
                              "value": accountList[fieldList[idx]],
                              "class": "outputCls"
                            },
                            function(newCmp){
                               //Add the field list to the body array
                               if (component.isValid()) {
                                  var body = component.get("v.body");
                                  body.push(newCmp);
                                  component.set("v.body", body);
                                }
                            });
                        }  
                }                           
            });
            $A.enqueueAction(action);   
            
    }
})
