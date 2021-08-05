# JSON server (mock api)

Install nodejs

module: `JSON server` - [github](https://github.com/typicode/json-server)

Install module to the folder you need and use the command
```
move to the folder you need and use the command

npm install json-server
```

Create a `db.json` file with some data

```
{
  "courses": [
    {
      "id": 1,
      "name": "Kiến thức cơ bản, cốt lõi dân IT cần học trước",
      "description": "Kiến thức cơ bản dành cho dân IT, không phân biệt bạn theo Front-end, Back-end hay Devops",
      "url_Image": "https://img.youtube.com/vi/M62l1xA5Eu8/sddefault.jpg"
    },
    {
      "id": 2,
      "name": "HTML, CSS từ Zero đến Hero",
      "description": "Khóa học đề cao việc thực hành qua những ví dụ trong thực tế giúp học viên nhanh chóng xây dựng được giao diện website",
      "url_Image": "https://img.youtube.com/vi/R6plN3FvzFY/sddefault.jpg"
    },
    {
      "id": 3,
      "name": "Xây dựng web responsive",
      "description": "Khóa học này sẽ giúp bạn nắm chắc tư tưởng cốt lõi của việc xây dựng giao diện website responsive và áp dụng trong thực tế",
      "url_Image": "https://img.youtube.com/vi/uz5LIP85J5Y/sddefault.jpg"
    },
    {
      "id": 4,
      "name": "Lập trình Javascript cơ bản",
      "description": "Khóa học Javascript cơ bản dành cho mọi đối tượng bắt đầu học lập trình với nội dung ngắn gọn, dễ hiểu và hệ thống làm bài tập phong phú",
      "url_Image": "https://img.youtube.com/vi/0SJE9dYdpps/sddefault.jpg"
    },
    {
      "name": "demo",
      "description": "demo",
      "url_Image": "https://www.google.com/url?sa=i&url=http%3A%2F%2Fdiemhencuoituan.com.vn%2FChi-tiet-tin%2FAnhr-dep-du-lich-vung-cao.htm&psig=AOvVaw3scZymP2qVt4qwzfBgyL-5&ust=1627959749704000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMDo6easkfICFQAAAAAdAAAAABAD",
      "id": 7
    }
  ]
```

open `package.json` and add lines in 
```
"scripts": {
    "start": "json-server --watch db.json",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

Start JSON Server: debug code

Now if you go to http://localhost:3000/posts/1, you'll get data