## TackleBox.js
TackleBox.js is a lightweight plugin to allow developers to quickly assign commonly used functions to a easy-to-use, material design GUI that won't interfere with your current webpage.

## Setup
1. Download local copy of `tacklebox.js`.
2. Add HTML reference to `tacklebox.js` in your current development environment.
 * See `sample.html` or `sample_simple.html` for examples.
3. Open `tacklebox.js` and customize your commonly used functions in the 'Add Functions' section.
4. Open your app in a browser and use your tacklebox to make your life easier!

## Console Interaction
The TackleBox can also be modified in the console. The primary TackleBox object, `tacklebox`, can be manipulated using all of the functions in our API.

## API
Tacklebox functionality has been implemented within the primary `TackleBox` object. The `TackleBox` object has the following functions:
###### add_btn()
`@param string btn_name` //Name to display on the button <br>
`@param string toast_msg` //Message to display in the toast message on click. Pass 'null' to display no toast message. <br>
`@param function fn` //Function to call on button click. <br>
Adds a new button to the TackleBox Pane.

###### destroy()
Destroys all DOM elements and event handlers for `TackleBox`. Functions other than `init()` will not function correctly after content has been destroyed.

###### init()
Initializes all DOM elements and event handlers to use `TackleBox`.

###### make_toast()
`@param string msg` //Message to display in toast popup <br>
Opens a toast popup with the provided message. Toast Timeout can be modified with the `setToastTimeout` function.

###### remove_btn()
`@param string btn_id` //Id for the button to remove. <br>
Removes an existing button from the TackleBox Pane.

###### setToastTimeout()
`@param int msg` //Timeout length (in milliseconds)<br>
Set the duration to display toast popups for the `make_toast()` function.
