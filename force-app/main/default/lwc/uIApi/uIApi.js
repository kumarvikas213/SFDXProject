import { LightningElement, track, wire } from 'lwc';
import { getRecord, getFieldValue,getFieldDisplayValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import BILLING_ADDRESS_FIELD from '@salesforce/schema/Account.BillingStreet';
import ANNUAL_REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import ACCOUNT_NO_FIELD from '@salesforce/schema/Account.AccountNumber';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import CREATED_BY_FIELD from '@salesforce/schema/Account.CreatedBy.Name'
import CREATED_DATE_FIELD from '@salesforce/schema/Account.CreatedDate';

export default class UIApi extends LightningElement {

   @track accountRecord;
   @track error;

    @wire(getRecord, { recordId: '001N000001z5fQ5IAI', fields: [NAME_FIELD, INDUSTRY_FIELD], optionalFields: [PHONE_FIELD, OWNER_NAME_FIELD,BILLING_ADDRESS_FIELD,ANNUAL_REVENUE_FIELD,ACCOUNT_NO_FIELD,WEBSITE_FIELD,CREATED_DATE_FIELD,CREATED_BY_FIELD] })
    account({data,error}){
        if(data)
        {
            console.log('my data is '+this.accountRecord);
            this.accountRecord = data;
            this.error = undefined;

        }
        else if(error)
        {
            this.error = error;
            this.accountRecord = undefined;
        }
    }


     get name() {
        return getFieldValue(this.accountRecord, NAME_FIELD);
    }

    get phone() {
        return getFieldValue(this.accountRecord, PHONE_FIELD);
    }

    get industry(){
        return getFieldValue(this.accountRecord, INDUSTRY_FIELD);
    }
    
    get owner() {
        return getFieldValue(this.accountRecord, OWNER_NAME_FIELD);
    }

    get billingAddress()
        {
            return getFieldValue(this.accountRecord,BILLING_ADDRESS_FIELD);
        }
    
    get annualRevenue()
        {
            return getFieldDisplayValue(this.accountRecord,ANNUAL_REVENUE_FIELD);
        }

    get accountNumber()
        {
            return getFieldValue(this.accountRecord,ACCOUNT_NO_FIELD);
        }

    get website()
        {
            return getFieldValue(this.accountRecord,WEBSITE_FIELD);
        }

    get createdBy()
        {
            console.log("ui api",this.accountRecord);
            console.log('date is:'+ this.accountRecord.lastModifiedDate);
            return getFieldValue(this.accountRecord,CREATED_BY_FIELD);
        }

    get createdDate()
        {
            return getFieldDisplayValue(this.accountRecord, CREATED_DATE_FIELD);
        }

        // renderedCallback()
        // {
        //     if(this.accountRecord && this.accountRecord)
        //     {
        //         console.log("mock data",JSON.stringify(this.accountRecord));
        //     }
        // }
}