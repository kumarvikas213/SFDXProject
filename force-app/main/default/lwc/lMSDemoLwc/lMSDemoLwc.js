import { LightningElement,wire } from 'lwc';
import {APPLICATION_SCOPE, publish, MessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import SAMPLEMC from '@salesforce/messageChannel/SampleMessageChannel__c';

export default class LMSDemoLwc extends LightningElement {
 
    @wire (MessageContext)
    context;
    
    inputValue = '';
    subscription = null;
    receivedMessage;

    connectedCallback() {
        this.subscribeMessage();
    }
    
    publishMessage()
    {
        const message = {
            lmsData : {
                value : this.inputValue
            }
        }
        publish(this.context, SAMPLEMC, message);
    }
    subscribeMessage()
    {
        if(!this.subscription)
        {
            this.subscription = subscribe(this.context, SAMPLEMC, (message)=>{
                this.handleMessage(message)
            }, {scope : APPLICATION_SCOPE})
        }
       
    }
    unsubscribeMessage()
    {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    handleMessage(message)
    {
        this.receivedMessage = message && message.lmsData ? message.lmsData.value : "No message";
    }
    inputHandler(event)
    {
        this.inputValue = event.target.value;
    }
    disconnectedCallback()
    {
        this.unsubscribeMessage();
    }
}