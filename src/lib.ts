export { default as CdrAbstract } from './components/abstract/CdrAbstract.vue';
export { default as CdrAccordion } from './components/accordion/CdrAccordion.vue';
export { default as CdrAccordionGroup } from './components/accordion/CdrAccordionGroup.vue';
export { default as CdrBanner } from './components/banner/CdrBanner.vue';
export { default as CdrBreadcrumb } from './components/breadcrumb/CdrBreadcrumb.vue';
export { default as CdrButton } from './components/button/CdrButton.vue';
export { default as CdrCaption } from './components/caption/CdrCaption.vue';
export { default as CdrCard } from './components/card/CdrCard.vue';
export { default as CdrCheckbox } from './components/checkbox/CdrCheckbox.vue';
export { default as CdrChip } from './components/chip/CdrChip.vue';
export { default as CdrChipGroup } from './components/chip/CdrChipGroup.vue';
export { default as CdrChoreographer } from './components/choreographer/CdrChoreographer.vue';
export { default as CdrContainer } from './components/container/CdrContainer.vue';
export { default as CdrFilmstrip } from './components/filmstrip/CdrFilmstrip.vue';
export { default as CdrFormGroup } from './components/formGroup/CdrFormGroup.vue';
export { default as CdrFulfillmentTile } from './components/fulfillmentTile/CdrFulfillmentTile.vue';
export { default as CdrFulfillmentTileIcon } from './components/fulfillmentTile/CdrFulfillmentTileIcon.vue';
export { default as CdrGrid } from './components/grid/CdrGrid.vue';
export { default as CdrIcon } from './components/icon/CdrIcon.vue';
export { default as CdrImg } from './components/image/CdrImg.vue';
export { default as CdrInput } from './components/input/CdrInput.vue';
export { default as CdrKicker } from './components/kicker/CdrKicker.vue';
export { default as CdrLandingLead } from './components/landingLead/CdrLandingLead.vue';
export { default as CdrLayout } from './components/layout/CdrLayout.vue';
export { default as CdrLink } from './components/link/CdrLink.vue';
export { default as CdrList } from './components/list/CdrList.vue';
export { default as CdrMediaObject } from './components/mediaObject/CdrMediaObject.vue';
export { default as CdrModal } from './components/modal/CdrModal.vue';
export { default as CdrObjectOverlay } from './components/objectOverlay/CdrObjectOverlay.vue';
export { default as CdrPagination } from './components/pagination/CdrPagination.vue';
export { default as CdrPicture } from './components/picture/CdrPicture.vue';
export { default as CdrPopover } from './components/popover/CdrPopover.vue';
export { default as CdrQuote } from './components/quote/CdrQuote.vue';
export { default as CdrRadio } from './components/radio/CdrRadio.vue';
export { default as CdrRating } from './components/rating/CdrRating.vue';
export { default as CdrSelect } from './components/select/CdrSelect.vue';
export { default as CdrSkeleton } from './components/skeleton/CdrSkeleton.vue';
export { default as CdrSkeletonBone } from './components/skeleton/CdrSkeletonBone.vue';
export { default as CdrSplitSurface } from './components/splitSurface/CdrSplitSurface.vue';
export { default as CdrSurface } from './components/surface/CdrSurface.vue';
export { default as CdrSurfaceNavigation } from './components/surfaceNavigation/CdrSurfaceNavigation.vue';
export { default as CdrSurfaceScroll } from './components/surfaceScroll/CdrSurfaceScroll.vue';
export { default as CdrSurfaceSelection } from './components/surfaceSelection/CdrSurfaceSelection.vue';
export { default as CdrSwitch } from './components/switch/CdrSwitch.vue';
export { default as CdrTable } from './components/table/CdrTable.vue';
export { default as CdrTabPanel } from './components/tabs/CdrTabPanel.vue';
export { default as CdrTabs } from './components/tabs/CdrTabs.vue';
export { default as CdrText } from './components/text/CdrText.vue';
export { default as CdrTitle } from './components/title/CdrTitle.vue';
export { default as CdrToast } from './components/toast/CdrToast.vue';
export { default as CdrToggleButton } from './components/toggleButton/CdrToggleButton.vue';
export { default as CdrToggleGroup } from './components/toggleButton/CdrToggleGroup.vue';
export { default as CdrTooltip } from './components/tooltip/CdrTooltip.vue';

