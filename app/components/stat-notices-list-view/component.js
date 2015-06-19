import DefaultStory from '../stories/story-types/default-story/component'
export default DefaultStory.extend({
	didInsertElement: function () {
		var obj = this;
		this.getData('http://statnotices.azurewebsites.net/api/applications/')
			.then(
				function (data) {
					data.forEach(function(item){
						// todo: make notices an ember data scheme
						// hook in to the rest api automatically
						// the transformed properties below can be appended to the models
						item._publicationDate = moment(data[0].publicationdate).calendar();
						
					});
					obj.set('items', data);
					
					/*
					0,
"_id":
"55842b7221201aa81471ddb3",
"contactAddress":
"31 Aire Quay, Hunslet, Leeds, LS10 1GA, ",
"contactEmail":
"",
"contactName":
"Mr Ho Ho",
"contactTelephone":
"",
"easting":
"430085",
"legislationSection":
"17",
"legislationSubSec1":
"3",
"legislationSubSec2":
"",
"legislationTitle":
"Licensing Act 2003",
"legislationURI":
"http://www.legislation.gov.uk/ukpga/2003/17/contents",
"northing":
"433985",
"objectionAddress":
"Entertainment Licensing, Leeds City Council, Civic Hall, Leeds, LS1 1UR",
"objectionContactPosition":
"",
"objectionDeadlineDate":
"6/7/2015 00:00:00",
"objectionDeadlineTime":
"23:59",
"objectionEmail":
"entertainment.licensing@leeds.gov.uk",
"postcode":
"",
"proposal":
"Notice of an application for the grant of a premises licence",
"proposalAddress1":
"Merrion Centre",
"proposalAddress2":
"26 - 28 Woodhouse Lane",
"proposalCounty":
"West Yorkshire",
"proposalDetails":
"This premises is a oriental supermarket applying for a premises licence to allow off sales. \r\rSupply of alcohol - Mon - Sat 10:00 until 19:00 and Sun 10:00 unitl 18:00.",
"proposalPostcode":
"LS2 8LX",
"proposalTown":
"Leeds",
"publicAccessURL":
"http://publicaccess.leeds.gov.uk/online-applications/licencingDetails.do?activeTab=summary&keyVal=NO1A7JJB0NH00",
"publicationdate":
"08/05/2015",
"reference":
"PREM/03615/001",
"signOffDetails":
"Licence applicant's appointed representative",
"signOffName":
"Mr Ho Ho",
"type":
"Licensing"
					*/
				},
				function (error) {
					console.log('ERROR:' + error);
				}
			)
	}
});
