import { LightningElement,track,wire } from 'lwc';
import getFieldName from '@salesforce/apex/AccountController.getFieldName';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountsDataTable extends LightningElement {

   @track check=false;
    @track data;
    @wire(getAccounts) getAccountsData({error,data})
    {
        if(data)
        {
            this.data = data;
            console.log("LWC account fetched",this.data);  
        }
        else if(error)
        {
            this.data = '';
        }
    }

    @track columns = [];
    @wire(getFieldName) getFields({error,data})
    {
        if(data)
        {
            console.log("LWC fields fetched",data.length);
            for(let i=0; i< data.length;i++)
            {
                let field =
                {
                    label : data[i],
                    fieldName: data[i]
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

}