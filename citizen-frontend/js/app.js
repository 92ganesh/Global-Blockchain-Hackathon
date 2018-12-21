App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

      for (i = 0; i < data.length; i ++) {
        petTemplate.find('.panel-title').text(data[i].topic);
        petTemplate.find('.topic').text(data[i].topic);
        petTemplate.find('.owner').text(data[i].owner);
        petTemplate.find('.details').text(data[i].details);
        petTemplate.find('.btn-adopt').attr('data-id',data[i].id);

        petsRow.append(petTemplate.html());
      }

      

    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Refendrum.json', function(data) {
  // Get the necessary contract artifact file and instantiate it with truffle-contract
  var RefendrumArtifact = data;
  App.contracts.Refendrum = TruffleContract(RefendrumArtifact);

  // Set the provider for our contract
  App.contracts.Refendrum.setProvider(App.web3Provider);

  // Use our contract to retrieve and mark the adopted pets
});

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleRef);
  },

  handleRef: function(event){
    event.preventDefault();

    var k=$(event.target).data('id');

     window.location.href="index1.html";
   /*
        petTemplate.find('.panel-title').text(data[k].topic);
        petTemplate.find('.topic').text(data[k].topic);
        petTemplate.find('.owner').text(data[k].owner);
        petTemplate.find('.details').text(data[k].details);
        petTemplate.find('.btn-adopt').attr('data-id',data[k].id);
     */   
  
  },

  handleAdopt: function(event) {
    event.preventDefault();

    var petId = parseInt($(event.target).data('id'));


    //window.alert("Hello");
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
