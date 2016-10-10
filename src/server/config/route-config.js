(function (routeConfig) {

  'use strict';

  routeConfig.init = function (app) {

    // *** routes *** //
    const index = require('../routes/index');
    const shops = require('../routes/shops');

    // *** register routes *** //
    app.use('/', index);
    app.use('/shops', shops);

  };

})(module.exports);