/** Compositions */
export * from './components/icon/index';
export * from './components/text/presets/textPresets';

/** Type exports - per-component types */
export type { CdrAbstractProps } from './components/abstract/types';
export type { CdrAccordionProps, CdrAccordionGroupProps } from './components/accordion/types';
export type { CdrBannerProps } from './components/banner/types';
export type { CdrBreadcrumbProps, BreadcrumbItem } from './components/breadcrumb/types';
export type { CdrButtonProps } from './components/button/types';
export type { CdrCaptionProps } from './components/caption/types';
export type { CdrCardProps } from './components/card/types';
export type { CdrCheckboxProps } from './components/checkbox/types';
export type { CdrChipProps, CdrChipGroupProps } from './components/chip/types';
export type {
  CdrChoreographerProps,
  ChoreographerSchema,
  ChoreographerComponents,
} from './components/choreographer/types';
export type { CdrContainerProps } from './components/container/types';
export type { CdrFormErrorProps } from './components/formError/types';
export type { CdrFormGroupProps } from './components/formGroup/types';
export type {
  CdrFulfillmentTileProps,
  CdrFulfillmentTileIconProps,
  FulfillmentTileContent,
  FulfillmentTileIcon,
  StateConfig,
} from './components/fulfillmentTile/types';
export type { CdrGridProps } from './components/grid/types';
export type { CdrIconProps } from './components/icon/types';
export type { CdrImgProps, BaseImageProps } from './components/image/types';
export type { CdrInputProps } from './components/input/types';
export type { CdrKickerProps } from './components/kicker/types';
export type { CdrLabelStandaloneProps } from './components/labelStandalone/types';
export type { CdrLabelWrapperProps } from './components/labelWrapper/types';
export type { CdrLandingLeadProps } from './components/landingLead/types';
export type { CdrLayoutProps, Layout, NameValuePair } from './components/layout/types';
export type { CdrLinkProps, CdrLinkTag } from './components/link/types';
export type { CdrListProps } from './components/list/types';
export type {
  CdrMediaObjectProps,
  MediaObject,
  HtmlAttributes,
} from './components/mediaObject/types';
export type { CdrModalProps } from './components/modal/types';
export type {
  CdrObjectOverlayProps,
  ObjectPosition,
  ResponsivePosition,
  SpaceTuple,
  Spacing,
  ResponsiveSpace,
} from './components/objectOverlay/types';
export type { CdrPaginationProps, PaginationItem } from './components/pagination/types';
export type { CdrPictureProps, PictureSourceObject } from './components/picture/types';
export type { CdrPopoverProps } from './components/popover/types';
export type { CdrPopupProps } from './components/popup/types';
export type { CdrQuoteProps } from './components/quote/types';
export type { CdrRadioProps } from './components/radio/types';
export type { CdrRatingProps } from './components/rating/types';
export type { CdrSelectProps, SelectOption } from './components/select/types';
export type { CdrSkeletonProps, CdrSkeletonBoneProps } from './components/skeleton/types';
export type { CdrSplitSurfaceProps } from './components/splitSurface/types';
export type { CdrSurfaceProps } from './components/surface/types';
export type { CdrSurfaceNavigationProps } from './components/surfaceNavigation/types';
export type { CdrSurfaceScrollProps } from './components/surfaceScroll/types';
export type {
  CdrSurfaceSelectionProps,
  SurfaceSelectionLayout,
} from './components/surfaceSelection/types';
export type { CdrSwitchProps } from './components/switch/types';
export type { CdrTableProps } from './components/table/types';
export type { CdrTabsProps, CdrTabPanelProps } from './components/tabs/types';
export type { CdrTextProps } from './components/text/types';
export type { CdrTitleProps } from './components/title/types';
export type { CdrToastProps } from './components/toast/types';
export type { CdrToggleButtonProps, CdrToggleGroupProps } from './components/toggleButton/types';
export type { CdrTooltipProps } from './components/tooltip/types';

/** Filmstrip types (already in separate file) */
export * from './components/filmstrip/interfaces';

/** Shared type exports */
export * from './types/other';
export * from './types/symbols';

/** Compile into dist/style folder */
import './styles/cdr-reset.scss';
import './styles/cdr-fonts.scss';
import './styles/cdr-palette.scss';
import './styles/cdr-fluid-vars.scss';
