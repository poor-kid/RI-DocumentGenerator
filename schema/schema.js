const graphql = require('graphql');
const Contacts = require('../models/contact-details');
const Site = require('../models/site-details');
const Connectivity = require('../models/connectivity-details');
const TechnicalDetails = require('../models/technicaldetails');
const Message = require('../models/sample-messages');
const Issues = require('../models/issue-list');
const Customization = require('../models/customizations');
const Testplan_ADT = require('../models/testplan/testplan_adt');
const Mappings = require('../models/mappings/mappings');
const Testplan_ORDER = require('../models/testplan/order_entry');
const Testplan_DMWL = require('../models/testplan/dmwl');
const Testplan_DICOM = require('../models/testplan/dicom');
const Testplan_Autocreate = require('../models/testplan/autocreate');
const Testplan_Validation = require('../models/testplan/validation');
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

const MappingsType= new GraphQLObjectType({
	name:"Mappings",
	fields:()=>({
		id:{type:GraphQLID},
		sid:{type:GraphQLString},
		mappings_type:{type:GraphQLString},
		field1:{type:GraphQLString},
		field2:{type:GraphQLString},
		field3:{type:GraphQLString},
		field4:{type:GraphQLString},
		parentId:{type:GraphQLString},
	//	contains:{type:GraphQLString}
		//searchField:{type:StringFilterInput}	
	})
});

const TestplanType =new GraphQLObjectType({
	name:"Testplan",
	fields:()=>({
		id:{type:GraphQLID},
		sid:{type:GraphQLString},
		test_type:{type:GraphQLString},
		test:{type:GraphQLString},
		test_des:{type:GraphQLString},
		expctd_result:{type:GraphQLString},
		status:{type:GraphQLString},
		notes:{type:GraphQLString},
		parentId:{type:GraphQLString},
		/*testplan_type:{
			type:new GraphQLList(TestplanType),
			args:{
				test_type:{type:GraphQLString},
				//parentId:{type:GraphQLString},
			},
			resolve(parent,args)
			{
				console.log(parent.test_type);
				return Testplan.filter(args.test_type);
			}
		}*/
	})
});

const CustomizationType = new GraphQLObjectType({
	name:"Customization",
	fields:()=>({
		id:{type:GraphQLID},
		sid:{type:GraphQLString},
		description:{type:GraphQLString},
	    details:{type:GraphQLString},
	    solution:{type:GraphQLString},
	    screenshot:{type:GraphQLString},
	    remark:{type:GraphQLString},
	    parentId:{type:GraphQLID}
	})
});

const IssuesType = new GraphQLObjectType({
	name:"Issues",
	fields:()=>({
		id:{type:GraphQLID},
		sid:{type:GraphQLString},
		issue_num:{type:GraphQLString},
		status:{type:GraphQLString},
		logdata:{type:GraphQLString},
		system:{type:GraphQLString},
		issue:{type:GraphQLString},
		status_update:{type:GraphQLString},
		owner:{type:GraphQLString},
		case_num:{type:GraphQLString},
		priority:{type:GraphQLString},
		resolve_date:{type:GraphQLString},
		parentId:{type:GraphQLID}
	})
});

