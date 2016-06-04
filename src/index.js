//----------------------------------------------------------------------
//
// This source file is part of the Folktale project.
//
// See LICENCE for licence information.
// See CONTRIBUTORS for the list of contributors to the project.
//
//----------------------------------------------------------------------


// --[ Constants ]------------------------------------------------------
const FIELDS = Symbol('struct-type:fields');
const TAG    = Symbol('struct-type:tag');
const ROOT   = Symbol('struct-type:root');

const freeze = Object.freeze;
const create = Object.create;
const keys   = Object.keys;
const define = Object.defineProperty;


// --[ Global state ]--------------------------------------------------
let structTag = 0;


// --[ Helpers ]-------------------------------------------------------
const capitalise = (name) => 
  name.slice(0, 1).toUpperCase() + name.slice(1); 

const checkType = (type) => (value) => {
  if (typeof value !== type) {
    throw new TypeError(`Expected a ${type}, but got ${value}, which is a ${typeof value}.`);
  }
  
  return value;
};


// --[ Struct definitions ]--------------------------------------------
const struct = (name, fields) => {
  let result = create(null);

  result[FIELDS] = keys(fields).sort();
  result[ROOT]   = result;
  result[TAG]    = ++structTag;
  
  const fieldSet   = new Set(result[FIELDS]);
  
  result.toString = () => `[object Struct<${name}>]`;

  result.type = (value) => {
    if (value && value[TAG] === result[TAG]) {
      return value;
    } else {
      throw new TypeError(`Expected a ${name} struct, got ${value}`);
    }
  };

  result.make = (values) => {
    const provided    = keys(values).sort();
    const providedSet = new Set(provided);
    const missing     = result[FIELDS].filter(x => !providedSet.has(x));
    const extraneous  = provided.filter(x => !fieldSet.has(x));
    
    if (missing.length > 0 || extraneous.length > 0) {
      const missingMessage = 
        missing.length > 0 ? `\n\nThe following fields are missing:\n\n    ${missing.join(', ')}` 
        :                    '';
        
      const extraneousMessage =
        extraneous.length > 0 ? `\n\nThe following fields don't exist in ${name} (maybe you have a typo?):\n\n    ${extraneous.join(', ')}`
        :                       ''; 
      
      throw new TypeError(`Incorrect fields provided for constructing the struct ${name}.
      
${name} expects the following fields:

    ${result[FIELDS].join(', ')}
    
The following fields were provided to it instead:

    ${provided.join(', ')}
${missingMessage}${extraneousMessage}`);
    }

    let instance = create(proto);
    keys(values).forEach(key => instance[key] = fields[key](values[key]));
    return freeze(instance);
  };

  let proto = Object.create(result);
  result[FIELDS].forEach(field => {
    const validation = fields[field];
    proto[`set${capitalise(field)}`] = function(value) {
      let instance = create(this);
      define(instance, field, { value: validation(value), enumerable: true });
      return freeze(instance);
    };
  });
  
  proto.toObject = function() {
    let instance = {};
    result[FIELDS].forEach(field => instance[field] = this[field]);
    return instance;
  };
  
  return freeze(result);
};

struct.types = {
  Any: (x) => x,
  Number: checkType('number'),
  String: checkType('string'),
  Boolean: checkType('boolean'),
  Array: (x) => {
    if (!Arra.isArray(x)) {
      throw new TypeError(`Expected an array, but got ${x}.`);
    }
    return x;
  }
};


module.exports = struct;