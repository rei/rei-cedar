import { Layout, NameValuePair } from '../types/interfaces';
import {
  StructureOption,
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

const passThrough = (measurement) => measurement;
const oneToX = (measurement = [1, measurement]);
const xToOne = (measurement = [measurement, 1]);

const fillAlgorithms = {
  left: { columns: oneToX, rows: passThrough },
  right: { columns: xToOne, rows: passThrough },
  bottom: { columns: passThrough, rows: xToOne },
  top: { columns: passThrough, rows: oneToX },
  overlay: { columns: passThrough, rows: passThrough },
};

export const getLayoutStyling = (
  contentPosition: ContentPosition,
  mediaWidth: MediaMeasurement,
  mediaHeight: MediaMeasurement,
) => {
  const props: Layout = {};
  const inlineStyles: NameValuePair = {};

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

  const setStructure = () => {
    switch (contentPosition) {
      case 'left':
        props.columns = getStructure(mediaWidth, (measurement) => [1, measurement]);
        props.rows = getStructure(mediaHeight, (measurement) => measurement);
        break;
      case 'right':
        props.columns = getStructure(mediaWidth, (measurement) => [measurement, 1]);
        props.rows = getStructure(mediaHeight, (measurement) => measurement);
        break;
      case 'top':
        props.columns = getStructure(mediaWidth, (measurement) => measurement);
        props.rows = getStructure(mediaHeight, (measurement) => [1, measurement]);
        break;
      case 'bottom':
        props.columns = getStructure(mediaWidth, (measurement) => measurement);
        props.rows = getStructure(mediaHeight, (measurement) => [measurement, 1]);
        break;
      case 'overlay':
        props.columns = getStructure(mediaWidth, (measurement) => measurement);
        props.rows = getStructure(mediaHeight, (measurement) => measurement);
        break;
    }
  };



  if (typeof contentPosition === 'string') {
    setStructure();
    setPosition();
  } else {
    // const rows = {};
    // const columns = {};

    // const getStructureValues = (breakpoint, contentPositionValue) => {
    //   const fillAlgorithm = fillAlgorithms[contentPositionValue];
    // };

    // breakpoints.forEach((breakpoint) => {
    //   const contentPositionValue = contentPosition[breakpoint];
    //   const rowValue = getStructureValues(breakpoint);
    //   const columnValue = getStructureValues(breakpoint);

    //   rows[breakpoint] = rowValue;
    //   columns[breakpoint] = columnValue;

    //   inlineStyles[`--cdr-media-object-content-position-${breakpoint}`] =
    //     positions[contentPositionValue];

    //   // fill row for this breakpoint
    //   // fill column for this breakpoint
    //   // set the inlineStyle for breakpoint
    // });

    // props.rows = rows;
    // props.columns = columns;
  }

  return { props, inlineStyles };
};
