// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
  let articles = [];
  for (let i = 0; i < 30; i++) {
    let newArticleObject = {
      date: Random.csentence(5, 10), //  Random.csentence( min, max )  'name|count': array
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      address: Random.date() + ' ' + Random.time() //指示生成的日期字符串的格式,yyyy-MM-dd；Random.time()
    };
    articles.push(newArticleObject)
  }
  let aiu = [];
  for (let i = 0; i < 2; i++) {
    let newArticleObject = {
      date: Random.csentence(5, 10), //  Random.csentence( min, max )
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      address: Random.date() + ' ' + Random.time() //指示生成的日期字符串的格式,yyyy-MM-dd；Random.time()
    };
    aiu.push(newArticleObject)
  }

  return {
    articles: articles,
    aiu:aiu
  }
};

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);
