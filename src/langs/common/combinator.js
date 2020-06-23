'use strict';

const assert = require('assert');
const debug = require('../../lib/debug');
const Emitter = require('../../lib/emitter');

const {
  Grammer,

  Behavior,
  PropItem,
  AnnotationItem
} = require('./items');

const { _lowerFirst } = require('../../lib/helper.js');

class BaseConbinator {
  constructor(langConfig = {}) {
    this.level = 0;
    this.eol = '';

    this.includeList = [];
    this.includeModelList = [];
    this.includeSet = [];
    this.config = langConfig;
  }

  coreClass(objName) {
    const key = _lowerFirst(objName.split('$').join(''));
    if (this.config.tea[key]) {
      return this.config.tea[key].name;
    }
    debug.stack('Unsupported core class name : ' + objName);
  }

  resolveNotes(nodes) {
    let notes = {};
    nodes.filter(node => node instanceof PropItem).map(prop => {
      if (prop.notes.length > 0) {
        prop.notes.forEach(note => {
          note.belong = prop.index;
          note.prop = prop.name;
          if (notes[note.key] === undefined) {
            notes[note.key] = [];
          }
          notes[note.key].push(note);
        });
      }
    });
    return notes;
  }

  emitAnnotations(emitter, annotations) {
    annotations.forEach(annotation => {
      this.emitAnnotation(emitter, annotation);
    });
  }

  init(ast) {
    throw new Error('unimpelemented');
  }

  levelUp() {
    this.level++;
    return this.level;
  }

  levelDown() {
    this.level--;
    return this.level;
  }

  addModelInclude(modelName) {
    throw new Error('unimpelemented');
  }

  addInclude(include) {
    throw new Error('unimpelemented');
  }

  grammer(emit, gram, eol = true, newLine = true) {
    if (gram instanceof AnnotationItem) {
      this.emitAnnotation(emit, gram);
      return;
    }
    assert.equal(true, gram instanceof Grammer);
    let emitter = new Emitter();
    let method = null;
    if (gram instanceof Behavior) {
      method = gram.name;
    } else if (gram instanceof Grammer) {
      method = _lowerFirst(gram.constructor.name);
    } else {
      debug.stack('Unsupported', gram);
    }
    if (this[method] !== undefined) {
      this[method].call(this, emitter, gram);
    } else {
      debug.stack('Unimpelemented : ' + method);
    }
    if (gram.eol !== null) {
      eol = gram.eol;
    }
    if (gram.newLine !== null) {
      newLine = gram.newLine;
    }
    if (newLine) {
      emit.emit('', this.level);
    }
    emit.emit(emitter.output);
    if (eol) {
      emit.emitln(this.eol);
    }
    emitter = null;
  }

}

module.exports = BaseConbinator;
