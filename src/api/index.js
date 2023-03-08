import request from './request'
// qs第三方库的作用　：　把　对象　转换为　　key=value&key=value 的字符串

// 获取 验证码的请求
export const getVerify = (phone) => /**这里可能还要写别的逻辑 */ request.post('/sendSMS', { phone })


// 一定要分清 axios 的 两个不同的请求方式带参数的不同
// 如果是get请求，第二个参数， 里面要套一层 params 才是 要带回服务器的数据
// export const getRecommond = ()=> request.get('/products/recommend', { params: { phone } })


// 手机号登录接口
// pramas = { verifyCode , phone }
export const phoneLoginApi = (params) => request.post('/phoneRegin', params)


// 根据登录的token获取用户信息的 接口
export const getUserInfoByTokenApi = () => request.get('/shop/userProfiles')


// 微信登录用code换token
export const WXLoginApi = (pramas) => request.post('/wechatUsers/PCLogin', pramas)

// 手机号绑定 微信
export const bingdingWX = (params) => request.post('/wechatUsers/binding', params)

// 获取精品推荐商品
export const getRecommondApi = () => request.get('/products/recommend');


export const getGoodDetailApi = (id) => request.get(`/products/${id}`)

export const getCartInfoApi = () => request.get('/shop/carts')

export const addToCartApi = (params) => request.post('/shop/carts/add', params)