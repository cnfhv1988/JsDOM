
function addLoadEvent(func) {
    var oldload = window.onload;
    if(typeof onload != 'function'){
        window.onload = func;
    }
    else{
        window.onload = function () {
            oldload();
            func();
        }
    }
}

function insertAfter(newElement,targetElement) {
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement)
    }
    else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value) {
    if(!element.className){
        element.className = value
    }
    else{
        var newClass = element.className;
        newClass = newClass + ' ' + value;
        element.className = newClass;
    }
}

function highlightPage() {
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    var header = document.getElementsByTagName('header');
    if(header.length == 0)return false;
    var nav = header[0].getElementsByTagName('nav');
    if(nav.length == 0)return false;
    var links = nav[0].getElementsByTagName('a');
    var linkurl;
    for(var i=0;i<links.length;i++){
        linkurl = links[i].getAttribute('href');
        if(window.location.href.indexOf(linkurl) != -1){
            links[i].className = 'here';
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute('id',linktext);
        }
    }
}

function moveElement(elementId,final_x,final_y,interval) {
    var elem = document.getElementById(elementId);
    if(!elem.style.top){
        elem.style.top = '0px';
    }
    if(!elem.style.left){
        elem.style.left = '0px';
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if(elem.movement){
        clearTimeout(elem.movement);
    }
    if(xpos === final_x && ypos === final_y){
        return;
    }
    if(xpos<final_x){
        xpos++;
    }
    if(xpos>final_x){
        xpos--;
    }
    if(ypos<final_y){
        ypos++;
    }
    if(ypos>final_y){
        ypos--;
    }
    elem.style.left = xpos + 'px';
    elem.style.top = ypos + 'px';
    elem.movement = setTimeout(moveElement,interval,elementId,final_x,final_y,interval);
}

function convertToGray(img) {

    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img,0,0);

    var c = ctx.getImageData(0,0,img.width,img.height);
    console.log(c);
    for(var i=0;i<c.height;i++){
        for(var j=0;j<c.width;j++){
            var x = (i*4)*c.height + j*4;
            var rgb = (c.data[x] + c.data[x+1] + c.data[x+2])/3;
            c.data[x] = c.data[x+1] = c.data[x+2] = rgb;
        }
    }
    ctx.putImageData(c,0,0,0,0,c.width,c.height);
    return canvas.toDataURL();
}

function prepareSlideshow() {
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    if(!document.getElementById('intro'))return false;
    var intro = document.getElementById('intro');
    var slideshow = document.createElement('div');
    slideshow.setAttribute('id','slideshow');



    var preview = document.createElement('img');
    preview.setAttribute('src','images/slide.jpg');
    preview.setAttribute('alt','A glimpse of what awaits you');
    preview.setAttribute('id','preview');
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);

    var links = document.getElementsByTagName('a');
    var destination;
    for(var i=0;i<links.length;i++){
        links[i].onmouseover = function () {
            destination = this.getAttribute('href');
            if(destination.indexOf('index.html') != -1){
                moveElement('preview',0,0,5);
            }
            else if(destination.indexOf('about.html') != -1){
                moveElement('preview',-151,0,5);
            }
            else if(destination.indexOf('photos.html') != -1){
                moveElement('preview',-302,0,5);
            }
            else if(destination.indexOf('live.html') != -1){
                moveElement('preview',-454,0,5);
            }
            else{
                moveElement('preview',-606,0,5);
            }
        }
    }
}

function showSection(id) {
    var section = document.getElementsByTagName('section');
    for(var i=0;i<section.length;i++){
        if(section[i].getAttribute('id') == id){
            section[i].style.display = 'block';
        }
        else{
            section[i].style.display = 'none';
        }
    }
}

