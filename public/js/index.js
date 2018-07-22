$(function() {
  const socket = io();
  var uploadButton = $('#uploadButton'),
    addButton = $("#addButton"),
    bySlugBtn = $("#bySlugBtn"),
    defaultText, title = $('#title'),
    videos = [],
    url = $('#url'),
    uploads = $('#uploads'),
    slug = $('#slug'),
    queueContainer = $("#videoQueue"),
    privacyStatus = $('#privacyStatus');


  function resetInputFields() {
    url.val('');
  }

  /*****************************************************
   *                  LISTENERS                        *
   ****************************************************/

  $('select').material_select();
  
  bySlugBtn.click(e=>{
    $.post("/byChiaSlug", {slug: slug.val()}, (data)=>{
      Materialize.toast(data);
    })
  })

  addButton.click(function(e) {
    const video = {
      url: url.val(),
      title: title.val(),
      privacyStatus: privacyStatus.val()
    }
    let liContent = '<li class="collection-item avatar"><span class="title">Title</span><p>' + video.title + '</p></li>'
    if ($('#videoQueue').has('p')) {
      $('#emptyQueue').remove(); // Remove "No videos Uploaded Yet"
    }
    queueContainer.append(liContent);
    videos.push(video);
    resetInputFields();
  })
  uploadButton.click(function(e) {
    $.post("/start", {videos}, (data)=>{
      Materialize.toast(data);
    })
  });

  // Add List of recent uploads
  socket.on('done', function(video) {

    if ($('#recentUploads').has('p')) {
      $('#empty').remove(); // Remove "No videos Uploaded Yet"
    }
    uploads.append(liContent);
    Materialize.toast('<span>Video uploaded successfully &nbsp;<i class="material-icons toast-icon" style="color:#46b705;">check_circle</i></span>', 4000)
  });
});