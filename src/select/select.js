(function() {
  'use strict';

  /**
   * Logs a debug message
   */
  function debug(msg, msObject) {
    console.debug('[MaterialSelect] ' + msg);
    if (msObject) {
      console.log(msObject);
    }
  }
  /**
   * Creates new Select
   * @param {element} target element to apply Material to
   */
  function MaterialSelect(element) {
    console.debug('Initializing MaterialSelect', this);
    this.element_ = element;
    this.maxRows = this.Constant_.NO_MAX_ROWS;
    // Initialize instance.
    this.init();
  }

  MaterialSelect.prototype.Constant_ = {
    NO_MAX_ROWS: -1,
    MAX_ROWS_ATTRIBUTE: 'maxrows'
  };

  MaterialSelect.prototype.CssClasses_ = {
    LABEL: 'mdl-textfield__label',
    INPUT: 'mdl-select__input',
    IS_DIRTY: 'is-dirty',
    IS_FOCUSED: 'is-focused',
    IS_DISABLED: 'is-disabled',
    IS_INVALID: 'is-invalid',
    IS_UPGRADED: 'is-upgraded'
  };

  /**
   * onKeyDown_
   */
  MaterialSelect.prototype.onKeyDown_ = function(event) {
    console.debug('onKeyDown_', this);

    var currentRowCount = event.target.value.split('\n').length;
    if (event.keyCode === 13) {
      if (currentRowCount >= this.maxRows) {
        event.preventDefault();
      }
    }
  };

  /**
   * onFocus_
   */
  MaterialSelect.prototype.onFocus_ = function(event) {
    console.debug('onFocus_', this);
    this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
  };

  /**
   * onBlur_
   */
  MaterialSelect.prototype.onBlur_ = function(event) {
    console.debug('onBlur_', this);
    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
  };

  /**
   * updateClasses_
   */
  MaterialSelect.prototype.updateClasses_ = function() {
    console.debug('updateClasses_', this);
    this.checkDisabled();
    this.checkValidity();
    this.checkDirty();
  };

  /**
   * checkDisabled
   */
  MaterialSelect.prototype.checkDisabled = function() {
    console.debug('checkDisabled', this);

    if (this.input_.disabled) {
      this.element_.classList.add(this.CssClasses_.IS_DISABLED);
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
    }
  };

  /**
   * checkValidity
   */
  MaterialSelect.prototype.checkValidity = function() {
    console.debug('checkValidity', this);

    if (this.input_.validity.valid) {
      this.element_.classList.remove(this.CssClasses_.IS_INVALID);
    } else {
      this.element_.classList.add(this.CssClasses_.IS_INVALID);
    }
  };

  /**
   * checkDirty
   */
  MaterialSelect.prototype.checkDirty = function() {
    console.debug('checkDirty', this);

    if (this.input_.value && this.input_.value.length > 0) {
      this.element_.classList.add(this.CssClasses_.IS_DIRTY);
    } else {
      this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
    }
  };

  /**
   * disable
   */
  MaterialSelect.prototype.disable = function() {
    console.debug('disable', this);

    this.input_.disabled = true;
    this.updateClasses_();
  };

  /**
   * enable
   */
  MaterialSelect.prototype.enable = function() {
    console.debug('enable', this);

    this.input_.disabled = false;
    this.updateClasses_();
  };

  /**
   * change
   */
  MaterialSelect.prototype.change = function(value) {
    console.debug('change', this);

    if (value) {
      this.input_.value = value;
    }
    this.updateClasses_();
  };

  /**
   * init
   */
  MaterialSelect.prototype.init = function() {
    console.debug('init', this);

    if (this.element_) {
      this.label_ = this.element_.querySelector('.' + this.CssClasses_.LABEL);
      this.input_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);

      if (this.input_) {
        if (this.input_.hasAttribute(this.Constant_.MAX_ROWS_ATTRIBUTE)) {
          this.maxRows = parseInt(this.input_.getAttribute(
            this.Constant_.MAX_ROWS_ATTRIBUTE), 10);
          if (isNaN(this.maxRows)) {
            this.maxRows = this.Constant_.NO_MAX_ROWS;
          }
        }

        this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
        this.boundFocusHandler = this.onFocus_.bind(this);
        this.boundBlurHandler = this.onBlur_.bind(this);
        this.input_.addEventListener('input', this.boundUpdateClassesHandler);
        this.input_.addEventListener('focus', this.boundFocusHandler);
        this.input_.addEventListener('blur', this.boundBlurHandler);

        if (this.maxRows !== this.Constant_.NO_MAX_ROWS) {
          // TODO: This should handle pasting multi line text.
          // Currently doesn't.
          this.boundKeyDownHandler = this.onKeyDown_.bind(this);
          this.input_.addEventListener('keydown', this.boundKeyDownHandler);
        }

        this.updateClasses_();
        this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
      }
    }
  };

  /**
   * mdlDowngrade_
   */
  MaterialSelect.prototype.mdlDowngrade_ = function() {
    console.debug('mdlDowngrade_', this);

    this.input_.removeEventListener('input', this.boundUpdateClassesHandler);
    this.input_.removeEventListener('focus', this.boundFocusHandler);
    this.input_.removeEventListener('blur', this.boundBlurHandler);
    if (this.boundKeyDownHandler) {
      this.input_.removeEventListener('keydown', this.boundKeyDownHandler);
    }
  };

  /**
   * The component registers itself. It can assume componentHandler is available
   * in the global scope.
   */
  debug('Registering MaterialSelect');
  componentHandler.register({
    constructor: MaterialSelect,
    classAsString: 'MaterialSelect',
    cssClass: 'mdl-js-select',
    widget: true
  });
})();