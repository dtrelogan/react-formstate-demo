require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _react=require("react"),_react2=_interopRequireDefault(_react),_reactBootstrap=require("react-bootstrap");exports.default=function(e){return _react2.default.createElement(_reactBootstrap.FormGroup,{className:e.className,controlId:e.controlId,validationState:e.validationState},_react2.default.createElement(_reactBootstrap.ControlLabel,null,e.label),_react2.default.createElement(_reactBootstrap.FormControl,{type:e.type||"text",value:e.value,placeholder:e.placeholder,onChange:e.onChange,disabled:e.disabled,autoFocus:e.autoFocus,autoComplete:e.autoComplete}),_react2.default.createElement(_reactBootstrap.FormControl.Feedback,null),_react2.default.createElement(_reactBootstrap.HelpBlock,null,e.help))};

},{"react":"react","react-bootstrap":"react-bootstrap"}],2:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),_react=require("react"),_react2=_interopRequireDefault(_react),_reactFormstate=require("react-formstate"),_reactBootstrap=require("react-bootstrap"),_RfsInput=require("./RfsInput.jsx"),_RfsInput2=_interopRequireDefault(_RfsInput),_reactFormstateValidation=require("react-formstate-validation");_reactFormstateValidation.validationAdapter.plugInto(_reactFormstate.FormState);var ChangePasswordForm=function(e){function t(e){_classCallCheck(this,t);var r=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.formState=new _reactFormstate.FormState(r),r.state={},r.handleSubmit=r.handleSubmit.bind(r),r.validateConfirmNewPassword=r.validateConfirmNewPassword.bind(r),r.handlePasswordChange=r.handlePasswordChange.bind(r),r}return _inherits(t,_react.Component),_createClass(t,[{key:"validateConfirmNewPassword",value:function(e,t){if(e!==t.get("newPassword"))return"Password confirmation does not match"}},{key:"render",value:function(){return _react2.default.createElement(_reactFormstate.Form,{formState:this.formState,onSubmit:this.handleSubmit},_react2.default.createElement(_reactBootstrap.Grid,{fluid:!0},_react2.default.createElement(_reactBootstrap.Row,null,_react2.default.createElement(_reactBootstrap.Col,{xs:12,sm:6,lg:4},_react2.default.createElement(_RfsInput2.default,{formField:"newPassword",type:"password",label:"New Password",required:!0,fsv:function(e){return e.regex(/^\S+$/).msg("Password must not contain whitespace").minLength(8).msg("Password must be at least 8 characters")},handleValueChange:this.handlePasswordChange})),_react2.default.createElement(_reactBootstrap.Col,{xs:12,sm:6,lg:4},_react2.default.createElement(_RfsInput2.default,{formField:"confirmNewPassword",type:"password",label:"Confirm New Password",required:!0,validate:this.validateConfirmNewPassword})),_react2.default.createElement(_reactBootstrap.Col,{xsHidden:!0,lg:4})),_react2.default.createElement(_reactBootstrap.Row,null,_react2.default.createElement(_reactBootstrap.Col,{xs:12},_react2.default.createElement("input",{type:"submit",value:"Submit",disabled:this.formState.isInvalid()})))))}},{key:"handlePasswordChange",value:function(e){var t=this.formState.createUnitOfWork();t.set("newPassword",e).validate(),t.set("confirmNewPassword",""),t.updateFormState()}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=this.formState.createUnitOfWork().createModel();t&&alert(JSON.stringify(t))}}]),t}();exports.default=ChangePasswordForm;

},{"./RfsInput.jsx":3,"react":"react","react-bootstrap":"react-bootstrap","react-formstate":7,"react-formstate-validation":6}],3:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _objectWithoutProperties(e,t){var r={};for(var a in e)t.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(r[a]=e[a]);return r}Object.defineProperty(exports,"__esModule",{value:!0});var _extends=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},_react=require("react"),_react2=_interopRequireDefault(_react),_BootstrapInput=require("./BootstrapInput.jsx"),_BootstrapInput2=_interopRequireDefault(_BootstrapInput);exports.default=function(e){var t=e.className,r=e.required,a=e.fieldState,n=e.handleValueChange,o=(e.showValidationMessage,e.formState,_objectWithoutProperties(e,["className","required","fieldState","handleValueChange","showValidationMessage","formState"])),i=null;return a.isValid()&&(i=a.get("warn")?"warning":"success"),a.isValidating()&&(i="warning"),a.isInvalid()&&(i="error"),_react2.default.createElement(_BootstrapInput2.default,_extends({className:(t||"")+" "+(r?"required":""),controlId:a.getKey(),validationState:i,value:a.getValue(),onChange:function(e){return n(e.target.value)},help:a.getMessage()},o))};

},{"./BootstrapInput.jsx":1,"react":"react"}],4:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _react=require("react"),_react2=_interopRequireDefault(_react),_reactDom=require("react-dom"),_reactDom2=_interopRequireDefault(_reactDom),_DemoForm=require("./components/DemoForm.jsx"),_DemoForm2=_interopRequireDefault(_DemoForm);_reactDom2.default.render(_react2.default.createElement(_DemoForm2.default,null),document.getElementById("react-mount-point"));

},{"./components/DemoForm.jsx":2,"react":"react","react-dom":"react-dom"}],5:[function(require,module,exports){
module.exports = {
  email: '%1 must be an email address',
  equals: '%1 must equal %2',
  greaterThan: '%1 must be greater than %2',
  integer: '%1 must be an integer',
  length: '%1 must have length equal to %2',
  lessThan: '%1 must be less than %2',
  max: '%1 must be at most %2',
  maxLength: '%1 must have a maximum length of %2',
  min: '%1 must be at least %2',
  minLength: '%1 must have a minimum length of %2',
  number: '%1 must be a number',
  numeric: '%1 must only contain numbers',
  required: '%1 is required',
  startsWith: '%1 must start with %2',
  url: '%1 must be a url'
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationAdapter = exports.FormStateAdapter = exports.aliases = exports.content = exports.library = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _default = require('./content/en-us/default.js');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var library = exports.library = {
  email: function email(value) {
    return library.regex(value, /^\S+@\S+\.\S+$/);
  },
  equals: function equals(value, baseline) {
    return value === baseline;
  },
  exists: function exists(value) {
    return value !== undefined && value !== null;
  },
  greaterThan: function greaterThan(value, baseline) {
    return library.required(value) && Number(value) > baseline;
  },
  integer: function integer(value) {
    return library.regex(value, /^-?[0-9]+$/);
  },
  length: function length(value, len) {
    return library.exists(value) && library.exists(value.length) && value.length === len;
  },
  lessThan: function lessThan(value, baseline) {
    return library.required(value) && Number(value) < baseline;
  },
  max: function max(value, baseline) {
    return library.required(value) && Number(value) <= baseline;
  },
  maxLength: function maxLength(value, len) {
    return library.exists(value) && library.exists(value.length) && value.length <= len;
  },
  min: function min(value, baseline) {
    return library.required(value) && Number(value) >= baseline;
  },
  minLength: function minLength(value, len) {
    return library.exists(value) && library.exists(value.length) && value.length >= len;
  },
  number: function number(value) {
    return library.required(value) && !Number.isNaN(Number(value));
  },
  numeric: function numeric(value) {
    return library.regex(value, /^[0-9]+$/);
  },
  regex: function regex(value, pattern) {
    return library.required(value) && pattern.test(value);
  },
  required: function required(value) {
    return typeof value === 'string' && value.trim() !== '';
  },
  startsWith: function startsWith(value, searchString) {
    return library.required(value) && library.exists(searchString) && value.substr(0, searchString.length) === searchString;
  },
  url: function url(value) {
    // matches blank strings so you have a choice of pairing it with required
    if (value === null || typeof value === 'string' && value.trim() === '') {
      return true;
    }
    //
    // https://gist.github.com/dperini/729294
    //
    var re_weburl = new RegExp("^" +
    // protocol identifier
    "(?:(?:https?|ftp)://)" +
    // user:pass authentication
    "(?:\\S+(?::\\S*)?@)?" + "(?:" +
    // IP address exclusion
    // private & local networks
    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" + "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" + "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
    // host name
    '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
    // domain name
    '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
    // TLD identifier
    '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
    // TLD may end with dot
    "\\.?" + ")" +
    // port number
    "(?::\\d{2,5})?" +
    // resource path
    "(?:[/?#]\\S*)?" + "$", "i");
    return library.regex(value, re_weburl);
  }
};

exports.content = _default2.default;
var aliases = exports.aliases = [{ name: 'equals', alias: 'eq' }, { name: 'greaterThan', alias: 'gt' }, { name: 'integer', alias: 'int' }, { name: 'length', alias: 'len' }, { name: 'lessThan', alias: 'lt' }, { name: 'max', alias: 'lte' }, { name: 'maxLength', alias: 'maxlen' }, { name: 'maxLength', alias: 'xlen' }, { name: 'min', alias: 'gte' }, { name: 'minLength', alias: 'minlen' }, { name: 'minLength', alias: 'nlen' }];

var FormStateAdapter = exports.FormStateAdapter = function () {

  //
  // public
  //

  function FormStateAdapter(validationLibrary, messageContent, aliases) {
    _classCallCheck(this, FormStateAdapter);

    this.validationLibrary = validationLibrary;
    this.messageContent = messageContent;
    this.aliases = aliases;
  }

  _createClass(FormStateAdapter, [{
    key: 'plugInto',
    value: function plugInto(FormState) {
      if (this.validationLibrary.required) {
        FormState.setRequired(this.createFormStateValidationFunction('required'));
      }

      var names = Object.keys(this.validationLibrary);
      for (var i = 0, len = names.length; i < len; i++) {
        var name = names[i];
        FormState.registerValidation(name, this.createFormStateValidationFunction(name));
      }

      if (this.aliases && this.aliases.length) {
        for (var _i = 0, _len = this.aliases.length; _i < _len; _i++) {
          var alias = aliases[_i];
          FormState.registerValidation(alias.alias, this.createFormStateValidationFunction(alias.name));
        }
      }
    }

    //
    // "private"
    //

  }, {
    key: 'createFormStateValidationFunction',
    value: function createFormStateValidationFunction(name) {
      return function () {
        // value, label, additionalArgs
        var args = [].slice.call(arguments);
        var validate = this.validationLibrary[name];
        if (!validate.apply(undefined, [args[0]].concat(_toConsumableArray(args.slice(2))))) {
          return this.interpolateMessage(name, args.slice(1));
        }
      }.bind(this);
    }
  }, {
    key: 'interpolateMessage',
    value: function interpolateMessage(name, args) {
      var message = this.messageContent && this.messageContent[name];
      if (!message) {
        return args[0] + ' is invalid';
      }
      for (var i = 0, len = args.length; i < len; i++) {
        message = message.split('%' + (i + 1)).join('' + args[i]);
      }
      return message;
    }
  }]);

  return FormStateAdapter;
}();

var validationAdapter = exports.validationAdapter = new FormStateAdapter(library, _default2.default, aliases);

},{"./content/en-us/default.js":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormState = exports.FormExtension = exports.FormArray = exports.FormObject = exports.Form = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// "backlog"
// name='contacts[0][address][line1]'

//
// private functions, local to module
//

var FORM_STATE_PREFIX = 'formState.';

function prefix(path, name) {
  if (name === undefined) {
    return FORM_STATE_PREFIX + path;
  } else {
    return path ? path + '.' + name : name;
  }
}

function _getFieldState(state, key) {
  return state[prefix(key)];
}

function _setFieldState(state, key, _fieldState) {
  state[prefix(key)] = _fieldState;
}

function exists(v) {
  return v !== undefined && v !== null;
}

function findField(rootFields, key, readOnly) {
  var fields = rootFields,
      fieldnames = key.split('.'),
      len = fieldnames.length;

  var _loop = function _loop(i) {
    var objectField = fields.find(function (x) {
      return x.name === fieldnames[i];
    });
    if (!objectField) {
      if (readOnly) {
        return {
          v: null
        };
      }
      objectField = { key: fieldnames.slice(0, i + 1).join('.'), name: fieldnames[i], fields: [], initialized: false };
      fields.push(objectField);
    }
    fields = objectField.fields || objectField.array;
  };

  for (var i = 0; i < len - 1; i++) {
    var _ret = _loop(i);

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }

  var field = fields.find(function (x) {
    return x.name === fieldnames[len - 1];
  });
  if (!field) {
    if (readOnly) {
      return null;
    }
    field = { key: key, name: fieldnames[len - 1], initialized: false };
    fields.push(field);
  }
  return field;
}

function findFieldByFieldOrName(formState, fieldOrName) {
  if (exists(fieldOrName.name)) {
    return fieldOrName;
  } else {
    return findField(formState.getRootFields(), formState.buildKey(fieldOrName), true);
  }
}

function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function generateQuickGuid() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function iterateKeys(state, f) {
  var keys = Object.keys(state);
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    if (key.startsWith(FORM_STATE_PREFIX)) {
      if (f(key.replace(FORM_STATE_PREFIX, ''))) {
        break;
      }
    }
  }
}

function iterateFieldStates(state, f) {
  iterateKeys(state, function (key) {
    var fieldState = new FieldState(_getFieldState(state, key), key);
    if (!fieldState.isDeleted()) {
      return f(fieldState);
    }
  });
}

function anyFieldState(state, f) {
  var result = false;
  iterateFieldStates(state, function (fieldState) {
    if (f(fieldState)) {
      result = true;
      return true; // stop iterating
    }
  });
  return result;
}

function isObject(v) {
  return v !== null && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object';
}

function coerceToString(v) {
  if (!exists(v)) {
    return '';
  } // else
  if (v === true || v === false) {
    return v;
  } // else
  if (Array.isArray(v)) {
    return v.map(function (x) {
      return !exists(x) ? x : (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' ? x : x.toString();
    });
  } // else
  return v.toString();
}

function changeHandler(formState, field, e) {
  var context = formState.createUnitOfWork(),
      fieldState = context.getFieldState(field),
      value = fieldState.getValue(); // temporarily set to previous value

  if (field.handlerBindFunction) {
    if (typeof field.handlerBindFunction !== 'function') {
      throw new Error('you specified a handlerBindFunction that is not a function?');
    }
    value = field.handlerBindFunction(e);
  } else {
    if (!exists(e) || !exists(e.target) || !exists(e.target.type)) {
      throw new Error('you are using a non-standard html input for field ' + field.key + ' - please override the framework generated change handler or specify a handlerBindFunction prop. see the documentation for more details.');
    }
    if (Array.isArray(value)) {
      if (e.target.type === 'checkbox') {
        // checkbox group
        if (e.target.checked) {
          value = value.slice(0); // copy the existing array
          if (!value.some(function (x) {
            return x === e.target.value;
          })) {
            value.push(e.target.value);
            value.sort();
          }
        } else {
          value = value.filter(function (x) {
            return x !== e.target.value;
          });
        }
      } else {
        // select-multiple
        if (e.target.type !== 'select-multiple') {
          throw new Error('only select-multiple and checkbox group supported for array value types. you will need to override the framework event handler or request an enhancement');
        }
        value = [];
        var options = e.target.options;
        for (var i = 0, len = options.length; i < len; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
      }
    } else {
      if (e.target.type === 'checkbox') {
        value = e.target.checked;
      } else {
        // note that select-one and radio group work like every other input in this regard
        if (e.target.type === 'select-multiple') {
          throw new Error('a select-multiple input must have defaultValue={[]} specified');
        }
        value = e.target.value;
      }
    }
  }

  fieldState.setCoercedValue(value).validate();

  if (formState.rootFormState.updateCallback) {
    // accessing internals... clean this up?
    context.formState = formState.rootFormState;
    formState.rootFormState.updateCallback(context, field.key);
  } else {
    context.updateFormState();
  }
}

function simpleChangeHandler(formState, field, value) {
  var context = formState.createUnitOfWork(),
      fieldState = context.getFieldState(field);

  fieldState.setCoercedValue(value).validate();

  if (formState.rootFormState.updateCallback) {
    // accessing internals... clean this up?
    context.formState = formState.rootFormState;
    formState.rootFormState.updateCallback(context, field.key);
  } else {
    context.updateFormState();
  }
}

function blurHandler(formState, field) {
  var context = formState.createUnitOfWork(),
      fieldState = context.getFieldState(field);

  fieldState.showMessage();
  context.updateFormState();
}

//
// Form
//

var Form = exports.Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
  }

  _createClass(Form, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          formState = _props.formState,
          model = _props.model,
          otherProps = _objectWithoutProperties(_props, ['formState', 'model']);

      return _react2.default.createElement('form', otherProps, _react2.default.createElement(FormObject, { formState: formState, model: model }, this.props.children));
    }
  }]);

  return Form;
}(_react2.default.Component);

