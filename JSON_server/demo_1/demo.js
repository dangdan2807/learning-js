var courseApi = "http://localhost:3000/courses";

function start() {
    getCourses(renderCourses);
    handleCreateForm();
}

start();

function getCourses(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function createCourse(course, callback) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
    };
    fetch(courseApi, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function renderCourses(courses) {
    var htmls = courses.map(function (course) {
        return `
        <div class="flex2 course-item-${course.id}">
            <a href="#" class="flex2-image">
                <img src="${course.url_Image}" alt="image" />
            </a>
            <div class="flex2-content">
                <a href="#" class="flex2-title">${course.name}</a>
                <time class="flex2-time">${course.description}</time>
            </div>
            <div class="flex2-content">
                <button class="btn" onclick="handleDeleteCourse(${course.id})">Xóa</button>
                <button class="btn" onclick="updateBtn(${course.id})">Sửa</button>
            </div>
        </div>`;
    });
    var listCoursesBlock = document.querySelector("#list-courses");
    listCoursesBlock.innerHTML = htmls.join("");
}

function handleCreateForm() {
    var createBtn = document.querySelector("#create");
    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;
        var url_Image = document.querySelector('input[name="url_Image"]').value;
        var formData = {
            name: name,
            description: description,
            url_Image: url_Image,
        };
        createCourse(formData, function () {
            getCourses(renderCourses);
        });
    };
}

function handleDeleteCourse(id) {
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    fetch(courseApi + "/" + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var courseItem = document.querySelector(".course-item-" + id);
            if (courseItem) {
                courseItem.remove();
            }
        });
}

function handleUpdateCourse(id, course) {
    var options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
    };

    fetch(courseApi + "/" + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var courseItem = document.querySelector(".course-item-" + id);
            if (courseItem) {
                courseItem.querySelector(".flex2-title").innerHTML = course.name;
                courseItem.querySelector(".flex2-time").innerHTML = course.description;
                courseItem.querySelector("img").src = course.url_Image;
            }
            document.querySelector("#update").id = "create";
        });
}

function updateBtn(id) {
    var courseItem = document.querySelector(".course-item-" + id);
    var nameCourse = courseItem.querySelector(".flex2-title").innerHTML;
    var descCourse = courseItem.querySelector(".flex2-time").innerHTML;
    var urlImageCourse = courseItem.querySelector("img").src;
    document.querySelector(`input[name="name"]`).value = nameCourse;
    document.querySelector(`input[name="description"]`).value = descCourse;
    document.querySelector(`input[name="url_Image"]`).value = urlImageCourse;
    var updateBtn = document.querySelector("#create");
    updateBtn.innerHTML = "Lưu";
    updateBtn.id = "update";
    document.querySelector("#update").onclick = function () {
        var name = document.querySelector(`input[name="name"]`).value;
        var description = document.querySelector(`input[name="description"]`).value;
        var urlImage = document.querySelector(`input[name="url_Image"]`).value;
        var formData = {
            name: name,
            description: description,
            url_Image: urlImage,
        };
        handleUpdateCourse(id, formData);
    };
}
