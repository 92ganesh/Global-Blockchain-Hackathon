App1 = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../pets.json', function(data) {
      var petsRow = $('#petsRow');
      var petTemplate = $('#petTemplate');

        petTemplate.find('.panel-title').text(data[1].topic);
        petTemplate.find('.topic').text(data[1].topic);
        petTemplate.find('.owner').text(data[1].owner);
        petTemplate.find('.details').text(data[1].details);
        petTemplate.find('.btn-adopt').attr('data-id',data[1].id);

        petsRow.append(petTemplate.html());

    });

    return await App.initWeb3();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App1.handleRef);
  },

  handleRef: function(event){
    event.preventDefault();

    var i =$(event.target).data('id');

    window.alert(i);

     window.location.href="index1.html";
   
  
  },

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
