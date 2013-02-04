$(document).ready(function() {
	$('.nav').localScroll({hash: true});
	
	// if the church info box is checked on reload, go ahead and show the fields
	$("input.view_toggler:checked").parents(".form_input").next(".view_toggle").show();
	
		
	// for the form
	// setup a custom method for the validator
	$.validator.addMethod("notEqual", function(value, element, param) {
		return value != $(element).attr('placeholder');
	}, "Please specify a different (non-default) value");
	// add validation	
	$('#subForm')
	// for the form - to toggle the church fields
	.delegate("input.view_toggler:checkbox", 'change', function() {
		$(this).parents(".form_input").next(".view_toggle").toggle();
	})
	// position the error message if it exists
	.delegate("input, select", 'focus', function() {
		var $span = $(this).next('span.error');
		if ($span.length) {
			var marginLeft = -$span.outerWidth()/2;
			$span.css({
				'margin-left': marginLeft
			});
		}	
	})
	// reposition the error message in case the text changes
	.delegate("input", 'keyup', function() {
		var $span = $(this).next('span.error');
		if ($span.length) {
			var marginLeft = -$span.outerWidth()/2;
			$span.css({
				'margin-left': marginLeft
			});
		}		
	})
	// hide the error message if it exists
	.delegate("input, select", 'blur', function() {
		var $span = $(this).next('span.error');
		if ($span.length) {
			$span.css({
				'margin-left': '-9999px'
			});
		}		
	})
	// add validation
	.validate({
		submitHandler: function(form) {
			// to combine the first and last name fields into a hidden field that campaign monitor will use
	     	var str1 = $('input[name="first-name"]').val();
			var str2 = $('input[name="last-name"]').val();
			var fullname = str1+" "+str2;
			$('input[name="cm-name"]').attr('value', fullname);
			
			// to submit the form
			form.submit(function(){
				// This is only here becuase now it's hosted on my site,
				// and I don't actually want it to submit anymore and sign people up
				window.location.replace("/work/tgp/joined");
			});
		},
		errorElement: "span",
		rules: {
			'cm-edihtl-edihtl': { // email
				required: true,
				email: true
			},
			'first-name': { // first name
				 required: true,
				 notEqual: true
			},
			'last-name': { // last name
				 required: true,
				 notEqual: true
			},
			'cm-f-cjhjkj': { // ministry name
				 required: true,
				 notEqual: true
			},
			'cm-fo-cjhtdu': "required", // ministry role
			'cm-fo-cjhhtr': "required", // ministry size
			'cm-f-cjhhhd': { // ministry phone
				 required: true,
				 notEqual: true
			},
			'cm-f-cjhtkl': { // ministry address
				 required: true,
				 notEqual: true
			},
			'cm-f-cjhtkr': { // ministry city
				 required: true,
				 notEqual: true
			},
			'cm-fo-cjhtky': "required", // ministry state
			'cm-f-cjhtkj': { // zip
				required: true,
				digits: true,
				minlength: 5
			}
		},
		messages: {
			'cm-edihtl-edihtl': { // email
				required: "Enter your email address."
			},
			'first-name': "Enter your first name.", // first name
			'last-name': "Enter your last name.", // last name
			'cm-f-cjhjkj': "Enter the name of your church or ministry.", // ministry name
			'cm-fo-cjhtdu': "Select your role at this ministry.", // ministry role
			'cm-fo-cjhhtr': "Select the size of this ministry.", // ministry size
			'cm-f-cjhhhd': "Enter this ministry&#8217;s phone number.", // ministry phone
			'cm-f-cjhtkl': "Enter the street address for this ministry.", // ministry address
			'cm-f-cjhtkr': "Enter the city.", // ministry city
			'cm-fo-cjhtky': "Select the state.", // ministry state
			'cm-f-cjhtkj': { // zip
				required: "Enter the zip code.",
				minlength: jQuery.format("Enter {0} digits.")
			}
		}
	});
	
	// trigger the placeholder function if needed
	if (!Modernizr.input.placeholder) { $('input[placeholder]').lwPlaceholder(); }	
});