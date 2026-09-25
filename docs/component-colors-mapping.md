# Component colors — manual semantic mapping

Source: `main` branch component styles. Each row is one rendered color: the CSS
declaration, the file that sets it, the legacy token (or literal), and its hex.
Fill **Semantic equivalent** with the `--cdr-color-…` name this should resolve to.
Rule: keep the `color` segment; use Figma’s remainder on conflict
(`--cdr-color-<figma-web-name-remainder>`).

## abstract

| Property | File                             | Legacy token             | Hex     | Semantic equivalent |
| -------- | -------------------------------- | ------------------------ | ------- | ------------------- |
| `color`  | `styles/CdrAbstract.module.scss` | `cdr-color-text-primary` | #4b4a48 |                     |

## accordion

| Property                 | File                              | Legacy token                           | Hex     | Semantic equivalent |
| ------------------------ | --------------------------------- | -------------------------------------- | ------- | ------------------- |
| `--cdr-accordion-border` | `styles/CdrAccordion.module.scss` | `cdr-color-border-primary`             | #d5cfc3 |                     |
| `background-color`       | `styles/CdrAccordion.module.scss` | `cdr-color-background-accordion-hover` | #fafbf9 |                     |
| `color`                  | `styles/CdrAccordion.module.scss` | `cdr-color-text-primary`               | #4b4a48 |                     |
| `fill`                   | `styles/CdrAccordion.module.scss` | `cdr-color-icon-default`               | #958e83 |                     |

## banner

| Property            | File                              | Legacy token                              | Hex     | Semantic equivalent |
| ------------------- | --------------------------------- | ----------------------------------------- | ------- | ------------------- |
| `background-color`  | `styles/CdrBanner.module.scss`    | `cdr-color-background-message-default-02` | #e8e0ce |                     |
| `background-color`  | `styles/CdrBanner.module.scss`    | `cdr-color-background-message-error-02`   | #eecbc1 |                     |
| `background-color`  | `styles/CdrBanner.module.scss`    | `cdr-color-background-message-info-02`    | #c2d8db |                     |
| `background-color`  | `styles/CdrBanner.module.scss`    | `cdr-color-background-message-success-02` | #d5e6cb |                     |
| `background-color`  | `styles/CdrBanner.module.scss`    | `cdr-color-background-message-warning-02` | #f5e9b7 |                     |
| `background-color`  | `styles/CdrBanner.module.scss`    | `cdr-color-background-primary`            | #ffffff |                     |
| `border-left-color` | `styles/CdrBanner.module.scss`    | `cdr-color-border-message-default-01`     | #726d64 |                     |
| `border-left-color` | `styles/CdrBanner.module.scss`    | `cdr-color-border-message-error-01`       | #bb4045 |                     |
| `border-left-color` | `styles/CdrBanner.module.scss`    | `cdr-color-border-message-info-01`        | #408e86 |                     |
| `border-left-color` | `styles/CdrBanner.module.scss`    | `cdr-color-border-message-success-01`     | #3b8349 |                     |
| `border-left-color` | `styles/CdrBanner.module.scss`    | `cdr-color-border-message-warning-01`     | #b68b37 |                     |
| `fill`              | `styles/CdrBanner.module.scss`    | `cdr-color-icon-message-default`          | #726d64 |                     |
| `fill`              | `styles/CdrBanner.module.scss`    | `cdr-color-icon-message-error`            | #bb4045 |                     |
| `fill`              | `styles/CdrBanner.module.scss`    | `cdr-color-icon-message-info`             | #408e86 |                     |
| `fill`              | `styles/CdrBanner.module.scss`    | `cdr-color-icon-message-success`          | #3b8349 |                     |
| `fill`              | `styles/CdrBanner.module.scss`    | `cdr-color-icon-message-warning`          | #b68b37 |                     |
| `fill`              | `styles/CdrBanner.module.scss`    | `cdr-color-text-emphasis`                 | #2e2e2b |                     |
| `fill`              | `styles/CdrBanner.module.scss`    | `cdr-color-text-link-rest`                | #406eb5 |                     |
| `background-color`  | `styles/vars/CdrBanner.vars.scss` | `cdr-color-background-message-default-01` | #f9f8f6 |                     |
| `background-color`  | `styles/vars/CdrBanner.vars.scss` | `cdr-color-background-message-error-01`   | #fdf7f7 |                     |
| `background-color`  | `styles/vars/CdrBanner.vars.scss` | `cdr-color-background-message-info-01`    | #edf4f5 |                     |
| `background-color`  | `styles/vars/CdrBanner.vars.scss` | `cdr-color-background-message-success-01` | #f4fbf5 |                     |
| `background-color`  | `styles/vars/CdrBanner.vars.scss` | `cdr-color-background-message-warning-01` | #fefcf1 |                     |
| `outline-color`     | `styles/vars/CdrBanner.vars.scss` | `cdr-color-border-message-default-02`     | #e8e0ce |                     |
| `outline-color`     | `styles/vars/CdrBanner.vars.scss` | `cdr-color-border-message-error-02`       | #eecbc1 |                     |
| `outline-color`     | `styles/vars/CdrBanner.vars.scss` | `cdr-color-border-message-info-02`        | #c2d8db |                     |
| `outline-color`     | `styles/vars/CdrBanner.vars.scss` | `cdr-color-border-message-success-02`     | #d5e6cb |                     |
| `outline-color`     | `styles/vars/CdrBanner.vars.scss` | `cdr-color-border-message-warning-02`     | #f5e9b7 |                     |

## breadcrumb

| Property | File                                  | Legacy token                | Hex     | Semantic equivalent |
| -------- | ------------------------------------- | --------------------------- | ------- | ------------------- |
| `color`  | `styles/CdrBreadcrumb.module.scss`    | `cdr-color-text-link-hover` | #406eb5 |                     |
| `color`  | `styles/CdrBreadcrumb.module.scss`    | `cdr-color-text-secondary`  | #736e65 |                     |
| `color`  | `styles/vars/CdrBreadcrumb.vars.scss` | `cdr-color-text-link-hover` | #406eb5 |                     |
| `color`  | `styles/vars/CdrBreadcrumb.vars.scss` | `cdr-color-text-secondary`  | #736e65 |                     |

## button

