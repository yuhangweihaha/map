// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
  let articles = [];
  for (let i = 0; i < 30; i++) {
    let newArticleObject = {
      date: Random.natural(0,1000000000), //  Random.csentence( min, max )  'name|count': array
      name: Random.natural(0, 3), // Random.cname() 0-3状态
      address: Random.date() + ' ' + Random.time() //生成的日期
    };
    articles.push(newArticleObject)
  }
  let aiu = [];
  for (let i = 0; i < 2; i++) {
    let newArticleObject = {
      date: Random.natural(0,1000000000), //  Random.csentence( min, max )
      name: Random.natural(3,3), // Random.cname() 随机生成一个常见的中文姓名
      address: Random.date() + ' ' + Random.time() //指示生成的日期字符串的格式,yyyy-MM-dd；Random.time()
    };
    aiu.push(newArticleObject)
  }

  return {
    articles: articles,
    aiu:aiu
  }
};
const Warningcovers = function() {
  let Secondcover  = [];
  for (let i = 0; i < 2; i++) {
    let Warning = {
      date: Random.natural(0,1000000000), //  Random.csentence( min, max )
      name: Random.natural(3,3), // Random.cname() 随机生成一个常见的中文姓名
      address: Random.date() + ' ' + Random.time(), //指示生成的日期字符串的格式,yyyy-MM-dd；Random.time()
      Manufacturer: Random.csentence(),  //生产厂家
      Installation: Random.csentence(),   //安装单位
      installDate: Random.date(), // 安装日期
      ServiceLife: Random.natural(1, 100) // 使用寿命
    };
    Secondcover.push(Warning)
  }

  return {
    Secondcover:Secondcover
  }
};

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);
Mock.mock('/news/api','post',Warningcovers);
