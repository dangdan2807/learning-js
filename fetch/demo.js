var postAPI = "https://jsonplaceholder.typicode.com/posts";
// stream
fetch(postAPI)
    .then(function (response) {
        return response.json();
        // JSON.parse: JSON -> javascript
    })
    .then(function (posts) {
        let htmlData = posts.map(function (post) {
            return `<li>
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <p><b>**INFO**</b></p>
                <span>ID messages: ${post.id}</span></br>
                <span>By userID: ${post.userId}</span>
            </li>`;
        });
        let html = htmlData.join("");
        document.getElementById("post-block").innerHTML = html;
    })
    .catch(function (err) {
        let html = "Có lỗi: " + err;
        document.getElementById("post-block").innerHTML = html;
    });
