let comments = [];
loadComments();

document.getElementById('comment-add').onclick = function(){
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');

    let comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now() / 1000)
    }

    if (commentName.value == '') return;

    if (commentBody.value == '') return;

    comments.push(comment);
    saveComments();
    showComments();
    commentName.value = '';
    commentBody.value = '';
}

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if (localStorage.getItem('comments')) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments (){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(function(item){
        //out += `<p class="text-right small"><em>${timeConverter(item.time)}</em></p>`;
        //out += `<p class="alert alert-primary" role="alert">${item.name}</p>`;
        //out += `<p class="alert alert-success" role="alert">${item.body}</p>`;
        out += `<div class="review_item">
            <div class="media">
                <div class="media-body">
                    <h4>${item.name}</h4>
                    <h5><em>${timeConverter(item.time)}</em></h5>
                </div>
            </div>
            <p>${item.body}</p>
            <br>
        </div>`;
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }