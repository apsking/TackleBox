/**
 * TackleBox.js: Web Development Tool Overlay
 * https://github.com/apsking/Tacklebox.js
 * Licensed under the MIT license.
 *
 * @version 1.0
 * @author Alex King
 * @url http://www.gotalex.com
 * @createdate Wed Jun 30 2016 13:30:45 PST-0800
 * @lastupdated Tues July 5 2016 11:55:45 PST-0800
 *
 * Inspired by work with Zach Baker
 *
 */

 /////////////////////////////////////////////////////////////////////////
////////////////////     INITIALIZE DOM ELEMENTS       //////////////////
/////////////////////////////////////////////////////////////////////////
var tacklebox = new TackleBox(); //NO NOT MODIFY THIS LINE
tacklebox.init(); //NO NOT MODIFY THIS LINE

/////////////////////////////////////////////////////////////////////////
//////////////////////         ADD FUNCTIONS        /////////////////////
/////////////////////////////////////////////////////////////////////////
tacklebox.add_btn('Fn 1', 'Function One clicked!', fn1);
tacklebox.add_btn('Fn 2', null, fn2); //this function doesn't have a toast
tacklebox.add_btn('Fn 3', null, fn3); //neither does this one!
tacklebox.add_btn('Fn 4', 'Function Four clicked!', fn4);
tacklebox.add_btn('Fn 5', 'Function Five clicked!', fn5);
tacklebox.add_btn('All', null, fn_all);

/* Generic function wrappers defined below.
   HOW TO USE:To modify: call custom function within predefined fn# function or
   create your own and assign as add_tackle_btn parameter above. */
function fn1(){ }
function fn2(){ }
function fn3(){ }
function fn4(){ }
function fn5(){ }

