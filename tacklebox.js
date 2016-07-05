/**
 * TackleBox.js: Web Development Tool Overlay
 * https://github.com/apsking/Tacklebox.js
 *Licensed under the MIT license.
 *
 * @version 1.0
 * @author Alex King
 * @url http://www.gotalex.com
 * @createdate Wed Jun 30 2016 13:30:45 PST-0800
 *
 * Inspired by work with Zach Baker
 *
 * Example Usage:
 * Reference tacklebox.js from any existing webpage during development to
 * use as an addition set of easy-to-access tools
 *
 * Insert from local .JS:
 *
 * <script src="./src/tacklebox.js"></script>
 */

 /////////////////////////////////////////////////////////////////////////
////////////////////     INITIALIZE DOM ELEMENTS       //////////////////
/////////////////////////////////////////////////////////////////////////
var tacklebox = new TackleBox(); //NO NOT MODIFY THIS LINE

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
  /*Initialize all tacklebox elements*/
  this.init = function(){
    //create DOM elements
    var pane = document.createElement('div');
    pane.id = 'tacklebox-pane';

    var toast = document.createElement('div');
    toast.id = 'tacklebox-toast';

    var msg = document.createElement('div');
    msg.id = 'tacklebox-msg';

    //insert elements into DOM
    var body = document.getElementsByTagName('body');
    document.body.appendChild(pane);
    toast.appendChild(msg);
    document.body.appendChild(toast);

    //insert stylesheet
    //to update: modify tacklebox.less file, compile css and minify;
    //then, assign minified string to tackleboxStyle
    var tackleboxStyle = '#tacklebox-pane{background-color:#039be5;box-shadow:0 6px 12px rgba(0,0,0,0.25),0 4px 4px rgba(0,0,0,0.22);height:60px;left:0;padding:10px;position:fixed;top:0;z-index:1000000}#tacklebox-pane button{background-color:#fff;border:none;box-shadow:0 1px 3px rgba(0,0,0,0.12),0 1px 2px rgba(0,0,0,0.24);font:10pt "Gill Sans","Gill Sans MT",Calibri,sans-serif;height:40px;margin-right:7px;outline:0;transition:all .3s cubic-bezier(.25, .8, .25, 1);width:40px}#tacklebox-pane button:nth-last-of-type(1){margin-right:0}#tacklebox-pane button:hover{box-shadow:0 10px 20px rgba(0,0,0,0.25),0 7px 7px rgba(0,0,0,0.22)}#tacklebox-pane button:active,#tacklebox-pane button :focus{box-shadow:0 4px 8px rgba(0,0,0,0.25),0 4px 4px rgba(0,0,0,0.22)}#tacklebox-msg{display:table-cell;font:11pt "Gill Sans","Gill Sans MT",Calibri,sans-serif;vertical-align:middle}#tacklebox-toast{box-shadow:0 6px 12px rgba(0,0,0,0.25),0 4px 4px rgba(0,0,0,0.22);position:fixed;min-height:60px;max-width:50%;padding:10px 15px;background-color:#039be5;right:0;top:0;vertical-align:middle;opacity:0;transition:.5s opacity;display:table}#tacklebox-toast.open{opacity:1;transition:.25s opacity}'
    addStyleString(tackleboxStyle);
  };

  /* Add a button to the tacklebox*/
  this.add_btn = function(btn_name, toast_msg, fn){
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
    var func = function(){
      fn();
      make_toast(toast_msg);
    }
    addEvent(btn, 'click', func);
  };

  //call init() function on creation
  this.init();
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

/* Make a toast popup with a given message*/
function make_toast(msg){
  //Don't make toast without a message
  if(typeof msg == 'undefined' || msg == null) { return; }

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
  }, 2000);
}

/* Safe assignment of event handlers*/
function addEvent(element, evnt, funct){
  if (element.attachEvent)
   return element.attachEvent('on'+evnt, funct);
  else
   return element.addEventListener(evnt, funct, false);
}

/* Add stylesheed from string*/
function addStyleString(str) {
    var stylesheet = document.createElement('style');
    stylesheet.innerHTML = str;
    document.body.appendChild(stylesheet);
}