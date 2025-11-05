/**
 * DuskMoonUI Component Library
 * Material Design 3-inspired components for Tailwind CSS
 */

// Original components
export { buttonStyles } from "./button";
export { cardStyles } from "./card";
export { inputStyles } from "./input";
export { badgeStyles } from "./badge";
export { alertStyles } from "./alert";

// Phase 1: Navigation components
export { navbarStyles } from "./navbar";
export { tabsStyles } from "./tabs";
export { drawerStyles } from "./drawer";

// Phase 1: Layout components
export { dividerStyles } from "./divider";
export { appBarStyles } from "./appbar";

// Phase 1: Feedback components
export { tooltipStyles } from "./tooltip";
export { snackbarStyles } from "./snackbar";
export { dialogStyles } from "./dialog";
export { progressStyles } from "./progress";

// Phase 1: Data Display components
export { tableStyles } from "./table";
export { listStyles } from "./list";

// Phase 1: Forms components
export { switchStyles } from "./switch";

// Phase 1: Overlay components
export { menuStyles } from "./menu";

// Phase 2: Navigation components
export { breadcrumbsStyles } from "./breadcrumbs";
export { bottomNavigationStyles } from "./bottom-navigation";
export { paginationStyles } from "./pagination";
export { stepperStyles } from "./stepper";

// Phase 2: Feedback components
export { skeletonStyles } from "./skeleton";

// Phase 2: Data Display components
export { chipStyles } from "./chip";
export { avatarStyles } from "./avatar";

// Phase 2: Forms components
export { sliderStyles } from "./slider";
export { autocompleteStyles } from "./autocomplete";
export { datepickerStyles } from "./datepicker";
export { fileUploadStyles } from "./fileupload";

// Phase 2: Interactive components
export { accordionStyles } from "./accordion";

// Phase 2: Overlay components
export { popoverStyles } from "./popover";
export { bottomSheetStyles } from "./bottomsheet";

// Phase 3: Additional components
export { checkboxStyles } from "./checkbox";
export { radioStyles } from "./radio";
export { selectStyles } from "./select";
export { textareaStyles } from "./textarea";
export { ratingStyles } from "./rating";
export { timelineStyles } from "./timeline";
export { collapseStyles } from "./collapse";
export { modalStyles } from "./modal";
export { toastStyles } from "./toast";
export { toggleStyles } from "./toggle";

import type { CSSRuleObject } from "tailwindcss/types/config";
import { buttonStyles } from "./button";
import { cardStyles } from "./card";
import { inputStyles } from "./input";
import { badgeStyles } from "./badge";
import { alertStyles } from "./alert";
import { navbarStyles } from "./navbar";
import { tabsStyles } from "./tabs";
import { drawerStyles } from "./drawer";
import { dividerStyles } from "./divider";
import { appBarStyles } from "./appbar";
import { tooltipStyles } from "./tooltip";
import { snackbarStyles } from "./snackbar";
import { dialogStyles } from "./dialog";
import { progressStyles } from "./progress";
import { tableStyles } from "./table";
import { listStyles } from "./list";
import { switchStyles } from "./switch";
import { menuStyles } from "./menu";
import { breadcrumbsStyles } from "./breadcrumbs";
import { bottomNavigationStyles } from "./bottom-navigation";
import { paginationStyles } from "./pagination";
import { stepperStyles } from "./stepper";
import { skeletonStyles } from "./skeleton";
import { chipStyles } from "./chip";
import { avatarStyles } from "./avatar";
import { sliderStyles } from "./slider";
import { autocompleteStyles } from "./autocomplete";
import { datepickerStyles } from "./datepicker";
import { fileUploadStyles } from "./fileupload";
import { accordionStyles } from "./accordion";
import { popoverStyles } from "./popover";
import { bottomSheetStyles } from "./bottomsheet";
import { checkboxStyles } from "./checkbox";
import { radioStyles } from "./radio";
import { selectStyles } from "./select";
import { textareaStyles } from "./textarea";
import { ratingStyles } from "./rating";
import { timelineStyles } from "./timeline";
import { collapseStyles } from "./collapse";
import { modalStyles } from "./modal";
import { toastStyles } from "./toast";
import { toggleStyles } from "./toggle";