| Property           | File                              | Legacy token                                     | Hex     | Semantic equivalent |
| ------------------ | --------------------------------- | ------------------------------------------------ | ------- | ------------------- |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-dark-active`        | #4b4a48 |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-dark-hover`         | #edeae3 |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-dark-rest`          | #4b4a48 |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-default-disabled`   | #d5cfc3 |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-primary-active`     | #1f513f |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-primary-hover`      | #c7dfd1 |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-primary-rest`       | #1f513f |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-sale-active`        | #c7370f |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-sale-hover`         | #fde2e2 |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-sale-rest`          | #c7370f |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-secondary-active`   | #958e83 |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-secondary-disabled` | #fafbf9 |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-secondary-hover`    | #f9f8f6 |                     |
| `background-color` | `styles/vars/CdrButton.vars.scss` | `cdr-color-background-button-secondary-rest`     | #fafbf9 |                     |
| `box-shadow`       | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-dark-rest`              | #4b4a48 |                     |
| `box-shadow`       | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-primary-rest`           | #1f513f |                     |
| `box-shadow`       | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-sale-rest`              | #c7370f |                     |
| `color`            | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-secondary`                | #4b4a48 |                     |
| `color`            | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-link-active`                     | #0b2d60 |                     |
| `color`            | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-link-hover`                      | #406eb5 |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-dark-active`              | #fafbf9 |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-dark-disabled`            | #ffffff |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-dark-hover`               | #4b4a48 |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-dark`                     | #fafbf9 |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-primary-active`           | #fafbf9 |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-primary-disabled`         | #ffffff |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-primary-hover`            | #1f513f |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-primary`                  | #fafbf9 |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-sale-active`              | #ffffff |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-sale-disabled`            | #ffffff |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-sale-hover`               | #c7370f |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-sale`                     | #ffffff |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-secondary-active`         | #fafbf9 |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-secondary-disabled`       | #d5cfc3 |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-button-secondary-hover`          | #4b4a48 |                     |
| `color`, `fill`    | `styles/vars/CdrButton.vars.scss` | `cdr-color-text-link-rest`                       | #406eb5 |                     |
| `fill`             | `styles/vars/CdrButton.vars.scss` | `cdr-color-icon-default`                         | #958e83 |                     |
| `fill`             | `styles/vars/CdrButton.vars.scss` | `cdr-color-icon-disabled`                        | #d5cfc3 |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-dark-active-inset`      | #edeae3 |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-dark-active`            | #4b4a48 |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-dark-hover`             | #4b4a48 |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-default-disabled`       | #d5cfc3 |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-primary-active-inset`   | #f7f5f3 |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-primary-active`         | #1f513f |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-primary-hover`          | #1f513f |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-sale-active-inset`      | #fde2e2 |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-sale-active`            | #c7370f |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-sale-hover`             | #c7370f |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-secondary-active-inset` | #f7f5f3 |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-secondary-active`       | #958e83 |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-secondary-hover`        | #4b4a48 |                     |
| —                  | `styles/vars/CdrButton.vars.scss` | `cdr-color-border-button-secondary-rest`         | #958e83 |                     |

## caption

| Property | File                               | Legacy token               | Hex     | Semantic equivalent |
| -------- | ---------------------------------- | -------------------------- | ------- | ------------------- |
| `color`  | `styles/vars/CdrCaption.vars.scss` | `cdr-color-text-primary`   | #4b4a48 |                     |
| `color`  | `styles/vars/CdrCaption.vars.scss` | `cdr-color-text-secondary` | #736e65 |                     |

## card

| Property           | File                            | Legacy token                   | Hex     | Semantic equivalent |
| ------------------ | ------------------------------- | ------------------------------ | ------- | ------------------- |
| `background-color` | `styles/vars/CdrCard.vars.scss` | `cdr-color-background-primary` | #ffffff |                     |
| `color`            | `styles/vars/CdrCard.vars.scss` | `cdr-color-text-link-hover`    | #406eb5 |                     |
| `color`            | `styles/vars/CdrCard.vars.scss` | `cdr-color-text-primary`       | #4b4a48 |                     |

## checkbox

| Property                   | File                                | Legacy token                                        | Hex     | Semantic equivalent |
| -------------------------- | ----------------------------------- | --------------------------------------------------- | ------- | ------------------- |
| `background-color`         | `styles/CdrCheckbox.module.scss`    | `cdr-color-background-input-default-disabled`       | #fafbf9 |                     |
| `background-color`         | `styles/CdrCheckbox.module.scss`    | `cdr-color-background-input-default-selected`       | #4b4a48 |                     |
| `background-color`, `fill` | `styles/CdrCheckbox.module.scss`    | `cdr-color-icon-checkbox-default-selected-hover`    | #ffffff |                     |
| `box-shadow`               | `styles/CdrCheckbox.module.scss`    | `cdr-color-border-input-default-disabled`           | #d5cfc3 |                     |
| `box-shadow`               | `styles/CdrCheckbox.module.scss`    | `cdr-color-border-input-default-selected-hover`     | #4b4a48 |                     |
| `box-shadow`               | `styles/CdrCheckbox.module.scss`    | `cdr-color-border-input-default-selected`           | #4b4a48 |                     |
| `fill`                     | `styles/CdrCheckbox.module.scss`    | `cdr-color-icon-checkbox-default-selected-active`   | #4b4a48 |                     |
| `fill`                     | `styles/CdrCheckbox.module.scss`    | `cdr-color-icon-checkbox-default-selected`          | #ffffff |                     |
| `background-color`         | `styles/vars/CdrCheckbox.vars.scss` | `cdr-color-background-input-default-active`         | #fafbf9 |                     |
| `background-color`         | `styles/vars/CdrCheckbox.vars.scss` | `cdr-color-background-input-default-disabled`       | #fafbf9 |                     |
| `background-color`         | `styles/vars/CdrCheckbox.vars.scss` | `cdr-color-background-input-default-focus`          | #fafbf9 |                     |
| `background-color`         | `styles/vars/CdrCheckbox.vars.scss` | `cdr-color-background-input-default-hover`          | #fafbf9 |                     |
| `background-color`         | `styles/vars/CdrCheckbox.vars.scss` | `cdr-color-background-input-default-selected-focus` | #958e83 |                     |
| `background-color`         | `styles/vars/CdrCheckbox.vars.scss` | `cdr-color-background-input-default-selected-hover` | #958e83 |                     |
| `background-color`         | `styles/vars/CdrCheckbox.vars.scss` | `cdr-color-background-input-default-selected`       | #4b4a48 |                     |
| —                          | `styles/vars/CdrCheckbox.vars.scss` | `cdr-color-border-input-default-active`             | #4b4a48 |                     |
| —                          | `styles/vars/CdrCheckbox.vars.scss` | `cdr-color-border-input-default-disabled`           | #d5cfc3 |                     |
| —                          | `styles/vars/CdrCheckbox.vars.scss` | `cdr-color-border-input-default-hover`              | #2e2e2b |                     |
| —                          | `styles/vars/CdrCheckbox.vars.scss` | `cdr-color-border-input-default-selected-hover`     | #4b4a48 |                     |
| —                          | `styles/vars/CdrCheckbox.vars.scss` | `cdr-color-border-input-default-selected`           | #4b4a48 |                     |

