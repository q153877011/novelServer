import sequelize from 'src/database/sequelize';
import * as Sequelize from 'sequelize';

export function belongTable() {
  let belong = sequelize.define('belong', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    novelName: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    readingChapterUrl: {
      type: Sequelize.STRING,
    },
    readingChapterName: {
      type: Sequelize.STRING,
    },
    chaptersUrl: {
      type: Sequelize.STRING,
    },
    auth: {
      type: Sequelize.STRING,
    },
    latestChapterName: {
      type: Sequelize.STRING,
    },
    updateTime: {
      type: Sequelize.STRING,
    },
  });
  belong.sync({ force: false });

  return belong;
}

export function totalNovelTable() {
  let totalnovel = sequelize.define('totalnovel', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    novelName: {
      type: Sequelize.STRING,
    },
    chaptersUrl: {
      type: Sequelize.STRING,
    },
    updateTime: {
      type: Sequelize.STRING,
    },
    auth: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    novelUrl: {
      type: Sequelize.STRING,
    },
    latestChapterName: {
      type: Sequelize.STRING,
    },
    clickNumber: {
      type: Sequelize.INTEGER,
    },
  });
  totalnovel.sync({ force: false });

  return totalnovel;
}

export function timeCountTable() {
  let timeCount = sequelize.define('timecount', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
    },
    dailyTime: {
      type: Sequelize.DATE,
    },
    weekTime: {
      type: Sequelize.DATE,
    },
    monthTime: {
      type: Sequelize.DATE,
    },
    yearTime: {
      type: Sequelize.DATE,
    },
    totalTime: {
      type: Sequelize.DATE,
    },
    latestTime: {
      type: Sequelize.DATE,
    },
  });

  timeCount.sync({ force: false });
  return timeCount;
}

export function userTable() {
  let user = sequelize.define('admin_user', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    account_name: {
      type: Sequelize.STRING,
    },
    real_name: {
      type: Sequelize.STRING,
    },
    passwd: {
      type: Sequelize.STRING,
    },
    passwd_salt: {
      type: Sequelize.STRING,
    },
    mobile: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.INTEGER,
    },
    user_status: {
      type: Sequelize.INTEGER,
    },
    create_by: {
      type: Sequelize.INTEGER,
    },
    create_time: {
      type: Sequelize.STRING,
    },
    update_by: {
      type: Sequelize.INTEGER,
    },
    update_time: {
      type: Sequelize.STRING,
    },
  });

  user.sync({ force: false });
  return user;
}
