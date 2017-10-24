$(document).ready(function () {
    $("h6.ccinput-issavecard input[type='checkbox']").die();
    $('#btn_Save').val('Confirm ');
    $(".NewWalletCard").empty();

    var amt = $("#TrxAmount").val();
    if (amt != null && amt == '0.00') {
        $("#TrxAmount").val('0.01');
    }
});
