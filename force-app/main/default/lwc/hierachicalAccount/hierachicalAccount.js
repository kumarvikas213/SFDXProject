import { LightningElement, track,wire } from 'lwc';
import getFieldName from '@salesforce/apex/AccountsHiearchy.getFieldName';
import getAllAccounts from '@salesforce/apex/AccountsHiearchy.getAllAccounts';


export default class HierachicalAccount extends LightningElement {

    @track check=false;
    @track columns = [];
    @wire(getFieldName) getFields({error,data})
    {
        if(data)
        {
            console.log("LWC fields fetched",data.length);           
            for(let i=0; i< data.length;i++)
            {
                let field = {};
                if(data[i] == 'Name')
                {
                    field = {
                            type: 'url',
                            fieldName: 'AccountURL',
                            label: 'Name',
                            typeAttributes: {
                                label: { fieldName: 'Name' }
                            }
                        }   
                }
                else
                {
                    field =
                            {
                                label : data[i],
                                fieldName: data[i]
                            } 
                }
                
                this.columns.push(field);
            }
            console.log('My columns list', this.columns);
            this.check = true;
        }
        else if(error)
        {
            console.log('error in fetching fieldsNames');
            this.columns = '';
        }
    }

    @track allAccounts;
    @wire(getAllAccounts) getAccountsData({error,data})
    {
        var expandedRows = [];
        var apexResponse = data;
        var roles = {};
        console.log('*******apexResponse:'+JSON.stringify(apexResponse));
        if(data)
        {
            roles[undefined] = { Id: "Root", _children: [] };
            apexResponse.forEach(function(v) {
                      //  expandedRows.push(v.Id);  
                        roles[v.Id] = { 
                            Name: v.Name ,
                            Id: v.Id, 
                            AccountNumber:v.AccountNumber,
                            AnnualRevenue:v.AnnualRevenue,
                            Website:v.Website,
                            Phone:v.Phone,
                            Description:v.Description,
                            Industry:v.Industry,
                           AccountURL:'/'+v.Id,
                            _children: [] };
                            
                    });
                    console.log('*****Roles before child associated' + JSON.stringify(roles));
                    apexResponse.forEach(function(v) {
                        roles[v.ParentId]._children.push(roles[v.Id]);   
                    });                
                 
                  this.allAccounts = roles[undefined]._children;
                    console.log('*******treegrid data:'+JSON.stringify(roles[undefined]._children));
                    
               
        }
        else if(error)
        {
            this.allAccounts = '';
        }
    }

}