$(function() {

  function buildHTML(message){
    var image = ""
    var content = ""

    if ( message.image, message.content ){
        image = `<img src="${message.image}" >`
        content = `<p>${ message.content }</p>`
    } 

    var html = `<div class="message">
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
                      ${content}
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

  $(document).on('turbolinks:load', function(){
      var reloadMessages = function(){
        if (window.location.href.match(/\/groups\/\d+\/messages/)){    
          var href = 'api/messages#index {:format=>"json"}'              
          var last_message_id = $('.message:last').data('message-id');   
    
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
  })
})