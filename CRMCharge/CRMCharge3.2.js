var lastReferrer = '';

$(".billing .row .spt:contains('Street Addres')").text("Street Address *");
$(".billing .row .spt:contains('Billing Phone Number')").text("Phone");
$(".billing .row .spt:contains('Billing Email')").text("Email");

function trySetTabIndex(elementid, tabindex) {
    var ele = document.getElementById(elementid);
    if (ele != null) {
        ele.tabIndex = tabindex;
    }
}

function tryGetURLParameter(name) {
    var nameCount = name.length + 1;
    var startIndex = window.location.href.toLowerCase().indexOf(name);
    if (startIndex == -1) {
        return null;
    }
    startIndex = startIndex + nameCount;

    var endIndex = window.location.href.indexOf('&', startIndex);
    if (endIndex == -1) {
        endIndex = window.location.href.length;
    }

    return window.location.href.substring(startIndex, endIndex);
}

// Register the PayFabric Hosted Page to the Message Event
$(document).ready(function () {
    var returnURI = $("#ReturnUri").val();
    $("#ReturnUri").val(returnURI.replace('#', '%23').replace('?', '%3F'));

    var ChosenCardID = tryGetURLParameter('chosencardid');
    if (ChosenCardID != null && ChosenCardID != '') {
        var exists = false;
        var result = $("#ChosenCardID").find("option").each(function () {
            if (this.value == ChosenCardID) {
                exists = true;
                return false;
            }
        });
        if (exists == true) {
            $("#ChosenCardID").val(ChosenCardID).change();
        }
    }

    $(document).ajaxComplete(function (event, xhr, settings) {
        if (settings.url.toLowerCase().indexOf("processsubmitvalidate") > -1) {
            if (JSON.parse(xhr.responseText).ErrorMsg != null) {
                var returnURI = $("#ReturnUri").val();
                $("#ReturnUri").val(returnURI.replace('#', '%23').replace('?', '%3F'));
                if (settings.data.toLowerCase().indexOf("submitmode=process") > -1) {
                    //Note, we need both parent and top to account for legacy form rendering in CRM.
                    window.parent.postMessage(JSON.stringify({ API: "TryProcessTransaction", Result: false, Message: "Transaction is not valid." }), lastReferrer);
                    window.top.postMessage(JSON.stringify({ API: "TryProcessTransaction", Result: false, Message: "Transaction is not valid." }), lastReferrer);
                } else if (settings.data.toLowerCase().indexOf("submitmode=save") > -1) {
                    //Note, we need both parent and top to account for legacy form rendering in CRM.
                    window.parent.postMessage(JSON.stringify({ API: "TrySaveTransaction", Result: false, Message: "Transaction is not valid." }), lastReferrer);
                    window.top.postMessage(JSON.stringify({ API: "TrySaveTransaction", Result: false, Message: "Transaction is not valid." }), lastReferrer);
                }
            }
        }
    });

    isPopupMessage = "True";

    // Set the tab order and height for wallet page
    if ($("#WalletECheck_AccountNumber").length == 0) {
        // Credit Card
        trySetTabIndex('WalletCreditCard_CardHolderFirstName', 1);
        trySetTabIndex('WalletCreditCard_CardHolderLastName', 2);
        trySetTabIndex('WalletCreditCard_CardNumber', 3);
        trySetTabIndex('exptime1', 4);
        trySetTabIndex('exptime2', 5);
        trySetTabIndex('WalletCreditCard_IsDefaultCard', 6);
        trySetTabIndex('Billto_AddressLine1', 7);
        trySetTabIndex('Billto_AddressLine2', 8);
        trySetTabIndex('Billto_AddressLine3', 9);
        trySetTabIndex('Billto_CityCode', 10);
        trySetTabIndex('Billto_StateCode', 11);
        trySetTabIndex('Billto_ZipCode', 12);
        trySetTabIndex('Billto_CountryCode', 13);
        trySetTabIndex('Billto_Phone1', 14);
        trySetTabIndex('Billto_Email', 15);
    } else {
        // ECheck
        trySetTabIndex('WalletECheck_CardHolderFirstName', 1);
        trySetTabIndex('WalletECheck_CardHolderLastName', 2);
        trySetTabIndex('WalletECheck_AccountType', 3);
        trySetTabIndex('WalletECheck_AccountNumber', 4);
        trySetTabIndex('WalletECheck_ABANumber', 5);
        trySetTabIndex('WalletECheck_SSN', 6);
        trySetTabIndex('WalletECheck_DriverLicense', 7);
        trySetTabIndex('WalletECheck_IsDefaultCard', 8);
        trySetTabIndex('Billto_AddressLine1', 9);
        trySetTabIndex('Billto_AddressLine2', 10);
        trySetTabIndex('Billto_AddressLine3', 11);
        trySetTabIndex('Billto_CityCode', 12);
        trySetTabIndex('Billto_StateCode', 13);
        trySetTabIndex('Billto_ZipCode', 14);
        trySetTabIndex('Billto_CountryCode', 15);
        trySetTabIndex('Billto_Phone1', 16);
        trySetTabIndex('Billto_Email', 17);
    }

    if ($("#tenderflag").val() == "ECheck") {
        $("#payment").css("height", "375px");
        $(".savecard_h6Container").css("top", "360px");
    } else {
        $("#payment").css("height", "305px");
    }

    // Set the tab order for checkout page
    trySetTabIndex('NewCard_CardHolderFirstName', 1);
    trySetTabIndex('NewCard_CardHolderLastName', 2);
    trySetTabIndex('NewCard_CardNumber', 3);
    trySetTabIndex('exptime1', 4);
    trySetTabIndex('exptime2', 5);
    trySetTabIndex('NewCard_SecurityCode', 6);
    trySetTabIndex('NewCard_ReqAuthCode', 7);
    trySetTabIndex('NewCard_IsSaveCard', 8);
    trySetTabIndex('NewCard_IsDefaultCard', 9);

    trySetTabIndex('NewCheck_CardHolderFirstName', 1);
    trySetTabIndex('NewCheck_CardHolderLastName', 2);
    trySetTabIndex('NewCheck_AccountType', 3);
    trySetTabIndex('NewCheck_CheckNumber', 4);
    trySetTabIndex('NewCheck_AccountNumber', 5);
    trySetTabIndex('NewCheck_ABANumber', 6);
    trySetTabIndex('NewCheck_SSN', 7);
    trySetTabIndex('NewCheck_DriverLicense', 8);
    trySetTabIndex('NewCheck_IsSaveCard', 9);
    trySetTabIndex('NewCheck_IsDefaultCard', 10);

    trySetTabIndex('NewBillAddresses_AddressLine1', 11);
    trySetTabIndex('NewBillAddresses_AddressLine2', 12);
    trySetTabIndex('NewBillAddresses_AddressLine3', 13);
    trySetTabIndex('NewBillAddresses_CityCode', 14);
    trySetTabIndex('NewBillAddresses_StateCode', 15);
    trySetTabIndex('NewBillAddresses_ZipCode', 16);
    trySetTabIndex('NewBillAddresses_CountryCode', 17);
    trySetTabIndex('NewBillAddresses_Phone1', 18);
    trySetTabIndex('NewBillAddresses_Email', 19);

    if ($("#WalletCreditCard_CardNumber")[0]) {
        $("#WalletCreditCard_CardNumber")[0].style.setProperty('width', '330px', 'important')
    }


    if ($("#NewCard_CardNumber")[0]) {
        $("#NewCard_CardNumber")[0].style.setProperty('width', '330px', 'important')
    }

    if ($(".CardContainer .CardDate #exptime1")[0]) {
        $(".CardContainer .CardDate #exptime1")[0].style.setProperty('width', '160px', 'important')
    }

    if ($(".CardContainer .CardDate #exptime2")[0]) {
        $(".CardContainer .CardDate #exptime2")[0].style.setProperty('width', '160px', 'important')
    }

    window.addEventListener('message', ReceivedAPICall, false);
});

