var countries;
	var usStates;
	var caProvinces;
	var auTerritories;

	$(document).ready(function () {
		populateVariables();
		initDropdowns();
	});

	function getCountryCodeInput() {
		var countryInput = $("#Billto_CountryCode");
		if (countryInput.length == 0)
		{
			countryInput = $("#NewBillAddresses_CountryCode");
		}
		return countryInput;
	}

	function getStateInput() {
		var stateInput = $("#Billto_StateCode");
		if (stateInput.length == 0)
		{
			stateInput = $("#NewBillAddresses_StateCode");
		}
		return stateInput;
	}

	function populateVariables() {
		countries = {"US": "United States", 
		"AD": "Andorra", 
		"AE": "United Arab Emirates", 
		"AF": "Afghanistan", 
		"AG": "Antigua And Barbuda", 
		"AI": "Anguilla", 
		"AL": "Albania", 
		"AM": "Armenia", 
		"AN": "Netherlands Antilles", 
		"AO": "Angola", 
		"AQ": "Antarctica", 
		"AR": "Argentina", 
		"AS": "American Samoa", 
		"AT": "Austria", 
		"AU": "Australia", 
		"AW": "Aruba", 
		"AX": "Aland Islands", 
		"AZ": "Azerbaijan", 
		"BA": "Bosnia And Herzegovina", 
		"BB": "Barbados", 
		"BD": "Bangladesh", 
		"BE": "Belgium", 
		"BF": "Burkina Faso", 
		"BG": "Bulgaria", 
		"BH": "Bahrain", 
		"BI": "Burundi", 
		"BJ": "Benin", 
		"BL": "Saint Barthélemy", 
		"BM": "Bermuda", 
		"BN": "Brunei Darussalam", 
		"BO": "Bolivia", 
		"BR": "Brazil", 
		"BS": "Bahamas", 
		"BT": "Bhutan", 
		"BV": "Bouvet Island", 
		"BW": "Botswana", 
		"BY": "Belarus", 
		"BZ": "Belize", 
		"CA": "Canada", 
		"CC": "Cocos (Keeling) Islands", 
		"CD": "Congo, The Democratic Republic Of The", 
		"CF": "Central African Republic", 
		"CG": "Congo", 
		"CH": "Switzerland", 
		"CI": "Côte D'Ivoire", 
		"CK": "Cook Islands", 
		"CL": "Chile", 
		"CM": "Cameroon", 
		"CN": "China", 
		"CO": "Colombia", 
		"CR": "Costa Rica", 
		"CU": "Cuba", 
		"CV": "Cape Verde", 
		"CX": "Christmas Island", 
		"CY": "Cyprus", 
		"CZ": "Czech Republic", 
		"DE": "Germany", 
		"DJ": "Djibouti", 
		"DK": "Denmark", 
		"DM": "Dominica", 
		"DO": "Dominican Republic", 
		"DZ": "Algeria", 
		"EC": "Ecuador", 
		"EE": "Estonia", 
		"EG": "Egypt", 
		"EH": "Western Sahara", 
		"ER": "Eritrea", 
		"ES": "Spain", 
		"ET": "Ethiopia", 
		"FI": "Finland", 
		"FJ": "Fiji", 
		"FK": "Falkland Islands (Malvinas)", 
		"FM": "Micronesia, Federated States Of", 
		"FO": "Faroe Islands", 
		"FR": "France", 
		"GA": "Gabon", 
		"GB": "United Kingdom", 
		"GD": "Grenada", 
		"GE": "Georgia", 
		"GF": "French Guiana", 
		"GG": "Gurnsey", 
		"GH": "Ghana", 
		"GI": "Gibraltar", 
		"GL": "Greenland", 
		"GM": "Gambia", 
		"GN": "Guinea", 
		"GP": "Guadeloupe", 
		"GQ": "Equatorial Guinea", 
		"GR": "Greece", 
		"GS": "South Georgia And The South Sandwich Islands", 
		"GT": "Guatemala", 
		"GU": "Guam", 
		"GW": "Guinea-Bissau", 
		"GY": "Guyana", 
		"HK": "Hong Kong", 
		"HM": "Heard Island And Mcdonald Islands", 
		"HN": "Honduras", 
		"HR": "Croatia", 
		"HT": "Haiti", 
		"HU": "Hungary", 
		"ID": "Indonesia", 
		"IE": "Ireland", 
		"IL": "Israel", 
		"IM": "Isle Of Man", 
		"IN": "India", 
		"IO": "British Indian Ocean Territory", 
		"IQ": "Iraq", 
		"IR": "Iran, Islamic Republic Of", 
		"IS": "Iceland", 
		"IT": "Italy", 
		"JE": "Jersey", 
		"JM": "Jamaica", 
		"JO": "Jordan", 
		"JP": "Japan", 
		"KE": "Kenya", 
		"KG": "Kyrgyzstan", 
		"KH": "Cambodia", 
		"KI": "Kiribati", 
		"KM": "Comoros", 
		"KN": "Saint Kitts And Nevis", 
		"KP": "Korea, Democratic People'S Republic Of", 
		"KR": "Korea, Republic Of", 
		"KW": "Kuwait", 
		"KY": "Cayman Islands", 
		"KZ": "Kazakhstan", 
		"LA": "Lao People'S Democratic Republic", 
		"LB": "Lebanon", 
		"LC": "Saint Lucia", 
		"LI": "Liechtenstein", 
		"LK": "Sri Lanka", 
		"LR": "Liberia", 
		"LS": "Lesotho", 
		"LT": "Lithuania", 
		"LU": "Luxembourg", 
		"LV": "Latvia", 
		"LY": "Libyan Arab Jamahiriya", 
		"MA": "Morocco", 
		"MC": "Monaco", 
		"MD": "Moldova, Republic Of", 
		"ME": "Montenegro", 
		"MF": "Saint Martin", 
		"MG": "Madagascar", 
		"MH": "Marshall Islands", 
		"MK": "Macedonia, The Former Yugoslav Republic Of", 
		"ML": "Mali", 
		"MM": "Myanmar", 
		"MN": "Mongolia", 
		"MO": "Macao", 
		"MP": "Northern Mariana Islands", 
		"MQ": "Martinique", 
		"MR": "Mauritania", 
		"MS": "Montserrat", 
		"MT": "Malta", 
		"MU": "Mauritius", 
		"MV": "Maldives", 
		"MW": "Malawi", 
		"MX": "Mexico", 
		"MY": "Malaysia", 
		"MZ": "Mozambique", 
		"NA": "Namibia", 
		"NC": "New Caledonia", 
		"NE": "Niger", 
		"NF": "Norfolk Island", 
		"NG": "Nigeria", 
		"NI": "Nicaragua", 
		"NL": "Netherlands", 
		"NO": "Norway", 
		"NP": "Nepal", 
		"NR": "Nauru", 
		"NU": "Niue", 
		"NZ": "New Zealand", 
		"OM": "Oman", 
		"PA": "Panama", 
		"PE": "Peru", 
		"PF": "French Polynesia", 
		"PG": "Papua New Guinea", 
		"PH": "Philippines", 
		"PK": "Pakistan", 
		"PL": "Poland", 
		"PM": "Saint Pierre And Miquelon", 
		"PN": "Pitcairn", 
		"PR": "Puerto Rico", 
		"PS": "Palestinian Territory, Occupied", 
		"PT": "Portugal", 
		"PW": "Palau", 
		"PY": "Paraguay", 
		"QA": "Qatar", 
		"RE": "Réunion", 
		"RO": "Romania", 
		"RS": "Serbia", 
		"RU": "Russian Federation", 
		"RW": "Rwanda", 
		"SA": "Saudi Arabia", 
		"SB": "Solomon Islands", 
		"SC": "Seychelles", 
		"SD": "Sudan", 
		"SE": "Sweden", 
		"SG": "Singapore", 
		"SH": "Saint Helena", 
		"SI": "Slovenia", 
		"SJ": "Svalbard And Jan Mayen", 
		"SK": "Slovakia", 
		"SL": "Sierra Leone", 
		"SM": "San Marino", 
		"SN": "Senegal", 
		"ST": "Sao Tome And Principe", 
		"SV": "El Salvador", 
		"SY": "Syrian Arab Republic", 
		"SZ": "Swaziland", 
		"TC": "Turks And Caicos Islands", 
		"TD": "Chad", 
		"TF": "French Southern Territories", 
		"TG": "Togo", 
		"TH": "Thailand", 
		"TJ": "Tajikistan", 
		"TK": "Tokelau", 
		"TL": "Timor-Leste", 
		"TM": "Turkmenistan", 
		"TN": "Tunisia", 
		"TO": "Tonga", 
		"TR": "Turkey", 
		"TT": "Trinidad And Tobago", 
		"TV": "Tuvalu", 
		"TW": "Taiwan, Province Of China", 
		"TZ": "Tanzania, United Republic Of", 
		"UA": "Ukraine", 
		"UG": "Uganda", 
		"UM": "United States Minor Outlying Islands", 
		"UY": "Uruguay", 
		"UZ": "Uzbekistan", 
		"VA": "Holy See (Vatican City State)", 
		"VC": "Saint Vincent And The Grenadines", 
		"VE": "Venezuela", 
		"VG": "Virgin Islands, British", 
		"VI": "Virgin Islands, U.S.", 
		"VN": "Viet Nam", 
		"WF": "Wallis And Futuna", 
		"WS": "Samoa", 
		"YE": "Yemen", 
		"YT": "Mayotte", 
		"ZA": "South Africa", 
		"ZM": "Zambia", 
		"ZW": "Zimbabwe"};
		
		usStates = {"AL": "Alabama", 
		"AK": "Alaska", 
		"AZ": "Arizona", 
		"AR": "Arkansas", 
		"CA": "California", 
		"CO": "Colorado", 
		"CT": "Connecticut", 
		"DE": "Delaware", 
		"FL": "Florida", 
		"GA": "Georgia", 
		"HI": "Hawaii", 
		"ID": "Idaho", 
		"IL": "Illinois", 
		"IN": "Indiana", 
		"IA": "Iowa", 
		"KS": "Kansas", 
		"KY": "Kentucky", 
		"LA": "Louisiana", 
		"ME": "Maine", 
		"MD": "Maryland", 
		"MI": "Michigan", 
		"MN": "Minnesota", 
		"MS": "Mississippi", 
		"MO": "Missouri", 
		"MT": "Montana", 
		"NE": "Nebraska", 
		"NV": "Nevada", 
		"NH": "New Hampshire", 
		"NJ": "New Jersey", 
		"NM": "New Mexico", 
		"NY": "New York", 
		"NC": "North Carolina", 
		"ND": "North Dakota", 
		"OH": "Ohio", 
		"OK": "Oklahoma", 
		"OR": "Oregon", 
		"PA": "Pennsylvania", 
		"RI": "Rhode Island", 
		"SC": "South Carolina", 
		"SD": "South Dakota", 
		"TN": "Tennessee", 
		"TX": "Texas", 
		"UT": "Utah", 
		"VT": "Vermont", 
		"VA": "Virginia", 
		"WA": "Washington", 
		"DC": "Washington, D.C.", 
		"WV": "West Virginia", 
		"WI": "Wisconsin", 
		"WY": "Wyoming"};

		caProvinces = {"AB": "Alberta", 
		"BC": "British Columbia", 
		"MB": "Manitoba", 
		"NB": "New Brunswick", 
		"NL": "Newfoundland and Labrador", 
		"NT": "Northwest Territories", 
		"NS": "Nova Scotia", 
		"NU": "Nunavut", 
		"ON": "Ontario", 
		"PE": "Prince Edward Island", 
		"QC": "Québec", 
		"SK": "Saskatchewan", 
		"YT": "Yukon"};

		auTerritories = {"ACT": "Australian Capital Territory", 
		"NSW": "New South Wales", 
		"NT": "Northern Territory", 
		"QLD": "Queensland", 
		"SA": "South Australia", 
		"TAS": "Tasmania", 
		"VIC": "Victoria", 
		"WA": "Western Australia"};
	}

	function initDropdowns() {
		$(".Country").insertBefore($(".Street"));
		$(".Trx_BillCountry").insertBefore($(".Trx_BillAddress"));
		$("#NewBillAddresses_CountryCode").insertBefore($(".Trx_BillAddress"));
		
		$(".Country_CreateWallet").insertBefore($(".Street_CreateWallet"));
		$(".Wallet #billaddress>#Billto_CountryCode").insertBefore($(".Street_CreateWallet"));
		
		var country = $(getCountryCodeInput()).val();
		country = checkCountry(country);
			


		$(getCountryCodeInput()).replaceWith($("<select />", { id: getCountryCodeInput().attr('id'), name: getCountryCodeInput().attr('name') }));

		if (country == "")
		{
			var option = $("<option></option>")
							.attr("value","")
							.text(" -- select a country -- ");
			$(option).prop('selected', true);
			
			$(getCountryCodeInput()).append(option); 
		}

		$.each(countries, function(key, value) {   
			var option = $("<option></option>")
							.attr("value",key)
							.text(value);
			if (key == country)
			{
				$(option).prop('selected', true);
			}
			 $(getCountryCodeInput()).append(option); 
		});


		$(getCountryCodeInput()).change(function() {
			var country = $(this).val();
			switchStateControl(country);
		});

		switchStateControl(country);
	}

	function switchStateControl(country)
	{
		var state = $(getStateInput()).val();
		
		if (country == "US")
		{
			$(getStateInput()).replaceWith($("<select />", { id: getStateInput().attr('id'), name: getStateInput().attr('name') }).css('width', 'inherit').val(state));
			$.each(usStates, function(key, value) {   
				var option = $("<option></option>")
					.attr("value",key)
					.text(value);
					
				if (state == key)
				{
					$(option).prop("selected", true);
				}
				
				$(getStateInput()).append(option); 
			});
		}
		else if (country == "CA")
		{
			$(getStateInput()).replaceWith($("<select />", { id: getStateInput().attr('id'), name: getStateInput().attr('name') }).css('width', 'inherit').val(state));
			$.each(caProvinces, function(key, value) {   
				var option = $("<option></option>")
					.attr("value",key)
					.text(value);
					
				if (state == key)
				{
					$(option).prop("selected", true);
				}
				
				$(getStateInput()).append(option); 
			});

		}
		else if (country == "AU")
		{
			$(getStateInput()).replaceWith($("<select />", { id: getStateInput().attr('id'), name: getStateInput().attr('name') }).css('width', 'inherit').val(state));
			$.each(auTerritories, function(key, value) {   
				var option = $("<option></option>")
					.attr("value",key)
					.text(value);
					
				if (state == key)
				{
					$(option).prop("selected", true);
				}		
					
				$(getStateInput()).append(option); 
			});
		}
		else if (country == "")
		{
			$(getStateInput()).replaceWith($("<select />", { id: getStateInput().attr('id'), name: getStateInput().attr('name') }).css('width', 'inherit').val(state));
		}
		else
		{
			$(getStateInput()).replaceWith($("<input />", { type: "text", id: getStateInput().attr('id'), name: getStateInput().attr('name') }).val(state));
		}
	}

	function checkCountry(country) {
		if (country == undefined || country == "")
		{
			country = "US";
		}
		else
		{
			var value = countries[country];
			if (!value)
			{
				// Check other potential variations of the US.
				// If required add other countries
				if (country.toLowerCase() == "usa" 
					|| country.toLowerCase() == "u.s.a" 
					|| country.toLowerCase() == "u.s" 
					|| country.toLowerCase() == "united states" 
					|| country.toLowerCase() == "united states of america" 
					|| country.toLowerCase() == "u.s.a.")
				{
					country = "US";
				}
				else
				{
					country = "";
				}
			}
		}
		return country;
	}