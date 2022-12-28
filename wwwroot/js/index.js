// 判断URL参数
var parameter = window.location.hash;
var protocol = window.location.protocol;
switch (parameter) {
    case "#http":
        // 使用http访问
        if (protocol === "https:") {
            window.location.href = "http://www.ycl.cool/#http" ;
        }
        break;
    case "#https":
        // 使用https访问
        if (protocol === "http:") {
            window.location.href = "https://www.ycl.cool/#http" ;
        }
        break;
    default:
        // 判断是否是http并转到https
        if (protocol === "http:") { 
            window.location.href = "https://www.ycl.cool" ;
        }
}

window.onload=function(){
    var text = document.getElementById('wate-text');
    var wate = document.getElementsByClassName('card-wate')[0];
    text.innerText = '网页主体加载完成!';
    document.getElementById('wate-text-info').style.display = "none";
    setTimeout(function(){// 显示加载完成1秒后执行
        text.innerText = '';
        wate.style.width = "0px";
        // 如果访问端是手机则显示提醒，电脑端则显示动态壁纸
        var mobile=isMobile();
        if(mobile){
            document.getElementsByClassName('warning')[0].style.display = "";
            document.body.style.backgroundImage = "url('img/bg.png')"
        }else{
            document.getElementById('background').style.display = "";
        }
        setTimeout(function(){// 等待动画执行完成
            wate.style.display = "none";
            document.getElementsByClassName('card-index')[0].style.display = "";
            document.getElementById('music-control').style.display = ""
            document.getElementById('music').src = "meda/bg.mp3";
        },1000);
    },1000);
};

function isMobile() {
	var userAgentInfo = navigator.userAgent;
	var mobileAgents = [ "Android", "iPhone", "SymbianOS", "Windows Phone", "iPad","iPod"];
	var mobile_flag = false;
	// 根据userAgent判断是否是手机
	for (var v = 0; v < mobileAgents.length; v++) {
		if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
			mobile_flag = true;
			break;
		}
	}
	 var screen_width = window.screen.width;
	 var screen_height = window.screen.height;    
	 // 根据屏幕分辨率判断是否是手机
	 if(screen_width < 500 && screen_height < 800){
		 mobile_flag = true;
	 }
	 return mobile_flag;
}

function chromeVersion() {
    var arr = navigator.userAgent.split(' '); 
    var chromeVersion = '';
    for(var i=0;i < arr.length;i++){
        if(/chrome/i.test(arr[i]))
        chromeVersion = arr[i];
    }
    if(chromeVersion){
        return Number(chromeVersion.split('/')[1].split('.')[0]);
    } else {
        return false;
    }
}

function Minecraft() {
    document.getElementsByName('def')[0].style.display = "none";
    document.getElementsByName('app')[0].style.display = "none";
    document.getElementsByName('mc')[0].style.display = "";
    // 按钮事件
    document.getElementById('mc').classList.add('is-active');
    document.getElementById("app").classList.remove('is-active');
}

function programs() {
    document.getElementsByName('def')[0].style.display = "none";
    document.getElementsByName('mc')[0].style.display = "none";
    document.getElementsByName('app')[0].style.display = "";
    // 按钮事件
    document.getElementById('app').classList.add('is-active');
    document.getElementById("mc").classList.remove('is-active');
}


// YCL
console.log(`
+---------------------------------------------------------+

         o     o          o o o          o
           o o           o               o
            o           o                o
            o            o               o
            o             o o o          o o o o         

+---------------------------------------------------------+

  主版本号: V2.1.3  
  
      修订版本号: 1220.2
      修订日期: 2022-12-21
  
  制作人: 余昌龙
  
  版权: Copyright (C) 2022 YCL
  
  所用开源库: (1) Live2D Widget
      
+---------------------------------------------------------+
`);


 /************************** 以下为原live2d_path.js文件 **************************/

// 注意：live2d_path 参数应使用绝对路径
// const live2d_path = "https://ycl.cool";
// const live2d_path = "http://ycl.cool";
const live2d_path = "";


// 封装异步加载资源的方法
function loadExternalResource(url, type) {
    return new Promise((resolve, reject) => {
        let tag;
        if (type === "css") {
            tag = document.createElement("link");
            tag.rel = "stylesheet";
            tag.href = url;
        } else if (type === "js") {
            tag = document.createElement("script");
            tag.src = url;
        }
        if (tag) {
            tag.onload = () => resolve(url);
            tag.onerror = () => reject(url);
            document.head.appendChild(tag);
        }
    });
}

// 加载 waifu.css live2d.min.js waifu-tips.js
if (screen.width >= 768) {
    Promise.all([
        loadExternalResource(live2d_path + "/css/waifu.css", "css"),
        loadExternalResource(live2d_path + "/js/live2d.min.js", "js"),
        loadExternalResource(live2d_path + "/js/waifu-tips.js", "js")
    ]).then(() => {
        initWidget({
            waifuPath: live2d_path + "/waifu-tips.json",
            cdnPath: live2d_path + "/live2d_API/"
        });
    });
}
// initWidget 第一个参数为 waifu-tips.json 的路径，第二个参数为 API 地址
// 初始化看板娘会自动加载指定目录下的 waifu-tips.json

console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
                                            Live-2D
`);
