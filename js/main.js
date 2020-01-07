function ready() {
  console.log("kak");
  $.ajax({
     url:"https://www.google.com/",
     type:'GET',
     success: function(data){
         $('#content').html($(data).find('#content').html());
     }
  });
}