## chip

| Property           | File                            | Legacy token                                        | Hex     | Semantic equivalent |
| ------------------ | ------------------------------- | --------------------------------------------------- | ------- | ------------------- |
| `background-color` | `styles/vars/CdrChip.vars.scss` | `cdr-color-background-chip-default-active`          | #edeae3 |                     |
| `background-color` | `styles/vars/CdrChip.vars.scss` | `cdr-color-background-chip-default-disabled`        | #ffffff |                     |
| `background-color` | `styles/vars/CdrChip.vars.scss` | `cdr-color-background-chip-default-focus`           | #ffffff |                     |
| `background-color` | `styles/vars/CdrChip.vars.scss` | `cdr-color-background-chip-default-hover`           | #f7f5f3 |                     |
| `background-color` | `styles/vars/CdrChip.vars.scss` | `cdr-color-background-chip-default-rest`            | #ffffff |                     |
| `background-color` | `styles/vars/CdrChip.vars.scss` | `cdr-color-background-chip-default-selected-active` | #edeae3 |                     |
| `background-color` | `styles/vars/CdrChip.vars.scss` | `cdr-color-background-chip-default-selected-focus`  | #d5cfc3 |                     |
| `background-color` | `styles/vars/CdrChip.vars.scss` | `cdr-color-background-chip-default-selected-hover`  | #edeae3 |                     |
| `background-color` | `styles/vars/CdrChip.vars.scss` | `cdr-color-background-chip-default-selected`        | #d5cfc3 |                     |
| `box-shadow`       | `styles/vars/CdrChip.vars.scss` | `cdr-color-border-chip-default-hover`               | #958e83 |                     |
| `box-shadow`       | `styles/vars/CdrChip.vars.scss` | `cdr-color-border-chip-default-rest`                | #958e83 |                     |
| `color`            | `styles/vars/CdrChip.vars.scss` | `cdr-color-text-chip-disabled`                      | #d5cfc3 |                     |
| `color`, `fill`    | `styles/vars/CdrChip.vars.scss` | `cdr-color-text-chip-default`                       | #4b4a48 |                     |
| —                  | `styles/vars/CdrChip.vars.scss` | `cdr-color-border-chip-default-active`              | #4b4a48 |                     |
| —                  | `styles/vars/CdrChip.vars.scss` | `cdr-color-border-chip-default-disabled`            | #d5cfc3 |                     |
| —                  | `styles/vars/CdrChip.vars.scss` | `cdr-color-border-chip-default-focus`               | #4b4a48 |                     |
| —                  | `styles/vars/CdrChip.vars.scss` | `cdr-color-border-chip-default-selected-focus`      | #4b4a48 |                     |
| —                  | `styles/vars/CdrChip.vars.scss` | `cdr-color-border-chip-default-selected-hover`      | #736e65 |                     |
| —                  | `styles/vars/CdrChip.vars.scss` | `cdr-color-border-chip-default-selected-rest`       | #4b4a48 |                     |

## filmstrip

| Property                                                                                                                                                                                                                                                                   | File                              | Legacy token                                     | Hex     | Semantic equivalent |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------ | ------- | ------------------- |
| `--cdr-button-with-background-background-color-disabled`, `--cdr-button-with-background-box-shadow-disabled`                                                                                                                                                               | `styles/CdrFilmstrip.module.scss` | literal                                          | #eeeae2 |                     |
| `--cdr-button-with-background-background-color`, `--cdr-button-with-background-background-color-active`, `--cdr-button-with-background-background-color-interaction`, `--cdr-button-with-background-box-shadow-active`, `--cdr-color-border-button-secondary-active-inset` | `styles/CdrFilmstrip.module.scss` | literal                                          | #eae0cc |                     |
| `--cdr-button-with-background-fill-active`, `--cdr-button-with-background-icon-fill`, `--cdr-button-with-background-icon-fill-active`, `--cdr-button-with-background-icon-fill-interaction`                                                                                | `styles/CdrFilmstrip.module.scss` | literal                                          | #454441 |                     |
| `--cdr-button-with-background-fill-disabled`                                                                                                                                                                                                                               | `styles/CdrFilmstrip.module.scss` | literal                                          | #b2ab9f |                     |
| `--cdr-color-border-button-secondary-active-inset`                                                                                                                                                                                                                         | `styles/CdrFilmstrip.module.scss` | `cdr-color-border-button-secondary-active-inset` | #f7f5f3 |                     |

## formError

| Property        | File                                 | Legacy token                 | Hex     | Semantic equivalent |
| --------------- | ------------------------------------ | ---------------------------- | ------- | ------------------- |
| `color`, `fill` | `styles/vars/CdrFormError.vars.scss` | `cdr-color-text-input-error` | #b33322 |                     |

## formGroup

| Property           | File                                 | Legacy token                       | Hex                       | Semantic equivalent |
| ------------------ | ------------------------------------ | ---------------------------------- | ------------------------- | ------------------- |
| `color`            | `styles/CdrFormGroup.module.scss`    | `cdr-color-text-disabled`          | #d5cfc3                   |                     |
| `background-color` | `styles/vars/CdrFormGroup.vars.scss` | `cdr-color-background-input-error` | rgba(255, 242, 242, 0.75) |                     |
| `box-shadow`       | `styles/vars/CdrFormGroup.vars.scss` | `cdr-color-border-input-error`     | #b33322                   |                     |
| `color`            | `styles/vars/CdrFormGroup.vars.scss` | `cdr-color-text-disabled`          | #d5cfc3                   |                     |
| `color`            | `styles/vars/CdrFormGroup.vars.scss` | `cdr-color-text-input-optional`    | #736e65                   |                     |

## fulfillmentTile

