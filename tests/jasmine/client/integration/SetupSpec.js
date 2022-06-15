describe("Showing the Setup page", function () {
  beforeEach(function () {
    MeteorStubs.install();
    mock(global, 'Responses');
  });

  afterEach(function () {
    MeteorStubs.uninstall();
  });

  it("should show the setup page if no admin", function () {
    expect($("div.setup > h2").html()).toEqual("Welcome!");
  });
});