// The method to parse the API's and call the appropriate JavaScript function.
function ReceivedAPICall(event) {
    var data = JSON.parse(event.data);

    var result;

    if (data.API == "TrySetField") {
        result = TrySetField(data.FieldID, data.FieldValue);
    } else if (data.API == "TrySetFieldVisibility") {
        result = TrySetFieldVisibility(data.FieldID, data.IsVisible);
    } else if (data.API == "TrySaveTransaction") {
        result = TrySaveTransaction();
    } else if (data.API == "TryProcessTransaction") {
        result = TryProcessTransaction();
    } else if (data.API == "TryBatchTransaction") {
        result = TryBatchTransaction(data.AutoBatch, data.BatchID);
    } else if (data.API == "TrySwitchProcessingMode") {
        result = TrySwitchProcessingMode();
    } else if (data.API == "TryGetFieldSummary") {
        result = TryGetFieldSummary(data.Operation);
    } else {
        result = JSON.stringify({ API: data.API, Result: false, Message: "Invalid API call." });
    }

    lastReferrer = data.Referrer;
    //Note, we need both parent and top to account for legacy form rendering in CRM.
    window.parent.postMessage(result, data.Referrer);
    window.top.postMessage(result, data.Referrer);
}

function TryGetFieldSummary(operation) {
    return JSON.stringify({
        API: "TryGetFieldSummary",
        Operation: operation,
        SetupID_ID: $("#SetupID_ID option:selected").text(),
        TransactionType: $("#TransactionType").val(),
        CurrencyCode: $("#CurrencyCode").val(),
        TrxAmount: $("#TrxAmount").val()
    });
}