| Property                           | File                                        | Legacy token                          | Hex     | Semantic equivalent |
| ---------------------------------- | ------------------------------------------- | ------------------------------------- | ------- | ------------------- |
| `--cdr-fulfillment-tile-icon-fill` | `styles/CdrFulfillmentTileIcon.module.scss` | `cdr-color-border-message-error-01`   | #bb4045 |                     |
| `--cdr-fulfillment-tile-icon-fill` | `styles/CdrFulfillmentTileIcon.module.scss` | `cdr-color-border-message-info-01`    | #408e86 |                     |
| `--cdr-fulfillment-tile-icon-fill` | `styles/CdrFulfillmentTileIcon.module.scss` | `cdr-color-border-message-warning-01` | #b68b37 |                     |
| `--cdr-fulfillment-tile-icon-fill` | `styles/CdrFulfillmentTileIcon.module.scss` | `cdr-color-icon-message-default`      | #726d64 |                     |
| `--cdr-fulfillment-tile-icon-fill` | `styles/CdrFulfillmentTileIcon.module.scss` | `cdr-color-icon-message-success`      | #3b8349 |                     |
| `background`                       | `styles/CdrFulfillmentTileIcon.module.scss` | `cdr-color-background-primary`        | #ffffff |                     |

## icon

| Property | File                         | Legacy token             | Hex     | Semantic equivalent |
| -------- | ---------------------------- | ------------------------ | ------- | ------------------- |
| `fill`   | `styles/CdrIcon.module.scss` | `cdr-color-icon-default` | #958e83 |                     |

## input

| Property           | File                             | Legacy token                                  | Hex                       | Semantic equivalent |
| ------------------ | -------------------------------- | --------------------------------------------- | ------------------------- | ------------------- |
| `background-color` | `styles/CdrInput.module.scss`    | `cdr-color-background-input-default-active`   | #fafbf9                   |                     |
| `background-color` | `styles/CdrInput.module.scss`    | `cdr-color-border-input-default`              | #958e83                   |                     |
| `box-shadow`       | `styles/CdrInput.module.scss`    | `cdr-color-border-input-default-focus`        | #2e2e2b                   |                     |
| `fill`             | `styles/CdrInput.module.scss`    | `cdr-color-icon-default`                      | #958e83                   |                     |
| `fill`             | `styles/CdrInput.module.scss`    | `cdr-color-text-primary`                      | #4b4a48                   |                     |
| `background-color` | `styles/vars/CdrInput.vars.scss` | `cdr-color-background-input-default-active`   | #fafbf9                   |                     |
| `background-color` | `styles/vars/CdrInput.vars.scss` | `cdr-color-background-input-default-disabled` | #fafbf9                   |                     |
| `background-color` | `styles/vars/CdrInput.vars.scss` | `cdr-color-background-input-default`          | rgba(247, 245, 243, 0.15) |                     |
| `background-color` | `styles/vars/CdrInput.vars.scss` | `cdr-color-background-input-error`            | rgba(255, 242, 242, 0.75) |                     |
| `background-color` | `styles/vars/CdrInput.vars.scss` | `cdr-color-background-input-secondary-active` | #ffffff                   |                     |
| `background-color` | `styles/vars/CdrInput.vars.scss` | `cdr-color-background-input-secondary`        | rgba(255, 255, 255, 0.85) |                     |
| `box-shadow`       | `styles/vars/CdrInput.vars.scss` | `cdr-color-border-input-default`              | #958e83                   |                     |
| `box-shadow`       | `styles/vars/CdrInput.vars.scss` | `cdr-color-border-input-error`                | #b33322                   |                     |
| `color`            | `styles/vars/CdrInput.vars.scss` | `cdr-color-text-input-default`                | #2e2e2b                   |                     |
| `color`            | `styles/vars/CdrInput.vars.scss` | `cdr-color-text-input-disabled`               | #d5cfc3                   |                     |
| `color`            | `styles/vars/CdrInput.vars.scss` | `cdr-color-text-input-help`                   | #736e65                   |                     |
| `color`            | `styles/vars/CdrInput.vars.scss` | `cdr-color-text-input-placeholder`            | #736e65                   |                     |
| `fill`             | `styles/vars/CdrInput.vars.scss` | `cdr-color-icon-default`                      | #958e83                   |                     |
| —                  | `styles/vars/CdrInput.vars.scss` | `cdr-color-border-input-default-disabled`     | #d5cfc3                   |                     |
| —                  | `styles/vars/CdrInput.vars.scss` | `cdr-color-border-input-default-focus`        | #2e2e2b                   |                     |

## kicker

| Property | File                           | Legacy token             | Hex     | Semantic equivalent |
| -------- | ------------------------------ | ------------------------ | ------- | ------------------- |
| `color`  | `styles/CdrKicker.module.scss` | `cdr-color-text-primary` | #4b4a48 |                     |

## labelStandalone

| Property | File                                       | Legacy token                    | Hex     | Semantic equivalent |
| -------- | ------------------------------------------ | ------------------------------- | ------- | ------------------- |
| `color`  | `styles/vars/CdrLabelStandalone.vars.scss` | `cdr-color-text-input-disabled` | #d5cfc3 |                     |
| `color`  | `styles/vars/CdrLabelStandalone.vars.scss` | `cdr-color-text-input-help`     | #736e65 |                     |
| `color`  | `styles/vars/CdrLabelStandalone.vars.scss` | `cdr-color-text-input-label`    | #4b4a48 |                     |
| `color`  | `styles/vars/CdrLabelStandalone.vars.scss` | `cdr-color-text-input-optional` | #736e65 |                     |

## labelWrapper

| Property           | File                                    | Legacy token                                  | Hex                       | Semantic equivalent |
| ------------------ | --------------------------------------- | --------------------------------------------- | ------------------------- | ------------------- |
| `background-color` | `styles/vars/CdrLabelWrapper.vars.scss` | `cdr-color-background-input-default`          | rgba(247, 245, 243, 0.15) |                     |
| `background-color` | `styles/vars/CdrLabelWrapper.vars.scss` | `cdr-color-background-label-default-active`   | #edeae3                   |                     |
| `background-color` | `styles/vars/CdrLabelWrapper.vars.scss` | `cdr-color-background-label-default-focus`    | #fafbf9                   |                     |
| `background-color` | `styles/vars/CdrLabelWrapper.vars.scss` | `cdr-color-background-label-default-hover`    | #fafbf9                   |                     |
| `background-color` | `styles/vars/CdrLabelWrapper.vars.scss` | `cdr-color-background-label-secondary-active` | #ffffff                   |                     |
| `background-color` | `styles/vars/CdrLabelWrapper.vars.scss` | `cdr-color-background-label-secondary-focus`  | rgba(255, 255, 255, 0.75) |                     |
| `background-color` | `styles/vars/CdrLabelWrapper.vars.scss` | `cdr-color-background-label-secondary-hover`  | rgba(255, 255, 255, 0.75) |                     |
| `box-shadow`       | `styles/vars/CdrLabelWrapper.vars.scss` | `cdr-color-border-input-default`              | #958e83                   |                     |
| `box-shadow`       | `styles/vars/CdrLabelWrapper.vars.scss` | `cdr-color-border-label-default-focus`        | #2e2e2b                   |                     |
| `color`            | `styles/vars/CdrLabelWrapper.vars.scss` | `cdr-color-text-input-disabled`               | #d5cfc3                   |                     |
| `color`            | `styles/vars/CdrLabelWrapper.vars.scss` | `cdr-color-text-input-label`                  | #4b4a48                   |                     |