//
// FormObject
//

var FormObject = exports.FormObject = function (_React$Component2) {
  _inherits(FormObject, _React$Component2);

  function FormObject(props) {
    _classCallCheck(this, FormObject);

    var _this2 = _possibleConstructorReturn(this, (FormObject.__proto__ || Object.getPrototypeOf(FormObject)).call(this, props));

    if (_this2.props.nestedForm) {
      var nestedProps = _this2.props.nestedForm.props;
      _this2.formState = nestedProps.formState;
      _this2.validationComponent = _this2.props.nestedForm;
      _this2.labelPrefix = nestedProps.labelPrefix;

      if (nestedProps.formExtension) {
        _this2.formExtension = true;
      }

      if (exists(_this2.props.nestedForm.state)) {
        console.log('warning: nested react-formstate components should not manage their own state.');
      }
    } else {
      _this2.formState = _this2.props.formState;
      _this2.validationComponent = _this2.props.validationComponent || _this2.formState.form;
      _this2.labelPrefix = _this2.props.labelPrefix;

      _this2.formState.injectModelProp(_this2.props.model); // will only apply to root form state
    }

    _this2.addProps = _this2.addProps.bind(_this2);
    return _this2;
  }

  _createClass(FormObject, [{
    key: 'render',
    value: function render() {
      // to support dynamic removal, upon render, rebuild the field definitions
      if (!this.formExtension) {
        this.formState.clearFields();
      }

      return _react2.default.createElement('div', null, _react2.default.Children.map(this.props.children, this.addProps));
    }
  }, {
    key: 'addProps',
    value: function addProps(child) {
      if (!child || !child.props) {
        return child;
      } // else

      var props = null,
          formState = this.formState;

      if (exists(child.props.formField)) {
        props = this.createFieldProps(child.props);
      } else if (exists(child.props.formObject) || exists(child.props.formArray)) {
        props = this.createObjectProps(exists(child.props.formObject) ? child.props.formObject : child.props.formArray, child.props, exists(child.props.formArray));
        this.formState = props.formState;
      } else if (exists(child.props.formExtension)) {
        props = this.createExtensionProps(child.props);
      } else if (child.type === FormObject || child.type === FormArray) {
        if (!exists(child.props.name)) {
          throw new Error('a FormObject or FormArray element nested within the same render function should have a "name" property');
        }
        props = this.createObjectProps(child.props.name, child.props, child.type === FormArray);
        // let the child FormObject/FormArray create the appropriate props for its children
        return _react2.default.cloneElement(child, props, child.props.children);
      } else if (child.type === FormExtension) {
        throw new Error('a FormExtension element should not be nested within a Form, FormObject, or FormArray element in the same render function');
      }

      var result = _react2.default.cloneElement(child, props, child.props.children && _react2.default.Children.map(child.props.children, this.addProps));

      this.formState = formState;

      return result;
    }
  }, {
    key: 'createObjectProps',
    value: function createObjectProps(normalizedName, props, isArray) {
      normalizedName = normalizedName.toString();

      var formState = this.formState,
          key = formState.buildKey(normalizedName),
          field = findField(formState.getRootFields(), key);

      if (!field.initialized) {
        field.initialized = true;

        if (isArray) {
          field.array = [];
        } else {
          if (!field.fields) {
            field.fields = [];
          }
        }

        field.preferNull = Boolean(props.preferNull);
      }

      return {
        formState: formState.createFormState(normalizedName),
        validationComponent: this.validationComponent, // ignored by a nested COMPONENT
        labelPrefix: (this.labelPrefix || '') + (props.labelPrefix || '')
      };

      // this was a waste of time. react.cloneElement merges props. it doesn't replace them.
      //
      // let { name, formObject, formArray, labelPrefix, preferNull, ...newProps } = props;
      // newProps.formState = formState.createFormState(normalizedName);
      // newProps.validationComponent = this.validationComponent; // ignored by a nested COMPONENT
      // newProps.labelPrefix = (this.labelPrefix || '') + (props.labelPrefix || '');
      // return newProps;
    }
  }, {
    key: 'createExtensionProps',
    value: function createExtensionProps(props) {
      return {
        formState: this.formState,
        labelPrefix: (this.labelPrefix || '') + (props.labelPrefix || '')
      };
    }
  }, {
    key: 'createFieldProps',
    value: function createFieldProps(props) {

      // this was a waste of time. react.cloneElement merges props. it doesn't replace them.
      // let {formField,label,required,validate,etc,...newProps} = props;

      var fieldName = props.formField.toString(),
          formState = this.formState,
          key = formState.buildKey(fieldName),
          field = findField(formState.getRootFields(), key);

      if (!field.initialized) {
        field.initialized = true;
        field.label = (this.labelPrefix || '') + (props.label || '');
        if (props.required === '-') {
          field.required = false;
        } else {
          field.required = Boolean(props.required);
        }
        if (field.required && typeof props.required === 'string' && props.required.length > 0) {
          field.requiredMessage = props.required;
        }
        if (props.validate) {
          field.validate = props.validate;
        } else {
          var f = this.validationComponent['validate' + capitalize(field.name)];
          if (f) {
            field.validate = f;
          }
        }
        field.noTrim = Boolean(props.noTrim);
        field.preferNull = Boolean(props.preferNull);
        field.intConvert = Boolean(props.intConvert);
        if (exists(props.defaultValue)) {
          field.defaultValue = props.defaultValue;
        }
        field.noCoercion = Boolean(props.noCoercion);
        field.fsValidate = props.fsValidate || props.fsv;
        if (!field.fsValidate) {
          var _f = this.validationComponent['fsValidate' + capitalize(field.name)];
          if (_f) {
            field.fsValidate = _f;
          }
        }
        field.validationMessages = props.validationMessages || props.msgs;
        field.revalidateOnSubmit = Boolean(props.revalidateOnSubmit);

        if (typeof props.noCoercion === 'function') {
          field.handlerBindFunction = props.noCoercion;
        } else {
          field.handlerBindFunction = props.handlerBindFunction;
        }
      }

      return {
        label: field.label,
        fieldState: formState.getFieldState(field), // read-only
        updateFormState: props.updateFormState || changeHandler.bind(null, formState, field), // deprecated
        handleValueChange: props.handleValueChange || simpleChangeHandler.bind(null, formState, field),
        showValidationMessage: props.showValidationMessage || blurHandler.bind(null, formState, field),
        formState: this.formState
      };
    }
  }]);

  return FormObject;
}(_react2.default.Component);

