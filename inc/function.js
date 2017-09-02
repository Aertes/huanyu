var basePath = "/";
function $2(ObjID) {
	return document.getElementById(ObjID);
}

function MarqueeImage(ObjDiv, Obj1, Obj2, Direction, Speed) {
	var demo1 = $2(Obj1);
	var demo2 = $2(Obj2);
	var mydiv = $2(ObjDiv);
	var Tid;
	switch(Direction) {
		case "left":
			if(demo1.offsetWidth <= mydiv.offsetWidth) return;
			break;
		case "right":
			if(demo1.offsetWidth <= mydiv.offsetWidth) return;
			break;
		case "top":
			if(demo1.offsetHeight <= mydiv.offsetHeight) return;
			break;
		case "bottom":
			if(demo1.offsetHeight <= mydiv.offsetHeight) return;
			break;
	}
	demo2.innerHTML = demo1.innerHTML;
	Tid = setInterval(Marquee, Speed)
	mydiv.onmouseover = function() { clearInterval(Tid) }
	mydiv.onmouseout = function() { Tid = setInterval(Marquee, Speed) }

	function Marquee() {
		switch(Direction) {
			case "left":
				if(mydiv.scrollLeft >= demo1.offsetWidth)
					mydiv.scrollLeft = 0;
				else
					mydiv.scrollLeft++;
				break;
			case "right":
				if(mydiv.scrollLeft == 0)
					mydiv.scrollLeft = demo1.offsetWidth;
				else
					mydiv.scrollLeft--;
				break;
			case "top":
				if(mydiv.scrollTop >= demo1.offsetHeight)
					mydiv.scrollTop = 0;
				else
					mydiv.scrollTop++;
				break;
			case "bottom":
				if(mydiv.scrollTop == 0)
					mydiv.scrollTop = demo1.offsetHeight;
				else
					mydiv.scrollTop--;
				break;
		}
	}
}

function AddFavorite(sURL, sTitle) {
	sURL = encodeURI(sURL);
	try {
		window.external.addFavorite(sURL, sTitle);
	} catch(e) {
		try {
			window.sidebar.addPanel(sTitle, sURL, "");
		} catch(e) {
			alert("您好，您的浏览器不支持自动加入收藏功能，请使用Ctrl+D进行添加，或手动在浏览器里进行设置！");
		}
	}
}

function SetHome(Url) {
	if(document.all) {
		document.body.style.behavior = 'url(#default#homepage)';
		document.body.setHomePage(Url);
	} else {
		alert("您好，您的浏览器不支持自动设置页面为首页功能，请您手动在浏览器里设置该页面为首页！");
	}
}

function CheckSearch(Language) {
	var SearchKey = $2("search_key");
	if(SearchKey.value == "" || SearchKey.value == "请输入搜索关键词" || SearchKey.value == "Please enter keywords") {
		if(Language == "cn") {
			alert("请输入搜索关键词！");
		} else {
			alert("Please enter keywords!");
		}
		SearchKey.focus();
		return;
	}
	location.href = "products.html?search_key=" + encodeURI(SearchKey.value);
}

function CheckSearch2(Evt, Language) {
	Evt = Evt ? Evt : (window.event ? window.event : "");
	var Key = Evt.keyCode ? Evt.keyCode : Evt.which;
	if(Key == 13) {
		var SearchKey = $2("search_key");
		if(SearchKey.value == "" || SearchKey.value == "请输入搜索关键词" || SearchKey.value == "Please enter keywords") {
			if(Language == "cn") {
				alert("请输入搜索关键词！");
			} else {
				alert("Please enter keywords!");
			}
			SearchKey.focus();
			return;
		}
		location.href = "products?search_key=" + encodeURI(SearchKey.value);
	}
}

function FloatDiv(ObjID, Ch) {
	var Did = $2(ObjID);
	var DidTop = parseInt(Did.style.top);
	var Diff = (document.documentElement.scrollTop + document.body.scrollTop + Ch - DidTop) * .80;
	Did.style.top = Ch + document.documentElement.scrollTop + document.body.scrollTop - Diff + "px";
	setTimeout("FloatDiv('" + ObjID + "'," + Ch + ")", 20);
}

