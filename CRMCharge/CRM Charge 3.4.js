var lastReferrer = '';
var ErrorPurl="";
var Uci;
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
    includeStyleElement();
    //var returnURI = $("#ReturnUri").val();
    //$("#ReturnUri").val(returnURI.replace('#', '%23').replace('?', '%3F'));

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
            
             //$("#ReturnUri").val(returnURI.replace('%23', '#').replace('%3F', '?'));
            //$("#ReturnUri").val(returnURI.replace('#', '%23').replace('?', '%3F'));
            if (JSON.parse(xhr.responseText).ErrorMsg != null) {
                var returnURI = $("#ReturnUri").val();
                $("#ReturnUri").val(returnURI.replace('#', ''));
                if (settings.data.toLowerCase().indexOf("submitmode=process") > -1) {
                    //Note, we need both parent and top to account for legacy form rendering in CRM.
                    if(!Uci)
                    {
                    window.parent.postMessage(JSON.stringify({ API: "TryProcessTransaction",Purl:ErrorPurl, Result: false, Message: "Transaction is not valid." }), lastReferrer);
                    window.top.postMessage(JSON.stringify({ API: "TryProcessTransaction", Result: false,Purl:ErrorPurl, Message: "Transaction is not valid." }), lastReferrer);
                    }
                    else
                    {
                        window.top.postMessage(JSON.stringify({ API: "TryProcessTransaction", Result: false,Purl:ErrorPurl, Message: "Transaction is not valid." }), lastReferrer);
                    }
                } else if (settings.data.toLowerCase().indexOf("submitmode=save") > -1) {
                    //Note, we need both parent and top to account for legacy form rendering in CRM.
                    if(!Uci)
                    {
                    window.parent.postMessage(JSON.stringify({ API: "TrySaveTransaction", Result: false, Message: "Transaction is not valid." }), lastReferrer);
                    window.top.postMessage(JSON.stringify({ API: "TrySaveTransaction", Result: false,Purl:ErrorPurl, Message: "Transaction is not valid." }), lastReferrer);
                    }
                    else
                    {
                        window.top.postMessage(JSON.stringify({ API: "TrySaveTransaction", Result: false,Purl:ErrorPurl, Message: "Transaction is not valid." }), lastReferrer);
                    }
                }
            }
            else
            {
                var returnURI = $("#ReturnUri").val();
                $("#ReturnUri").val(returnURI.replace('%23', '#'));
                if($("#ReturnUri").val().indexOf('#')<0)
                {
                    $("#ReturnUri").val(returnURI+"#");
                }
            }
        }
    });
    //alert( "onload:"+$("#ReturnUri").val());
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
    //var returnURI = $("#ReturnUri").val();
   // $("#ReturnUri").val(returnURI.replace('#', '%23').replace('?', '%3F'));
    var data = JSON.parse(event.data);
    ErrorPurl=data.Purl;
    var result;

    if (data.API == "TrySetField") {
        result = TrySetField(data.FieldID, data.FieldValue,data.Purl);
    } else if (data.API == "TrySetFieldVisibility") {
        result = TrySetFieldVisibility(data.FieldID, data.IsVisible,data.Purl);
    } else if (data.API == "TrySaveTransaction") {
        result = TrySaveTransaction(data.Purl);
    } else if (data.API == "TryProcessTransaction") {
        result = TryProcessTransaction(data.Purl);
    } else if (data.API == "TryBatchTransaction") {
        result = TryBatchTransaction(data.AutoBatch, data.BatchID,data.Purl);
    } else if (data.API == "TrySwitchProcessingMode") {
        result = TrySwitchProcessingMode(data.Purl);
    } else if (data.API == "TryGetFieldSummary") {
        result = TryGetFieldSummary(data.Operation,data.Purl);
    } else {
        result = JSON.stringify({ API: data.API,Purl:data.Purl, Result: false, Message: "Invalid API call." });
    }

    lastReferrer = data.Referrer;
    //Note, we need both parent and top to account for legacy form rendering in CRM.
    if(!data.IsUci)
    {
        Uci=false;
        window.parent.postMessage(result, data.Referrer);
        window.top.postMessage(result, data.Referrer);
    }
    else
    {
        Uci=true;
        window.top.postMessage(result, data.Referrer);
        //window.parent.postMessage(result, data.Referrer);
    }
}

