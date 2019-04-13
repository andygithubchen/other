;var nuevo = {
    controlBar: {
        volumeMenuButton: {
            inline: !1,
            vertical: !0
        },
        children: ['liveDisplay', 'playToggle', 'currentTimeDisplay', 'remainingTimeDisplay', 'progressControl', 'durationDisplay', 'chaptersButton', 'descriptionsButton', 'subtitlesButton', 'captionsButton', 'audioTrackButton', 'volumeMenuButton', 'fullscreenToggle'],
    },
    'techOrder': ['youtube', 'html5', 'flash']
};
var nuevo_yt = !1;
if (typeof jQuery == 'undefined') {
    var tag = document.createElement('script')
      , firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    tag.src = '//ajax.googleapis.com/ajax/libs/jquery//1.11.1/jquery.min.js'
}
;function loadYt() {
    var t = !1
      , e = document.createElement('script')
      , i = document.getElementsByTagName('script')[0];
    i.parentNode.insertBefore(e, i);
    e.onload = function() {
        if (!t) {
            nuevo_yt = !0
        }
    }
    ;
    e.onreadystatechange = function() {
        if (!t && (this.readyState === 'complete' || this.readyState === 'loaded')) {
            nuevo_yt = !0
        }
    }
    ;
    e.src = 'https://www.youtube.com/iframe_api'
}
;loadYt();
if (!('ontouchstart'in document.documentElement)) {
    document.documentElement.className += ' no-touch'
}
;var jskey = !0
  , dm = document.location.hostname.toLowerCase()
  , dom = 'baloveun';
dom = dom.split('').reverse().join('');
if (dm.indexOf(dom) < 0)
    //jskey = !1;
