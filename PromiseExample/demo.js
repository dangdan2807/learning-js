var users = [
    {
        id: 1,
        name: "Kien Dam",
    },
    {
        id: 2,
        name: "Dang Dan",
    },
    {
        id: 3,
        name: "Hung Nguyen",
    },
];

var comments = [
    {
        id: 1,
        user_id: 1,
        content: "comment 1",
    },
    {
        id: 2,
        user_id: 2,
        content: "comment 2",
    },
];

function getUsersByIds(userIds) {
    return new Promise(function (resolve) {
        var results = users.filter(function (user) {
            return userIds.includes(user.id);
        });
        setTimeout(function () {
            resolve(results);
        }, 1000);
    });
}

function getComments(comments) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(comments);
        }, 1000);
    });
}

getComments(comments)
    .then(function (comments) {
        var userIds = comments.map(function (comment) {
            return comment.user_id;
        });
        return getUsersByIds(userIds).then(function (users) {
            return {
                users: users,
                comments: comments,
            };
        });
    })
    .then(function (data) {
        var html = "";
        data.comments.forEach((comments) => {
            var user = data.users.find(function (user) {
                return user.id === comments.user_id;
            });
            html += `<li>${user.name}: ${comments.content}</li>`;
        });
        var ulElement = document.getElementById("comments");
        ulElement.innerHTML += html;
    });
