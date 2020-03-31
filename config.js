const config = {
  server_port: 3000,
  db_url: "mongodb://localhost:27017/local",
  db_schemas: [
    {
      file: "./schemas/post_schema",
      collection: "crudPost",
      schemaName: "postSchema",
      modelName: "postModel"
    }
  ],
  route_info: [
    //===== User =====//
    {
      file: "./root",
      path: "/create",
      method: "postPostCreate",
      type: "post"
    },
    {
      file: "./root",
      path: "/post/delete",
      method: "postPostDelete",
      type: "post"
    },
    {
      file: "./root",
      path: "/post/update",
      method: "postPostUpdate",
      type: "post"
    },
    // 뷰를 3개를 만든다
    { file: "./root", path: "/", method: "getPosts", type: "get" },
    {
      file: "./root",
      path: "/detail/:id",
      method: "getPostDetail",
      type: "get"
    },
    {
      file: "./root",
      path: "/post/create",
      method: "getPostCreate",
      type: "get"
    }
  ]
};

module.exports = config;
