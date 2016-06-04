struct-type
===========

[![Chat on Gitter](https://img.shields.io/gitter/room/origamitower/discussion.svg?style=flat-square)](https://gitter.im/origamitower/discussion)
[![Build status](https://img.shields.io/travis/origamitower/struct-type/master.svg?style=flat-square)](https://travis-ci.org/origamitower/struct-type)
[![NPM version](https://img.shields.io/npm/v/struct-type.svg?style=flat-square)](https://npmjs.org/package/struct-type)
[![Dependencies status](https://img.shields.io/david/origamitower/struct-type.svg?style=flat-square)](https://david-dm.org/origamitower/struct-type)
![Licence](https://img.shields.io/npm/l/refinable.svg?style=flat-square&label=licence)
![Stability: Stable](https://img.shields.io/badge/stability-experimental-oranga.svg?style=flat-square)

A restricted Struct type for JavaScript.


## Example

```js
const struct = require('struct-type');
const t = struct.types;

const Point2d = struct('Point2d', {
  x: t.Any,
  y: t.Any
});

// Make new instances with `.make`
const p1 = Point2d.make({ x: 1, y: 2 });
const p2 = Point2d.make({ x: 2, y: 2 });

// Update fields with `set<Field>`. 
// This constructs a new prototype-based shallow copy (with Object.create):
const p1_2 = p1.setX(2);
p1;   // ==> { x: 1, y: 2 }
p1_2; // ==> { x: 2, __proto__: p1 }

// Flatten structs into regular objects to pass to APIs expecting regular JS objects:
p1_2.toObject();
// ==> { x: 2, y: 2, __proto__: null }

// Each struct gets its own type function:
const Line = struct('Line', {
  start: Point2d.type,
  end: Point2d.type
});

const line = Line.make({ start: p1, end: p2 });
```

## Installation

The officially supported way of getting Refinable is through [npm][]:

    $ npm install struct-type

> **NOTE**
>
> If you don't have npm, you'll need to install [Node.js][] in your
> system before installing Refinable.

A tool like [Browserify][] or [Webpack][] can be used to run Refinable in
platforms that don't implement Node-style modules, like the Browser.

[Node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com
[Browserify]: http://browserify.org/
[Webpack]: https://webpack.github.io/


## Supported platforms

Refinable is supported in all platforms that support ECMAScript 5.


> **NOTE**  
> For platforms that don't support ECMAScript 5, (like IE8 and 9) the
> [es5-shim][] library can be used to provide the additional runtime
> support.

[es5-shim]: https://github.com/es-shims/es5-shim


## Support

If you think you've found a bug in the project, or want to voice your
frustration about using it (maybe the documentation isn't clear enough? Maybe
it takes too much effort to use?), feel free to open a new issue in the
[Github issue tracker](https://github.com/origamitower/struct-type/issues).

Pull Requests are welcome. By submitting a Pull Request you agree with releasing
your code under the MIT licence.

You can join the [Gitter Channel](https://gitter.im/origamitower/discussion) for
quick support. You may also contact the author directly through
[email](mailto:queen@robotlolita.me), or
[Twitter](https://twitter.com/robotlolita).

Note that all interactions in this project are subject to Origami Tower's
[Code of Conduct](https://github.com/origamitower/struct-type/blob/master/CODE_OF_CONDUCT.md).


## Licence

struct-type is copyright (c) Quildreen Motta 2016, and released under the MIT licence. See the `LICENCE` file in this repository for detailed information.
