var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import compose from 'koa-compose';
import Axios from 'axios';
// 默认适配器
const defaultAdapter = Axios.defaults.adapter;
/**
 * 中间件包装适配器
 * @param adapter 请求适配器 默认：Axios.defaults.adapter
 * @returns {IMAdapter} 中间件适配器
 */
function AdapterMiddle(adapter = defaultAdapter) {
    const middleAdapter = (config) => __awaiter(this, void 0, void 0, function* () {
        const fn = compose([...middleAdapter.middleware, defaultAdapter]);
        const response = yield fn(config);
        return response;
    });
    middleAdapter.middleware = [];
    middleAdapter.use = (fn) => {
        if (typeof fn !== 'function')
            throw new Error('middleware must be a function');
        middleAdapter.middleware.push(fn);
    };
    return middleAdapter;
}
export default AdapterMiddle;
