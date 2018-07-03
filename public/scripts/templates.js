(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['first'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div>\r\n    <h1>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n    <p>"
    + alias4(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subtitle","hash":{},"data":data}) : helper)))
    + "</p>\r\n    <div class=\"container\">\r\n        <br/>\r\n        <button><a href=\"/login\"> REGISTER </a></button>\r\n    </div>\r\n</div>";
},"useData":true});
templates['second'] = template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <li id="
    + alias2(alias1(depth0, depth0))
    + " onclick=\"triggerTalk("
    + alias2(alias1(depth0, depth0))
    + ")\">"
    + alias2(alias1(depth0, depth0))
    + "</li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.roomId : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <li id="
    + alias2(alias1((depth0 != null ? depth0.roomId : depth0), depth0))
    + " onclick=\"enterRoom("
    + alias2(alias1((depth0 != null ? depth0.roomId : depth0), depth0))
    + ")\">"
    + alias2(alias1((depth0 != null ? depth0.roomId : depth0), depth0))
    + "</li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<h1>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n<p>Welcome "
    + alias4(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subtitle","hash":{},"data":data}) : helper)))
    + "</p>\r\n<div class=\"container\"  id=\"TestBDC\">\r\n    <br/>\r\n    <div  class=\"block\">\r\n        <ul id=\"ListOfUsers\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.user : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\r\n        <ul id=\"ListOfRooms\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.room : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\r\n    </div>\r\n    <button id=\"room\" onclick=\"roomCreation()\">CREATE ROOM</button>\r\n    <button id=\"logout\" onclick=\"logoutThisUser()\"><a href=\"/logout\">LOGOUT</a></button>\r\n    <div class=\"room-modal\">\r\n        <div class=\"modal-content\">\r\n            <span class=\"close\" onclick=\"exitRoom()\">&times;</span>\r\n            <br/>\r\n            <div id=\"room-output\">\r\n            </div>\r\n            <input id=\"rm-messages\" type=\"text\" placeholder=\"Message\">\r\n            <button id=\"rm-send\" onclick=\"sendMessages()\">Send</button>\r\n        </div>\r\n    </div>\r\n    <div class=\"cr-room-modal\">\r\n        <div class=\"cr-modal-content\">\r\n            <input id=\"roomid\" type=\"text\" placeholder=\"Room Name\">\r\n            <br/>\r\n            <button id=\"btn2\" onclick=\"create()\">OK</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n<style>\r\n    #ListOfUsers {\r\n        float: left;\r\n    }\r\n    #ListOfRooms {\r\n        float: left;\r\n    }\r\n    .room-modal {\r\n        display: none; /* Hidden by default */\r\n        position: fixed; /* Stay in place */\r\n        z-index: 1;\r\n        left: 0;\r\n        top: 0;\r\n        width: 100%; /* Full width */\r\n        height: 100%; /* Full height */\r\n        overflow: auto; /* Enable scroll if needed */\r\n        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\r\n    }\r\n    .modal-content {\r\n        background-color: white;\r\n        margin: 10% auto; /* 15% from the top and centered */\r\n        padding: 10px;\r\n        border: 1px solid #888;\r\n        width: 80%; /* Could be more or less, depending on screen size */\r\n        height: 80%;\r\n    }\r\n    #room-output {\r\n        height: 80%;\r\n        border: 1px solid darkgray;\r\n        color: black;\r\n        padding-top: 2px;\r\n        padding-left: 2px;\r\n        overflow: auto;\r\n        font-family: lucida sans-serif;\r\n    }\r\n    .block {\r\n        border: 1px solid darkgray;\r\n        height: 400px;\r\n        overflow: auto;\r\n    }\r\n    .close {\r\n        color: #aaa;\r\n        float: right;\r\n        font-size: 28px;\r\n        font-weight: bold;\r\n    }\r\n    .close:hover,\r\n    .close:focus {\r\n        color: black;\r\n        text-decoration: none;\r\n        cursor: pointer;\r\n    }\r\n    .cr-room-modal {\r\n        display: none; /* Hidden by default */\r\n        position: fixed; /* Stay in place */\r\n        z-index: 1;\r\n        left: 0;\r\n        top: 0;\r\n        width: 100%; /* Full width */\r\n        height: 100%; /* Full height */\r\n        overflow: auto; /* Enable scroll if needed */\r\n        background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\r\n    }\r\n    .cr-modal-content {\r\n        background-color: white;\r\n        margin: 10% auto; /* 15% from the top and centered */\r\n        padding: 10px;\r\n        border: 1px solid #888;\r\n        width: 30%; /* Could be more or less, depending on screen size */\r\n        height: 20%;\r\n    }\r\n    #roomid {\r\n        align-self: center;\r\n    }\r\n</style>";
},"useData":true});
templates['third-tmpl'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>hhhhhhhhhhhhhh cc  hhhhhhhhhhhhhh</div>";
},"useData":true});
})();