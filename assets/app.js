paint();

function paint() {
    let list = document.getElementsByClassName('_job-pls');
    Array.from(list).forEach(item => {
        item.outerHTML = draw_job_card(item);
    });
} // end func

function draw_job_card(el) {
    let o = '';
    let rand = Math.random().toString().replace('.', '');
    
    // Little help for development
    if (!el.dataset.img) el.dataset.img = 'placeholder.jpeg';
    if (!el.dataset.imgx2) el.dataset.imgx2 = 'placeholder.jpeg';
    if (!el.dataset.desc) el.dataset.desc = 'Nulla feugiat aliquet feugiat.';

    el.dataset.img = 'assets/img/jobs/' + el.dataset.img;
    el.dataset.imgx2 = 'assets/img/jobs/' + el.dataset.imgx2;

    o += '<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 _job _img-hover-zoom--quick-zoom">';
    o += '    <div class="card">';
    o += '        <div class="card-body _card-body">';
    o += '            <h3 class="h4 card-title">'+el.dataset.title+'</h3>';
    o += '            <p class="card-text text-muted">'+el.dataset.desc+'</p>';
    o += '            <span title="Difficulty to learn" class="_label-diff '+el.dataset.difficulty+'">'+el.dataset.difficulty+'</span>';
    o += '        </div>';
    o += '        <div class="_img-wrapper">';
    o += '            <img src="'+el.dataset.img+'" srcset="'+el.dataset.imgx2+' 1211w" alt="Picture" />';
    o += '        </div>';
    o += '        <div class="card-body">';
    o += '            <a href="#" class="card-link text-success">Study material</a>';
    o += '            <a href="#" class="card-link text-success">Job listings</a>';
    o += '        </div>';
    o += '    </div>';
    o += '</div>';
    return o;
} // end func

function scroll_to_slide() {
    scrollTo(0, 500);
} // end func

function scroll_to_start() {
    scrollTo(document.getElementById('start').offsetTop, 500);
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
            }
            else {
                element.scrollTop = to;
            } // end if
        }; // end func
    animateScroll();
} // end func