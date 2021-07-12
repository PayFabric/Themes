// JavaScript source code
var countries;
var usStates;
var caProvinces;
var auTerritories;
var disabled;
var symbol = "$";

window.addEventListener('message', function (e) {
    if (e.data.act == 'ProcessTrx') {
        $("#btn_Process").click();
    } else if (e.data.act == 'SaveWallet') {
        $(".validation-summary-valid").children("ul:first").children("li:first").text('');
        $("#btn_Save").click();
    } else if (e.data.act == 'ViewWallet') {
        $("input").attr("disabled", "disabled");
        $("select").attr("disabled", "disabled");
        disabled = 'disabled';
    } else if (e.data.act == 'CurrencySymbol') {
        symbol = e.data.msg.symbol;
        $(".symbolAmt").text(symbol);
        $(".symbolFinal").text(symbol);
        $(".symbolSurcharge").text(symbol);
        var symbolWidth = parseInt($(".symbolAmt").width());
        if (symbolWidth > 30) {
            symbolWidth = symbolWidth + 4;
            $("#TrxAmount").attr("style", "padding-left:" + symbolWidth + "px !important");
        }

        symbolWidth = parseInt($(".symbolFinal").width());
        if (symbolWidth > 30) {
            symbolWidth = symbolWidth + 4;
            $("#FinalAmount").attr("style", "padding-left:" + symbolWidth + "px !important");
        }

        symbolWidth = parseInt($(".symbolSurcharge").width());
        if (symbolWidth > 30) {
            symbolWidth = symbolWidth + 4;
            $("#SurchargeAmount").attr("style", "padding-left:" + symbolWidth + "px !important");
        }
    } else {
        alert('Unknown message ' + e.data.act);
    }
});


$(document).ready(function () {
    $(".Checkoutpage #Referrer").val("*");
    SetFocusForTextbox();
    newWallet();
    overrideProcessButton();
    populateVariables();
    initDropdowns();
    initPlaceHolder();
    removeHtmlElementStyle();
    customDisplayAdjustment();
    postMessageToParent();
    initPayButtonText();
    appendCVV2();

    if (disabled == "disabled") {
        $("select").attr("disabled", "disabled");
        $("input").attr("disabled", "disabled");
    }

    $(".buttonContainer_S #btn_Save").on("click", function () {
        var resultMsg;
        $(document).ajaxComplete(function () {
            resultMsg = $(".validation-summary-valid").text();
            window.parent.postMessage({
                act: 'response',
                msg: {
                    answer: resultMsg,
                    cardid: $("#CardID").val()
                }
            }, '*');
        });
    });

    $(".buttonContainer #btn_Process").on("click", function () {
        var resultMsg;
        $(document).ajaxComplete(function (event, xhr, options) {
            resultMsg = $(".validation-summary-errors").text();
            window.parent.postMessage({
                act: 'trxResponse',
                msg: resultMsg
            }, '*');
        });
    });
    if ($(window).width() < 780) {
        $(".Checkoutpage #summary").insertAfter($(".Checkoutpage .Fix_CC"));
    }
});

$(window).resize(function () {
    if ($(window).width() < 780) {
        $(".Checkoutpage #summary").insertAfter($(".Checkoutpage .Fix_CC"));
    } else {
        $(".Checkoutpage #summary").insertBefore($(".Checkoutpage #payment"));
    }
});

//Sometimes textbox can not edit or focus on IE11, this function force to set focus on first name textbox to resolve this issue.
function SetFocusForTextbox() {
    if ($("#WalletECheck_CardHolderFirstName").length > 0) {
        $("#WalletECheck_CardHolderFirstName").focus();
    }
    if ($("#WalletCreditCard_CardHolderFirstName").length > 0) {
        $("#WalletCreditCard_CardHolderFirstName").focus();
    }
    if ($("#TrxAmount").length > 0) {
        $("#TrxAmount").focus();
    }
}

function EnterNewCard() {
    $("input").removeAttr("disabled");
    $("select").removeAttr("disabled");
    $("input").val("");
    $("select").val("");
    $(".CardContainer .RContainer img").remove();
}


function switchProcessMode() {
    $(".manualProcess").toggleClass("hidden");
    $(".emvProcess").toggleClass("hidden");

    if ($(".manualProcess.hidden")[0]) {
        $("#processModeSwitch a").text("Use Web Entry");
    } else {
        $("#processModeSwitch a").text("Use Payment Terminal");
    }

    if (this.document.body.scrollHeight < 580) {
        postMessageToParent();
    }
}

