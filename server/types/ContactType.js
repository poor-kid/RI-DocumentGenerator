const graphql = require('graphql');
const Contacts = require('../models/contact-details');

const {GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList, 
	GraphQLNonNull,
	GraphQLDate	
	} = graphql;

exports.ContactType = new GraphQLObjectType({
	name:'Contacts',
	fields:()=>({
		id: {type:GraphQLID},
		name:{type:GraphQLString},
		role:{type:GraphQLString},
		organization:{type:GraphQLString},
		email:{type:GraphQLString},
		phone:{type:GraphQLString},
		remark:{type:GraphQLString},
		status:{type:GraphQLString},
		parentId:{type:GraphQLID},
		site:{
			type:SiteType,
			resolve(parent,args)
			{
				return Site.findById(parent.siteId);
			}
		}

	})
});

