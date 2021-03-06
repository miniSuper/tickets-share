import request from '@/utils/request'
import {
  getToken
} from '@/utils/cache.js'
const host = 'http://app.api.epweike.net'
const baseUrl = 'http://m.epwk.ai'
// 已注册   还未登录(没有token)的情况下  登录并领取优惠券
export function getTicketUnLogin(data) {
  data = formatData(data)
  return request({
    url: `${baseUrl}/member/login`,
    method: 'post',
    data
  })
}

// 已注册 已经登录(有token)的情况下 领取优惠券
export function getTicketHasLogin(data) {
  let dataAll = {
    do: 'coupon',
    view: 'send',
    access_token: getToken(),
    coupon_ids: data.coupon_ids,
    time: data.time
  }
  dataAll = formatData(dataAll)
  return request({
    url: `${host}/wap.php`,
    method: 'post',
    data: dataAll
  })
}

// 还没有账号 注册账号并领取优惠券
export function registerToGetTicket(data) {
  data = formatData(data)
  return request({
    url: `${baseUrl}/member/register`,
    method: 'post',
    data
  })
}

// 获取验证码
export function getAuthCode(data) {
  data = formatData(data)
  return request({
    url: `${baseUrl}/member/sendcode`,
    method: 'post',
    data
  })
}

// 获取优惠券列表
export function getTicketList(data) {
  data = formatData(data)
  return request({
    url: `${host}/wap.php`,
    method: 'post',
    data
  })
}

function formatData(data) {
  let urlParams = new URLSearchParams()
  Object.keys(data).forEach(key => {
    urlParams.append(key, data[key])
  })
  return urlParams
}
