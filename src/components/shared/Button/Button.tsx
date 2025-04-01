import { ComponentProps, FC } from 'react';
import classNames from 'classnames';
import './button.scss';

export const BTN = 'btn';
export const BTN_SELECTED = `${BTN}_selected`;
export const BTN_CAPITALIZED = `${BTN}_capitalized`;

export type TButtonProps = {
  capitalized?: boolean;
  selected?: boolean;
} & ComponentProps<'button'>;

const Button: FC<TButtonProps> = (props) => {
  const { className, capitalized, selected, children, ...restProps } = props;

  const classes = classNames(BTN, className, {
    [BTN_SELECTED]: selected,
    [BTN_CAPITALIZED]: capitalized,
  });

  return (
    <button {...restProps} className={classes}>
      {children}
    </button>
  );
};

export default Button;
