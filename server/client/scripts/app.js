// YOUR CODE HERE:
var app = { };

app.rooms = [];

app.friends = [];
// 
app.allMessages = [];

app.init = function() {
  app.renderRoom();

  $(document).on('click', '.username', app.handleUsernameClick);
 
};

app.send = function(message, success, dataType) {

  $.ajax({
      // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = (url, data, success, dataType) => {
  $.ajax({
    url: url,
    data: {
      order: '-createdAt'
    },
    success: success,
    dataType: dataType,
  });

};


app.clearMessages = () => {
  $('#chats').empty();
  console.log('cleared');
};

// render a single piece of message as a div inside chats
app.renderMessage = function(message) {  
  $('#chats').append('<div class="chat"><h3 class="username" id="' + message.username + '">' + message.username + '</h3>' + '<p class="text">' 
    + message.text + '</p>' + '<a class="roomname" onclick="functionCall()">' 
    + message.roomname + '</a>' + '</div>');   
  if (app.rooms.indexOf(message.roomname) === -1) {
    app.rooms.push(message.roomname);
    $('#rooms').append('<option class="roomname" value="' + message.roomname + ' ">' + message.roomname + '</option>');
    console.log('new room added');
  }
};

app.currentRoom;
app.renderRoom = function(roomname) {

  var a = roomname;
  if (a === undefined) {
    var undefinedInterval = setInterval(function() {

      if (app.currentRoom !== a) {
        clearInterval(undefinedInterval);
      }
      app.fetch('https://api.parse.com/1/classes/messages', {

      }, function(result) {
        app.clearMessages();
        console.log('result', result);
        for (var i = 0; i < result.results.length; i++) {
          app.renderMessage(result.results[i]);
        }
      } );

    }, 1000);    
  } else {

    a = a.trimRight();
    var definedInterval = setInterval(function() {

      if (app.currentRoom !== a) {
        clearInterval(definedInterval);
      }
      app.fetch('https://api.parse.com/1/classes/messages', {
      }, function(result) {
        app.clearMessages();
        for (var i = 0; i < result.results.length; i++) {
          if (result.results[i].roomname === a) {
            app.renderMessage(result.results[i]);
          }
        }
      });

    }, 1000);    
  }
  app.currentRoom = a;
};
// app.renderRoom = function(roomname) {
//   var $option = $('<option/>').val(roomname).text(roomname);

//   app.$roomSelect.append($option);
// };
// app.renderRoomList = function(messages) {
//   app.$roomSelect.html('<option value="__newRoom">New room...</option></select>');

//   if (messages) {
//     messages.forEach(function(message) {
//       var roomname = message.roomname;
//       if (roomname) {
//         app.renderRoom(roomname);
//       }
//     });
//   }

// };


app.handleUsernameClick = function(event) {
  var name = event.currentTarget.innerText;
  if (app.friends.indexOf(name) === -1) {
    app.friends.push(name);
    var id = '#' + name;
    $(id).addClass('.friend');
  } else {
    $(id).removeClass('.friend');
  }
};

app.chooseRoom = function() {
  app.currentRoom = $(this).message.roomname;
  console.log('room selected');
};

// '<script>document.body.style.backgroundImage = "url( 'http://images.8tracks.com/cover/i/009/493/548/Haha_i_say_that_all_the_time__406a982d46ccc523799e6aef45080387_1_-5889.png?rect=100,0,711,711&q=98&fm=jpg&fit=max&w=640&h=640' )"</script>;'
app.handleSubmit = function() {
  var message = {};
  message.text = $('#message').val();
  message.username = 'Carlos Danger';
  if ($('#addRoom').val()) {
    message.roomname = $('#addRoom').val();
  } else if (app.currentRoom) {
    message.roomname = app.currentRoom;
  } else {
    message.roomname = 'lobby';
  }
  app.send(message);
  app.renderRoom(message.roomname);
};

app.init();