const MessageType = new GraphQLObjectType({
	name:'Message',
	fields:()=>({
		id:{type:GraphQLID},
		message_type:{type:GraphQLString},
	    message:{type:GraphQLString},
	    source:{type:GraphQLString},
	    sid:{type:GraphQLString},
	    parentId:{type:GraphQLID}
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
		sid:{type:GraphQLString},
		parentId:{type:GraphQLID}

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
		AE_title:{type:GraphQLString},
		parentId:{type:GraphQLID},
		interface_route:{type:GraphQLString},
		map_name:{type:GraphQLString}
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
		parentId:{type:GraphQLID},
		site:{
			type:SiteType,
			resolve(parent,args)
			{
				return Site.findById(parent.parentId);
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
				console.log(parent[0]._id);
				return Contacts.find({parentId:parent[0]._id});
			}
		},
		connectivity:{
			type:new GraphQLList(ConnectivityType),
			resolve(parent,args)
			{
				return Connectivity.find({parentId:parent[0]._id});
			}
		},
		technicaldetails:{
			type:new GraphQLList(TechnicalDetailsType),
			resolve(parent,args)
			{
				return TechnicalDetails.find({parentId:parent[0]._id});
			}
		},
		samplemsg:{
			type:new GraphQLList(MessageType),
			resolve(parent,args)
			{
				return Message.find({parentId:parent[0]._id});
			}
		},
		issuelist:{
			type:new GraphQLList(IssuesType),
			resolve(parent,args)
			{
				return Issues.find({parentId:parent[0]._id});
			}
		},
		customization:{
			type:new GraphQLList(CustomizationType),
			resolve(parent,args)
			{
				return Customization.find({parentId:parent[0]._id});
			}
		},
		testplan_adt:{
			type: new GraphQLList(TestplanType),
			//args:{test_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				console.log("in testplan"+parent[0]._id);
				//console.log(Testplan.find({where :{and :[{parentId:parent[0]._id},{test_type:args.test_type}]}}));
				return Testplan_ADT.find({parentId:parent[0]._id});
			}
		},
		testplan_order:{
			type: new GraphQLList(TestplanType),
			resolve(parent,args)
			{
				return Testplan_ORDER.find({parentId:parent[0]._id});
			}
		},
		testplan_dmwl:{
			type: new GraphQLList(TestplanType),
			resolve(parent,args)
			{
				return Testplan_DMWL.find({parentId:parent[0]._id});
			}
		},
		testplan_dicom:{
			type: new GraphQLList(TestplanType),
			resolve(parent,args)
			{
				return Testplan_DICOM.find({parentId:parent[0]._id});
			}
		},
		testplan_autocreate:{
			type: new GraphQLList(TestplanType),
			resolve(parent,args)
			{
				return Testplan_Autocreate.find({parentId:parent[0]._id});
			}
		},
		testplan_validation:{
			type: new GraphQLList(TestplanType),
			resolve(parent,args)
			{
				return Testplan_Validation.find({parentId:parent[0]._id});
			}
		},
		mappings:{
			type: new GraphQLList(MappingsType),
			args:{mappings_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				temp = Mappings.find({parentId:parent[0]._id});
				return temp.find({mappings_type:args.mappings_type});
			}
		},
		mappings_adt:{
			type: new GraphQLList(MappingsType),
			args:{mappings_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				temp = Mappings.find({parentId:parent[0]._id});
				console.log(temp);
				return temp.find({mappings_type:args.mappings_type});
			}
		},
		mappings_orm:{
			type: new GraphQLList(MappingsType),
			args:{mappings_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				temp = Mappings.find({parentId:parent[0]._id});
				return temp.find({mappings_type:args.mappings_type});
			}
		},
		mappings_oru:{
			type: new GraphQLList(MappingsType),
			args:{mappings_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				temp = Mappings.find({parentId:parent[0]._id});
				return temp.find({mappings_type:args.mappings_type});
			}
		},
		mappings_autocreate:{
			type: new GraphQLList(MappingsType),
			args:{mappings_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				temp = Mappings.find({parentId:parent[0]._id});
				return temp.find({mappings_type:args.mappings_type});
			}
		},
		mappings_ian:{
			type: new GraphQLList(MappingsType),
			args:{mappings_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				temp = Mappings.find({parentId:parent[0]._id});
				return temp.find({mappings_type:args.mappings_type});
			}
		},
		mappings_dmwlinbound:{
			type: new GraphQLList(MappingsType),
			args:{mappings_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				temp = Mappings.find({parentId:parent[0]._id});
				return temp.find({mappings_type:args.mappings_type});
			}
		},
		mappings_dmwloutbound:{
			type: new GraphQLList(MappingsType),
			args:{mappings_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				temp = Mappings.find({parentId:parent[0]._id});
				return temp.find({mappings_type:args.mappings_type});
			}
		},
		mappings_tables:{
			type: new GraphQLList(MappingsType),
			args:{mappings_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				temp = Mappings.find({parentId:parent[0]._id});
				return temp.find({mappings_type:args.mappings_type});
			}
		},
		mappings_pics:{
			type: new GraphQLList(MappingsType),
			args:{mappings_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				temp = Mappings.find({parentId:parent[0]._id});
				return temp.find({mappings_type:args.mappings_type});
			}
		}

		
	})
});


