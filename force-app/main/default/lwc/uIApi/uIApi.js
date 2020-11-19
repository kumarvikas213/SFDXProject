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

   @track modifyDate;

    @wire(getRecord, { recordId: '001N000001z5fQ5IAI', fields: [NAME_FIELD, INDUSTRY_FIELD], optionalFields: [PHONE_FIELD, OWNER_NAME_FIELD,BILLING_ADDRESS_FIELD,ANNUAL_REVENUE_FIELD,ACCOUNT_NO_FIELD,WEBSITE_FIELD,CREATED_DATE_FIELD,CREATED_BY_FIELD] })
    account;

     get name() {
        return getFieldValue(this.account.data, NAME_FIELD);
    }

    get phone() {
        return getFieldValue(this.account.data, PHONE_FIELD);
    }

    get industry(){
        return getFieldValue(this.account.data, INDUSTRY_FIELD);
    }
    
    get owner() {
        return getFieldValue(this.account.data, OWNER_NAME_FIELD);
    }

    get billingAddress()
        {
            return getFieldValue(this.account.data,BILLING_ADDRESS_FIELD);
        }
    
    get annualRevenue()
        {
            return getFieldDisplayValue(this.account.data,ANNUAL_REVENUE_FIELD);
        }

    get accountNumber()
        {
            return getFieldValue(this.account.data,ACCOUNT_NO_FIELD);
        }

    get website()
        {
            return getFieldValue(this.account.data,WEBSITE_FIELD);
        }

    get createdBy()
        {
            console.log("ui api",this.account.data);
            console.log('date is:'+ this.account.data.lastModifiedDate);
            return getFieldValue(this.account.data,CREATED_BY_FIELD);
        }

    get createdDate()
        {
            return getFieldDisplayValue(this.account.data, CREATED_DATE_FIELD);
        }

        renderedCallback()
        {
            if(this.account && this.account.data)
            {
                console.log("mock data",JSON.stringify(this.account.data));
            }
        }
}