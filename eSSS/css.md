<pre>
div,input,select{
    box-sizing:border-box;
}

body { background-color: transparent !important; }
div { background-color: transparent !important; }
h3 { display: none; }

label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: bold;
}

select,input[type=text] { 
    border-radius: 0 !important; 
    height: 34px;
    background-color: #fff;
    border: 1px solid #ddd;
    color: #555;
}

input[type="button"], 
input[type="submit"],
input[type="reset"], 
input[type="button"],
input[type="submit"],
input[type="reset"], 
a.Button
{
    background-color:  #4dbbfa; 
    border:1px solid #1891D5;
    border-radius:0 !important;
    padding:5px !important
}

input[type="button"]:hover, 
input[type="submit"]:hover, 
input[type="reset"]:hover, 
input[type="button"]:focus,
input[type="submit"]:focus, 
input[type="reset"]:focus, 
a.Button:hover
{
    background-color:  #30A6E9; 
    border:1px solid #1891D5;
}

.Checkoutpage{
    width:100%;
    max-width:572px;
    overflow: auto;
    height: 100%;
}

.Checkoutpage #payment,.Wallet #payment{
    width:100%;
}

#payment select{
    width:100%;
}

#payment .CardContainer { 
    margin:  0 !important; 
    padding: 10px 0 10px 10px!important; 
    width:90%;
    background: #eeeeee;
}

.Checkoutpage .AccountNumber,.Checkoutpage .ABANumber{
    width:50%;
    margin:0;
    padding-right:10px;
}

.Wallet .AccountNumber,.Wallet .Driverlic,.Wallet .ABANumber,.Wallet .SSN{
	width:50%;
	margin:0;
    padding-right:10px;
}	

@media screen and (max-width:768px){
	.Wallet .AccountNumber,.Wallet .Driverlic,.Wallet .ABANumber,.Wallet .SSN{
		width:100%;
	}	
}

.Checkoutpage .AccountType,.Wallet .AccountType{
     padding-right:10px;
}


.Checkoutpage .NameOnCard{
    width:100%;
}

.Checkoutpage .CardNumber{
   padding-right:10px;
}
.NameOnCard{
  width:100%
}
.NameOnCard .FirstName{margin:0; padding-right:10px;} 
.NameOnCard .LastName{margin:0;   padding-right:10px;}
/*
.NameOnCard input[type=text]{
    width:100%;
}*/

.NameOnCard .MiddleInitial input[type=text]{
    width:100px;
}

.CardDate{
 padding-bottom:15px;
}
.SSN{
    width:100%;
    padding-right:10px;
}

input.ccinput-accountnumber, input.ccinput-abanumber, input.ccinput-driverlicense, input.ccinput-ssn{
      width:100%!important;
}

.buttonContainer { width: 90% }

.buttonContainer .ccinput-issavecard{
    font-weight: bold;
    font-size:9px;
}

.buttonContainer input[type=submit]{
    padding:5px;
}

.buttonContainer.buttonContainer-CheckoutPage{
    height: 42px!important;
    width:100%;
}

.validation-summary-errors * { color: red !important; text-indent: 10px !important; }
.validation-summary-errors { padding: 0 !important; }

.masked { position:absolute; border-bottom:150px !important }

.Fix_CC { display: none; }
/*.MiddleInitial{
   display: none;
}*/
.checkoutpage .n-profile-head { display: none; }
.CustomerCSS-wallet_Echeck { display: none; }
.checkoutpage #summary { display: none; }
.n-ajax-indicator { display: none; }
.historycards { display: none; }
#billaddress { display: none; }
.CustomerCSS .n-page-msg { display: none; }
.AddIn { display: none; }
#shipaddress { display: none; }
.CardContainer .checkbox { display: none; }
.CustomerCSS .checkbox { display: none; }
#trxL2Field, #trxL3Field { display: none; }
.Title { display: none; }
#summary { display: none; }
#payment h5 { display: none; }
.setdefaultwaleet { display : none }

