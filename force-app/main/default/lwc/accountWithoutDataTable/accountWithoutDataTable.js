import { LightningElement, track, wire, api } from 'lwc';
import getFieldName from '@salesforce/apex/AccountController.getFieldName';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountWithoutDataTable extends LightningElement {

    @track fields;
    @track accounts;
    @track check=false;
    @api recordId;
   
    @wire(getFieldName) getFields({error,data})
    {
        if(data)
        {
            this.fields = data;
            this.check = true;
            console.log("LWC fields fetched",this.fields);
        }
        else if(error)
        {
            this.fields = '';
        }
    }

    @wire(getAccounts) getAccounts({error,data})
    {
        if(data)
        {
            console.log("LWC account fetched",data);
            this.accounts = data;
            
        }
        else if(error)
        {
            this.accounts = '';
        }
    }
}