## landingLead

| Property                            | File                                | Legacy token                   | Hex     | Semantic equivalent |
| ----------------------------------- | ----------------------------------- | ------------------------------ | ------- | ------------------- |
| `--cdr-split-surface-surface-color` | `styles/CdrLandingLead.module.scss` | `cdr-color-background-primary` | #ffffff |                     |

## link

| Property                                                                                      | File                            | Legacy token                 | Hex     | Semantic equivalent |
| --------------------------------------------------------------------------------------------- | ------------------------------- | ---------------------------- | ------- | ------------------- |
| `--cdr-link-active-text-color-active`, `--cdr-link-text-color`, `--cdr-link-text-color-hover` | `styles/vars/CdrLink.vars.scss` | `cdr-color-text-primary`     | #4b4a48 |                     |
| `color`                                                                                       | `styles/vars/CdrLink.vars.scss` | `cdr-color-text-link-active` | #0b2d60 |                     |
| `color`                                                                                       | `styles/vars/CdrLink.vars.scss` | `cdr-color-text-link-hover`  | #406eb5 |                     |
| `color`, `fill`                                                                               | `styles/vars/CdrLink.vars.scss` | `cdr-color-text-link-rest`   | #406eb5 |                     |
| `outline`                                                                                     | `styles/vars/CdrLink.vars.scss` | `cdr-color-outline`          | ?       |                     |

## list

| Property | File                            | Legacy token               | Hex     | Semantic equivalent |
| -------- | ------------------------------- | -------------------------- | ------- | ------------------- |
| `color`  | `styles/CdrList.module.scss`    | `cdr-color-text-secondary` | #736e65 |                     |
| `color`  | `styles/vars/CdrList.vars.scss` | `cdr-color-text-secondary` | #736e65 |                     |

## modal

| Property           | File                          | Legacy token                         | Hex                       | Semantic equivalent |
| ------------------ | ----------------------------- | ------------------------------------ | ------------------------- | ------------------- |
| `background-color` | `styles/CdrModal.module.scss` | `cdr-color-background-modal-overlay` | rgba(247, 245, 243, 0.85) |                     |
| `background-color` | `styles/CdrModal.module.scss` | `cdr-color-background-primary`       | #ffffff                   |                     |

## objectOverlay

| Property | File                                  | Legacy token                   | Hex     | Semantic equivalent |
| -------- | ------------------------------------- | ------------------------------ | ------- | ------------------- |
| —        | `styles/CdrObjectOverlay.module.scss` | `cdr-color-background-primary` | #ffffff |                     |

## pagination

| Property           | File                               | Legacy token                              | Hex     | Semantic equivalent |
| ------------------ | ---------------------------------- | ----------------------------------------- | ------- | ------------------- |
| `background-color` | `styles/CdrPagination.module.scss` | `cdr-color-background-pagination-hover`   | #fafbf9 |                     |
| `background-color` | `styles/CdrPagination.module.scss` | `cdr-color-background-pagination-keyline` | #406eb5 |                     |
| `color`, `fill`    | `styles/CdrPagination.module.scss` | `cdr-color-text-disabled`                 | #d5cfc3 |                     |
| `color`, `fill`    | `styles/CdrPagination.module.scss` | `cdr-color-text-primary`                  | #4b4a48 |                     |

## popup

| Property     | File                             | Legacy token                   | Hex     | Semantic equivalent |
| ------------ | -------------------------------- | ------------------------------ | ------- | ------------------- |
| `background` | `styles/CdrPopup.module.scss`    | `cdr-color-background-primary` | #ffffff |                     |
| `border`     | `styles/CdrPopup.module.scss`    | `cdr-color-border-secondary`   | #958e83 |                     |
| —            | `styles/vars/CdrPopup.vars.scss` | `cdr-color-background-primary` | #ffffff |                     |
| —            | `styles/vars/CdrPopup.vars.scss` | `cdr-color-border-secondary`   | #958e83 |                     |

## quote

| Property       | File                             | Legacy token               | Hex     | Semantic equivalent |
| -------------- | -------------------------------- | -------------------------- | ------- | ------------------- |
| `border-color` | `styles/vars/CdrQuote.vars.scss` | `cdr-color-border-primary` | #d5cfc3 |                     |
| `color`        | `styles/vars/CdrQuote.vars.scss` | `cdr-color-text-primary`   | #4b4a48 |                     |
| `color`        | `styles/vars/CdrQuote.vars.scss` | `cdr-color-text-secondary` | #736e65 |                     |

## radio

| Property           | File                             | Legacy token                                        | Hex     | Semantic equivalent |
| ------------------ | -------------------------------- | --------------------------------------------------- | ------- | ------------------- |
| `background-color` | `styles/vars/CdrRadio.vars.scss` | `cdr-color-background-input-default-active`         | #fafbf9 |                     |
| `background-color` | `styles/vars/CdrRadio.vars.scss` | `cdr-color-background-input-default-disabled`       | #fafbf9 |                     |
| `background-color` | `styles/vars/CdrRadio.vars.scss` | `cdr-color-background-input-default-focus`          | #fafbf9 |                     |
| `background-color` | `styles/vars/CdrRadio.vars.scss` | `cdr-color-background-input-default-hover`          | #fafbf9 |                     |
| `background-color` | `styles/vars/CdrRadio.vars.scss` | `cdr-color-background-input-default-selected-focus` | #958e83 |                     |
| `background-color` | `styles/vars/CdrRadio.vars.scss` | `cdr-color-background-input-default-selected-hover` | #958e83 |                     |
| `background-color` | `styles/vars/CdrRadio.vars.scss` | `cdr-color-background-input-default-selected`       | #4b4a48 |                     |
| `background-color` | `styles/vars/CdrRadio.vars.scss` | `cdr-color-icon-checkbox-default-selected-active`   | #4b4a48 |                     |
| `background-color` | `styles/vars/CdrRadio.vars.scss` | `cdr-color-icon-checkbox-default-selected`          | #ffffff |                     |
| —                  | `styles/vars/CdrRadio.vars.scss` | `cdr-color-border-input-default-active`             | #4b4a48 |                     |
| —                  | `styles/vars/CdrRadio.vars.scss` | `cdr-color-border-input-default-disabled`           | #d5cfc3 |                     |
| —                  | `styles/vars/CdrRadio.vars.scss` | `cdr-color-border-input-default-hover`              | #2e2e2b |                     |
| —                  | `styles/vars/CdrRadio.vars.scss` | `cdr-color-border-input-default-selected-hover`     | #4b4a48 |                     |
| —                  | `styles/vars/CdrRadio.vars.scss` | `cdr-color-border-input-default-selected`           | #4b4a48 |                     |

