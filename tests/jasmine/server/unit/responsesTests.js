describe('Responses', function() {
  'use strict';

  beforeEach(function () {
    MeteorStubs.install();
    mock(global, 'Responses');
  });

  afterEach(function () {
    MeteorStubs.uninstall();
  });
});
