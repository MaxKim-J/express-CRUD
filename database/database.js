// 몽고디비 데이터베이스와의 커넥션 담당
// 디비 객체 선언 => 디비랑 연결 => 스키마 만들기 => 디비완성 => 앱에 속성으로 추가

const mongoose = require("mongoose");

const database = {};

const connect = (app, config) => {
  console.log("디비2 - connect 호출");

  // 데이터베이스 연결
  // mongoose의 Promise 객체는 global의 Promise 객체 사용하도록 함
  mongoose.Promise = global.Promise; //? 이거 왜필요?
  mongoose.connect(config.db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  database.db = mongoose.connection;

  database.db.on(
    "error",
    console.error.bind(console, "mongoose connection error") //? bind
  );

  database.db.on("open", () => {
    console.log(`디비3 - ${config.db_url}데이터베이스에 연결됨!`);
    // 스키마 생성
    createSchema(app, config);
  });
  database.db.on("disconnected", connect);
};

const createSchema = (app, config) => {
  const { db_schemas } = config;
  console.log(`디비4 - 스키마를 ${db_schemas.length}개 생성합니당`);

  db_schemas.forEach(schema => {
    const newSchema = require(schema.file).createSchema(mongoose);
    // deprecated
    mongoose.set("useCreateIndex", true);
    console.log(`디비5 - ${schema.file}을 불러서 스키마를 정의해버렸다`);

    //? 스키마 => 모델 이거 뭐지
    //* 스키마는 단순히 구조만 정의하므로 데이터베이스에 들어있는 컬렉션을 지정하려면
    //* 모델을 정의해야 함 => 스키마를 토대로 모델을 만들어 컬렉션에 들어가는 형식 강제
    //* 이렇게 모델 객체를 만들면 모델 객체에 지정한 이름은 데이터베이스의 컬렉션과 매칭되고
    //* 스키마 객체는 스키마 메소드로 만든 스키마 객체를 가리키게 됨

    const newModel = mongoose.model(schema.collection, newSchema);
    console.log(`디비6 - ${schema.collection}모델도 정의해버렸다`);

    database[schema.schemaName] = newSchema;
    database[schema.modelName] = newModel;
    console.log(
      `디비7 - ${schema.schemaName}스키마랑 ${schema.modelName}모델을 디비객체에 추가`
    );
  });
  app.set("database", database);
  console.log("디비8 - database객체를 app객체의 속성으로 추가해버려따!");
};

database.init = (app, config) => {
  console.log("디비1 - db init 호출되버려따!");
  //! connect => createSchema => 디비객체에 스키마+모델 바인딩 => app에 바인딩 => 익스포트
  connect(app, config);
};

module.exports = database;
