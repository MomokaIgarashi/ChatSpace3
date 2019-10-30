$(function() {
  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })

    .done(function(users){
        if (input.length === 0) {
            $('#user-search-result').empty();
          }
        else if (input.length !== 0){
            $('#user-search-result').empty();
            users.forEach(function(user){
                appendUser(user)
            });
        }
        else {
            $('#user-search-result').empty(); 
            appendErrMsgToHTML("一致するユーザーが見つかりません");
        }
    })

    .fail(function() {
        alert('ユーザー検索に失敗しました');
    });
});



function  buildHTML(users){
 if  
  var html = `
            <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user_name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
            </div>
            `
}

 else
  var html = `
             <div class="chat-group-user clearfix">
              <p class="chat-group-user__name">ユーザーが見つかりません</p>
             </div>`
}