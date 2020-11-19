import {createElement} from 'lwc';
import UIApi from 'c/uIApi';
import {registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest'
import { getRecord } from 'lightning/uiRecordApi';

// describe('SUM functionality',()=>{
//     beforeEach(()=>{
//         console.log("Before each test case")
//     })
//     afterEach(()=>{
//         console.log("After each test case")
//     })
//     test('add 1+2 to equal 3',()=> {
//         const num = 1+2
//         expect(num).toBe(3)
//     })
// })


const mockAccountData =  require('./data/getAccount.json');
const getAccountAdaptor = registerApexTestWireAdapter(getRecord);

describe('c-ui-api',()=>{
    beforeEach(()=>{
        const element = createElement('c-ui-api',{
            is:UIApi
        })
        document.body.appendChild(element)
    })

    test('record data is available',()=>{
        const element = document.querySelector('c-ui-api');
        getAccountAdaptor.emit(mockAccountData)
        return Promise.resolve().then(()=>{
            const pElem = element.shadowRoot.querySelector('.accountRecord');
            expect(pElem.textContent).toContain('Account Name: Vikas Kumar');
            expect(pElem.textContent).toContain('Industry: Communications');
            expect(pElem.textContent).toContain('Phone: 765879898');
            expect(pElem.textContent).toContain('Owner: User User');
            expect(pElem.textContent).toContain('Billing Address: 9379, Near Rahon Road');
            expect(pElem.textContent).toContain('Annual Revenue: $76,568');
            expect(pElem.textContent).toContain('Website: xyzgh.co.in');
            expect(pElem.textContent).toContain('Account Number: 65875859998');
            expect(pElem.textContent).toContain('Created By:User User');
            expect(pElem.textContent).toContain('Created DATE: 11/3/2020, 12:38 AM');
        })
    })

})


