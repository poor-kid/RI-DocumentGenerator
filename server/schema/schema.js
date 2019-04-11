const graphql = require('graphql');
const Contacts = require('../models/contact-details');
const Site = require('../models/site-details');
const Connectivity = require('../models/connectivity-details');
const TechnicalDetails = require('../models/technicaldetails');
const Message = require('../models/sample-messages');
const Issues = require('../models/issue-list');
const Customization = require('../models/customizations');
//const Mutation = require('./mutations');

const {GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList, 
	GraphQLNonNull,
	GraphQLDate	
	} = graphql;

/*static findBySiteId(siteId) {
    return this.findOne({ siteId });
  }*/

/*const typeDefs=`
type Mutation {
	deleteContact(_id:ID!,input:ContactsInput):Contacts
}`
*/
const CustomizationType = new GraphQLObjectType({
	name:"Customization",
	fields:()=>({
		id:{type:GraphQLID},
		sid:{type:GraphQLString},
		description:{type:GraphQLString},
	    details:{type:GraphQLString},
	    solution:{type:GraphQLString},
	    screenshot:{type:GraphQLString},
	    remark:{type:GraphQLString}
	})
});

const IssuesType = new GraphQLObjectType({
	name:"Issues",
	fields:()=>({
		id:{type:GraphQLID},
		sid:{type:GraphQLString},
		issue_num:{type:GraphQLInt},
		status:{type:GraphQLString},
		logdata:{type:GraphQLString},
		system:{type:GraphQLString},
		issue:{type:GraphQLString},
		status_update:{type:GraphQLString},
		owner:{type:GraphQLString},
		case_num:{type:GraphQLString},
		priority:{type:GraphQLString},
		resolve_date:{type:GraphQLString}
	})
});

const MessageType = new GraphQLObjectType({
	name:'Message',
	fields:()=>({
		id:{type:GraphQLID},
		message_type:{type:GraphQLString},
	    message:{type:GraphQLString},
	    source:{type:GraphQLString},
	    from:{type:GraphQLString},
	    sid:{type:GraphQLString}
	})
});
const TechnicalDetailsType=new GraphQLObjectType({
	name:'TechnicalDetails',
	fields:()=>({
		id:{type:GraphQLID},
		SystemType:{type:GraphQLString},
		ApplicationRole:{type:GraphQLString},
		ApplicationName:{type:GraphQLString},
		Version:{type:GraphQLString},
		Ip:{type:GraphQLString},
		HostName:{type:GraphQLString},
		UserName:{type:GraphQLString},
		Password:{type:GraphQLString},
		Remark:{type:GraphQLString},
		sid:{type:GraphQLString}

	})
});
const ConnectivityType = new GraphQLObjectType({
	name:'Connectivity',
	fields:() => ({
		id:{type: GraphQLID},
		conn_type:{type:GraphQLString},
		servertype:{type:GraphQLString},
		system:{type:GraphQLString},
		interfacetype:{type:GraphQLString},
		msg_evnt:{type:GraphQLString},
		interface_dir:{type:GraphQLString},
		source:{type:GraphQLString},
		source_ip:{type:GraphQLString},
		destination:{type:GraphQLString},
		destination_ip:{type:GraphQLString},
		port:{type:GraphQLString},
		AE_title:{type:GraphQLString}
	})
});

const ContactType = new GraphQLObjectType({
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
		site:{
			type:SiteType,
			resolve(parent,args)
			{
				return Site.findById(parent.siteId);
			}
		}

	})
});