function TryGetFieldSummary(operation,Purl) {
    return JSON.stringify({
        API: "TryGetFieldSummary",
        Operation: operation,
        Purl:Purl,
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
function TrySetField(fieldID, fieldValue,Purl) {
    //var returnURI = $("#ReturnUri").val();
    //$("#ReturnUri").val(returnURI.replace('#', '%23').replace('?', '%3F'));
    //$("#ReturnUri").val(returnURI+"#");
    if ($("#" + fieldID).length == 0) {
        return JSON.stringify({ API: "TrySetField",Purl:Purl, Result: false, Field: fieldID, Message: "Field " + fieldID + " does not exist." });
    }
    else {
        var field = $("#" + fieldID);
        if (field.attr("readonly") != undefined || field.attr("disabled") != undefined) {
            return JSON.stringify({ API: "TrySetField",Purl:Purl, Result: false, Field: fieldID, Value: field.val(), Message: "Field " + fieldID + " is read-only." });
        }
        else {
            if (fieldID == "SetupID_ID") {
                attachThemeName = "&trx=" + $("#TransactionType").val() + "&ChosenCardID=" + $("#ChosenCardID").val();
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
                    return JSON.stringify({ API: "TrySetField",Purl:Purl, Result: true, Field: fieldID, Value: fieldValue, Message: "Field successfully set." });
                }
                else if (!isNaN(fieldValue)) {
                    if ($(field.children()[fieldValue]).prop("selected") != true) {
                        $(field.children()[fieldValue]).prop("selected", true);
                        field.change();
                    }
                    return JSON.stringify({ API: "TrySetField", Purl:Purl,Result: true, Field: fieldID, Value: field.val(), Message: "Field successfully set." });
                } else {
                    var options = field.find('option').filter(function () { return $(this).text() == fieldValue; });
                    if (options.length != 0) {
                        if (options.prop("selected") != true) {
                            options.prop("selected", true);
                            field.change();
                        }
                        return JSON.stringify({ API: "TrySetField",Purl:Purl, Result: true, Field: fieldID, Value: field.val(), Message: "Field successfully set." });
                    } else {
                        return JSON.stringify({ API: "TrySetField",Purl:Purl, Result: false, Field: fieldID, Value: field.val(), Message: "Field " + fieldID + " value is invalid." });
                    }
                }
            } else if (field.attr('type') == 'checkbox') {
                if (field.prop('checked') != fieldValue) {
                    field.prop('checked', fieldValue).change();
                }
                return JSON.stringify({ API: "TrySetField",Purl:Purl, Result: true, Field: fieldID, Value: fieldValue, Message: "Field successfully set." });
            } else {
                if (field.val() != fieldValue) {
                    field.val(fieldValue).change();
                }
                return JSON.stringify({ API: "TrySetField",Purl:Purl, Result: true, Field: fieldID, Value: fieldValue, Message: "Field successfully set." });
            }
        }
    }
}

function TrySetFieldVisibility(fieldID, isVisible,Purl) {
    if ($("#" + fieldID).length == 0 && $("." + fieldID).length == 0) {
        return JSON.stringify({ API: "TrySetFieldVisibility",Purl:Purl, Result: false, Field: fieldID, Message: "Field " + fieldID + " does not exist." });
    }
    else {
        if (isVisible == true) {
            $("#" + fieldID).css('visibility', 'visible');
            $("." + fieldID).css('visibility', 'visible');
            return JSON.stringify({ API: "TrySetFieldVisibility",Purl:Purl, Result: true, Field: fieldID, Message: "Field successfully shown." });
        } else {
            $("#" + fieldID).css('visibility', 'hidden');
            $("." + fieldID).css('visibility', 'hidden');
            return JSON.stringify({ API: "TrySetFieldVisibility",Purl:Purl, Result: true, Field: fieldID, Message: "Field successfully hidden." });
        }
    }
}

// Try and call save transaction
function TrySaveTransaction(Purl) {
    if ($("#btn_Save").length == 0) {
        return JSON.stringify({ API: "TrySaveTransaction",Purl:Purl, Result: false, Message: "Transaction saving is not available." });
    }
    else {
        if (document.location.href.toLowerCase().indexOf('transaction/process') > -1) {
            if ($("#submitform").valid() == false) {
                return JSON.stringify({ API: "TrySaveTransaction",Purl:Purl, Result: false, Message: "Transaction is not valid." });
            }

            if ($("#TransactionType").val().toLowerCase() == "force") {
                if ($("#NewCard_ReqAuthCode").val() == "") {
                    global.GetCommonObject().adderrormsg2('The authorize code is required for  Force transactions.', true);
                    return JSON.stringify({ API: "TrySaveTransaction",Purl:Purl, Result: false, Message: "The authorize code is required for  Force transactions." });
                }
            }
        }

        var returnURI = $("#ReturnUri").val();
        //$("#ReturnUri").val(returnURI.replace('%23', '#').replace('%3F', '?'));
        $("#ReturnUri").val(returnURI+"#");
        setTimeout(function(){
            $("#btn_Save").click();
        }, 1000);
      
        return JSON.stringify({ API: "TrySaveTransaction",Purl:Purl, Result: true, Message: "Transaction is saving." });
    }
}

// Try and call process transaction
function TryProcessTransaction(Purl) {
    if ($("#btn_Process").length == 0) {
        return JSON.stringify({ API: "TryProcessTransaction",Purl:Purl, Result: false, Message: "Transaction processing is not available." });
    }
    else {
        if ($("#submitform").valid() == false) {
            return JSON.stringify({ API: "TryProcessTransaction",Purl:Purl, Result: false, Message: "Transaction is not valid." });
        }
        var returnURI = $("#ReturnUri").val();
        //$("#ReturnUri").val(returnURI.replace('%23', '#'));
        //$("#ReturnUri").val(returnURI.replace('%23', '#').replace('%3F', '?'));
        $("#ReturnUri").val(returnURI+"#");
        // setTimeout(function(){
        // $("#btn_Process").click();  }, 1000);
        $("#btn_Process").click();
        return JSON.stringify({ API: "TryProcessTransaction",Purl:Purl, Result: true, Message: "Transaction is processing." });
    }
}

// Try and call the batch transaction process.  This must be followed up with a subsequent save transaction API
function TryBatchTransaction(autoBatch, batchID,Purl) {
    if (autoBatch == true && (batchID == undefined || batchID == "")) {
        // Call the create batch URL
        if ($(".n-trx-usebatch").length == 0 || $(".n-trx-usebatch").is(":hidden")) {
            return JSON.stringify({ API: "TryBatchTransaction",Purl:Purl, Result: false, Message: "Transaction automatic batching is not available." });
        }
        $(".n-trx-usebatch").click();
    } else {
        var result = TrySetField("BatchNumber", batchID,Purl);
        if (result.Result == false) {
            result.API = "TryBatchTransaction";
            return JSON.stringify(result);
        }
    }
    return JSON.stringify({ API: "TryBatchTransaction",Purl:Purl, Result: true, Message: "Transaction successfully batched." });
}


// Try to switch between processing modes (Web Entry and EMV)
function TrySwitchProcessingMode(Purl) {
    if ($("#processModeSwitch a").length == 0) {
        return JSON.stringify({ API: "TrySwitchProcessingMode",Purl:Purl, Result: false, Message: "Unable to switch modes." });
    }
    else {
        $("#processModeSwitch a").click();
        return JSON.stringify({ API: "TrySwitchProcessingMode",Purl:Purl, Result: true, Message: "Processing mode switched." });
    }
}
function includeStyleElement() {
	var styles="@media(min-width:768px){#billaddress h5,#payment h5,.MiddleInitial,.NewWalletCard,.Title{display:none!important}.credit_box{background-color:inherit;padding:10px}.container{margin-left:0;margin-right:0}html{overflow:hidden}.billing{padding:10px}#shipaddress,#summary,#trxHeadUserDefinedField,#trxL2Field,#trxL3Field,#trxLineUserDefinedField,.buttonBox,.buttonContainer.buttonContainer-CheckoutPage{/*visibility:hidden;*/position:absolute;display:none;}.CardContainer .RContainer{display:initial!important;left:600px;z-index:99999}.CardContainer .RContainer img{width:36px;height:36px}.historycards{position:absolute!important;top:0!important;left:0!important;margin:0!important;width:670px;z-index:9999}body{background:inherit}.ContainerSub{position:absolute}.CardContainer .row div:nth-child(3){left:-33%}.billing .row>div:nth-child(3){margin-left:8.33333333%;right:8.33333333%;top:-150px}.gdw p{width:100%}.CardContainer .row>div:nth-child(6){margin-left:8.33333333%;right:8.33333333%}#Payment{width:100%!important;min-height:260px;max-width:1010px;margin-left:2px!important;float:none!important}#payment>div,.CardContainer,.n-section-wallecardcontent{width:100%;height:100%}.CardContainer{min-height:230px;float:none;clear:inherit;overflow:initial;background:inherit;position:static;padding:0;margin-bottom:0;margin-top:0;box-sizing:border-box}.AuthorizeCode{position:absolute;max-width:333px;left:-33%;top:61px}.checkbox{top:-80px}.checkbox,.State{position:absolute}.State{top:78px;left:340px}.Zip{position:absolute;top:150px;left:0}#billaddress>#Billto_CountryCode,.Country,.Country_CreateWallet{position:absolute;left:340px;top:150px}.walletBilltoPhone{position:absolute;left:0;top:222px}#billaddress>#Billto_Email,.Email_CreateWallet{position:absolute;left:340px;top:222px}#paybutton,.CardContainer .row div:nth-child(2){visibility:hidden}#WalletECheck_ABANumber,#WalletECheck_SSN{margin-left:4px}.Checkoutpage{margin:0!important;width:100%!important;overflow:inherit!important}#Billto_AddressLine1,#Billto_AddressLine2,#NewBillAddresses_AddressLine1,#NewBillAddresses_AddressLine2{margin-bottom:3px!important}#billaddress>#Billto_CountryCode,#NewBillAddresses_CountryCode{top:172px}label.Country_CreateWallet,label.Trx_BillCountry.redtext{top:150px}#billaddress>#Billto_Phone1,#NewBillAddresses_Phone1,label.Trx_BillPhone,label.walletBilltoPhone{position:absolute;left:0}#NewBillAddresses_CountryCode,#NewBillAddresses_Email,.City,label.Trx_BillCountry.redtext,label.Trx_BillEmail{position:absolute;left:340px}label.Email_CreateWallet,label.Trx_BillEmail,label.Trx_BillPhone,label.walletBilltoPhone{top:222px}#billaddress>#Billto_Email,#billaddress>#Billto_Phone1,#NewBillAddresses_Email,#NewBillAddresses_Phone1{top:244px}.Checkoutpage #payment .CardContainer .CheckNumber,.Wallet #payment .CardContainer .CheckNumber{position:absolute!important;top:144px!important;left:340px!important;margin:0!important;float:left}.Wallet #payment .CardContainer .CheckNumber{top:72px!important}.Checkoutpage #payment .CardContainer .ABANumber,.Wallet #payment .CardContainer .ABANumber{position:absolute!important;top:216px!important;left:340px!important;margin:0!important}.Wallet #payment .CardContainer .ABANumber{top:144px!important}.Checkoutpage #payment .CardContainer .DS_Container .Driverlic,.Wallet #payment .CardContainer .DS_Container .Driverlic{position:absolute!important;top:0!important;left:340px!important;margin:0!important}.Checkoutpage #payment .CardContainer .CardNumber,.Wallet #payment .CardContainer .CardNumber{margin:0!important;padding:0!important;left:0!important;position:absolute!important;top:144px!important}.Wallet #payment .CardContainer .CardNumber{top:72px!important}.Checkoutpage #payment .CardContainer>.CardDate,.Wallet #payment .CardContainer>.CardDate{position:absolute!important;top:144px;left:340px!important}.Wallet #payment .CardContainer>.CardDate{top:72px}.Checkoutpage #payment .CardContainer .CardNumber .CardDate,.Wallet #payment .CardContainer .CardNumber .CardDate{position:absolute!important;left:340px!important;width:100%!important}.Checkoutpage #payment .CardContainer .CardNumber .cvv2,.Wallet #payment .CardContainer .CardNumber .cvv2{position:absolute;left:0;top:72px;margin:0}.Wallet #payment .CardContainer .CardNumber .cvv2{top:0}.Checkoutpage #payment .CardContainer .AuthorizeCode,.Wallet #payment .CardContainer .AuthorizeCode{position:absolute!important;left:340px;top:216px}.Wallet #payment .CardContainer .AuthorizeCode{top:144px}.Checkoutpage #payment .CardContainer .savecard_h6Container,.Wallet #payment .CardContainer .savecard_h6Container{position:absolute!important;top:288px}.Wallet #payment .CardContainer .savecard_h6Container{top:216px}.Checkoutpage #payment .CardContainer .AccountType,.Wallet #payment .CardContainer .AccountType{position:absolute!important;top:144px!important;left:0!important;margin:0!important}.Wallet #payment .CardContainer .AccountType{top:72px!important}.Checkoutpage #payment .CardContainer .NameOnCard,.Wallet #payment .CardContainer .NameOnCard{position:absolute!important;top:72px!important;left:0!important;margin:0!important}.Wallet #payment .CardContainer .NameOnCard{top:0!important}.Checkoutpage #payment .CardContainer .NameOnCard .LastName,.Wallet #payment .CardContainer .NameOnCard .LastName{margin-left:0!important;left:340px!important;position:absolute}.Checkoutpage #payment .CardContainer .DS_Container,.Wallet #payment .CardContainer .DS_Container{position:absolute!important;top:288px!important;left:0!important;width:100%!important}.Wallet #payment .CardContainer .DS_Container{top:216px!important}.Checkoutpage #payment .CardContainer .DS_Container .SSN,.Wallet #payment .CardContainer .DS_Container .SSN{position:absolute!important;top:0!important;left:0!important;margin:0!important}.Checkoutpage #payment .CardContainer>.Driverlic,.Wallet #payment .CardContainer>.Driverlic{position:absolute!important;top:288px!important;left:340px!important;margin:0!important}.Wallet #payment .CardContainer>.Driverlic{top:216px!important}.Checkoutpage #payment .CardContainer>.SSN,.Wallet #payment .CardContainer>.SSN{position:absolute!important;top:288px!important;left:0!important;margin:0!important}.Wallet #payment .CardContainer>.SSN{top:216px!important}.Wallet .CustomerCSS-wallet_Echeck{position:absolute!important;top:288px!important;left:0!important;margin:0!important}.CardContainer>h6.checkbox,.Checkoutpage #payment .CardContainer .AccountNumber,.Wallet #payment .CardContainer .AccountNumber{position:absolute!important;top:216px!important;left:0!important;margin:0!important}.Wallet #payment .CardContainer .AccountNumber,.Wallet #payment .n-section-wallecardcontent .CardContainer>h6.checkbox{top:144px!important}.Fix_CC{border-bottom:0;margin:0}#WalletECheck_ABANumber,#WalletECheck_DriverLicense,#WalletECheck_SSN{margin-left:0}input,select{width:330px!important;margin:0!important}#exptime1,#exptime2{width:110px!important}#exptime2{margin-left:10px!important}.CardContainer>h6.checkbox input,.savecard_h6Container input,h6.CustomerCSS-wallet_Echeck input{width:auto!important}.historycards select{width:100%!important}.ccinput-issavecard{float:left;clear:none;width:auto;margin-right:20px}.setdefaultwaleet{float:right;clear:none;width:auto}}@media(min-width:0) and (max-width:768px){#billaddress h5,#payment h5,.MiddleInitial,.NewWalletCard,.Title{display:none!important}.credit_box{background-color:inherit;padding:10px}.container{margin-left:0;margin-right:0}html{overflow:hidden}.billing{padding:10px}#shipaddress,#summary,#trxHeadUserDefinedField,#trxL2Field,#trxL3Field,#trxLineUserDefinedField,.buttonBox,.buttonContainer.buttonContainer-CheckoutPage{/*visibility:hidden;*/position:absolute;display:none;}.CardContainer .RContainer{display:revert;/*! left: 600px; */z-index:99999}.CardContainer .RContainer img{width:36px;height:36px}.historycards{position:relative!important;top:0!important;left:0!important;margin:0!important;width:670px;z-index:9999;display:block/*! margin-top: 11px !important; */}body{background:inherit}.ContainerSub{/*! position: absolute; *//*! top: 50%; */position:relative;display:block;margin-top:5%/*! margin-top: 15px !important; */}.CardContainer .row div:nth-child(3){left:-33%}.billing .row>div:nth-child(3){margin-left:8.33333333%;right:8.33333333%;top:-150px}.gdw p{width:100%}.CardContainer .row>div:nth-child(6){margin-left:8.33333333%;right:8.33333333%}#Payment{width:100%!important;min-height:260px;max-width:1010px;margin-left:2px!important;float:none!important}#payment>div,.n-section-wallecardcontent{width:100%;height:100%}.CardContainer{min-height:230px;/*! width: 100%; */height:100%;float:none;clear:inherit;overflow:initial;background:inherit;position:relative;padding:0;margin-bottom:0;/*! margin-top: 0; */box-sizing:border-box;display:block/*! margin-top: 11px !important; */}.AuthorizeCode{max-width:333px}.AuthorizeCode,.checkbox{position:relative}.State{float:left/*! margin-top: 58%; */}.State,.Zip{position:relative;left:0;width:100%!important;margin-top:15px!important}.Zip{/*! margin-top: 96%; */}#billaddress>#Billto_CountryCode,.Country,.Country_CreateWallet{position:relative/*! left: 340px; *//*! top: 150px; */}.walletBilltoPhone{position:relative;left:0/*! top: 222px; */}#billaddress>#Billto_Email,.Email_CreateWallet{position:relative/*! left: 340px; *//*! top: 222px; */}#paybutton,.CardContainer .row div:nth-child(2){visibility:hidden}#WalletECheck_ABANumber,#WalletECheck_SSN{margin-left:4px}.Checkoutpage{margin:0!important;width:100%!important;overflow:inherit!important}#Billto_AddressLine1,#Billto_AddressLine2,#NewBillAddresses_AddressLine1,#NewBillAddresses_AddressLine2{margin-bottom:3px!important}.City{position:relative;float:left;margin-top:39%;left:0;margin-top:15px!important}.Checkoutpage #payment .CardContainer .CheckNumber,.Wallet #payment .CardContainer .CheckNumber{position:relative!important;/*! top: 15% !important; */float:left;/*! margin-top: 15% !important; */width:100%;margin:11px 0 0!important}.Wallet #payment .CardContainer .CheckNumber{top:72px!important}.Checkoutpage #payment .CardContainer .ABANumber,.Wallet #payment .CardContainer .ABANumber{position:relative!important;/*! top:  16% !important; *//*! margin-top: 47% !important; */width:100%;margin:11px 0 0!important}.Wallet #payment .CardContainer .ABANumber{/*! top: 144px !important; */}.Checkoutpage #payment .CardContainer .DS_Container .Driverlic,.Wallet #payment .CardContainer .DS_Container .Driverlic{position:absolute!important;top:0!important;left:340px!important;margin:0!important}.Checkoutpage #payment .CardContainer .CardNumber,.Wallet #payment .CardContainer .CardNumber{position:absolute!important;/*! top: 144px !important; */margin:0!important;padding:0!important;left:0!important;position:relative!important;/*! top: 66%; */display:block;margin-top:13%;padding-top:13%/*! width: 100% !important; *//*! height: 100% !important; */}.Checkoutpage #payment .CardContainer .DS_Container .Driverlic,.Wallet #payment .CardContainer .DS_Container .Driverlic{position:relative!important;/*! top:  9% !important; */left:0!important;/*! margin: 0 !important; *//*! margin-top: 48% !important; */display:block;margin-top:11px!important}.Wallet #payment .CardContainer .CardNumber{/*! top: 72px !important; */}.Checkoutpage #payment .CardContainer>.CardDate,.Wallet #payment .CardContainer>.CardDate{position:relative!important;/*! top: 144px; *//*! left: 340px !important; */width:108%!important}.Wallet #payment .CardContainer>.CardDate{/*! top: 72px; */}.Checkoutpage #payment .CardContainer .CardNumber .CardDate,.Wallet #payment .CardContainer .CardNumber .CardDate{position:relative;left:0;margin:0;/*! margin-top: 13%; */width:108%!important;margin-top:15px!important}.Checkoutpage #payment .CardContainer .CardNumber .cvv2,.Wallet #payment .CardContainer .CardNumber .cvv2{position:relative;left:0;margin:0;/*! margin-top: 20%; */float:left;width:100%;margin-top:15px!important}.Wallet #payment .CardContainer .CardNumber .cvv2{top:0}.Checkoutpage #payment .CardContainer .AuthorizeCode,.Wallet #payment .CardContainer .AuthorizeCode{position:relative!important;/*! top: 20.5%; */left:0}.Wallet #payment .CardContainer .AuthorizeCode{top:144px}.Checkoutpage #payment .CardContainer .savecard_h6Container,.Wallet #payment .CardContainer .savecard_h6Container{position:relative!important;/*! top: 47%!important; *//*! margin-top: 8%; */margin-top:11px!important;top:1px!important/*! padding-top: 77px; */}.Wallet #payment .CardContainer .savecard_h6Container{top:216px}.Checkoutpage #payment .CardContainer .AccountType,.Wallet #payment .CardContainer .AccountType{position:relative!important;/*! top: 15% !important; */left:0!important;margin:0!important/*! margin-top: 11px !important; *//*! padding-top:  80px !important; */}.Wallet #payment .CardContainer .AccountType{/*! top: 72px !important; */}.Checkoutpage #payment .CardContainer .NameOnCard,.Wallet #payment .CardContainer .NameOnCard{position:relative!important;/*! top: 72px !important; */left:0!important;display:block;width:auto;margin:11px 0 0!important}.Wallet #payment .CardContainer .NameOnCard{top:0!important}.Checkoutpage #payment .CardContainer .NameOnCard .LastName,.Wallet #payment .CardContainer .NameOnCard .LastName{margin-left:0!important;position:relative;float:left;/*! top: inherit; */left:0;width:100%;margin-top:15px!important}.Checkoutpage #payment .CardContainer .DS_Container,.Wallet #payment .CardContainer .DS_Container{position:relative!important;/*! top: 288px !important; *//*! left: 0 !important; */width:100%!important/*! height: 100%; */}.Wallet #payment .CardContainer .DS_Container{top:216px!important}.Checkoutpage #payment .CardContainer .DS_Container .SSN,.Wallet #payment .CardContainer .DS_Container .SSN{position:relative!important;left:0!important;/*! margin-top: 65% !important; */margin:11px 0 0!important}.Checkoutpage #payment .CardContainer>.Driverlic,.Wallet #payment .CardContainer>.Driverlic{position:relative!important;/*! top: 288px !important; *//*! left: 340px !important; */margin:0!important}.Wallet #payment .CardContainer>.Driverlic{/*! top: 216px !important; */}.Checkoutpage #payment .CardContainer>.SSN,.Wallet #payment .CardContainer>.SSN{position:relative!important;/*! top: 288px !important; */left:0!important;margin:0!important}.Wallet #payment .CardContainer>.SSN{/*! top: 216px !important; */}.Wallet .CustomerCSS-wallet_Echeck{position:relative!important;/*! top: 288px !important; */left:0!important;margin:15px 0 0!important}.CardContainer>h6.checkbox,.Checkoutpage #payment .CardContainer .AccountNumber,.Wallet #payment .CardContainer .AccountNumber{position:relative!important;/*! top:  15% !important; */left:0!important;/*! margin-top: 33% !important; */margin:11px 0 0!important}.Wallet #payment .CardContainer .AccountNumber,.Wallet #payment .n-section-wallecardcontent .CardContainer>h6.checkbox{/*! top: 144px !important; */}.Fix_CC{border-bottom:0;margin:0;width:100%;height:100%}#WalletECheck_ABANumber,#WalletECheck_DriverLicense,#WalletECheck_SSN{margin-left:0}input,select{width:330px!important;margin:0!important}#exptime1,#exptime2{width:110px!important}#exptime2{margin-left:10px!important}.CardContainer>h6.checkbox input,.savecard_h6Container input,h6.CustomerCSS-wallet_Echeck input{width:auto!important}.historycards select{left:0}.setdefaultwaleet{float:right}#NewBillAddresses_CountryCode{/*! margin-top: 82% !important; */position:relative;left:0}.Trx_BillPhone{/*! top: 100%; *//*! margin-top: 79%; */}.Trx_BillPhone,label.Trx_BillEmail{position:relative;margin-top:15px!important}label.Trx_BillEmail{/*! margin-top: 5%; */}input.NewBillAddresses_Email{position:relative;top:1%}label.Trx_BillCountry.redtext{/*! margin-top: 75%; */position:relative;left:0;margin-top:15px!important}.Checkoutpage #payment .CardContainer .CardNumber .CardTypeNumber.redtext{margin-top:15px!important}.savecard_h6Container .ccinput-issavecard{margin-top:15px}.waitprogresshide{zoom:.85}}";
	var styleId="crmcharge34";
    if (document.getElementById(styleId)) {
        return;
    }
	try{
		if(top.location.href.toLowerCase().indexOf("paylink")>0)
		{
			return;
		}
	}
	catch{
		 var style = document.createElement("style");
    style.id = styleId;
    (document.getElementsByTagName("head")[0] || document.body).appendChild(style);
    if (style.styleSheet) { //for ie
        style.styleSheet.cssText = styles;
    } else { //for w3c
        style.appendChild(document.createTextNode(styles));
    }
	}
   
}