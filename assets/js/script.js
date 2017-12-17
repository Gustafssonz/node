$(document).ready(function() {
	var $results = $('.search .results');
	var type = document.search.action.split('/')[5];

	$('.search input').keyup(function(e) {
		var val = $(this).val();

		if (val.length < 2) {
			$results.html('');
			$results.addClass('hidden');
		} else {
			$.get(document.search.action + '?text=' + val, function(response) {
				var html = '';

				for (var item of response) {
					if (item.name) {
						html += `<a href="/${type}/${item._id}" class="result"><span>${item.name} (Id: ${item._id})</span></a>`;
					} else {
						html += `<a href="/${type}/${item._id}" class="result"><span>${item.firstName} ${item.lastName} (Id: ${item._id})</span></a>`;
					}
				}

				$results.html(html ? html : 'No results.');
				$results.removeClass('hidden');
			});
		}
	});
});