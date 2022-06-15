describe("Showing the Admin Panel", function () {
  beforeEach(function (done) {
    Meteor.autorun(function (c) {

    });
  });

  it("should show the admin panel to admin", function () {
    expect($("h1").html()).toEqual("Admin");
  });
});
