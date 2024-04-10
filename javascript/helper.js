const imgURL = (src, size) => {
    try {
      return src
        .replace(
          /_(pico|icon|thumb|small|compact|medium|large|grande|original|1024x1024|2048x2048|master)+\./g,
          "."
        )
        .replace(/\.jpg|\.png|\.gif|\.jpeg/g, function (match) {
          return "_" + size + match;
        });
    } catch (e) {
      console.log(e);
      return src;
    }
  };
  
  const handleize = (e) => {
    return e
      .toLowerCase()
      .replace(/[^\w\u00C0-\u024f]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };
  
  const formatMoney = function (t, e = simply.moneyFormat) {
    function o(t, e) {
      return void 0 === t ? e : t;
    }
    function i(t, e, i, r) {
      e = o(e, 2);
      i = o(i, ",");
      r = o(r, ".");
      if (isNaN(t) || null == t) return 0;
      t = (t / 100).toFixed(e);
      var n = t.split(".");
      return (
        n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + i) +
        (n[1] ? r + n[1] : "")
      );
    }
    "string" == typeof t && (t = t.replace(".", ""));
    var r = "",
      n = /\{\{\s*(\w+)\s*\}\}/,
      a = e || this.money_format;
    switch (a.match(n)[1]) {
      case "amount":
        // r = i(t, 2);
        r = i(t, 0);
        break;
      case "amount_no_decimals":
        r = i(t, 0);
        break;
      case "amount_with_comma_separator":
        r = i(t, 2, ".", ",");
        break;
      case "amount_with_space_separator":
        r = i(t, 2, " ", ",");
        break;
      case "amount_with_period_and_space_separator":
        r = i(t, 2, " ", ".");
        break;
      case "amount_no_decimals_with_comma_separator":
        r = i(t, 0, ".", ",");
        break;
      case "amount_no_decimals_with_space_separator":
        r = i(t, 0, " ");
        break;
      case "amount_with_apostrophe_separator":
        r = i(t, 2, "'", ".");
        break;
      default:
        r = i(t, 2);
    }
    return a.replace(n, r);
  };
  const ajaxCart = async(url,data)=>{
      try{
          let res = await fetch(url,{
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          })
          res = await res.json();
          return res;
      }catch(e){
        console.log(e);
      }
  }
  const ajaxCartFormType = async(url,data)=>{
    try{
        let res = await fetch(url,{
            method: "POST",
            body: data
        })
        res = await res.json();
        return res;
    }catch(e){
      console.log(e);
    }
}
  const blankBgOpen = function() {
    $(".black_bg").fadeIn();
    $("html").addClass("overflow-hidden");
    $("body").addClass("overflow-hidden");

};
const blankBgClose = function() {
    $(".black_bg").fadeOut();
    $("html").removeClass("overflow-hidden");
    $("body").removeClass("overflow-hidden");
};
const miniCartOpen = function() {
      if(simply.sideCart.type == 'react-cart'){
        $(".side-cart-wrap").addClass("active");
        blankBgOpen();
      }else{
        Shopify.theme.jsAjaxCart.initializeAjaxCart();
        Shopify.theme.jsAjaxCart.showDrawer()
      }
      
  
    // window.location.href = '/cart';
    // 
};
const miniCartClose = function() {
    try{
      window.closeReactCart();
    }
    catch(e){}
    $(".side-cart-wrap").removeClass("active");
    blankBgClose();
};
export const readCookie = (cname)=>{
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return 0;
};

export const writeCookie = (cname, cvalue, exdays)=>{
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

const queryString = function() {
  let vars = {};
  let hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (let i = 0; i < hashes.length; i++) {
    let hash = hashes[i].split('=');
    let obj = {};
    obj.name = decodeURI(hash[0]);
    obj.value = decodeURI(hash[1]);
    vars[obj.name] = obj;
  }
  return vars;
};

const queryStringVariant = (variant) => {
  let value = variant.id
  let key = "variant";
  let uri = window.location.href;
  let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  let separator = uri.indexOf('?') !== -1 ? "&" : "?";
  let newUrl = "";
  if (uri.match(re)) {
    newUrl = uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    newUrl = uri + separator + key + "=" + value;
  }
  window.history.replaceState({}, document.title, newUrl);
}

export const manageHeight = (selector,type) =>{
  var max = 0;
  selector.forEach((el)=>{
      if (el.offsetHeight > max) {
        max = el.offsetHeight;
      }
    }
  );
  selector.forEach((item)=>{
    if(type){
      item.style[`${type}`] = `${max}px`;
    }else{
      item.style['height'] = `${max}px`;
    }
  })
  // return max;
}

export const slideUp = (target, duration=500) => {
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout( () => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    //alert("!");
  }, duration);
}

export const slideDown = (target, duration=500) => {
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;

  if (display === 'none')
    display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout( () => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
  }, duration);
}

export const slideToggle = (target, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
}

export {
  imgURL,
  handleize,
  formatMoney,
  ajaxCart,
  blankBgOpen,
  blankBgClose,
  miniCartOpen,
  miniCartClose,
  ajaxCartFormType,
  queryString,
  queryStringVariant
};
  