## rating

| Property       | File                           | Legacy token                      | Hex     | Semantic equivalent |
| -------------- | ------------------------------ | --------------------------------- | ------- | ------------------- |
| `border-right` | `styles/CdrRating.module.scss` | `cdr-color-text-rating-separator` | #b2ab9f |                     |
| `color`        | `styles/CdrRating.module.scss` | `cdr-color-text-rating-default`   | #4b4a48 |                     |
| `color`        | `styles/CdrRating.module.scss` | `cdr-color-text-rating-hover`     | #406eb5 |                     |
| `fill`         | `styles/CdrRating.module.scss` | literal                           | #928b80 |                     |
| `fill`         | `styles/CdrRating.module.scss` | literal                           | #f9f8f6 |                     |
| `fill`         | `styles/CdrRating.module.scss` | literal                           | #ffd280 |                     |
| `stroke`       | `styles/CdrRating.module.scss` | literal                           | #bd7b2d |                     |

## select

| Property                         | File                              | Legacy token                                  | Hex                       | Semantic equivalent |
| -------------------------------- | --------------------------------- | --------------------------------------------- | ------------------------- | ------------------- |
| `fill`                           | `styles/CdrSelect.module.scss`    | `cdr-color-icon-disabled`                     | #d5cfc3                   |                     |
| `fill`                           | `styles/CdrSelect.module.scss`    | `cdr-color-text-primary`                      | #4b4a48                   |                     |
| `background-color`               | `styles/vars/CdrSelect.vars.scss` | `cdr-color-background-input-default-active`   | #fafbf9                   |                     |
| `background-color`               | `styles/vars/CdrSelect.vars.scss` | `cdr-color-background-input-default-disabled` | #fafbf9                   |                     |
| `background-color`               | `styles/vars/CdrSelect.vars.scss` | `cdr-color-background-input-error`            | rgba(255, 242, 242, 0.75) |                     |
| `background-color`               | `styles/vars/CdrSelect.vars.scss` | `cdr-color-background-input-secondary-active` | #ffffff                   |                     |
| `background-color`               | `styles/vars/CdrSelect.vars.scss` | `cdr-color-background-input-secondary`        | rgba(255, 255, 255, 0.85) |                     |
| `background`, `background-color` | `styles/vars/CdrSelect.vars.scss` | `cdr-color-background-input-default`          | rgba(247, 245, 243, 0.15) |                     |
| `box-shadow`                     | `styles/vars/CdrSelect.vars.scss` | `cdr-color-border-input-default-focus`        | #2e2e2b                   |                     |
| `box-shadow`                     | `styles/vars/CdrSelect.vars.scss` | `cdr-color-border-input-default`              | #958e83                   |                     |
| `box-shadow`                     | `styles/vars/CdrSelect.vars.scss` | `cdr-color-border-input-error`                | #b33322                   |                     |
| `color`                          | `styles/vars/CdrSelect.vars.scss` | `cdr-color-text-input-default`                | #2e2e2b                   |                     |
| `color`                          | `styles/vars/CdrSelect.vars.scss` | `cdr-color-text-input-disabled`               | #d5cfc3                   |                     |
| `color`                          | `styles/vars/CdrSelect.vars.scss` | `cdr-color-text-primary`                      | #4b4a48                   |                     |
| —                                | `styles/vars/CdrSelect.vars.scss` | `cdr-color-border-input-default-disabled`     | #d5cfc3                   |                     |

## skeleton

| Property     | File                                | Legacy token | Hex     | Semantic equivalent |
| ------------ | ----------------------------------- | ------------ | ------- | ------------------- |
| `background` | `styles/vars/CdrSkeleton.vars.scss` | literal      | #edeae3 |                     |

## splitSurface

| Property     | File                                    | Legacy token                   | Hex     | Semantic equivalent |
| ------------ | --------------------------------------- | ------------------------------ | ------- | ------------------- |
| `background` | `styles/vars/CdrSplitSurface.vars.scss` | `cdr-color-background-primary` | #ffffff |                     |

## surface

| Property    | File                            | Legacy token                                | Hex     | Semantic equivalent |
| ----------- | ------------------------------- | ------------------------------------------- | ------- | ------------------- |
| `brand`     | `styles/CdrSurface.module.scss` | `cdr-color-background-surface-brand-spruce` | #1f513f |                     |
| `error`     | `styles/CdrSurface.module.scss` | `cdr-color-border-surface-error`            | #bb4045 |                     |
| `info`      | `styles/CdrSurface.module.scss` | `cdr-color-border-surface-info`             | #406eb5 |                     |
| `primary`   | `styles/CdrSurface.module.scss` | `cdr-color-background-surface-primary`      | #ffffff |                     |
| `primary`   | `styles/CdrSurface.module.scss` | `cdr-color-border-surface-primary`          | #d5cfc3 |                     |
| `sale`      | `styles/CdrSurface.module.scss` | `cdr-color-background-surface-sale`         | #c7370f |                     |
| `secondary` | `styles/CdrSurface.module.scss` | `cdr-color-background-surface-secondary`    | #f7f5f3 |                     |
| `secondary` | `styles/CdrSurface.module.scss` | `cdr-color-border-surface-secondary`        | #958e83 |                     |
| `success`   | `styles/CdrSurface.module.scss` | `cdr-color-border-surface-success`          | #3b8349 |                     |
| `warning`   | `styles/CdrSurface.module.scss` | `cdr-color-border-surface-warning`          | #b68b37 |                     |

## surfaceScroll

| Property           | File                                  | Legacy token | Hex     | Semantic equivalent |
| ------------------ | ------------------------------------- | ------------ | ------- | ------------------- |
| `background-color` | `styles/CdrSurfaceScroll.module.scss` | literal      | #e8e0ce |                     |
| `background`       | `styles/CdrSurfaceScroll.module.scss` | literal      | #454441 |                     |

