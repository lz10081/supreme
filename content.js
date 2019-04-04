
let autofill = {
	name: 			null,
	email: 			null,
	tel: 			null,
	addr1: 			null,
	addr2: 			null,
	city: 			null,
	zipcode: 		null,
	country: 		null,
	states: 		null,
	cardnumb:		null,
	cnv: 			null,
	expmonth:		null,
	expyear:		null,
	desiredSize:	null
};

// Go to checkout page.
const goToCart = () => {
	window.location.href='http://www.supremenewyork.com/checkout';
	clearInterval(checkInCart);
	clearInterval(setSize);
};

// Fill out form and replace captcha response.
const fillCheckoutForm = () => {
	document.getElementById('order_billing_name').value				= autofill.name;
	document.getElementById('order_email').value					= autofill.email;
	document.getElementById('order_tel').value						= autofill.tel;
	document.getElementById('bo').value								= autofill.addr1;
	document.getElementById('oba3').value							= autofill.addr2;
	//document.getElementById('order_billing_address_3').value 	= autofill.addr3;
	document.getElementById('order_billing_city').value				= autofill.city;
	document.getElementById('order_billing_zip').value				= autofill.zipcode;
	document.getElementById('order_billing_country').value			= autofill.country;
	document.getElementById('order_billing_state').value			= autofill.states;
	console.log('    ✔ Filled out billing details');
	document.getElementById('nnaerb').value							= autofill.cardnumb;
	document.getElementById('orcer').value							= autofill.cnv;
	document.getElementById('credit_card_month').value				= autofill.expmonth;
	document.getElementById('credit_card_year').value				= autofill.expyear;
	console.log('    ✔ Filled out credit card details');
	document.getElementById('order_terms').checked = true;
	console.log('    ✔ Terms Accepted');
};


// Retrieves user data and starts script.
const onReceiveConfig = (config) => {
	console.log(config);
	console.log('Getting user details.');
	autofill.name			=	config.autofill.order_billing_name;
	console.log('    ✔ Name = ' + config.autofill.order_billing_name);
	autofill.email 			=	config.autofill.order_email;
	autofill.tel			=	config.autofill.order_tel;
	autofill.addr1			=	config.autofill.bo;
	autofill.addr2			=	config.autofill.oba3;
	autofill.city			=	config.autofill.order_billing_city;
	autofill.zipcode		= config.autofill.order_billing_zip;
	autofill.country		= config.autofill.order_billing_country;
	autofill.states     	= config.autofill.order_billing_state;
	console.log('    ✔ states = ' + config.order_billing_state);
	autofill.cardnumb		= config.autofill.number;
	autofill.cnv			= config.autofill.orcer;
	autofill.expmonth		= config.autofill.credit_card_month;
	autofill.expyear		= config.autofill.credit_card_year;
	//autofill.desiredSize	= config.autofill.size;
	console.log('    ✔ Obtained user details');

	// If we are on a product page.
	const pathname = window.location.pathname;
	if (pathname !== '/checkout' && pathname.length > 25) {	// If we are on product page.
		console.log('[STATUS]: On product page.');

		const add_to_cart = setInterval(() => {
			// If we have the item in our cart.
			if (document.getElementById('cart-remove')) {
				console.log('    ✔  ADDED TO CART');
				console.log('Attempting to visit checkout page...');
				clearInterval(add_to_cart);
				goToCart();
			}

			// Set the Size & Add to Cart.
			
			if (autofill.desiredSize === "None")
				return;
		}, 250);

	}
	else if (pathname == '/checkout') {
		console.log('[STATUS]: On checkout page');
		console.log('Filling out details.');
		fillCheckoutForm();
	}
	else {
		console.log('[STATUS]: On page ' + pathname);
		console.log('         ¬No work to do.');
	}

};

// Checking to see if we are on a product page.
const check_page = setInterval(() => {
	if (document.getElementById('size')) {
		chrome.storage.local.get(['autofill'], onReceiveConfig);
		clearInterval(check_page);
	}
}, 250);

/* Attempt to pull in autofill. */
chrome.storage.local.get(['autofill'], onReceiveConfig);
