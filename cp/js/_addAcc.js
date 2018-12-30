ready();
function ready(){
    document.body.innerHTML = "";
    document.body.style['background-color'] = "#ffffff";
    var exit = document.createElement("div");

    var container = document.createElement("div");
    container.id = 'login_container';
    container.style.cssText = 'left: 50%; width: 360px; position: absolute; margin-left: -180px;'

    var csvParser = container.appendChild(createTextArea("CSV text"));
    csvParser.addEventListener('input', changeCSV);
    var login = container.appendChild(createTextField("Логин"));
    var password = container.appendChild(createTextField("Пароль"));
    var proxyUrl = container.appendChild(createTextField("Прокси"));
    var phone = container.appendChild(createTextField("Номер телефона"));
    var donors = container.appendChild(createTextArea("Список конкурентов"));
    var postsMax = container.appendChild(createTextField("Кол-во постов"));
    var coefficient = container.appendChild(createTextField("Коэффициент полезности"));
    var stopWords = container.appendChild(createTextArea("Стоп-слова"));
    var tagsMax = container.appendChild(createTextField("Максимум тэгов"));
    var tagsList = container.appendChild(createTextArea("Список тэгов"));
    var postsFromTime = container.appendChild(createTextField("Время постинга, С"));
    var postsTillTime = container.appendChild(createTextField("Время постинга, ДО"));
    var result = container.appendChild(createTextArea("Результат"));
    var enterBut = document.createElement("div");
    enterBut.className = 'blueButton';
    enterBut.style.cssText = 'margin-top: 14px; width: 360px;'
    enterBut.innerText = 'Отправить';
    container.appendChild(enterBut);
    enterBut.addEventListener("click", sendList);
    document.body.appendChild(container);
    function changeCSV(e){
        var data = Papa.parse(csvParser.value);
        writeToTF(data.data[0]);
    }
    var erraccs = ["humor.video.ru","funny.russia","tele.vid","lol.clutch","video.ilita","lol.mdk","tele.room","prikol.vid","daily.vide0","mad.prikol","shock.vid","haha.teka"];
    function sendList(){
        console.log("ну и?");
        var data = Papa.parse(csvParser.value);
        //sendAccount(data.data[0]);
        
        for(var i in data.data){
            sendAccount(data.data[i]);
        }
    }
    function checkInArray(login){
        for(var i in erraccs){
            if(login == erraccs[i])
                return true;
        }
        return false;
    }
    function sendAccount(arr){
        var donorsArray = arr[3].split("\n");
       /* var stopWordsArray = arr[7].split("\n");
        var tagsListArray = arr[9].split("\n");
        arr[6] = arr[6].replace(',', '.');*/
         $.ajax({
            url: 'http://85.143.219.176/account',
            type: 'post',
            data: {
                "login":arr[0], "password":arr[1], "proxyUrl":arr[2], "promotionDonors":donorsArray//, "postsMax":arr[5], "coefficient":arr[6], "stopWords":stopWordsArray, "tagsMax":arr[8], "tagsList":tagsListArray, "postsFromTime":"", "postsTillTime":""
            },
            headers: {
                "x-access-token": token
            },
            dataType: 'json',
            success: function (resp) {
                if(resp.success)
                    result.value += arr[0]+" ОК\n";
                else
                    result.value += arr[0]+" error: "+resp.message+"\n";
            },
            error: function (jqXHR, exception) {
                result.value += arr[0]+" Ошибка: "+jqXHR.responseText+" "+exception+"\n";
            },
        });
    }
    function writeToTF(arr){
        //arr[6] = arr[6].replace(',', '.');
        login.value = arr[0];
        password.value = arr[1];
        proxyUrl.value = arr[2];
        //phone.value = arr[3];
        donors.value = arr[4];
        /*postsMax.value = arr[5];
        coefficient.value = arr[6];
        stopWords.value = arr[7];
        tagsMax.value = arr[8];
        tagsList.value = arr[9];*/
    }
    function send(event){
        console.log(token);
        var donorsArray = donors.value.split("\n");
        /*var stopWordsArray = stopWords.value.split("\n");
        var tagsListArray = tagsList.value.split("\n");
*/
        $.ajax({
            url: 'http://85.143.219.176/account',
            type: 'post',
            data: {
                "login":login.value, "password":password.value, "proxyUrl":proxyUrl.value, "phone":phone.value, "promotionDonors":donorsArray//, "postsMax":postsMax.value, "coefficient":coefficient.value, "promotionStopWords":stopWordsArray, "tagsMax":tagsMax.value, "tagsList":tagsListArray, "postsFromTime":postsFromTime.value, "postsTillTime":postsTillTime.value
            },
            headers: {
                "x-access-token": token
            },
            dataType: 'json',
            success: function (data) {
                console.info(data.success);
            }
        });
    }
}
function createStringFromArray(arr){
    if(arr.length == 0)
        return "";
    var str = '[';
    for(var i = 0; i < arr.length; i++){
        str += '"'+arr[i]+'"';
        if(i+1 == arr.length)
            str += ']';
        else
            str +=  ',';
    }
    return str;
}
function createTextField(name){
    var TF = document.createElement("input");
    TF.className = 'editTextField';
    TF.style.cssText = 'margin-top: 5px; width: 360px; border: solid; border-width: 0.5px;';
    TF.setAttribute('placeholder', name);
    return TF;
}
function createTextArea(name){
    var TF = document.createElement("textarea");
    TF.className = 'editTextField';
    TF.style.cssText = 'margin-top: 5px; width: 360px; border: solid; border-width: 0.5px; height: 100px';
    TF.setAttribute('placeholder', name);
    return TF;
}