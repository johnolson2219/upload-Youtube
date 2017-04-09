$(function() {
    const socket = io();
    var fileBox = $('#fileBox')
    , fileBoxLabel = $('#fileBoxLabel')
    , uploadButton = $('#uploadButton')
    , selectedFile = {}
    , defaultText
    , title = $('#title')
    , description = $('#description')
    , uploads = $('#uploads')
    , privacyStatus = $('#privacyStatus');


  /*****************************************************
   *                    FUNCTIONS                      *
   ****************************************************/

    
    function fileChosen(evnt) {
      selectedFile.video = evnt.target.files[0];

      // Text filler for title and description if left empty
      defaultText = selectedFile.video.name.split('.').slice(0)[0];
    }

    function resetInputFields(){
      title.val('').removeClass('valid')
      description.val('').removeClass('valid');
      fileBoxLabel.val('').removeClass('valid');
      fileBox.wrap('<form>').closest('form').get(0).reset();
      fileBox.unwrap(); 
    }


    function addFileInfo(){
      selectedFile.title = title.val() || defaultText
      selectedFile.description = description.val() || defaultText;
      selectedFile.privacyStatus = privacyStatus.find(":selected").text().toLowerCase();
    }

    /*****************************************************
     *                  LISTENERS                        *
     ****************************************************/

    $('select').material_select();

    fileBox.on('change', fileChosen);

    uploadButton.click(function(e){

      // Validate presence of file
      if (selectedFile.video === undefined) { 
        alert("Please select a file");
        return
      } 

      addFileInfo();
      resetInputFields();
      console.log(selectedFile)
      selectedFile.video = undefined;

    });


});