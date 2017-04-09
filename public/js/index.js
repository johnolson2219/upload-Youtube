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
      
      // Emit event via socket.io
      console.log(selectedFile)
      socket.emit('start', selectedFile);
      selectedFile.video = undefined;
      return false;
    });


    // Add List of recent uploads
    socket.on('done', function(video){
      var liContent = '<li class="collection-item avatar"><i class="material-icons circle red">play_arrow</i><span class="title">Title</span><p>'+ video.title+'</p></li>'
      
      if($('#recentUploads').has('p')){ 
        $('#empty').remove(); // Remove "No videos Uploaded Yet"
      }
      uploads.append(liContent);
      Materialize.toast('<span>Video uploaded successfully &nbsp;<i class="material-icons toast-icon" style="color:#46b705;">check_circle</i></span>', 4000)
    });
});

