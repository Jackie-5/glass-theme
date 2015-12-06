require([], function () {
    var pageLocation = true;
    var b_version = window.navigator.appVersion;
    var version = b_version.split(";");
    if (version.length > 1) {
        var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
        if (trim_Version <= 9) {
            pageLocation = false
        }
    }
    if(pageLocation){
        var browser = {
            versions: function () {
                var u = window.navigator.userAgent;
                return {
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
                    iPad: u.indexOf('iPad') > -1, //是否为iPad
                    webApp: u.indexOf('Safari') == -1,//是否为web应用程序，没有头部与底部
                    weixin: u.indexOf('MicroMessenger') == -1 //是否为微信浏览器
                };
            }()
        };

        var loading = $('.J_loading i');
        var loadingFlag = 0;
        var t = setInterval(function(){
            if(loadingFlag < 99){
                loadingFlag += Math.ceil(Math.random()*10);
                loading.css('width', loadingFlag + '%')
            }
            if(document.readyState=="complete"){clearLoading()}
        },100);

        function clearLoading(){
            loading.css({
                width: '100%',
                opacity: 0
            });
            clearInterval(t);
        }

        var isMobileInit = false;
        var loadMobile = function () {
            require(['/js/mobile.js'], function (mobile) {
                mobile.init();
                isMobileInit = true;
            });
        };
        var isPCInit = false;
        var loadPC = function () {
            require(['/js/pc.js'], function (pc) {
                pc.init();
                isPCInit = true;
            });
        };

        $(window).bind("resize", function () {
            if (isMobileInit && isPCInit) {
                $(window).unbind("resize");
                return;
            }
            var w = $(window).width();
            if (w >= 700) {
                loadPC();
            } else {
                loadMobile();
            }
        });

        if (browser.versions.mobile === true || $(window).width() < 700) {
            loadMobile();
        } else {
            loadPC();
        }

        //是否使用fancybox
        if (yiliaConfig.fancybox === true) {
            require(['/fancybox/jquery.fancybox.js'], function (pc) {
                var isFancy = $(".isFancy");
                if (isFancy.length != 0) {
                    var imgArr = $(".article-inner img");
                    for (var i = 0, len = imgArr.length; i < len; i++) {
                        var src = imgArr.eq(i).attr("src");
                        var title = imgArr.eq(i).attr("alt");
                        imgArr.eq(i).replaceWith("<a href='" + src + "' title='" + title + "' rel='fancy-group' class='fancy-ctn fancybox'><img src='" + src + "' title='" + title + "'></a>");
                    }
                    $(".article-inner .fancy-ctn").fancybox();
                }
            });

        }
        //添加menu选中样式
        var active = $('#header-menu-active');
        var eq = location.search.split('?');
        var obj = {};
        if (location.search && !!~location.search.indexOf('page=')) {
            eq.shift();
            eq = eq[0].split('&');
            eq.forEach(function (item) {
                var b = item.split('=');
                obj[b[0]] = b[1]
            });
            active.find('li').eq(obj.page).find('a').addClass('active')
        } else {
            if(!!~location.pathname.indexOf('/archives/')){
                active.find('li').eq(1).find('a').addClass('active')
            }else if(location.pathname.length <= 1 || !!~location.pathname.indexOf('/page/')){
                active.find('li').eq(0).find('a').addClass('active')
            }else if(!!~location.pathname.indexOf('/tags/') || !!~location.pathname.indexOf('/categories/')){
                active.find('li').eq(2).find('a').addClass('active')
            }
        }
        //是否开启动画
        if (yiliaConfig.animate === true) {

            require(['/js/jquery.lazyload.js'], function () {
                //avatar
                $(".js-avatar").attr("src", $(".js-avatar").attr("lazy-src"));
                $(".js-avatar")[0].onload = function () {
                    $(".js-avatar").addClass("show");
                }
            });

            if (yiliaConfig.isHome === true) {
                //content
                function showArticle() {
                    $(".article").each(function () {
                        if ($(this).offset().top <= $(window).scrollTop() + $(window).height() && !($(this).hasClass('show'))) {
                            $(this).removeClass("hidden").addClass("show");
                            $(this).addClass("is-hiddened");
                        } else {
                            if (!$(this).hasClass("is-hiddened")) {
                                $(this).addClass("hidden");
                            }
                        }
                    });
                }

                $(window).on('scroll', function () {
                    showArticle();
                });
                showArticle();
            }

        }

        //是否新窗口打开链接
        if (yiliaConfig.open_in_new == true) {
            $(".article a[href]").attr("target", "_blank")
        }

        //计算nav高度
        var leftHieght = $('.left-col').height();
        var headNav = $('.J_header-nav');
        var defaultHiehgt = leftHieght - headNav.height() - 20;
        var tocButtonTop = $('#tocButton');
        var leftHeader = $('#header');
        if(tocButtonTop.length === 0 && defaultHiehgt < (leftHeader.height() + parseInt(leftHeader.parents('.intrude-less').css('margin-top')))){
            headNav.css('display','none')
        }else{
            headNav.css({
                top: tocButtonTop.length !== 0 ? (tocButtonTop.position().top > defaultHiehgt ? tocButtonTop.position().top + 15 : defaultHiehgt) : defaultHiehgt,
                visibility: 'visible'
            });
        }



        //随机颜色
        var colorList = ["#6da336", "#ff945c", "#66CC66", "#99CC99", "#CC6666", "#76becc", "#c99979", "#918597", "#4d4d4d"];
        var id = Math.ceil(Math.random() * (colorList.length - 1));
        //PC
        $("#container .left-col .overlay").css({"background-color": colorList[id], "opacity": .3});
        //移动端
        $("#container #mobile-nav .overlay").css({"background-color": colorList[id], "opacity": .7});
    }else{
        $('body').css('background','#fff');
        document.title = '请升级你的浏览器';
        $('.J_container-box').html('<div class="ie"><h1>Hi LowB 我的页面实在是没办法支持到IE9或以下内核的浏览器</h1>' +
            '<p>你正在使用 Internet Explorer 的过期版本（IE6、IE7、IE8、IE9 或使用该内核的浏览器）。这意味着在升级浏览器前，你将无法访问此网站。</p>' +
            '<div class="line"></div>' +
            '<p>自 2014 年 4 月 8 日起，Microsoft 不再为 Windows XP 和 Internet Explorer 8 及以下版本提供相应支持和更新。如果你继续使用这些，你将可能受到病毒、间谍软件和其他恶意软件的攻击，无法确保个人信息的安全。请参阅 <a target="_blank" href="http://windows.microsoft.com/zh-cn/windows/end-support-help">Microsoft 关于 Windows XP 支持已经结束的说明</a> 。</p>' +
            '<div class="line"></div>' +
            '<h2>更先进的浏览器</h2>' +
            '<p>推荐使用以下浏览器的最新版本。如果你的电脑已有以下浏览器的最新版本则直接使用该浏览器访问<b id="referrer"></b>即可。</p>' +
            '<ul class="browser">' +
            '<li><a target="_blank" href="https://www.google.com/intl/zh-CN/chrome/browser/index.html?system=true&standalone=1"><img src="img/chrome.jpg" alt="谷歌浏览器" /> 谷歌浏览器<span>Google Chrome</span></a></li>' +
            '<li><a target="_blank" href="http://www.firefox.com.cn/download/"><img src="img/firefox.jpg" alt="火狐浏览器" /> 火狐浏览器<span>Mozilla Firefox</span></a></li>' +
            '<li><a target="_blank" href="http://windows.microsoft.com/zh-cn/internet-explorer/download-ie"><img src="img/ie.jpg" alt="IE浏览器" /> IE浏览器<span>Internet Explorer</span></a></li>' +
            '<li><a target="_blank" href="http://www.opera.com/download/get/?partner=www&opsys=Windows"><img src="img/opera.jpg" alt="IE浏览器" /> Opera浏览器<span>Opera Explorer</span></a></li>' +
            '<div class="clean"></div>' +
            '</ul>' +
            '<div class="line"></div>' +
            '<h2>为什么会出现这个页面？</h2>' +
            '<p>如果你不知道升级浏览器是什么意思，请请教一些熟练电脑操作的朋友。如果你使用的不是IE6/7/8/9，而是360浏览器、QQ浏览器、搜狗浏览器等，出现这个页面是因为你使用的不是该浏览器的最新版本，升级至最新即可。</p>' +
            '<div class="line"></div>' +
            '<h2>一起抵制IE6、IE7、IE8、IE9</h2>' +
            '<p>为了兼容这个曾经的浏览器霸主，网页设计人员需要做大量的代码工作，而且最终效果也始终不能让人满意。对于普通用户而言，低版本IE更是一个岌岌可危的安全隐患，在Windows历史上几次大的木马病毒事件都是利用IE漏洞进行传播。所以，请和我们一起抵制IE6、IE7、IE8、IE9！</p>' +
            '</div>')
    }
});