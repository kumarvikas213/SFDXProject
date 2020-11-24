import { LightningElement,track,wire } from 'lwc';
import getFieldName from '@salesforce/apex/AccountController.getFieldName';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountsDataTable extends LightningElement {

   @track error;
    @track data;
    @track check=false;
    @wire(getAccounts) getAccountsData({error,data})
    {
        if(data)
        {
            this.data = data;
            console.log("Accounts DataTable record", JSON.stringify(this.data)); 
        }
        else if(error)
        {
            this.error = error;
            this.check = false;
            this.data = undefined;
        }
    }

    @track columns = [];
    @wire(getFieldName) getFields({error,data})
    {
        if(data)
        {
            console.log("Accounts DataTable fields",JSON.stringify(data));
            for(let i=0; i< data.length;i++)
            {
                let field =
                {
                    label : data[i],
                    fieldName: data[i]
                } 
                this.columns.push(field);
            }
            console.log('DataTable formatted columns', JSON.stringify(this.columns));
            this.check = true;
        }
        else if(error)
        {
            this.error = error;
            this.check = false;
            console.log('error in fetching fieldsNames');
            this.columns = undefined;
        }
    }

}