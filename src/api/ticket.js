import request from '@/utils/request'
const host = 'http://app.api.epweike.net'
const baseUrl = 'http://m.epwk.ai'

// 已有账号 登录账号领取优惠券
export function loginToGetOneTicket(data) {
  return request({
    url: `${baseUrl}/member/login`,
    method: 'post',
    data
  })
}

// 还没有账号 注册账号并领取优惠券
export function registerToGetOneTicket(data) {
  return request({
    url: `${baseUrl}/member/register`,
    method: 'post',
    data
  })
}

// 已经登录的情况下  领取优惠券
export function getOneTicket(data) {
  return request({
    url: `${host}/member/login`,
    method: 'post',
    data
  })
}

// 获取验证码
export function getAuthCode(data) {
  return request({
    url: `${baseUrl}/member/sendcode`,
    method: 'post',
    data
  })
}

// 获取优惠券列表
export function getTicketList(data) {
  return request({
    url: `${host}/wap.php`,
    method: 'post',
    data
  })
}