.pmtpage section { margin: 0 !important; padding: 0; }
.checkoutpage #payment { margin: 0 !important; padding: 0; min-height: 200px; }
.checkoutpage #paybutton { margin: 0 !important; padding: 0; }
.checkoutpage .n-section-item { margin: 0 !important; padding: 0; }
.checkoutpage .n-section-content { margin: 0 !important; padding: 0; }
.checkoutpage .Columns { margin: 0 !important; padding: 0; }
input[ type=button] { font-size: 14px !important; font-weight: normal !important; }
input[type=submit] { font-size: 16px !important; font-weight: normal !important; }

.checkoutpage .n-trx-pay { min-height: 230px; width: auto; }
.pmtpage .n-section-head { background: #fff !important; font: bold 16px/20px Verdana, Arial, Helvetica, Sans-Serif; height: 25px; padding: 3px 0 0 3px; }
.CardContainer .LContainer .NameOnCard_COntainer label span.nameoncard3 { width: 100px; }
.CardContainer .LContainer .NameOnCard_COntainer label span.nameoncard2 { margin-left: 10px; }
.CardContainer .LContainer .NameOnCard_COntainer input.ccinput-lastname { margin-left: 68px !important; }

.CustomerCSS legend { margin: 0; font: bold 16px/20px Verdana, Arial, Helvetica, Sans-Serif; height: 25px; padding: 3px 0 0 3px; }
.CustomerCSS .n-trx-paybuttoncontainer { width: 220px; padding: 10px 0 0 0; }
    .CustomerCSS .n-trx-paybuttoncontainer input[type=button] { float: left; margin-left: 10px; }
.CustomerCSS .CardContainer { margin-left: 30px; padding: 0; }
.CustomerCSS .billaddresscontainer_wallet { margin: 0; }
.CustomerCSS .CardContainer { width: 420px !important; padding: 0 !important; }
.CustomerCSS .Columns { padding: 10px; width: 380px !important; }
.CustomerCSS .n-section-walleaddresscontent { margin: 0 !important; }
.n-section-wallecardcontent { padding: 0; }
.validation-summary-valid { margin: 0; padding: 0; font-family: "Segoe UI","Myriad Set Pro","Lucida Grande","Helvetica Neue","Helvetica","Arial","Verdana","sans-serif";font-size: 13px;font-weight: normal;}
.CustomerCSS .n-section-content { min-height: 150px; }
    .CustomerCSS .n-section-content .n-trx-pay { min-height: 200px; }
.checkoutpage .n-trx-paybuttoncontainer { margin: 10PX 0 0 280PX !important; padding: 0; float: left; }
.CustomerCSS .n-trx-paybuttoncontainer { margin: 10PX 0 0 140PX !important; padding: 0; float: left; }
#paybutton { height: 1px !important; }
.n-button-bigsize { width: 100px !important; }

#payment .n-section-content .CardContainer { margin: 0 0 0 30PX!important; width: 360px !important; }
.checkoutpage #payment .n-section-content .CardContainer { margin: 0 !important; }
.CustomerCSS { padding: 0; }
.n-section-content .CustomerCSS { padding: 0; }
.n-section-content { position: relative; top: -16px; }
.CustomerCSS .n-section-content { position: relative; top: -18px; *top: -14px; left: 2px; }
/* V2 */

.Fix_CC { margin: 10px 0 !important; }
.loadmask-msg { background-color:#fff !important }
.ui-widget-header { background:#f4f4f4 !important }
html body div *,  .ui-dialog {border-radius:0 !important; }
.setdefaultwaleet{
  Display:none!Important;
}
.Checkoutpage {
 width: 480px!important;
 overflow: hidden!important;
 height: auto!important;
}
.MiddleInitial
{
  margin-right: 18px;
}
</pre>