// Attempt to see the specific field ID.
// Throw errors if the field does not exist, or the field is flagged as readonly or disabled.
// If the field is a dropdown list either check the options for the specific value, then the specified 0 based index, other wise fail
// 
function TrySetField(fieldID, fieldValue) {
    if ($("#" + fieldID).length == 0) {
        return JSON.stringify({ API: "TrySetField", Result: false, Field: fieldID, Message: "Field " + fieldID + " does not exist." });
    }
    else {
        var field = $("#" + fieldID);
        if (field.attr("readonly") != undefined || field.attr("disabled") != undefined) {
            return JSON.stringify({ API: "TrySetField", Result: false, Field: fieldID, Value: field.val(), Message: "Field " + fieldID + " is read-only." });
        }
        else {
            if (fieldID == "SetupID_ID") {
                attachThemeName = "&trxtype=" + $("#TransactionType").val() + "&ChosenCardID=" + $("#ChosenCardID").val();
            }

            if (field.is("select")) {

                var exists = false;
                var result = field.find("option").each(function () {
                    if (this.value == fieldValue) {
                        exists = true;
                        return false;
                    }
                });

                if (exists) {
                    if (field.val() != fieldValue) {
                        field.val(fieldValue).change();
                    }
                    return JSON.stringify({ API: "TrySetField", Result: true, Field: fieldID, Value: fieldValue, Message: "Field successfully set." });
                }
                else if (!isNaN(fieldValue)) {
                    if ($(field.children()[fieldValue]).prop("selected") != true) {
                        $(field.children()[fieldValue]).prop("selected", true);
                        field.change();
                    }
                    return JSON.stringify({ API: "TrySetField", Result: true, Field: fieldID, Value: field.val(), Message: "Field successfully set." });
                } else {
                    var options = field.find('option').filter(function () { return $(this).text() == fieldValue; });
                    if (options.length != 0) {
                        if (options.prop("selected") != true) {
                            options.prop("selected", true);
                            field.change();
                        }
                        return JSON.stringify({ API: "TrySetField", Result: true, Field: fieldID, Value: field.val(), Message: "Field successfully set." });
                    } else {
                        return JSON.stringify({ API: "TrySetField", Result: false, Field: fieldID, Value: field.val(), Message: "Field " + fieldID + " value is invalid." });
                    }
                }
            } else if (field.attr('type') == 'checkbox') {
                if (field.prop('checked') != fieldValue) {
                    field.prop('checked', fieldValue).change();
                }
                return JSON.stringify({ API: "TrySetField", Result: true, Field: fieldID, Value: fieldValue, Message: "Field successfully set." });
            } else {
                if (field.val() != fieldValue) {
                    field.val(fieldValue).change();
                }
                return JSON.stringify({ API: "TrySetField", Result: true, Field: fieldID, Value: fieldValue, Message: "Field successfully set." });
            }
        }
    }
}

