import {createElement} from 'lwc';
import AccountsDataTable from 'c/accountsDataTable';
import {registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest'
import getFieldName from '@salesforce/apex/AccountController.getFieldName';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const mockFieldsetData =  require('./data/getColumns.json');
const getFieldSetAdaptor = registerApexTestWireAdapter(getFieldName);

const mockAccountData = require('./data/getAccountsData.json');
const getAccountsAdaptor = registerApexTestWireAdapter(getAccounts);

describe('test DataTable Component',()=>{
    beforeEach(()=>{
        const element = createElement('c-accounts-datatable',{
            is:AccountsDataTable
        })
        document.body.appendChild(element);
    })
    test('fetch columns of fieldset',()=>{
        const element = document.querySelector('c-accounts-datatable');
        getFieldSetAdaptor.emit(mockFieldsetData)
        return Promise.resolve().then(()=>{
            const pElem = element.shadowRoot.querySelectorAll('lightning-datatable');
            console.log('length is',pElem.length);
         //   expect(pElem.length).toBe(1);
        })
    })

    test('error in fetching columns',()=>{
        const element = document.querySelector('c-accounts-datatable');
        getFieldSetAdaptor.error()
        return Promise.resolve().then(()=>{
            const errorElem = element.shadowRoot.querySelector('.error');
            expect(errorElem.textContent).not.toBeNull();
        })
    })

    test('fetch data for dataTable',()=>{
        const element = document.querySelector('c-accounts-datatable');
        getAccountsAdaptor.emit(mockAccountData)
        return Promise.resolve().then(()=>{
            const pElem = element.shadowRoot.querySelectorAll('lightning-datatable');
            console.log('length is',pElem.length);
        })
    })

    test('error in fetching data for DataTable',()=>{
        const element = document.querySelector('c-accounts-datatable');
        getAccountsAdaptor.error()
        return Promise.resolve().then(()=>{
            const errorElem = element.shadowRoot.querySelector('.error');
            expect(errorElem.textContent).not.toBeNull();
        })
    })
})