function customDisplayAdjustment() {
    $(".ExpDate").text("Expiration Date");
    $(".AccountNumber label").text("Account Number");
    $(".ABANumber label").text("Routing Number");
    $(".CustomerCSS-wallet_Echeck span").text("Save as Default");

    $("#payment .CardContainer .CardDate .ExpDate").text("Exp. Date");
    $("#payment .CardContainer .AccountNumber label").text("Account Number");
    $("#payment .CardContainer .ABANumber label").text("Routing Number");
    $("#payment .CardContainer .BluefinRawData label").text("Encrypted Card Data");
    $("#payment .CardContainer h6.CustomerCSS-wallet_Echeck span").text("Save as Default");
    $(".Checkoutpage #payment .CardContainer .savecard_h6Container .setdefaultwaleet span").text("Save as Default");
    $(".Checkoutpage #payment .CardContainer .savecard_h6Container .ccinput-issavecard span").text("Save for Later Use");
    $("#btn_Close").val("Cancel");
    $("#summary .total label").text("Amount");
    $("#summary .total label").after("<div class='symbolAmt'>" + symbol + "</div>");
    $("#summary #surchargeSection #surchargeright label").text("Surcharge (" + $("#SurchargePercentage").val() + "%)");
    $("#summary #surchargeSection #surchargeright label").after("<div class='symbolSurcharge'>" + symbol + "</div>");
    $("#summary #surchargeSection div.FinalAmount label").text("Total");
    $("#summary #surchargeSection div.FinalAmount label").after("<div class='symbolFinal'>" + symbol + "</div>");
    var symbolWidth = parseInt($(".symbolAmt").width());
    if (symbolWidth > 30) {
        symbolWidth = symbolWidth + 4;
        $("#TrxAmount").attr("style", "padding-left:" + symbolWidth + "px !important");
    }
    symbolWidth = parseInt($(".symbolFinal").width());
    if (symbolWidth > 30) {
        symbolWidth = symbolWidth + 4;
        $("#FinalAmount").attr("style", "padding-left:" + symbolWidth + "px !important");
    }
    symbolWidth = parseInt($(".symbolSurcharge").width());
    if (symbolWidth > 30) {
        symbolWidth = symbolWidth + 4;
        $("#SurchargeAmount").attr("style", "padding-left:" + symbolWidth + "px !important");
    }
    
    var cardnumber = $("#payment .CardContainer .ccinput-cardnumber");
    if (cardnumber.length > 0) {
        cardnumber.val(cardnumber.val().replace(/X+/g, '· · · · '));
    }

    var accountnumber = $("#payment .CardContainer .ccinput-accountnumber");
    if (accountnumber.length > 0) {
        accountnumber.val(accountnumber.val().replace(/X+/g, '· · · · '));
    }

    var abanumber = $("#payment .CardContainer .ccinput-abanumber");
    if (abanumber.length > 0) {
        abanumber.val(abanumber.val().replace(/X+/g, '· · · · '));
    }

    $("#processModeSwitch").insertBefore($('.manualProcess'));
    if ($(".manualProcess.hidden")[0]) {
        $("#processModeSwitch a").text("Use Web Entry");
    } else {
        $("#processModeSwitch a").text("Use Payment Terminal");
    }

    $('.emvProcess select#TransactionType').parent().hide();
    $('.emvProcess input#TrxAmount').parent().hide();

    $('#divBluefinTextInput label').text("Encrypted Card Data");

    $('.Wallet .EntryOption label').text("Entry Mode");
    $('.Wallet #CreditCardEntryOption option[value="1"]').text('Keyboard');
    $('.Wallet #CreditCardEntryOption option[value="2"]').text('P2PE Terminal');

    if ($('.Wallet .EntryOption').length > 0) {
        $('.Wallet #billaddress').css('padding', '0 20px 60px 20px');
    }

    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        $('.Wallet #billaddress').css('padding-bottom', function (index, curValue) {
            return parseInt(curValue, 10) + 1 + 'px';
        });
        $('.Wallet #payment .CardContainer .ccinput-rawdata').addClass('ccinput-rawdata-safari');
        $('.Wallet #payment .CardContainer .ccinput-rawdata').css('min-height', function (index, curValue) {
            return parseInt(curValue, 10) - 1 + 'px';
        });
    }

    if ($("#ChosenCardID option[value='-1']").length > 0) {
        if ($("#ChosenCardID option[value='']").length > 0) {
            $('<div id="divBlueFinDropdown"><label>Entry Mode</label><select id="divBlueFinSelect"><option value="">Keyboard</option><option value="-1">P2PE Terminal</option></select></div>').insertBefore($('#divBluefinTextInput'));

            $('.Checkoutpage #payment .CardContainer .RContainer').css('top', '80px');
            $(".Wallet #payment .CardContainer .RContainer").css('top', '80px');

            $('#divBlueFinSelect').on('change', function () {
                $("#ChosenCardID").val(this.value).change();
            });
        } else {
            $("#ChosenCardID").val("-1").change();
        }
    }
    if ($('#CreditCardEntryOption').length > 0) {
        $(".Wallet #payment .CardContainer .RContainer").css('top', '80px');
    } else {
        $(".Wallet #payment .CardContainer .RContainer").css('top', '5px');
    }
}

