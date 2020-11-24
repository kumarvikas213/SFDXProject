import {createElement} from 'lwc';
import AccountChildLWC from 'c/accountChildLWC';

const ACCOUNT = {
    "Name": "Parent",
    "AccountNumber": "67876",
    "Industry": "Banking",
    "Id": "001N000001z5xmUIAQ"
  };

const FIELD = 'Industry';

describe('test child component data binding',()=>{
    test('render api value',()=>{
        const FIELD = 'Industry';
        const element = createElement('c-account-child-l-w-c',{
            is:AccountChildLWC
        })
        element.account = ACCOUNT;
        element.fieldName = FIELD;
        document.body.appendChild(element);
        const divElem = element.shadowRoot.querySelector('div');
        expect(divElem.textContent).toBe(ACCOUNT.Industry);
    })

    test('render api for different field',()=>{
        const FIELD = 'Name';
        const element = createElement('c-account-child-l-w-c',{
            is:AccountChildLWC
        })
        element.account = ACCOUNT;
        element.fieldName = FIELD;
        document.body.appendChild(element);
        const divElem = element.shadowRoot.querySelector('div');
        expect(divElem.textContent).toBe(ACCOUNT.Name);
    })

    test('Data is not avialable for following field',()=>{
        const FIELD = 'Description';
        const element = createElement('c-account-child-l-w-c',{
            is:AccountChildLWC
        })
        element.account = ACCOUNT;
        element.fieldName = FIELD;
        document.body.appendChild(element);
        const divElem = element.shadowRoot.querySelector('div');
        expect(divElem.textContent).toBe('');
    })
})