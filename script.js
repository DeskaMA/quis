function searchprofile(){
	$('#images-list').html('');
	$.ajax({
		url: 'https://api.unsplash.com/search/users',
		type: 'get',
		dataType:'json',
		data: {
			'client_id' : '9226e835dfaf58dd0e5147ada1cab27e1fe3cb6f23b32bfcd88fbbab44cfd70c',
			'query' : $('#search-input').val()
		},
		success: function(result){
			if (result.total != 0){
				let images = result.results;
				
				$.each(images, function(i, data){
					let profile = data.profile_image;
					$('#images-list').append(`
						<div class="col-md-4">
							<div class="card">
							  <img src="`+ profile.large +`"  class="card-img-top">
							  <div class="card-body">
							    <h5 class="card-title">`+ data.name +`</h5>
							    <p class="card-text">Total Photo : `+ data.total_photos +`</p>
							    <a href="#" class="btn btn-primary see-profile" data-toggle="modal" data-target="#exampleModal" data-username="`+ data.username+`">Lihat Profile</a>
							  </div>
							</div>
							</div>
						`);
				});

				$('#search-input').val('');

			}
			else{
				$('#images-list').html(`
					<div class="col">
						<h1 class="text-center">Users Not Found! </h1>
					</div>
				`)
			}
		}
	});
}

$('#search-button').on('click',function(){
	searchprofile();
});

$('#search-input').on('keyup', function(event){
	if(event.keyCode == 13){
		searchprofile();
	}
});


$('#images-list').on('click','.see-profile', function(){
	$.ajax({
		url: 'https://api.unsplash.com/users/:username',
		type: 'get',
		dataType:'json',
		data: {
			'client_id' : '9226e835dfaf58dd0e5147ada1cab27e1fe3cb6f23b32bfcd88fbbab44cfd70c'
		},
		//ngestuck path tidak kebaca
		path: {
			'username' : $(this).data('username')
		},
		success: function(profile){
			if(profile.total === 1){
				let profile_id = profile.profile_image;
				$('.modal-body').html(`
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-4">
								<img src="`+ profile_id.large +`" class="img-fluid">
							</div>

							<div class="col-md-8">
							</div>
						</div>
					</div>
					`);
			}
		}
	});
});