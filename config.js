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
      path: "/post/create",
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
    { file: "./root", path: "/post/list", method: "getPosts", type: "get" },
    {
      file: "./root",
      path: "/post/:id",
      method: "getPostDetail",
      type: "get"
    }
  ]
};

module.exports = config;
