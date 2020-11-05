import { LightningElement,track,api,wire } from 'lwc';
import getFieldName from '@salesforce/apex/AccountController.getFieldName';

export default class AccountDetails extends LightningElement {

    @track fields;
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

}