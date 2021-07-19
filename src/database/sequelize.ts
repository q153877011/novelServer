import {Sequelize} from "sequelize"
import db from "../../config/db"

const sequelize = new Sequelize(db.mysql.database, db.mysql.user, db.mysql.password || null, {
    host: db.mysql.host,
    port: db.mysql.port,
    dialect: 'mysql',
    pool: {
        max: db.mysql.connectionLimit, //连接池中的最大连接数目
        min: 0,
        acquire: 3000,
        idle: 10000, //如果一个线程10s没有被使用就释放线程
    },
    timezone: '+08:00', //东八时区
})

//测试连接
sequelize
    .authenticate()
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch((err: any) => {
        console.error(err)
        throw err
    })

export default sequelize;