//
// FormArray
//

var FormArray = exports.FormArray = function (_FormObject) {
  _inherits(FormArray, _FormObject);

  function FormArray() {
    _classCallCheck(this, FormArray);

    return _possibleConstructorReturn(this, (FormArray.__proto__ || Object.getPrototypeOf(FormArray)).apply(this, arguments));
  }

  return FormArray;
}(FormObject);

//
// FormExtension
//

var FormExtension = exports.FormExtension = function (_FormObject2) {
  _inherits(FormExtension, _FormObject2);

  function FormExtension() {
    _classCallCheck(this, FormExtension);

    return _possibleConstructorReturn(this, (FormExtension.__proto__ || Object.getPrototypeOf(FormExtension)).apply(this, arguments));
  }

  return FormExtension;
}(FormObject);

//
// FieldState
//

var FieldState = function () {

  //
  // "private"
  //

  function FieldState(_fieldState, key, field, isModified, stateContext) {
    _classCallCheck(this, FieldState);

    this.fieldState = _fieldState;
    this.key = key;
    this.field = field;
    this.isModified = isModified;
    this.stateContext = stateContext;
  }

  _createClass(FieldState, [{
    key: 'assertCanUpdate',
    value: function assertCanUpdate() {
      if (!this.stateContext) {
        throw new Error('Cannot update a read-only field state');
      }
      if (this.isDeleted()) {
        throw new Error('Cannot update a deleted field state.');
      }
    }
  }, {
    key: 'getValidity',
    value: function getValidity() {
      return this.fieldState.validity;
    }
  }, {
    key: 'getAsyncToken',
    value: function getAsyncToken() {
      return this.fieldState.asyncToken;
    }
  }, {
    key: 'setValueImp',
    value: function setValueImp(value, isCoerced) {
      if (this.isModified) {
        throw new Error('setting value on a modified field state? if you are changing the value do that first');
      }
      return this.setProps(value, Boolean(isCoerced));
    }
  }, {
    key: 'setProps',
    value: function setProps(value, isCoerced, validity, message, asyncToken, isMessageVisible) {
      this.assertCanUpdate();

      if (!this.isModified) {
        this.fieldState = {};
        this.isModified = true;
        _setFieldState(this.stateContext.stateUpdates, this.key, this.fieldState);
      }

      this.fieldState.value = value;
      this.fieldState.isCoerced = isCoerced;
      this.fieldState.validity = validity;
      this.fieldState.message = message;
      this.fieldState.asyncToken = asyncToken;
      this.fieldState.isMessageVisible = isMessageVisible;

      return this;
    }
  }, {
    key: 'callValidationFunction',
    value: function callValidationFunction(f) {
      if (typeof f === 'function') {
        return f(this.getValue(), this.stateContext, this.field);
      } // else
      throw new Error('validation provided for ' + this.getKey() + ' is not a function?');
    }
  }, {
    key: 'callRegisteredValidationFunction',
    value: function callRegisteredValidationFunction(f, params) {
      return f.apply(undefined, [this.getValue(), this.field.label].concat(_toConsumableArray(params)));
    }

    //
    // public
    //

  }, {
    key: 'equals',
    value: function equals(fieldState) {
      if (fieldState.getMessage() !== this.getMessage()) {
        return false;
      } // else
      if (fieldState.isMessageVisible() !== this.isMessageVisible()) {
        return false;
      } // else
      var a = fieldState.getValue(),
          b = this.getValue();
      if (!Array.isArray(a)) {
        return a === b;
      } // else
      return a.length === b.length && a.every(function (v, i) {
        return v === b[i];
      });
    }
  }, {
    key: 'get',
    value: function get(name) {
      return this.fieldState[name];
    }
  }, {
    key: 'getKey',
    value: function getKey() {
      return this.key;
    }
  }, {
    key: 'getName',
    value: function getName() {
      return this.field && this.field.name;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var value = this.fieldState.value;

      if (this.fieldState.isCoerced || this.field && this.field.noCoercion) {
        return value;
      }

      if (!exists(value) && this.field && Array.isArray(this.field.defaultValue)) {
        // if injected model.value is null and you are providing the value to, say, a select-multiple
        // note that you can use 'preferNull' to reverse this upon model generation
        return [];
      }

      return coerceToString(value);
    }
  }, {
    key: 'getUncoercedValue',
    value: function getUncoercedValue() {
      return this.fieldState.value;
    }
  }, {
    key: 'getMessage',
    value: function getMessage() {
      return this.fieldState.message;
    }
  }, {
    key: 'isCoerced',
    value: function isCoerced() {
      return Boolean(this.fieldState.isCoerced);
    }
  }, {
    key: 'isValidated',
    value: function isValidated() {
      return exists(this.fieldState.validity);
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      return this.fieldState.validity === 1;
    }
  }, {
    key: 'isInvalid',
    value: function isInvalid() {
      return this.fieldState.validity === 2;
    }
  }, {
    key: 'isValidating',
    value: function isValidating() {
      return this.fieldState.validity === 3;
    }
  }, {
    key: 'isUploading',
    value: function isUploading() {
      return this.fieldState.validity === 4;
    }
  }, {
    key: 'isDeleted',
    value: function isDeleted() {
      return Boolean(this.fieldState.isDeleted);
    }
  }, {
    key: 'isMessageVisible',
    value: function isMessageVisible() {
      return Boolean(this.fieldState.isMessageVisible);
    }
  }, {
    key: 'getField',
    value: function getField() {
      return this.field;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      return this.setValueImp(value, false);
    }
  }, {
    key: 'setCoercedValue',
    value: function setCoercedValue(value) {
      return this.setValueImp(value, true);
    }
  }, {
    key: 'validate',
    value: function validate() {
      // if there is no input for this fieldstate don't bother validating
      // you might be managing form state such that the inputs are dynamically shown or hidden based on that form state
      if (!this.field) {
        return this;
      }

      this.assertCanUpdate();

      if (this.field.validate && this.field.fsValidate) {
        console.log('warning: both validate and fsValidate defined on ' + this.field.key + '. fsValidate will be used.');
      }

      var message = void 0;
      if (this.field.required) {
        message = this.callRegisteredValidationFunction(FormState.required, []);
        if (message && this.field.requiredMessage) {
          message = this.field.requiredMessage;
        }
      }

      if (!message && this.field.fsValidate) {
        if (typeof this.field.fsValidate !== 'function') {
          throw new Error('fsValidate defined on ' + this.field.key + ' is not a function?');
        }
        var result = this.field.fsValidate(new FormStateValidation(this.getValue(), this.field.label), this.stateContext, this.field);
        if (typeof result === 'string') {
          message = result;
        } else {
          message = result && result._message;
        }
      } else if (!message && this.field.validate) {
        var f = this.field.validate,
            msgs = this.field.validationMessages;
        if (typeof f === 'string') {
          f = [f];
        }
        if (typeof msgs === 'string') {
          msgs = [msgs];
        }
        if (Array.isArray(f)) {
          for (var i = 0, len = f.length; i < len; i++) {
            var validationName = f[i],
                params = [];

            if (Array.isArray(validationName)) {
              params = validationName.slice(1);
              validationName = validationName[0];
            }

            var g = FormState.lookupValidation(validationName);
            if (g) {
              message = this.callRegisteredValidationFunction(g, params);
            } else {
              throw new Error('no validation function registered as ' + validationName);
            }
            if (message) {
              if (Array.isArray(msgs)) {
                if (typeof msgs[i] === 'string') {
                  message = msgs[i];
                }
              }
              break;
            }
          }
        } else {
          message = this.callValidationFunction(f);
        }
      }

      if (message) {
        return this.setInvalid(message);
      } // else
      return this.setValid();
    }

    // when you hit submit the message gets wiped by validation. use setValid instead.
    // setMessage(message) { return this.setProps(this.getValue(), this.isCoerced(), this.getValidity(), message, this.getAsyncToken(), this.isMessageVisible()); }

  }, {
    key: 'set',
    value: function set(name, value) {
      if (!this.isModified) {
        this.setProps(this.getValue(), this.isCoerced(), this.getValidity(), this.getMessage(), this.getAsyncToken(), this.isMessageVisible());
      }
      this.fieldState[name] = value;
      return this;
    }
  }, {
    key: 'setValid',
    value: function setValid(message) {
      return this.setProps(this.getValue(), this.isCoerced(), 1, message);
    }
  }, {
    key: 'setInvalid',
    value: function setInvalid(message) {
      return this.setProps(this.getValue(), this.isCoerced(), 2, message);
    }
  }, {
    key: 'setValidating',
    value: function setValidating(message, visible) {
      var asyncToken = generateQuickGuid();
      this.setProps(this.getValue(), this.isCoerced(), 3, message, asyncToken, exists(visible) ? visible : true);
      return asyncToken; // thinking this is more valuable than chaining
    }
  }, {
    key: 'setUploading',
    value: function setUploading(message) {
      return this.setProps(this.getValue(), this.isCoerced(), 4, message, null, true);
    }
  }, {
    key: 'showMessage',
    value: function showMessage() {
      // i don't think chaining adds any value to this method. can always change it later.
      if (exists(this.getMessage()) && !this.isMessageVisible()) {
        // prevents unnecessary rendering
        this.setProps(this.getValue(), this.isCoerced(), this.getValidity(), this.getMessage(), this.getAsyncToken(), true);
      }
    }
  }]);

  return FieldState;
}();

