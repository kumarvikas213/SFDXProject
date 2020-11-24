import {createElement} from 'lwc';
import AccountDetails from 'c/accountDetails';
import {registerApexTestWireAdapter } from '@salesforce/sfdx-lwc-jest'
import {getFieldName} from '@salesforce/apex/AccountController.getFieldName';

const mockFieldsetData =  require('./data/getFields.json');
const getFieldSetAdaptor = registerApexTestWireAdapter(getFieldName);

describe('Record view form component',()=>{
    beforeEach(()=>{
        const element = createElement('c-account-details',{
            is:AccountDetails
        })
        document.body.appendChild(element);
    })

    test('test fieldset data',()=>{
        const element = document.querySelector('c-account-details');
        getFieldSetAdaptor.emit(mockFieldsetData)
        return Promise.resolve().then(()=>{
            const pElem = element.shadowRoot.querySelectorAll('lightning-output-field');
         
           expect(pElem.length).toBe(mockFieldsetData.length);
           console.log('length is',pElem.length);
        //    console.log('my data is',pElem[0].textContent);
            
        })
    })
    
    test('error in fetching fieldset',()=>{
        const element = document.querySelector('c-account-details');
        getFieldSetAdaptor.error()
        return Promise.resolve().then(()=>{
            const errorElem = element.shadowRoot.querySelector('.error');
            expect(errorElem.textContent).not.toBeNull();
        })
    })

})

