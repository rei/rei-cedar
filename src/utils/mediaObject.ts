import { Layout, NameValuePair } from '../types/interfaces';
import {
  Breakpoint,
  StructureOption,
  StructureValue,
  StructureObject,
  MediaMeasurement,
  Position,
  PositionValue,
} from '../types/other';
import { breakpoints } from '../utils/other';

// Determines how grid will be setup for mediaPosition values
const gridForMediaPosition: { [key in PositionValue]: string } = {
  left: "'media content'",
  right: "'content media'",
  bottom: "'content' 'media'",
  top: "'media' 'content'",
};

interface LayoutGenerator {
  (measurement: StructureValue): StructureValue | StructureValue[];
}

// Various ways to fill out the structure for the layout of columns and rows.
// The output gets mapped into a StructureArray for Layout.
const passThrough: LayoutGenerator = (measurement) => measurement;
const oneToX: LayoutGenerator = (measurement) => [1, measurement];
const xToOne: LayoutGenerator = (measurement) => [measurement, 1];

// Depending on mediaPosition value, these are the props that will be passed on to Layout
const fillAlgorithmsByPosition: {
  [key in PositionValue]: { rows: LayoutGenerator; columns: LayoutGenerator };
} = {
  right: { columns: oneToX, rows: passThrough },
  left: { columns: xToOne, rows: passThrough },
  top: { columns: passThrough, rows: xToOne },
  bottom: { columns: passThrough, rows: oneToX },
};

// Creates the rows or columns structure that will be passed on to Layout
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

// Returns the provided width or height that will be used for media width or height
const getMeasurementValue = (mediaMeasurement: MediaMeasurement, breakpoint: Breakpoint) => {
  if (!mediaMeasurement) {
    return 'auto';
  }

  if (typeof mediaMeasurement === 'string') {
    return mediaMeasurement;
  } else {
    return mediaMeasurement[breakpoint];
  }
};

// Creates inline styles for mediaPosition, which could be a string or object.
// Creates rows and columns props that will be passed along to Layout.
export const getLayoutStyling = (
  mediaPosition: Position,
  mediaWidth: MediaMeasurement,
  mediaHeight: MediaMeasurement,
) => {
  const props: Layout = {};
  const inlineStyles: NameValuePair = {};

  if (typeof mediaPosition === 'string') {
    const fillAlgorithm = fillAlgorithmsByPosition[mediaPosition];    
    props.rows = getStructure(mediaHeight, fillAlgorithm.rows);
    props.columns = getStructure(mediaWidth, fillAlgorithm.columns);
    inlineStyles['--cdr-media-object-media-position'] = gridForMediaPosition[mediaPosition];
  } else {
    // Create rows and columns with defaults
    const rows: StructureObject = { xs: 'auto', sm: 'auto', md: 'auto', lg: 'auto' };
    const columns: StructureObject = { xs: 'auto', sm: 'auto', md: 'auto', lg: 'auto' };

    // Fill out rows and columns based on the breakpoint and mediaPositionValue
    const addStructureValues = (breakpoint: Breakpoint, mediaPositionValue: PositionValue) => {
      const fillAlgorithm = fillAlgorithmsByPosition[mediaPositionValue];

      const rowMeasurement = getMeasurementValue(mediaHeight, breakpoint);
      rows[breakpoint] = fillAlgorithm.rows(rowMeasurement);

      const columnMeasurement = getMeasurementValue(mediaWidth, breakpoint);
      columns[breakpoint] = fillAlgorithm.columns(columnMeasurement);
    };

    // For each breakpoint, add structrure values based on the mediaPosition.
    // Also, add in dynamic mediaPosition values.
    breakpoints.forEach((breakpoint) => {
      const mediaPositionValue = mediaPosition[breakpoint];

      addStructureValues(breakpoint, mediaPositionValue);
      addStructureValues(breakpoint, mediaPositionValue);

      // Add in media position styles for various breakpoints
      inlineStyles[`--cdr-media-object-media-position-${breakpoint}`] =
        gridForMediaPosition[mediaPositionValue];
    });

    props.rows = rows;
    props.columns = columns;
  }

  return { props, inlineStyles };
};
