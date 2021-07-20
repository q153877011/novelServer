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
