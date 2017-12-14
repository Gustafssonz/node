$(document).ready(function() {
	$('#create-student .submit').click(function(e) {
		e.preventDefault();
		
		var form = document.create_student;

		form.submit();

		// $.post(form.action, $(document.create_student).serialize()).fail(function(err) {
		// 	console.log(err);
		// });
	});
});