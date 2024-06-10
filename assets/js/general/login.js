$(document).ready(function(){var loginData={phone:null,password:null,otp:null}
$(document).on('click','.nav-item.dropdown .dropdown-menu .subheader-item',function(e){e.stopPropagation();});$('[name="username"], [name="phone"], #user_national_id').on("change",function(){var num=$(this).val();$(this).val(digitsToEnglish(num))})
$('[href="#removephoto"]').on("click",function(){var id=$(this).attr('data-user-id')
$.post(APP_URL+'/users/delete_photo',{user_id:id},function(res){window.location.reload();},'json')})
$("#reset-btn-2, #reset-pass-resend").on("click",function(e){e.preventDefault();resetPass();return false;})
$("#reset-btn-3").on("click",loginResetPass)
function resetPass(){var phone_email=$("#forgot_phone").val()
var emailRegex=/^(\w+@\w+\.\w{2,5})$/ug;var mobileRegex=/^(?:\d{10,11})$/ug;var path=null
var flag=0
var msg=$('#forgot_password_container .alert')
msg.hide()
var subMsg=$("#code-send-msg2 #numShow")
subMsg.html($("#forgot_phone").val())
if(emailRegex.test(phone_email)){flag=1
path="/forgot_password"}else if(mobileRegex.test(phone_email)){flag=2
path="/forgot_password_ajax"}else{msg.text("شماره موبایل و یا ایمیل نامعتبر میباشد").show()}if(flag!=0){$.post(APP_URL+path,{phone_email:phone_email},function(resp,status){$('#inputPhone > .text-danger').remove()
if(status=="success"&&resp.status=="success"){if(flag==1){msg.text(resp.message).show()}else{confirmCode()}}else{$('#inputPhone').append('<p class="text-danger space-top-2">'+resp.message+'</p>')}},"json")}}$('[href="#editPhone"]').on("click",function(e){e.preventDefault()
var target=$(this).attr('data-target')
var parent=$(this).attr('data-parent')
$(target).slideDown()
$(parent).slideUp()
$(".parent-loader").hide()})
function confirmCode(){$("#reset-pass-user-info").slideUp();$("#reset-pass-confirm").slideDown();$("#code_input").val("")
$('[data-err]').hide();resetTimer()}var user_loggedin=false;function loginResetPass(phone,otp){$('[data-err]').hide();var phone=$("#forgot_phone").val()
var otp=$("#code_input").val()
var newPass=$("#user_new_password").val()+""
if(otp&&newPass.length>=8){$.post(APP_URL+"/ResetPass",{username:digitsToEnglish(phone),otp:digitsToEnglish(otp),password:newPass},function(resp,status){if(status=="success"&&!resp.error){$("#forgot_password_container2 .parent-loader").show();window.location.reload();}else{$('[data-err="code"]').fadeIn()}},"json")}else if(newPass.length>0){$('[data-err="newPass"]').fadeIn()}else{$('[data-err="fill-all"]').fadeIn()}}$("#user-login-btn").click(function(e){e.preventDefault()
loginAjax()})
function loginAjax(){var username=$("#signin_email").val();var password=$("#signin_password").val();var urlBack=$("#urlBack").val();var autosubmit=$("#autosubmit").val();var remember_me=$("#remember_me2").is(":checked");$('.dots-loader-wrapper').show();$('.login-btn-title').addClass('invisible');$(".signup-form.login-form .parent-loader").show();var loginData={username:digitsToEnglish(username),password:password,ajx:true,urlBack:urlBack,remember_me:remember_me};$.post(APP_URL+"/authenticate",loginData,function(resp,status){if(status=="success"&&!resp.error){if(window.location.href.indexOf("login")!=-1||resp.urlBack.indexOf('autosubmit')!=-1){window.location.href=resp.urlBack;}else{window.location.reload()}}else{$(".signup-form.login-form .parent-loader").hide();$('#login-error').text(resp.message)}},"json").fail(function(resp){$('.dots-loader-wrapper').hide();$('.login-btn-title').removeClass('invisible');$(".signup-form.login-form .parent-loader").hide();$(".help-block").text('');$(".kb-check").removeClass('invalid');if("errors"in resp.responseJSON){$.each(resp.responseJSON.errors,function(key,value){$('[data-err="'+key+'"]').text(value).closest('.control-group').find('.kb-check').addClass('invalid');});}if("message"in resp.responseJSON){$('#login-error').text(resp.responseJSON.message).fadeIn();}if("not_confirm"in resp.responseJSON){loginData.phone=username
loginData.password=password
confirmOnFly()}})}function changePass(otp,newPass){$.post(APP_URL+"/change_password",{password_confirmation:newPass,new_password:newPass,old_password:otp,ajx:true},function(resp,status){if(status=="success"&&resp.status=="success"){window.location.reload();}else{$('[data-err="newPass"]').fadeIn()}},"json")}guestId();$(".payment_select .optionsPayment").on("click",function(){var paymentOP=$('.payment_select [name="paymentOP"]');paymentOP.map(function(i,elm){if(elm.checked){$(elm).parents('.optionsPayment').addClass('active-tg')}else{$(elm).parents('.optionsPayment').removeClass('active-tg')}});guestId();})
$("#user_national_id").on("change",function(){if($(this).val()!=""&&!checkMelliCode($(this).val()))$('#user_national_id ~ .text-danger').show()
else
$('#user_national_id ~ .text-danger').hide()})
$("#user_first_name,#user_last_name").on("focusout",function(){if($(this).val().length<2){$('#'+$(this).attr("id")+' ~ .text-danger').show()}else{$('#'+$(this).attr("id")+' ~ .text-danger').hide()}})
$('[name="firstName"],[name="lastName"],[name="passport"],[name="idcode"]').on("keyup",function(){guestId()})
$('[name="agree_tac_gateway"]').click(function(){if($(this).is(':checked')){$('[name="paymentOP"]:checked').parents('.optionsPayment').addClass('active-tg');}else{$('[name="paymentOP"]').parents('.optionsPayment').removeClass('active-tg');}})
$('[name="agree_tac_gateway"]').click(guestId)
$('#checkout-form .optionsPayment').on("click",function(){document.getElementById('checkout-form').action=$(this).find('[name="paymentOP"]').attr('action');})
$('#is_main').change(function(){guestId();if($(this).is(':checked')){$('#other_person').fadeIn('fast');}else{$('#other_person').fadeOut('fast');}});function guestId(){var firstN=$('[name="firstName"]');var lastN=$('[name="lastName"]');var idcode=$('[name="idcode"]');var agree_tac=$('[name="agree_tac_gateway"]');if($('.optionsPayment').length==0){var peyment_option=1;}else{var peyment_option=$('.optionsPayment.active-tg').length;}if((!$("#is_main").is(':checked')||(firstN.length&&lastN.length&&(firstN.val().length>=2)&&(lastN.val().length>=2)&&idcode.length&&checkMelliCode(idcode.val())))&&agree_tac.is(':checked')&&peyment_option>0){$('[role="gateway"]').prop("disabled",false);$("#payment-gate").removeClass("disable-tg");}else{$('[role="gateway"]').prop("disabled",true);$("#payment-gate").addClass("disable-tg");}}$(document).on('keyup input','.kb-check, [type="password"]',function(e){e.stopImmediatePropagation()
var elm=$(this).parent();if((/[۰-۹ آ-ی]/).test(e.originalEvent.data)||(/[۰-۹ آ-ی]/).test(e.key)){elm.removeClass('alertCL').addClass('alertFA ch-show')}else{elm.removeClass('alertCL ch-show')}})
$("#inputPassword .see-pass").click(function(e){e.preventDefault();var pass=$($(this).attr('target'));if(pass.attr("type")=="password"){pass.attr("type","text");pass.prev('.see-pass').find(".cross-line").hide();}else{pass.attr("type","password");pass.prev('.see-pass').find(".cross-line").show();}})
var cd;function countDown(time,tg,callback){clearInterval(cd)
cd=setInterval(function(){--time
var timeTXT=(time<10)?"0"+time:time
tg.text("00:"+timeTXT);if(time==0){clearInterval(cd)
callback()}},1000);}function confirmOnFly(){$.post(APP_URL+"/forgot_password_ajax",{phone_email:loginData.phone},function(resp,status){if(status=="success"&&resp.status=="success"){$(".signup_popup3").show()
$(".login_popup").hide()
verificationCode(loginData.phone)}},"json")}function signUpAjax(){var signup_fields={_token:$('#user_new_phone [name="_token"]').val(),from:$('#user_new_phone [name="from"]').val(),first_name:$('#user_new_phone [name="first_name"]').val(),last_name:$('#user_new_phone [name="last_name"]').val(),phone:digitsToEnglish($('#user_new_phone [name="phone"]').val()),email:$('#user_new_phone [name="email"]').val(),password:$('#user_new_phone [name="password"]').val(),referral_code:$('#user_new_phone [name="referral_code"]').length>0?$('#user_new_phone [name="referral_code"]').val():'',}
$("#user_new_phone .parent-loader").show()
$.post(APP_URL+'/create_by_phone',signup_fields,function(resp,status){$("#user_new_phone .parent-loader").hide()
if(status=="success"&&resp.validation){$('#user_signup_submit').click();verificationCode($('#user_new_phone [name="phone"]').val())}else if(status=="success"){errorDisplay(resp.fields);if("not_confirmed"in resp){loginData.phone=signup_fields.phone
confirmOnFly()}}else{$('[data-err="server-error"]').addClass("error-active").fadeIn()}},"json").fail(function(error){$("#user_new_phone .parent-loader").hide();$(".help-block").text('');$(".decorative-input").removeClass('invalid');$.each(error.responseJSON.errors,function(key,value){$('[data-err="'+key+'"]').text(value).closest('.control-group').find('.decorative-input').addClass('invalid');});});}function errorDisplay(wrongInput){$('.invalid').removeClass("invalid");$('[data-err]').removeClass('error-active').text("");for(var wi in wrongInput){if(typeof wrongInput[wi]=="object")$('#user_new_phone [data-err="'+wi+'"]').addClass('error-active').text(wrongInput[wi][0])
else
$('#user_new_phone [data-err="'+wi+'"]').addClass('error-active').text(wrongInput[wi])
$('#user_new_phone [name="'+wi+'"]').addClass("invalid")
$('#user_new_phone [role="'+wi+'"]').addClass("invalid")}}$("#user_new_phone").submit(function(e){e.preventDefault();signUpAjax();})
function verificationCode(phoneNumber){$("#phone-form").slideUp()
$("#verify-panel").slideDown()
var msg=$("#code-send-msg #numShow")
msg.html(phoneNumber)
resetTimer()}function resetTimer(){var timer=$("[role='timer']")
$("[role='resend-code']").hide()
timer.parent().fadeIn()
$("#otp-input").val("")
countDown(59,$("[role='timer']"),function(){$("[role='resend-code']").fadeIn()
timer.parent().hide()})}$("#verify-panel #confirm").on("click",function(e){e.preventDefault();var phone=$('#user_new_phone [name="phone"]').val()*1;var otp=$("#otp-input").val()*1
if(phone)loginData.phone=phone
if(otp)loginData.otp=otp
if(loginData.otp&&loginData.phone){verifyAjax(loginData.phone,loginData.otp)}})
$("#verify-panel #back").on("click",function(e){e.preventDefault();$("#phone-form").slideDown()
$("#verify-panel").slideUp()})
$("#resend-signup-code > a").on('click',function(e){e.preventDefault()
var phone=$('#user_new_phone [name="phone"]').val()*1;$.post(APP_URL+"/verify_phone_number_sms",{phone_number:phone},function(resp,status){if(status=="success"&&resp.status=="success"){resetTimer()}})})
function verifyAjax(phone,otp){var param={phone_number:phone*1,otp:otp*1}
$("#verify-panel .parent-loader").show();$.post(APP_URL+"/user_phone_verification",param,function(resp,status){if(status=="success"&&resp.status=="success"){$('.alert').fadeIn()
$("[role='timer']").parent().fadeOut()
$("[role='resend-code']").fadeOut()
window.location.reload();}else{$('[data-err="otp-input"]').addClass('error-active').text(resp.message).show();$("#verify-panel .parent-loader").hide();}})}function ajaxLogin(phone,pass){$.post(APP_URL+"/authenticate",{username:digitsToEnglish(phone),password:pass,ajx:true},function(resp,status){if(status=="success"&&!resp.error){window.location.reload();}})}})
function checkMelliCode(meli_code){if(meli_code.length==10){if(meli_code=='1111111111'||meli_code=='0000000000'||meli_code=='2222222222'||meli_code=='3333333333'||meli_code=='4444444444'||meli_code=='5555555555'||meli_code=='6666666666'||meli_code=='7777777777'||meli_code=='8888888888'||meli_code=='9999999999'){return false;}c=parseInt(meli_code.charAt(9));n=parseInt(meli_code.charAt(0))*10+parseInt(meli_code.charAt(1))*9+parseInt(meli_code.charAt(2))*8+parseInt(meli_code.charAt(3))*7+parseInt(meli_code.charAt(4))*6+parseInt(meli_code.charAt(5))*5+parseInt(meli_code.charAt(6))*4+parseInt(meli_code.charAt(7))*3+parseInt(meli_code.charAt(8))*2;r=n-parseInt(n/11)*11;if((r<=1&&r==c)||(r>1&&c==11-r)){return true;}else{return false;}}else{return false;}}function digitsToEnglish(digits){var numTb={"۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9"}
return digits.replace(/[۰-۹]/g,function(m){return numTb[m];})}