// @flow weak

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from '../utils/customPropTypes';

const radius = 12;
const radius2x = 2 * radius;

export const styleSheet = createStyleSheet('Badge', (theme) => {
  const { typography, palette } = theme;

  return {
    root: {
      position: 'relative',
      display: 'inline-block',
    },
    badge: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: `-${radius}px`,
      right: `-${radius}px`,
      fontWeight: typography.fontWeight,
      fontSize: radius,
      width: radius2x,
      height: radius2x,
      borderRadius: '50%',
      backgroundColor: palette.color,
      color: palette.textColor,
    },
    primary: {
      backgroundColor: palette.primary[500],
      color: palette.getContrastText(palette.primary[500]),
    },
    accent: {
      backgroundColor: palette.accent.A200,
      color: palette.getContrastText(palette.accent.A200),
    },
  };
});

export default function Badge(props, context) {
  const {
    badgeClassName: badgeClassNameProp,
    badgeContent,
    className: classNameProp,
    children,
    primary,
    accent,
    ...other
  } = props;

  const classes = context.styleManager.render(styleSheet);
  const className = classNames({
    [classes.root]: true,
  }, classNameProp);
  const badgeClassName = classNames({
    [classes.badge]: true,
    [classes.primary]: primary,
    [classes.accent]: accent,
  }, badgeClassNameProp);

  return (
    <div className={className} {...other}>
      {children}
      <span className={badgeClassName}>
        {badgeContent}
      </span>
    </div>
  );
}

Badge.propTypes = {
  /**
   * If true, the badge will use the accent badge colors.
   */
  accent: PropTypes.bool,
  /**
   * The css class name of the badge element.
   */
  badgeClassName: PropTypes.string,
  /**
   * This is the content rendered within the badge.
   */
  badgeContent: PropTypes.node.isRequired,
  /**
   * The badge will be added relativelty to this node.
   */
  children: PropTypes.node.isRequired,
  /**
   * The css class name of the root element.
   */
  className: PropTypes.string,
  /**
   * If true, the badge will use the primary badge colors.
   */
  primary: PropTypes.bool,
};

Badge.defaultProps = {
  primary: false,
  accent: false,
};

Badge.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};