/**
  Usage:

  ```hbs
    {{smhw-file-upload collection=model.attachments}}
  ```

  The `collection` option is mandatory and is expected to be a hasMany relationship
  of `Attachments` (or anything with a similar API)

  There is no configuration options.
  It supports multiple file uploads with progress indicator and native drag and drop files.
*/

import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames:             ['smhw-file-uploader'],
  classNameBindings:      ['drag-over:highlighted', 'hasPendingUploads:highlighted'],
  pendingUploads:         computed.filterBy('collection', 'isNew', true),
  finishedUploads:        computed.filterBy('collection', 'isNew', false),
  hasPendingUploads:      computed.gt('pendingUploads.length', 0),
  hasManyPendingUploads:  computed.gt('pendingUploads.length', 1),
  showFileList: true,
  didInsertElement() {
    this._super.apply(this, arguments);
    this.fileInput = this.element.querySelector('input[type=file]');
    this.setupFileInput();
    this.setupDnD();
  },

  setupFileInput() {
    this.fileInput.addEventListener('change', this.uploadSelection.bind(this));
  },

  setupDnD(){
    let dropArea = this.element.querySelector('.drop-area');
    let dropHandler = (e) => {
      this.set('drag-over', false);
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files.length > 0) {
        this.uploadFiles(e.dataTransfer.files);
      }
      return false;
    };
    let dragEnterHandler = (e) => {
      this.set('target', e.target);
      this.set('drag-over', true);
      e.preventDefault();
    };
    let dragOverHandler = (e) => {
      e.preventDefault();
      return false;
    };
    let dragLeaveHandler = (e) => {
      if (e.target === this.get('target')) {
        this.set('drag-over', false);
        e.preventDefault();
        e.stopPropagation();
      }
    };
    dropArea.addEventListener('dragenter', dragEnterHandler, false);
    dropArea.addEventListener('dragleave', dragLeaveHandler, false);
    dropArea.addEventListener('dragover', dragOverHandler, false);
    dropArea.addEventListener('drop', dropHandler, false);
  },

  uploadSelection() {
    let fileList = this.fileInput.files;
    this.uploadFiles(fileList);
    this.clearFileInput();
    this.setupFileInput();
  },

  uploadFiles(fileList) {
    const promises = Array.prototype.map.call(fileList, (file) => {
      let attachment = this.get('collection').createRecord({});

      if (typeof attachment.assignAttributesFromFile !== 'function') {
        throw new Error('The objects in your collection need to respond to #assignAttributesFromFile, this function will be invoked with a file as an argument');
      }
      attachment.assignAttributesFromFile(file);
      return attachment.save();
    });
    Ember.RSVP.all(promises).then(savedFiles => this.sendAction('action', savedFiles));
  },

  clearFileInput() {
    let newFileInput = this.fileInput.cloneNode();
    this.fileInput.parentElement.replaceChild(newFileInput, this.fileInput);
    this.fileInput = newFileInput;
  },

  actions: {
    remove(attachment) {
      if (Ember.isBlank(this.get('deleteAttachment'))) {
        attachment.unloadRecord();
      } else {
        this.sendAction('deleteAttachment', attachment);
      }
    }
  }
});
