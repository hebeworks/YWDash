import Ember from 'ember';

export default DS.Model.extend({
  title: DS.attr('string'),
  reference: DS.attr(),  // PREM/03615/001",
  proposal: DS.attr(),  // Notice of an application for the grant of a premises licence",
  type: DS.attr(),  // Licensing",
  publicationdate: DS.attr(),  // 08/05/2015",
  legislationTitle: DS.attr(),  // Licensing Act 2003",
  legislationSection: DS.attr(),  // 17",
  legislationSubSec1: DS.attr(),  // 3",
  legislationSubSec2: DS.attr(),  // ",
  legislationURI: DS.attr(),  // http://www.legislation.gov.uk/ukpga/2003/17/contents",
  proposalDetails: DS.attr(),  // This premises is a oriental supermarket applying for a premises licence to allow off sales. \ \ Supply of alcohol - Mon - Sat 10:00 until 19:00 and Sun 10:00 unitl 18:00.",
  proposalAddress1: DS.attr(),  // Merrion Centre",
  proposalAddress2: DS.attr(),  // 26 - 28 Woodhouse Lane",
  proposalTown: DS.attr(),  // Leeds",
  proposalCounty: DS.attr(),  // West Yorkshire",
  proposalPostcode: DS.attr(),  // LS2 8LX",
  easting: DS.attr(),  // 430085",
  northing: DS.attr(),  // 433985",
  contactName: DS.attr(),  // Mr Ho Ho",
  contactAddress: DS.attr(),  // 31 Aire Quay, Hunslet, Leeds, LS10 1GA, ",
  contactEmail: DS.attr(),  // ",
  contactTelephone: DS.attr(),  // ",
  objectionDeadlineDate: DS.attr(),  // 6/7/2015 00:00:00",
  objectionDeadlineTime: DS.attr(),  // 23:59",
  objectionContactPosition: DS.attr(),  // ",
  objectionAddress: DS.attr(),  // Entertainment Licensing, Leeds City Council, Civic Hall, Leeds, LS1 1UR",
  objectionEmail: DS.attr(),  // entertainment.licensing@leeds.gov.uk",
  signOffName: DS.attr(),  // Mr Ho Ho",
  signOffDetails: DS.attr(),  // Licence applicant's appointed representative",
  publicAccessURL: DS.attr(),  // http://publicaccess.leeds.gov.uk/online-applications/licencingDetails.do?activeTab=summary&keyVal=NO1A7JJB0NH00",
  postcode: DS.attr(),  // ",
    
  lat: DS.attr('number'),
  lng: DS.attr('number'),

  fullAddress: function () {
    var address =
      (this.get('proposalAddress1').notNullOrEmpty() ? this.get('proposalAddress1') + "<br />" : '')
      + (this.get('proposalAddress2').notNullOrEmpty() ? this.get('proposalAddress2') + "<br />" : '')
      + (this.get('proposalTown').notNullOrEmpty() ? this.get('proposalTown') + "<br />" : '')
      + (this.get('proposalCounty').notNullOrEmpty() ? this.get('proposalCounty') + "<br />" : '')
      + (this.get('proposalPostcode').notNullOrEmpty() ? this.get('proposalPostcode') + "<br />" : '')
      ;
    return address;
  }.property('proposalAddress1', 'proposalAddress2', 'proposalTown', 'proposalCounty', 'proposalPostcode'),

  markers: function () {
    return Ember.A([
      {
        title: this.get('title'),
        lat: this.get('lat'),
        lng: this.get('lng'),
        body: this.get('fullAddress')
      }
    ]);
  }.property('lat', 'lng'),

//  publicationDate: function () {
//    debugger;
//    return moment(this.get('publicationdate')).calendar();
//  }.property('publicationdate')



});
