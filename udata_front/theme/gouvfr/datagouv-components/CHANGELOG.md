# Changelog

## Current (in progress)

- Display correct business documentation url link [#595](https://github.com/datagouv/udata-front/pull/595)
- Deprecate `useUserAvatar` and rename it to `getUserAvatar` to better convey its usage [#596](https://github.com/datagouv/udata-front/pull/596)

## 2.0.1 (2024-11-13)

- Fix SSR, dependencies are now `externals` [#594](https://github.com/datagouv/udata-front/pull/594)

## 2.0.0 (2024-11-13)

> [!WARNING]
> Markdown removal functions `truncate()` and `excerpt()` are removed

- Replace remove-markdown with remark strip-markdown and use Suspense for descriptions [#591](https://github.com/datagouv/udata-front/pull/591)

## 1.6.0 (2024-11-07)

- Add special style to tabular API dataservice card [#548](https://github.com/datagouv/udata-front/pull/548)
- Export `Placeholder` component, use reuse last_modified [#546](https://github.com/datagouv/udata-front/pull/546)
- Add missing `dataset` key to `CommunityResource` type [#551](https://github.com/datagouv/udata-front/pull/551)
- Low enphasis on last element of charts [#562](https://github.com/datagouv/udata-front/pull/562)
- Remove markdown from dataservice card [#568](https://github.com/datagouv/udata-front/pull/568)
- Add Swagger UI to resources and dataservice links [#575](https://github.com/datagouv/udata-front/pull/575)
- Add back copy button without label  [#576](https://github.com/datagouv/udata-front/pull/576)
- Rename private to draft [#572](https://github.com/datagouv/udata-front/pull/572)

## 1.4.0 (2024-09-23)

- Add `StatBox` and `SmallChart` components [#517](https://github.com/datagouv/udata-front/pull/517)
- Move api calls and types from udata-front [#527](https://github.com/datagouv/udata-front/pull/527)
- Fix api urls [#473](https://github.com/datagouv/udata-front/pull/473)

## 1.3.1 (2024-09-12)

- Fix toggletip and use summarize for metrics [#512](https://github.com/datagouv/udata-front/pull/512)

## 1.3.0 (2024-09-10)

- Use resource downloads for download icon on dataset card [#484](https://github.com/datagouv/udata-front/pull/484)
- Reduce organization type icon [#483](https://github.com/datagouv/udata-front/pull/483)
- add Tabs component [#491](https://github.com/datagouv/udata-front/pull/491)
- show permalink for community resources [#486](https://github.com/datagouv/udata-front/pull/486)
- fix dataset card tooltip bug [#493](https://github.com/datagouv/udata-front/pull/493)
- add url to reuse type [#494](https://github.com/datagouv/udata-front/pull/494)
- fix reuse card date shown [#496](https://github.com/datagouv/udata-front/pull/496)
- add vue-clamp to cards title and description [#497](https://github.com/datagouv/udata-front/pull/497)
- fix dsfr CSS for badge imported into components [#500](https://github.com/datagouv/udata-front/pull/500)
- update DSFR to v1.11 [#466](https://github.com/datagouv/udata-front/pull/466) [#506](https://github.com/datagouv/udata-front/pull/506)
- new resource accordion [#490](https://github.com/datagouv/udata-front/pull/490)

## 1.2.0 (2024-08-21)

- Add new resources_dowloads metric to Dataset type [#474](https://github.com/datagouv/udata-front/pull/474)
- Improve organization type logic [#475](https://github.com/datagouv/udata-front/pull/475)
- Update reuse card [#449](https://github.com/datagouv/udata-front/pull/449)
- Add dataservice card [#450](https://github.com/datagouv/udata-front/pull/450)

## 1.1.2 (2024-08-01)

- Update paddings and display on DatasetCard [#467](https://github.com/datagouv/udata-front/pull/467)
- Fix resource translation [#468](https://github.com/datagouv/udata-front/pull/468)

## 1.1.1 (2024-07-29)

- Prevent publishing NPM version without dist [#463](https://github.com/datagouv/udata-front/pull/463)

## 1.1.0 (2024-07-29)

- Allow quality score warning to be hidden [#414](https://github.com/datagouv/udata-front/pull/414)
- Add preview to resource component [#433](https://github.com/datagouv/udata-front/pull/433)
- Add useAccordion composable and add missing exports [#451](https://github.com/datagouv/udata-front/pull/451)
- Add translations [#458](https://github.com/datagouv/udata-front/pull/458)
