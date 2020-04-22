import API from '@/api/api'

/**
 *code登录获取openid
 */
export const exchangeCode = (data) =>
  API.request('api/user/wxxtLogin', data, 'POST')

/**
 *获取首页banner数据
 */
export const getBanner = () => API.request('api/Index/baner')

/**
 *获取热门城市列表数据
 */
export const getHotCity = () => API.request('api/City/hotCity')

/**
 *获取搜索历史数据
 */
export const getSearchHistory = () =>
  API.request('api/City/historyGet', { type: 2 }, 'post')

/**
 *获取热门搜索数据
 */
export const getHotSearch = () =>
  API.request('api/City/hotSeach', { type: 1 }, 'post')

/**
 *搜索商品数据
 */
export const onSearch = (data) =>
  API.request('api/Goods/seachGoods', data, 'post')

/**
 *获取推荐商品商品列表数据
 */
export const getRecommentGoods = (data) =>
  API.request('api/Goods/recommentGoods', data, 'post')

/**
 *获取特价商品商品列表数据
 */
export const getSpePriceGoods = (data) =>
  API.request('api/Goods/spePriceGoods', data, 'post')

/**
 *获取商品分类列表数据
 */
export const getGoodsType = (data) =>
  API.request('api/Goods/goodsType', data, 'post')

/**
 *获取商品列表数据
 */
export const getGoodsList = (data) =>
  API.request('api/Goods/goodsList', data, 'post')

/**
 *获取商品详情数据
 */
export const getGoodsInfo = (data) =>
  API.request('api/Goods/goodsInfo', data, 'post')

/**
 *获取商品规格数据
 */
export const getGoodsFormat = (data) =>
  API.request('api/Goods/goodsFormat', data, 'post')

/**
 *获取商品评价列表数据
 */
export const getGoodsValuation = (data) =>
  API.request('api/Valuation/goodsValuation', data, 'post')

/**
 *获取优惠卷列表数据
 */
export const getCoupons = (data) =>
  API.request('api/Order/userCoupons', data, 'post')

/**
 *获取收货地址列表数据
 */
export const getMyAddress = () =>
  API.request('api/Address/myAddress', {}, 'post')

/**
 *添加收货地址数据
 */
export const addAddress = (data) =>
  API.request('api/Address/addAddress', data, 'post')

/**
 *删除收货地址数据
 */
export const delAddress = (data) =>
  API.request('api/Address/delAddress', data, 'post')

/**
 *修改收货地址数据
 */
export const editAddress = (data) =>
  API.request('api/Address/editAddress', data, 'post')

/**
 *获取运费数据
 */
export const getTransportMoney = (data) =>
  API.request('api/Order/getTransportMoney', data, 'post')

/**
*确认订单
*/
export const order = (data) =>
  API.request('api/Order/order', data, 'post')

/**
*获取订单数据
*/
export const getOrder = (data) =>
  API.request('api/Order/myOrder', data, 'post')