//
// FormState
//

var FormState = exports.FormState = function () {
  _createClass(FormState, null, [{
    key: 'setRequired',
    value: function setRequired(f) {
      if (typeof f !== 'function') {
        throw new Error('registering a required function that is not a function?');
      }
      this.required = f;
    }
  }, {
    key: 'registerValidation',
    value: function registerValidation(name, f) {
      if (typeof f !== 'function') {
        throw new Error('registering a validation function that is not a function?');
      }
      this.validators[name] = f;
      FormStateValidation.prototype[name] = function () {
        if (!this._message) {
          this._message = f.apply(undefined, [this.value, this.label].concat(Array.prototype.slice.call(arguments)));
          if (this._message) {
            this.canOverrideMessage = true;
          }
        } else {
          this.canOverrideMessage = false;
        }
        return this;
      };
    }
  }, {
    key: 'unregisterValidation',
    value: function unregisterValidation(name) {
      delete this.validators[name];
      delete FormStateValidation.prototype[name];
    }
  }, {
    key: 'lookupValidation',
    value: function lookupValidation(name) {
      return this.validators[name];
    }
  }, {
    key: 'createValidator',
    value: function createValidator(value, label) {
      return new FormStateValidation(value, label);
    }
  }]);

  function FormState(form) {
    var _this5 = this;

    _classCallCheck(this, FormState);

    this.form = form;
    this.path = null;
    this.rootFormState = this;
    this.fields = [];
    this.anyFieldState = function (f) {
      return anyFieldState(_this5.form.state, f);
    };
  }

  _createClass(FormState, [{
    key: 'createFormState',
    value: function createFormState(name) {
      var formState = new FormState(this.form);
      formState.path = this.buildKey(name);
      formState.rootFormState = this.rootFormState;
      formState.fields = undefined;
      return formState;
    }
  }, {
    key: 'injectModel',
    value: function injectModel(model) {
      return this.createUnitOfWork().injectModel(model);
    }
  }, {
    key: 'inject',
    value: function inject(state, model) {
      new UnitOfWork(this, state).injectModel(model);
    }
  }, {
    key: 'add',
    value: function add(state, name, value) {
      new UnitOfWork(this, state).add(name, value);
    }
  }, {
    key: 'remove',
    value: function remove(state, name) {
      new UnitOfWork(this, state).remove(name);
    }
  }, {
    key: 'isInvalid',
    value: function isInvalid(visibleMessagesOnly) {
      return this.anyFieldState(function (fi) {
        return fi.isInvalid() && (!visibleMessagesOnly || fi.isMessageVisible());
      });
    }
  }, {
    key: 'isValidating',
    value: function isValidating(visibleMessagesOnly) {
      return this.anyFieldState(function (fi) {
        return fi.isValidating() && (!visibleMessagesOnly || fi.isMessageVisible());
      });
    }
  }, {
    key: 'isUploading',
    value: function isUploading() {
      return this.anyFieldState(function (fi) {
        return fi.isUploading();
      });
    }
  }, {
    key: 'buildKey',
    value: function buildKey(name) {
      return prefix(this.path, name);
    }
  }, {
    key: 'getRootFields',
    value: function getRootFields() {
      return this.rootFormState.fields;
    }
  }, {
    key: 'getFieldState',
    value: function getFieldState(fieldOrName, asyncToken, stateContext) {
      var field = findFieldByFieldOrName(this, fieldOrName),
          key = field ? field.key : this.buildKey(fieldOrName),
          _fieldState = _getFieldState(this.form.state, key);

      // if model prop provided to root FormObject
      // decided not to replace a deleted fieldState here, hopefully that's the right call
      if (!_fieldState && this.rootFormState.flatModel) {
        _fieldState = _getFieldState(this.rootFormState.flatModel, key);
      }

      if (!_fieldState || _fieldState.isDeleted) {
        _fieldState = { value: null };

        if (field && field.defaultValue !== undefined) {
          _fieldState.value = field.defaultValue;
        }
      }

      if (asyncToken && _fieldState.asyncToken !== asyncToken) {
        return null;
      } else {
        return new FieldState(_fieldState, key, field, false, stateContext);
      }
    }
  }, {
    key: 'get',
    value: function get(name) {
      return this.getFieldState(name).getValue();
    }
  }, {
    key: 'getu',
    value: function getu(name) {
      return this.getFieldState(name).getUncoercedValue();
    }
  }, {
    key: 'isDeleted',
    value: function isDeleted(name) {
      var _fieldState = _getFieldState(this.form.state, this.buildKey(name));
      return Boolean(_fieldState && _fieldState.isDeleted);
    }
  }, {
    key: 'createUnitOfWork',
    value: function createUnitOfWork() {
      return new UnitOfWork(this);
    }
  }, {
    key: 'clearFields',
    value: function clearFields() {
      if (this === this.rootFormState) {
        this.fields.length = 0;
      }
    }
  }, {
    key: 'onUpdate',
    value: function onUpdate(f) {
      if (typeof f !== 'function') {
        throw new Error('adding an update callback that is not a function?');
      }
      if (this !== this.rootFormState) {
        throw new Error('cannot add an update callback to nested form state');
      }
      this.updateCallback = f;
    }
  }, {
    key: 'injectModelProp',
    value: function injectModelProp(model) {
      if (this === this.rootFormState) {
        if (!this.flatModel) {
          // one-time only
          if (isObject(model)) {
            if (isObject(this.form.state) && Object.keys(this.form.state).some(function (k) {
              return k.startsWith(FORM_STATE_PREFIX);
            })) {
              console.log('warning: react-formstate: a model prop was provided to the root FormObject element even though a model was injected in the constructor?');
            }
            this.flatModel = this.createUnitOfWork().injectModel(model);
          } else {
            this.flatModel = {};
          }
        }
      }
    }
  }]);

  return FormState;
}();