(function(e, t) {
    'use strict';
    var s = {
        src: '',
        href: '',
        target: '_blank',
        allowSkip: !0,
        skipTime: 5,
        repeatAd: !1,
        adsOptions: {},
        lang: {
            'skip': 'Skip Now!',
            'skip in': 'Skip Ad in ',
            'advertisement': 'Advertisement'
        }
    }, i;
    i = function(i) {
        function n(e, t) {
            jQuery(e).css('width', t + 'px');
            if (t == 0)
                jQuery(e).css('visibility', 'hidden');
            else
                jQuery(e).css('visibility', 'visible')
        }
        ;var o = t.mergeOptions(s, i)
          , r = this;
        r.ads(o.adsOptions);
        r.preroll = {
            adDone: !1
        };
        r.on('contentupdate', function() {
            if (!r.preroll.shouldPlayPreroll()) {
                r.trigger('adscanceled')
            } else {
                r.trigger('adsready')
            }
        });
        r.on('readyforpreroll', function() {
            if (!r.preroll.shouldPlayPreroll()) {
                r.trigger('adscanceled');
                return
            }
            ;r.ads.startLinearAdMode();
            r.src(o.src);
            r.one('durationchange', function() {
                r.play()
            });
            r.one('progress', function() {});
            r.one('adloadstart', function() {
                r.play()
            });
            var a = document.createElement('div');
            a.className = 'vjs-preroll-info';
            a.innerHTML = o.lang['advertisement'];
            r.preroll.adinfo = a;
            r.controlBar.el_.insertBefore(r.preroll.adinfo, r.controlBar.getChild('progressControl').el_);
            var t = r.el();
            n(jQuery(t).find('.vjs-volume-menu-button'), 0);
            n(jQuery(t).find('.vjs-resolution-button'), 0);
            n(jQuery(t).find('.vjs-cog-menu-button'), 0);
            jQuery(t).find('.vjs-current-time-display').hide();
            jQuery(t).find('.vjs-duration-display').hide();
            jQuery(t).find('.vjs-remaining-time-display').show();
            jQuery(t).find('.vjs-control-bar').addClass('vjs-visible');
            jQuery(t).find('.vjs-poster').addClass('vjs-hidden');
            jQuery(t).find('.ytspinner').addClass('vjs-hidden');
            if (o.href !== '') {
                var i = document.createElement('a');
                i.className = 'preroll-blocker';
                i.href = o.href;
                i.target = o.target || '_blank';
                i.onclick = function() {
                    r.trigger('adclick')
                }
                ;
                r.preroll.blocker = i;
                r.el().insertBefore(i, r.controlBar.el())
            }
            ;if (o.allowSkip !== !1) {
                var s = document.createElement('div');
                s.className = 'preroll-skip-button';
                r.preroll.skipButton = s;
                r.el().appendChild(s);
                s.onclick = function(t) {
                    var i = i || e.Event;
                    if ((' ' + r.preroll.skipButton.className + ' ').indexOf(' enabled ') >= 0) {
                        r.preroll.exitPreroll()
                    }
                    ;if (i.prototype.stopPropagation !== undefined) {
                        t.stopPropagation()
                    } else {
                        return !1
                    }
                }
                ;
                r.on('adtimeupdate', r.preroll.timeupdate)
            }
            ;r.one('adended', r.preroll.exitPreroll);
            r.one('error', r.preroll.prerollError)
        });
        r.preroll.shouldPlayPreroll = function() {
            if (o.src === '') {
                return !1
            }
            ;if (r.preroll.adDone === !0) {
                return !1
            }
            ;return !0
        }
        ;
        r.preroll.exitPreroll = function() {
            if (typeof r.preroll.skipButton !== 'undefined') {
                r.preroll.skipButton.parentNode.removeChild(r.preroll.skipButton)
            }
            ;r.preroll.adinfo.parentNode.removeChild(r.preroll.adinfo);
            var e = r.el();
            n(jQuery(e).find('.vjs-volume-menu-button'), 50);
            n(jQuery(e).find('.vjs-resolution-button'), 50);
            n(jQuery(e).find('.vjs-cog-menu-button'), 50);
            jQuery(e).find('.vjs-current-time-display').show();
            jQuery(e).find('.vjs-duration-display').show();
            jQuery(e).find('.vjs-remaining-time-display').hide();
            jQuery(e).find('.vjs-control-bar').removeClass('vjs-visible');
            if (typeof r.preroll.blocker !== 'undefined') {
                r.preroll.blocker.parentNode.removeChild(r.preroll.blocker)
            }
            ;r.off('adended', r.preroll.exitPreroll);
            r.off('error', r.preroll.prerollError);
            if (o.repeatAd !== !0) {
                r.preroll.adDone = !0
            }
            ;t.options.wasPreroll = !0;
            r.ads.endLinearAdMode()
        }
        ;
        r.preroll.timeupdate = function(e) {
            r.loadingSpinner.el().style.display = 'none';
            var s = Math.ceil(o.skipTime - r.currentTime());
            if (s > 0) {
                r.preroll.skipButton.innerHTML = o.lang['skip in'] + s + ' seconds'
            } else {
                if ((' ' + r.preroll.skipButton.className + ' ').indexOf(' enabled ') === -1) {
                    r.preroll.skipButton.className += ' enabled';
                    var i = '';
                    try {
                        var i = r.el().getAttribute('poster')
                    } catch (t) {}
                    ;if (i != '' && i != null) {
                        r.preroll.skipButton.innerHTML = o.lang.skip + '<img src="' + i + '" />'
                    } else {
                        r.preroll.skipButton.innerHTML = o.lang.skip
                    }
                }
            }
        }
        ;
        r.preroll.prerollError = function(e) {
            r.preroll.exitPreroll()
        }
        ;
        r.ready(function() {
            function a() {
                return (('ontouchstart'in e) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
            }
            ;if (r.currentSrc()) {
                var i = !1
                  , o = r.currentSrc()
                  , n = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
                  , s = o.match(n);
                if (s && s[2].length === 11) {
                    if (a())
                        i = !0
                }
                ;if (r.preroll.shouldPlayPreroll() && i != !0) {
                    r.trigger('adsready')
                } else {
                    t.options.ytnoload = !0;
                    t.options.autoplay = !0;
                    r.trigger('adscanceled')
                }
            }
        })
    }
    ;
    t.plugin('preroll', i)
}
)(window, window.videojs);
(function() {
    var e = null;
    if (typeof window.videojs === 'undefined' && typeof require === 'function') {
        e = require('video.js')
    } else {
        e = window.videojs
    }
    (function(e, t) {
        var d = {}, n, a = {}, i = {}, c = '', h = '', f = 'LT', p = 10, v = 10, y = '', m = '', j = {};
        function l(e, t, i, s) {
            a = {
                label: i,
                sources: t
            };
            if (typeof s === 'function') {
                return s(e, t, i)
            }
            ;return e.src(t.map(function(e) {
                return {
                    src: e.src,
                    type: e.type,
                    res: e.res
                }
            }))
        }
        ;var o = t.getComponent('MenuItem')
          , u = t.extend(o, {
            constructor: function(e, t, i, s) {
                this.onClickListener = i;
                this.label = s;
                o.call(this, e, t);
                this.src = t.src;
                this.on('click', this.onClick);
                this.on('touchstart', this.onClick);
                if (t.initialySelected) {
                    this.showAsLabel();
                    this.selected(!0);
                    this.addClass('vjs-selected')
                }
            },
            showAsLabel: function(e) {
                if (this.label) {
                    var i = this.options_.label
                      , t = i.replace('p', '');
                    t = parseInt(t);
                    if (t > 0) {
                        if (t > 719)
                            this.label.innerHTML = t + 'p<span class="vjs-hd-icon">HD</span>';
                        else
                            this.label.innerHTML = t + 'p'
                    } else {
                        this.label.innerHTML = i
                    }
                }
            },
            onClick: function(e) {
                this.onClickListener(this);
                var i = this.player_.currentTime()
                  , s = this.player_.paused();
                this.showAsLabel();
                this.addClass('vjs-selected');
                if (!s) {
                    this.player_.bigPlayButton.hide()
                }
                ;if (typeof e !== 'function' && typeof this.options_.customSourcePicker === 'function') {
                    e = this.options_.customSourcePicker
                }
                ;var t = 'loadeddata';
                if (this.player_.techName_ !== 'Youtube' && this.player_.preload() === 'none' && this.player_.techName_ !== 'Flash') {
                    t = 'timeupdate'
                }
                ;l(this.player_, this.src, this.options_.label, e).one(t, function() {
                    if (this.player_.techName_ == 'Flash') {
                        i = 0
                    } else {
                        this.player_.currentTime(i);
                        this.player_.play().handleTechSeeked_()
                    }
                    ;this.player_.handleTechSeeked_();
                    if (!s) {
                        this.player_.play().handleTechSeeked_()
                    } else {
                        if (this.player_.techName_ == 'Flash') {
                            this.player_.play()
                        }
                    }
                    ;this.player_.trigger('resolutionchange')
                })
            }
        });
        var s = t.getComponent('MenuButton')
          , r = t.extend(s, {
            constructor: function(e, i, r, o) {
                this.sources = i.sources;
                this.label = o;
                this.label.innerHTML = i.initialySelectedLabel;
                s.call(this, e, i, r);
                this.controlText('Quality');
                if (r.dynamicLabel) {
                    this.el().appendChild(o)
                } else {
                    var n = document.createElement('span');
                    t.addClass(n, 'vjs-resolution-button-staticlabel');
                    this.el().appendChild(n)
                }
            },
            createItems: function() {
                var t = []
                  , s = (this.sources && this.sources.label) || {};
                var r = function(e) {
                    t.map(function(t) {
                        t.selected(t === e);
                        t.removeClass('vjs-selected')
                    })
                };
                for (var e in s) {
                    if (s.hasOwnProperty(e)) {
                        t.push(new u(this.player_,{
                            label: e,
                            src: s[e],
                            initialySelected: e === this.options_.initialySelectedLabel,
                            customSourcePicker: this.options_.customSourcePicker
                        },r,this.label));
                        i[e] = t[t.length - 1]
                    }
                }
                ;return t
            }
        });
        n = function(n) {
                console.log(999888);
            if (jskey != !0)
                return;
              console.log(999);
            function g(t) {
                if (e.jQuery)
                    t();
                else
                    setTimeout(function() {
                        g(t)
                    }, 50)
            }
            ;var j = {
                settingsButton: !0,
                videoInfo: !1,
                zoomMenu: !0,
                relatedMenu: !0,
                rateMenu: !0,
                shareMenu: !0,
                zoomNav: !0,
                zoomScroll: !1,
                mirrorButton: !1,
                contextMenu: !1,
                related: {},
                logo: '',
                logocontrolbar: '',
                logoposition: 'LT',
                logooffsetX: 10,
                logooffsetY: 10,
                logourl: '',
                shareUrl: '',
                shareTitle: '',
                shareEmebed: '',
                endAction: '',
                pubid: '',
                lang_shareText: 'Check out this cool video at ',
                lang_menu_related: 'Related',
                lang_menu_share: 'Share',
                lang_menu_speed: 'Speed',
                lang_menu_zoom: 'Zoom',
                lang_related: 'Related Videos',
                lang_zoominfo: 'Use +/- key to zoom screen and arrow keys to scroll zoomed area',
                lang_zoomreset: 'ZOOM RESET',
                slideImage: '',
                slideImageWidth: 192,
                slideImageHeight: 108,
                zoomcontrol: !0,
                ratecontrol: !0,
                sharemethod: 'auto'
            };
            var o = this
              , T = this.tech_
              , s = t.mergeOptions(d, n)
              , o = this
              , h = document.createElement('span')
              , c = {};
            s = t.mergeOptions(j, n);
            if (s.related.length > 1) {} else {
                s.lang_menu_related = ''
            }
            ;t.addClass(h, 'vjs-resolution-button-label');
            t.addClass(h, 'vjs-resolution-type');
            s.dynamicLabel = !0;
            o.updateSrc = function(e) {
                if (!e) {
                    return o.src()
                }
                ;if (o.controlBar.resolutionSwitcher) {
                    o.controlBar.resolutionSwitcher.dispose();
                    delete o.controlBar.resolutionSwitcher
                }
                ;e = e.sort(b);
                c = y(e);
                var i = Q(c, e)
                  , n = new r(o,{
                    sources: c,
                    initialySelectedLabel: i.label,
                    initialySelectedRes: i.res,
                    customSourcePicker: s.customSourcePicker
                },s,h);
                t.addClass(n.el(), 'vjs-resolution-button');
                o.controlBar.resolutionSwitcher = o.controlBar.el_.insertBefore(n.el_, o.controlBar.getChild('fullscreenToggle').el_);
                o.controlBar.resolutionSwitcher.dispose = function() {
                    this.parentNode.removeChild(this)
                }
                ;
                return l(o, i.sources, i.label)
            }
            ;
            o.currentResolution = function(e, t) {
                if (e == null) {
                    return a
                }
                ;if (i[e] != null) {
                    i[e].onClick(t)
                }
                ;return o
            }
            ;
            o.getGroupedSrc = function() {
                return c
            }
            ;
            function b(e, t) {
                if (!e.res || !t.res) {
                    return 0
                }
                ;return (+t.res) - (+e.res)
            }
            ;function y(e) {
                var t = {
                    label: {},
                    res: {},
                    type: {},
                    first: {}
                };
                e.map(function(e) {
                    if (e.default) {
                        e.first = 'yes'
                    } else {
                        e.first = 'no'
                    }
                    ;f(t, 'label', e);
                    f(t, 'res', e);
                    f(t, 'type', e);
                    f(t, 'first', e);
                    p(t, 'label', e);
                    p(t, 'res', e);
                    p(t, 'type', e);
                    p(t, 'first', e)
                });
                return t
            }
            ;function f(e, t, i) {
                if (e[t][i[t]] == null) {
                    e[t][i[t]] = []
                }
            }
            ;function p(e, t, i) {
                e[t][i[t]].push(i)
            }
            ;function Q(e, t) {
                var r = s['default']
                  , o = '';
                for (var i = 0; i < t.length; i++) {
                    if (t[i].first == 'yes') {
                        r = t[i].res;
                        o = t[i].label;
                        break
                    }
                }
                ;if (o == '') {
                    r = t[0].res;
                    o = t[0].label
                }
                ;s.resolutionLabel = !0;
                return {
                    res: r,
                    label: o,
                    sources: e.res[r]
                }
            }
            ;function m(e) {
                e.tech_.ytPlayer.setPlaybackQuality('large');
                var i = e.el();
                jQuery(i).attr('slideImage', '');
                s.slideImage = '';
                e.tech_.ytPlayer.addEventListener('onPlaybackQualityChange', function() {
                    e.trigger('resolutionchange')
                });
                e.one('play', function() {
                    jQuery(i).find('.vjs-progress-slide').remove();
                    jQuery(i).find('.vjs-resolution-button').remove();
                    try {
                        var p = e.tech_.ytPlayer.getAvailableQualityLevels()
                          , l = e.tech_.ytPlayer.getPlaybackQuality()
                          , j = [];
                        for (var u = 0; u < p.length; u = u + 1) {
                            if (p[u] != 'auto')
                                j.push(p[u])
                        }
                        ;var f = {
                            hd1080: {
                                res: '1080p',
                                label: '1080',
                                yt: 'hd1080'
                            },
                            hd720: {
                                res: '720p',
                                label: '720p',
                                yt: 'hd720'
                            },
                            large: {
                                res: '480p',
                                label: '480p',
                                yt: 'large'
                            },
                            medium: {
                                res: '360p',
                                label: '360p',
                                yt: 'medium'
                            },
                            small: {
                                res: '240p',
                                label: '240p',
                                yt: 'small'
                            },
                            tiny: {
                                res: '144p',
                                label: '144p',
                                yt: 'tiny'
                            },
                            auto: {
                                res: 'auto',
                                label: 'auto',
                                yt: 'default'
                            }
                        };
                        var m = [];
                        j.map(function(t) {
                            m.push({
                                src: e.src().src,
                                type: e.src().type,
                                label: f[t].label,
                                res: f[t].res,
                                _yt: f[t].yt
                            })
                        });
                        c = y(m);
                        var g = function(t, i, s) {
                            var r = e.tech_.ytPlayer.getPlayerState()
                              , o = e.tech_.ytPlayer.getCurrentTime();
                            if (r != -1 && r != 5) {
                                e.tech_.ytPlayer.stopVideo()
                            }
                            ;e.tech_.ytPlayer.setPlaybackQuality(i[0]._yt);
                            var n = e.tech_.ytPlayer.getPlaybackQuality();
                            e.tech_.ytPlayer.seekTo(o, !0);
                            if (r == 1)
                                e.tech_.ytPlayer.playVideo();
                            return e
                        }
                          , a = c.label.large
                          , n = '480p';
                        if (l == 'highres') {
                            n = '1080p';
                            a = c.label.highres
                        }
                        ;if (l == 'hd1080') {
                            n = '1080p';
                            a = c.label.hd1080
                        }
                        ;if (l == 'hd720') {
                            n = '720p';
                            a = c.label.hd720
                        }
                        ;if (l == 'large') {
                            n = '480p';
                            a = c.label.large
                        }
                        ;if (l == 'medium') {
                            n = '360p';
                            a = c.label.medium
                        }
                        ;if (l == 'small') {
                            n = '240p';
                            a = c.label.small
                        }
                        ;if (l == 'tiny') {
                            n = '144p';
                            a = c.label.tiny
                        }
                        ;var v = {
                            label: n,
                            res: n,
                            sources: a
                        };
                        var d = new r(e,{
                            sources: c,
                            initialySelectedLabel: v.label,
                            initialySelectedRes: v.res,
                            customSourcePicker: g
                        },s,h);
                        d.el().classList.add('vjs-resolution-button');
                        if (e.controlBar.settingsButton) {
                            e.controlBar.resolutionSwitcher = e.controlBar.el_.insertBefore(d.el_, e.controlBar.settingsButton.el_)
                        } else {
                            e.controlBar.resolutionSwitcher = e.controlBar.el_.insertBefore(d.el_, e.controlBar.getChild('fullscreenToggle').el_)
                        }
                        ;t.options.ytnoload = !0;
                        t.options.ytSource = e.currentSrc();
                        jQuery(i).find('.vjs-resolution-button').find('.vjs-menu-item').css('height', '30px');
                        jQuery(i).find('.vjs-resolution-button').find('.vjs-menu-item').css('line-height', '30px')
                    } catch (o) {}
                })
            }
            ;o.ready(function() {
                s.isAddon = !1;
                s.newstate = 4;
                s.oldstate = 4;
                s.events = {};
                var n = o.id()
                  , i = o.el()
                  , R = !0
                  , O = !1
                  , Y = 0
                  , d = !1
                  , U = 0
                  , V = o.$('.vjs-tech')
                  , H = !1
                  , f = this
                  , F = !1
                  , K = !1;
                function q(e) {
                    var i = document.head || document.getElementsByTagName('head')[0]
                      , t = document.createElement('style');
                    t.type = 'text/css';
                    if (t.styleSheet) {
                        t.styleSheet.cssText = e
                    } else {
                        t.appendChild(document.createTextNode(e))
                    }
                    ;i.appendChild(t)
                }
                ;if (s.logocontrolbar) {
                    var w = document.createElement('img')
                      , E = !1;
                    w.src = s.logocontrolbar;
                    w.onload = function() {
                        if ('naturalHeight'in this) {
                            if (this.naturalHeight + this.naturalWidth === 0) {
                                E = !0
                            }
                        } else if (this.width + this.height == 0) {
                            E = !0
                        }
                        ;if (E != !0) {
                            var t = document.createElement('div');
                            t.className = 'vjs-logo-bar';
                            if (s.logourl !== '') {
                                var e = document.createElement('a');
                                e.href = s.logourl;
                                e.target = '_blank';
                                if (s.logotitle)
                                    e.setAttribute('title', s.logotitle);
                                e.appendChild(w);
                                t.appendChild(e);
                                t.style.cursor = 'pointer'
                            } else {
                                t.appendChild(h)
                            }
                            ;o.controlBar.el().insertBefore(t, o.controlBar.getChild('fullscreenToggle').el_)
                        }
                    }
                }
                ;if (s.logo) {
                    var h = document.createElement('img');
                    h.src = s.logo;
                    var a = document.createElement('div');
                    a.className = 'vjs-logo';
                    i.appendChild(a);
                    h.onload = function() {
                        if ('naturalHeight'in this) {
                            if (this.naturalHeight + this.naturalWidth === 0) {
                                i.removeChild(a);
                                return
                            }
                        } else if (this.width + this.height == 0) {
                            i.removeChild(a);
                            return
                        }
                        ;var t = s.logooffsetX
                          , r = s.logooffsetY;
                        if (s.logoposition == 'RT') {
                            a.style.right = t + 'px';
                            a.style.top = t + 'px'
                        } else {
                            a.style.left = t + 'px';
                            a.style.top = t + 'px'
                        }
                        ;if (s.logourl !== '') {
                            var e = document.createElement('a');
                            e.href = s.logourl;
                            e.target = '_blank';
                            if (s.logotitle)
                                e.setAttribute('title', s.logotitle);
                            e.appendChild(h);
                            a.appendChild(e);
                            a.style.cursor = 'pointer'
                        } else {
                            a.appendChild(h)
                        }
                    }
                    ;
                    h.onerror = function() {
                        i.removeChild(a)
                    }
                }
                ;jQuery(i).find('video').attr('controls', !1);
                jQuery(i).find('video').attr('preload', 'auto');
                if (s.contextMenu != !0) {
                    jQuery(i).bind('contextmenu', function() {
                        return !1
                    })
                }
                ;var l = [];
                this.on('loadedmetadata', function() {
                    try {
                        this.tech_.hls.representations().forEach(function(e) {
                            var t = {};
                            var i = e.enabled();
                            t = {
                                id: '',
                                width: '',
                                height: '',
                                status: !1
                            };
                            if (e.width > 0 && e.height > 0) {
                                t.id = e.id;
                                t.width = e.width;
                                t.height = e.height;
                                t.status = e.status;
                                l.push(t)
                            }
                        })
                    } catch (e) {}
                    ;if (l.length > 1) {
                        function a(e, t) {
                            return e.sort(function(e, i) {
                                var s = e[t]
                                  , r = i[t];
                                return ((s < r) ? -1 : ((s > r) ? 1 : 0))
                            })
                        }
                        ;l = a(l, 'height');
                        l = l.reverse();
                        o.controlBar.hlsButton = o.controlBar.addChild('button', {
                            'el': t.createEl('div', {
                                text: 'Qualities',
                                className: 'vjs-menu-button vjs-menu-button-popup vjs-control vjs-button vjs-resolution-button'
                            }, {
                                'role': 'menuitem',
                                'aria-live': 'polite',
                                'aria-expanded': 'false',
                                'aria-haspopup': 'true'
                            })
                        });
                        o.controlBar.hlsButton.addClass('vjs-resolution-button');
                        o.controlBar.el_.insertBefore(o.controlBar.hlsButton.el_, o.controlBar.getChild('fullscreenToggle').el_);
                        var s = '<div class="vjs-menu"><ul class="vjs-menu-content" role="menu">';
                        for (var r = 0, n = l.length; r < n; r++) {
                            s = s + '<li id="' + l[r].height + '" class="vjs-menu-item vjs-hls-resolution" tabindex="-1" role="menuitem" aria-live="polite" aria-disabled="false">' + l[r].height + 'p<span class="vjs-control-text"></span></li>'
                        }
                        ;s = s + '</ul></div>';
                        s = s + '<span class="vjs-resolution-button-label vjs-resolution-type">Auto</span>';
                        o.controlBar.hlsButton.el().innerHTML = s;
                        jQuery(i).find('.vjs-hls-resolution').on(u('click'), function(e) {
                            e.preventDefault();
                            var t = jQuery(this).attr('id')
                              , s = this;
                            jQuery(i).find('.vjs-hls-resolution').removeClass('vjs-selected');
                            f.tech_.hls.representations().forEach(function(e) {
                                if (e.height == t) {
                                    jQuery(s).addClass('vjs-selected');
                                    e.enabled(!0);
                                    jQuery(i).find('.vjs-resolution-type').html(t + 'p')
                                } else
                                    e.enabled(!1)
                            })
                        })
                    }
                });
                var T = document.createElement('div');
                T.className = 'ytspinner vjs-hidden';
                T.style.zIndex = 97;
                i.appendChild(T);
                var Q = document.createElement('div');
                i.appendChild(Q);
                jQuery(Q).attr('class', 'vjs-skin');
                var A = jQuery(Q).css('position');
                if (A != 'absolute')
                    s.themeColor = '';
                i.removeChild(Q);
                if (s.themeColor) {
                    if (s.themeColor != '') {
                        var S = '.vjs-zoom-level {background-color:#' + s.themeColor + '!important;}.no-touch .video-js .vjs-button:hover {background-color:#' + s.themeColor + '!important;}.vjs-play-progress {background-color:#' + s.themeColor + '!important;}.vjs-load-progress {background-color:#' + s.themeColor + '!important;}.vjs-volume-level {background:#' + s.themeColor + '!important;}.vjs-selected {background-color:#' + s.themeColor + '!important;}.video-js .related-header {background-color:#' + s.themeColor + '!important;}.vjs-share-icon:hover:before {color:#' + s.themeColor + '!important;}.no-touch .vjs-menu-content li:hover {background-color:#' + s.themeColor + '!important;}.vjs-zoom-reset:hover  {background-color:#' + s.themeColor + '!important;}.video-js  .vjs-current{background-color:#' + s.themeColor + '!important;}.preroll-skip-button.enabled:hover {background-color:#' + s.themeColor + '!important;}.vjs-show-info { color:#' + s.themeColor + '!important;}.vjs-zoom-level { border:solid 1px #' + s.themeColor + '!important;}.vjs-reset-info:hover {background-color:#' + s.themeColor + '!important;}.vjs-reset-zoom:hover {background-color: #' + s.themeColor + '!important;}.no-touch .video-js .vjs-resolution-button .vjs-menu-item:hover {background-color:#' + s.themeColor + '!important;}'
                          , L = document.head || document.getElementsByTagName('head')[0]
                          , j = document.createElement('style');
                        j.type = 'text/css';
                        if (j.styleSheet) {
                            j.styleSheet.cssText = S
                        } else {
                            j.appendChild(document.createTextNode(S))
                        }
                        ;L.appendChild(j)
                    }
                }
                ;jQuery(i).find('.vjs-play-control').insertBefore(jQuery(i).find('.vjs-live-control'));
                if (jQuery(i).attr('shareTitle'))
                    s.shareTitle = jQuery(i).attr('shareTitle');
                if (s.videoInfo && s.shareTitle) {
                    var y = document.createElement('span');
                    y.className = 'vjs-info';
                    y.innerHTML = s.shareTitle;
                    i.appendChild(y);
                    if (s.themeColor) {
                        jQuery(y).css('color', '#' + s.themeColor)
                    }
                    ;var M = s.shareUrl || document.location.href;
                    jQuery(y).on('click', function() {
                        e.open(M, '_blank')
                    })
                }
                ;function D() {
                    return (('ontouchstart'in e) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))
                }
                ;var c = D();
                this.pauseLock = !1;
                jQuery(i).find('.vjs-load-progress').css('opacity', 0.3);
                this.on('timeupdate', function() {
                    if (!o.paused()) {
                        g(i, 'TIME')
                    }
                });
                this.on('ended', function() {
                    s.newstate = 3;
                    if (s.endAction != '') {
                        if (s.endAction == 'share') {
                            var t = jQuery(i).find('.vjs-sharing-overlay');
                            jQuery(i).find('.vjs-share-button').click()
                        }
                        ;if (s.endAction == 'related') {
                            var e = jQuery(i).find('.vjs-grid');
                            jQuery(i).find('.vjs-related-button').click()
                        }
                    }
                });
                this.on('waiting', function() {
                    if (s.oldstate == 1) {
                        s.oldstate = 2;
                        s.newstate = 2
                    }
                });
                this.on('playing', function() {
                    if (t.options.ytnoload != !0 && o.techName_ === 'Youtube') {
                        m(o)
                    }
                    ;if (d != !0) {
                        t.trigger(this.el_, {
                            type: 'firstplay',
                            target: this.el_
                        });
                        d = !0
                    }
                    ;if (s.oldstate != 2 && s.oldstate != 1) {
                        s.newstate = 1;
                        g(i, 'STATE');
                        s.oldstate = 1
                    }
                });
                this.on('pause', function(e) {
                    if (f.pauseLock)
                        return;
                    if (s.oldstate != 0) {
                        s.newstate = 0;
                        g(i, 'STATE');
                        s.oldstate = 0
                    }
                });
                var N = this.volume();
                try {
                    var b = N * 100;
                    b = b;
                    jQuery(i).find('.vjs-volume-level').css('height', b + '%');
                    jQuery(i).find('.vjs-volume-bar').attr('aria-valuenow', b)
                } catch (r) {}
                ;i.addModelListener = function(e, t) {
                    if (typeof e == 'string') {
                        var o = e.toUpperCase();
                        if (o == 'TIME' || o == 'STATE' || o == 'SEEK') {
                            if (document.createEvent) {
                                var n = document.createEvent('Event');
                                n.initEvent(o, !0, !0);
                                s.events[o] = n;
                                if (typeof t == 'string') {
                                    var a = eval(t);
                                    try {
                                        i.addEventListener(o, a, !1)
                                    } catch (r) {}
                                } else {
                                    try {
                                        i.addEventListener(o, t, !1)
                                    } catch (r) {}
                                }
                                ;try {
                                    g(i, o)
                                } catch (r) {}
                            }
                        }
                    }
                }
                ;
                i.removeModelListener = function(e, t) {
                    if (typeof e == 'string') {
                        var r = e.toUpperCase();
                        i.removeEventListener(r, t, !1);
                        try {
                            delete i.options.events[r]
                        } catch (s) {}
                    }
                }
                ;
                i.sendEvent = function(e, t) {
                    if (typeof e == 'string') {
                        e = e.toLowerCase();
                        switch (e) {
                        case 'play':
                            var i = o.paused();
                            if (i)
                                o.play();
                            break;
                        case 'mute':
                            o.muted(!0);
                            break;
                        case 'unmute':
                            o.muted(!1);
                            break;
                        case 'volume':
                            if (t >= 0 && t <= 100) {
                                o.volume(t / 100);
                                break
                            }
                            ;
                        case 'pause':
                            var i = o.paused();
                            if (i != !0)
                                o.pause();
                            break
                        }
                    }
                }
                ;
                function g(e, t, d) {
                    var h = new Array('PAUSED','PLAYING','BUFFERING','COMPLETED','IDLE');
                    switch (t) {
                    case 'TIME':
                        var u = o.currentTime();
                        var l = o.duration();
                        u = u.toFixed(2);
                        l = l.toFixed(2);
                        try {
                            updateEvent('TIME', u, l, n)
                        } catch (a) {}
                        ;break;
                    case 'VOLUME':
                        try {
                            updateEvent('VOLUME', o.volume().toFixed(2), 0, n)
                        } catch (a) {}
                        ;break;
                    case 'STATE':
                        if (s.isAddon)
                            return;
                        try {
                            updateEvent('STATE', s.newstate, 0, n)
                        } catch (a) {}
                        ;break;
                    case 'SEEEK':
                        break
                    }
                    ;if (s.events) {
                        if (s.events[t]) {
                            var r = s.events[t], p;
                            switch (t) {
                            case 'TIME':
                                var u = o.currentTime();
                                var l = o.duration();
                                r[0] = u;
                                r.position = u;
                                r.duration = l;
                                r[1] = l;
                                r.id = n;
                                r[2] = n;
                                try {
                                    updateEvent('TIME', u, l, n)
                                } catch (a) {}
                                ;break;
                            case 'VOLUME':
                                var c = o.volume();
                                r.percentage = c.toFixed(2);
                                r[0] = c.toFixed(2);
                                r.id == n;
                                r[2] == n;
                                try {
                                    updateEvent('VOLUME', c.toFixed(2), 0, n)
                                } catch (a) {}
                                ;break;
                            case 'STATE':
                                if (s.isAddon)
                                    return;
                                var f = {
                                    newstate: s.newstate,
                                    oldstate: s.oldstate,
                                    id: n
                                };
                                r['newstate'] = h[s.newstate];
                                r['oldstate'] = h[s.oldstate];
                                r['id'] == n;
                                try {
                                    updateEvent('STATE', r['newstate'], r['oldstate'], n)
                                } catch (a) {}
                                ;break
                            }
                            ;if (document.createEventObject) {
                                i.fireEvent('on' + r, evt)
                            } else {
                                i.dispatchEvent(r)
                            }
                        }
                    }
                }
                ;var z = {
                    id: n
                };
                try {
                    playerReady(z)
                } catch (r) {}
                ;s.newstate = 4;
                g(i, 'STATE');
                o.on('userinactive', function() {
                    if (c) {
                        jQuery(i).find('.vjs-extend-menu').hide();
                        jQuery(i).find('.vjs-menu-cog').hide()
                    }
                });
                o.on('useractive', function() {
                    jQuery(i).find('video').attr('controls', !1)
                });
                o.on('loadedmetadata', function() {
                    var e = jQuery(i).attr('slideImage');
                    if (e)
                        s.slideImage = e
                });
                o.on('contentupdate', function() {
                    var e = jQuery(i).find('.vjs-tech');
                    jQuery(e).css({
                        '-webkit-transform': 'scale(1)',
                        '-moz-transform': 'scale(1)',
                        '-ms-transform': 'scale(1)',
                        '-o-transform': 'scale(1)',
                        'transform': 'scale(1)',
                        'top': '0px',
                        'left': '0px'
                    })
                });
                if (s.zoomMenu != !0 && s.relatedMenu != !0 && s.shareMenu != !0 && s.zoomMenu != !0) {
                    s.settingsButton = !1
                }
                ;o.on('firstplay', function() {
                    jQuery(i).find('video').attr('controls', !1);
                    if (d)
                        return;
                    var l = jQuery(i).attr('slideImage');
                    if (l)
                        s.slideImage = l;
                    var a = o.$('.vjs-tech')
                      , h = o.$('.vjs-tech');
                    if (a) {
                        a.removeAttribute('poster')
                    }
                    ;jQuery(i).find('.vjs-info').fadeOut(function() {
                        jQuery(this).remove()
                    });
                    if (s.slideImage && c != !0) {
                        var t = document.createElement('div');
                        t.className = 'vjs-progress-slide';
                        var e = document.createElement('div')
                          , r = document.createElement('div');
                        e.className = 'vjs-thumb';
                        r.className = 'vjs-thumb-duration';
                        e.appendChild(r);
                        t.appendChild(e);
                        e.style.width = s.slideImageWidth + 'px';
                        e.style.height = s.slideImageHeight + 'px';
                        e.style.left = '-' + (parseInt(s.slideImageWidth / 2)) + 'px';
                        e.style.backgroundImage = 'url("' + s.slideImage + '")';
                        jQuery(i).find('.vjs-progress-control').append(t);
                        jQuery(t).css('left', '-1000px');
                        var n = new Image;
                        n.src = s.slideImage;
                        n.onload = function() {
                            var n = this.height;
                            if (n > 0) {
                                jQuery(i).find('.vjs-progress-holder').bind(u('mousemove'), function(n) {
                                    var a = parseInt(o.duration())
                                      , l = 2;
                                    if (a > 180)
                                        l = 4;
                                    if (a > 360)
                                        l = 6;
                                    if (a > 600)
                                        l = 9;
                                    if (a > 900)
                                        l = 15;
                                    if (a > 1500)
                                        l = 20;
                                    if (a > 2000)
                                        l = 25;
                                    if (a > 2500)
                                        l = 30;
                                    if (a > 3000)
                                        l = 35;
                                    if (a > 3500)
                                        l = 40;
                                    if (a > 4000)
                                        l = 45;
                                    if (a > 4500)
                                        l = 50;
                                    if (a > 5000)
                                        l = 55;
                                    if (a > 5500)
                                        l = 60;
                                    if (a > 6000)
                                        l = 65;
                                    if (a > 6500)
                                        l = 70;
                                    if (a > 7000)
                                        l = 80;
                                    var d = jQuery(i).find('.vjs-progress-holder').width()
                                      , u = jQuery(i).find('.vjs-mouse-display').css('left');
                                    if (u == 'auto') {
                                        var y = jQuery(i).find('.vjs-mouse-display')[0].style.left;
                                        u = parseInt(y)
                                    }
                                    ;u = parseInt(u);
                                    var c = jQuery(i).find('.vjs-mouse-display').attr('data-current-time')
                                      , h = u / d
                                      , a = parseInt(o.duration())
                                      , f = parseInt(a * h)
                                      , p = parseInt(f / l)
                                      , v = (p * s.slideImageHeight) * -1;
                                    jQuery(e).css('background-position', '0 ' + v + 'px');
                                    var m = parseInt(s.slideImageWidth / 2);
                                    if (u < 0)
                                        u = 0;
                                    if (u > d)
                                        u = d;
                                    jQuery(r).html(c);
                                    jQuery(t).css('left', u);
                                    jQuery(e).css('opacity', '1')
                                });
                                jQuery(i).find('.vjs-progress-holder').bind(u('mouseout'), function(i) {
                                    jQuery(e).css('opacity', '0');
                                    jQuery(t).css('left', '-1000px')
                                })
                            }
                        }
                    }
                });
                if (o.options_.sources.length > 1) {
                    var p = 0
                      , I = 0;
                    for (p = 0; p < o.options_.sources.length; p++) {
                        if (o.options_.sources[p].res || o.options_.sources[p].label)
                            I++
                    }
                    ;if (I > 1) {
                        o.updateSrc(o.options_.sources)
                    }
                }
                ;if (s.settingsButton != !1) {
                    o.controlBar.settingsButton = o.controlBar.addChild('button', {
                        'el': t.createEl('div', {
                            text: 'Settings',
                            id: 'settings_button',
                            className: 'vjs-menu-button vjs-menu-button-popup vjs-control vjs-button vjs-cog-menu-button'
                        }, {
                            'role': 'menuitem',
                            'aria-live': 'polite',
                            'aria-expanded': 'false',
                            'aria-haspopup': 'true'
                        })
                    });
                    o.controlBar.settingsButton.addClass('vjs-cog-menu-button');
                    o.controlBar.el_.insertBefore(o.controlBar.settingsButton.el_, o.controlBar.getChild('fullscreenToggle').el_);
                    var d = !1;
                    if (s.zoomMenu) {
                        var x = jQuery('<div class=\'vjs-zoom-info vjs-hidden\'>');
                        jQuery('#' + n).append(x)
                    }
                    ;o.on('firstplay', function() {
                        if (d)
                            return;
                        d = !0;
                        jQuery(i).find('.vjs-poster').addClass('vjs-hidden');
                        var h = '<div class="vjs-menu-cog" id="setting_menu"><ul class="vjs-menu-content">';
                        if (s.rateMenu) {
                            h = h + '<li class="vjs-extend">' + s.lang_menu_speed + '<div class="vjs-extend-menu"><ul class="vjs-extend-content"><li class="vjs-speed">x 0.5</li><li class="vjs-speed vjs-current">x 1</li><li class="vjs-speed">x 1.5</li><li class="vjs-speed">x 2</li></ul></div></li>'
                        }
                        ;if (s.zoomMenu) {
                            h = h + '<li class="vjs-extend">' + s.lang_menu_zoom + '<div class="vjs-extend-menu vjs-zoom-menu" id="vjs-zoom_menu"><div id="vjs-zoom-slider" class="vjs-zoom-slider"><div class="vjs-zoom-back"></div><div class="vjs-zoom-level theme-color"></div></div><div class="vjs-zoom-reset">RESET</div></div></li>'
                        }
                        ;if (s.shareMenu) {
                            h = h + '<li class="vjs-share-button">' + s.lang_menu_share + '</li>'
                        }
                        ;if (s.relatedMenu) {
                            h = h + '<li class="vjs-related-button">' + s.lang_menu_related + '</li></ul></div>'
                        }
                        ;o.controlBar.settingsButton.el().innerHTML = h;
                        jQuery(i).find('.vjs-extend').bind('touchstart', function(e) {
                            jQuery(i).find('.vjs-extend-menu').hide();
                            jQuery(this).find('.vjs-extend-menu').show();
                            e.preventDefault();
                            e.stopImmediatePropagation()
                        });
                        jQuery(i).find('.vjs-cog-menu-button').bind('touchstart', function(e) {
                            if (e.target == e.currentTarget) {
                                jQuery(this).find('.vjs-menu-cog').toggle();
                                jQuery(i).find('.vjs-extend-menu').hide();
                                e.stopImmediatePropagation();
                                return
                            }
                            ;if (e.target.className == 'vjs-extend') {
                                jQuery(this).find('.vjs-extend-menu').show();
                                e.preventDefault();
                                e.stopImmediatePropagation();
                                return
                            }
                        });
                        if (s.related.length > 2) {
                            var p = document.createElement('div');
                            p.className = 'vjs-grid vjs-hidden';
                            var x = document.createElement('div')
                              , N = document.createElement('div');
                            N.className = 'vjs-close-btn';
                            p.appendChild(N);
                            x.className = 'vjs-grid-box';
                            p.appendChild(x);
                            i.appendChild(p);
                            var g = s.related.length;
                            if (g > 12)
                                g = 12;
                            for (var m = 0; m < g; m = m + 1) {
                                var j = document.createElement('div');
                                if (g > 6)
                                    j.className = 'vjs-grid-item grid-4';
                                else
                                    j.className = 'vjs-grid-item';
                                j.innerHTML = '<div class="vjs-grid-img"><a href="' + s.related[m]['url'] + '" target="blank"><img src="' + s.related[m]['thumb'] + '" /><i class="vjs-preview"></i></a></div><span>' + s.related[m]['title'] + '</span>';
                                x.appendChild(j)
                            }
                            ;jQuery(i).find('.vjs-grid-img a').bind(u('click'), function(e) {
                                e.stopImmediatePropagation()
                            });
                            jQuery(i).find('.vjs-related-button').bind(u('click'), function(t) {
                                t.preventDefault();
                                t.stopImmediatePropagation();
                                f.pauseLock = !0;
                                if (c) {
                                    jQuery(i).find('.vjs-extend-menu').hide();
                                    jQuery(i).find('.vjs-menu-cog').hide()
                                }
                                ;jQuery(p).removeClass('vjs-hidden');
                                jQuery(p).show();
                                p.style.opacity = 1;
                                s.isAddon = !0;
                                jQuery(i).find('.vjs-logo').addClass('vjs-hidden');
                                jQuery(i).find('.vjs-big-play-button').addClass('vjs-hidden');
                                jQuery(i).find('.vjs-control-bar').addClass('vjs-hidden');
                                var r = o.paused();
                                o.pause();
                                jQuery(e).bind(u('click'), function(t) {
                                    if (t.target.className != 'vjs-related-item') {
                                        t.preventDefault();
                                        jQuery(e).unbind(u('click'));
                                        jQuery(i).find('.vjs-logo').removeClass('vjs-hidden');
                                        jQuery(i).find('.vjs-big-play-button').removeClass('vjs-hidden');
                                        jQuery(i).find('.vjs-control-bar').removeClass('vjs-hidden');
                                        s.isAddon = !1;
                                        f.pauseLock = !1;
                                        if (r != !0)
                                            o.play();
                                        jQuery(p).addClass('vjs-hidden')
                                    }
                                })
                            })
                        } else {
                            jQuery(i).find('.vjs-related-button').remove();
                            jQuery(i).find('.vjs-extend-menu').css('top', '-30px')
                        }
                        ;if (s.shareMenu) {
                            var l = document.createElement('div');
                            l.className = 'vjs-sharing-overlay vjs-hidden';
                            var S = document.createElement('div');
                            S.className = 'vjs-sharing-container';
                            var I = document.createElement('div');
                            I.className = 'vjs-sharing-body';
                            if (jQuery(i).attr('shareUrl'))
                                s.shareUrl = jQuery(i).attr('shareUrl');
                            var D = s.shareUrl || document.location.href;
                            if (jQuery(i).attr('shareEmbed'))
                                s.shareEmbed = jQuery(i).attr('shareEmbed');
                            var A = s.shareEmbed || 'N/A';
                            if (jQuery(i).attr('shareTitle'))
                                s.shareTitle = jQuery(i).attr('shareTitle');
                            var z = document.createElement('div');
                            z.className = 'vjs-close-btn vjs-share-close';
                            var a = '<div class="vjs-inputs-body"><h2>Link</h2><input type="text" value="' + D + '" /><h2>Embed</h2><input class="embed-code" type="text" value="" /></div>'
                              , a = a + '<div class="vjs-inputs-body"><h2>Social</h2></div>';
                            a = a + '<div class="vjs-share-block"><i id="share_facebook" class="vjs-share-icon nv vjs-facebook-square" role="button" aria-live="polite" tabindex="0"><div class="vjs-control-content"><span class="vjs-control-text">Facebook</span></div></i>';
                            a = a + '<i id="share_twitter" class="vjs-share-icon nv vjs-twitter-square" role="button" aria-live="polite" tabindex="0"><div class="vjs-control-content"><span class="vjs-control-text">Twitter</span></div></i>';
                            a = a + '<i id="share_pinterest" class="vjs-share-icon nv vjs-pinterest-square" role="button" aria-live="polite" tabindex="0"><div class="vjs-control-content"><span class="vjs-control-text">Pinterest</span></div></i>';
                            a = a + '<i id="share_google" class="vjs-share-icon nv vjs-google-plus-square" role="button" aria-live="polite" tabindex="0"><div class="vjs-control-content"><span class="vjs-control-text">Google+</span></div></i></div>';
                            I.innerHTML = a;
                            S.appendChild(I);
                            l.appendChild(z);
                            l.appendChild(S);
                            o.el().appendChild(l);
                            jQuery(l).css('opacity', '0');
                            jQuery(i).find('.embed-code').val(A);
                            jQuery(i).find('.vjs-share-button').bind(u('click'), function(t) {
                                t.preventDefault();
                                t.stopImmediatePropagation();
                                if (c) {
                                    jQuery(i).find('.vjs-extend-menu').hide();
                                    jQuery(i).find('.vjs-menu-cog').hide()
                                }
                                ;jQuery(l).removeClass('vjs-hidden');
                                jQuery(l).show();
                                jQuery(l).css('opacity', '1');
                                f.pauseLock = !0;
                                jQuery(i).find('.vjs-big-play-button').addClass('vjs-hidden');
                                s.isAddon = !0;
                                var n = o.paused();
                                if (n != !0)
                                    o.pause();
                                if (s.sharemethod == 'auto') {
                                    var r = {
                                        'url': s.shareUrl || document.location.href
                                    }
                                } else {
                                    var r = {
                                        'url': s.shareUrl || document.location.href,
                                        'title': s.shareTitle || document.title,
                                        'description': s.lang_shareText + s.shareUrl,
                                        'pubid': s.pubid || null
                                    }
                                }
                                ;var a = function(e) {
                                    var i = [];
                                    for (var t in e) {
                                        i.push(encodeURIComponent(t) + '=' + encodeURIComponent(e[t]))
                                    }
                                    ;return i.join('&')
                                };
                                jQuery(i).find('[id*=\'share_\']').on(u('click'), function(t) {
                                    t.preventDefault();
                                    t.stopImmediatePropagation();
                                    var n = jQuery(this).attr('id')
                                      , l = n.split('_')
                                      , u = l[1]
                                      , i = '';
                                    switch (u) {
                                    case 'facebook':
                                        i = 'facebook';
                                        break;
                                    case 'twitter':
                                        i = 'twitter';
                                        break;
                                    case 'pinterest':
                                        i = 'pinterest';
                                        break;
                                    case 'google':
                                        i = 'googleplus';
                                        break
                                    }
                                    ;var s = 550
                                      , o = 450;
                                    e.open('http://api.addthis.com/oexchange/0.8/forward/' + i + '/offer?' + a(r), 'AddThis', 'height=' + o + ',width=' + s + ',modal=yes,alwaysRaised=yes')
                                });
                                jQuery(i).find('.vjs-inputs-body').bind(u('click'), function(e) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation()
                                });
                                jQuery(i).find('.vjs-inputs-body input').bind(u('click'), function(e) {
                                    this.select()
                                });
                                jQuery(e).bind(u('click'), function(t) {
                                    t.preventDefault();
                                    jQuery(e).unbind(u('click'));
                                    jQuery(l).addClass('vjs-hidden');
                                    jQuery(i).find('.vjs-big-play-button').removeClass('vjs-hidden');
                                    s.isAddon = !1;
                                    f.pauseLock = !1;
                                    if (n != !0)
                                        o.play()
                                })
                            })
                        }
                        ;if (s.rateMenu) {
                            jQuery(i).find('.vjs-speed').on(u('click'), function(e) {
                                e.preventDefault();
                                var t = jQuery(this).html();
                                t = t.replace('x ', '');
                                if (parseFloat(t) > 0) {
                                    o.playbackRate(t);
                                    jQuery('.vjs-speed').removeClass('vjs-current');
                                    jQuery(this).addClass('vjs-current')
                                }
                            })
                        }
                        ;if (s.zoomMenu) {
                            var Q = !1, T = !1, w, E, y = '', r = 1;
                            this.zoom_panel = document.createElement('div');
                            this.zoom_panel.className = 'vjs-zoom-parent vjs-zoom-hidden';
                            this.zoom_button = document.createElement('div');
                            this.zoom_button.className = 'vjs-reset-zoom';
                            this.zoom_button.innerHTML = s.lang_zoomreset;
                            this.zoom_panel.appendChild(this.zoom_button);
                            if (c != !0) {
                                this.zoom_info = document.createElement('div');
                                this.zoom_info.className = 'vjs-reset-info';
                                this.zoom_menu = document.createElement('div');
                                this.zoom_menu.className = 'vjs-reset-menu';
                                var n = '<div class="vjs-reset-header">Keyboard control</div>';
                                n = n + '<div><span class="s1">+/-</span>zoom area</div>';
                                n = n + '<div><span class="s1">&larr;</span>scroll left</div>';
                                n = n + '<div><span class="s1">&rarr;</span>scroll right</div>';
                                n = n + '<div><span class="s1">&uarr;</span>scroll up</div>';
                                n = n + '<div><span class="s1">&darr;</span>scroll down</div>';
                                this.zoom_menu.innerHTML = n;
                                this.zoom_panel.appendChild(this.zoom_menu);
                                this.zoom_panel.appendChild(this.zoom_info)
                            }
                            ;jQuery(i).find('.vjs-control-bar').append(this.zoom_panel);
                            var b = o.el();
                            if (!b.hasAttribute('tabIndex')) {
                                b.setAttribute('tabIndex', '-1')
                            }
                            ;b.style.outline = 'none';
                            if (s.zoomScroll) {
                                jQuery(i).bind('mousewheel DOMMouseScroll', function(t) {
                                    t.preventDefault();
                                    var t = e.event || t
                                      , i = Math.max(-1, Math.min(1, (t.wheelDelta || -t.detail)));
                                    if (i > 0) {
                                        r = r + 0.1;
                                        if (r > 5)
                                            r = 5
                                    } else {
                                        r = r - 0.1;
                                        if (r < 1)
                                            r = 1
                                    }
                                    ;M(r)
                                })
                            }
                            ;jQuery(document).bind('keydown', function(e) {
                                var t = e.keyCode;
                                if (r > 1 && t == 36) {
                                    e.preventDefault();
                                    var n = o.id()
                                      , s = jQuery(i).find('.vjs-tech');
                                    jQuery(s).css('left', '0');
                                    jQuery(s).css('top', '0')
                                }
                                ;if (r > 1 && (t == 40 || t == 38 || t == 37 || t == 39 || t == 176 || t == 177)) {
                                    e.preventDefault();
                                    if (Q)
                                        return;
                                    Q = !0;
                                    y = '';
                                    clearInterval(w);
                                    if (t == 40)
                                        y = 'down';
                                    if (t == 38)
                                        y = 'up';
                                    if (t == 37 || t == 176)
                                        y = 'left';
                                    if (t == 39 || t == 177)
                                        y = 'right';
                                    if (y != '') {
                                        jQuery(document).bind('keyup', function() {
                                            Q = !1;
                                            clearInterval(w);
                                            jQuery(document).unbind('keyup')
                                        });
                                        w = setInterval(R, 25)
                                    }
                                }
                                ;if ((t == 107 || t == 109) && d == !0) {
                                    e.preventDefault();
                                    if (T)
                                        return;
                                    T = !0;
                                    clearInterval(E);
                                    jQuery(document).bind('keyup', function() {
                                        T = !1;
                                        clearInterval(E);
                                        jQuery(document).unbind('keyup')
                                    });
                                    E = setInterval(function() {
                                        if (t == 107)
                                            r = r + 0.1;
                                        if (t == 109)
                                            r = r - 0.1;
                                        if (r > 5)
                                            r = 5;
                                        if (r < 1)
                                            r = 1;
                                        M(r)
                                    }, 50)
                                }
                            });
                            function M(e) {
                                var a = o.id()
                                  , n = jQuery(i).find('.vjs-tech');
                                v(n, (e));
                                jQuery(i).find('.vjs-zoom-info').html('ZOOM: ' + parseInt(e * 100) + ' %<span>' + s.lang_zoominfo + '</span>');
                                if (e > 1) {
                                    t.options.blockKeys = !0;
                                    jQuery(i).find('.vjs-zoom-parent').removeClass('vjs-zoom-hidden')
                                } else {
                                    t.options.blockKeys = !1;
                                    jQuery(i).find('.vjs-zoom-parent').addClass('vjs-zoom-hidden');
                                    jQuery(n).css('left', '0');
                                    jQuery(n).css('top', '0')
                                }
                                ;var r = (e - 1) / 4;
                                r = parseInt(r * 100);
                                jQuery(i).find('.vjs-zoom-level').css('height', r + '%')
                            }
                            ;function L(e) {
                                var h = jQuery(i).find('.vjs-zoom-slider')[0];
                                if ('ontouchstart'in document) {
                                    var c = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0]
                                      , u = c.pageY
                                } else {
                                    var u = e.pageY
                                }
                                ;var n = u - k(h);
                                if (n > 70)
                                    n = 70;
                                if (n < 0)
                                    n = 0;
                                var l = parseInt(100 - ((n / 70) * 100));
                                jQuery(i).find('.vjs-zoom-level').css('height', l + '%');
                                var a = 1 + (4 * l / 100);
                                r = a;
                                var f = o.id()
                                  , d = jQuery(i).find('.vjs-tech');
                                v(d, (a));
                                jQuery(i).find('.vjs-zoom-info').html('ZOOM: ' + parseInt(a * 100) + ' %<span>' + s.lang_zoominfo + '</span>');
                                if (a > 1) {
                                    t.options.blockKeys = !0;
                                    jQuery(i).find('.vjs-zoom-parent').removeClass('vjs-zoom-hidden')
                                } else {
                                    t.options.blockKeys = !1;
                                    jQuery(i).find('.vjs-zoom-parent').addClass('vjs-zoom-hidden')
                                }
                            }
                            ;function R() {
                                var s = jQuery(i).find('.vjs-tech')
                                  , e = parseInt(jQuery(s).css('top'))
                                  , t = parseInt(jQuery(s).css('left'))
                                  , r = y;
                                if (r == 'down')
                                    e = e + 5;
                                if (r == 'up')
                                    e = e - 5;
                                if (r == 'left')
                                    t = t - 5;
                                if (r == 'right')
                                    t = t + 5;
                                jQuery(s).css('left', t + 'px');
                                jQuery(s).css('top', e + 'px')
                            }
                            ;jQuery(i).find('.vjs-reset-info').bind('mouseenter', function(e) {
                                jQuery(i).find('.vjs-reset-menu').slideDown(200)
                            });
                            jQuery(i).find('.vjs-reset-info').bind('mouseleave', function(e) {
                                jQuery(i).find('.vjs-reset-menu').slideUp(200)
                            });
                            jQuery(i).find('.vjs-reset-zoom').bind(u('click'), function(e) {
                                B();
                                e.preventDefault();
                                e.stopImmediatePropagation()
                            });
                            jQuery(i).find('.vjs-zoom-reset').bind(u('click'), function(e) {
                                B();
                                e.preventDefault();
                                e.stopImmediatePropagation()
                            });
                            jQuery(i).find('.vjs-zoom-slider').bind('click', function(e) {
                                e.preventDefault();
                                e.stopImmediatePropagation()
                            });
                            jQuery(i).find('.vjs-zoom-slider').bind(u('mousedown'), function(e) {
                                e.preventDefault();
                                C();
                                jQuery(i).find('#setting_menu').addClass('vjs-show');
                                jQuery(i).find('#vjs-zoom_menu').addClass('vjs-visible');
                                L(e);
                                if (c != !0)
                                    jQuery(i).find('.vjs-zoom-info').removeClass('vjs-hidden');
                                var t = function(e) {
                                    e.preventDefault();
                                    L(e)
                                }
                                  , s = function(e) {
                                    if (e)
                                        e.preventDefault();
                                    P();
                                    jQuery(i).find('.vjs-zoom-info').addClass('vjs-hidden');
                                    jQuery(i).find('#setting_menu').removeClass('vjs-show');
                                    jQuery(i).find('#vjs-zoom_menu').removeClass('vjs-visible');
                                    jQuery(document).unbind(u('mouseup'));
                                    jQuery(document).unbind(u('mousemove'))
                                };
                                jQuery(document).bind(u('mousemove'), t);
                                jQuery(document).bind(u('mouseup'), s)
                            })
                        }
                    })
                }
                ;function B() {
                    t.options.blockKeys = !1;
                    currentZoom = 1;
                    isKey = !1;
                    jQuery(document).unbind(u('keyup'));
                    jQuery(i).find('.vjs-zoom-level').css('height', '0');
                    var e = jQuery(i).find('.vjs-tech');
                    v(e, 1);
                    jQuery(e).css('top', '0px');
                    jQuery(e).css('left', '0px');
                    jQuery(i).find('.vjs-zoom-info').addClass('vjs-hidden');
                    jQuery(i).find('.vjs-zoom-parent').addClass('vjs-zoom-hidden')
                }
                ;if (s.mirrorButton != !1) {
                    o.controlBar.mirrorButton = o.controlBar.addChild('button', {
                        'el': t.createEl('div', {
                            text: 'Rotate',
                            className: 'vjs-mirror-button vjs-control vjs-button'
                        }, {
                            'role': 'button',
                            'aria-live': 'polite',
                            'aria-disabled': 'false'
                        })
                    });
                    if (s.settingsButton != !1) {
                        o.controlBar.el_.insertBefore(o.controlBar.mirrorButton.el_, o.controlBar.getChildById('settings_button').el_)
                    } else {
                        o.controlBar.el_.insertBefore(o.controlBar.mirrorButton.el_, o.controlBar.getChild('fullscreenToggle').el_)
                    }
                    ;jQuery(i).find('.vjs-mirror-button').bind('click touchstart', function(e) {
                        e.preventDefault();
                        var t = jQuery(i).hasClass('vjs-has-started')
                          , s = jQuery(i).hasClass('vjs-ended');
                        if (jQuery(i).hasClass('vjs-has-started') && !jQuery(i).hasClass('vjs-ended')) {
                            if (jQuery(this).hasClass('vjs-mirrored')) {
                                jQuery(this).removeClass('vjs-mirrored');
                                jQuery(i).find('.vjs-tech').css('transform', 'rotateY(0)')
                            } else {
                                jQuery(this).addClass('vjs-mirrored');
                                jQuery(i).find('.vjs-tech').css('transform', 'rotateY(180deg)')
                            }
                        }
                    })
                }
                ;if (o.techName_ === 'Youtube') {
                    m(o)
                }
                ;o.trigger('nuevoReady')
            });
            function v(e, t) {
                jQuery(e).css({
                    '-webkit-transform': 'scale(' + t + ')',
                    '-moz-transform': 'scale(' + t + ')',
                    '-ms-transform': 'scale(' + t + ')',
                    '-o-transform': 'scale(' + t + ')',
                    'transform': 'scale(' + t + ')'
                })
            }
            ;function k(e) {
                var t = e.offsetTop;
                while (e = e.offsetParent) {
                    t += e.offsetTop
                }
                ;return t
            }
            ;function C() {
                jQuery(document).css('-webkit-user-select', 'none');
                jQuery(document).css('-moz-user-select', 'none');
                jQuery('body').css('-webkit-user-select', 'none');
                jQuery('body').css('-moz-user-select', 'none');
                document.body.focus();
                document.onselectstart = function() {
                    return !1
                }
            }
            ;function P() {
                jQuery(document).css('-webkit-user-select', 'text');
                jQuery(document).css('-moz-user-select', 'text');
                jQuery('body').css('-webkit-user-select', 'text');
                jQuery('body').css('-moz-user-select', 'text');
                document.onselectstart = function() {
                    return !0
                }
            }
            ;function u(e) {
                if ('ontouchstart'in document.documentElement) {
                    switch (e) {
                    case 'click':
                        e = 'touchstart';
                        break;
                    case 'mousedown':
                        e = 'touchstart';
                        break;
                    case 'mousemove':
                        e = 'touchmove';
                        break;
                    case 'mouseup':
                        e = 'touchend';
                        break;
                    default:
                        break
                    }
                }
                ;return e
            }
        }
        ;
        t.plugin('nuevoPlugin', n)
    }
    )(window, e)
}
)();
(function(e, t) {
    if (jskey != !0)
        return;
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = t(require('video.js'))
    } else if (typeof define === 'function' && define.amd) {
        define(['videojs'], function(i) {
            return (e.Youtube = t(i))
        })
    } else {
        e.Youtube = t(e.videojs)
    }
}(this, function(e) {
    'use strict';
    var s = e.getComponent('Tech')
      , t = e.extend(s, {
        constructor: function(e, r) {
            s.call(this, e, r);
            this.setPoster(e.poster);
            this.setSrc(this.options_.source, !0);
            this.ytplaying = !1;
            setTimeout(function() {
                this.el_.parentNode.className += ' vjs-youtube';
                if (i) {
                    this.el_.parentNode.className += ' vjs-youtube-mobile'
                }
                ;if (t.isApiReady) {
                    this.initYTPlayer()
                } else {
                    t.apiReadyQueue.push(this)
                }
            }
            .bind(this))
        },
        dispose: function() {
            this.el_.parentNode.className = this.el_.parentNode.className.replace(' vjs-youtube', '').replace(' vjs-youtube-mobile', '');
            jQuery(this.el_).remove()
        },
        createEl: function() {
            var t = document.createElement('div');
            t.setAttribute('id', this.options_.techId);
            t.setAttribute('style', 'width:100%;height:100%;top:0;left:0;position:absolute');
            t.setAttribute('class', 'vjs-tech');
            var s = document.createElement('div');
            s.appendChild(t);
            if (!i && !this.options_.ytControls) {
                var e = document.createElement('div');
                e.setAttribute('class', 'vjs-iframe-blocker');
                e.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%');
                e.onclick = function() {
                    this.pause()
                }
                .bind(this);
                s.appendChild(e)
            }
            ;return s
        },
        initYTPlayer: function() {
            var e = {
                controls: 0,
                modestbranding: 1,
                iv_load_policy: 3,
                rel: 0,
                showinfo: 0,
                loop: this.options_.loop ? 1 : 0,
            };
            if (typeof this.options_.autohide !== 'undefined') {
                e.autohide = this.options_.autohide
            }
            ;if (typeof this.options_['cc_load_policy'] !== 'undefined') {
                e['cc_load_policy'] = this.options_['cc_load_policy']
            }
            ;if (typeof this.options_.ytControls !== 'undefined') {
                e.controls = this.options_.ytControls
            }
            ;if (typeof this.options_.disablekb !== 'undefined') {
                e.disablekb = this.options_.disablekb
            }
            ;if (typeof this.options_.end !== 'undefined') {
                e.end = this.options_.end
            }
            ;if (typeof this.options_.color !== 'undefined') {
                e.color = this.options_.color
            }
            ;if (!e.controls) {
                e.fs = 0
            } else if (typeof this.options_.fs !== 'undefined') {
                e.fs = this.options_.fs
            }
            ;if (typeof this.options_.end !== 'undefined') {
                e.end = this.options_.end
            }
            ;if (typeof this.options_.hl !== 'undefined') {
                e.hl = this.options_.hl
            } else if (typeof this.options_.language !== 'undefined') {
                e.hl = this.options_.language.substr(0, 2)
            }
            ;if (typeof this.options_['iv_load_policy'] !== 'undefined') {
                e['iv_load_policy'] = this.options_['iv_load_policy']
            }
            ;if (typeof this.options_.list !== 'undefined') {
                e.list = this.options_.list
            } else if (this.url && typeof this.url.listId !== 'undefined') {
                e.list = this.url.listId
            }
            ;if (typeof this.options_.listType !== 'undefined') {
                e.listType = this.options_.listType
            }
            ;if (typeof this.options_.modestbranding !== 'undefined') {
                e.modestbranding = this.options_.modestbranding
            }
            ;if (typeof this.options_.playlist !== 'undefined') {
                e.playlist = this.options_.playlist
            }
            ;if (typeof this.options_.playsinline !== 'undefined') {
                e.playsinline = this.options_.playsinline
            }
            ;if (typeof this.options_.rel !== 'undefined') {
                e.rel = this.options_.rel
            }
            ;if (typeof this.options_.showinfo !== 'undefined') {
                e.showinfo = this.options_.showinfo
            }
            ;if (typeof this.options_.start !== 'undefined') {
                e.start = this.options_.start
            }
            ;if (typeof this.options_.theme !== 'undefined') {
                e.theme = this.options_.theme
            }
            ;this.activeVideoId = this.url ? this.url.videoId : null;
            this.activeList = e.list;
            this.ytPlayer = new YT.Player(this.options_.techId,{
                videoId: this.activeVideoId,
                playerVars: e,
                events: {
                    onReady: this.onPlayerReady.bind(this),
                    onPlaybackQualityChange: this.onPlayerPlaybackQualityChange.bind(this),
                    onStateChange: this.onPlayerStateChange.bind(this),
                    onError: this.onPlayerError.bind(this)
                }
            })
        },
        onPlayerReady: function() {
            this.playerReady_ = !0;
            this.triggerReady();
            if (e.options.wasPreroll) {
                this.playOnReady = !0
            }
            ;if (this.playOnReady) {
                this.play()
            } else if (this.cueOnReady) {
                this.ytPlayer.cueVideoById(this.url.videoId);
                this.activeVideoId = this.url.videoId
            }
        },
        onPlayerPlaybackQualityChange: function() {},
        onPlayerStateChange: function(e) {
            var t = e.data;
            if (t === this.lastState || this.errorNumber) {
                return
            }
            ;this.lastState = t;
            switch (t) {
            case -1:
                this.trigger('loadstart');
                this.trigger('loadedmetadata');
                this.trigger('durationchange');
                break;
            case YT.PlayerState.ENDED:
                this.trigger('ended');
                break;
            case YT.PlayerState.PLAYING:
                jQuery('.vjs-iframe-blocker').css('background-color', 'transparent');
                this.trigger('timeupdate');
                this.trigger('durationchange');
                this.trigger('playing');
                this.trigger('play');
                var i = jQuery('.vjs-youtube').parent();
                jQuery(i).find('.ytspinner').addClass('vjs-hidden');
                this.ytplaying = !0;
                if (this.isSeeking) {
                    this.onSeeked()
                }
                ;break;
            case YT.PlayerState.PAUSED:
                this.trigger('canplay');
                if (this.isSeeking) {
                    this.onSeeked()
                } else {
                    this.trigger('pause')
                }
                ;break;
            case YT.PlayerState.BUFFERING:
                this.player_.trigger('timeupdate');
                this.player_.trigger('waiting');
                break
            }
        },
        onPlayerError: function(e) {
            this.errorNumber = e.data;
            this.trigger('error');
            this.ytPlayer.stopVideo();
            this.ytPlayer.destroy();
            this.ytPlayer = null
        },
        error: function() {
            switch (this.errorNumber) {
            case 5:
                return {
                    code: 'Error while trying to play the video'
                };
            case 2:
            case 100:
            case 150:
                return {
                    code: 'Unable to find the video'
                };
            case 101:
                return {
                    code: 'Playback on other Websites has been disabled by the video owner.'
                }
            }
            ;return {
                code: 'YouTube unknown error (' + this.errorNumber + ')'
            }
        },
        src: function(e) {
            if (e) {
                this.setSrc({
                    src: e
                })
            }
            ;return this.source
        },
        poster: function() {
            if (i) {
                return null
            }
            ;return this.poster_
        },
        setPoster: function(e) {
            this.poster_ = e
        },
        setSrc: function(e) {
            if (!e || !e.src) {
                return
            }
            ;delete this.errorNumber;
            this.source = e;
            this.url = t.parseUrl(e.src);
            if (!this.options_.poster) {
                if (this.url.videoId) {
                    this.poster_ = 'https://img.youtube.com/vi/' + this.url.videoId + '/0.jpg';
                    this.trigger('posterchange');
                    this.checkHighResPoster()
                }
            }
            ;if (this.options_.autoplay && !i) {
                if (this.isReady_) {
                    this.play()
                } else {
                    this.playOnReady = !0
                }
            } else if (this.activeVideoId !== this.url.videoId) {
                if (this.isReady_) {
                    this.ytPlayer.cueVideoById(this.url.videoId);
                    this.activeVideoId = this.url.videoId
                } else {
                    this.cueOnReady = !0
                }
            }
        },
        autoplay: function() {
            return this.options_.autoplay
        },
        setAutoplay: function(e) {
            this.options_.autoplay = e
        },
        loop: function() {
            return this.options_.loop
        },
        setLoop: function(e) {
            this.options_.loop = e
        },
        play: function() {
            if (this.ytplaying != !0) {
                var e = jQuery('.vjs-youtube').parent();
                jQuery(e).find('.ytspinner').removeClass('vjs-hidden');
                jQuery(e).find('.vjs-big-play-button').addClass('vjs-hidden');
                this.ytplaying = !0
            }
            ;if (!this.url || !this.url.videoId) {
                return
            }
            ;this.wasPausedBeforeSeek = !1;
            if (this.isReady_) {
                if (this.url.listId) {
                    if (this.activeList === this.url.listId) {
                        this.ytPlayer.playVideo()
                    } else {
                        this.ytPlayer.loadPlaylist(this.url.listId);
                        this.activeList = this.url.listId
                    }
                }
                ;if (this.activeVideoId === this.url.videoId) {
                    this.ytPlayer.playVideo()
                } else {
                    this.ytPlayer.loadVideoById(this.url.videoId);
                    this.activeVideoId = this.url.videoId
                }
            } else {
                this.trigger('waiting');
                this.playOnReady = !0
            }
        },
        pause: function() {
            if (this.ytPlayer) {
                this.ytPlayer.pauseVideo();
                var e = jQuery('.vjs-youtube').parent();
                jQuery(e).find('.vjs-big-play-button').removeClass('vjs-hidden')
            }
        },
        paused: function() {
            return (this.ytPlayer) ? (this.lastState !== YT.PlayerState.PLAYING && this.lastState !== YT.PlayerState.BUFFERING) : !0
        },
        currentTime: function() {
            return this.ytPlayer ? this.ytPlayer.getCurrentTime() : 0
        },
        setCurrentTime: function(e) {
            if (this.lastState === YT.PlayerState.PAUSED) {
                this.timeBeforeSeek = this.currentTime()
            }
            ;if (!this.isSeeking) {
                this.wasPausedBeforeSeek = this.paused()
            }
            ;this.ytPlayer.seekTo(e, !0);
            this.trigger('timeupdate');
            this.trigger('seeking');
            this.isSeeking = !0;
            if (this.lastState === YT.PlayerState.PAUSED && this.timeBeforeSeek !== e) {
                clearInterval(this.checkSeekedInPauseInterval);
                this.checkSeekedInPauseInterval = setInterval(function() {
                    if (this.lastState !== YT.PlayerState.PAUSED || !this.isSeeking) {
                        clearInterval(this.checkSeekedInPauseInterval)
                    } else if (this.currentTime() !== this.timeBeforeSeek) {
                        this.trigger('timeupdate');
                        this.onSeeked()
                    }
                }
                .bind(this), 250)
            }
        },
        seeking: function() {
            return this.isSeeking
        },
        seekable: function() {
            if (!this.ytPlayer || !this.ytPlayer.getVideoLoadedFraction) {
                return {
                    length: 0,
                    start: function() {
                        throw new Error('This TimeRanges object is empty')
                    },
                    end: function() {
                        throw new Error('This TimeRanges object is empty')
                    }
                }
            }
            ;var e = this.ytPlayer.getDuration();
            return {
                length: this.ytPlayer.getDuration(),
                start: function() {
                    return 0
                },
                end: function() {
                    return e
                }
            }
        },
        onSeeked: function() {
            clearInterval(this.checkSeekedInPauseInterval);
            this.isSeeking = !1;
            if (this.wasPausedBeforeSeek) {
                this.pause()
            }
            ;this.trigger('seeked')
        },
        playbackRate: function() {
            return this.ytPlayer ? this.ytPlayer.getPlaybackRate() : 1
        },
        setPlaybackRate: function(e) {
            if (!this.ytPlayer) {
                return
            }
            ;this.ytPlayer.setPlaybackRate(e);
            this.trigger('ratechange')
        },
        duration: function() {
            return this.ytPlayer ? this.ytPlayer.getDuration() : 0
        },
        currentSrc: function() {
            return this.source && this.source.src
        },
        ended: function() {
            return this.ytPlayer ? (this.lastState === YT.PlayerState.ENDED) : !1
        },
        volume: function() {
            return this.ytPlayer ? this.ytPlayer.getVolume() / 100.0 : 1
        },
        setVolume: function(e) {
            if (!this.ytPlayer) {
                return
            }
            ;this.ytPlayer.setVolume(e * 100.0);
            this.setTimeout(function() {
                this.trigger('volumechange')
            }, 50)
        },
        muted: function() {
            return this.ytPlayer ? this.ytPlayer.isMuted() : !1
        },
        setMuted: function(e) {
            if (!this.ytPlayer) {
                return
            } else {
                this.muted(!0)
            }
            ;if (e) {
                this.ytPlayer.mute()
            } else {
                this.ytPlayer.unMute()
            }
            ;this.setTimeout(function() {
                this.trigger('volumechange')
            }, 50)
        },
        buffered: function() {
            if (!this.ytPlayer || !this.ytPlayer.getVideoLoadedFraction) {
                return {
                    length: 0,
                    start: function() {
                        throw new Error('This TimeRanges object is empty')
                    },
                    end: function() {
                        throw new Error('This TimeRanges object is empty')
                    }
                }
            }
            ;var e = this.ytPlayer.getVideoLoadedFraction() * this.ytPlayer.getDuration();
            return {
                length: this.ytPlayer.getDuration(),
                start: function() {
                    return 0
                },
                end: function() {
                    return e
                }
            }
        },
        preload: function() {},
        load: function() {},
        reset: function() {},
        supportsFullScreen: function() {
            return !0
        },
        checkHighResPoster: function() {
            var i = 'https://img.youtube.com/vi/' + this.url.videoId + '/maxresdefault.jpg';
            try {
                var t = new Image();
                t.onload = function() {
                    if ('naturalHeight'in t) {
                        if (t.naturalHeight <= 90 || t.naturalWidth <= 120) {
                            return
                        }
                    } else if (t.height <= 90 || t.width <= 120) {
                        return
                    }
                    ;this.poster_ = i;
                    this.trigger('posterchange')
                }
                .bind(this);
                t.onerror = function() {}
                ;
                console.log(i);
                t.src = i
            } catch (e) {}
        }
    });
    t.isSupported = function() {
        return !0
    }
    ;
    t.canPlaySource = function(e) {
        return t.canPlayType(e.type)
    }
    ;
    t.canPlayType = function(e) {
        return (e === 'video/youtube')
    }
    ;
    var i = e.browser.IS_IOS || a();
    t.parseUrl = function(e) {
        var i = {
            videoId: null
        };
        var r = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
          , t = e.match(r);
        if (t && t[2].length === 11) {
            i.videoId = t[2]
        }
        ;var s = /[?&]list=([^#\&\?]+)/;
        t = e.match(s);
        if (t && t[1]) {
            i.listId = t[1]
        }
        ;return i
    }
    ;
    function o() {
        YT.ready(function() {
            t.isApiReady = !0;
            for (var e = 0; e < t.apiReadyQueue.length; ++e) {
                t.apiReadyQueue[e].initYTPlayer()
            }
        })
    }
    ;function l(e, t) {
        var i = !1
          , s = document.createElement('script')
          , r = document.getElementsByTagName('script')[0];
        r.parentNode.insertBefore(s, r);
        s.onload = function() {
            if (!i) {
                i = !0;
                t()
            }
        }
        ;
        s.onreadystatechange = function() {
            if (!i && (this.readyState === 'complete' || this.readyState === 'loaded')) {
                i = !0;
                t()
            }
        }
        ;
        s.src = e
    }
    ;function n() {
        var t = '.vjs-youtube .vjs-iframe-blocker { display: none; }.vjs-youtube.vjs-user-inactive .vjs-iframe-blocker { display: block; }.vjs-youtube .vjs-poster { background-size: cover; }.vjs-youtube-mobile .vjs-big-play-button { display: none; }'
          , i = document.head || document.getElementsByTagName('head')[0]
          , e = document.createElement('style');
        e.type = 'text/css';
        if (e.styleSheet) {
            e.styleSheet.cssText = t
        } else {
            e.appendChild(document.createTextNode(t))
        }
        ;i.appendChild(e)
    }
    ;function a() {
        var t = window.navigator.userAgent.match(/applewebkit\/(\d*).*Version\/(\d*.\d*)/i);
        return e.browser.IS_ANDROID && e.browser.ANDROID_VERSION < 5 && t && t[2] > 0
    }
    ;t.apiReadyQueue = [];
    if (typeof e.registerTech !== 'undefined') {
        e.registerTech('Youtube', t)
    } else {
        e.registerComponent('Youtube', t)
    }
    ;function r() {
        if (nuevo_yt != !0) {
            setTimeout(r, 100)
        } else {
            o()
        }
    }
    ;r();
    n()
}));
