export default function (sequelize, DataTypes) {
	const model = sequelize.define(
		'Prerender',
		{
			url: {
				type: DataTypes.STRING,
			},
			html: {
				type: DataTypes.STRING,
			},
		},
		{
			tableName: 'prerender',
		}
	);

	return model;
}
