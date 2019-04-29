/*
    Hello world !!!
*/
paint();
init_img_lazy_loading();

function paint() {
    let list = document.getElementsByClassName('_job-pls');
    Array.from(list).forEach(item => {
        item.outerHTML = draw_job_card(item);
    });
} // end func

function draw_job_card(el) {
    let o = '';
    let placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSJ3aGl0ZSI+CiAgPHBhdGggZD0iTTAgNCBMMCAyOCBMMzIgMjggTDMyIDQgeiBNNCAyNCBMMTAgMTAgTDE1IDE4IEwxOCAxNCBMMjQgMjR6IE0yNSA3IEE0IDQgMCAwIDEgMjUgMTUgQTQgNCAwIDAgMSAyNSA3Ij48L3BhdGg+Cjwvc3ZnPg==';

    let img = slugify(el.dataset.title);

    if (!el.dataset.desc) el.dataset.desc = 'Nulla feugiat aliquet feugiat.';
    if (!el.dataset.studyresource) el.dataset.studyresource = 'https://www.google.com/search?q=' + encodeURIComponent('How to be ' + el.dataset.title);
    if (!el.dataset.jobboard) el.dataset.jobboard = 'https://www.google.com/search?q=' + encodeURIComponent('Job boards for ' + el.dataset.title);

    o += '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 _job _img-hover-zoom--quick-zoom">';
    o += '    <div class="card">';
    o += '        <div class="card-body _card-body">';
    o += '            <h3 class="h4 card-title">' + el.dataset.title + '</h3>';
    o += '            <p class="card-text text-muted">' + el.dataset.desc + '</p>';
    o += '            <span title="Difficulty to learn" class="_label-diff ' + el.dataset.difficulty + '">' + el.dataset.difficulty + '</span>';
    o += '        </div>';
    o += '        <div class="_img-wrapper">';
    o += '            <img class="photo _photo" src="'+placeholder+'" lazy-src="assets/img/jobs/w348/' + img + '--w348.jpg" lazy-srcset="assets/img/jobs/w348/' + img + '--w348.jpg 348w, assets/img/jobs/w696/' + img + '--w696.jpg 696w, assets/img/jobs/w1044/' + img + '--w1044.jpg 1044w" alt="Picture" />';
    o += '        </div>';
    o += '        <div class="card-body">';
    o += '            <a href="' + el.dataset.studyresource + '" target="_blank" rel="nofollow" class="card-link _card-link text-success">Study materials <img class="_external" src="assets/img/open-in-new.svg" alt="Continue" /></a>';
    o += '            <a href="' + el.dataset.jobboard + '" target="_blank" rel="nofollow" class="card-link _card-link text-success">Job board <img class="_external" src="assets/img/open-in-new.svg" alt="Continue" /></a>';
    o += '        </div>';
    o += '    </div>';
    o += '</div>';
    return o;
} // end func

function scroll_to_id(id) {
    let offset = document.getElementById(id).offsetTop;
    scrollTo(offset, 500);
    return false;
}

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

function init_img_lazy_loading() {
    var timeout = null;
    var lastOffset = 0;
    window.addEventListener('scroll', e => {
        clearTimeout(timeout);
        lastOffset = document.body.offsetTop;
        timeout = setTimeout(() => {
            if ( lastOffset === document.body.offsetTop ) {
                lazy_load_imgs();
            } // end if
        }, 100);
    });
};

function lazy_load_imgs() {
    let list = document.getElementsByClassName('_photo');
    Array.from(list).forEach(el => {
        if ( is_in_viewport(el) ) {
            el.setAttribute('src', el.getAttribute('lazy-src'));
            el.setAttribute('srcset', el.getAttribute('lazy-srcset'));
        } // end if
    });
} // end func

function is_in_viewport(el) {
    var bounding = el.getBoundingClientRect();
    if ( bounding.top >= document.body.scrollTop && bounding.top <= (document.body.scrollTop + window.innerHeight) ) {
        return true;
    } else if ( bounding.bottom >= document.body.scrollTop && bounding.bottom <= (document.body.scrollTop + window.innerHeight) ) {
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
