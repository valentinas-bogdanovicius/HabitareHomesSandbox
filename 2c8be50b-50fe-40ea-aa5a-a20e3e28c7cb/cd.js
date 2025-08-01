// 2.96.0 - 2025-07-17T11:28:43.441Z
(void 0 === window.CookieControl && (window.CookieControl = {}),
  (window.CookieControl.CookieDeclaration = function () {
    ((this.scriptId = "CookieDeclaration"),
      (this.scriptElement = null),
      (this.isInternalAlias = !1),
      (this.geoRegions = []),
      (this.culture = "en"),
      (this.userCulture = "en-GB"),
      (this.lastUpdatedDate = null),
      (this.init = function () {
        var requestParam = "",
          d = document.getElementById(this.scriptId);
        function getCookiebotDeclarationJumpUrl(script) {
          var scriptSrcParts = script.src.split("/"),
            baseUrl = scriptSrcParts
              .slice(0, scriptSrcParts.length - 1)
              .join("/");
          return baseUrl + "/cdreport.js";
        }
        if (
          !(
            (d && "script" === d.tagName.toLowerCase()) ||
            ((this.scriptId = "CookiePolicy"),
            (d = document.getElementById(this.scriptId)),
            d && "script" === d.tagName.toLowerCase())
          )
        ) {
          for (
            var tagsAll = document.getElementsByTagName("script"), i = 0;
            i < tagsAll.length;
            i++
          ) {
            var currentTag = tagsAll[i],
              currentTagSrc =
                currentTag.hasAttribute("src") &&
                currentTag.getAttribute("src").toLowerCase();
            if (
              currentTagSrc &&
              currentTagSrc.match(
                new RegExp(
                  ".+cookiebot.+/[0-9A-Fa-f]{8}(?:-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}/cd.js",
                ),
              )
            ) {
              d = currentTag;
              break;
            }
          }
          if (d) {
            var scriptSrc = d.hasAttribute("src")
              ? d.getAttribute("src").toLowerCase()
              : "";
            scriptSrc.indexOf("consent.cookiebot.com") > 0 ||
            scriptSrc.indexOf("consent.cookiebot.eu") > 0
              ? ((this.scriptId = "CookieDeclaration"),
                (d.id = "CookieDeclaration"))
              : (d.id = "CookiePolicy");
          } else {
            var supportUrl = "https://www.cookiebot.com/en/help/";
            console.warn(
              "Cookiebot: Cookiebot was unable to reference the cd.js script, which should be declared with an ID attribute set to 'CookieDeclaration'. For more information about Cookiebot setup, see %s",
              supportUrl,
            );
          }
        }
        if (((window.CookiebotCookieDeclaration = this), d)) {
          var cookiedeclarationjumpURL = getCookiebotDeclarationJumpUrl(d);
          ((this.scriptElement = d),
            (requestParam =
              "?referer=" + encodeURIComponent(window.location.hostname)));
          var h = d.getAttribute("data-culture"),
            hx = this.getURLParam("culture");
          (hx && (h = hx),
            h &&
              ((requestParam = requestParam + "&culture=" + h),
              (this.culture = h)));
          var p = d.getAttribute("data-path"),
            px = this.getURLParam("path");
          (px && (p = px),
            p &&
              (requestParam = requestParam + "&path=" + encodeURIComponent(p)));
          var pg = d.getAttribute("data-georegions"),
            pfy = this.getURLParam("georegions");
          (pfy && (pg = pfy),
            pg &&
              (this.registerGeoRegions(pg),
              this.geoRegions.length > 0 &&
                (requestParam =
                  requestParam +
                  "&georegions=" +
                  encodeURIComponent(JSON.stringify(this.geoRegions)))));
          var u = d.getAttribute("data-user-country"),
            ux = this.getURLParam("user_country");
          (ux && (u = ux),
            u && (requestParam = requestParam + "&user_country=" + u),
            this.getScript(cookiedeclarationjumpURL + requestParam, !0));
        } else
          setTimeout(function () {
            window.CookieDeclaration.init();
          }, 100);
      }),
      (this.getScript = function (url, async) {
        var h = document.getElementsByTagName("script")[0],
          s = document.createElement("script");
        ((s.type = "text/javascript"),
          (s.charset = "UTF-8"),
          (s.async = void 0 === async || async),
          (s.src = url),
          h.parentNode.insertBefore(s, h));
      }),
      (this.checkConsentStatusPanel = function () {
        if (void 0 === window.CookieConsent) {
          var d = document.getElementById("CookieDeclarationUserStatusPanel");
          d && (d.style.display = "none");
        } else this.SetUserStatusLabel();
      }),
      (this.SetUserStatusLabel = function () {
        var ShowCookieDeclarationUserStatusPanel = !0;
        if (
          void 0 === window.CookieConsent ||
          "-1" === window.CookieConsent.consentID ||
          window.CookieConsent.isOutsideEU
        )
          ShowCookieDeclarationUserStatusPanel = !1;
        else {
          var pathAccepted = !0;
          if (window.CookieConsent.pathlist.length > 0) {
            pathAccepted = !1;
            for (var h = 0; h < window.CookieConsent.pathlist.length; h++)
              if (
                0 ===
                window.location.pathname
                  .toLowerCase()
                  .indexOf(window.CookieConsent.pathlist[h].toLowerCase())
              ) {
                pathAccepted = !0;
                break;
              }
          }
          if (pathAccepted) {
            var statusLabelOn = document.getElementById(
                "CookieDeclarationUserStatusLabelOn",
              ),
              statusLabelOff = document.getElementById(
                "CookieDeclarationUserStatusLabelOff",
              ),
              statusLabelMulti = document.getElementById(
                "CookieDeclarationUserStatusLabelMulti",
              ),
              statusLabelConsentId = document.getElementById(
                "CookieDeclarationUserStatusLabelConsentId",
              ),
              statusLabelConsentDate = document.getElementById(
                "CookieDeclarationUserStatusLabelConsentDate",
              ),
              declarationChangeConsent = document.getElementById(
                "CookieDeclarationChangeConsent",
              ),
              declarationDoNotSell = document.getElementById(
                "CookieDeclarationDoNotSell",
              ),
              statusLabelDoNotSell = document.getElementById(
                "CookieDeclarationUserStatusLabelOffDoNotSell",
              ),
              consentIdAndLabel = document.getElementById(
                "CookieDeclarationConsentIdAndDate",
              );
            if (null != statusLabelOn && null != statusLabelOff) {
              var f = document.getElementById(
                "CookieDeclarationUserStatusPanel",
              );
              if (
                (f &&
                  f.hasAttribute("data-responseMode") &&
                  (window.CookieConsent.responseMode =
                    f.getAttribute("data-responseMode")),
                "0" !== window.CookieConsent.consentID &&
                  null != consentIdAndLabel &&
                  (consentIdAndLabel.style.display = "block"),
                null != statusLabelConsentId &&
                  (statusLabelConsentId.innerHTML = this.htmlEncode(
                    window.CookieConsent.consentID,
                  )),
                null != statusLabelConsentDate &&
                  null != window.CookieConsent.consentUTC)
              ) {
                var options = {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZoneName: "short",
                };
                try {
                  statusLabelConsentDate.innerHTML =
                    window.CookieConsent.consentUTC.toLocaleString(
                      this.culture,
                      options,
                    );
                } catch (e) {
                  statusLabelConsentDate.innerHTML =
                    window.CookieConsent.consentUTC.toLocaleString(
                      "EN",
                      options,
                    );
                }
              }
              var isDoNotSell =
                "optionaloptin" === window.CookieConsent.responseMode;
              if (
                "leveloptin" === window.CookieConsent.responseMode ||
                "inlineoptin" === window.CookieConsent.responseMode ||
                isDoNotSell
              )
                if (
                  !1 === window.CookieConsent.consent.preferences &&
                  !1 === window.CookieConsent.consent.statistics &&
                  !1 === window.CookieConsent.consent.marketing
                )
                  ((statusLabelOn.style.display = "none"),
                    isDoNotSell
                      ? (this.SetPropertyVisible(statusLabelDoNotSell, "block"),
                        (statusLabelOff.style.display = "none"),
                        (statusLabelMulti.style.display = "none"))
                      : ((statusLabelOff.style.display = "block"),
                        (statusLabelMulti.style.display = "none"),
                        this.SetPropertyVisible(statusLabelDoNotSell, "none")),
                    isDoNotSell &&
                      "0" !== window.CookieConsent.consentID &&
                      ((statusLabelOff.style.display = "none"),
                      this.SetPropertyVisible(statusLabelDoNotSell, "block"),
                      this.SetPropertyVisible(
                        declarationChangeConsent,
                        "block",
                      ),
                      this.SetPropertyVisible(declarationDoNotSell, "none")));
                else {
                  ((statusLabelOn.style.display = "none"),
                    (statusLabelOff.style.display = "none"),
                    !0 === window.CookieConsent.consent.preferences &&
                    !0 === window.CookieConsent.consent.statistics &&
                    !0 === window.CookieConsent.consent.marketing
                      ? ((statusLabelMulti.style.display = "none"),
                        (statusLabelOn.style.display = "inline-block"))
                      : ((statusLabelOn.style.display = "none"),
                        (statusLabelMulti.style.display = "inline-block")),
                    isDoNotSell &&
                      "0" !== window.CookieConsent.consentID &&
                      (this.SetPropertyVisible(statusLabelDoNotSell, "none"),
                      this.SetPropertyVisible(declarationChangeConsent, "none"),
                      this.SetPropertyVisible(declarationDoNotSell, "block")));
                  var multiPrefLabel = document.getElementById(
                    "CookieDeclarationUserStatusLabelMultiSettingsPref",
                  );
                  window.CookieConsent.consent.preferences
                    ? (multiPrefLabel.style.display = "inline")
                    : (multiPrefLabel.style.display = "none");
                  var multiStatLabel = document.getElementById(
                    "CookieDeclarationUserStatusLabelMultiSettingsStat",
                  );
                  window.CookieConsent.consent.statistics
                    ? (multiStatLabel.style.display = "inline")
                    : (multiStatLabel.style.display = "none");
                  var multiMarkLabel = document.getElementById(
                    "CookieDeclarationUserStatusLabelMultiSettingsMark",
                  );
                  window.CookieConsent.consent.marketing
                    ? (multiMarkLabel.style.display = "inline")
                    : (multiMarkLabel.style.display = "none");
                }
              else
                ((statusLabelMulti.style.display = "none"),
                  window.CookieConsent.consented
                    ? ((statusLabelOn.style.display = "inline-block"),
                      (statusLabelOff.style.display = "none"))
                    : ((statusLabelOn.style.display = "none"),
                      (statusLabelOff.style.display = "inline-block")));
            }
          } else ShowCookieDeclarationUserStatusPanel = !1;
        }
        if (ShowCookieDeclarationUserStatusPanel) {
          var d = document.getElementById("CookieDeclarationUserStatusPanel");
          if (d) {
            d.style.display = "block";
            var statusLabelWithdraw = document.getElementById(
              "CookieDeclarationUserStatusLabelWithdraw",
            );
            (window.CookieConsent.consent.preferences ||
              window.CookieConsent.consent.statistics ||
              window.CookieConsent.consent.marketing) &&
            window.CookieConsent.consented
              ? (statusLabelWithdraw.style.display = "inline-block")
              : (statusLabelWithdraw.style.display = "none");
          }
        }
      }),
      (this.SetPropertyVisible = function (property, value) {
        null != property && (property.style.display = value);
      }),
      (this.InjectCookieDeclaration = function (declarationContent) {
        var CookieDeclarationContainer = document.createElement("div");
        if (
          void 0 !== this.userCulture &&
          null != this.userCulture &&
          void 0 !== this.lastUpdatedDate &&
          null != this.lastUpdatedDate
        ) {
          var options = { timeZone: "UTC", dateStyle: "short" },
            localizedDateLabel = "",
            updateDateObject = new Date(this.lastUpdatedDate);
          try {
            localizedDateLabel = updateDateObject.toLocaleDateString(
              this.userCulture,
              options,
            );
          } catch (e) {
            localizedDateLabel = updateDateObject.toLocaleDateString(
              "en-GB",
              options,
            );
          }
          declarationContent = declarationContent.replace(
            /\[#LOCALIZED_CRAWLDATE#\]/g,
            localizedDateLabel,
          );
        }
        CookieDeclarationContainer.innerHTML = declarationContent;
        var d = document.getElementById(this.scriptId);
        d || (d = this.scriptElement);
        var insertedContainer = d.parentNode.insertBefore(
          CookieDeclarationContainer,
          d,
        );
        if (this.isInternalAlias) {
          var elChild = document.createElement("div");
          ((elChild.innerHTML = "TEST"),
            (elChild.style.position = "relative"),
            (elChild.style.fontSize = "200px"),
            (elChild.style.opacity = "0.25"),
            (elChild.style.fontWeight = "bold"),
            (elChild.style.overflow = "visible"),
            (elChild.style.pointerEvents = "none"),
            (elChild.style.height = "0"),
            (elChild.style.width = "0"),
            (elChild.style.right = "0"),
            insertedContainer.insertBefore(
              elChild,
              insertedContainer.firstChild,
            ));
        }
        (this.checkConsentStatusPanel(),
          this.handleClickById(
            "CookieDeclarationChangeConsentChange",
            function (e) {
              (e.preventDefault(),
                setTimeout(function () {
                  window.CookieConsent.renew();
                }, 0),
                window.CookieDeclaration.SetUserStatusLabel());
            },
          ),
          this.handleClickById(
            "CookieDeclarationChangeConsentWithdraw",
            function (e) {
              (e.preventDefault(),
                setTimeout(function () {
                  window.CookieConsent.withdraw();
                }, 0),
                window.CookieDeclaration.SetUserStatusLabel());
            },
          ),
          this.handleClickById(
            "CookieDeclarationChangeConsentDoNotSell",
            function (e) {
              (e.preventDefault(),
                setTimeout(function () {
                  window.CookieConsent.withdraw();
                }, 0),
                window.CookieDeclaration.SetUserStatusLabel());
            },
          ),
          "function" == typeof window.CookiebotCallback_OnDialogLoad &&
            window.CookiebotCallback_OnDialogLoad());
      }),
      (this.getURLParam = function (paramName) {
        var d = document.getElementById(this.scriptId) || this.scriptElement,
          urlParam = "";
        return (
          d &&
            ((paramName = new RegExp(
              "[?&]" + encodeURIComponent(paramName) + "=([^&#]*)",
            ).exec(d.src)),
            paramName &&
              (urlParam = decodeURIComponent(
                paramName[1].replace(/\+/g, " "),
              ))),
          urlParam
        );
      }),
      (this.handleClickById = function (id, handler) {
        var el = document.getElementById(id);
        if (el) {
          var elHref = el.getAttribute("href");
          if (elHref) {
            var substring = "javascript:";
            0 !== elHref.toLowerCase().indexOf(substring) &&
              el.addEventListener("click", function (e) {
                (e.preventDefault(), handler(e));
              });
          }
        }
      }),
      (this.registerGeoRegions = function (geodata) {
        if (
          this.geoRegions &&
          0 === this.geoRegions.length &&
          geodata &&
          geodata.length > 0
        ) {
          var JSONversion = '{"configs": [' + geodata.replace(/'/g, '"') + "]}";
          try {
            var jsonArray = JSON.parse(JSONversion);
            if (jsonArray.configs)
              for (var i = 0; i < jsonArray.configs.length; i++)
                jsonArray.configs[i].region &&
                  jsonArray.configs[i].cbid &&
                  this.geoRegions.push({
                    r: jsonArray.configs[i].region,
                    i: jsonArray.configs[i].cbid,
                  });
          } catch (e) {
            console.warn(
              "ERROR IN GEO-REGIONS ATTRIBUTE VALUE ON COOKIE DECLARATION TAG - NOT A VALID JSON ARRAY: " +
                geodata,
            );
          }
        }
      }),
      (this.htmlEncode = function (str) {
        return String(str).replace(/[^\w. ]/gi, function (c) {
          return "&#" + c.charCodeAt(0) + ";";
        });
      }),
      this.init());
  }),
  (window.CookiePolicy = window.CookieDeclaration =
    new window.CookieControl.CookieDeclaration()));
