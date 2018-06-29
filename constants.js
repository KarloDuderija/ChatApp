
//changing the app to the SPA means application will require top to bottom rework
// hence AJAX.post is not smart since it does not refresh the page unless you specifically call window.href in .done
// and window.href will lead to another app.get causing the same routes problem
// AJAX can be used for verification username and password

app.use(function(req, res, next){
   if(req.isLoggedIn()){
       next();
   }
   res.redirect('/login');
    app.get('/', function(req, res){
       res.render('admin' , {});
    });
    app.get('/*', function (req, res) {
        res.redirect('');
    })
});
var template = 'M name is {{name}}.';
var compiled = Handlebars.compile(template);
var rendered = compiled ({name: 'Ryan'});

// When user enters the page for the first time he is presented with register button which onclick leads him to login form,
// login form submits the form with username to '/' and is also granted new socketId but username persists. Socket emit after load
// which will tell the other users new user has joined (that will also update their list of users), and new user will listen to all
// the new users (to potentially update the list of users - using client side rendering or server side rendering that is on me -
//  but it needs to use hbs template). All of the users must have attr onclick which will enter the chat box modal that will
// join the two sockets in the unique room by their username. That page will also consist of logout page and create room buttons.
// Create room button creates a room with client chosen name that will also render on every user page (so each user needs to listen for both new Users and new rooms).
//  once the new room is created it can be accessible to all users on site (have attr onclick which will lead them to a separate room from
// where she will be able to communicate with every user in that room. Leaving the modal (either chat or room modal) will result in disconnecting
// from the room. Joining again will give you history of messages. On logout -> user socket disconnects and cookie is deleted + ?
// all users must see updated list of users after the user leaves the room. Number of users must also appear right of the roomID.

//REPLACE EVERY FUNCTION WITH FUNCTION THAT USES HBS TEMPLATE TO UPDATE THE UI

<style>
#ListOfUsers {
    float: left;
}
#ListOfRooms {
    float: left;
}
.room-modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.modal-content {
    background-color: white;
    margin: 10% auto; /* 15% from the top and centered */
    padding: 10px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
    height: 80%;
}
#room-output {
    height: 80%;
    border: 1px solid darkgray;
    color: black;
    padding-top: 2px;
    padding-left: 2px;
    overflow: auto;
    font-family: lucida sans-serif;
}
.block {
    border: 1px solid darkgray;
    height: 400px;
    overflow: auto;
}
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
.cr-room-modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}
.cr-modal-content {
    background-color: white;
    margin: 10% auto; /* 15% from the top and centered */
    padding: 10px;
    border: 1px solid #888;
    width: 30%; /* Could be more or less, depending on screen size */
    height: 20%;
}
#roomid {
    align-self: center;
}
</style>