const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields:{
		contact:{
			type:ContactType,
			args:{id:{type:GraphQLID}},
			resolve(parent,args){
				console.log(typeof(args.siteId));
				return Contacts.findById(args.id);
			}
		},
		site:{
			type:SiteType,
			args:{sid:{type:GraphQLString}},
			resolve(parent,args)
			{
				//$d = args.id;
				console.log(args.sid);
				//console.log(Site.find({sid:args.sid}));
				return Site.find({sid:args.sid});
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
				return Connectivity.find({sid:args.sid});
			}
		},
		technicaldetails:{
			type: new GraphQLList(TechnicalDetailsType),
			args:{sid:{type:GraphQLString}},
			resolve(parent,args)
			{
				return TechnicalDetails.find({sid:args.sid});
			}
		},
		samplemsg:{
			type:new GraphQLList(MessageType),
			args:{sid:{type:GraphQLString}},
			resolve(parent,args)
			{
				return Message.find({sid:args.sid});
			}
		},
		issuelist:{
			type:new GraphQLList(IssuesType),
			args:{sid:{type:GraphQLString}},
			resolve(parent,args)
			{
				return Issues.find({sid:args.sid});
			}
		},
		customization:{
			type:new GraphQLList(CustomizationType),
			args:{sid:{type:GraphQLString}},
			resolve(parent,args)
			{
				return Customization.find({sid:args.sid});
			}
		},
		testplan:{
			type:new GraphQLList(TestplanType),
			args:{test_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				return Testplan.find({test_type:args.test_type});
			}
		},
		testplans:{
			type:new GraphQLList(TestplanType),
			resolve(parent,args)
			{
				return Testplan.find({});
			}
		},
		mappings:{
			type:new GraphQLList(MappingsType),
			args:{mappings_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				return Mappings.find({mappings_type:args.mappings_type});
			}
		},
		mappings_adt:{
			type:new GraphQLList(MappingsType),
			args:{mappings_type:{type:GraphQLString}},
			resolve(parent,args)
			{
				return Mappings_ADT.find({mappings_type:args.mappings_type});
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
				role:{type:GraphQLString},
				organization:{type:GraphQLString},
				email:{type:GraphQLString},
				phone:{type:GraphQLString},
				remark:{type:GraphQLString},
				status:{type:GraphQLString},
				sid:{type:GraphQLID},
				parentId:{type:GraphQLID}
				
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
					sid:args.sid,
					parentId:args.parentId
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
				AE_title:{type:GraphQLString},
				parentId:{type:GraphQLID},
				interface_route:{type:GraphQLString},
				map_name:{type:GraphQLString}
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
					AE_title:args.AE_title,
					parentId:args.parentId,
					interface_route:args.interface_route,
					map_name:args.map_name
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
				Remark:{type:GraphQLString},
				parentId:{type:GraphQLID}
				
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
					Remark:args.Remark,
					parentId:args.parentId
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
				parentId:{type:GraphQLID}
			},
			resolve(parent,args)
			{
				let msg = new Message({
					sid:args.sid,
					message_type:args.message_type,
					message:args.message,
					source:args.source,
					parentId:args.parentId
				});
				return msg.save();
			}
		},
		addIssuelist:{
			type:IssuesType,
			args:{
				sid:{type:GraphQLString},
				issue_num:{type:GraphQLString},
				status:{type:GraphQLString},
				logdata:{type:GraphQLString},
				system:{type:GraphQLString},
				issue:{type:GraphQLString},
				status_update:{type:GraphQLString},
				owner:{type:GraphQLString},
				case_num:{type:GraphQLString},
				priority:{type:GraphQLString},
				resolve_date:{type:GraphQLString},
				parentId:{type:GraphQLID}

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
					resolve_date:args.resolve_date,
					parentId:args.parentId,
					status_update:args.status_update

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
			    remark:{type:GraphQLString},
			    parentId:{type:GraphQLID}

			},
			resolve(parent,args)
			{
				let customization = new Customization({
					sid:args.sid,
					description:args.description,
					details:args.details,
					solution:args.solution,
					screenshot:args.screenshot,
					remark:args.remark,
					parentId:args.parentId
				});
				return customization.save();
			}
		},

		addTestplan_Adt:{
			type:TestplanType,
			args:{
				sid:{type:GraphQLString},
				test_type:{type:GraphQLString},
				test:{type:GraphQLString},
				test_des:{type:GraphQLString},
				expctd_result:{type:GraphQLString},
				status:{type:GraphQLString},
				notes:{type:GraphQLString},
				parentId:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				let testplan = new Testplan_ADT({
					sid:args.sid,
					test_type:args.test_type,
					test:args.test,
					test_des:args.test_des,
					expctd_result:args.expctd_result,
					status:args.status,
					notes:args.notes,
					parentId:args.parentId
				});
				return testplan.save();
			}
		},
		addTestplan_order:{
			type:TestplanType,
			args:{
				sid:{type:GraphQLString},
				test_type:{type:GraphQLString},
				test:{type:GraphQLString},
				test_des:{type:GraphQLString},
				expctd_result:{type:GraphQLString},
				status:{type:GraphQLString},
				notes:{type:GraphQLString},
				parentId:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				let testplan = new Testplan_ORDER({
					sid:args.sid,
					test_type:args.test_type,
					test:args.test,
					test_des:args.test_des,
					expctd_result:args.expctd_result,
					status:args.status,
					notes:args.notes,
					parentId:args.parentId
				});
				return testplan.save();
			}
		},
		addTestplan_dmwl:{
			type:TestplanType,
			args:{
				sid:{type:GraphQLString},
				test_type:{type:GraphQLString},
				test:{type:GraphQLString},
				test_des:{type:GraphQLString},
				expctd_result:{type:GraphQLString},
				status:{type:GraphQLString},
				notes:{type:GraphQLString},
				parentId:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				let testplan = new Testplan_DMWL({
					sid:args.sid,
					test_type:args.test_type,
					test:args.test,
					test_des:args.test_des,
					expctd_result:args.expctd_result,
					status:args.status,
					notes:args.notes,
					parentId:args.parentId
				});
				return testplan.save();
			}
		},
		addTestplan_dicom:{
			type:TestplanType,
			args:{
				sid:{type:GraphQLString},
				test_type:{type:GraphQLString},
				test:{type:GraphQLString},
				test_des:{type:GraphQLString},
				expctd_result:{type:GraphQLString},
				status:{type:GraphQLString},
				notes:{type:GraphQLString},
				parentId:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				let testplan = new Testplan_DICOM({
					sid:args.sid,
					test_type:args.test_type,
					test:args.test,
					test_des:args.test_des,
					expctd_result:args.expctd_result,
					status:args.status,
					notes:args.notes,
					parentId:args.parentId
				});
				return testplan.save();
			}
		},
		addTestplan_autocreate:{
			type:TestplanType,
			args:{
				sid:{type:GraphQLString},
				test_type:{type:GraphQLString},
				test:{type:GraphQLString},
				test_des:{type:GraphQLString},
				expctd_result:{type:GraphQLString},
				status:{type:GraphQLString},
				notes:{type:GraphQLString},
				parentId:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				let testplan = new Testplan_Autocreate({
					sid:args.sid,
					test_type:args.test_type,
					test:args.test,
					test_des:args.test_des,
					expctd_result:args.expctd_result,
					status:args.status,
					notes:args.notes,
					parentId:args.parentId
				});
				return testplan.save();
			}
		},
		addTestplan_validation:{
			type:TestplanType,
			args:{
				sid:{type:GraphQLString},
				test_type:{type:GraphQLString},
				test:{type:GraphQLString},
				test_des:{type:GraphQLString},
				expctd_result:{type:GraphQLString},
				status:{type:GraphQLString},
				notes:{type:GraphQLString},
				parentId:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				let testplan = new Testplan_Validation({
					sid:args.sid,
					test_type:args.test_type,
					test:args.test,
					test_des:args.test_des,
					expctd_result:args.expctd_result,
					status:args.status,
					notes:args.notes,
					parentId:args.parentId
				});
				return testplan.save();
			}
		},

		addMappings:{
			type:MappingsType,
			args:{
				sid:{type:GraphQLString},
				mappings_type:{type:GraphQLString},
				field1:{type:GraphQLString},
				field2:{type:GraphQLString},
				field3:{type:GraphQLString},
				field4:{type:GraphQLString},
				parentId:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				let mappings = new Mappings({
					sid:args.sid,
					mappings_type:args.mappings_type,
					field1:args.field1,
					field2:args.field2,
					field3:args.field3,
					field4:args.field4,
					parentId:args.parentId
				});
				return mappings.save();
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
				AE_title:{type:GraphQLString},
				interface_route:{type:GraphQLString},
				map_name:{type:GraphQLString}
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
					AE_title:args.AE_title,
					interface_route:args.interface_route,
					map_name:args.map_name
				} },
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
				issue_num:{type:GraphQLString},
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
					resolve_date:args.resolve_date,
					status_update:args.status_update
					 } },
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
				source:{type:GraphQLString}
			},
			resolve(parent, args) {
			    return Message.findByIdAndUpdate(
			      args.id,
			      { $set: { message_type:args.message_type,
					message:args.message,
					source:args.source} },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			  }
			},

			updateTestplan_Adt:{
			type:TestplanType,
			args:{
				id:{type:GraphQLID},
				test_type:{type:GraphQLString},
				test:{type:GraphQLString},
				test_des:{type:GraphQLString},
				expctd_result:{type:GraphQLString},
				status:{type:GraphQLString},
				notes:{type:GraphQLString}
			},
			resolve(parent, args) {
			    return Testplan_ADT.findByIdAndUpdate(
			      args.id,
			      { $set: { test_type:args.test_type,
					test:args.test,
					test_des:args.test_des,
					expctd_result:args.expctd_result,
					status:args.status,
					notes:args.notes} },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			  }
			},
		updateTestplan_order:{
			type:TestplanType,
			args:{
				id:{type:GraphQLID},
				test_type:{type:GraphQLString},
				test:{type:GraphQLString},
				test_des:{type:GraphQLString},
				expctd_result:{type:GraphQLString},
				status:{type:GraphQLString},
				notes:{type:GraphQLString}
			},
			resolve(parent, args) {
			    return Testplan_ORDER.findByIdAndUpdate(
			      args.id,
			      { $set: { test_type:args.test_type,
					test:args.test,
					test_des:args.test_des,
					expctd_result:args.expctd_result,
					status:args.status,
					notes:args.notes} },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			  }
			},
		updateTestplan_dmwl:{
			type:TestplanType,
			args:{
				id:{type:GraphQLID},
				test_type:{type:GraphQLString},
				test:{type:GraphQLString},
				test_des:{type:GraphQLString},
				expctd_result:{type:GraphQLString},
				status:{type:GraphQLString},
				notes:{type:GraphQLString}
			},
			resolve(parent, args) {
			    return Testplan_DMWL.findByIdAndUpdate(
			      args.id,
			      { $set: { test_type:args.test_type,
					test:args.test,
					test_des:args.test_des,
					expctd_result:args.expctd_result,
					status:args.status,
					notes:args.notes} },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			  }
			},
		updateTestplan_dicom:{
			type:TestplanType,
			args:{
				id:{type:GraphQLID},
				test_type:{type:GraphQLString},
				test:{type:GraphQLString},
				test_des:{type:GraphQLString},
				expctd_result:{type:GraphQLString},
				status:{type:GraphQLString},
				notes:{type:GraphQLString}
			},
			resolve(parent, args) {
			    return Testplan_DICOM.findByIdAndUpdate(
			      args.id,
			      { $set: { test_type:args.test_type,
					test:args.test,
					test_des:args.test_des,
					expctd_result:args.expctd_result,
					status:args.status,
					notes:args.notes} },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			  }
			},
		updateTestplan_autocreate:{
			type:TestplanType,
			args:{
				id:{type:GraphQLID},
				test_type:{type:GraphQLString},
				test:{type:GraphQLString},
				test_des:{type:GraphQLString},
				expctd_result:{type:GraphQLString},
				status:{type:GraphQLString},
				notes:{type:GraphQLString}
			},
			resolve(parent, args) {
			    return Testplan_Autocreate.findByIdAndUpdate(
			      args.id,
			      { $set: { test_type:args.test_type,
					test:args.test,
					test_des:args.test_des,
					expctd_result:args.expctd_result,
					status:args.status,
					notes:args.notes} },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			  }
			},
		updateTestplan_validation:{
			type:TestplanType,
			args:{
				id:{type:GraphQLID},
				test_type:{type:GraphQLString},
				test:{type:GraphQLString},
				test_des:{type:GraphQLString},
				expctd_result:{type:GraphQLString},
				status:{type:GraphQLString},
				notes:{type:GraphQLString}
			},
			resolve(parent, args) {
			    return Testplan_Validation.findByIdAndUpdate(
			      args.id,
			      { $set: { test_type:args.test_type,
					test:args.test,
					test_des:args.test_des,
					expctd_result:args.expctd_result,
					status:args.status,
					notes:args.notes} },
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
		deleteTechnicalDetails:{
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
		deleteTestplan_Adt:{
			type:TestplanType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = Testplan_ADT.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},
		deleteTestplan_order:{
			type:TestplanType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = Testplan_ORDER.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},
		deleteTestplan_dmwl:{
			type:TestplanType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = Testplan_DMWL.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},
		deleteTestplan_dicom:{
			type:TestplanType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = Testplan_DICOM.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},
		deleteTestplan_autocreate:{
			type:TestplanType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = Testplan_Autocreate.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},
		deleteTestplan_validation:{
			type:TestplanType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = Testplan_Validation.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},
		deleteMappings:{
			type:MappingsType,
			args:{
				id:{type:GraphQLString}
			},
			resolve(parent,args)
			{
				const removeduser = Mappings.findByIdAndRemove(args.id).exec();
				    if (!removeduser) {
				      throw new Error('Error')
				    	}
				    return removeduser;
  				}
			},

			updateMappings:{
			type:MappingsType,
			args:{
				id:{type:GraphQLID},
				field1:{type:GraphQLString},
				field2:{type:GraphQLString},
				field3:{type:GraphQLString},
				field4:{type:GraphQLString},
			},
			resolve(parent,args)
			{
				return Mappings.findByIdAndUpdate(
			      args.id,
			      { $set: { field1:args.field1,
					field2:args.field2,
					field3:args.field3,
					field4:args.field4} },
			      { new: true }
			    )
			      .catch(err => new Error(err));
			  }
		},

		}	
});




module.exports = new GraphQLSchema({

	query:RootQuery,
	mutation:Mutation
	/*mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: Mutation
  })*/
});