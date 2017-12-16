$(document).ready(function() {
	var $results = $('.search .results');
	var url = document.search.action.replace(window.location.origin, '');
	var type = url.split('/')[2];

	$('.search input').keyup(function(e) {
		var val = $(this).val();

		if (val.length < 2) {
			$results.html('');
			$results.addClass('hidden');
		} else {
			$.get(url + '?text=' + val, function(response) {
				var html = '';

				for (var item of response) {
					html += `<a href="/${type}/${item._id}" class="result"><span>${item.firstName} ${item.lastName} (Id: ${item._id})</span></a>`;
				}

				$results.html(html ? html : 'No results.');
				$results.removeClass('hidden');
			});
		}
	});
});