function prepareInternalnav() {
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    var articles = document.getElementsByTagName('article');
    if(articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName('nav');
    if(navs.length == 0 )return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName('a');
    for(var i=0;i<links.length;i++){
        var sectionId = links[i].getAttribute('href').split('#')[1];
        if(!document.getElementById(sectionId))continue;
        document.getElementById(sectionId).style.display = 'none';
        links[i].destination = sectionId;
        links[i].onclick = function () {
            showSection(this.destination);
            return false;
        }
    }
}

function showpic(whichPic) {
    if(!document.getElementById('placeholder'))return false;
    var source = whichPic.getAttribute('href');
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src',source);
    if(!document.getElementById('description'))return false;
    var description = document.getElementById('description');
    if(whichPic.getAttribute('title')){
        var text = whichPic.getAttribute('title');
    }
    else{
        var text = "";
    }
    if(description.lastChild.nodeType == 3){
        description.firstChild.nodeValue = text;
    }
    return false;

}

function preparePlaceholder() {
    if(!document.createElement)return false;
    if(!document.createTextNode)return false;
    if(!document.getElementById)return false;
    if(!document.getElementById('imagegallery'))return false;
    var placeholder = document.createElement('img');
    placeholder.setAttribute('id','placeholder');
    placeholder.setAttribute('src','images/photos/placeholder.jpg');
    placeholder.setAttribute('alt','Image Gallery');
    var description = document.createElement('p');
    description.setAttribute('id','description');
    var desctext = document.createTextNode('choose an image');
    description.appendChild(desctext);
    var imagegallery = document.getElementById('imagegallery');
    insertAfter(description,imagegallery);
    insertAfter(placeholder,description);

}

function prepareGallery() {
    if(!document.getElementsByTagName)return false;
    if(!document.getElementById)return false;
    if(!document.getElementById('imagegallery'))return false;
    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');
    for(var i=0;i<links.length;i++){
        links[i].onclick = function () {
            return showpic(this);
        }
    }
}

function stripeTables() {
    if(!document.getElementsByTagName)return false;
    var tables = document.getElementsByTagName('table');
    for(var i=0;i<tables.length;i++){
        var odd = false;
        var rows = tables[i].getElementsByTagName('tr');
        for(var j=0;j<rows.length;j++){
            if(odd){
                addClass(rows[j],"odd");
                odd = false;
            }
            else{
                odd = true;
            }
        }
    }
}

function highlightRows() {
    if(!document.getElementsByTagName)return false;
    var rows = document.getElementsByTagName('tr');
    for(var i=0;i<rows.length;i++){
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function () {
            addClass(this,'highlight');
        };
        rows[i].onmouseout = function () {
            this.className = this.oldClassName;
        };
    }
}

function displayAbbreviations() {
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode)return false;
    var abbreviation = document.getElementsByTagName('abbr');
    if(abbreviation.length < 1)return false;
    var defs = new Array();
    for(var i=0;i<abbreviation.length;i++){
        var current_abbr = abbreviation[i];
        if(current_abbr.childNodes.length < 1)continue;
        var definition = current_abbr.getAttribute('title');
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    var dlist = document.createElement('dl');
    for(var key in defs){
        var definition = defs[key];
        var dtitle = document.createElement('dt');
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc = document.createElement('dd');
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if(dlist.childNodes.length < 1)return false;
    var header = document.createElement('h3');
    var header_text = document.createTextNode('Abbreviations');
    header.appendChild(header_text);
    var articles = document.getElementsByTagName('article');
    if(articles.length < 1)return false;
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
};

function focusLabels() {
    if(!document.getElementsByTagName)return false;
    var labels = document.getElementsByTagName('label');
    for(var i=0;i<labels.length;i++){
        if(!labels[i].getAttribute('for'))continue;
        labels[i].onclick = function () {
            var id = document.getElementById(labels[i].getAttribute('for'));
            if(!document.getElementById(id))return false;
            var element = document.getElementById(id);
            element.focus();
        }
    }
}

function resetFields(whichform) {
    for(var i=0;i<whichform.elements.length;i++){
        var element = whichform.elements[i];
        if(element.type == 'submit')continue;
        var check = element.getAttribute('placeholder') || element.placeholder;
        if(!check)continue;
        element.onfocus = function () {
            var text = this.placeholder || this.getAttribute('placeholder');
            if(this.value == text){
                this.className = " ";
                this.value = "";
            }
        };
        element.onblur = function () {
            if(this.value == ""){
                this.className = "placeholder";
                this.value = this.placeholder || this.getAttribute('placeholder');
            }
        };
        element.onblur();
    }
}

function prepareForms() {
    for(var i=0;i<document.forms.length;i++){
        var thisform = document.forms[i];
        thisform.onsubmit = function () {
            var article = document.getElementsByTagName('article')[0];
            if(submitFormWithAjax(this,article))return false;
            return true;
        }
    }
}

function getHTTPObject() {
    if(typeof XMLHttpRequest == 'undefined'){
        try{
            return new ActiveXObject('Msxml2.XMLHTTP.6.0');
        }
        catch (e){}
        try{
            return new ActiveXObject('Msxml2.XMLHTTP.3.0');
        }
        catch (e){}
        try{
            return new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (e){}
    }
    return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
    while(element.hasChildNodes()){
        element.removeChild(element.lastChild);
    };
    var content = document.createElement('img');
    content.setAttribute('src','images/ajax-loader.gif');
    content.setAttribute('alt','loading......');
    element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget) {
    var request = getHTTPObject();
    if(!request)return false;
    displayAjaxLoading(thetarget);
    var dataParts = [];
    var element;
    for(var i=0;i<whichform.elements.length;i++){
        element = whichform.elements[i];
        dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
    }
    var data = dataParts.join('&');
    request.open('POST',whichform.getAttribute('action'),true);
    request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    request.onreadystatechange = function () {
        if(request.readyState == 4){
            if(request.status == 200 || request.status == 0){
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if(matches.length > 0){
                    thetarget.innerHTML = matches[1];
                }
                else{
                    thetarget.innerHTML = "<p>Oops, there was an error.Sorry.</p>";
                }
            }
            else{
                thetarget.innerHTML = "<p>" + request.statusText + "</p>";
            }
        }
    };
    request.send(data);
    return true;
}
addLoadEvent(prepareForms);
addLoadEvent(focusLabels);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareInternalnav);
addLoadEvent(prepareSlideshow);
addLoadEvent(highlightPage);