// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const Warningcovers = function () {
  let Secondcover = [];
    let Warning = {
      date: Random.range(100, 300, 5),// 设备编号


    };
    Secondcover.push(Warning)

  return {
    Secondcover: Secondcover
  }
};

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/wei/index', 'get', Warningcovers);