FormState.required = function (value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return 'Required field';
  }
};

FormState.validators = {};

//
// UnitOfWork
//

var UnitOfWork = function () {

  //
  // "private"
  //

  function UnitOfWork(formState, state) {
    _classCallCheck(this, UnitOfWork);

    this.formState = formState;
    this.stateUpdates = state || {};
  }

  _createClass(UnitOfWork, [{
    key: 'recursiveCreateModel',
    value: function recursiveCreateModel(fields, model) {
      var isModelValid = true;

      for (var i = 0, len = fields.length; i < len; i++) {
        var value = void 0,
            field = fields[i];

        if (field.fields || field.array) {
          // nested object
          if (field.fields) {
            value = {};
          } else {
            value = [];
          }

          var formState = this.formState;
          this.formState = formState.createFormState(field.name);
          if (!this.recursiveCreateModel(field.fields || field.array, value)) {
            isModelValid = false;
          }
          this.formState = formState;
        } else {
          var fieldState = this.getFieldState(field);

          if (!fieldState.isValidated() || field.revalidateOnSubmit) {
            fieldState.validate();
          }
          fieldState.showMessage();
          if (!fieldState.isValid()) {
            isModelValid = false;
          }
          if (!isModelValid) {
            continue;
          } // else

          value = fieldState.getValue();

          if (field.intConvert) {
            value = Array.isArray(value) ? value.map(function (x) {
              return parseInt(x);
            }) : parseInt(value);
          }

          if (typeof value === 'string') {
            if (!field.noTrim) {
              value = value.trim();
            }
            if (field.preferNull && value === '') {
              value = null;
            }
          }
        }

        if (field.preferNull) {
          if (Array.isArray(value)) {
            if (value.length === 0) {
              value = null;
            }
          } else if (isObject(value)) {
            if (Object.keys(value).length === 0) {
              value = null;
            }
          }
        }

        if (Array.isArray(model)) {
          model.push(value);
        } else {
          model[field.name] = value;
        }
      }

      return isModelValid;
    }

    //
    // public
    //

  }, {
    key: 'getFieldState',
    value: function getFieldState(fieldOrName, asyncToken) {
      var field = findFieldByFieldOrName(this.formState, fieldOrName),
          key = field ? field.key : this.formState.buildKey(fieldOrName),
          _fieldState = _getFieldState(this.stateUpdates, key);

      if (_fieldState) {
        return new FieldState(_fieldState, key, field, true, this);
      } else {
        return this.formState.getFieldState(field ? field : fieldOrName, asyncToken, this);
      }
    }
  }, {
    key: 'get',
    value: function get(name) {
      return this.getFieldState(name).getValue();
    }
  }, {
    key: 'getu',
    value: function getu(name) {
      return this.getFieldState(name).getUncoercedValue();
    }
  }, {
    key: 'set',
    value: function set(name, value) {
      return this.getFieldState(name).setValue(value);
    }
  }, {
    key: 'setc',
    value: function setc(name, value) {
      return this.getFieldState(name).setCoercedValue(value);
    }
  }, {
    key: 'updateFormState',
    value: function updateFormState(additionalUpdates) {
      if (additionalUpdates) {
        this.formState.form.setState(Object.assign(this.stateUpdates, additionalUpdates));
      } else if (Object.keys(this.stateUpdates).length > 0) {
        this.formState.form.setState(this.stateUpdates);
      }
    }
  }, {
    key: 'add',
    value: function add(name, value) {
      if (isObject(value)) {
        var formState = this.formState;
        this.formState = formState.createFormState(name);
        this.injectModel(value);
        this.formState = formState;
      }

      // at this point there is no way to know how an array value will be used by the jsx.
      // will it be for a FormArray or for a select-multiple or checkbox group?
      // to cover either case, add an additional fieldState record for array values below.
      // understand that the jsx will define the model that gets generated,
      // so the extraneous fieldState entries should be harmless since they won't be referenced.
      // that is, assuming isInvalid() is sufficient wrt the api...
      // if formState.isValid() becomes necessary this could be problematic.

      if (!isObject(value) || Array.isArray(value)) {
        var _fieldState = { value: value };
        _setFieldState(this.stateUpdates, this.formState.buildKey(name), _fieldState);
      }

      return this.stateUpdates; // for transforming form state in form component constructor
    }
  }, {
    key: 'remove',
    value: function remove(name) {
      var _this6 = this;

      var key = this.formState.buildKey(name);

      _setFieldState(this.stateUpdates, key, { isDeleted: true });

      // remove the whole branch

      var keyDot = key + '.';

      iterateKeys(this.formState.form.state, function (key) {
        if (key.startsWith(keyDot)) {
          _setFieldState(_this6.stateUpdates, key, { isDeleted: true });
        }
      });
    }
  }, {
    key: 'injectModel',
    value: function injectModel(model) {
      model = model || {};

      if ((typeof model === 'undefined' ? 'undefined' : _typeof(model)) !== 'object') {
        throw new Error('injectModel only accepts object types (including arrays)');
      }

      // a place to hold deleted status and validation messages
      _setFieldState(this.stateUpdates, this.formState.path || '', {});

      if (Array.isArray(model)) {
        for (var i = 0, len = model.length; i < len; i++) {
          this.add(i.toString(), model[i]);
        }
      } else {
        var names = Object.keys(model);

        for (var _i = 0, _len = names.length; _i < _len; _i++) {
          var name = names[_i];
          this.add(name, model[name]);
        }
      }

      return this.stateUpdates;
    }
  }, {
    key: 'createModel',
    value: function createModel(noUpdate) {
      if (this.formState !== this.formState.rootFormState) {
        throw new Error('createModel should only be called on root form state.');
      }

      var model = {},
          isModelValid = this.recursiveCreateModel(this.formState.getRootFields(), model);

      if (isModelValid) {
        return model;
      } // else

      if (!noUpdate) {
        this.updateFormState();
      }
      return null;
    }
  }]);

  return UnitOfWork;
}();

//
// FormStateValidation
//

var FormStateValidation = function () {
  function FormStateValidation(value, label) {
    _classCallCheck(this, FormStateValidation);

    this.value = value;
    this.label = label;
    this.canOverrideMessage = false;
  }

  _createClass(FormStateValidation, [{
    key: 'message',
    value: function message(messageOverride) {
      if (typeof messageOverride === 'string' && messageOverride.trim() !== '' && this.canOverrideMessage) {
        this._message = messageOverride;
      }
      this.canOverrideMessage = false;
      return this;
    }
  }, {
    key: 'msg',
    value: function msg(messageOverride) {
      return this.message(messageOverride);
    }
  }]);

  return FormStateValidation;
}();

},{"react":"react"}],"react-bootstrap":[function(require,module,exports){
"use strict";module.exports=window.ReactBootstrap;

},{}],"react-dom":[function(require,module,exports){
"use strict";module.exports=window.ReactDOM;

},{}],"react":[function(require,module,exports){
"use strict";module.exports=window.React;

},{}]},{},[4]);
