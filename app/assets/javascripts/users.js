document.addEventListener("turbolinks:load", function(){

$(function() {
  var search_list = $("#user-search-result");
  var member_list = $("#member-append");

    function appendUser(user){
      console.log(user.name)
        var html = 
                  `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${user.name}</p>
                      <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                  </div>`;
                  search_list.append(html);
    }

    function appendErrMsgToHTML(msg){
        var html = 
                  `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${msg}</p>
                  </div>`;
                  search_list.append(html);
    }

    function appendUserdeletion(name, id){
      //console.log(user.name)
        var html = 
                  `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${name}</p>
                      <div class="user-search-deletion chat-group-user__btn chat-group-user__btn--add" data-user-id=${id} data-user-name=${name}>削除</div>
                      <input name="group[user_ids][]" type="hidden" value=${id}"></input>
                  </div>`;
                  member_list.append(html);
                  
    }
  
  $("#user-search-field").on("keyup", function() {
    console.log("test")
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })

    .done(function(users){
      //console.log(users)
      //console.log("users")
        // if (input.length === 0) {
        //     $('#user-search-result').empty();
        //   }
        // else if (input.length !== 0){
            $('#user-search-result').empty();
            users.forEach(function(user){
                appendUser(user)

            });
        // }
        // else {
        //     $('#user-search-result').empty(); 
        //     appendErrMsgToHTML("一致するユーザーが見つかりません");
        // }
    })

    .fail(function() {
        alert('ユーザー検索に失敗しました');
    });
  });

  $(document).on('click', '.user-search-add', function(){
    console.log(this)
    const name = $(this).data('user-name');
    const id = $(this).data('user-id');

    console.log(name);  
    console.log(id);  
    appendUserdeletion(name,id)
    $(this).parent().remove()
  });

  $(document).on('click', '.user-search-deletion', function(){
    console.log($(this).parent())
    const name = $(this).data('user-name');

    $(this).parent().remove()
    
})
})
});