function getCountryCodeInput() {
    var countryInput = $("#Billto_CountryCode");
    if (countryInput.length == 0) {
        countryInput = $("#NewBillAddresses_CountryCode");
    }
    return countryInput;
}

function getStateInput() {
    var stateInput = $("#Billto_StateCode");
    if (stateInput.length == 0) {
        stateInput = $("#NewBillAddresses_StateCode");
    }
    return stateInput;
}

function populateVariables() {
    countries = {
        "US": "United States",
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
        "ZW": "Zimbabwe"
    };

    usStates = {
        "": "",
        "AL": "Alabama",
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
        "MA": "Massachusetts",
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
        "WY": "Wyoming"
    };

    caProvinces = {
        "AB": "Alberta",
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
        "YT": "Yukon"
    };

    auTerritories = {
        "ACT": "Australian Capital Territory",
        "NSW": "New South Wales",
        "NT": "Northern Territory",
        "QLD": "Queensland",
        "SA": "South Australia",
        "TAS": "Tasmania",
        "VIC": "Victoria",
        "WA": "Western Australia"
    };
}

function initDropdowns() {
    $(".Country").insertBefore($(".Street"));
    $(".manualProcess .Trx_BillCountry").insertBefore($(".Trx_BillAddress"));
    $("#NewBillAddresses_CountryCode").insertBefore($(".Trx_BillAddress"));

    $(".Country_CreateWallet").insertBefore($(".Street_CreateWallet"));
    $(".Wallet #billaddress>#Billto_CountryCode").insertBefore($(".Street_CreateWallet"));

    var country = $(getCountryCodeInput()).val();
    country = checkCountry(country);


    $(getCountryCodeInput()).replaceWith($("<select />", {
        id: getCountryCodeInput().attr('id'),
        name: getCountryCodeInput().attr('name')
    }));

    if (country == "") {
        var option = $("<option></option>")
            .attr("value", "")
            .text(" - select a country - ");
        $(option).prop('selected', true);

        $(getCountryCodeInput()).append(option);
    }

    $.each(countries, function (key, value) {
        var option = $("<option></option>")
            .attr("value", key)
            .text(value);
        if (key == country) {
            $(option).prop('selected', true);
        }
        $(getCountryCodeInput()).append(option);
    });


    $(getCountryCodeInput()).change(function () {
        var country = $(this).val();
        switchStateControl(country);
    });

    switchStateControl(country);
}

function switchStateControl(country) {
    var state = $(getStateInput()).val();

    if (country == "US") {
        $(getStateInput()).replaceWith($("<select />", {
            id: getStateInput().attr('id'),
            name: getStateInput().attr('name')
        }).css('width', 'inherit').val(state));
        $.each(usStates, function (key, value) {
            var option = $("<option></option>")
                .attr("value", key)
                .text(value);

            if (state == key) {
                $(option).prop("selected", true);
            }

            $(getStateInput()).append(option);
        });
    }
    else if (country == "CA") {
        $(getStateInput()).replaceWith($("<select />", {
            id: getStateInput().attr('id'),
            name: getStateInput().attr('name')
        }).css('width', 'inherit').val(state));
        $.each(caProvinces, function (key, value) {
            var option = $("<option></option>")
                .attr("value", key)
                .text(value);

            if (state == key) {
                $(option).prop("selected", true);
            }

            $(getStateInput()).append(option);
        });

    }
    else if (country == "AU") {
        $(getStateInput()).replaceWith($("<select />", {
            id: getStateInput().attr('id'),
            name: getStateInput().attr('name')
        }).css('width', 'inherit').val(state));
        $.each(auTerritories, function (key, value) {
            var option = $("<option></option>")
                .attr("value", key)
                .text(value);

            if (state == key) {
                $(option).prop("selected", true);
            }

            $(getStateInput()).append(option);
        });
    }
    else if (country == "") {
        $(getStateInput()).replaceWith($("<select />", {
            id: getStateInput().attr('id'),
            name: getStateInput().attr('name')
        }).css('width', 'inherit').val(state));
    }
    else {
        $(getStateInput()).replaceWith($("<input />", {
            type: "text",
            id: getStateInput().attr('id'),
            name: getStateInput().attr('name')
        }).val(state));
        $("#Billto_StateCode").attr('placeholder', 'State');
    }
}

