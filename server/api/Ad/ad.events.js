/**
 * Thing model events
 */

'use strict';

import {EventEmitter} from 'events';
var Ad = require('./ad.model.js');
var AdEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AdEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Ad.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AdEvents.emit(event + ':' + doc._id, doc);
    AdEvents.emit(event, doc);
  }
}

export default AdEvents;
