import { LightningElement,track,api,wire } from 'lwc';
import getFieldName from '@salesforce/apex/AccountController.getFieldName';

export default class AccountDetails extends LightningElement {

    @track fields;
    @track error;
    @api recordId;
   
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
            this.error = error;
            this.fields = undefined;
        }
    }

}