import _ from 'lodash';
import Sister from 'sister';
import rebound from 'rebound';
import Card from './Card';
import SwingCore from './types';

// @ts-nocheck
/* tslint:disable */

/**
 * @param {object} config Stack configuration.
 * @returns {object} An instance of Stack object.
 */
const Stack = (config: any) => {
  let eventEmitter: any;
  let index: any;
  let springSystem: any;
  let stack: any;

  const construct = () => {
    stack = {};
    springSystem = new rebound.SpringSystem();
    // @ts-ignore
    eventEmitter = Sister();
    index = [];
  };

  construct();

  /**
   * Get the configuration object.
   *
   * @returns {object}
   */
  stack.getConfig = () => {
    return config;
  };

  /**
   * Get a singleton instance of the SpringSystem physics engine.
   *
   * @returns {Sister}
   */
  stack.getSpringSystem = () => {
    return springSystem;
  };

  /**
   * Proxy to the instance of the event emitter.
   *
   * @param {string} eventName
   * @param {string} listener
   * @returns {undefined}
   */
  stack.on = (eventName: string, listener: Function) => {
    return eventEmitter.on(eventName, listener);
  };

  /**
   * Proxy to the instance of the event emitter.
   */
  stack.off = (listener: any) => {
    eventEmitter.off(listener);
  };

  /**
   * Creates an instance of Card and associates it with an element.
   *
   * @param {HTMLElement} element
   * @param {boolean} prepend
   * @returns {Card}
   */
  stack.createCard = (element: any, prepend: boolean) => {
    // @ts-ignore
    const card = Card(stack, element, prepend);
    const events = [
      'throwout',
      'throwoutend',
      'throwoutleft',
      'throwoutright',
      'throwoutup',
      'throwoutdown',
      'throwin',
      'throwinend',
      'dragstart',
      'dragmove',
      'dragend',
    ];

    // Proxy Card events to the Stack.
    events.forEach((eventName) => {
      // @ts-ignore
      card.on(eventName, (data) => {
        eventEmitter.trigger(eventName, data);
      });
    });

    index.push({
      card,
      element,
    });

    return card;
  };

  /**
   * Returns an instance of Card associated with an element.
   *
   * @param {HTMLElement} element
   * @returns {Card|null}
   */
  stack.getCard = (element: any) => {
    const group = _.find(index, {
      element,
    });

    if (group) {
      return group.card;
    }

    return null;
  };

  /**
   * Remove an instance of Card from the stack index.
   *
   * @param {Card} card
   * @returns {null}
   */
  stack.destroyCard = (card: any) => {
    eventEmitter.trigger('destroyCard', card);

    return _.filter(index, (indexCard) => {
      return indexCard !== card;
    });
  };

  return stack;
};

export default Stack as unknown as SwingCore.Stack;
