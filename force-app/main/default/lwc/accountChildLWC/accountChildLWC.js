import { api, LightningElement,track, wire } from 'lwc';

export default class AccountChildLWC extends LightningElement {

    
    @api fieldName;
    @api account;
    @track data;

    get accountData()
    {
        console.log("account data" + this.account[this.fieldName]);
        return this.account[this.fieldName];
    }
       
}