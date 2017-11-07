import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { $ } from 'meteor/jquery';

import translateNumbers from '/imports/modules/number-translator.js';

import './main.html';

Template.translator.onCreated(function () {
  const templateInstance = this;
  templateInstance.result = new ReactiveVar();
});

Template.translator.helpers({
  'result'() {
    return Template.instance().result.get();
  }
});

Template.translator.events({
  'submit form'(event, templateInstance) {
    event.preventDefault();
    const input = $(event.currentTarget).find('input[type=text]').val().trim();
    try {
      templateInstance.result.set(translateNumbers(input));
    } catch (e) {
      templateInstance.result.set(e.message);
    }
  }
});