function checkCountry(country) {
    if (country == undefined || country == "") {
        //country = "US";
    }
    else {
        var value = countries[country];
        if (!value) {
            // Check other potential variations of the US.
            // If required add other countries
            if (country.toLowerCase() == "usa"
                || country.toLowerCase() == "u.s.a"
                || country.toLowerCase() == "u.s"
                || country.toLowerCase() == "united states"
                || country.toLowerCase() == "united states of america"
                || country.toLowerCase() == "u.s.a.") {
                country = "US";
            }
            else {
                country = "";
            }
        }
    }
    return country;
}

function removeHtmlElementStyle() {
    $("#WalletCreditCard_CardNumber").attr('style', "");
    $("#WalletCreditCard_CardHolderFirstName").attr('style', "");
    $("#WalletCreditCard_CardHolderLastName").attr('style', "");
    $(".Checkoutpage #payment .CardContainer .ccinput-cardnumber").attr('style', "");
    $("#processModeSwitch").attr('style', "");
}
function initPlaceHolder() {
    $(".CardContainer .MiddleInitial").hide();
}

var postMessageToParent = function () {
    window.parent.postMessage({
        name: "hosted_payment.loaded",
        height: this.document.body.scrollHeight,
        width: this.document.body.scrollWidth
    }, "*");
};

function initPayButtonText() {
    $(".btn-process span").text("Confirm & Pay " + getUrlParameter('symbolAmt') + $("#TrxAmount").val());
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0].toLowerCase() === sParam.toLowerCase()) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

var newWallet = function () {
    var newWallet = getUrlParameter("newWallet");
    if (!newWallet) {
        return;
    }

    if ($("#ChosenCardID").val() === "" || $("#ChosenCardID").val() === "-1") {
        return;
    }

    if ($("#ChosenCardID option[value='']").length > 0) {
        $("#ChosenCardID").val("");
    } else if ($("#ChosenCardID option[value='-1']").length > 0) {
        $("#ChosenCardID").val("-1");
    }

    $("#ChosenCardID").trigger("change");
};

var overrideProcessButton = function () {
    var button = $("<button class='btn-process'><i></i><span></span></button>");
    $(".buttonContainer-CheckoutPage").append(button);
    $("#btn_Process").hide();
    $(button).click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#btn_Process").trigger('click');
    });
};

function mouseOver() {
    $("#tooltip").removeClass("hide-cvv2-tooltip");
    $("#tooltip").addClass("cvv2-tooltip");

    if ($('#divBlueFinSelect').length > 0) {
        if ($(window).width() > 780) {
            $('.Checkoutpage .cvv2-tooltip').css('top', '177px');
        } else {
            $('.Checkoutpage .cvv2-tooltip').css('top', '210px');
        }
    }
}

function mouseOut() {
    $("#tooltip").removeClass("cvv2-tooltip");
    $("#tooltip").addClass("hide-cvv2-tooltip");
}

function appendCVV2() {
    $('.cvv2 label').text('CVC');
    $('.cvv2 label').append("<span class='cvv2-help' onmouseover='mouseOver()' onmouseout='mouseOut()' ><svg version='1.2' preserveAspectRatio='none' viewBox='0 0 24 24' class='ng - element' style='opacity: 1; mix - blend - mode: normal; fill: rgb(26, 128, 195); width: 18px; height: 18px;'><g><path xmlns:default='http://www.w3.org/2000/svg' d='M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z' style='fill: rgb(26, 128, 195);'></path></g></svg></span >");
    $('.Checkoutpage').append("<div id='tooltip' class='hide-cvv2-tooltip'><img src='data:image/png;base64,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' /></div>");
}

