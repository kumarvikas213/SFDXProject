import { LightningElement } from 'lwc';
import pubsub from 'c/pubSub';

export default class PubSubSubcriber extends LightningElement {

    message;
    connectedCallback(){
        this.regiser();
    }
    regiser(){
        window.console.log('event registered ');
        pubsub.register('simplevt', this.handleEvent.bind(this));
    }
    handleEvent(messageFromEvt){
        window.console.log('event handled ',messageFromEvt);
        this.message = messageFromEvt ? JSON.stringify(messageFromEvt, null, '\t') : 'no message payload';
    }
}