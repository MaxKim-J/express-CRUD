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
  ]
};

module.exports = config;
