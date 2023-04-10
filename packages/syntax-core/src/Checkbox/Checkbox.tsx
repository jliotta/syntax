import React, { ReactElement, useState } from "react";
import classNames from "classnames";
import styles from "./Checkbox.module.css";
import Typography from "../Typography/Typography";

const typographySize = {
  sm: 100,
  md: 200,
} as const;

const iconWidth = {
  sm: 12,
  md: 20,
};

/**
 * Checkbox is a clickable element that will show if an option has been selected or not
 */
const Checkbox = ({
  checked = false,
  disabled = false,
  size = "md",
  label,
  error = false,
  onChange,
}: {
  /**
   * Whether or not the box has been clicked
   *
   * @defaultValue false
   */
  checked: boolean;
  /**
   * The callback to be called when the checkbox value changes
   */
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Whether or not the box is disabled
   *
   * @defaultValue false
   */
  disabled?: boolean;
  /**
   * The size of the checkbox and icon
   *
   * * `sm`: 16px
   * * `md`: 24px
   *
   * @defaultValue "md"
   */
  size?: "sm" | "md";
  /**
   * The text accompanying the checkbox
   */
  label: string;
  /**
   * Whether or not there is an error with the input
   *
   * @defaultValue false
   */
  error?: boolean;
}): ReactElement => {
  const [isFocused, setIsFocused] = useState(false);
  const checkboxStyling = classNames(styles.checkbox, styles[size]);
  const uncheckedStyling = classNames(checkboxStyling, styles.uncheckedBox, {
    [styles.uncheckedBorder]: !error,
    [styles.uncheckedErrorBorder]: error,
    [styles.focusedCheckbox]: isFocused,
  });
  const checkedStyling = classNames(checkboxStyling, styles.checkedBox, {
    [styles.checkedNonError]: !error,
    [styles.checkedError]: error,
    [styles.focusedCheckbox]: isFocused,
  });

  return (
    <label className={classNames(styles.mainContainer)}>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          className={classNames(styles.inputOverlay, styles[size])}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        <div className={checked ? checkedStyling : uncheckedStyling}>
          {checked && (
            <svg aria-hidden="true" viewBox="0 0 24 24" width={iconWidth[size]}>
              <path
                fill="#fff"
                d="m9 16.2-3.5-3.5a.9839.9839 0 0 0-1.4 0c-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4a.9839.9839 0 0 0-1.4 0L9 16.2z"
              ></path>
            </svg>
          )}
        </div>
      </div>
      <Typography
        size={typographySize[size]}
        color={error ? "destructive-primary" : "gray800"}
      >
        {label}
      </Typography>
    </label>
  );
};

export default Checkbox;