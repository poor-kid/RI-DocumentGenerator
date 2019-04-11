const graphql = require('graphql');
const Contacts = require('../../models/contact-details');
const ContactType = require('../../queries/contact-query');

const {GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList, 
	GraphQLNonNull,
	GraphQLDate	
	} = graphql;

exports.RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields:{
		contact:{
			type:ContatcType.ContactType,
			args:{sid:{type:GraphQLString}},
			resolve(parent,args){
				console.log(typeof(args.siteId));
				return Contacts.findBySite(args.sid);
			}
		}
	}
});