import axios from 'axios'
// 终极方案
export function request(config){
// 1.创建axios实例
const instance =axios.create({
  baseURL:'http://123.207.32.32:8000/api/h3',
  timeout:5000
})
// 2.axios的拦截器
// 拦截请求
instance.interceptors.request.use(config=>{
  // 为啥要进行拦截：
  // 1.config中一些数据未符合后端要求，可以拦截更改
  // 2.比如每次发送网络请求，希望在界面中显示loading图标
  // 3.某些网络请求，必须携带一些信息，比如登录的token， 则可以判断是否符合要求
  // console.log(config);
  return config
},err=>{
  // console.log(err);
})
// 拦截响应
instance.interceptors.response.use(res=>{
  // console.log(res.data);
  return res.data
},err=>{
  console.log(err);
})
// 3.发送真正的网络请求
 return instance(config)
}