/**
 * Get all component styles combined
 */
export function getAllComponentStyles(): Record<string, any> {
  return {
    ...buttonStyles,
    ...cardStyles,
    ...inputStyles,
    ...badgeStyles,
    ...alertStyles,
    ...navbarStyles,
    ...tabsStyles,
    ...drawerStyles,
    ...dividerStyles,
    ...appBarStyles,
    ...tooltipStyles,
    ...snackbarStyles,
    ...dialogStyles,
    ...progressStyles,
    ...tableStyles,
    ...listStyles,
    ...switchStyles,
    ...menuStyles,
    ...breadcrumbsStyles,
    ...bottomNavigationStyles,
    ...paginationStyles,
    ...stepperStyles,
    ...skeletonStyles,
    ...chipStyles,
    ...avatarStyles,
    ...sliderStyles,
    ...autocompleteStyles,
    ...datepickerStyles,
    ...fileUploadStyles,
    ...accordionStyles,
    ...popoverStyles,
    ...bottomSheetStyles,
    ...checkboxStyles,
    ...radioStyles,
    ...selectStyles,
    ...textareaStyles,
    ...ratingStyles,
    ...timelineStyles,
    ...collapseStyles,
    ...modalStyles,
    ...toastStyles,
    ...toggleStyles,
  };
}

/**
 * Get specific component styles by name
 */
export function getComponentStyles(
  components: string[] | "all",
): Record<string, any> {
  if (components === "all") {
    return getAllComponentStyles();
  }

  const componentMap: Record<string, Record<string, any>> = {
    button: buttonStyles,
    card: cardStyles,
    input: inputStyles,
    badge: badgeStyles,
    alert: alertStyles,
    navbar: navbarStyles,
    tabs: tabsStyles,
    drawer: drawerStyles,
    divider: dividerStyles,
    appbar: appBarStyles,
    tooltip: tooltipStyles,
    snackbar: snackbarStyles,
    dialog: dialogStyles,
    progress: progressStyles,
    table: tableStyles,
    list: listStyles,
    switch: switchStyles,
    menu: menuStyles,
    breadcrumbs: breadcrumbsStyles,
    "bottom-navigation": bottomNavigationStyles,
    pagination: paginationStyles,
    stepper: stepperStyles,
    skeleton: skeletonStyles,
    chip: chipStyles,
    avatar: avatarStyles,
    slider: sliderStyles,
    autocomplete: autocompleteStyles,
    datepicker: datepickerStyles,
    fileupload: fileUploadStyles,
    accordion: accordionStyles,
    popover: popoverStyles,
    bottomsheet: bottomSheetStyles,
    checkbox: checkboxStyles,
    radio: radioStyles,
    select: selectStyles,
    textarea: textareaStyles,
    rating: ratingStyles,
    timeline: timelineStyles,
    collapse: collapseStyles,
    modal: modalStyles,
    toast: toastStyles,
    toggle: toggleStyles,
  };

  const styles: Record<string, any> = {};

  for (const component of components) {
    const componentStyles = componentMap[component.toLowerCase()];
    if (componentStyles) {
      Object.assign(styles, componentStyles);
    }
  }

  return styles;
}

export const componentsList = [
  "button",
  "card",
  "input",
  "badge",
  "alert",
  "navbar",
  "tabs",
  "drawer",
  "divider",
  "appbar",
  "tooltip",
  "snackbar",
  "dialog",
  "progress",
  "table",
  "list",
  "switch",
  "menu",
  "breadcrumbs",
  "bottom-navigation",
  "pagination",
  "stepper",
  "skeleton",
  "chip",
  "avatar",
  "slider",
  "autocomplete",
  "datepicker",
  "fileupload",
  "accordion",
  "popover",
  "bottomsheet",
  "checkbox",
  "radio",
  "select",
  "textarea",
  "rating",
  "timeline",
  "collapse",
  "modal",
  "toast",
  "toggle",
] as const;
export type ComponentName = (typeof componentsList)[number];
