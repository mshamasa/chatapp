import { Sequelize, DataTypes } from "sequelize";

const initUsers = (sequelize: Sequelize) => {
  sequelize.define(
    "users",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      first_name: DataTypes.TEXT,
      last_name: DataTypes.TEXT,
      username: DataTypes.TEXT,
      email: DataTypes.TEXT,
    },
    { timestamps: false }
  );
};

const initChannels = (sequelize: Sequelize) => {
  sequelize.define(
    "channels",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      name: DataTypes.TEXT,
      description: DataTypes.TEXT,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.TIME,
    },
    { timestamps: false }
  );
};

const initChannelUsers = (sequelize: Sequelize) => {
  sequelize.define(
    "channel_users",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      user_id: DataTypes.INTEGER,
      channel_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.TIME,
    },
    { timestamps: false }
  );
};

const initMessages = (sequelize: Sequelize) => {
  sequelize.define(
    "messages",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      user_id: DataTypes.INTEGER,
      channel_id: DataTypes.INTEGER,
      text: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.TIME,
    },
    { timestamps: false }
  );
};

const setupModels = (sequelize: Sequelize) => {
  initUsers(sequelize);
  initChannels(sequelize);
  initChannelUsers(sequelize);
  initMessages(sequelize);
};

export default setupModels;
