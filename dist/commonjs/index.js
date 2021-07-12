"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_compose_1 = __importDefault(require("koa-compose"));
const axios_1 = __importDefault(require("axios"));
// 默认适配器
const defaultAdapter = axios_1.default.defaults.adapter;
/**
 * 中间件包装适配器
 * @param adapter 请求适配器 默认：Axios.defaults.adapter
 * @returns {IMAdapter} 中间件适配器
 */
function AdapterMiddle(adapter = defaultAdapter) {
    const middleAdapter = (config) => __awaiter(this, void 0, void 0, function* () {
        const fn = koa_compose_1.default([...middleAdapter.middleware, defaultAdapter]);
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
exports.default = AdapterMiddle;
