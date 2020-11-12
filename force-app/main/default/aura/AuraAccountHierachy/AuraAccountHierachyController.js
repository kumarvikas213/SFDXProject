({
    doInit: function (component, event, helper) { 
        console.log('doInit  of child component called');
        var columns = [
            {
                type: 'url',
                fieldName: 'AccountURL',
                label: 'Account Name',
                typeAttributes: {
                    label: { fieldName: 'accountName' }
                }
            },
            {
                type: 'text',
                fieldName: 'Industry',
                label: 'Industry'
            },
            {
                type: 'text',
                fieldName: 'AccountNumber',
                label: 'Account Number'
            }
            
        ];
        component.set('v.gridColumns', columns);
        
        
      // var trecid = component.get('v.ltngcurrentRecId'); //uncomment this line for single record by Vikas
      var trecid = 'vikas';

        //var tsObjectName= component.get('v.ltngSobjectname');
        //var tparentFieldAPIname= component.get('v.ltngParentFieldAPIName');
        //var tlabelFieldAPIName= component.get('v.ltngLabelFieldAPIName');
        if(trecid){
            helper.callToServer(component,"c.getAllAccounts",function(response) {   // call this method "c.findHierarchyData" for single record by vikas
                    var expandedRows = [];
                    var apexResponse = response;
                    var roles = {};
                    console.log('*******apexResponse:'+JSON.stringify(apexResponse));
                    var results = apexResponse;
                    roles[undefined] = { Name: "Root", _children: [] };
                    apexResponse.forEach(function(v) {
                        expandedRows.push(v.Id);
                        roles[v.Id] = { 
                            accountName: v.Name ,
                            name: v.Id, 
                            AccountNumber:v.AccountNumber,
                            Industry:v.Industry,
                            AccountURL:'/'+v.Id,
                            _children: [] };
                    });
                    apexResponse.forEach(function(v) {
                        roles[v.ParentId]._children.push(roles[v.Id]);   
                    });                
                    component.set("v.gridData", roles[undefined]._children);
                    console.log('*******treegrid data:'+JSON.stringify(roles[undefined]._children));
                    
                   // component.set('v.gridExpandedRows', expandedRows); //uncomment this line to expand all rows by vikas
                }, 
                {
                    recId: component.get('v.ltngcurrentRecId')
                }
            );    
        }
        
        
        
        
    }
})
