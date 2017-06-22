/**
 * Created by zuozhuo on 2017/5/10.
 */


module.exports = {
    sourceMap: false, // 只能设置 true | inline 不能设置false
    plugins: [
        require('autoprefixer')(),
    ], // 这里不能使用plugin属性，请在后面的 postcss 属性配置
};
