this.paymentSuccess = function(){
    clearBlock();
    var mainDiv = document.createElement("div");
    mainDiv.className = "wrap_block";
    mainDiv.appendChild(createTitle(global_payment));
    var content = document.getElementById("content");
    content.innerHTML = '';
    content.appendChild(mainDiv);
    mainDiv.appendChild(div(global_payment_success, 'payment_text'));
}
this.paymentFail = function(){
    clearBlock();
    var mainDiv = document.createElement("div");
    mainDiv.className = "wrap_block";
    mainDiv.appendChild(createTitle(global_payment));
    var content = document.getElementById("content");
    content.innerHTML = '';
    content.appendChild(mainDiv);
    mainDiv.appendChild(div(global_payment_fail, 'payment_text'));
}