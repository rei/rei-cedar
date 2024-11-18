import { Layout, NameValuePair } from '../types/interfaces';
import {
  StructureOption,
  StructureObject,
  MediaMeasurement,
  ContentPosition,
} from '../types/other';
import { breakpoints } from '../utils/other';

// Get the row or column structure for a particular media height or width,
// which can be either a string or object
const getStructure = (
  mediaMeasurement: MediaMeasurement | undefined,
  fillAlgorithm: (mesurement: string) => StructureOption,
) => {
  if (!mediaMeasurement) {
    return 'auto';
  }

  let structure: StructureOption;

  // If a string is passed, the width or height is static,
  // otherwise use breakpoints to create dynamic rows or columns
  if (typeof mediaMeasurement === 'string') {
    structure = fillAlgorithm(mediaMeasurement);
  } else {
    structure = breakpoints.reduce((newStructure: NameValuePair, breakpoint) => {
      const mediaMeasurementString = mediaMeasurement[breakpoint];
      newStructure[breakpoint] = fillAlgorithm(mediaMeasurementString);
      return newStructure;
    }, {}) as StructureObject;
  }

  return structure;
};

export const getLayoutStyling = (
  contentPosition: ContentPosition,
  mediaWidth: MediaMeasurement,
  mediaHeight: MediaMeasurement,
) => {
  const props: Layout = {};
  const inlineStyles: NameValuePair = {};

  switch (contentPosition) {
    case 'left':
      props.columns = getStructure(mediaWidth, (measurement) => [1, measurement]);
      props.rows = getStructure(mediaHeight, (measurement) => measurement);
      inlineStyles['--cdr-media-object-content-position'] = "'content media'";
      break;
    case 'right':
      props.columns = getStructure(mediaWidth, (measurement) => [measurement, 1]);
      props.rows = getStructure(mediaHeight, (measurement) => measurement);
      inlineStyles['--cdr-media-object-content-position'] = "'media content'";
      break;
    case 'top':
      props.columns = getStructure(mediaWidth, (measurement) => measurement);
      props.rows = getStructure(mediaHeight, (measurement) => [1, measurement]);
      inlineStyles['--cdr-media-object-content-position'] = "'content' 'media'";
      break;
    case 'bottom':
      props.columns = getStructure(mediaWidth, (measurement) => measurement);
      props.rows = getStructure(mediaHeight, (measurement) => [measurement, 1]);
      inlineStyles['--cdr-media-object-content-position'] = "'media' 'content'";
      break;
    case 'overlay':
      props.columns = getStructure(mediaWidth, (measurement) => measurement);
      props.rows = getStructure(mediaHeight, (measurement) => measurement);
      break;
  }

  return { props, inlineStyles };
};
