$(function () {
  function LifeRTP(prov, arr_data, arr_rand) {
    const zeroPad = (num, places) => String(num).padStart(places, "0");
    const toInt = (s) => (isNaN(parseInt(s)) ? 0 : parseInt(s));
    for (let i = 0; i < arr_data.length; i++) {
      j = document.querySelectorAll("img[data-pos]")[i];
      const d = new Date();
      var date = d.getUTCDate(),
        day = d.getUTCDay() + 1,
        year = d.getUTCFullYear(),
        month = d.getUTCMonth() + 1,
        hour = d.getUTCHours(),
        mon = d.getMinutes(),
        min = d.getMinutes();
      min = min < 30 ? 1 : 2;
      if (typeof j !== "undefined") {
        var k = j.getAttribute("data-pos");
        var xx = day + year * month * date;
        xx = Math.pow(xx, hour * min);
        xx = xx * arr_data[i];
        if (arr_rand.some((item) => item == k)) {
          xx = xx % 27;
          xx += 65;
        } else {
          xx = xx % 83;
          xx += 8;
        }
        var random1 = [
          "<i class='fa-solid fa-check fa-lg fa-fw text-success'></i><i class='fa-solid fa-xmark fa-lg fa-fw text-danger'></i><i class='fa-solid fa-xmark fa-lg fa-fw text-danger'></i>",
          "<i class='fa-solid fa-xmark fa-lg fa-fw text-danger'></i><i class='fa-solid fa-check fa-lg fa-fw text-success'></i><i class='fa-solid fa-xmark fa-lg fa-fw text-danger'></i>",
          "<i class='fa-solid fa-xmark fa-lg fa-fw text-danger'></i><i class='fa-solid fa-xmark fa-lg fa-fw text-danger'></i><i class='fa-solid fa-check fa-lg fa-fw text-success'></i>",
          "<i class='fa-solid fa-check fa-lg fa-fw text-success'></i><i class='fa-solid fa-xmark fa-lg fa-fw text-danger'></i><i class='fa-solid fa-check fa-lg fa-fw text-success'></i>",
          "<i class='fa-solid fa-check fa-lg fa-fw text-success'></i><i class='fa-solid fa-check fa-lg fa-fw text-success'></i><i class='fa-solid fa-xmark fa-lg fa-fw text-danger'></i>",
          "<i class='fa-solid fa-xmark fa-lg fa-fw text-danger'></i><i class='fa-solid fa-xmark fa-lg fa-fw text-danger'></i><i class='fa-solid fa-xmark fa-lg fa-fw text-danger'></i>",
          "<i class='fa-solid fa-xmark fa-lg fa-fw text-danger'></i><i class='fa-solid fa-check fa-lg fa-fw text-success'></i><i class='fa-solid fa-check fa-lg fa-fw text-success'></i>"
        ];
        var random2 = [10, 20, 30, 50, 70, 100];
        var random3 = [
          "Auto",
          "Auto",
          "Manual 3",
          "Manual 5",
          "Manual 7",
          "Manual 9",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "Auto",
          "Auto"
        ];
        var jams = document.getElementById(prov + "-info-jam-" + k);
        var bars = document.getElementById(prov + "-progress-bar-" + k),
          txts = document.getElementById(prov + "-progress-txt-" + k);
        var pola = [
          document.getElementById(prov + "-pola1-" + k),
          document.getElementById(prov + "-pola2-" + k),
          document.getElementById(prov + "-pola3-" + k)
        ];
        txts.innerHTML = xx + "%";
        bars.setAttribute("aria-valuenow", xx);
        bars.style.width = xx + "%";
        if (xx < 30) {
          bars.classList.remove("green", "yellow");
          bars.classList.add("red");
        } else if (xx > 70) {
          bars.classList.remove("red", "yellow");
          bars.classList.add("green");
        } else {
          bars.classList.remove("green", "red");
          bars.classList.add("yellow");
        }
        var target = xx % 4;
        if (xx >= 30) {
          target += xx > 70 ? target % 2 : 2;
          var n1 = i % 6,
            p1 = [
              (toInt(k[n1]) + xx) % 6,
              (toInt(k[n1 * 2]) + xx) % 6,
              (toInt(k[n1 * 3]) + xx) % 6
            ];
          var n2 = i % 5,
            p2 = [
              (toInt(k[n2 * 4]) + xx) % 4,
              (toInt(k[n2 * 5]) + xx) % 5,
              (toInt(k[n2 * 6]) + xx) % 5
            ];
          for (let m = 0; m <= 2; m++) {
            for (let jj = 0; jj <= 2; jj++) {
              if (p1[m] == p1[jj] && m != jj) {
                p1[jj] = (p1[jj] + 1) % 6;
              }
            }
          }
          var p3 = [
            Math.pow(p1[0], p2[0]) % 12,
            Math.pow(p1[1], p2[1]) % 12,
            Math.pow(p1[2], p2[2]) % 12
          ];
          for (let m = 0; m < 3; m++) {
            if (random3[p3[m]] == "Auto") {
              pola[m].innerHTML =
                random2[p2[m]] + " " + random1[p2[m]] + " " + random3[p3[m]];
            } else {
              pola[m].innerHTML = random3[p3[m]] + " " + random1[p1[m]];
            }
          }
        } else {
          target += 3;
          pola[0].innerHTML =
            "Pola tidak tersedia!<br/>Tidak disarankan bermain di game ini";
          pola[1].remove();
          pola[2].remove();
        }
        var hour2 = (hour + 7) % 24;
        var randomTarget = zeroPad((hour2 + target) % 24, 2);
        var min1 = zeroPad(xx % 60, 2);
        var min2 = zeroPad((xx * date) % 60, 2);
        hour2 = zeroPad(hour2, 2);
        jams.innerHTML = hour2 + ":" + min1 + " - " + randomTarget + ":" + min2;
      }
    }
  }
  var ambilData = function (a, objData, func) {
    var result = "",
      type = objData == null ? "GET" : "POST";
    ajaxLoader.init();
    ajaxLoader.display();
    jQuery
      .ajax({
        url: a,
        type: type,
        data: objData,
        dataType: "html",
        cache: false,
        success: function (response, textStatus, xhr) {
          if (xhr.status == 200) {
            result = response;
          } else {
            alert(textStatus);
          }
        }
      })
      .done(function () {
        func(result);
      });
  };
  const Loadeer = (function () {
    "use strict";
    function c({ dataset: t }) {
      return !["src", "srcset"].some((e) => e in t);
    }
    function g(t) {
      return (e, s) => {
        var o;
        for (const i of e) {
          if (!i.isIntersecting) continue;
          const r = i.target;
          s.unobserve(r),
            !c(r) &&
              (f(r, t),
              (o = t == null ? void 0 : t.onLoaded) == null || o.call(t, r));
        }
      };
    }
    const a = "loading" in HTMLImageElement.prototype,
      h =
        !("onscroll" in window) ||
        /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent);
    function L(t, e = document) {
      return typeof t == "string"
        ? [...e.querySelectorAll(t)]
        : t instanceof Element
        ? [t]
        : [...t];
    }
    function f(t, e) {
      const { useNativeLoading: s = !1 } = e,
        { dataset: o } = t,
        { src: i, srcset: r, sizes: n, poster: l } = o;
      i && ((t.src = i), delete o.src),
        t instanceof HTMLVideoElement
          ? l && ((t.poster = l), delete o.poster)
          : (t instanceof HTMLImageElement &&
              s &&
              a &&
              t.loading !== "lazy" &&
              (t.loading = "lazy"),
            r &&
              ((t.srcset = r),
              delete o.srcset,
              n && (t.sizes = n === "auto" ? `${t.offsetWidth}px` : n)));
    }
    class d {
      constructor(e = "[data-lazyload]", s = {}) {
        (this.selector = e), (this.options = s);
        const {
          root: o,
          rootMargin: i,
          threshold: r,
          useNativeLoading: n = !1
        } = this.options;
        (!n || !a) &&
          (this.observer = new IntersectionObserver(g(this.options), {
            root: o,
            rootMargin: i,
            threshold: r
          }));
      }
      observe() {
        var r;
        const { root: e, onLoaded: s, useNativeLoading: o } = this.options,
          i = L(this.selector, e);
        for (const n of i)
          c(n) ||
            ((o && a) || h
              ? (f(n, this.options), s == null || s(n))
              : (r = this.observer) == null || r.observe(n));
      }
      triggerLoad(e) {
        var s, o;
        c(e) ||
          (f(e, this.options),
          (o = (s = this.options) == null ? void 0 : s.onLoaded) == null ||
            o.call(s, e));
      }
    }
    let u;
    return (
      (u = document.currentScript) &&
        u.hasAttribute("init") &&
        new d().observe(),
      d
    );
  })();
  var ajaxLoader = {
    init: function () {
      var tampil =
        '<div class="loading-overlay"><img src="' +
        HostURL +
        'images/loader.svg" class="loading-overlay-img"/></div>';
      jQuery("body").append(tampil);
    },
    display: function () {
      jQuery.ajaxSetup({
        beforeSend: function (xhr) {
          jQuery(".loading-overlay").show();
        },
        complete: function (xhr) {
          jQuery(".loading-overlay").remove();
        }
      });
    }
  };
  var countDown = function (a, b) {
    var cDD = new Date(a);
    var x = setInterval(function () {
      var now = new Date().getTime();
      var distance = Date.parse(cDD) - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
        .toString()
        .padStart(2, "0");
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        .toString()
        .padStart(2, "0");
      var seconds = Math.floor((distance % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");
      document.getElementById(b).innerHTML =
        "<span class='badge bg-success font-weight-normal'>" +
        days +
        " hari, " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds +
        "</span>";
      if (distance < 0) {
        clearInterval(x);
        document.getElementById(b).innerHTML =
          "<span class='badge bg-secondary font-weight-normal'>EXPIRED</span>";
      }
    }, 1000);
  };
  var pageContents = {
    gmfr: jQuery(".game-group-front"),
    gmarket: jQuery("#listMarket"),
    Homes: function () {
      pageContents.gmfr.find("a").on("click", function () {
        var _this = jQuery(this);
        var provid = _this.data("provid");
        ambilData(HostURL + "api?provider=" + provid, null, function (respons) {
          var output = JSON.parse(respons),
            hasil = "",
            domGid = "",
            arrGid = "",
            arrRtp = "";
          if (output.error == false) {
            jQuery(output.data).each(function (k, v) {
              if (v.games.length > 0) {
                const arrayColumn = (arr, n) => arr.map((x) => x[n]);
                domGid = "prov" + v.id;
                arrGid = arrayColumn(v.games, "id");
                arrRtp = v.rtp;
                hasil +=
                  '<div class="row mt-3"><div class="col-md-6 text-center text-md-left align-middle"><h2 class="animate__animated animate__bounce animate__repeat-3 text-uppercase text-warning">' +
                  v.nama +
                  "</h2></div>";
                hasil +=
                  '<div class="col-md-6 mb-3 text-center text-md-right align-middle">' +
                  '<div class="search-box">' +
                  '<input type="search" class="search form-control" placeholder="Cari permainan..."/>' +
                  '<div class="search-btn"><i id="btactive" class="fas fa-search"></i></div>' +
                  "</div>" +
                  "</div></div>";
                hasil +=
                  '<div role="tabpanel" class="tab-pane active show" id="prov' +
                  v.id +
                  '"><div class="row list px-2 pb-2">';
                jQuery(v.games).each(function (kk, vv) {
                  var hots = vv.hot == true ? '<div class="hot"></div>' : "",
                    tops = vv.top == true ? '<div class="top"></div>' : "";
                  hasil +=
                    '<div class="col-4 col-lg-3 p-1" data-id="' +
                    (kk + 1) +
                    '">' +
                    '<div class="card card-game shadow animate__animated animate__bounceIn border-0 px-1 py-1" data-namagames="' +
                    vv.nama +
                    '">' +
                    '<div class="card-body bg-transparent px-0 py-0" data-toggle="modal" data-target="#exampleModal" href="#">' +
                    '<div class="hover-btn"><a class="play-btn" data-toggle="modal" data-target="#exampleModal" href="#">PLAY</a></div>' +
                    '<div class="subscript">' +
                    hots +
                    "" +
                    tops +
                    "</div>" +
                    '<img loading="lazy" class="card-img-top border-0 h-100" src="' +
                    HostURL +
                    'images/loader.svg" data-lazyload data-src="' +
                    vv.gambar +
                    '" alt="' +
                    vv.nama +
                    " - " +
                    websiteName +
                    '" data-pos="' +
                    vv.id +
                    '"/>' +
                    "</div>" +
                    '<div class="card-footer d-flex align-items-end bg-transparent border-0 px-0 px-md-1 pb-0 pb-md-2 pt-1">' +
                    '<div class="row no-gutters w-100">' +
                    '<div class="col-12 text-center text-truncate font-weight-ligh mb-2">' +
                    vv.nama +
                    "</div>" +
                    '<div class="col-12">' +
                    '<div class="progress">' +
                    '<div id="prov' +
                    v.id +
                    "-progress-bar-" +
                    vv.id +
                    '" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" style="width: 0%"></div><p id="prov' +
                    v.id +
                    "-progress-txt-" +
                    vv.id +
                    '">0%</p>' +
                    "</div>" +
                    '<div id="jamgacor" class="d-block badge bg-dark rounded-pill font-weight-light mt-1 mt-md-2 mb-0"><i class="fa-solid fa-clock fa-fw"></i> <span id="prov' +
                    v.id +
                    "-info-jam-" +
                    vv.id +
                    '"></span></div>' +
                    '<div id="xpola" class="d-block bg-dark rounded p-1 mt-1 mt-md-1 mb-0 text-center">' +
                    '<span id="prov' +
                    v.id +
                    "-pola1-" +
                    vv.id +
                    '"></span>' +
                    '<span id="prov' +
                    v.id +
                    "-pola2-" +
                    vv.id +
                    '"></span>' +
                    '<span id="prov' +
                    v.id +
                    "-pola3-" +
                    vv.id +
                    '"></span>' +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                });
              } else {
                hasil +=
                  '<div class="alert alert-danger" role="alert">Belum ada data!</div>';
              }
            });
            hasil += "</div></div>";
          } else {
            hasil +=
              '<div class="alert alert-danger" role="alert">Tidak ada data!</div>';
          }
          jQuery("#listGames").html(hasil);
          LifeRTP(domGid, arrGid, arrRtp);
          const loadeer = new Loadeer();
          loadeer.observe();
          // Search button
          try {
            var GameList = new List("listGames", {
              valueNames: [
                { data: ["id"] },
                { name: "card-game", attr: "data-namagames" }
              ]
            });
            try {
              var searchBox = $("#listGames").find(".search-box");
              searchBox.find("#btactive").on("click", function () {
                jQuery(this).toggleClass("fa-search fa-times");
                var type = $(this).hasClass("fa-search") ? "active" : "";
                if (type == "active") {
                  searchBox.removeClass("active");
                  searchBox.find("input").val("");
                  GameList.search();
                } else {
                  searchBox.addClass("active");
                }
              });
            } catch (err) {}
          } catch (err) {
            jQuery("body div.loading-overlay").remove();
            jQuery("#listGames").html(
              '<div class="alert alert-danger" role="alert">Tidak ada data!</div>'
            );
          }
        });
        var target = _this.attr("href");
        // Remove active show
        jQuery(".game-group-front a.active").removeClass("active");
        // Add active show
        _this.addClass("active");
        $(".provider-group .tab-pane.active.show").removeClass("active show");
        $(target).addClass("active show");
      });
    },
    Promosi: function () {
      pageContents.gmfr.find("a").on("click", function () {
        var _this = $(this);
        var provid = _this.data("provid");
        ambilData(
          HostURL + "api?provider=" + provid + "&type=promo",
          null,
          function (respons) {
            var output = JSON.parse(respons),
              hasil = "",
              nmProv = "";
            if (output.error == false) {
              var subDt = output.data[0];
              var lPromo = subDt.promosi;
              hasil +=
                '<h2 class="text-center animate__animated animate__bounce animate__repeat-3 mb-3 text-uppercase">' +
                subDt.nama +
                "</h2>";
              if (Array.isArray(lPromo)) {
                hasil +=
                  '<div role="tabpanel" class="tab-pane active show" id="prov' +
                  subDt.id +
                  '">';
                jQuery(lPromo).each(function (k, v) {
                  var expdt = new Date().getTime();
                  countDown(v.date_expired, "promo" + v.id);
                  countDown(v.date_expired, "promoin" + v.id);
                  hasil +=
                    '<div class="card mb-2 border-0 bg-dark">' +
                    '<div class="d-none d-sm-block position-absolute" id="promo' +
                    v.id +
                    '" style="z-index:9; right:0; margin:5px 10px 0px 0px; font-size:3vh;"></div>' +
                    '<img loading="lazy" class="card-img-top mx-auto rounded" src="' +
                    HostURL +
                    'images/loader_provider.svg" data-lazyload data-src="' +
                    v.banner +
                    '" id="Heading' +
                    v.id +
                    '" alt="" data-toggle="collapse" data-target="#collapse' +
                    v.id +
                    '" aria-expanded="true" aria-controls="collapse' +
                    v.id +
                    '" style="max-height:220px; z-index:1 !important;"/>' +
                    '<div id="collapse' +
                    v.id +
                    '" class="collapse" aria-labelledby="Heading' +
                    v.id +
                    '" data-parent="#listPromo">' +
                    '<div class="card-body m-0">' +
                    '<h4 class="card-title">' +
                    v.title +
                    "</h4>" +
                    '<div class="card-text" style="line-height:2; font-size:14px;">' +
                    v.content +
                    "</div>" +
                    (expdt > Date.parse(v.date_expired)
                      ? '<div class="mt-3"><i class="fa-solid fa-face-sad-tear fa-fw text-white"></i> <span id="promoin' +
                        v.id +
                        '" class="text-light"></span></div>'
                      : '<div class="d-inline-block d-sm-none mt-3 text-warning"><i class="fa-solid fa-stopwatch-20 fa-fw"></i>Berlaku sampai: <span id="promoin' +
                        v.id +
                        '" class="text-light"></span>') +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                });
                hasil += "</div>";
              } else {
                hasil +=
                  '<div class="alert alert-danger" role="alert">Tidak ada data!</div>';
              }
            } else {
              hasil +=
                '<div class="alert alert-danger" role="alert">Tidak ada data!</div>';
            }
            jQuery("#listPromo").html(hasil);
            const loadeer = new Loadeer();
            loadeer.observe();
          }
        );
        var target = _this.attr("href");
        // Remove active show
        jQuery(".game-group-front a.active").removeClass("active");
        // Add active show
        _this.addClass("active");
        jQuery(".provider-group .tab-pane.active.show").removeClass(
          "active show"
        );
        jQuery(target).addClass("active show");
      });
    }
  };
  jQuery(this).scrollTop(0);
  jQuery(".game-group-front a:eq(0)").addClass("active");
  jQuery(function () {
    jQuery(".game-group-front a:eq(0)").click();
  });
  jQuery("ul.navbar-grid li a").on("click", function () {
    jQuery("ul.navbar-grid li a").removeClass("active");
    jQuery(this).addClass("active");
  });
  jQuery(".game-group-front").owlCarousel({
    loop: false,
    dots: false,
    responsiveClass: true,
    autoplay: false,
    nav: true,
    responsive: {
      0: { items: 1 },
      300: { items: 2 },
      400: { items: 3 },
      600: { items: 3 },
      900: { items: 4 }
    }
  });
  jQuery("#exampleModal").on("show.bs.modal", function (e) {
    var btclass = [
      "success",
      "danger",
      "warning",
      "primary",
      "info",
      "secondary"
    ];
    jQuery(this)
      .find("#partner_link a")
      .each(function (ib, vb) {
        var idClass = Math.floor(Math.random() * btclass.length);
        jQuery(this)
          .removeClass()
          .addClass("btn btn-block rounded-pill btn-" + btclass[idClass]);
      });
  });
  const loadeer = new Loadeer();
  loadeer.observe();
  var pghomes = $("body").find("#listGames"),
    pgpromo = $("body").find("#listPromo");
  if (pghomes.length > 0) {
    pageContents.Homes();
  }
  if (pgpromo.length > 0) {
    pageContents.Promosi();
  }
});