function FloatDiv2(ObjID, Ch) {
	var Did = $2(ObjID);
	var DidTop = parseInt(Did.style.top);
	var Diff = (document.documentElement.clientHeight - 53 - Ch + document.documentElement.scrollTop + document.body.scrollTop - DidTop) * .80;
	Did.style.top = document.documentElement.clientHeight - 53 - Ch + document.documentElement.scrollTop + document.body.scrollTop - Diff + "px";
	setTimeout("FloatDiv2('" + ObjID + "'," + Ch + ")", 20);
}

function ScrollTo(ObjID) {
	$("html,body").animate({ scrollTop: ($(ObjID).offset().top) + "px" }, 600);
}

function ScrollTop() {
	$("html,body").animate({ scrollTop: "0px" }, 200);
}

function iNews(Val) {
	$("#inews_menu li").removeAttr("class").eq(Val).attr("class", "inews_menu_over");
	$(".inews").hide().eq(Val).show();
}

function CheckFeedback(ObjForm) {
	if(ObjForm.f_name.value == "" || ObjForm.f_name.value == "姓名") {
		alert("请输入您的姓名！");
		ObjForm.f_name.focus();
		return false;
	}
	if(ObjForm.f_tel.value == "" || ObjForm.f_tel.value == "电话") {
		alert("请输入联系电话！");
		ObjForm.f_tel.focus();
		return false;
	}
	if(ObjForm.f_email.value == "" || ObjForm.f_email.value == "邮箱") {
		alert("请输入电子邮箱！");
		ObjForm.f_email.focus();
		return false;
	}
	if(ObjForm.f_content.value == "" || ObjForm.f_content.value == "留言") {
		alert("请输入留言内容！");
		ObjForm.f_content.focus();
		return false;
	}
	Loading(1);
	ObjForm.submit();
}

/*===================================================================================*/

function Loading(ShowBg) {
	if($("#win_loading").length == 0) {
		var Div = $("<div id=\"win_loading\"></div>");
		$("body").append(Div);
		if(ShowBg == 1) {
			if($("#win_loading_bg").length == 0) {
				var Div_Bg = $("<div id=\"win_loading_bg\"></div>");
				$("body").append(Div_Bg);
			}
		}
	}
}

function Loading_Remove(Val) {
	if($("#win_loading").length > 0) $("#win_loading").remove();
	if(Val == 1)
		if($("#win_loading_bg").length > 0) $("#win_loading_bg").remove();
}

var win_ts_tid;

function Wints(Content) {
	var Div = $("<div id=\"win_ts\"></div>").html("<div id=\"win_ts_box\">" + Content + "</div>");
	Wints_Remove();
	$("body").append(Div);
	$("#win_ts").fadeIn(400, "easeInSine");
	win_ts_tid = setTimeout(Wints_Out, 2000);
}

function Wints_Remove() {
	if(win_ts_tid) clearTimeout(win_ts_tid);
	if($("#win_ts").length > 0) $("#win_ts").remove();
}

function Wints_Out() {
	$("#win_ts").fadeOut(1200, "easeInOutSine", Wints_Remove);
}

/*===================================================================================*/

$(function() {
	if($(".editorc").length > 0) {
		$(".editorc img").each(function() { if(parseInt($(this).width()) > $(".editorc").width()) $(this).css({ "width": "100%", "height": "auto" }); });
	}
	if($(".editorc2").length > 0) {
		$(".editorc2 img").each(function() { if(parseInt($(this).width()) > $(".editorc2").width()) $(this).css({ "width": "100%", "height": "auto" }); });
	}

	$(".langSet").click(function() {
		$(this).addClass("active").siblings().removeClass("active")
		var lang = $(this).attr("data-type");
		localStorage.lang = lang;
		location.reload();
	});
	
	var fileName;
	var language = localStorage.lang;

	if(language == "en") {
		$(".langSet:eq(1)").addClass("active");
		fileName = "messages_en_US"
	} else {
		$(".langSet:eq(0)").addClass("active");
		language = "zh";
		fileName = "messages_zh_TW"
	}

	jQuery.i18n.properties({ //加载浏览器选择语言对应的资源文件
		name: fileName, // 需爱加载的资源文件名称
		path: '/i18n/', //资源文件路径
		mode: 'map', //用Map的方式使用资源文件中的key值
		language: language, //语言类型zh或者en
		callback: function() {
			$(".i18n").each(function(){
				var i18nCode = $(this).attr("i18nCode");
				$(this).val($.i18n.prop(i18nCode));
				$(this).html($.i18n.prop(i18nCode));
			})
		}
	});

	

});