## surfaceSelection

| Property                            | File                                     | Legacy token                     | Hex     | Semantic equivalent |
| ----------------------------------- | ---------------------------------------- | -------------------------------- | ------- | ------------------- |
| `--cdr-surface-background-disabled` | `styles/CdrSurfaceSelection.module.scss` | `cdr-color-background-secondary` | #f4f2ed |                     |
| `--cdr-surface-background`          | `styles/CdrSurfaceSelection.module.scss` | `cdr-color-background-primary`   | #ffffff |                     |
| `--cdr-surface-border-color`        | `styles/CdrSurfaceSelection.module.scss` | `cdr-color-border-secondary`     | #958e83 |                     |

## switch

| Property               | File                           | Legacy token                                                | Hex     | Semantic equivalent |
| ---------------------- | ------------------------------ | ----------------------------------------------------------- | ------- | ------------------- |
| `background-color`     | `styles/CdrSwitch.module.scss` | `cdr-color-background-switch-default-focus`                 | #fafbf9 |                     |
| `background-color`     | `styles/CdrSwitch.module.scss` | `cdr-color-background-switch-default-hover`                 | #fafbf9 |                     |
| `background-color`     | `styles/CdrSwitch.module.scss` | `cdr-color-background-switch-default-rest`                  | #fafbf9 |                     |
| `background-color`     | `styles/CdrSwitch.module.scss` | `cdr-color-background-switch-handle-default-focus`          | #d5cfc3 |                     |
| `background-color`     | `styles/CdrSwitch.module.scss` | `cdr-color-background-switch-handle-default-rest`           | #d5cfc3 |                     |
| `background-color`     | `styles/CdrSwitch.module.scss` | `cdr-color-background-switch-handle-selected-default-focus` | #d5cfc3 |                     |
| `background-color`     | `styles/CdrSwitch.module.scss` | `cdr-color-background-switch-handle-selected-default-rest`  | #d5cfc3 |                     |
| `background-color`     | `styles/CdrSwitch.module.scss` | `cdr-color-background-switch-selected-default-focus`        | #2e2e2b |                     |
| `background-color`     | `styles/CdrSwitch.module.scss` | `cdr-color-background-switch-selected-default-hover`        | #2e2e2b |                     |
| `background-color`     | `styles/CdrSwitch.module.scss` | `cdr-color-background-switch-selected-default-rest`         | #4b4a48 |                     |
| `border`, `box-shadow` | `styles/CdrSwitch.module.scss` | `cdr-color-border-secondary`                                | #958e83 |                     |
| `fill`                 | `styles/CdrSwitch.module.scss` | `cdr-color-icon-default`                                    | #958e83 |                     |
| `fill`                 | `styles/CdrSwitch.module.scss` | `cdr-color-icon-emphasis`                                   | #4b4a48 |                     |
| `fill`                 | `styles/CdrSwitch.module.scss` | `cdr-color-icon-switch-selected-default-focus`              | #d5cfc3 |                     |
| `fill`                 | `styles/CdrSwitch.module.scss` | `cdr-color-icon-switch-selected-default-hover`              | #d5cfc3 |                     |
| `fill`                 | `styles/CdrSwitch.module.scss` | `cdr-color-icon-switch-selected-default-rest`               | #d5cfc3 |                     |
| —                      | `styles/CdrSwitch.module.scss` | `cdr-color-border-switch-default-hover`                     | #4b4a48 |                     |
| —                      | `styles/CdrSwitch.module.scss` | `cdr-color-border-switch-handle-default-focus`              | #d5cfc3 |                     |
| —                      | `styles/CdrSwitch.module.scss` | `cdr-color-border-switch-handle-default-hover`              | #4b4a48 |                     |

## table

| Property                 | File                             | Legacy token                         | Hex     | Semantic equivalent |
| ------------------------ | -------------------------------- | ------------------------------------ | ------- | ------------------- |
| `--table-border-default` | `styles/vars/CdrTable.vars.scss` | `cdr-color-border-table-default`     | #d5cfc3 |                     |
| `--table-border-head`    | `styles/vars/CdrTable.vars.scss` | `cdr-color-border-table-head`        | #958e83 |                     |
| `background-color`       | `styles/vars/CdrTable.vars.scss` | `cdr-color-background-table-header`  | #f7f5f3 |                     |
| `background-color`       | `styles/vars/CdrTable.vars.scss` | `cdr-color-background-table-row-alt` | #fafbf9 |                     |
| `background-color`       | `styles/vars/CdrTable.vars.scss` | `cdr-color-background-table-row`     | #ffffff |                     |
| `color`                  | `styles/vars/CdrTable.vars.scss` | `cdr-color-text-primary`             | #4b4a48 |                     |

## tabs

| Property           | File                         | Legacy token                          | Hex                     | Semantic equivalent |
| ------------------ | ---------------------------- | ------------------------------------- | ----------------------- | ------------------- |
| `background-color` | `styles/CdrTabs.module.scss` | `cdr-color-border-tab-keyline-active` | #406eb5                 |                     |
| `background-color` | `styles/CdrTabs.module.scss` | literal                               | rgb(0, 0, 0, 0.5)       |                     |
| `border-bottom`    | `styles/CdrTabs.module.scss` | `cdr-color-border-tab-keyline-rest`   | #958e83                 |                     |
| `box-shadow`       | `styles/CdrTabs.module.scss` | literal                               | rgb(255, 255, 255, 0.5) |                     |
| `color`            | `styles/CdrTabs.module.scss` | `cdr-color-text-tab-active`           | #4b4a48                 |                     |
| `color`            | `styles/CdrTabs.module.scss` | `cdr-color-text-tab-disabled`         | #d5cfc3                 |                     |
| `color`            | `styles/CdrTabs.module.scss` | `cdr-color-text-tab-hover`            | #406eb5                 |                     |
| `color`            | `styles/CdrTabs.module.scss` | `cdr-color-text-tab-rest`             | #736e65                 |                     |

## text

| Property | File                            | Legacy token             | Hex     | Semantic equivalent |
| -------- | ------------------------------- | ------------------------ | ------- | ------------------- |
| `color`  | `styles/vars/CdrText.vars.scss` | `cdr-color-text-primary` | #4b4a48 |                     |

## title

| Property | File                          | Legacy token             | Hex     | Semantic equivalent |
| -------- | ----------------------------- | ------------------------ | ------- | ------------------- |
| `color`  | `styles/CdrTitle.module.scss` | `cdr-color-text-primary` | #4b4a48 |                     |

## toast

