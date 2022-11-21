# Changelog

## Current (in progress)

- Nothing yet

## 3.0.0 (2022-11-14)

- :warning: **Breaking change** Use and display harvest metadata introduced in udata 5 [#168](https://github.com/etalab/udata-front/pull/168)
- Improve search history [#162](https://github.com/etalab/udata-front/pull/162)

## 2.0.13 (2022-11-02)

- Switch from `Flask-restplus` to its fork `Flask-rest-x` [#165](https://github.com/etalab/udata-front/pull/165)
- Add CaptchEtat integration [#159](https://github.com/etalab/udata-front/pull/159)
  - new environment variables : CAPTCHETAT_BASE_URL, CAPTCHETAT_OAUTH_BASE_URL, CAPTCHETAT_CLIENT_ID and CAPTCHETAT_CLIENT_SECRET
- Fix lighthouse reported errors [#158](https://github.com/etalab/udata-front/pull/158)

## 2.0.12 (2022-10-19)

- Fix i18n errors for `/es` [#156](https://github.com/etalab/udata-front/pull/156)
- Update API card [#160](https://github.com/etalab/udata-front/pull/160)
- Create new search results component [#157](https://github.com/etalab/udata-front/pull/157)
- Remove quality score banner [#163](https://github.com/etalab/udata-front/pull/163)
- Add energy on home venti button [#164](https://github.com/etalab/udata-front/pull/164)
- Cache behavior changes [#154](https://github.com/etalab/udata-front/pull/154):
  - Organization and Reuse display page are now cached.
  - Cache keys now embed the `last_modified` object attribute. This automatically invalidates the cache when modifying the object.

## 2.0.11 (2022-09-02)

- Fix discussions text wrap [#145](https://github.com/etalab/udata-front/pull/145)
- Update Venti buttons [#146](https://github.com/etalab/udata-front/pull/146)
- :warning: @blue-470 and @blue-500 are removed
- Fix z-index value in dataset search-result template [#153](https://github.com/etalab/udata-front/pull/153) [#155](https://github.com/etalab/udata-front/pull/155)
- Fix RGAA criterion 8.2 [#147](https://github.com/etalab/udata-front/pull/147)

## 2.0.10 (2022-08-11)

- Fix dataset search result link to organization [#150](https://github.com/etalab/udata-front/pull/150)

## 2.0.9 (2022-08-10)

- Fix selected tag with wrong color [#149](https://github.com/etalab/udata-front/pull/149)

## 2.0.8 (2022-08-09)

- Add lighthouse in CircleCI [#108](https://github.com/etalab/udata-front/pull/108)
- Fix RGAA criterion 8.2 [#130](https://github.com/etalab/udata-front/pull/130)
- Add quality score [#135](https://github.com/etalab/udata-front/pull/135)

## 2.0.7 (2022-07-20)

- Fix window.dsfr.register error [#138](https://github.com/etalab/udata-front/pull/138)
- Fix featured toggle [#137](https://github.com/etalab/udata-front/pull/137)
- Iterate on search results and cards [#136](https://github.com/etalab/udata-front/pull/136)

## 2.0.6 (2022-07-08)

- Fix RGAA criterion 7.5 [#118](https://github.com/etalab/udata-front/pull/118)
- Remove map related stuff [#124](https://github.com/etalab/udata-front/pull/124)
- Fix clear button now shown on multiselect [#125](https://github.com/etalab/udata-front/pull/125)
- Add aria-current to breadcumbs [#121](https://github.com/etalab/udata-front/pull/121)
- Add missing default og:image [#127](https://github.com/etalab/udata-front/pull/127)
- Fix 500 on favicon in admin [#126](https://github.com/etalab/udata-front/pull/126)
- Update search results [#110](https://github.com/etalab/udata-front/pull/110) [#134](https://github.com/etalab/udata-front/pull/134)
- Fix test error with long reuse title [#133](https://github.com/etalab/udata-front/pull/133)
- Removed manifest logic [#129](https://github.com/etalab/udata-front/pull/129)

## 2.0.5 (2022-06-14)

- Add new menu items and change edito pages slug [#113](https://github.com/etalab/udata-front/pull/113) [#120](https://github.com/etalab/udata-front/pull/120)
- Replace news by release notes in footer [#117](https://github.com/etalab/udata-front/pull/117)
- Use DSFR container and remove custom ones [#111](https://github.com/etalab/udata-front/pull/111)

## 2.0.4 (2022-06-09)

- Add accessibility compliance status in footer [#114](https://github.com/etalab/udata-front/pull/114)
- Fix SVG display issue [#116](https://github.com/etalab/udata-front/pull/116)

## 2.0.3 (2022-06-03)

- Update search pages [#95](https://github.com/etalab/udata-front/pull/95)
- Add support for HTML in posts [#106](https://github.com/etalab/udata-front/pull/106)
- Fix RGAA criterion 1.1 [#104](https://github.com/etalab/udata-front/pull/104)
- Fix RGAA criterion 10.4 [#103](https://github.com/etalab/udata-front/pull/103)
- Add geographical page on home venti button [#109](https://github.com/etalab/udata-front/pull/109)
- Fix RGAA criterion 11.10 [#102](https://github.com/etalab/udata-front/pull/102)
- Update DSFR to 1.5.1 [#107](https://github.com/etalab/udata-front/pull/107)
  -  :warning: SVG in JS must use `bundle-text:` prefix now

## 2.0.2 (2022-04-11)

- Add harvest catalog view [#100](https://github.com/etalab/udata-front/pull/100)
- Add elections on home venti button [#101](https://github.com/etalab/udata-front/pull/101)

## 2.0.1 (2022-04-05)

- Add support for HTML static pages and more DSFR components [#96](https://github.com/etalab/udata-front/pull/96)
- Fix mobile bugs after header changes [#99](https://github.com/etalab/udata-front/pull/99)
- Fix organizationCertified error when organization is null [#98](https://github.com/etalab/udata-front/pull/98)

## 2.0.0 (2022-03-30)

### Breaking change
- :warning: Use refactored search endpoints from udata [#60](https://github.com/etalab/udata-front/pull/60)

## 1.2.5 (2022-03-29)

- Add a transport banner hook [#94](https://github.com/etalab/udata-front/pull/94)
- Add button on organization page to see all of its datasets [#93](https://github.com/etalab/udata-front/pull/93)
- Format home page numbers [#90](https://github.com/etalab/udata-front/pull/90)
- Let browsers decide what cursor to use [#89](https://github.com/etalab/udata-front/pull/89)
- Replace see more button on home page with link [#91](https://github.com/etalab/udata-front/pull/91)
- Replace Suggest with accessible combobox [#88](https://github.com/etalab/udata-front/pull/88)

## 1.2.4 (2022-03-01)

- **Deprecation**: Topics are now deprecated and will be removed in upcoming releases.
- Fix `<read-more>` component height when it contains `<img>` [#65](https://github.com/etalab/udata-front/pull/65) [#85](https://github.com/etalab/udata-front/pull/85)
- Add featured button component back for sysadmin [#79](https://github.com/etalab/udata-front/pull/79)
- Update reuse style [#52](https://github.com/etalab/udata-front/pull/52) [#81](https://github.com/etalab/udata-front/pull/81)
- Add banner to broken user page [#76](https://github.com/etalab/udata-front/pull/76)
- :warning: Button changes [#75](https://github.com/etalab/udata-front/pull/75)
  - Remove underline from button hover
  - `.btn`, `.btn-secondary` and `.btn-secondary` are removed. Use DSFR and `.fr-btn--secondary-{color}` instead.
  - `.tags` and `.tag` are removed. Use DSFR ones instead.
  - `.dropdown` is removed. Use DSFR select instead.
- Fix duplicate request on dataset search [#70](https://github.com/etalab/udata-front/pull/70) [86](https://github.com/etalab/udata-front/pull/86)
- Add banner for harvested dataset [#73](https://github.com/etalab/udata-front/pull/73)
- Change github footer link to the tickets repository [#80](https://github.com/etalab/udata-front/pull/80)
- Remove banner for the new search beta on datasets search page [#83](https://github.com/etalab/udata-front/pull/83)
- Fix RGAA criterion 7.3 [#82](https://github.com/etalab/udata-front/pull/82)
- Use avatar_url for owner [#84](https://github.com/etalab/udata-front/pull/84)
- Update resources style [#78](https://github.com/etalab/udata-front/pull/78)

## 1.2.3 (2022-01-27)

- Fix modals not working [#71](https://github.com/etalab/udata-front/pull/71)
- Fix auth messages not shown from query parameter [#68](https://github.com/etalab/udata-front/pull/68)
- Fix RGAA criterion 10.14 [#72](https://github.com/etalab/udata-front/pull/72)
- Fix thread header wrapped when title is too long [#64](https://github.com/etalab/udata-front/pull/64)

## 1.2.2 (2022-01-21)

- Fix latest modification date for dataset and resources on dataset page [#62](https://github.com/etalab/udata-front/pull/62)
- Fix hidden datasets shown on Home and Reuses [#67](https://github.com/etalab/udata-front/pull/67)
- Add temporal coverage back to dataset page [#63](https://github.com/etalab/udata-front/pull/63)
- :warning: @bg-beige is remove, use @background-contrast-grey instead
- Update colors to fix accessibility issues [#56](https://github.com/etalab/udata-front/pull/56)
- Fix missing checkbox using DSFR checkboxes [#69](https://github.com/etalab/udata-front/pull/69)

## 1.2.1 (2022-01-11)

- Change urls in Participate banner to relevant etalab guides [#53](https://github.com/etalab/udata-front/pull/53)
- Add topic information on reuse metadata and add a filter by topic on reuse search page [#50](https://github.com/etalab/udata-front/pull/50)
- Update DSFR to v1.2.1 [#45](https://github.com/etalab/udata-front/pull/45)
- :warning: `.btn-tab` is removed, use `.fr-tag` instead [57](https://github.com/etalab/udata-front/pull/57)

## 1.2.0 (2021-12-10)

- Add a banner for the new search beta on datasets search page [#43](https://github.com/etalab/udata-front/pull/43)
- :warning: Remove Issues logic in accordance with udata [#42](https://github.com/etalab/udata-front/pull/42)
- :warning: @grey-100 is now `#e5e5e5`
- Standardize organization page similar to dataset and reuse pages [#40](https://github.com/etalab/udata-front/pull/40)
- Fix RGAA criterion 10.7 Each element focusable has a visible focus [#46](https://github.com/etalab/udata-front/pull/46)
- Fix Stylemark generation to include JS files and properly include other assets [#33](https://github.com/etalab/udata-front/pull/33)
- Redirect about page to "ressources" page in menu [#48](https://github.com/etalab/udata-front/pull/48)
- Standardize article discussions and quick fixes to discussions [#41](https://github.com/etalab/udata-front/pull/41) [#51](https://github.com/etalab/udata-front/pull/51)
- Fix error on search request cancelation [#44](https://github.com/etalab/udata-front/pull/44)

## 1.1.2 (2021-11-23)

- Standardize reuse page similar to dataset page navigation quickfixes [#31](https://github.com/etalab/udata-front/pull/31)
- Move template hook logic to udata and add oauth hooks [#29](https://github.com/etalab/udata-front/pull/29)
- Add resources pagination dataset page and use DSFR pagination [#30](https://github.com/etalab/udata-front/pull/30) [#37](https://github.com/etalab/udata-front/pull/37)
- Style oauth page [#34](https://github.com/etalab/udata-front/pull/34)
- Fix horizontal scroll on mobile [#38](https://github.com/etalab/udata-front/pull/38)
- Fix gouvfr static path [#39](https://github.com/etalab/udata-front/pull/39)

## 1.1.1 (2021-10-22)

- Update README to reflect front changes [#17](https://github.com/etalab/udata-front/pull/17)
- Add Participate banner in the footer [#24](https://github.com/etalab/udata-front/pull/24)
- Fix min-height used in posts images to center them [#23](https://github.com/etalab/udata-front/pull/23)
- Update dataset page with navigation quickfixes and add DSFR components [#18](https://github.com/etalab/udata-front/pull/18)
- Implement feedbacks on quickfixes [#26](https://github.com/etalab/udata-front/pull/26)

## 1.1.0 (2021-10-12)

- Add Cypress front-end tests stub [#9](https://github.com/etalab/udata-front/pull/9)
- Add read only mode back on frontend [#10](https://github.com/etalab/udata-front/pull/10)
- Fix RGAA criterion 1.2 Each decorative image is ignored by assistive technologies. [#13](https://github.com/etalab/udata-front/pull/13)
- Add a request membership action on organization page [#12](https://github.com/etalab/udata-front/pull/12)
- Unset vue delimiters used in html templates to prevent injections [#11](https://github.com/etalab/udata-front/pull/11)
- Fix temporal coverage order in search results metadata [#14](https://github.com/etalab/udata-front/pull/14)
- VueJS multiple mount points with a global event bus [#15](https://github.com/etalab/udata-front/pull/15) [#19](https://github.com/etalab/udata-front/pull/19)
- Fix RGAA criterion 12.6 Block of contents from multiple pages can be reached or skipped [#21](https://github.com/etalab/udata-front/pull/21)

## 1.0.0 (2021-09-16)

- :warning: **breaking change**: Package renaming and new repository [#1](https://github.com/etalab/udata-front/pull/1):
  - udata-gouvfr is now udata-front
- Update feedparser following setuptools 58.0.2 release that drops support for `use_2to3` [#6](https://github.com/etalab/udata-front/pull/6)
- Show correct number of latest reuses on homepage [#3](https://github.com/etalab/udata-front/pull/3)
- Fix next value on login to prevent infinite loop [#4](https://github.com/etalab/udata-front/pull/4) [#8](https://github.com/etalab/udata-front/pull/8)

## Previous udata-gouvfr changelog

If you're migrating from udata-gouvfr, see previous changelog [here](https://github.com/etalab/udata-gouvfr/blob/master/CHANGELOG.md)