/////////////////////////////////////////////////////////////////////////
////////////////////       INITIALIZE TACKLEBOX       ///////////////////
/////////////////////////////////////////////////////////////////////////
function TackleBox(){
  this._initialized = false;
  this._toastTimeout = 2000;

  /*Initialize all tacklebox elements*/
  this.init = function(){
    //check if elements already exist. Only one of each can exist
    var existingPane = document.getElementById('tacklebox-pane');
    var existingToast = document.getElementById('tacklebox-toast');
    var existingToastMsg = document.getElementById('tacklebox-msg');
    var existingStyle = document.getElementsByClassName('tacklebox-style');

    //create DOM elements
    var pane = document.createElement('div');
    pane.id = 'tacklebox-pane';

    var toast = document.createElement('div');
    toast.id = 'tacklebox-toast';

    var msg = document.createElement('div');
    msg.id = 'tacklebox-msg';

    //insert elements into DOM
    var body = document.getElementsByTagName('body');

    if(!existingPane){
      document.body.appendChild(pane);
    }else{
      console.log(_formatMessage('warn', "TackleBox pane already exists"))
    }

    if(!existingToast){
      document.body.appendChild(toast);
    }else{
      console.log(_formatMessage('warn', "TackleBox toast already exists"))
    }

    if(!existingToastMsg){
      toast.appendChild(msg);
    }else{
      console.log(_formatMessage('warn', "TackleBox toast message already exists"))
    }

    //insert stylesheet
    //to update: modify tacklebox.less file, compile css and minify;
    //then, assign minified string to tackleboxStyle
    if(!existingToastMsg){
      var tackleboxStyle = '#tacklebox-pane{background-color:#039be5;box-shadow:0 6px 12px rgba(0,0,0,0.25),0 4px 4px rgba(0,0,0,0.22);box-sizing:initial !important;min-height:40px;left:0;padding:10px 10px 3px 10px;position:fixed;top:0;z-index:1000000}#tacklebox-pane button{background-color:#fff;border:none;box-shadow:0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24);font:10pt "Gill Sans","Gill Sans MT",Calibri,sans-serif;height:40px;margin-bottom:7px;margin-right:7px;outline:0;transition:all .3s cubic-bezier(.25, .8, .25, 1);min-width:40px}#tacklebox-pane button:nth-last-of-type(1){margin-right:0}#tacklebox-pane button:hover{box-shadow:0 10px 20px rgba(0,0,0,0.25),0 7px 7px rgba(0,0,0,0.22)}#tacklebox-pane button:active,#tacklebox-pane button:focus{box-shadow:0 4px 8px rgba(0,0,0,0.25),0 4px 4px rgba(0,0,0,0.22)}#tacklebox-msg{display:table-cell;font:11pt "Gill Sans","Gill Sans MT",Calibri,sans-serif;vertical-align:middle}#tacklebox-toast{box-shadow:0 6px 12px rgba(0,0,0,0.25),0 4px 4px rgba(0,0,0,0.22);position:fixed;min-height:40px;max-width:50%;padding:10px 15px;background-color:#039be5;right:0;top:0;vertical-align:middle;opacity:0;transition:.5s opacity;display:table;z-index:1000001}#tacklebox-toast.open{opacity:1;transition:.25s opacity}';
      _addStyleString(tackleboxStyle);
    }

    this._initialized = true;
  };

  /* Add a button to the tacklebox */
  this.add_btn = function(btn_name, toast_msg, fn){
    //check isInitialized
    if(!this._initialized){
      return _formatMessage('error', "TackleBox is not initialized.");
    }
    //check parameters
    if(typeof btn_name == 'undefined' ||
       typeof toast_msg == 'undefined' ||
       typeof fn == 'undefined'){
         return _formatMessage('error', "TackleBox.add_btn() requires three paramaters: btn_name, toast_msg, and fn.");
       }

    //get parent pane
    var tacklePane = document.getElementById("tacklebox-pane");

    //calculate unique number of new button
    var newButtonNumber = document.getElementsByClassName('tacklebox-btn').length + 1;

    //create button element
    var btn = document.createElement('button');
    btn.className = 'tacklebox-btn';
    btn.id = 'tacklebox-btn-' + newButtonNumber;
    btn.innerHTML = btn_name;

    //add button to DOM
    tacklePane.appendChild(btn);

    //assign click handler
    var $this = this;
    var func = function(){
      fn();
      $this.make_toast(toast_msg);
    }
    _addEvent(btn, 'click', func);
  };

  /* Remove a button from the tacklebox */
  this.remove_btn = function(btn_id){
    //get parent pane
    var tacklePane = document.getElementById("tacklebox-pane");

    //get button to remove
    var btnToRemove = document.getElementById(btn_id);

    //stop, if no button is found
    if(btnToRemove === null){ return errorMessage("Unable to find button in DOM."); }

    //remove event listener to prevent memory leak
    btnToRemove.removeEventListener('click', btnToRemove.onclick);

    //remove button
    tacklePane.removeChild(btnToRemove);

  };

/* Destroy TackleBox object and remove from DOM */
  this.destroy = function(){
    //stop if already destroyed
    if(!this._initialized){
      return;
    }

    //get all created objects
    var tacklePane = document.getElementById("tacklebox-pane");
    var tackleToast = document.getElementById("tacklebox-toast");
    var tackleMsg = document.getElementById("tacklebox-msg");

    //destroy toast message
    tackleToast.removeChild(tackleMsg);

    //destroy toast container
    document.body.removeChild(tackleToast)

    //destroy all buttons
    var tackleButtons = document.getElementsByClassName("tacklebox-btn")
    while (tackleButtons.length > 0) {
      tacklePane.removeChild(tackleButtons[0]);
    }

    //destroy tacklebox pane
    document.body.removeChild(tacklePane);

    //destroy tacklebox stylesheet
    var tackleStyle = document.getElementsByClassName("tacklebox-style")
    while (tackleStyle.length > 0) {
      document.body.removeChild(tackleStyle[0]);
    }

    //update initialized setting
    this._initialized = false;
  };

  /* Make a toast popup with a given message*/
  this.make_toast = function (msg){
    //Don't make toast without a message
    if(typeof msg === 'undefined' || msg === null) { return; }

    //get DOM elements to make toast
    var toast_pane = document.getElementById('tacklebox-toast');
    var toast_msg = document.getElementById('tacklebox-msg');

    //set toast message
    toast_msg.innerHTML = msg;

    //show the toast message
    toast_pane.className = 'open';

    //remove the toast message in 2s
    setTimeout(function(){
      toast_pane.className = '';
    }, this._toastTimeout);
  };

  /* Set toast timeout (in milliseconds)*/
  this.setToastTimeout = function(milliseconds){
    //safely bound parameter
    if(typeof milliseconds === 'undefined' ||
              milliseconds === null ||
              !isInt(milliseconds) ||
              milliseconds <= 0) {
      return _formatMessage('error', "Toast timeout must be a non-zero, positive integer.");
    }else{
      this._toastTimeout = milliseconds;
    }

    return milliseconds;
  }
}

/////////////////////////////////////////////////////////////////////////
//////////////////////       HELPER FUNCTIONS       /////////////////////
/////////////////////////////////////////////////////////////////////////

/* Call all of the functions assigned to buttons in the TackleBox pane.*/
function fn_all(){
  //get tacklebox-pane which contains all buttons
  var pane = document.getElementById("tacklebox-pane");

  //iterate through each button
  for(var i = 0; i < pane.children.length; i++){
    var child = pane.children[i];

    //if button is not the 'all fn' button, fire its event
    if(child.id != 'tacklebox-btn-all'){
      child.click();
    }
  }
}

/* Safe assignment of event handlers*/
function _addEvent(element, evnt, funct){
  if (element.attachEvent)
   return element.attachEvent('on'+evnt, funct);
  else
   return element.addEventListener(evnt, funct, false);
}

/* Add stylesheed from string*/
function _addStyleString(str) {
    var stylesheet = document.createElement('style');
    stylesheet.className = "tacklebox-style";
    stylesheet.innerHTML = str;
    document.body.appendChild(stylesheet);
}

/* Format message string*/
function _formatMessage(type, msg){
  var msgPrepend = "";
  if(typeof msg == 'undefined' || msg === null){
    msg = "";
  }

  //Prepend error/warning label if type is set
  if(type === 'warn'){
    msgPrepend = "WARN: ";
  }else if(type === 'error'){
    msgPrepend = "ERROR: ";
  }

  return msgPrepend + msg
}

/* Validate integer*/
function isInt(value) {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
}
