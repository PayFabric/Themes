$(document).ready(function () {
    initTabOrder();
    $('#divBluefinTextInput label').text("P2PE");
    $('.BluefinRawData label').text("P2PE");
    //when the style value contains important, the $('#ccrawdata').width not works in IE
    $('#ccrawdata').attr('style','float: left; clear: both; border: 1px solid #b2aba3;border-radius: 0!important; height: 19px; margin-bottom: 10px; width: 287px!important;');
    $("#shipaddress > h5").html("Optional Fields");
    $("#trxL2Field > h5").html("Additional Information");
    for (var i = 1; i < 5; ++i) {
        $(".Desc" + i).children("label").text("Desc. " + i);
    }
    for (var i = 1; i < 4; ++i) {
        $(".Comment" + i).children("label").text("Comment " + i);
    }
    $(".phone").attr("placeholder", "");
    //Customer VAT Reg
    $("div[class*='Customer'][class*='VAT'][class*='Reg']").each(function () {
        var text = $(this).children("label").text();
        if (text.indexOf('.') == -1) {
            $(this).children("label").text(text + ".");
        }
    });

    // Disable mouse right click
    $(document).bind('contextmenu', function (e) {
        return false;
    });

    // Hide DOB for eCheck
    hideDOB();
    moveOriginationIdIntoCardContainer();
});

function initTabOrder() {
    var list = [];

    var tender;
    if ($("#Tender").length > 0) {
        tender = $("#Tender").val();
    } else {
        tender = $("#TenderType").val();
    }

    if (tender == "CreditCard") {
        list.push("NewCard_CardNumber");

        list.push("WalletCreditCard_CardNumber");

        list.push("exptime1");
        list.push("exptime2");

        list.push("NewCard_SecurityCode");
        //optional
        list.push("NewCard_ReqAuthCode");
        //optional
        list.push("ReqOriginid");

        list.push("NewCard_CardHolderFirstName");
        list.push("NewCard_CardHolderMiddleName");
        list.push("NewCard_CardHolderLastName");

        list.push("WalletCreditCard_CardHolderFirstName");
        list.push("WalletCreditCard_CardHolderMiddleName");
        list.push("WalletCreditCard_CardHolderLastName");

        list.push("WalletCreditCard_IsDefaultCard");

        list.push("NewCard_IsSaveCard");
        list.push("NewCard_IsDefaultCard");
        list.push("CreditCard_IsDefaultCard");

    } else if (tender == "ECheck") {

        list.push("NewCheck_AccountType");
        //optional
        list.push("NewCheck_CheckNumber");
        list.push("NewCheck_AccountNumber");
        list.push("NewCheck_ABANumber");

        list.push("NewCheck_CardHolderFirstName");
        list.push("NewCheck_CardHolderMiddleName");
        list.push("NewCheck_CardHolderLastName");
        //optional
        list.push("NewCheck_DriverLicense");
        list.push("NewCheck_SSN");

        list.push("WalletECheck_AccountType");
        list.push("WalletECheck_AccountNumber");
        list.push("WalletECheck_ABANumber");

        list.push("WalletECheck_CardHolderFirstName");
        list.push("WalletECheck_CardHolderMiddleName");
        list.push("WalletECheck_CardHolderLastName");
        list.push("WalletECheck_DriverLicense");
        list.push("WalletECheck_SSN");

        list.push("NewCheck_IsSaveCard");
        list.push("NewCheck_IsDefaultCard");
        list.push("WalletECheck_IsDefaultCard");
    }

    list.push("NewBillAddresses_AddressLine1");
    list.push("NewBillAddresses_AddressLine2");
    list.push("NewBillAddresses_AddressLine3");
    list.push("NewBillAddresses_CityCode");
    list.push("NewBillAddresses_StateCode");
    list.push("NewBillAddresses_ZipCode");
    list.push("NewBillAddresses_CountryCode");
    list.push("NewBillAddresses_Phone1");
    list.push("newBillAddressPhone1");
    list.push("NewBillAddresses_Email");

    list.push("Billto_AddressLine1");
    list.push("Billto_AddressLine2");
    list.push("Billto_AddressLine3");
    list.push("Billto_CityCode");
    list.push("Billto_StateCode");
    list.push("Billto_ZipCode");
    list.push("Billto_CountryCode");
    list.push("Billto_Email");
    list.push("billtoPhone1");
    list.push("Billto_Phone1");


    list.push("Document_Head_0__Value");
    list.push("Document_Head_1__Value");
    list.push("Document_Head_2__Value");
    list.push("Document_Head_3__Value");
    list.push("Document_Head_4__Value");
    list.push("Document_Head_5__Value");
    list.push("Document_Head_6__Value");

    list.push("Document_Head_7__Value");
    list.push("Document_Head_8__Value");
    list.push("Document_Head_9__Value");
    list.push("Document_Head_10__Value");
    list.push("Document_Head_11__Value");
    list.push("Document_Head_12__Value");
    list.push("Document_Head_13__Value");
    var tabIndex = 0;
    for (var i = 0; i < list.length; ++i) {
        var selector = "#" + list[i];
        //if ($(selector).length > 0 && $(selector).is(":visible") && !$(selector).is(":hidden")) {
        if ($(selector).length > 0) {
            $(selector).attr("tabIndex", ++tabIndex);
        }
    }
}

function hideDOB() {
    var tender = $('#Tender').val();
    if (tender == 'CreditCard')
    {
        $('.Date.Of.Birth').hide();
    }
}

function isValidDate(dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

function moveOriginationIdIntoCardContainer() {
$('#summary .origid').insertAfter($('#payment .CardNumber'));
}
