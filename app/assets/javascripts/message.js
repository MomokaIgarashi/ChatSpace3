$(document).on('turbolinks:load', function(){
  function buildHTML(message){
   var image = message.image? `<img src="${message.image}" >`: '' ;

    var html = `<div class="message" data-message-id =${message.id} >

                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.time }
                    </div>
                  </div>
                  <div class="lower-message">
                    ${image}
                    
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                  </div>
                </div>`;
        return html;
  }

  function scroll() {
  $('.messages').animate({scrollTop: $('.message')[0].scrollHeight});
  
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url, 
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.table(data)
        var html = buildHTML(data);
        $('.messages').append(html);
        $("#new_message")[0].reset();
        $('.form__submit').prop('disabled', false);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      })
      .fail(function(){
        alert('error')
        $('.form__submit').prop('disabled', false);
    })
  })

  // $(document).on('turbolinks:load', function(){

      var reLoadMessages = function(){
        if (window.location.href.match(/\/groups\/\d+\/messages/)){
          var href = 'api/messages#index {:format=>"json"}'
           if($("div").hasClass("message")){
            var last_message_id = $('.message:last').data('message-id');
            } 
            else {
            var last_message_id = 0
            }

          $.ajax({
            url:  href,
            type: 'GET',
            data: {id: last_message_id},
            dataType: 'json'
          })
    
          .done(function(messages){      
            var insertHTML='';
              messages.forEach(function(message){
                insertHTML = buildHTML(message);
                $('.messages').append(insertHTML);
                $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
              });
          })

        

          .fail(function(){
            alert("自動更新に失敗しました")
          });
        };
      };
      setInterval(reLoadMessages, 5000);
      
  });