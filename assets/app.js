/*
    Hello bitches !!!
    License: MIT
    Author: Petr Nagy (https://twitter.com/petrnagy)
    More at https://getremotejob.xyz/readme.md
*/

window.addEventListener('load', init);

function init() {
    Burger.init();
    paint();
    determine_device();
    window.addEventListener('resize', determine_device);
    window.addEventListener('orientationchange', determine_device);

    window.addEventListener('scroll', e => {
        let height = window.innerHeight;
        let scrolled = window.pageYOffset;
        if (scrolled >= height * 2) {
            document.body.classList.add('_is-scrolled');
        } else {
            document.body.classList.remove('_is-scrolled');
            Burger.close();
        } // end if
    });

    let hash = window.location.hash.replace('#', '');
    if (hash.length > 1) {
        setTimeout(() => {
            scroll_to_id(null, hash);
        }, 500);
    } // end if
} // end func

function paint() {
    let counter = 0;
    let list = document.getElementsByClassName('_job-pls');
    Array.from(list).forEach(item => {
        ++counter;
        item.outerHTML = draw_job_card(item, counter);
    });
} // end func

function draw_job_card(el, index) {
    let google = 'https://www.google.com/search?q=' + encodeURIComponent(el.dataset.title.toLowerCase() + ' online course');
    
    if (!el.dataset.studyresource) {
        el.dataset.studyresource = google;
    } else {
        if ( 'yes' == el.dataset.google) {
            el.dataset.studyresource += ';' + google;
        } // end if
    } // end if

    let o = '';
    let id = 'row--' + index;
    let resources = el.dataset.studyresource.split(';');
    resources = shuffle(resources);
    let difficulty = el.dataset.difficulty ? el.dataset.difficulty : '';

    o += '<tr class="_job">';
    o += '    <th class="_name _first text-left" scope="row"><div id="' + id + '" class="_relative"><a onclick="return scroll_to_id(event, \'' + id + '\');" href="#' + id + '" class="_anchor">#</a>' + el.dataset.title + '</div></th>';
    o += '    <td class="_title _second text-left"><div class="_desc _text-gray">' + el.dataset.desc + '</div></td>';
    o += '    <td class="_badge _third text-left"><span title="How fast can you approximately start" class="badge _label-diff ' + difficulty + '">' + difficulty + '</span></td>';
    o += '    <td class="_links _fourth text-right">';

    for (var i = 0; i < resources.length; i++) {
        let resource = resources[i];
        let host = extract_hostname(resource);
        if (resource.length == 0) continue;
        // if (i > 0) o += '<br />';
        o += '<a href="' + resource + '" rel="nofollow noopener" class="text-success _link col-xs-6">' + host + '<img class="_external" src="assets/img/open-in-new.svg" alt="Continue" /></a>';
    } // end for
    o += '    </td>';
    o += '</tr>';

    return o;
} // end func

function scroll_to_id(e, id, ignoreOffset = false) {
    if (e && e.preventDefault) e.preventDefault();
    let menuHeight = ignoreOffset ? 0 : 70;
    let offset = document.getElementById(id).offsetTop - menuHeight;
    scrollTo(offset, 500);
    Burger.close();

    let loc = window.location.toString().replace(/\#.*$/, '');
    window.history.replaceState({}, document.title, loc + '#' + id);
    return false;
} // end func

function scrollTo(to, duration) {
    var
        element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startDate = +new Date(),
        // t = current time
        // b = start value
        // c = change in value
        // d = duration
        easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }, // end func
        animateScroll = function () {
            var currentDate = +new Date();
            var currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            } else {
                element.scrollTop = to;
            } // end if
        }; // end func
    animateScroll();
} // end func

function is_in_viewport(el) {
    var bounding = el.getBoundingClientRect();
    if (bounding.top >= document.body.scrollTop && bounding.top <= (document.body.scrollTop + window.innerHeight)) {
        return true;
    } else if (bounding.bottom >= document.body.scrollTop && bounding.bottom <= (document.body.scrollTop + window.innerHeight)) {
        return true;
    } else {
        return false;
    } // end if-elseif-else
} // end func

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
} // end func

function open_window(e, link) {
    e = e || window.event;
    let target = e.target || e.srcElement;
    if (!target.classList.contains('_anchor')) {
        window.open(link, '_blank');
    } // end if
} // end func

function extract_hostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    hostname = hostname.replace(/^www\./, '');

    return hostname;
} // end func

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
} // end func

/**
* @author PN @since 2015-05-01
*/
Browser = {

    /**
    * @static
    * @return Boolean
    */
    isEdge: function () {
        return navigator.userAgent.match(/Edge\/\d./i);
    }, // end method

    /**
    * @static
    * @return Boolean
    */
    isExplorer: function () {
        return (navigator.userAgent.indexOf('MSIE') > -1);
    }, // end method

    /**
    * @static
    * @return Boolean
    */
    isChrome: function () {
        var isChrome = (navigator.userAgent.indexOf('Chrome') > -1);
        return (isChrome && !Browser.isOpera());
    }, // end method

    /**
    * @static
    * @return Boolean
    */
    isSafari: function () {
        var isSafari = (navigator.userAgent.indexOf("Safari") > -1);
        return (isSafari && !Browser.isChrome() && !Browser.isOpera());
    }, // end method

    /**
    * @static
    * @return Boolean
    */
    isFirefox: function () {
        return (navigator.userAgent.indexOf('Firefox') > -1);
    }, // end method

    /**
    * @static
    * @return Boolean
    */
    isOpera: function () {
        return (navigator.userAgent.toLowerCase().indexOf("opr") > -1);
    }, // end func

    /**
    * @static
    * @return Boolean
    */
    isIos: function () {
        if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
            if (!Browser.isWindowsPhone()) {
                return true;
            } // end if
        } // end if
        return false;
    }, // end method

    /**
    * @static
    * @return Boolean
    */
    isAndroid: function () {
        return (navigator.userAgent.toLowerCase().indexOf("android") > -1 && !Browser.isWindowsPhone());
    }, // end method

    /**
    * @static
    * @return Boolean
    */
    isWindowsPhone: function () {
        return navigator.userAgent.match(/Windows Phone/i);
    }, // end method

    /**
    * @static
    * @return Boolean
    */
    isMobileDevice: function () {
        return (Browser.isIos() || Browser.isAndroid() || Browser.isWindowsPhone());
    }, // end method

    /**
    * @static
    * @return Boolean
    */
    isDesktopDevice: function () {
        return !Browser.isMobileDevice();
    }, // end method

};

Burger = {
    init: function(){
        Burger.visibleCls = '_visible';
        Burger.hiddenCls = '_hidden';
        Burger.burger = document.getElementById('burger');
        Burger.menu = document.getElementById('menu');
    },
    toggle: function(){
        if ( Burger.menu.classList.contains(Burger.visibleCls) ) {
            Burger.close();
        } else {
            Burger.open();
        } // end if-else
    },
    open: function(){
        Burger.menu.classList.add(Burger.visibleCls);
        Burger.burger.classList.add(Burger.hiddenCls);
    },
    close: function(){
        Burger.menu.classList.remove(Burger.visibleCls);
        Burger.burger.classList.remove(Burger.hiddenCls);
    }
}

function determine_device() {
    const MOBILE_LIMIT = 991;
    if ( Browser.isMobileDevice() || window.innerWidth <= MOBILE_LIMIT ) {
        document.body.classList.add('is-mobile');
        document.body.classList.remove('is-desktop');
    } else {
        document.body.classList.add('is-desktop');
        document.body.classList.remove('is-mobile');
    } // end if-else
}