| Property            | File                             | Legacy token                              | Hex     | Semantic equivalent |
| ------------------- | -------------------------------- | ----------------------------------------- | ------- | ------------------- |
| `background-color`  | `styles/CdrToast.module.scss`    | `cdr-color-background-message-default-02` | #e8e0ce |                     |
| `background-color`  | `styles/CdrToast.module.scss`    | `cdr-color-background-message-error-02`   | #eecbc1 |                     |
| `background-color`  | `styles/CdrToast.module.scss`    | `cdr-color-background-message-info-02`    | #c2d8db |                     |
| `background-color`  | `styles/CdrToast.module.scss`    | `cdr-color-background-message-success-02` | #d5e6cb |                     |
| `background-color`  | `styles/CdrToast.module.scss`    | `cdr-color-background-message-warning-02` | #f5e9b7 |                     |
| `border-left-color` | `styles/CdrToast.module.scss`    | `cdr-color-border-message-default-01`     | #726d64 |                     |
| `border-left-color` | `styles/CdrToast.module.scss`    | `cdr-color-border-message-error-01`       | #bb4045 |                     |
| `border-left-color` | `styles/CdrToast.module.scss`    | `cdr-color-border-message-info-01`        | #408e86 |                     |
| `border-left-color` | `styles/CdrToast.module.scss`    | `cdr-color-border-message-success-01`     | #3b8349 |                     |
| `border-left-color` | `styles/CdrToast.module.scss`    | `cdr-color-border-message-warning-01`     | #b68b37 |                     |
| `fill`              | `styles/CdrToast.module.scss`    | `cdr-color-icon-message-default`          | #726d64 |                     |
| `fill`              | `styles/CdrToast.module.scss`    | `cdr-color-icon-message-error`            | #bb4045 |                     |
| `fill`              | `styles/CdrToast.module.scss`    | `cdr-color-icon-message-info`             | #408e86 |                     |
| `fill`              | `styles/CdrToast.module.scss`    | `cdr-color-icon-message-success`          | #3b8349 |                     |
| `fill`              | `styles/CdrToast.module.scss`    | `cdr-color-icon-message-warning`          | #b68b37 |                     |
| `fill`              | `styles/CdrToast.module.scss`    | `cdr-color-text-emphasis`                 | #2e2e2b |                     |
| `background-color`  | `styles/vars/CdrToast.vars.scss` | `cdr-color-background-message-default-01` | #f9f8f6 |                     |
| `background-color`  | `styles/vars/CdrToast.vars.scss` | `cdr-color-background-message-error-01`   | #fdf7f7 |                     |
| `background-color`  | `styles/vars/CdrToast.vars.scss` | `cdr-color-background-message-info-01`    | #edf4f5 |                     |
| `background-color`  | `styles/vars/CdrToast.vars.scss` | `cdr-color-background-message-success-01` | #f4fbf5 |                     |
| `background-color`  | `styles/vars/CdrToast.vars.scss` | `cdr-color-background-message-warning-01` | #fefcf1 |                     |
| `outline-color`     | `styles/vars/CdrToast.vars.scss` | `cdr-color-border-message-default-02`     | #e8e0ce |                     |
| `outline-color`     | `styles/vars/CdrToast.vars.scss` | `cdr-color-border-message-error-02`       | #eecbc1 |                     |
| `outline-color`     | `styles/vars/CdrToast.vars.scss` | `cdr-color-border-message-info-02`        | #c2d8db |                     |
| `outline-color`     | `styles/vars/CdrToast.vars.scss` | `cdr-color-border-message-success-02`     | #d5e6cb |                     |
| `outline-color`     | `styles/vars/CdrToast.vars.scss` | `cdr-color-border-message-warning-02`     | #f5e9b7 |                     |

## toggleButton

| Property           | File                                 | Legacy token                                                | Hex     | Semantic equivalent |
| ------------------ | ------------------------------------ | ----------------------------------------------------------- | ------- | ------------------- |
| `background-color` | `styles/CdrToggleButton.module.scss` | `cdr-color-background-toggle-button-default-focus`          | #edeae3 |                     |
| `background-color` | `styles/CdrToggleButton.module.scss` | `cdr-color-background-toggle-button-default-hover`          | #edeae3 |                     |
| `background-color` | `styles/CdrToggleButton.module.scss` | `cdr-color-background-toggle-button-default-rest`           | #fafbf9 |                     |
| `background-color` | `styles/CdrToggleButton.module.scss` | `cdr-color-background-toggle-button-default-selected-hover` | #ffffff |                     |
| `background-color` | `styles/CdrToggleButton.module.scss` | `cdr-color-background-toggle-button-default-selected-rest`  | #ffffff |                     |
| `color`            | `styles/CdrToggleButton.module.scss` | `cdr-color-text-toggle-button-default-rest`                 | #4b4a48 |                     |
| `fill`             | `styles/CdrToggleButton.module.scss` | `cdr-color-icon-default`                                    | #958e83 |                     |
| `fill`             | `styles/CdrToggleButton.module.scss` | `cdr-color-icon-emphasis`                                   | #4b4a48 |                     |
| —                  | `styles/CdrToggleButton.module.scss` | `cdr-color-border-toggle-button-default-focus`              | #4b4a48 |                     |
| —                  | `styles/CdrToggleButton.module.scss` | `cdr-color-border-toggle-button-default-selected-focus`     | #4b4a48 |                     |
| —                  | `styles/CdrToggleButton.module.scss` | `cdr-color-border-toggle-button-default-selected-rest`      | #4b4a48 |                     |
| `background-color` | `styles/CdrToggleGroup.module.scss`  | `cdr-color-background-toggle-group-default-rest`            | #fafbf9 |                     |
| `border`           | `styles/CdrToggleGroup.module.scss`  | `cdr-color-border-primary`                                  | #d5cfc3 |                     |

## tooltip

| Property                                                                                           | File                            | Legacy token                           | Hex     | Semantic equivalent |
| -------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------- | ------- | ------------------- |
| `background`, `border-bottom-color`, `border-left-color`, `border-right-color`, `border-top-color` | `styles/CdrTooltip.module.scss` | `cdr-color-background-tooltip-default` | #2e2e2b |                     |
| `border`, `border-bottom-color`, `border-left-color`, `border-right-color`, `border-top-color`     | `styles/CdrTooltip.module.scss` | `cdr-color-border-tooltip-default`     | #fafbf9 |                     |
| `color`                                                                                            | `styles/CdrTooltip.module.scss` | `cdr-color-text-tooltip-default`       | #fafbf9 |                     |
