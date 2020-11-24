import { LightningElement, track, wire, api } from 'lwc';
import getFieldName from '@salesforce/apex/AccountController.getFieldName';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountWithoutDataTable extends LightningElement {

    @track fields;
    @track accounts;
    @track check=false;
    @api recordId;
    @track error;
   
    @wire(getFieldName) getFields({error,data})
    {
        if(data)
        {
            this.fields = data;
            console.log("LWC fields fetched",JSON.stringify(this.fields));
            this.error = undefined;
        }
        else if(error)
        {
            this.fields = undefined;
            this.error = error;
        }
    }

    @wire(getAccounts) getAccounts({error,data})
    {
        if(data)
        {
            this.accounts = data;
            console.log("LWC account fetched",JSON.stringify(this.accounts));
            this.check = true;
            this.error = undefined;
            
        }
        else if(error)
        {
            this.accounts = undefined;
            this.error = error;
        }
    }
}