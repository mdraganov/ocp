'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var thingCtrlStub = {
  index: 'thingCtrl.index',
  show: 'thingCtrl.show',
  create: 'thingCtrl.create',
  update: 'thingCtrl.update',
  destroy: 'thingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var thingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './thing.controller': thingCtrlStub
});

describe('Ad API Router:', function() {

  it('should return an express router instance', function() {
    expect(thingIndex).to.equal(routerStub);
  });

  describe('GET /api/ads', function() {

    it('should route to ad.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'adCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/ads/:id', function() {

    it('should route to ad.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'adCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/ads', function() {

    it('should route to ad.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'adCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/ads/:id', function() {

    it('should route to ad.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'adCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ads/:id', function() {

    it('should route to ad.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'adCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ads/:id', function() {

    it('should route to ad.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'adCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
