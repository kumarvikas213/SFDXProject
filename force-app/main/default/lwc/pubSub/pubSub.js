import { LightningElement } from 'lwc';

var callbacks = {};

/**
 * Registers a callback for an event
 * @param {string} eventName - Name of the event to listen for.
 * @param {function} callback - Function to invoke when said event is fired.
 */
const register = (eventName, callback) => {
  if (!callbacks[eventName]) {
    callbacks[eventName] = new Set();
  }
  callbacks[eventName].add(callback);
};

/**
 * Unregisters a callback for an event
 * @param {string} eventName - Name of the event to unregister from.
 * @param {function} callback - Function to unregister.
 */
const unregister = (eventName, callback) => {
  if (callbacks[eventName]) {
    callbacks[eventName].delete(callback);
    // ! delete the callback from callbacks variable
  }
};

/*
    ! Deletes all the Components from the callbacks params & removes all the listerns and related 
    ! Callback functions
*/
const unregisterAll = () => {
  callbacks = {};
};

/**
 * Fires an event to listeners.
 * @param {string} eventName - Name of the event to fire.
 * @param {*} payload - Payload of the event to fire.
 */
const fire = (eventName, payload) => {
  if (callbacks[eventName]) {
    callbacks[eventName].forEach(callback => {
      try {
        callback(payload);
      } catch (error) {
        // fail silently
      }
    });
  }
};

/*
    Todo: Export all the functions so that these are accisible from the other JS Classes
*/
export default {
    register,
  unregister,
  fire,
  unregisterAll
};