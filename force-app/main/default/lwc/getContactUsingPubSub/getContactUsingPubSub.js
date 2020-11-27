import { LightningElement } from 'lwc';
import pubsub from 'c/pubSub';

export default class GetContactUsingPubSub extends LightningElement {

    message;

    connectedCallback()
    {
        this.regiser();
    }

    regiser(){
        window.console.log('event registered ');
        pubsub.register('contactRecordId', this.handleEvent.bind(this));
    }
    handleEvent(messageFromEvt){
        window.console.log('event handled ',messageFromEvt);
        this.message = messageFromEvt;
        //this.message = messageFromEvt ? JSON.stringify(messageFromEvt, null, '\t') : 'no message payload';
        console.log('output json', JSON.stringify(this.message));
      
    }
}