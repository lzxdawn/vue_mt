import Router from 'koa-router';
import axios from './utils/axios'
import Cart from '../dbs/models/cart'
import Order from '../dbs/models/order'
import md5 from 'crypto-js/md5'

let router = new Router({
    prefix: '/order'
})

router.post('/createOrder', async(ctx) => {
    let { id, price, count } = ctx.request.body
    let time = Date()
    let orderID = md5(Math.random() * 1000 + time).toString()
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            msg: 'pleace login'
        }
    } else {
        let findCart = Cart.findOne({
            cartNo: id
        })
        let order = new order({
            id: orderID,
            count,
            total: price * count,
            time,
            user: ctx.session.passport.user,
            name: findCart.detail[0].name,
            imgs: findCart.detail[0].imgs,
            status: 0
        })
        try {
            let result = await order.save()
            if (result) {
                await findCart.remove()
                ctx.body = {
                    code: 0,
                    id: orderID
                }
            } else {
                ctx.body = {
                    code: -1
                }
            }
        } catch (e) {
            ctx.body = {
                code: -1
            }
        }
    }
})

router.post('/getOrders', async(ctx) => {
    if (!ctx.isAuthenticated()) {
        ctx.body = {
            code: -1,
            list: [],
            mas: 'pleace login'
        }
    } else {
        try {
            let result = await Order.find()
            if (result) {
                ctx.body = {
                    code: 0,
                    list: result
                }
            } else {
                ctx.body = {
                    code: -1,
                    list: []
                }
            }
        } catch (e) {
            ctx.body = {
                code: -1,
                list: []
            }
        }
    }
})

export default router