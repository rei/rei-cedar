import { Layout, NameValuePair } from '../types/interfaces';
import {
  Breakpoint,
  StructureOption,
  StructureValue,
  StructureArray,
  StructureObject,
  MediaMeasurement,
  ContentPosition,
} from '../types/other';
import { breakpoints } from '../utils/other';

const positions = {
  left: "'content media'",
  right: "'media content'",
  top: "'content' 'media'",
  bottom: "'media' 'content'",
};

// Various ways to fill out the structure for the layout of columns and rows.
// The output gets mapped into a StructureArray for Layout.
const passThrough = (measurement: StructureValue): StructureOption => measurement;
const oneToX = (measurement: StructureValue): StructureOption => [1, measurement];
const xToOne = (measurement: StructureValue): StructureOption => [measurement, 1];

const fillAlgorithmsByPosition = {
  left: { columns: oneToX, rows: passThrough },
  right: { columns: xToOne, rows: passThrough },
  bottom: { columns: passThrough, rows: xToOne },
  top: { columns: passThrough, rows: oneToX },
  overlay: { columns: passThrough, rows: passThrough },
};

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

  if (typeof contentPosition === 'string') {
    const fillAlgorithm = fillAlgorithmsByPosition[contentPosition];
    props.rows = getStructure(mediaHeight, fillAlgorithm.rows);
    props.columns = getStructure(mediaWidth, fillAlgorithm.columns);
    inlineStyles['--cdr-media-object-content-position'] = positions[contentPosition];
  } else {
    const rows = {};
    const columns = {};

    const getStructureValues = (breakpoint: Breakpoint, contentPositionValue) => {
      const fillAlgorithm = fillAlgorithmsByPosition[contentPositionValue];

      const rowMeasurement = getMeasurementValue(mediaHeight, breakpoint);
      rows[breakpoint] = fillAlgorithm.rows(rowMeasurement);

      const columnMeasurement = getMeasurementValue(mediaWidth, breakpoint);
      columns[breakpoint] = fillAlgorithm.columns(columnMeasurement);
    };

    breakpoints.forEach((breakpoint) => {
      const contentPositionValue = contentPosition[breakpoint];

      getStructureValues(breakpoint, contentPositionValue);
      getStructureValues(breakpoint, contentPositionValue);

      inlineStyles[`--cdr-media-object-content-position-${breakpoint}`] =
        positions[contentPositionValue];
    });
    props.rows = rows;
    props.columns = columns;
  }

  return { props, inlineStyles };
};