const SiteType = new GraphQLObjectType({
	name:'Site',
	fields:()=>({

		id:{type:GraphQLID},
		sid:{type:GraphQLString},
		name:{type:GraphQLString},
		city:{type:GraphQLString},
		state:{type:GraphQLString},
		country:{type:GraphQLString},
		contacts:{
			type:new GraphQLList(ContactType),
			resolve(parent,args)
			{
				console.log(parent);
				return Contacts.find({sid:parent.sid});
			}
		},
		connectivity:{
			type:new GraphQLList(ConnectivityType),
			resolve(parent,args)
			{
				return Connectivity.find({sid:parent.sid});
			}
		},
		technicaldetails:{
			type:new GraphQLList(TechnicalDetailsType),
			resolve(parent,args)
			{
				return TechnicalDetails.find({sid:parent.sid});
			}
		},
		samplemsg:{
			type:new GraphQLList(MessageType),
			resolve(parent,args)
			{
				return Message.find({sid:parent.sid});
			}
		},
		issuelist:{
			type:new GraphQLList(IssuesType),
			resolve(parent,args)
			{
				return Issues.find({sid:parent.sid});
			}
		},
		customization:{
			type:new GraphQLList(CustomizationType),
			resolve(parent,args)
			{
				return Customization.find({sid:parent.sid});
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields:{
		contact:{
			type:ContactType,
			args:{sid:{type:GraphQLString}},
			resolve(parent,args){
				console.log(typeof(args.siteId));
				return Contacts.findBySite(args.sid);
			}
		},
		site:{
			type:SiteType,
			args:{sid:{type:GraphQLString}},
			resolve(parent,args)
			{
				//$d = args.id;
				console.log(typeof(args.sid));
				//console.log(findBySiteId(args.sid));
				return Site.findBySite(args.sid);
			}
		},
		sites:{
			type:new GraphQLList(SiteType),
			resolve(parent,args)
			{
				return Site.find({});
			}
		},
		search:{
			type:new GraphQLList(SiteType),
			args:{name:{type:GraphQLString}},
			resolve(parent,args)
			{
				console.log(args.name);
				var pattern = new RegExp(args.name+'.*', "i"); /* case-insensitive RegExp search */
				return Site.find({name: pattern });
				//console.log(Site.search(args.name));
				//return Site.search(args.name);
			}
		},
		connectivity:{
			type:new GraphQLList(ConnectivityType),
			args:{sid:{type:GraphQLString}},
			resolve(parent,args)
			{
				return Connectivity.findBySite(args.sid);
			}
		},
		technicaldetails:{
			type: new GraphQLList(TechnicalDetailsType),
			args:{sid:{type:GraphQLString}},
			resolve(parent,args)
			{
				return TechnicalDetails.findBySite(args.sid);
			}
		},
		samplemsg:{
			type:new GraphQLList(MessageType),
			args:{sid:{type:GraphQLString}},
			resolve(parent,args)
			{
				return Message.findBySite(args.sid);
			}
		},
		issuelist:{
			type:new GraphQLList(IssuesType),
			args:{sid:{type:GraphQLString}},
			resolve(parent,args)
			{
				return Issues.findBySite(args.sid);
			}
		},
		customization:{
			type:new GraphQLList(CustomizationType),
			args:{sid:{type:GraphQLString}},
			resolve(parent,args)
			{
				return Customization.findBySite(args.sid);
			}
		}

	}
});


const Mutation = new GraphQLObjectType({
	name:'Mutation',
	fields:{
		addSite:{
			type:SiteType,
			args:{
				name:{type:GraphQLString},
				city:{type:GraphQLString},
				state:{type:GraphQLString},
				country:{type:GraphQLString},
				sid:{type:GraphQLString}
			},
			resolve(parent,args)
			{
			let site = new Site({
				name:args.name,
				city:args.city,
				state:args.state,
				country:args.country,
				sid:args.sid
			});
			return site.save();
			}
		},
		addContacts:{
			type:ContactType,
			args:{
				name:{type:new GraphQLNonNull(GraphQLString)},
				role:{type:new GraphQLNonNull(GraphQLString)},
				organization:{type:new GraphQLNonNull(GraphQLString)},
				email:{type:GraphQLString},
				phone:{type:GraphQLString},
				remark:{type:GraphQLString},
				status:{type:GraphQLString},
				sid:{type:GraphQLID}
				
			},
			resolve(parent,args)
			{
				let contacts = new Contacts({
					name:args.name,
					role:args.role,
					organization:args.organization,
					email:args.email,
					phone:args.phone,
					remark:args.remark,
					status:args.status,
					sid:args.sid
				});
				return contacts.save();
			}
		},
		addConnectivity:{
			type:ConnectivityType,
			args:{
				sid:{type:GraphQLString},
				conn_type:{type:GraphQLString},
				servertype:{type:GraphQLString},
				system:{type:GraphQLString},
				interfacetype:{type:GraphQLString},
				msg_evnt: {type:GraphQLString},
				interface_dir:{type:GraphQLString},
				source:{type:GraphQLString},
				source_ip:{type:GraphQLString},
				destination:{type:GraphQLString},
				destination_ip:{type:GraphQLString},
				port:{type:GraphQLString},
				AE_title:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				let connectivity = new Connectivity({
					sid:args.sid,
					conn_type:args.conn_type,
					servertype:args.servertype,
					system:args.system,
					interfacetype:args.interfacetype,
					msg_evnt:args.msg_evnt,
					interface_dir:args.interface_dir,
					source:args.source,
					source_ip:args.source_ip,
					destination:args.destination,
					destination_ip:args.destination_ip,
					port:args.port,
					AE_title:args.AE_title
				});
				return connectivity.save();
			}
		},
		addTechnicalDetails:{
				type:TechnicalDetailsType,
			args:{
				sid:{type:GraphQLString},
				SystemType:{type:GraphQLString},
				ApplicationRole:{type:GraphQLString},
				ApplicationName:{type:GraphQLString},
				Version:{type:GraphQLString},
				Ip:{type:GraphQLString},
				HostName:{type:GraphQLString},
				UserName:{type:GraphQLString},
				Password:{type:GraphQLString},
				Remark:{type:GraphQLString}
				
			},
			resolve(parent,args)
			{
				let tech = new TechnicalDetails({
					sid:args.sid,
					SystemType:args.SystemType,
					ApplicationRole:args.ApplicationRole,
					ApplicationName:args.ApplicationName,
					Version:args.Version,
					Ip:args.Ip,
					HostName:args.HostName,
					UserName:args.UserName,
					Password:args.Password,
					Remark:args.Remark
				});
				return tech.save();
			}
		},
		addMessage:{
			type:MessageType,
			args:{
				sid:{type:GraphQLString},
				message_type:{type:GraphQLString},
				message:{type:GraphQLString},
				source:{type:GraphQLString},
				from:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				let msg = new Message({
					sid:args.sid,
					message_type:args.message_type,
					message:args.message,
					source:args.source,
					from:args.from
				});
				return msg.save();
			}
		},
		addIssuelist:{
			type:IssuesType,
			args:{
				sid:{type:GraphQLString},
				issue_num:{type:GraphQLInt},
				status:{type:GraphQLString},
				logdata:{type:GraphQLString},
				system:{type:GraphQLString},
				issue:{type:GraphQLString},
				status_update:{type:GraphQLString},
				owner:{type:GraphQLString},
				case_num:{type:GraphQLString},
				priority:{type:GraphQLString},
				resolve_date:{type:GraphQLString}

			},
			resolve(parent,args)
			{
				let issue = new Issues({
					sid:args.sid,
					issue_num:args.issue_num,
					status:args.status,
					logdata:args.logdata,
					system:args.system,
					issue:args.issue,
					status:args.status,
					owner:args.owner,
					case_num:args.case_num,
					priority:args.priority,
					resolve_date:args.resolve_date

				});
				return issue.save();
			}
		},
		addCustomization:{
			type:CustomizationType,
			args:{
				sid:{type:GraphQLString},
				description:{type:GraphQLString},
			    details:{type:GraphQLString},
			    solution:{type:GraphQLString},
			    screenshot:{type:GraphQLString},
			    remark:{type:GraphQLString}

			},
			resolve(parent,args)
			{
				let customization = new Customization({
					sid:args.sid,
					description:args.description,
					details:args.details,
					solution:args.solution,
					screenshot:args.screenshot,
					remark:args.remark
				});
				return customization.save();
			}
		},
		
		updateContacts:{
			type:ContactType,
			args:{
				id:{type:GraphQLString},
				name:{type:GraphQLString},
				role:{type:GraphQLString},
				organization:{type:GraphQLString},
				email:{type:GraphQLString},
				phone:{type:GraphQLString},
				remark:{type:GraphQLString},
				status:{type:GraphQLString}
			},
			resolve(parent, args) {
			    return Contacts.findByIdAndUpdate(
			      args.id,
			      { $set: { name: args.name,role:args.role,organization:args.organization,email:args.email,phone:args.phone,
			      remark:args.remark,status:args.status } },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			  }
			},
		updateConnectivity:{
			type:ConnectivityType,
			args:{
				id:{type:GraphQLID},
				conn_type:{type:GraphQLString},
				servertype:{type:GraphQLString},
				system:{type:GraphQLString},
				interfacetype:{type:GraphQLString},
				msg_evnt: {type:GraphQLString},
				interface_dir:{type:GraphQLString},
				source:{type:GraphQLString},
				source_ip:{type:GraphQLString},
				destination:{type:GraphQLString},
				destination_ip:{type:GraphQLString},
				port:{type:GraphQLString},
				AE_title:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				return Connectivity.findByIdAndUpdate(
			      args.id,
			      { $set: { conn_type:args.conn_type,
					servertype:args.servertype,
					system:args.system,
					interfacetype:args.interfacetype,
					msg_evnt:args.msg_evnt,
					interface_dir:args.interface_dir,
					source:args.source,
					source_ip:args.source_ip,
					destination:args.destination,
					destination_ip:args.destination_ip,
					port:args.port,
					AE_title:args.AE_title } },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			}
		},
		updateTechnicalDetails:{
			type:TechnicalDetailsType,
			args:{
				id:{type:GraphQLID},
				SystemType:{type:GraphQLString},
				ApplicationRole:{type:GraphQLString},
				ApplicationName:{type:GraphQLString},
				Version:{type:GraphQLString},
				Ip:{type:GraphQLString},
				HostName:{type:GraphQLString},
				UserName:{type:GraphQLString},
				Password:{type:GraphQLString},
				Remark:{type:GraphQLString}
				//sid:{type:GraphQLString}
			},
			resolve(parent, args) {
			    return TechnicalDetails.findByIdAndUpdate(
			      args.id,
			      { $set: { SystemType:args.SystemType,
					ApplicationRole:args.ApplicationRole,
					ApplicationName:args.ApplicationName,
					Version:args.Version,
					Ip:args.Ip,
					HostName:args.HostName,
					UserName:args.UserName,
					Password:args.Password,
					Remark:args.Remark } },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			  }
			},
		updateCustomizations:{
			type:CustomizationType,
			args:{
				id:{type:GraphQLID},
				description:{type:GraphQLString},
			    details:{type:GraphQLString},
			    solution:{type:GraphQLString},
			    screenshot:{type:GraphQLString},
			    remark:{type:GraphQLString}
			},
			resolve(parent, args) {
			    return Customization.findByIdAndUpdate(
			      args.id,
			      { $set: { description:args.description,
					details:args.details,
					solution:args.solution,
					screenshot:args.screenshot,
					remark:args.remark } },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			  }
			},
		updateIssueList:{
			type:IssuesType,
			args:{
				id:{type:GraphQLID},
				issue_num:{type:GraphQLInt},
				status:{type:GraphQLString},
				logdata:{type:GraphQLString},
				system:{type:GraphQLString},
				issue:{type:GraphQLString},
				status_update:{type:GraphQLString},
				owner:{type:GraphQLString},
				case_num:{type:GraphQLString},
				priority:{type:GraphQLString},
				resolve_date:{type:GraphQLString}
			},
			resolve(parent, args) {
			    return Issues.findByIdAndUpdate(
			      args.id,
			      { $set: { issue_num:args.issue_num,
					status:args.status,
					logdata:args.logdata,
					system:args.system,
					issue:args.issue,
					status:args.status,
					owner:args.owner,
					case_num:args.case_num,
					priority:args.priority,
					resolve_date:args.resolve_date } },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			  }
			},
		updateSampleMessages:{
			type:MessageType,
			args:{
				id:{type:GraphQLID},
				message_type:{type:GraphQLString},
				message:{type:GraphQLString},
				source:{type:GraphQLString},
				from:{type:GraphQLString}
			},
			resolve(parent, args) {
			    return Message.findByIdAndUpdate(
			      args.id,
			      { $set: { message_type:args.message_type,
					message:args.message,
					source:args.source,
					from:args.from} },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			  }
			},
		deleteContact:{
			type:ContactType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = Contacts.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},
		deleteTecnicalDetails:{
			type:ContactType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = TechnicalDetails.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},
		deleteConnectivity:{
			type:ConnectivityType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = Connectivity.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},
		deleteCustomazitaion:{
			type:CustomizationType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = Customization.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},
		deleteIssue:{
			type:IssuesType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = Issues.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},
		deleteMessage:{
			type:MessageType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = Message.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},

		}

		
	
}) ;




module.exports = new GraphQLSchema({

	query:RootQuery,
	mutation:Mutation
	/*mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: Mutation
  })*/
});