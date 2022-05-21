import { Sequelize, DataTypes } from 'sequelize';
import PrerenderModel from './Prerender';

const sequelize = new Sequelize({
	dialect: 'mysql',
	database: process.env.DB_NAME,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	define: {
		paranoid: true,
		timestamps: true,
	},
	logging: false,
});

const Prerender = PrerenderModel(sequelize, DataTypes);

export default sequelize;

export { Prerender };
