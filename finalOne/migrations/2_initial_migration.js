var Surveys = artifacts.require("./Survey.sol");

module.exports = function(deployer) {
  deployer.deploy(Surveys);
};
