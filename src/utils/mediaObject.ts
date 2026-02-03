import { Layout, NameValuePair } from '../components/layout/types';
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

/**
 * Maps media position values to CSS Grid template areas.
 * Defines how the media and content should be arranged in the grid.
 */
const gridForMediaPosition: { [key in PositionValue]: string } = {
  left: "'media content'",
  right: "'content media'",
  bottom: "'content' 'media'",
  top: "'media' 'content'",
};

/**
 * Function signature for layout generation algorithms.
 * Takes a measurement value and returns a structure configuration.
 */
interface LayoutGenerator {
  (measurement: StructureValue): StructureValue | StructureValue[];
}

/**
 * Layout generation algorithms for different media positions.
 * Each algorithm determines how to structure the columns and rows.
 */
const passThrough: LayoutGenerator = (measurement) => measurement;
const oneToX: LayoutGenerator = (measurement) => [1, measurement];
const xToOne: LayoutGenerator = (measurement) => [measurement, 1];

/**
 * Defines fill algorithms for rows and columns based on media position.
 * Maps each position to appropriate column and row generation strategies.
 */
const fillAlgorithmsByPosition: {
  [key in PositionValue]: { rows: LayoutGenerator; columns: LayoutGenerator };
} = {
  right: { columns: oneToX, rows: passThrough },
  left: { columns: xToOne, rows: passThrough },
  top: { columns: passThrough, rows: xToOne },
  bottom: { columns: passThrough, rows: oneToX },
};

/**
 * Creates the rows or columns structure configuration for the Layout component.
 * Handles both static and responsive media measurements.
 *
 * @param mediaMeasurement - The width or height value, either static string or responsive object
 * @param fillAlgorithm - Algorithm function to generate the structure
 * @returns Layout structure option (string, array, or responsive object)
 *
 * @example
 * // Static measurement
 * getStructure('200px', oneToX) // => [1, '200px']
 *
 * @example
 * // Responsive measurement
 * getStructure({ xs: '100px', sm: '200px' }, xToOne)
 * // => { xs: ['100px', 1], sm: ['200px', 1] }
 */
const getStructure = (
  mediaMeasurement: MediaMeasurement | undefined,
  fillAlgorithm: (mesurement: string) => StructureOption,
): StructureOption => {
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

/**
 * Retrieves the media measurement value for a specific breakpoint.
 *
 * @param mediaMeasurement - Static string or responsive object with breakpoint values
 * @param breakpoint - The breakpoint to get the value for
 * @returns The measurement value for the given breakpoint or 'auto'
 *
 * @example
 * getMeasurementValue('200px', 'sm') // => '200px'
 * getMeasurementValue({ xs: '100px', sm: '200px' }, 'sm') // => '200px'
 * getMeasurementValue(undefined, 'md') // => 'auto'
 */
const getMeasurementValue = (
  mediaMeasurement: MediaMeasurement,
  breakpoint: Breakpoint,
): string => {
  if (!mediaMeasurement) {
    return 'auto';
  }

  if (typeof mediaMeasurement === 'string') {
    return mediaMeasurement;
  } else {
    return mediaMeasurement[breakpoint];
  }
};

/**
 * Generates layout styling configuration for media object components.
 *
 * Creates the necessary CSS Grid properties and inline styles to position
 * media content relative to text content. Supports both static and responsive
 * positioning with configurable media dimensions.
 *
 * @param mediaPosition - Where the media should be positioned ('left', 'right', 'top', 'bottom') or responsive object
 * @param mediaWidth - Width of the media element, static or responsive
 * @param mediaHeight - Height of the media element, static or responsive
 * @returns Object containing layout props and inline CSS styles
 *
 * @example
 * // Static positioning
 * getLayoutStyling('left', '200px', 'auto')
 * // => {
 * //   props: { columns: ['200px', 1], rows: 'auto' },
 * //   inlineStyles: { '--cdr-media-object-media-position': "'media content'" }
 * // }
 *
 * @example
 * // Responsive positioning
 * getLayoutStyling(
 *   { xs: 'top', sm: 'left', md: 'left', lg: 'left' },
 *   { xs: '100%', sm: '200px', md: '300px', lg: '400px' },
 *   'auto'
 * )
 * // Returns responsive grid configuration with breakpoint-specific styles
 */
export const getLayoutStyling = (
  mediaPosition: Position,
  mediaWidth: MediaMeasurement,
  mediaHeight: MediaMeasurement,
): { props: Layout; inlineStyles: NameValuePair } => {
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
