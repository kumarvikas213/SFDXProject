import {createElement} from 'lwc';
import AccountWithoutDataTable from 'c/accountWithoutDataTable';
import {registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest'
import getFieldName from '@salesforce/apex/AccountController.getFieldName';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const mockFieldsetData =  require('./data/columns.json');
const getFieldSetAdaptor = registerApexTestWireAdapter(getFieldName);

const mockAccountData = require('./data/accountRecords.json');
const getAccountsAdaptor = registerApexTestWireAdapter(getAccounts);

describe('test Parent-Child Component',()=>{
    beforeEach(()=>{
        const element = createElement('c-accounts-without-datatable',{
            is:AccountWithoutDataTable
        })
        document.body.appendChild(element);
    })

    test('test no of columns from fieldset',()=>{
        const element = document.querySelector('c-accounts-without-datatable');
        getFieldSetAdaptor.emit(mockFieldsetData)
        return Promise.resolve().then(()=>{
            const columnElem = element.shadowRoot.querySelectorAll('th');
            console.log('without dataTable length is',columnElem.length);
            expect(columnElem.length).toBe(mockFieldsetData.length);
        })
    })

    test('match column list',()=>{
        const element = document.querySelector('c-accounts-without-datatable');
        getFieldSetAdaptor.emit(mockFieldsetData)
        return Promise.resolve().then(()=>{
            const columnElem = Array.from(element.shadowRoot.querySelectorAll('th'));
            const thList = columnElem.map(th=>th.textContent.trim());
            expect(thList.length).toBe(mockFieldsetData.length);
            expect(thList).toEqual(mockFieldsetData);
        })
    })

    test('error in displaying columns from fieldset',()=>{
        const element = document.querySelector('c-accounts-without-datatable');
        getFieldSetAdaptor.error()
        return Promise.resolve().then(()=>{
            const errorElem = element.shadowRoot.querySelector('.error');
            expect(errorElem.textContent).not.toBeNull();
        })
    })

    test('test no of records available',()=>{
        const element = document.querySelector('c-accounts-without-datatable');
        getAccountsAdaptor.emit(mockAccountData)
        return Promise.resolve().then(()=>{
            const accElem = element.shadowRoot.querySelectorAll('tbody>tr');
            console.log('total records are',accElem.length);
            expect(accElem.length).toBe(mockAccountData.length);
        })
    })

    test('error in fetching account record',()=>{
        const element = document.querySelector('c-accounts-without-datatable');
        getAccountsAdaptor.error()
        return Promise.resolve().then(()=>{
            const errorElem = element.shadowRoot.querySelector('.error');
            expect(errorElem.textContent).not.toBeNull();
        })
    })

})

