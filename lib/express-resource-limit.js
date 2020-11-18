'use strict';

function ResourceLimit(options) {


  /**
   *
   **/

  const defaults = {
    skip: function () {
      return false;
    }
  };

  options = Object.assign(defaults, options);



  /**
   *
   **/

  async function middleware(req, res, next) {

    const skipped = await Promise.resolve(options.skip(req, res));
    if (skipped) {
      return next();
    }

    // TODO: Other Logic

    return next();

  }

  return middleware;

}

module.exports = ResourceLimit;
