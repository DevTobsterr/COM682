





var GET_ALL_POSTS = "https://prod-41.northeurope.logic.azure.com:443/workflows/ada8698c48624789994237b4ebe7cdc0/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=H-_nvYbrkqw_I-Eoaee2adSPByE1ntgcubKWjjCglSo"
var CREATE_POST = "https://prod-22.northeurope.logic.azure.com:443/workflows/371ce87112b74820bfd65b64aac7dfbe/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=g55NINMpmqYlaUlp6hhEUz1Xe6-bT1lU83hl58SzfdU"


var BLOB_ACCOUNT = "https://com682cloud.blob.core.windows.net"
var BLOB_ACCOUNT_CDN = "https://tobykillencloudcdn.azureedge.net"


var DELETEPT1 = "https://prod-32.northeurope.logic.azure.com/workflows/3838c662550c43daac6f4b57dba6e961/triggers/manual/paths/invoke/api/v1/post/"
var DELETEPT2 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HVFHAmqp_EKb6txHWERQG6Xe5UwT4xnQ184vu0zfzrg"


//Handlers for button clicks
$(document).ready(function() {

  $("#getAllPosts").click(function(){
      $('#loading-database').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
      getAllPosts();
  }); 

  $("#uploadMedia").click(function(){
    submitPost();
  });

  


});








function submitPost(){
  //Create a form data object
   MediaFormData = new FormData();
   //Get form variables and append them to the form data object
   MediaFormData.append('FileName', $('#FileName').val());
   MediaFormData.append('userID', $('#userID').val());
   MediaFormData.append('PostCaption', $('#PostCaption').val());
   MediaFormData.append('userName', $('#userName').val());
   MediaFormData.append('File', $("#File")[0].files[0]);
  
   //Post the form data to the endpoint, note the need to set the content type header
   $.ajax({
   url: CREATE_POST,
   data: MediaFormData,
   cache: false,
   enctype: 'multipart/form-data',
   contentType: false,
   processData: false,
   type: 'POST',
   success: function(response){
      $("#media_form")[0].reset();
      getAllPosts();
   }
   });
  }



function deletePost(id) {
  console.log(id)
  $.ajax({
    type: "DELETE",
    url: DELETEPT1 + id + DELETEPT2,
  }).done(function( msg ) {
    getAllPosts();
  });
}






function getAllPosts() {
  
  $('#loading-database').html(' <br> <br> <br>  <div class="text-center" > <div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span> </div> <br> <br> <br> ');
  
  $.getJSON(GET_ALL_POSTS, function( response ) {
  //Create an array to hold all the retrieved assets
  var items = [];
 
  //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
  $.each( response, function( key, val ) {
    
    items.push("<div class='card'>")
    items.push("<div class='card-header'>" + "Post by User: " + val["userName"] + "</div>")
    items.push("<img class='card-img-top' src='"+ BLOB_ACCOUNT_CDN + val["filePath"] +"'>")
    items.push("<br>")

    items.push("<br>")
    items.push("<h5 class='card-title text-uppercase'>" + val["post_caption"] + "</h5>")
    items.push("<p class='card-text'> File Name: " + val["fileName"] + " Uploaded By: " + val["userName"]+ " User ID: " + val["userID"]+ "</p>")
    items.push("</div>")
    items.push('<button class="btn btn-outline-danger" type="button" onclick="deletePost(' + "'" + val["id"] + "'"+  ')"' + "> Delete Post </button>")


    items.push('<div class="container">')
    items.push('<form id="comment"> ')
    items.push('<div class="form-group">')
    items.push('<label for="postComment">Comments: </label>')
    items.push('<input type="text" class="form-control" id="postComment">')
    items.push('<div>')
    items.push('<br>')
    items.push('<button class="btn btn-outline-success" type="button" id="submitComment">Submit Comment</button>')
    items.push('</form>')
    items.push('<div>')
    items.push("<hr>")

  });
  //Clear the assetlist div
  $('#loading-database').empty();
  $("#loading-database").append(items);


  });


 }


//  <div class="card" style="width: 18rem;">
//   <img class="card-img-top" src="..." alt="Card image cap">
//   <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="btn btn-primary">Go somewhere</a>
//   </div>
// </div>