/////////////////////////////////////////////////////////////////////////
////////////////////       JASMINE TEST CASES         ///////////////////
/////////////////////////////////////////////////////////////////////////
describe( "TackleBox.js Plugin", function () {
  var tacklebox; //define TackleBox object

  //initialize TackleBox before every test case
  beforeAll(function() {
    tacklebox = new TackleBox();
    tacklebox.init();
  });

  //destroy DOM object after every case to reset
  afterAll(function() {
    tacklebox.destroy();
  });

  describe('All TackleBox DOM elements are created', function () {
    it('creates TackleBox Pane element', function () {
      expect($('#tacklebox-pane')).toBeInDOM();
    });

    it('creates TackleBox Toast element', function () {
      expect($('#tacklebox-toast')).toBeInDOM();
    });

    it('creates TackleBox Toast Message element', function () {
      expect($('#tacklebox-msg')).toBeInDOM();
    });
});

  describe("TackleBox Add Button", function () {
    it('creates TackleBox button with message', function () {
      tacklebox.add_btn('MyName', 'Toast!', alert)
      expect($('#tacklebox-btn-1')).toBeInDOM();
    });

    it('creates TackleBox button without message', function () {
      tacklebox.add_btn('MyName', null, alert)
      expect($('#tacklebox-btn-1')).toBeInDOM();
    });
  });
});