function TrySetFieldVisibility(fieldID, isVisible) {
    if ($("#" + fieldID).length == 0 && $("." + fieldID).length == 0) {
        return JSON.stringify({ API: "TrySetFieldVisibility", Result: false, Field: fieldID, Message: "Field " + fieldID + " does not exist." });
    }
    else {
        if (isVisible == true) {
            $("#" + fieldID).css('visibility', 'visible');
            $("." + fieldID).css('visibility', 'visible');
            return JSON.stringify({ API: "TrySetFieldVisibility", Result: true, Field: fieldID, Message: "Field successfully shown." });
        } else {
            $("#" + fieldID).css('visibility', 'hidden');
            $("." + fieldID).css('visibility', 'hidden');
            return JSON.stringify({ API: "TrySetFieldVisibility", Result: true, Field: fieldID, Message: "Field successfully hidden." });
        }
    }
}

// Try and call save transaction
function TrySaveTransaction() {
    if ($("#btn_Save").length == 0) {
        return JSON.stringify({ API: "TrySaveTransaction", Result: false, Message: "Transaction saving is not available." });
    }
    else {

        if ($(".loadmask-msg").length > 0) {
            return JSON.stringify({ API: "TryProcessTransaction", Result: false, Message: "Transaction is already in processing." });
        }

        if (document.location.href.toLowerCase().indexOf('transaction/process') > -1) {
            if ($("#submitform").valid() == false) {
                return JSON.stringify({ API: "TrySaveTransaction", Result: false, Message: "Transaction is not valid." });
            }

            if ($("#TransactionType").val().toLowerCase() == "force") {
                if ($("#NewCard_ReqAuthCode").val() == "") {
                    global.GetCommonObject().adderrormsg2('The authorize code is required for  Force transactions.', true);
                    return JSON.stringify({ API: "TrySaveTransaction", Result: false, Message: "The authorize code is required for  Force transactions." });
                }
            }
        }

        var returnURI = $("#ReturnUri").val();
        $("#ReturnUri").val(returnURI.replace('%23', '#').replace('%3F', '?'));

        $("#btn_Save").click();
        return JSON.stringify({ API: "TrySaveTransaction", Result: true, Message: "Transaction is saving." });
    }
}

// Try and call process transaction
function TryProcessTransaction() {
    if ($("#btn_Process").length == 0) {
        return JSON.stringify({ API: "TryProcessTransaction", Result: false, Message: "Transaction processing is not available." });
    }
    else {

        if ($(".loadmask-msg").length > 0) {
            return JSON.stringify({ API: "TryProcessTransaction", Result: false, Message: "Transaction is already in processing." });
        }

        if ($("#submitform").valid() == false) {
            return JSON.stringify({ API: "TryProcessTransaction", Result: false, Message: "Transaction is not valid." });
        }
        var returnURI = $("#ReturnUri").val();
        $("#ReturnUri").val(returnURI.replace('%23', '#').replace('%3F', '?'));

        $("#btn_Process").click();
        return JSON.stringify({ API: "TryProcessTransaction", Result: true, Message: "Transaction is processing." });
    }
}

// Try and call the batch transaction process.  This must be followed up with a subsequent save transaction API
function TryBatchTransaction(autoBatch, batchID) {
    if (autoBatch == true && (batchID == undefined || batchID == "")) {
        // Call the create batch URL
        if ($(".n-trx-usebatch").length == 0 || $(".n-trx-usebatch").is(":hidden")) {
            return JSON.stringify({ API: "TryBatchTransaction", Result: false, Message: "Transaction automatic batching is not available." });
        }
        $(".n-trx-usebatch").click();
    } else {
        var result = TrySetField("BatchNumber", batchID);
        if (result.Result == false) {
            result.API = "TryBatchTransaction";
            return JSON.stringify(result);
        }
    }
    return JSON.stringify({ API: "TryBatchTransaction", Result: true, Message: "Transaction successfully batched." });
}


// Try to switch between processing modes (Web Entry and EMV)
function TrySwitchProcessingMode() {
    if ($("#processModeSwitch a").length == 0) {
        return JSON.stringify({ API: "TrySwitchProcessingMode", Result: false, Message: "Unable to switch modes." });
    }
    else {
        $("#processModeSwitch a").click();
        return JSON.stringify({ API: "TrySwitchProcessingMode", Result: true, Message: "Processing mode switched." });
    }
}